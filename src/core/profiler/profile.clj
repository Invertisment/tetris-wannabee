(ns core.profiler.profile
  (:require [core.ai.core :as ai-core]
            [clojure.string :as str]
            [clojure.java.io :as io]
            [clojure.java.shell :as sh]
            [core.ai.genome :as genome]
            [core.ai.main :as main]
            [flames.core :as flames]))

(defn run-task []
  (let [deserialized (main/deserialize)
        generation (or (:generation deserialized) 0)
        population-size (or (:population-size deserialized) 50)
        genomes (or (seq (map genome/ensure-weight-existence (:genomes deserialized))))]
    (ai-core/train
     generation
     200
     genomes
     100
     (constantly nil)
     pmap)))

(defn profile []
  (identity #_with-open #_[flames (flames/start! {:port 54321, :host "localhost"})]
    (let [f (future
              (println "start")
              (run-task)
              (println "done"))]
      (Thread/sleep 50000)
      (future-cancel f)
      (Thread/sleep 100)
      (println (future-cancelled? f))
      )))

;; https://github.com/jstepien/flames
;; http://localhost:54321/flames.svg
#_(def flames (flames/start! {:port 54321, :host "localhost"}))
#_(flames/stop! flames)

#_(profile)

#_(run-task)
