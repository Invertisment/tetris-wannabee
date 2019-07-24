(ns core.ai.genome
  (:require [core.ai.move-analysis :as move-analysis]))

(def mutation-rate 0.05)
;; 0.1 to both sides (+ or -)
(def mutation-step 0.2)

(defn new-initial-coefficient []
  (- (rand) 0.5))

(defn genome-name []
  (str "genome-" (rand)))

;; https://www.youtube.com/watch?v=xLHCMMGuN0Q
(defn new-initial-genome []
  {:id (genome-name)
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
   ;; deepest side hole near side of the map
   :well-depth-at-wall (new-initial-coefficient)
   ;; deepest side hole 1px from sides
   :well-depth-one-px-from-wall (new-initial-coefficient)
   ;; sum of hole depths subtracted from field height (consecutive too)
   :reverse-field-hole-depth-sum (new-initial-coefficient)
   ;; sum of hole depths for three first lines
   :hole-depth-of-first-three-lines (new-initial-coefficient)})

(defn create-initial-population [population-size]
  (repeatedly population-size new-initial-genome))

(defn calculate-score [genome {:keys [state] :as move}]
  (let [{:keys [score]} state
        grouped-coords (move-analysis/group-coords state)
        heights-from-bottom (move-analysis/find-heights-from-bottom state grouped-coords)
        hole-depths (move-analysis/count-field-hole-depths state grouped-coords)]
    (+
     (* (or (:rows-cleared genome) 0) (or (:lines-cleared score) 0))
     (* (or (:weighted-height genome) 0) (move-analysis/weighted-height heights-from-bottom))
     (* (or (:cumulative-height genome) 0) (move-analysis/cumulative-height heights-from-bottom))
     (* (or (:holes genome) 0) (move-analysis/count-holes state grouped-coords))
     (* (or (:roughness genome) 0) (move-analysis/field-roughness heights-from-bottom))
     (* (or (:flatness genome) 0) (move-analysis/field-flatness heights-from-bottom))
     (* (or (:well-depth-at-wall  genome) 0) (move-analysis/well-depth-at-wall heights-from-bottom))
     (* (or (:well-depth-one-px-from-wall genome) 0) (move-analysis/well-depth-one-px-from-wall heights-from-bottom))
     (* (or (:reverse-field-hole-depth-sum genome) 0) (move-analysis/count-reverse-field-hole-depth-sum state hole-depths))
     (* (or (:hole-depth-of-first-three-lines genome) 0) (move-analysis/count-hole-depth-of-first-three-lines state hole-depths)))))

(defn crossover [mum-genome dad-genome]
  (assoc
   (reduce
    (fn [child-genome k]
      (assoc child-genome
             k (rand-nth [(k mum-genome) (k dad-genome)])))
    {}
    (keys mum-genome))
   :id (genome-name)))

(defn mutate-param [param]
  (+ param (* (- (rand) 0.5) mutation-step)))

(defn mutate [genome]
  (reduce
   (fn [genome k]
     (if (and (> mutation-rate (rand)) (number? (k genome)))
       (update genome k mutate-param)
       genome))
   genome
   (remove #(= :id %)
           (keys genome))))

(defn make-child [elites]
  (mutate
   (crossover (rand-nth elites)
              (rand-nth elites))))
