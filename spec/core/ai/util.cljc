(ns core.ai.util
  (:require [core.constants :refer [field-width field-height pieces] :as const]
            [core.ai.placement :as placement]
            [core.piece-validators :as v]))

(defn prepare-piece [raw-piece]
  (const/apply-color raw-piece))

(def square-piece (prepare-piece const/square-piece))
(def line-piece (prepare-piece const/line-piece))
(def square-piece (prepare-piece const/square-piece))
(def z-piece (prepare-piece const/z-piece))
(def empty-field
  {:width 10,
   :field #{},
   :game-state :started,
   :score {:lines-cleared 0}
   :height 22})

(defn new-move [first-piece & other-pieces]
  (placement/to-move
   (assoc
    (merge empty-field first-piece)
    :next-pieces other-pieces)))

(defn new-field [[current-piece & next-pieces] directions]
  (reduce
   (fn [field direction]
     (direction
      v/field-valid?
      identity
      identity
      field))
   (assoc
    (merge empty-field current-piece)
    :next-pieces next-pieces)
   directions))
