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

(defn train [generation max-generations genomes tetrominoes-count population-size serialize-fn! map-fn]
  (println "Training" population-size
           "genomes for" max-generations
           "generations with" tetrominoes-count "pieces each."
           "Generation:" generation)
  (loop [genomes genomes
         generation generation]
    (serialize-fn! generation genomes)
    (if (< generation max-generations)
      (let [field (move/new-field
                   (doall
                    (repeatedly
                     (+ 100000 tetrominoes-count)
                     (partial piece-gen/generate-new-piece const/pieces))))
            elites-with-state
            (->> genomes
                 (map-fn
                  (fn [genome]
                    [genome
                     (placement/apply-pieces
                      genome
                      field)]))
                 (sort-by get-score)
                 (reverse))
            elites (->> elites-with-state
                        (map first)
                        (genome/filter-distinct)
                        (take (quot population-size 2)))]
        (println "Generation:" generation
                 "\t Best performances:" (map get-score (take 10 elites-with-state))
                 "\t Worst performances:" (map get-score (take 10 (reverse elites-with-state)))
                 "\t Genome:" (first elites))
        (recur
         (->> (concat
               elites
               (repeatedly (fn [] (genome/make-child elites))))
              (take population-size))
         (inc generation)))
      genomes)))

