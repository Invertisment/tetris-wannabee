(ns core.ai.core
  (:require [core.constants :as const]
            [core.ai.moves :as moves]
            [core.piece-validators :as v]
            [core.ai.placement :as placement]
            [core.ai.genome :as genome]
            [core.actions.move :as move]
            [core.actions.piece-gen :as piece-gen]
            [core.ai.move-analysis :as move-analysis]))

;; cljs doesn't have format
#?(:cljs (def format str))

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

(defn is-game-ended [state]
  (= (:game-state state) :ended))

(defn best-of-n [is-game-ended-fn genome field-count states]
  (let [results (map
                 (partial placement/apply-pieces-while is-game-ended-fn genome)
                 states)
        scores (map get-score results)]
    {:genome genome
     ;;;; Bias towards high-performing but a little risky genome
     ;;:final-score (+ (reduce + scores)
     ;;                (reduce max 0 scores))
     ;; Lowest score elimination
     :final-score (reduce min (first scores) scores)
     #_(reduce min (first scores) scores)
     #_(quot (reduce + scores) field-count)
     :scores scores
     :results results}))

(defn train-any [is-game-ended-fn map-fn field-count tetrominoes-count population-size genomes]
  (let [states (mk-n-states field-count tetrominoes-count)
        elites-with-state
        (->> genomes
             (map-fn
              (fn [genome]
                (best-of-n is-game-ended-fn genome field-count states)))
             (sort-by :final-score)
             (reverse))]
    elites-with-state))

(defn train-whole [map-fn field-count tetrominoes-count population-size genomes]
  (let [elites-with-state (train-any is-game-ended map-fn field-count tetrominoes-count population-size genomes)]
    (println "Best performances:" (map :scores (take 10 elites-with-state))
             "\nWorst performances:" (map :scores (take 10 (reverse elites-with-state)))
             "\nBest genome:" (:genome (first elites-with-state)))
    elites-with-state))

(defn train [generation max-generations genomes tetrominoes-count population-size serialize-fn! map-fn]
  (println "Training" population-size "genomes for" max-generations "generations with" tetrominoes-count "pieces each"
           (format "from generation %s." generation))
  (loop [genomes genomes
         generation generation]
    (serialize-fn! generation genomes)
    (if (< generation max-generations)
      (let [_ (println (format "Generation %s:" generation))
            field-count 2
            ;;elites-risky (train-risky map-fn field-count tetrominoes-count population-size genomes)]
            elites-with-state (train-whole map-fn field-count tetrominoes-count population-size genomes)
            elites (->> elites-with-state
                        (map :genome)
                        #_(genome/filter-distinct)
                        (take (quot population-size 2)))]
        (recur
         (->> (concat
               elites
               (map (partial genome/make-child elites) (cycle (take 10 elites))))
              (take population-size))
         (inc generation)))
      genomes)))
