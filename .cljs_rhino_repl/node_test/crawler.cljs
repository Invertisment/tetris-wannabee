(ns node-test.crawler
  (:require [cljs.nodejs :as node]
            [node-test.static-data :as data]))

#_(def trends-api (node/require "google-trends-api"))

(defn crawl []
  (let
    [response data/be-response-mock])
  (println "crawling 1"))

