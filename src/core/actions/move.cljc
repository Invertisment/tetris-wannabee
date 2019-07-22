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

(defn hold [valid? update-score-fn gravity-restart-fn state]
  (if-let [hold-piece (:hold-piece state)]
    (let [current (select-keys state (keys hold-piece))]
      (assoc
       (merge state hold-piece)
       :hold-piece current))
    (when-let [[next-piece & next-pieces] (:next-pieces state)]
      (let [current (select-keys state (keys (first (:next-pieces state))))]
        (assoc
         (merge state next-piece)
         :hold-piece current
         :next-pieces next-pieces)))))

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

(defn new-game [valid? update-score-fn gravity-restart-fn state]
  (gravity-restart-fn)
  (update-score-fn
   (merge
    (assoc state
           ;;:field #{}
           :next-pieces (repeatedly #(generate-new-piece const/pieces))
           :score {}
           :levels const/gravity-intervals
           :game-state :started

           :field #{{:coord [1 21], :color "orangered"} {:coord [8 17], :color "gold"}
                    {:coord [7 19], :color "cyan"} {:coord [4 20], :color "cyan"}
                    {:coord [5 19], :color "cyan"} {:coord [6 19], :color "cyan"}
                    {:coord [2 21], :color "orangered"} {:coord [2 20], :color "cyan"}
                    {:coord [1 20], :color "orangered"} {:coord [9 18], :color "gold"}
                    {:coord [0 20], :color "orangered"} {:coord [3 20], :color "cyan"}
                    {:coord [8 18], :color "gold"} {:coord [5 20], :color "cyan"}
                    {:coord [8 19], :color "cyan"} {:coord [9 17], :color "gold"}}
           )
    (generate-new-piece const/pieces))))

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

