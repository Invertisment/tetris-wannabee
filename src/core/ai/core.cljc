(ns core.ai.core
  (:require [core.constants :as const]
            [core.ai.moves :as moves]
            [core.piece-validators :as v]
            [core.ai.placement :as placement]
            [core.ai.genome :as genome]
            [core.actions.move :as move]
            [core.actions.piece-gen :as piece-gen]))

(def get-score
  (comp :lines-cleared :score))

(defn mk-n-states [field-count tetrominoes-count]
  (map
   (fn [_]
     (move/new-field
      (doall
       (repeatedly
        tetrominoes-count
        (partial piece-gen/generate-new-piece const/pieces)))))
   (range field-count)))
#_(mk-n-states 10 10)

(defn best-of-n [genome field-count states]
  (let [results (doall
                 (map
                  (partial placement/apply-pieces genome)
                  states))
        scores (map get-score results)]
    {:genome genome
     :final-score (reduce min (first scores) scores) #_(quot (reduce + scores) field-count)
     :scores scores
     :results results}))

(defn train [generation max-generations genomes tetrominoes-count population-size serialize-fn! map-fn]
  (println "Training" population-size "genomes for" max-generations "generations with" tetrominoes-count "pieces each"
           (format "from generation %s." generation))
  (loop [genomes genomes
         generation generation]
    (serialize-fn! generation genomes)
    (if (< generation max-generations)
      (let [_ (println (format "Generation %s:" generation))
            field-count 2
            states (mk-n-states field-count tetrominoes-count)
            elites-with-state
            (->> genomes
                 (map-fn
                  (fn [genome]
                    (best-of-n genome field-count states)))
                 (sort-by :final-score)
                 (reverse))
            elites (->> elites-with-state
                        (map :genome)
                        #_(genome/filter-distinct)
                        (take (quot population-size 2)))]
        (println "Best performances:" (map :scores (take 10 elites-with-state))
                 "\nWorst performances:" (map :scores (take 10 (reverse elites-with-state)))
                 "\nBest genome:" (first elites))
        (recur
         (->> (concat
               elites
               (map (partial genome/make-child elites) (cycle elites)))
              (take population-size))
         (inc generation)))
      genomes)))
