(ns core.actions.new-piece
  (:require [core.constants :as const]
            [clojure.set :refer [union]]))

(defn new-piece [valid? new-piece-fn state]
  (let
    [new-state (merge
                 state
                 (:next-piece state)
                 {:next-piece (new-piece-fn)})]
    (if
      (valid? new-state)
      new-state
      (assoc state :game-state :ended))))

