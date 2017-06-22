(ns core.main
  (:require-macros [cljs.core.async.macros :refer [go-loop]])
  (:require [cljs.core.async :refer [timeout <!]]
            [core.field :as fi]
            [core.core :refer [create-change-listener]]
            [core.keys :refer [setup-key-listener]]
            [core.state :as state]
            [core.piece-validators :as v]
            [core.constants :as c]))

(enable-console-print!)

(defn game-loop []
  (state/before-save-piece-loop)
  (go-loop
    []
    (let [state (<! state/after-save-piece-ch)]
      (fi/show! state/field-pixels state)
      (when state (recur)))))

(defn -main []
  (game-loop)
  (setup-key-listener
    (create-change-listener
      state/field
      state/before-save-piece-ch
      v/field-valid?)))

(-main)

