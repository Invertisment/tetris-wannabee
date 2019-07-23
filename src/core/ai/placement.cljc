(ns core.ai.placement
  (:require [core.ai.constants :as ai-const]
            [core.ai.moves :as moves]
            [core.piece-validators :as v]
            [core.ai.genome :as genome]))

(defn to-move [state]
  {:path []
   :state state})

(defn pick-best-piece-placement [genome {:keys [width] :as state}]
  #_(println "pick-best-piece-placement"
             :piece (:piece state)
             :field (:field state)
             :next-pieces (:next-pieces state))
  (->> (to-move state)
       (moves/find-piece-placements)
       (map (juxt (partial genome/calculate-score genome) identity))
       (reduce
        (fn ([[best-score best-move :as a] [score move :as b]]
             (if (< best-score score)
               b
               a))))
       second))

(defn place-best-piece [genome state]
  (let [best-piece (pick-best-piece-placement genome state)]
    (:state best-piece)))

(defn apply-pieces [genome state]
  (loop [state state]
    (if (= (:game-state state) :ended)
      state
      (recur (place-best-piece genome state)))))
