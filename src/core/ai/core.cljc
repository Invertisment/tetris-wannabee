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

(defn train [max-generations population-size tetrominoes-count map-fn]
  (println "Training"population-size
           "genomes for"max-generations
           "generations with"tetrominoes-count"pieces each")
  (loop [genomes (genome/create-initial-population population-size)
         generation 0]
    (if (< generation max-generations)
      (let [elites-with-score
            (->> genomes
                 (map-fn
                  (fn [genome]
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
        (println "Generation:"generation
                 "\t Best performance:"(get-score (first elites-with-score))
                 "\t Genome:"(first elites))
        (recur
         (->> (concat
               elites
               (repeatedly (fn [] (genome/make-child elites))))
              (take population-size))
         (inc generation)))
      genomes)))

#_(train 50 50 500 pmap)
