(ns core.main
  (:require-macros [cljs.core.async.macros :refer [go-loop]])
  (:require [cljs.core.async :refer [timeout <!]]
            [core.field :as fi]
            [core.core :refer [create-change-listener]]
            [core.keys :refer [setup-key-listener]]))

(enable-console-print!)

(defn game-loop []
  (go-loop
    []
    (let [piece-state (<! fi/current-piece-pipe)]
      (println "piece-state" piece-state)
      (fi/show piece-state)
      (when piece-state (recur)))))

(defn -main []
  (game-loop)
  (setup-key-listener
    (create-change-listener
      fi/get-curr-piece
      fi/get-field-blocks
      fi/current-piece-pipe)))

(-main)

