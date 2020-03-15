(ns core.ui.ai
  (:require [core.ui.time :as time]
            [cljs.core.async :refer [go <! timeout chan dropping-buffer go-loop]]
            [core.keys :as keys]
            [core.constants :as const]
            [core.ai.placement :as placement]))

(def ai-loop-state (atom nil))

(def genome
  {
   :cumulative-height -0.4160403719397187,
   :step-2 -0.015830703162621952,
   :horizontal-fullness 0.05471452317723133,
   :hole-setback -0.31174513576509344,
   :well-depth-one-px-from-wall -0.07357534574940676,
   :step-3 0.24379493864116406,
   :roughness -0.38212952628448454,
   :step-1 0.21336455270223803,
   :well-depth-at-wall -0.11020545865074702,
   :well-depth-at-wall-minus-4 0.07590281616568971,
   :well-depth-one-px-from-wall-minus-4 -0.09853581982078685,
   :id "genome-0.6905491479381609",
   :step-4 0.32925032529315873,
   :step-more -0.4887879622380509,
   :step-5 -0.08290697117255691,
   :rows-cleared 0.08605183410168654,
   :flatness 0.3436012618446398,
   :step-0 -0.17418986220131144,
   :weighted-height -0.19083366143930658
   })

(defn action-to-key [movement-id]
  (condp = movement-id
    :left const/left
    :right const/right
    :down const/down
    :bottom const/bottom
    :rotate const/rotate
    nil))

(defn find-next-piece [state]
  (placement/pick-best-piece-placement genome state))

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
