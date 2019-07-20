(ns core.ai.util
  (:require [core.constants :refer [field-width field-height pieces] :as const]
            [core.ai.placement :as placement]))

(defn prepare-piece [raw-piece]
  (const/apply-color raw-piece))

(def square-piece (prepare-piece const/square-piece))
(def line-piece (prepare-piece const/line-piece))
(def z-piece (prepare-piece const/z-piece))
(def empty-field
  {:width 10,
   :field #{},
   :game-state :started,
   :score {:lines-cleared 0}
   :height 22})

(defn new-move [first-piece & other-pieces]
  (placement/new-move
   (assoc
    (merge empty-field first-piece)
    :next-pieces other-pieces)))
