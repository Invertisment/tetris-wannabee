(ns core.actions.move
  (:require [core.constants :as const]
            [core.actions.piece-ops :refer [piece-op-scalar]]
            [core.actions.rotate :as rot]
            [core.actions.stick :refer [stick-piece]]
            [core.actions.piece-gen :refer [generate-new-piece]]
            [core.piece-validators :refer [validate]]
            [core.actions.clear-lines :refer [remove-full-lines]]))

(defn right [valid? state]
  (piece-op-scalar inc identity state))

(defn left [valid? state]
  (piece-op-scalar dec identity state))

(defn down [valid? state]
  (let
    [new-state (piece-op-scalar identity inc state)]
    (if (valid? new-state)
      new-state
      (stick-piece
        (partial generate-new-piece const/pieces)
        remove-full-lines
        state))))

(defn rotate [valid? state]
  (rot/rotate-piece-clockwise state))

(defn rotate-counter-clockwise [valid? state]
  (rot/rotate-piece-counter-clockwise state))

(defn bottom [valid? state]
  (down
    valid?
    (last (take-while
            valid?
            (iterate (partial piece-op-scalar identity inc) state)))))

(defn nop [& _])

(defn direction [const-value]
  (condp = const-value
    const/rotate #'rotate
    const/left #'left
    const/right #'right
    const/down #'down
    const/bottom #'bottom
    const/rotate-clockwise #'rotate
    const/rotate-counter-clockwise #'rotate-counter-clockwise
    #'nop))

(defn move [valid? state key-code]
  (validate
    valid?
    ((direction key-code) valid? state)))

(defn next-field-state [valid? state key-code]
  (move valid? state key-code))

