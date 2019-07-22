(ns core.ai.core
  (:require [core.ai.constants :as ai-const]
            [core.ai.moves :as moves]
            [core.piece-validators :as v]
            [core.ai.placement :as placement]
            [core.ai.genome :as genome]
            [core.actions.move :as move]))

(defn train [generations population-size tetrominoes]
  (let [genomes (genome/create-initial-population population-size)]
    (->> genomes
         (map (fn [genome] (placement/apply-pieces genome (move/new-field tetrominoes))))
         first)
    ;; Currently it doesn't evolve genomes. For now finds best genome from initial population.
    ;; TODO: select
    ;; TODO: evolve
    ))
