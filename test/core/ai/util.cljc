(ns core.ai.util
  (:require [core.constants :refer [field-width field-height pieces] :as const]
            [core.ai.placement :as placement]
            [core.piece-validators :as v]))

(defn prepare-piece [raw-piece]
  (const/apply-color raw-piece))

(def square-piece (prepare-piece const/square-piece))
(def line-piece (prepare-piece const/line-piece))
(def l-piece (prepare-piece const/l-piece))
(def j-piece (prepare-piece const/j-piece))
(def t-piece (prepare-piece const/t-piece))
(def square-piece (prepare-piece const/square-piece))
(def z-piece (prepare-piece const/z-piece))
(def empty-field
  {:width 10,
   :field (vec (repeat const/field-height const/empty-row)),
   :game-state :started,
   :score {:lines-cleared 0}
   :height const/field-height})

(defn new-move [first-piece & other-pieces]
  (placement/to-move
   (assoc
    (merge empty-field first-piece)
    :next-pieces other-pieces)))

(defn simplify-piece-color [{:keys [piece] :as rich-piece}]
  (update rich-piece
          :piece
          (fn [piece-pixels]
            (map (fn [{:keys [color] :as pixel}]
                   (assoc pixel :color (subs color 0 1)))
                 piece-pixels))
          #_map
          #_(fn [px]
              (assoc px :color "x"))))
#_((juxt simplify-piece-color identity) line-piece)

(defn new-field [[current-piece & next-pieces] directions]
  (reduce
   (fn [field direction]
     (direction
      v/field-valid?
      identity
      field))
   (assoc
    (merge empty-field (simplify-piece-color current-piece))
    :next-pieces (map simplify-piece-color next-pieces))
   directions))
