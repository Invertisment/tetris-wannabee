(ns core.ai.main
  (:gen-class)
  (:require [core.ai.core :as ai-core]
            [clojure.string :as str]
            [clojure.java.io :as io]
            [clojure.java.shell :as sh]
            [core.ai.genome :as genome]
            [core.ai.compute-utils :as compute]))

(defn get-git-revision []
  (->> (sh/sh "git" "rev-parse" "--short" "HEAD")
       (:out)
       (str/trim)))

(defn get-filename []
  (str "model-" (get-git-revision) ".edn"))

(defn serialize-fn [max-generations population-size max-tetrominoes-count generation genomes]
  (spit
   (get-filename)
   {:generation generation
    :genomes genomes
    :max-generations max-generations
    :population-size population-size
    :max-tetrominoes-count max-tetrominoes-count}))

(defn deserialize []
  (let [filename (get-filename)]
    (when (.exists (io/file filename))
      (read-string (slurp filename)))))

(defn ensure-genomes [genome-li population-size]
  (let [genomes (seq (map genome/ensure-weight-existence genome-li))
        genome-count (count genomes)]
    (if (< genome-count population-size)
      (do (printf "Found %s genomes. Capping to %s.\n" genome-count population-size)
          (concat genomes (genome/create-initial-population (- population-size genome-count))))
      (do (printf "Loaded %s genomes (needed %s).\n" genome-count population-size)
          genomes))))

(defn -main [& args]
  (println "Version:" (get-git-revision))
  (let [deserialized (deserialize)
        generation (or (:generation deserialized) 0)
        max-generations (or (:max-generations deserialized) 500)
        population-size (or (:population-size deserialized) 100)
        genomes (ensure-genomes (:genomes deserialized) population-size)
        max-tetrominoes-count (or (:max-tetrominoes-count deserialized) 100000)]
    (ai-core/train
     generation
     max-generations
     genomes
     max-tetrominoes-count
     population-size
     (partial serialize-fn max-generations population-size max-tetrominoes-count)
     #_compute/future-map
     compute/back-pressure-map)))
