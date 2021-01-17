(ns core.ui.ai
  (:require [core.ui.time :as time]
            [cljs.core.async :refer [go <! timeout chan dropping-buffer go-loop]]
            [core.keys :as keys]
            [core.constants :as const]
            [core.ai.placement :as placement]
            [core.ai.moves :as moves]
            [cljs.reader :as reader]))

(def ai-loop-state (atom nil))

(def genome
  (atom
   {:id "genome-0.2956899300545358"
    :safe {:cumulative-height -0.14326434029029628
           :step-2 0.19471058490966492
           :hole-count -0.02908722640449077
           :horizontal-fullness 0.22727427548943238
           :hole-setback -0.43589069223230664
           :step-3 0.06981446691078652
           :roughness -0.5638421292047049
           :step-1 0.1864922256494676
           :well-depth-at-wall -0.10481902404917916
           :well-depth-at-wall-minus-4 -0.380727230097559
           :step-4 -0.06440858597129431
           :step-more -0.09936786304905325
           :step-5 -0.007292255792656167
           :rows-cleared -0.39780443161269924
           :clearable-line-count 0.027508143690657325
           :flatness -0.18887980164296542
           :step-0 0.12042328072439254
           :weighted-height 0.2101164860078617}
    :risky {:cumulative-height -0.5574718793097947
            :step-2 0.13032449695389897
            :hole-count -0.2663060697305573
            :horizontal-fullness 0.43798474267143933
            :hole-setback -0.3483862641447668
            :step-3 0.06280085580134669
            :roughness -0.4680252646898294
            :step-1 0.18017980872850886
            :well-depth-at-wall 0.1353515222719776
            :well-depth-at-wall-minus-4 -0.12453162220941769
            :step-4 -0.210926912009251
            :step-more -0.27767122500180885
            :step-5 -0.31213827292321816
            :rows-cleared 0.488094761266739
            :clearable-line-count 0.30029807898919886
            :flatness -0.250295240050182
            :step-0 0.1758452596182247
            :weighted-height 0.15915341554148887}}


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
  #_(placement/pick-best-1deep-piece-placement @genome state)
  #_(placement/pick-best-2deep-piece-placement moves/is-game-ended? @genome state)
  (placement/pick-best-2deepcheap-piece-placement moves/is-game-ended? @genome state))

(defonce inter-piece-timeout 100)

(defn deliver-next-state [state-atom change-listener]
  (let [prev-state @state-atom]
    (go (let [min-timeout (timeout inter-piece-timeout)
              path (:path (find-next-piece prev-state))]
          (loop [[action & remaining-actions] path]
            (<! min-timeout)
            (change-listener (action-to-key action))
            (when remaining-actions
              (<! (timeout inter-piece-timeout))
              (recur remaining-actions)))))))

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
       (when (and (moves/is-game-ended? prev-game-state)
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
