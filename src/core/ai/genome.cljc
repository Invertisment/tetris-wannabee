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
   ;;;; sum of all empty cells underground
   ;;:holes
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
   ;;;;sum of hole depths subtracted from field height (consecutive too)
   ;;:reverse-field-hole-depth-sum
   ;;;; measure how full the lines are (^2 is needed to counteract placement anywhere)
   :horizontal-fullness
   ;; Relative steps between two adjacent pixels
   :step-0
   :step-1
   :step-2
   :step-3
   :step-4
   :step-5
   :step-more
   ;; fancy hole stuff
   :hole-setback
   ])

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

(defn genome-fn-continuous [genome]
  (fn [genome-key value]
    (if value
      (* (or (genome-key genome) 0)
         value)
      0)))

(defn calculate-score [genome {:keys [state] :as move}]
  (let [g (genome-fn-continuous genome)
        {:keys [score]} state
        heights-from-bottom (move-analysis/find-heights-from-bottom state)
        relative-heights (move-analysis/find-relative-heights (move-analysis/find-heights-from-bottom state))
        grouped-stepcounts (move-analysis/count-grouped-step-counts (move-analysis/count-steps heights-from-bottom)
                                                                    :step-more
                                                                    :step-0
                                                                    :step-1
                                                                    :step-2
                                                                    :step-3
                                                                    :step-4
                                                                    :step-5)
        ;;hole-depths (move-analysis/count-field-hole-depths state)
        ;;found-holes (move-analysis/find-holes-x state heights-from-bottom)
        ]
    (+
     (g :rows-cleared (* (:lines-cleared score) (:lines-cleared score)))
     (g :weighted-height (move-analysis/weighted-height relative-heights))
     (g :cumulative-height (move-analysis/cumulative-height heights-from-bottom))
     ;;(* (or (:holes genome) 0) (move-analysis/count-holes found-holes))
     (g :roughness (move-analysis/field-roughness heights-from-bottom))
     (g :flatness (move-analysis/field-flatness heights-from-bottom))
     (g :well-depth-at-wall (move-analysis/well-depth-at-wall heights-from-bottom))
     (g :well-depth-one-px-from-wall (move-analysis/well-depth-one-px-from-wall heights-from-bottom))
     (g :well-depth-at-wall-minus-4 (- (move-analysis/well-depth-at-wall heights-from-bottom) 4))
     (g :well-depth-one-px-from-wall-minus-4 (- (move-analysis/well-depth-one-px-from-wall heights-from-bottom) 4))
     #_(g :reverse-field-hole-depth-sum (move-analysis/count-reverse-field-hole-depth-sum state hole-depths))
     (g :horizontal-fullness (move-analysis/count-horizontal-space state))
     (g :hole-setback (move-analysis/count-hole-setback state (move-analysis/find-hole-coords state)))
     (reduce + 0
             (map
              (fn [stepcount-key]
                (g stepcount-key (stepcount-key grouped-stepcounts)))
              (keys grouped-stepcounts))))))

#_(let [g (genome-fn-continuous {:genome-key 1})]
    (g :genome-key -5))

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
