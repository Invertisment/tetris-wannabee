(ns core.ai.placement
  (:require [core.ai.constants :as ai-const]
            [core.ai.moves :as moves]
            [core.piece-validators :as v]
            [core.ai.genome :as genome]))

(defn to-move [state]
  {:path []
   :state state})

(defn pick-best-piece-placement [genome state]
  (let [placements (moves/find-piece-placements (to-move state))
        scores (->> placements
                    (map (juxt (partial genome/calculate-score genome) identity)))
        outcome (reduce
                 (fn ([[best-score best-move :as a] [score move :as b]]
                      (if (< best-score score)
                        b
                        a)))
                 scores)]
    #_(println "placements" (map :path placements) (first placements))
    (println (map first scores) (first outcome) (:piece (last placements)))
    #_(clojure.pprint/pprint (first scores))
    #_(clojure.pprint/pprint (last scores))
    (->> outcome
         second)))

(defn place-best-piece [genome state]
  (let [best-piece (pick-best-piece-placement genome state)]
    #_(println best-piece)
    (:state best-piece)))

(defn apply-pieces [genome state]
  (loop [state state]
    #_(clojure.pprint/pprint state)
    (if (= (:game-state state) :ended)
      state
      (recur (place-best-piece genome state)))))
