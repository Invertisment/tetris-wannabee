(ns core.actions.move
  (:require [core.constants :as const]
            [core.actions.piece-ops :refer [piece-op-scalar-valid]]
            [core.actions.stick :refer [stick-piece]]))

(defn right [valid? state]
  (piece-op-scalar-valid valid? state inc identity))

(defn left [valid? state]
  (piece-op-scalar-valid valid? state dec identity))

(defn down [valid? state]
  (let
    [new-state (piece-op-scalar-valid valid? state identity inc)]
    (if
      new-state
      new-state
      (stick-piece (constantly #{[1 1]}) state))))

(defn rotate [valid? state]
  (println "rotate")
  (piece-op-scalar-valid valid? state identity dec))

(defn bottom [valid? state]
  (println "bottom")
  (piece-op-scalar-valid valid? state identity inc))

(defn nop [& _])

(defn direction [const-value]
  (condp = const-value
    const/rotate #'rotate
    const/left #'left
    const/right #'right
    const/down #'down
    const/bottom #'bottom
    #'nop))

(defn move [valid? state key-code]
  ((direction key-code) valid? state))

(defn next-field-state [valid? state key-code]
  (move valid? state key-code))

