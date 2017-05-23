(ns node-test.core 

  (:require [cljs.nodejs :as node]))

(def express (node/require "express"))

(def app (new express))

(defn -main
  []
  (.listen app
           3000
           (fn []
             (js/console.log "App Started at http://localhost:3000"))))

(set! *main-cli-fn* -main)

