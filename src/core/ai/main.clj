(ns core.ai.main
  (:gen-class)
  (:require [core.ai.core :as ai-core]
            [clojure.string :as str]
            [clojure.java.io :as io]
            [clojure.java.shell :as sh]
            [core.ai.genome :as genome]))

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

(defn -main [& args]
  (let [deserialized (deserialize)
        generation (or (:generation deserialized) 0)
        max-generations (or (:max-generations deserialized) 500)
        population-size (or (:population-size deserialized) 50)
        genomes (or (:genomes deserialized)
                    (genome/create-initial-population population-size))
        max-tetrominoes-count (or (:max-tetrominoes-count deserialized) 1000)]
    (ai-core/train
     generation
     max-generations
     genomes
     max-tetrominoes-count
     (partial serialize-fn max-generations population-size max-tetrominoes-count))))
