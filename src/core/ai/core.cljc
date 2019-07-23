(ns core.ai.core
  (:require [core.ai.constants :as ai-const]
            [core.constants :as const]
            [core.ai.moves :as moves]
            [core.piece-validators :as v]
            [core.ai.placement :as placement]
            [core.ai.genome :as genome]
            [core.actions.move :as move]
            [core.actions.piece-gen :as piece-gen]))

(def get-score
  (comp :lines-cleared :score second))

(defn train [max-generations population-size tetrominoes-count]
  (loop [genomes (genome/create-initial-population population-size)
         generation 0]
    (if (< generation max-generations)
      (let [elites-with-score
            (->> genomes
                 (pmap (fn [genome]
                         [genome
                          (placement/apply-pieces
                           genome
                           (move/new-field
                            (repeatedly
                             tetrominoes-count
                             (partial piece-gen/generate-new-piece const/pieces))))]))
                 (sort-by get-score)
                 (reverse)
                 (take (quot population-size 2)))
            elites (map first elites-with-score)]
        (println (format "Generation: %s\t Best performance: %s\t Genome: %s" generation (get-score (first elites-with-score)) (first elites)))
        (recur
         (->> (concat
               elites
               (repeatedly (fn [] (genome/make-child elites))))
              (take population-size))
         (inc generation)))
      genomes)))

#_(train 50 50 500)
