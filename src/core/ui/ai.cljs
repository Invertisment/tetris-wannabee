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
   {:id "genome-0.8505807854718965"
    :safe {:cumulative-height -0.024038098911618788
           :step-2 0.035944768289915996
           :horizontal-fullness -0.25326990909938135
           :hole-setback -0.5312435918889359
           :well-depth-one-px-from-wall -0.8930341703571198
           :step-3 -0.5551106909216612
           :roughness -0.38251868084339463
           :step-1 0.4922908961270508
           :well-depth-at-wall 0.21266873874682818
           :well-depth-at-wall-minus-4 -0.06975042114852531
           :well-depth-one-px-from-wall-minus-4 0.043610170176164254
           :step-4 -0.5145414056030959
           :step-more -0.6173858334525457
           :step-5 0.25789715535759256
           :rows-cleared 0.6635604542066469
           :flatness -0.028563858532824893
           :step-0 0.06998516680882605
           :weighted-height -0.37974579732476177}
    :risky {:cumulative-height -0.3666055207765345
            :step-2 -0.16797323189210406
            :horizontal-fullness 0.06171280250715061
            :hole-setback 0.19852209202825355
            :well-depth-one-px-from-wall 0.06256600063050449
            :step-3 -0.9094637405207648
            :roughness 0.16944041499042528
            :step-1 0.012810676977613122
            :well-depth-at-wall 0.11301006643932737
            :well-depth-at-wall-minus-4 -0.2001142343018517
            :well-depth-one-px-from-wall-minus-4 0.5371933771761515
            :step-4 0.30849432125705806
            :step-more 0.0756727581676429
            :step-5 1.1002379750917515
            :rows-cleared 0.005005396739468648
            :flatness -0.42319254537175266
            :step-0 0.3133021681809786
            :weighted-height -0.01367836174868936}}
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
