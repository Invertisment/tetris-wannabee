(ns core.ui.ai
  (:require-macros [cljs.core.async.macros :refer [go-loop go]])
  (:require [core.ui.time :as time]
            [cljs.core.async :refer [<! timeout chan] :as async]
            [core.keys :as keys]
            [core.constants :as const]
            [core.ai.placement :as placement]
            [core.ai.moves :as moves]
            [cljs.reader :as reader]))

(def ai-regular-speed {:type :regular
                       :piece-move-timeout 100
                       :inter-piece-timeout 200
                       :should-stop false})

(def ai-fast-speed {:type :fast
                    :piece-move-timeout 0
                    :inter-piece-timeout 1
                    :should-stop false})

(def ai-loop-state (atom ai-regular-speed))

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
    :left (first const/left)
    :right (first const/right)
    :down (first const/down)
    :bottom (first const/bottom)
    :rotate (first const/rotate-clockwise)
    nil))

(defn find-next-piece [state]
  #_(placement/pick-best-1deep-piece-placement @genome state)
  #_(placement/pick-best-2deep-piece-placement moves/is-game-ended? @genome state)
  (placement/pick-best-2deepcheap-piece-placement moves/is-game-ended? @genome state))

(defn mk-piece-timeout-fn! [timeout-ms]
  (if (= 0 timeout-ms)
    (let [closed-ch (doto (chan)
                      (async/close!))]
      (constantly closed-ch))
    (fn []
      (timeout timeout-ms))))

(defn deliver-next-state [state-atom change-listener]
  (let [calculation-timeout-fn (mk-piece-timeout-fn! (:inter-piece-timeout @ai-loop-state))
        piece-move-timeout-fn (mk-piece-timeout-fn! (:piece-move-timeout @ai-loop-state))]
    (go (let [calculation-timeout (calculation-timeout-fn)
              prev-state @state-atom
              path (:path (find-next-piece prev-state))]
          (<! calculation-timeout)
          (loop [[action & remaining-actions] path]
            (let [piece-timeout (piece-move-timeout-fn)
                  change-timeout (change-listener (action-to-key action))]
              (<! piece-timeout)
              (<! change-timeout))
            (when remaining-actions
              (recur remaining-actions)))))))

(defn ai-fast? []
  (= :fast (:type @ai-loop-state)))

(defn set-ai-speed! [value]
  (reset! ai-loop-state value))

(defn toggle-ai-UI-visibility! [should-show]
  (let [box-style (.-style (js/document.getElementById "show-when-ai"))]
    (if should-show
      (set! (.-display box-style) "initial")
      (set! (.-display box-style) "none"))))

(defn toggle-ai-state! [state-atom]
  (let [state @state-atom
        should-start-ai-loop (not (:ai-running @state-atom))]
    (toggle-ai-UI-visibility! should-start-ai-loop)
    (reset!
     state-atom
     (assoc
      state
      :ai-running should-start-ai-loop))
    (reset! ai-loop-state (assoc ai-regular-speed
                                 :should-stop (not should-start-ai-loop)))
    should-start-ai-loop))

(defn start-ai-loop [state-atom change-listener]
  (go-loop [prev-state @state-atom]
    (when-not (:should-stop @ai-loop-state)
      (<! (deliver-next-state state-atom change-listener))
      (let [new-state @state-atom]
        (if (= prev-state new-state)
          (toggle-ai-state! state-atom)
          (recur new-state))))))

(defn create-ai-toggle [state-atom change-listener]
  (fn []
    (let [should-start-ai-loop (toggle-ai-state! state-atom)]
      (when should-start-ai-loop
        (start-ai-loop state-atom change-listener)))))

(defn setup-toggle [state-atom change-listener]
  (let [ai-toggle (create-ai-toggle state-atom change-listener)]
    (keys/setup-key-listener
     (fn [char-code]
       (when (const/toggle-ai char-code)
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
     (condp (fn [expected const-value]
              (expected const-value)) char-code
       const/toggle-ai-speed (set-ai-speed!
                              (if (ai-fast?)
                                ai-regular-speed
                                ai-fast-speed))
       const/toggle-ai-controls
       (do (let [box-style (.-style (js/document.getElementById "ai-vars-area"))]
             #_(println (.-visibility box-style))
             (if (= "hidden" (.-visibility box-style))
               (set! (.-visibility box-style) "visible")
               (set! (.-visibility box-style) "hidden")))
           (let [vars-data (js/document.getElementById "ai-vars-data")
                 update-button (js/document.getElementById "ai-vars-data-update-button")]
             (set! (.-value vars-data) @genome)
             (set! (.-onclick update-button) #(update-genome (.-value vars-data)))))
       nil))))
