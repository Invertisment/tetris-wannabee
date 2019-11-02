(ns core.ai.core
  (:require [core.constants :as const]
            [core.ai.moves :as moves]
            [core.piece-validators :as v]
            [core.ai.placement :as placement]
            [core.ai.genome :as genome]
            [core.actions.move :as move]
            [core.actions.piece-gen :as piece-gen]))

(def get-score
  (comp :lines-cleared :score second))

(defn train [generation max-generations genomes tetrominoes-count serialize-fn!]
  (let [population-size (count genomes)]
    (println "Training" population-size
             "genomes for" max-generations
             "generations with" tetrominoes-count "pieces each"
             "generation:" generation)
    (loop [genomes genomes
           generation generation]
      (serialize-fn! generation genomes)
      (if (< generation max-generations)
        (let [field (move/new-field
                     (repeatedly
                      tetrominoes-count
                      (partial piece-gen/generate-new-piece const/pieces)))
              elites-with-score
              (->> genomes
                   (pmap
                    (fn [genome]
                      [genome
                       (placement/apply-pieces
                        genome
                        field)]))
                   (sort-by get-score)
                   (reverse)
                   (take (quot population-size 2)))
              elites (map first elites-with-score)]
          (println "Generation:"generation
                   "\t Best 5 performances:"(map get-score (take 5 elites-with-score))
                   "\t Genome:"(first elites))
          (recur
           (->> (concat
                 elites
                 (repeatedly (fn [] (genome/make-child elites))))
                (take population-size))
           (inc generation)))
        genomes))))

#_(train 50 50 500 pmap)
