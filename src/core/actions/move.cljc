(ns core.actions.move
  (:require [core.constants :as const]
            [core.actions.piece-ops :refer [piece-op-scalar get-piece-height set-piece-height]]
            [core.actions.rotate :as rot]
            [core.actions.stick :refer [stick-piece]]
            [core.actions.piece-gen :refer [generate-new-piece]]
            [core.piece-validators :refer [validate]]
            [core.actions.clear-lines :refer [remove-full-lines]]
            [core.actions.new-piece :refer [new-piece]]
            [core.actions.count-score :refer [count-score]]))

(defn- stick-and-generate-new-piece [valid? update-score-fn gravity-restart-fn state]
  (new-piece
   valid?
   (update-score-fn
    (count-score
     (stick-piece
      remove-full-lines
      state)))))

(defn right [valid? update-score-fn gravity-restart-fn state]
  (let [moved (piece-op-scalar inc identity state)]
    (when (valid? moved)
      moved)))

(defn left [valid? update-score-fn gravity-restart-fn state]
  (let [moved (piece-op-scalar dec identity state)]
    (when (valid? moved)
      moved)))

(defn down [valid? update-score-fn gravity-restart-fn state]
  (let [moved (piece-op-scalar identity inc state)]
    (if (valid? moved)
      moved
      (stick-and-generate-new-piece valid? update-score-fn gravity-restart-fn state))))

(defn ensure-hold-from-next [valid? update-score-fn gravity-restart-fn state]
  (if (:hold-piece state)
    state
    (let [[next-piece & next-pieces] (:next-pieces state)
          current-piece (select-keys state (keys (first (:next-pieces state))))
          hold-state (assoc
                      state
                      :hold-piece next-piece
                      :next-pieces next-pieces)]
      (when (valid? hold-state)
        hold-state))))

(defn hold [valid? update-score-fn gravity-restart-fn state]
  (when-let [hold-state (ensure-hold-from-next valid? update-score-fn gravity-restart-fn state)]
    (let [hold-piece (:hold-piece hold-state)
          current (select-keys hold-state (keys hold-piece))
          current-height (get-piece-height current)]
      hold-state
      (assoc
       (merge hold-state (set-piece-height hold-piece current-height))
       :hold-piece (set-piece-height current 0)))))

(defn rotate [valid? update-score-fn gravity-restart-fn state]
  (rot/rotate-piece-clockwise state))

(defn rotate-counter-clockwise [valid? update-score-fn gravity-restart-fn state]
  (rot/rotate-piece-counter-clockwise state))

(defn bottom [valid? update-score-fn gravity-restart-fn state]
  (when (:piece state)
    (down
     valid?
     update-score-fn
     gravity-restart-fn
     (last (take-while
            valid?
            (iterate (partial piece-op-scalar identity inc) state))))))

(defn new-field [next-pieces]
  (merge
   {:field #{}
    :next-pieces (rest next-pieces)
    :score {}
    :levels const/gravity-intervals
    :game-state :started
    :width const/field-width
    :height const/field-height}
   (first next-pieces)))

(defn new-game [valid? update-score-fn gravity-restart-fn state]
  (gravity-restart-fn)
  (update-score-fn
   (merge
    state
    (new-field (repeatedly #(generate-new-piece const/pieces))))))

(defn gravity-down [& args]
  (apply down args))

(defn nop [& args])

(defn direction [const-value]
  (condp = const-value
    const/rotate #'rotate
    const/left #'left
    const/right #'right
    const/down #'down
    const/bottom #'bottom
    const/hold #'hold
    const/rotate-clockwise #'rotate
    const/rotate-counter-clockwise #'rotate-counter-clockwise
    const/new-game #'new-game
    const/gravity-pull-down #'gravity-down
    #'nop))

(defn move [valid? update-score-fn gravity-restart-fn state key-code]
  (validate
   valid?
   ((direction key-code) valid? update-score-fn gravity-restart-fn state)))

(defn next-field-state [valid? update-score-fn gravity-restart-fn state key-code]
  (move valid? update-score-fn gravity-restart-fn state key-code))

