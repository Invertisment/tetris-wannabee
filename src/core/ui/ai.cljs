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
   {:id "genome-0.923081398176457"
    :safe {:cumulative-height -0.16085964840580294
           :step-2 0.08980444640654889
           :hole-count 0.006915099755888278
           :horizontal-fullness 0.015719425571859784
           :hole-setback -0.2857056726744087
           :step-3 0.031075671868679065
           :roughness -0.45886290384856443
           :step-1 0.21271473895455548
           :well-depth-at-wall 0.06259490909419774
           :well-depth-at-wall-minus-4 -0.2028438489064303
           :step-4 0.3083784855433973
           :step-more 0.10653230016029006
           :step-5 0.06405802836703627
           :rows-cleared -0.47687320633023855
           :clearable-line-count 0.019145527888942287
           :flatness -0.10905697733737865
           :step-0 0.11190127622432539
           :weighted-height 0.18089294295340977}
    :risky {:cumulative-height -0.42671125944429555
            :step-2 0.17682656191507104
            :hole-count -0.004257934812928504
            :horizontal-fullness 0.49124341018519796
            :hole-setback -0.2717193424614014
            :step-3 0.1269309716108025
            :roughness -0.441626423288944
            :step-1 0.208103958323619
            :well-depth-at-wall 0.25562993665704126
            :well-depth-at-wall-minus-4 -0.1987655946857668
            :step-4 0.0759311066770729
            :step-more -0.09149299484431775
            :step-5 -0.1924612570953936
            :rows-cleared 0.42296495570597065
            :clearable-line-count -0.09963100870007481
            :flatness -0.2669424850314774
            :step-0 0.14790239079245943
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
