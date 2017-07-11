(ns core.actions.stick
  (:require [core.constants :as const]
            [clojure.set :refer [union]]))

(defn stick-piece [clear-lines-fn state]
  (clear-lines-fn
    (assoc (dissoc
             state
             :piece
             :piece-bounds)
           :field (union
                    (:field state)
                    (:piece state)))))


