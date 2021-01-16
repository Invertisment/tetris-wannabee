(ns core.actions.move
  (:require [core.constants :as const]
            [core.actions.piece-ops :refer [piece-op-scalar get-piece-height set-piece-height]]
            [core.actions.rotate :as rot]
            [core.actions.stick :refer [stick-piece]]
            [core.actions.piece-gen :refer [generate-new-piece]]
            [core.piece-validators :refer [validate]]
            [core.actions.clear-lines :refer [remove-full-lines]]
            [core.actions.new-piece :refer [new-piece]]
            [core.actions.count-score :refer [count-score]]
            [core.piece-validators :as v]))

(defn- stick-and-generate-new-piece [valid? update-score-fn state]
  (->> state
       stick-piece
       remove-full-lines
       (new-piece valid?)))

(defn right [valid? update-score-fn state]
  (let [moved (piece-op-scalar inc identity state)]
    (when (valid? moved)
      moved)))

(defn left [valid? update-score-fn state]
  (let [moved (piece-op-scalar dec identity state)]
    (when (valid? moved)
      moved)))

(defn down [valid? update-score-fn state]
  (update-score-fn
   (count-score
    (let [moved (piece-op-scalar identity inc state)]
      (if (valid? moved)
        moved
        (stick-and-generate-new-piece valid? update-score-fn state))))))

(defn ensure-hold-from-next [valid? update-score-fn state]
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

(defn hold [valid? update-score-fn state]
  (when-let [hold-state (ensure-hold-from-next valid? update-score-fn state)]
    (let [hold-piece (:hold-piece hold-state)
          current (select-keys hold-state (keys hold-piece))
          current-height (get-piece-height current)]
      hold-state
      (assoc
       (merge hold-state (set-piece-height hold-piece current-height))
       :hold-piece (set-piece-height current 0)))))

(defn rotate [valid? update-score-fn state]
  (rot/rotate-piece-clockwise state))

(defn rotate-counter-clockwise [valid? update-score-fn state]
  (rot/rotate-piece-counter-clockwise state))

(defn down-no-validation [state]
  (piece-op-scalar identity inc state))

(defn down-no-validation-by-number [state n]
  (piece-op-scalar identity #(+ % n) state))

(defn- bottom-recursive [valid? update-score-fn state min-found-height max-found-height]
  (->> (iterate down-no-validation state)
       (take-while valid?)
       last))

(defn- bottom-no-check [valid? update-score-fn {:keys [height] :as state}]
  (down
   valid?
   update-score-fn
   (bottom-recursive valid? update-score-fn state 0 (dec height))))

(defn bottom [valid? update-score-fn state]
  (when (:piece state)
    (bottom-no-check valid? update-score-fn state)))

(defn new-field [next-pieces]
  (merge
   {:field (vec (repeat const/field-height const/empty-row))
    :next-pieces (rest next-pieces)
    :score {}
    :levels const/gravity-intervals
    :game-state :started
    :width const/field-width
    :height const/field-height}
   (first next-pieces)))

(defn new-game [valid? update-score-fn state]
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

(defn move [valid? update-score-fn state key-code]
  (validate
   valid?
   ((direction key-code) valid? update-score-fn state)))

(defn next-field-state [update-score-fn state key-code]
  (move v/field-valid? update-score-fn state key-code))

