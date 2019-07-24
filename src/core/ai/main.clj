(ns core.ai.main
  (:gen-class)
  (:require [core.ai.core :as ai-core]))

(defn -main [& args]
  (ai-core/train 50 50 500 pmap))
