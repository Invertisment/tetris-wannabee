(ns core.ai.compute-utils
  (:require [clojure.core.async :refer [>! go-loop alt! chan to-chan onto-chan go <! <!!] :as async]
            [clojure.core.reducers :as r]))

(defn future-map [f li]
  (->> li
       (map #(future (f %)))
       doall
       (map deref)
       #_(map-indexed
          (fn [i ref]
            (let [out (deref ref)]
              (println "Finished" i)
              out)))))
#_(future-map inc [1 2 3 4 5])

;; https://dzone.com/articles/clojure-concurrency-and-blocking-with-coreasync
;; Doesn't use multiple threads.
;; Go block pool can get exhausted on machines that have 8+ cores.
(defn back-pressure-map [f li]
  (let [input-ch-li [(to-chan li)]
        f-print (fn [input]
                  (let [out (f input)]
                    (print ".")
                    (flush)
                    out))
        output-ch (async/merge
                   (map
                    (fn [_] (async/map f-print input-ch-li))
                    (range 20)))
        out (<!! (async/into () output-ch))]
    (println)
    out))
#_(back-pressure-map inc [1 2 3 4 5])
