(ns core.actions.move
  (:require [core.constants :as const]
            [core.actions.piece-ops :refer [piece-op-scalar]]
            [core.actions.rotate :as rot]
            [core.actions.stick :refer [stick-piece]]
            [core.actions.piece-gen :refer [generate-new-piece]]
            [core.piece-validators :refer [validate]]
            [core.actions.clear-lines :refer [remove-full-lines]]
            [core.actions.new-piece :refer [new-piece]]
            [core.actions.count-score :refer [count-score]]))

(defn- stick-and-generate-new-piece [valid? update-score-fn state]
  (new-piece
    valid?
    (partial generate-new-piece const/pieces)
    (update-score-fn
      (count-score
        (stick-piece
          remove-full-lines
          state)))))

(defn right [valid? update-score-fn state]
  (piece-op-scalar inc identity state))

(defn left [valid? update-score-fn state]
  (piece-op-scalar dec identity state))

(defn down [valid? update-score-fn state]
  (let [new-one
        (let
          [new-state (piece-op-scalar identity inc state)]
          (if (valid? new-state)
            new-state
            (stick-and-generate-new-piece valid? update-score-fn state)))]
    new-one))

(defn rotate [valid? update-score-fn state]
  (rot/rotate-piece-clockwise state))

(defn rotate-counter-clockwise [valid? update-score-fn state]
  (rot/rotate-piece-counter-clockwise state))

(defn bottom [valid? update-score-fn state]
  (when
    (:piece state)
    (down
      valid?
      update-score-fn
      (last (take-while
              valid?
              (iterate (partial piece-op-scalar identity inc) state))))))

(defn new-game [valid? update-score-fn state]
  (update-score-fn
    (merge
      (assoc state
             :field #{}
             :next-piece (generate-new-piece const/pieces)
             :score {})
      (generate-new-piece const/pieces))))

(defn gravity-down [& args]
  (apply down args))

(defn nop [& args]
  (println "Unknown direction:" args))

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
    const/gravity-pull-down #'gravity-down
    #'nop))

(defn move [valid? update-score-fn state key-code]
  (validate
    valid?
    ((direction key-code) valid? update-score-fn state)))

(defn next-field-state [valid? update-score-fn state key-code]
  (move valid? update-score-fn state key-code))

