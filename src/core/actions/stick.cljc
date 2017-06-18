(ns core.actions.stick
  (:require [core.constants :as const]
            [clojure.set :refer [union]]))

(defn stick-piece [new-piece-fn state]
  (let
    [{:keys [piece piece-bounds]} (new-piece-fn)]
    (println piece piece-bounds)
    (assoc state
           :field (union
                    (:field state)
                    (:piece state))
           :piece piece
           :piece-bounds piece-bounds)))


