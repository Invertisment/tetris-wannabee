(ns core.actions.invalid-position
  (:require [core.constants :as const]
            [clojure.set :refer [union]]))

(defn merge-piece-to-field [state]
  (assoc
    state
    :field
    (union
      (:field state)
      (:piece state))
    :piece #{}))

(defn handle-invalid-position [on-down-fn action state]
  (when
    (= action const/down)
    (on-down-fn state)))

(defn recover-bad-placement [action state]
  (handle-invalid-position
    merge-piece-to-field
    action
    state))
