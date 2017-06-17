(ns core.actions.stick
  (:require [core.constants :as const]
            [clojure.set :refer [union]]))

(defn stick-piece [new-piece-fn bounds-fn state]
  (let
    [new-piece (new-piece-fn)]
    (assoc state
           :field (union
                    (:field state)
                    (:piece state))
           :piece new-piece
           :piece-bounds (bounds-fn new-piece))))


