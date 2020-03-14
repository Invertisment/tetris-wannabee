(ns core.actions.stick
  (:require [core.constants :as const]
            [clojure.set :refer [union]]))

(defn stick-piece [clear-lines-fn {:keys [field piece] :as state}]
  (clear-lines-fn
   (assoc
    (dissoc
     state
     :piece
     :piece-bounds)
    :field
    (reduce
     (fn [field-2d {:keys [coord color]}]
       (assoc-in field-2d (reverse coord) color))
     field
     piece))))

