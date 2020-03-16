(ns core.main
  (:require-macros [cljs.core.async.macros :refer [go-loop]])
  (:require [cljs.core.async :refer [<! >! chan dropping-buffer go]]
            [core.field :as fi]
            [core.core :refer [create-change-listener start-game]]
            [core.keys :refer [setup-key-listener]]
            [core.state :as state]
            [core.piece-validators :as v]
            [core.constants :as c]
            [core.ui.score :as score]
            [core.ui.time :as time-helper]
            [core.actions.gravity :as gravity]
            [core.ui.ai :as ui.ai]))

(enable-console-print!)

(when (not c/debug)
  (set! *print-fn* (fn [& a])))

(defn game-loop []
  (state/before-save-piece-loop)
  (go-loop
      []
    (let [state (<! state/after-save-piece-ch)]
      (fi/show! state/field-pixels state)
      (when state (recur)))))

(defn time-reset-loop [game-tick-ch on-tick-listener]
  (go-loop []
    (let [state (<! game-tick-ch)]
      (time-helper/reset-timer! on-tick-listener state)
      (when state (recur)))))

(defn -main []
  (let
      [game-tick-ch (chan (dropping-buffer 1))
       show-score-update-gravity-fn!
       (fn [state]
         (go
           (>! game-tick-ch state))
         (score/show-score! state))
       change-listener
       (create-change-listener
        state/field
        state/before-save-piece-ch
        v/field-valid?
        show-score-update-gravity-fn!)]
    (start-game
     state/field
     state/before-save-piece-ch
     show-score-update-gravity-fn!)
    (game-loop)
    (ui.ai/setup state/field change-listener)
    (time-reset-loop game-tick-ch (gravity/create-pull-down-fn change-listener))
    (setup-key-listener change-listener)))

(-main)

