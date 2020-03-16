(ns core.ui.ai
  (:require [core.ui.time :as time]
            [cljs.core.async :refer [go <! timeout chan dropping-buffer go-loop]]
            [core.keys :as keys]
            [core.constants :as const]
            [core.ai.placement :as placement]
            [cljs.reader :as reader]))

(def ai-loop-state (atom nil))

(def genome
  (atom
   {
    :cumulative-height -0.4976915941285005
    :step-2 0.3657641104247921
    :horizontal-fullness -0.44278930807268013
    :hole-setback -0.42452182606533256
    :well-depth-one-px-from-wall 0.1451836117897412
    :step-3 -0.03228608310351462
    :roughness -0.5771454076295538
    :step-1 0.2997692405368743
    :well-depth-at-wall -0.2774787725171084
    :well-depth-at-wall-minus-4 0.07115600953304244
    :well-depth-one-px-from-wall-minus-4 0.13811091745754175
    :id "genome-0.947050499538895"
    :step-4 -0.27762183341022356
    :step-more -0.2830121375138149
    :step-5 -0.298170521250825
    :rows-cleared 0.1307280264810852
    :flatness 0.4141519869153653
    :step-0 -0.2886632442976079
    :weighted-height -0.02813582067999981
    }))

(defn action-to-key [movement-id]
  (condp = movement-id
    :left const/left
    :right const/right
    :down const/down
    :bottom const/bottom
    :rotate const/rotate
    nil))

(defn find-next-piece [state]
  (placement/pick-best-piece-placement @genome state))

(defn deliver-next-state [state-atom change-listener]
  (let [prev-state @state-atom
        move (find-next-piece prev-state)]
    (go-loop [[action & remaining-actions] (:path move)]
      (<! (timeout 100))
      (change-listener (action-to-key action))
      (when remaining-actions
        (recur remaining-actions)))))

(defn toggle-ai-state [state-atom]
  (let [state @state-atom
        new-state (not (:ai-is-on state))]
    (reset!
     state-atom
     (assoc
      state
      :time-freeze new-state
      :ai-is-on new-state))
    (reset! ai-loop-state new-state)
    new-state))

(defn start-ai-loop [state-atom change-listener]
  (go-loop [prev-state @state-atom]
    (<! (timeout 200))
    (when @ai-loop-state
      (<! (deliver-next-state state-atom change-listener))
      (let [new-state @state-atom]
        (if (= prev-state new-state)
          (toggle-ai-state state-atom)
          (recur new-state))))))

(defn create-ai-toggle [state-atom change-listener]
  (fn []
    (let [new-state (toggle-ai-state state-atom)]
      (when new-state
        (start-ai-loop state-atom change-listener)))))

(defn setup-toggle [state-atom change-listener]
  (let [ai-toggle (create-ai-toggle state-atom change-listener)]
    (keys/setup-key-listener
     (fn [char-code]
       (when (= char-code const/toggle-ai)
         (ai-toggle))))))

(defn setup [state-atom change-listener]
  (add-watch
   state-atom
   :ai-restart
   (fn [key reference old-state new-state]
     (let [prev-game-state (:game-state old-state)
           curr-game-state (:game-state new-state)]
       (when (= curr-game-state :started)
         (remove-watch state-atom :ai-restart))
       (when (and (= prev-game-state :ended)
                  (= curr-game-state :started))
         (setup-toggle state-atom change-listener)))))
  (setup-toggle state-atom change-listener))

(defn update-genome [genome-string]
  (reset! genome (reader/read-string genome-string)))

(defn setup-genome-controls []
  (keys/setup-key-listener
   (fn [char-code]
     (when (= char-code const/toggle-ai-controls)
       (let [box-style (.-style (js/document.getElementById "ai-vars-area"))]
         #_(println (.-visibility box-style))
         (if (= "hidden" (.-visibility box-style))
           (set! (.-visibility box-style) "visible")
           (set! (.-visibility box-style) "hidden")))
       (let [vars-data (js/document.getElementById "ai-vars-data")
             update-button (js/document.getElementById "ai-vars-data-update-button")]
         (set! (.-value vars-data) @genome)
         (set! (.-onclick update-button) #(update-genome (.-value vars-data))))))))
