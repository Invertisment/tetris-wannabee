(ns core.main
  (:require #_[cljs.nodejs :as node]
            [cljs.core.async :refer [timeout <!]]
            [core.fabric :refer [smth]]
            [core.core :refer [function]]
            [core.keys :refer [setup-key-listener]]))

(enable-console-print!)

(defn key-listener [char-code]
  (println "key pressed:" char-code))

(defn -main []
  (println "it workd!")
  #_(println function)
  #_(println smth)
  (setup-key-listener key-listener))

(-main)

