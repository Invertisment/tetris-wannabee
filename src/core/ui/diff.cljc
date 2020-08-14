(ns core.ui.diff
  (:require [clojure.set :refer [difference]]))

(defn block-diff [[olds news]]
  {:add (difference news olds)
   :rem (difference olds news)})
