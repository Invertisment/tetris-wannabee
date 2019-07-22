(ns core.ai.placement
  (:require [core.ai.constants :as ai-const]
            [core.ai.moves :as moves]
            [core.piece-validators :as v]))

(defn to-move [field]
  {:path []
   :state field})

(defn pick-best-piece-placement [genome field]
  (let [piece-moves (moves/find-piece-placements (to-move field))]
    (first piece-moves)))

(defn place-best-piece [genome field]
  (let [best-piece (pick-best-piece-placement genome field)]
    (:state best-piece)))

(defn apply-pieces [genome field]
  (loop [field field]
    (if (= (:game-state field) :ended)
      field
      (recur (place-best-piece genome field)))))
