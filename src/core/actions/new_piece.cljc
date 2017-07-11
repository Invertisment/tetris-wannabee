(ns core.actions.new-piece
  (:require [core.constants :as const]
            [clojure.set :refer [union]]))

(defn new-piece [valid? new-piece-fn state]
  (let
    [new-state (merge state (new-piece-fn))]
    (if
      (valid? new-state)
      new-state
      (assoc state :game-state :ended))))

