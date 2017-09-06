(ns core.main
  (:require-macros [cljs.core.async.macros :refer [go-loop]])
  (:require [cljs.core.async :refer [timeout <!]]
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

(defn -main []
  (letfn
    [#_(change-listener []
       (create-change-listener
         state/field
         state/before-save-piece-ch
         v/field-valid?
         score/show-score!
         (fn [] (println "restart of gravity"))))
     #_(gravity-restart-fn
       []
       (time-helper/setup-fall
         state/field
         (gravity/create-pull-down-fn change-listener)))])
  (start-game
    state/field
    state/before-save-piece-ch
    score/show-score!
    (fn [] (println "restart of gravity")))
  (game-loop)
  (setup-key-listener
    (create-change-listener
      state/field
      state/before-save-piece-ch
      v/field-valid?
      score/show-score!
      (fn [] (println "restart of gravity"))))
  #_(time-helper/setup-fall
      state/field
      (gravity/create-pull-down-fn change-listener)))

(-main)

