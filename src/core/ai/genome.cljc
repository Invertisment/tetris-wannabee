(ns core.ai.genome
  (:require [core.ai.move-analysis :as move-analysis]
            [core.constants :as const]))

(def mutation-rate 0.2)
(def mutation-step 0.05)

(defn new-initial-coefficient []
  (- (rand) 0.5))

(defn gen-genome-name []
  (str "genome-" (rand)))

;; genome trainable keys
(def genome-keys
  [;; rows cleared per piece placement
   :rows-cleared
   ;; absolute height of the highest column to the power of 2
   :weighted-height
   ;; sum of all block heights
   :cumulative-height
   ;; sum of all empty cells underground
   :hole-count
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
   ;; how many lines can be cleared
   :clearable-line-count
   ])

(defn new-initial-genome-var-map []
  (->> genome-keys
       (map (juxt identity (fn [& _] (new-initial-coefficient))))
       (into {})))

;; https://www.youtube.com/watch?v=xLHCMMGuN0Q
(defn new-initial-genome []
  (merge
   {:id (gen-genome-name)}
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
    #_(when-not (genome-key genome-vars)
      (println "null" genome-key genome-vars))
    (* (genome-key genome-vars)
       value)))

(def max-clearable-lines 4)

;; cljs doesn't have +'
#?(:cljs (def +' +))

(defn is-many-pixels [state]
  (let [pixel-count (move-analysis/count-pixels state)]
    (> pixel-count 46)))

(defn pick-subgenome [state]
  (if (is-many-pixels state)
    :safe ;; typo
    :risky))

(defn calculate-score [genome {:keys [state] :as move}]
  (let [heights-from-bottom (move-analysis/find-heights-from-bottom state)
        relative-heights (move-analysis/find-relative-heights heights-from-bottom)
        max-piece-height (move-analysis/height relative-heights)
        min-piece-height (move-analysis/min-height state relative-heights)
        g (genome-fn-continuous (genome (pick-subgenome state)))
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
        hole-coords (move-analysis/find-hole-coords state)
        ;;well-depth-one-px-from-wall (move-analysis/well-depth-one-px-from-wall heights-from-bottom)
        ]
    (+'
     (g :rows-cleared (get score :lines-cleared 0))
     (g :weighted-height max-piece-height)
     (g :cumulative-height (move-analysis/cumulative-height heights-from-bottom))
     (g :hole-count (move-analysis/count-holes hole-coords))
     (g :roughness (move-analysis/field-roughness heights-from-bottom))
     (g :flatness (move-analysis/field-flatness heights-from-bottom))
     (g :well-depth-at-wall well-depth-at-wall)
     #_(g :well-depth-one-px-from-wall well-depth-one-px-from-wall)
     (g :well-depth-at-wall-minus-4 (max (- well-depth-at-wall max-clearable-lines) 0))
     #_(g :well-depth-one-px-from-wall-minus-4 (- well-depth-one-px-from-wall 4))
     #_(g :reverse-field-hole-depth-sum (move-analysis/count-reverse-field-hole-depth-sum state hole-depths))
     (g :horizontal-fullness (move-analysis/count-horizontal-space state))
     (g :hole-setback (move-analysis/count-hole-setback state hole-coords))
     (g :clearable-line-count (move-analysis/find-clearable-line-count state max-piece-height min-piece-height))
     (reduce + 0
             (map
              (fn [stepcount-key]
                (if-let [v (get grouped-stepcounts stepcount-key)]
                  (g stepcount-key v)
                  0))
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

(defn adjust-mutation-param [generation parameter]
  ;; uses hyperbola to adjust by generation:
  (/ (* 100 parameter) (+ 80 generation)))

(defn mutate-param [generation param]
  (+ param (* (- (rand) 0.5)
              (adjust-mutation-param generation mutation-step))))

(defn abs [a]
  (if (> a 0)
    a
    (- a)))
#_(abs -1)

(defn mutate [generation genome]
  #_(reduce
     (fn [genome k]
       (if (and (> mutation-rate (rand)) (number? (k genome)))
         (update genome k mutate-param)
         genome))
     genome
     (keys genome))
  (let [adjusted-mutation-rate (adjust-mutation-param generation mutation-rate)
        mutated-genome-kv-list (map
                                (fn [[k orig-v]]
                                  [k (if (> adjusted-mutation-rate (rand))
                                       (mutate-param generation orig-v)
                                       orig-v)])
                                genome)
        max-value (->> mutated-genome-kv-list
                       (map (comp abs second))
                       (reduce max 1))]
    (into
     {}
     (if (> max-value 1)
       (map
        (fn [[k orig-v]]
          [k (/ orig-v max-value)])
        mutated-genome-kv-list)
       mutated-genome-kv-list))))
#_(mutate 0 {:hi 50 :hi1 1})
#_(mutate 0 {:hi 0.50 :hi1 1.02})
#_(mutate 0 {:hi 0.50 :hi1 -1.02})

(defn make-child-nested [generation mom-genome dad-genome & subgenome-keys]
  (reduce (fn [out-genome k]
            (assoc out-genome
                   k (mutate generation (crossover (k mom-genome)
                                                    (k dad-genome)))))
          (assoc mom-genome
                 :id (gen-genome-name))
          subgenome-keys))
#_(let [a (new-initial-genome)
        b (new-initial-genome)]
    [a (make-child-nested a b :risky)])

(defn make-child [generation elites mom-genome]
  (make-child-nested generation mom-genome (rand-nth elites) :risky :safe))

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
   {:id (gen-genome-name)}
   (run-genome-val-change-nested
    ensure-weight-existence-single
    genome)))
#_(ensure-weight-existence {})

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
