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
    {:id "genome-0.8095255140251257",
     :safe {:cumulative-height -0.1371869053698236,
            :step-2 0.2622074481287095,
            :hole-count -0.011183011388528351,
            :horizontal-fullness 0.062821382756814,
            :hole-setback -0.509263168718674,
            :step-3 0.04262758388006431,
            :roughness -0.45644767017981636,
            :step-1 0.13833321097341902,
            :well-depth-at-wall -0.2287955043275355,
            :well-depth-at-wall-minus-4 -0.2314182642167281,
            :step-4 -0.06144270332205016,
            :step-more -0.1534547194038845,
            :step-5 0.013040115388539667,
            :rows-cleared -0.38609509927275426,
            :clearable-line-count -0.058070630847287794,
            :flatness -0.11211019584452216,
            :step-0 0.09131613489638726,
            :weighted-height 0.20935593919975654},
     :risky {:cumulative-height -0.4264094046079262,
             :step-2 0.15325644170512132,
             :hole-count -0.05169090478077197,
             :horizontal-fullness 0.3703942287541342,
             :hole-setback -0.47624848787817536,
             :step-3 0.12146872232026773,
             :roughness -0.3800723767777361,
             :step-1 0.1752159897263349,
             :well-depth-at-wall 0.2603094016170755,
             :well-depth-at-wall-minus-4 -0.17368017608395797,
             :step-4 -0.21313889451350587,
             :step-more -0.2611418557896902,
             :step-5 -0.2616621873121907,
             :rows-cleared 0.405438127821814,
             :clearable-line-count 0.364711771493039,
             :flatness -0.31238848258738855,
             :step-0 0.1696302704135465,
             :weighted-height 0.10656744220231913}}

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
