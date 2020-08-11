(ns core.ai.genome
  (:require [core.ai.move-analysis :as move-analysis]))

(def mutation-rate 0.3)
;; 0.1 to both sides (+ or -)
(def mutation-step 0.5)

(defn new-initial-coefficient []
  (- (rand) 0.5))

(defn genome-name []
  (str "genome-" (rand)))

;; genome trainable keys
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
   ;;;; deepest side hole 1px from sides
   ;;:well-depth-one-px-from-wall
   ;; sum of hole depths subtracted from field height (consecutive too)
   :well-depth-at-wall-minus-4
   ;;;; deepest side hole 1px from sides
   ;;:well-depth-one-px-from-wall-minus-4
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

(defn new-initial-genome-var-map []
  (->> genome-keys
       (map (juxt identity (fn [& _] (new-initial-coefficient))))
       (into {})))

;; https://www.youtube.com/watch?v=xLHCMMGuN0Q
(defn new-initial-genome []
  (merge
   {:id (genome-name)}
   {:safe (new-initial-genome-var-map)
    :risky (new-initial-genome-var-map)}))
#_(new-initial-genome)

;; What didn't work:
;; hole depth of first three lines: it tries to produce holes in the beginning of the game
;; horizontal fullness (sum of (line px count that are ^2)):
;;   positive value: It tries to produce holes to retain the score
;;   negative value: It tries to build up

(defn create-initial-population [population-size]
  (repeatedly population-size new-initial-genome))

(defn genome-fn-continuous [genome-vars]
  (fn [genome-key value]
    (if value
      (* (or (genome-key genome-vars) 0)
         value)
      0)))

(defn calculate-score [genome {:keys [state] :as move}]
  (let [heights-from-bottom (move-analysis/find-heights-from-bottom state)
        relative-heights (move-analysis/find-relative-heights heights-from-bottom)
        pieces-height (move-analysis/weighted-height relative-heights)
        pixel-count (move-analysis/count-pixels state)
        g (genome-fn-continuous (genome (if (> pixel-count 81)
                                          :safe
                                          :risky)))
        {:keys [score]} state
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
        well-depth-at-wall (move-analysis/well-depth-at-wall heights-from-bottom)
        ;;well-depth-one-px-from-wall (move-analysis/well-depth-one-px-from-wall heights-from-bottom)
        ]
    (+
     (g :rows-cleared (* (:lines-cleared score) (:lines-cleared score)))
     (g :weighted-height pieces-height)
     (g :cumulative-height (move-analysis/cumulative-height heights-from-bottom))
     ;;(* (or (:holes genome) 0) (move-analysis/count-holes found-holes))
     (g :roughness (move-analysis/field-roughness heights-from-bottom))
     (g :flatness (move-analysis/field-flatness heights-from-bottom))
     (g :well-depth-at-wall well-depth-at-wall)
     #_(g :well-depth-one-px-from-wall well-depth-one-px-from-wall)
     (g :well-depth-at-wall-minus-4 (Math/max (- well-depth-at-wall 4) 0))
     #_(g :well-depth-one-px-from-wall-minus-4 (- well-depth-one-px-from-wall 4))
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

(defn crossover [mom-genome dad-genome]
  (reduce
   (fn [child-genome k]
     (assoc child-genome
            k (rand-nth [(k mom-genome) (k dad-genome)])))
   {}
   (keys mom-genome)))

(defn mutate-param [param]
  (+ param (* (- (rand) 0.5) mutation-step)))

(defn mutate [genome]
  (reduce
   (fn [genome k]
     (if (and (> mutation-rate (rand)) (number? (k genome)))
       (update genome k mutate-param)
       genome))
   genome
   (keys genome)))

(defn make-child-nested [mom-genome dad-genome]
  (assoc mom-genome
         :risky (mutate (crossover (:risky mom-genome)
                                   (:risky dad-genome)))
         :safe (mutate (crossover (:safe mom-genome)
                                  (:safe dad-genome)))))

(defn make-child [elites]
  (make-child-nested (rand-nth elites)
                     (rand-nth elites)))

(defn run-genome-val-change-nested [f {:keys [risky safe] :as genome}]
  (assoc genome
         :risky (f risky)
         :safe (f safe)))

;; make sure every weight key exists in genome
(defn ensure-weight-existence-single [genome-var-map]
  (merge (->> genome-keys
              (map (juxt identity (constantly 0)))
              (into {}))
         genome-var-map))

;; make sure every weight key exists in genome
(defn ensure-weight-existence [genome]
  (merge
   genome
   {:id (genome-name)}
   (run-genome-val-change-nested
    ensure-weight-existence-single
    genome)))
#_(ensure-weight-existence {})

(defn abs [a]
  (if (> a 0)
    a
    (- a)))
#_(abs -1)

(defn genome-vals-similarity [genome-a-vals genome-b-vals]
  (->> (keys genome-a-vals)
       (map (fn [k] (abs (- (genome-a-vals k 0)
                            (genome-b-vals k 0)))))
       (reduce +)))

(defn similar? [genome-a threshold genome-b]
  (> threshold
     (+ (genome-vals-similarity (:safe genome-a) (:safe genome-b))
        (genome-vals-similarity (:risky genome-a) (:risky genome-b)))))
#_(similar? {:safe {:a 123 :b 1}} 1 {:safe {:a 124}})
#_(similar? {:risky {:a 123 :b 1}} 1 {:risky {:a 124}})
#_(similar? {:safe {:a 124}} 1 {:safe {:a 123 :b 1}})
#_(similar? {:safe {:a 123 :b 1}} 2 {:safe {:a 124}})

(defn filter-distinct-by-threshold [threshold best-sorted-genomes]
  (->> best-sorted-genomes
       (reduce
        (fn [out genome]
          (if (some
               (partial similar? genome threshold)
               out)
            out
            (cons genome out)))
        [])
       reverse))
#_(filter-distinct-by-threshold 1 [{:a 123 :b 1} {:a 124}])
#_(filter-distinct-by-threshold 1.001 [{:a 123 :b 1} {:a 124}])
#_(filter-distinct-by-threshold 0.5 [{:a 123 :b 1} {:a 124}])

(defn filter-distinct [best-sorted-genomes]
  (println "filter-distinct 1")
  (let [filtered (filter-distinct-by-threshold (/ mutation-step 10) best-sorted-genomes)]
    (println "filter-distinct 2")
    (println "Removed" (- (count best-sorted-genomes) (count filtered)) "of similar genomes.")
    filtered))
