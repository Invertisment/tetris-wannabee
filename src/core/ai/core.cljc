(ns core.ai.core
  (:require [core.ai.constants :as ai-const]
            [core.ai.moves :as moves]
            [core.piece-validators :as v]))

(defn new-initial-coefficient []
  (- (rand) 0.5))

;; https://www.youtube.com/watch?v=xLHCMMGuN0Q
(defn new-initial-genome [genome-id]
  {:id (str "genome-" genome-id)
   ;; rows cleared per piece placement
   :rows-cleared (new-initial-coefficient)
   ;; absolute height of the highest column to the power of 2
   :weighted-height (new-initial-coefficient)
   ;; sum of all block heights
   :cumulative-height (new-initial-coefficient)
   ;; sum of all empty cells underground
   :holes (new-initial-coefficient)
   ;; sum of absolute differences between neighbours
   ;; if the game field is empty this is zero
   ;; except one outlier (for deepest well)
   :roughness (new-initial-coefficient)
   ;; sum of all flat neighbours
   ;; if the game field is empty this is the width of the map
   ;; except one outlier (for deepest well)
   :flatness (new-initial-coefficient)
   ;; deepest hole relatively to it's immediate neighbours
   :deepest-well-depth (new-initial-coefficient)})

(defn create-initial-population [population-size]
  (->> (repeatedly rand)
       (take population-size)
       (map new-initial-genome)))

(defn train [population-size tetrominoes])
