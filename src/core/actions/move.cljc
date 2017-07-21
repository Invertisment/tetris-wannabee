(ns core.actions.move
  (:require [core.constants :as const]
            [core.actions.piece-ops :refer [piece-op-scalar]]
            [core.actions.rotate :as rot]
            [core.actions.stick :refer [stick-piece]]
            [core.actions.piece-gen :refer [generate-new-piece]]
            [core.piece-validators :refer [validate]]
            [core.actions.clear-lines :refer [remove-full-lines]]
            [core.actions.new-piece :refer [new-piece]]
            [core.actions.count-score :refer [count-score]]
            [core.ui.score :as score]))

(defn right [valid? state]
  (piece-op-scalar inc identity state))

(defn left [valid? state]
  (piece-op-scalar dec identity state))

(defn down [valid? state]
  (let
    [new-state (piece-op-scalar identity inc state)]
    (if (valid? new-state)
      new-state
      (new-piece
        valid?
        (partial generate-new-piece const/pieces)
        (score/show-score!
          (count-score
            (stick-piece
              remove-full-lines
              state)))))))

(defn rotate [valid? state]
  (rot/rotate-piece-clockwise state))

(defn rotate-counter-clockwise [valid? state]
  (rot/rotate-piece-counter-clockwise state))

(defn bottom [valid? state]
  (when
    (:piece state)
    (down
      valid?
      (last (take-while
              valid?
              (iterate (partial piece-op-scalar identity inc) state))))))

(defn new-game [valid? state]
  (score/show-score!
    (merge
      (assoc state
             :field #{}
             :next-piece (generate-new-piece const/pieces)
             :score {})
      (generate-new-piece const/pieces))))

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
    const/new-game #'new-game
    #'nop))

(defn move [valid? state key-code]
  (validate
    valid?
    ((direction key-code) valid? state)))

(defn next-field-state [valid? state key-code]
  (move valid? state key-code))

