(ns node-test.core
  (:use-macros [cljs.core.async.macros :only [go-loop]])
  (:require [cljs.nodejs :as node]
            [cljs.core.async :refer [timeout <!]]
            [node-test.crawler :as crawler]))

(enable-console-print!)

#_(def is-ctrl-c-pressed (atom false))
#_(.on
  node/process
  "SIGINT"
  (fn []
    (println "ctrl c")
    (swap! is-ctrl-c-pressed (constantly true))
    #_(.exit node/process)))

(defn log
  [& item]
  (apply println (.toString (new js/Date)) ":" item ))

(defn crawl-loop
  []
  (go-loop
    []
    (crawler/crawl)
    (<! (timeout 2000))
    (if
      @is-ctrl-c-pressed
      (println "Done")
      (recur))))

(defn -main []
  (log "test")
  (crawl-loop)
  #_(crawler/crawl))

(set! *main-cli-fn* -main)

