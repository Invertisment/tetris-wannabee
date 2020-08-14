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
   {:id "genome-0.421483291035446"
    :safe {:cumulative-height -0.1626325328233435
           :step-2 0.08743469225893796
           :hole-count 0.007452094175859871
           :horizontal-fullness 0.06448506007285768
           :hole-setback -0.2857056726744087
           :step-3 0.006709683313794627
           :roughness -0.42493315415075955
           :step-1 0.21271473895455548
           :well-depth-at-wall 0.035142763475174185
           :well-depth-at-wall-minus-4 -0.2675537504110445
           :step-4 0.3083784855433973
           :step-more 0.14285518309742865
           :step-5 0.08370513425565006
           :rows-cleared -0.4633444965402063
           :clearable-line-count -0.03540019351059544
           :flatness -0.07026889575781578
           :step-0 0.12709984273395955
           :weighted-height 0.2242631901150711}
    :risky {:cumulative-height -0.4116312139641445
            :step-2 0.17333143272689638
            :hole-count 0.0348838369138232
            :horizontal-fullness 0.4711096911156057
            :hole-setback -0.2717193424614014
            :step-3 0.12721751227961833
            :roughness -0.48004977826388906
            :step-1 0.15557306371426713
            :well-depth-at-wall 0.22617625984713072
            :well-depth-at-wall-minus-4 -0.20183676245522528
            :step-4 0.3728248611117666
            :step-more -0.1802930877069809
            :step-5 -0.1722696144905047
            :rows-cleared 0.4468596856328481
            :clearable-line-count -0.02056086840043053
            :flatness -0.25719950983907325
            :step-0 0.10709578622757268
            :weighted-height 0.14471643831089054}}
   ))

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
