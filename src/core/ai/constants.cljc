(ns core.ai.constants)

(def evaluation-move-limit 500)
(def mutation-rate 0.05)
(def mutation-step 0.2)

;; top-level iteration variables
(def genome-size 50)
(def genomes [])
;; iteration variables
(def current-genome {})
(def generation [])
(def elites [])
