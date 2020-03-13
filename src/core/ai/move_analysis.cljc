(ns core.ai.move-analysis
  (:require [clojure.set :as set]))

(defn group-coords [{:keys [width] :as state}]
  (when (nil? width)
    (println "group-coords" (keys state)
             (:field state)
             (:piece state)))
  (let [coords (->> (:field state)
                    (map :coord)
                    sort)]
    {:by-x (reduce
            (fn [group id]
              (assoc group id (group id)))
            (group-by first coords)
            (range 0 width))
     :by-y (group-by second coords)}))

(defn find-heights-from-bottom [{:keys [height] :as state} {:keys [by-x] :as grouped-coords}]
  (->> by-x
       (sort-by first)
       (map (fn [[i line]]
              (let [tallest-coord (reduce min (cons height (map second line)))
                    height-from-bottom (- height tallest-coord)]
                height-from-bottom)))))

(defn find-holes-x [{:keys [by-x] :as grouped-coords} heights-from-bottom]
  (->> heights-from-bottom
       (map-indexed (fn [i height]
                      (- height (count (by-x i)))))))

(defn remove-lower-holes [line-height x-id-height-tuples]
  (->> x-id-height-tuples
       (filter (fn [[i height]]
                 (< line-height height)
                 #_(>= height (heights-from-bottom i))))
       (map first))
  )

(defn find-holes-y [{:keys [width height] :as state} {:keys [by-y] :as grouped-coords} heights-from-bottom]
  (let [width-indexes (into #{} (range width))]
    (->> by-y
         (sort-by first)
         (map (fn [[i line]]
                [i
                 (dec (- height i))
                 heights-from-bottom
                 (let [holes-with-false-positives (remove (into #{} (map first line)) width-indexes)]
                   holes-with-false-positives
                   #_(map
                      (fn [x-index]
                        (remove-lower-holes (dec (- height i)) (nth heights-from-bottom x-index)))
                      holes-with-false-positives))])))))

;; sum of all empty cells underground
(defn count-holes [found-holes]
  (reduce + found-holes))

;; absolute height of the highest column to the power of 2
(defn weighted-height [heights-from-bottom]
(->> heights-from-bottom
     #_(map #(* % %))
     (reduce max 0)))

;; sum of all block heights
(defn cumulative-height [heights-from-bottom]
(->> heights-from-bottom
     (reduce + 0)))

(defn abs [n] (max n (- n)))

;; sum of absolute differences between neighbours
;; if the game field is empty this is zero
;; except one outlier (for deepest well)
(defn field-roughness [heights-from-bottom]
  #_(let #_[min-height (reduce min heights-from-bottom)]
         (->> heights-from-bottom
              #_(remove #(= min-height %))
              (partition 2 1)
              (map (fn [[a b]] (abs (- a b))))
              (reduce +)))
  (->> heights-from-bottom
       (partition 2 1)
       (map (fn [[a b]] (abs (- a b))))
       (reduce +)))

;; sum of all flat neighbours
;; if the game field is empty this is the width of the map
;; except one outlier (for deepest well)
(defn field-flatness [heights-from-bottom]
  (->> heights-from-bottom
       (partition 2 1)
       (filter #(apply = %))
       count))

(defn calc-difference [h1 h2]
  (abs (- h1 h2)))

;; deepest side hole near side of the map
(defn well-depth-at-wall [heights-from-bottom]
  (max (apply calc-difference (take 2 heights-from-bottom))
       (apply calc-difference (reverse (take-last 2 heights-from-bottom)))))

#_(well-depth-at-wall [1 5 6 7 8 9])

;; deepest side hole 1px from sides
(defn well-depth-one-px-from-wall [heights-from-bottom]
  (well-depth-at-wall (-> heights-from-bottom
                          butlast
                          rest)))

#_(well-depth-one-px-from-wall [1 2 6 7 8 9])

(defn count-hole-depths [{:keys [height] :as state} block-x-indexes]
  (let [block-x-set (set block-x-indexes)]
    (when-not (empty? block-x-set)
      (->> (map
            vector
            (range (first block-x-indexes) height)
            (range))
           (remove (fn [[x _]] (block-x-set x)))))))

(defn count-field-hole-depths [{:keys [height] :as state} {:keys [by-x] :as grouped-coords}]
  (->> (vals by-x)
       (map #(map second %))
       (mapcat (partial count-hole-depths state))))

(defn count-reverse-field-hole-depth-sum [{:keys [height] :as state} hole-depths]
  (->> hole-depths
       (map (fn [[index depth]] (* (- height index) depth)))
       (reduce +)))

;; measure how full the lines are (^2 is needed to counteract placement anywhere)
(defn count-horizontal-fullness [{:keys [by-y] :as grouped-coords}]
  (->> by-y
       (map (comp count second))
       (reduce +)))

;; count lines needed to clear to reach the holes
(defn count-hole-toxicity [heights-from-bottom {:keys [by-x by-y] :as grouped-coords}]
  )
