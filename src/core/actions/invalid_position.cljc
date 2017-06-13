(ns core.actions.invalid-position
  (:require [core.constants :as const]
            [clojure.set :refer [union]]))

(defn merge-piece-to-field [new-piece-fn state]
  (assoc state
         :field (union
                  (:field state)
                  (:piece state))
         :piece (new-piece-fn)))

(defn handle-invalid-position [on-down-fn action state]
  (when
    (= action const/down)
    (on-down-fn state)))

(defn recover-bad-placement [new-piece-fn action state]
  (handle-invalid-position
    (partial merge-piece-to-field new-piece-fn)
    action
    state))

(defn build-recover-bad-placement [new-piece-fn action state]
  (partial recover-bad-placement new-piece-fn))

