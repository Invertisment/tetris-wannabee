(ns core.main
  (:require-macros [cljs.core.async.macros :refer [go-loop]])
  (:require [cljs.core.async :refer [timeout <! chan dropping-buffer]]
            [core.field :as fi]
            [core.core :refer [create-change-listener start-game]]
            [core.keys :refer [setup-key-listener]]
            [core.state :as state]
            [core.piece-validators :as v]
            [core.constants :as c]
            [core.ui.score :as score]
            [core.ui.time :as time-helper]
            [core.actions.gravity :as gravity]))

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

(defn time-loop [time-tick-ch on-tick-listener]
  (go-loop []
    (let [tick (<! time-tick-ch)]
      (println tick)
      (on-tick-listener)
      (when tick (recur)))))

(defn -main []
  (let
      [tick-ch (chan (dropping-buffer 1))
       gravity-restart-fn (fn [] (time-helper/setup-fall state/field tick-ch))
       change-listener
       (create-change-listener
        state/field
        state/before-save-piece-ch
        v/field-valid?
        score/show-score!
        gravity-restart-fn)]
    (start-game
     state/field
     state/before-save-piece-ch
     score/show-score!
     gravity-restart-fn)
    (game-loop)
    (time-loop tick-ch (gravity/create-pull-down-fn change-listener))
    (setup-key-listener change-listener)))

(-main)

