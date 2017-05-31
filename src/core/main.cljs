(ns core.main
  (:require #_[cljs.nodejs :as node]
            [cljs.core.async :refer [timeout <!]]
            [core.fabric :refer [smth]]
            [core.core :refer [function]]))

(enable-console-print!)

(defn -main []
  (println "it workd!")
  (println function)
  (println smth))

(-main)

