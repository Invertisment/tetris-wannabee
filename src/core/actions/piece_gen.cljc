(ns core.actions.piece-gen
  (:require [core.constants :refer [pieces]]))

(defn generate-new-piece [pieces]
  (when (not-empty pieces)
    (let [piece (rand-nth pieces)]
      piece)))

