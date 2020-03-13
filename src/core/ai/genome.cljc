(ns core.ai.genome
  (:require [core.ai.move-analysis :as move-analysis]))

(def mutation-rate 0.5)
;; 0.1 to both sides (+ or -)
(def mutation-step 0.1)

(defn new-initial-coefficient []
  (- (rand) 0.5))

(defn genome-name []
  (str "genome-" (rand)))

;; genome trainable keys (without :id)
(def genome-keys
  [;; rows cleared per piece placement
   :rows-cleared
   ;; absolute height of the highest column to the power of 2
   :weighted-height
   ;; sum of all block heights
   :cumulative-height
   ;; sum of all empty cells underground
   :holes
   ;; sum of absolute differences between neighbours
   ;; if the game field is empty this is zero
   ;; except one outlier (for deepest well)
   :roughness
   ;; sum of all flat neighbours
   ;; if the game field is empty this is the width of the map
   ;; except one outlier (for deepest well)
   :flatness
   ;; deepest side hole near side of the map
   :well-depth-at-wall
   ;; deepest side hole 1px from sides
   :well-depth-one-px-from-wall
   ;; sum of hole depths subtracted from field height (consecutive too)
   :well-depth-at-wall-minus-4
   ;; deepest side hole 1px from sides
   :well-depth-one-px-from-wall-minus-4
   ;;sum of hole depths subtracted from field height (consecutive too)
   :reverse-field-hole-depth-sum
   ;;;; measure how full the lines are (^2 is needed to counteract placement anywhere)
   :horizontal-fullness])

;; https://www.youtube.com/watch?v=xLHCMMGuN0Q
(defn new-initial-genome []
  (merge
   {:id (genome-name)}
   (->> genome-keys
        (map (juxt identity (fn [& _] (new-initial-coefficient))))
        (into {}))))

;; What didn't work:
;; hole depth of first three lines: it tries to produce holes in the beginning of the game
;; horizontal fullness (sum of (line px count that are ^2)):
;;   positive value: It tries to produce holes to retain the score
;;   negative value: It tries to build up

(defn create-initial-population [population-size]
  (repeatedly population-size new-initial-genome))

(defn calculate-score [genome {:keys [state] :as move}]
  (let [{:keys [score]} state
        grouped-coords (move-analysis/group-coords state)
        heights-from-bottom (move-analysis/find-heights-from-bottom state grouped-coords)
        hole-depths (move-analysis/count-field-hole-depths state grouped-coords)
        found-holes (move-analysis/find-holes-x grouped-coords heights-from-bottom)]
    (+
     (* (or (:rows-cleared genome) 0) (or (:lines-cleared score) 0))
     (* (or (:weighted-height genome) 0) (move-analysis/weighted-height heights-from-bottom))
     (* (or (:cumulative-height genome) 0) (move-analysis/cumulative-height heights-from-bottom))
     (* (or (:holes genome) 0) (move-analysis/count-holes found-holes))
     (* (or (:roughness genome) 0) (move-analysis/field-roughness heights-from-bottom))
     (* (or (:flatness genome) 0) (move-analysis/field-flatness heights-from-bottom))
     (* (or (:well-depth-at-wall  genome) 0) (move-analysis/well-depth-at-wall heights-from-bottom))
     (* (or (:well-depth-one-px-from-wall genome) 0) (move-analysis/well-depth-one-px-from-wall heights-from-bottom))
     (* (or (:well-depth-at-wall-minus-4  genome) 0) (- (move-analysis/well-depth-at-wall heights-from-bottom) 4))
     (* (or (:well-depth-one-px-from-wall-minus-4 genome) 0) (- (move-analysis/well-depth-one-px-from-wall heights-from-bottom) 4))
     (* (or (:reverse-field-hole-depth-sum genome) 0) (move-analysis/count-reverse-field-hole-depth-sum state hole-depths))
     (* (or (:horizontal-fullness genome) 0) (move-analysis/count-horizontal-fullness grouped-coords)))))

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

;; make sure every weight key exists in genome
(defn ensure-weight-existence [genome]
  (merge {:id (genome-name)}
         (->> genome-keys
              (map (juxt identity (constantly 0)))
              (into {}))
         genome))
