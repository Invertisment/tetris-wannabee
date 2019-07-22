(ns core.ai.genome
  (:require [core.ai.move-analysis :as move-analysis]))

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

(defn calculate-score [genome {:keys [state] :as move}]
  (let [{:keys [score]} state
        grouped-coords (move-analysis/group-coords state)
        heights-from-bottom (move-analysis/find-heights-from-bottom state grouped-coords)]
    (+
     (* (or (:rows-cleared genome) 0) (or (:lines-cleared score) 0))
     (* (or (:weighted-height genome) 0) (move-analysis/weighted-height heights-from-bottom))
     (* (or (:roughness genome) 0) (move-analysis/field-roughness heights-from-bottom))
     (* (or (:holes genome) 0) (move-analysis/count-holes state grouped-coords)))))
