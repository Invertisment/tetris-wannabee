(ns core.ai.move-analysis
  (:require [clojure.set :as set]))

(defn find-heights-from-bottom [{:keys [width height field] :as state}]
  (->> (first field)
       (map (constantly (range height)))
       (map-indexed
        (fn [width-index height-range]
          (or (some
               (fn [height-index]
                 (when (nth (nth field height-index) width-index)
                   height-index))
               height-range)
              height)))
       (map #(- height %))))

(defn find-relative-heights [heights-from-bottom]
  (->> heights-from-bottom
       ((fn [li]
          (let [m (reduce min li)]
            (map #(- % m) li))))))

(defn find-holes-x [{:keys [by-x]} heights-from-bottom]
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

#_(defn count-field-hole-depths [{:keys [height] :as state} {:keys [by-x] :as grouped-coords}]
  (->> (vals by-x)
       (map #(map second %))
       (mapcat (partial count-hole-depths state))))

#_(defn count-reverse-field-hole-depth-sum [{:keys [height] :as state} hole-depths]
  (->> hole-depths
       (map (fn [[index depth]] (* (- height index) depth)))
       (reduce +)))

;; measure how full the lines are (^2 is needed to counteract placement anywhere)
(defn count-horizontal-space [{:keys [width field]}]
  (let [lines (->> field
                   (map (partial remove nil?))
                   (remove empty?))
        squares-used (reduce + (map count lines))]
    (if (= squares-used 0)
      0
      (/ squares-used
         (* (count lines) width))))
  #_(->> by-y
       (map (comp count second))
       (reduce +)))

;; count lines needed to clear to reach the holes
(defn count-hole-toxicity [heights-from-bottom {:keys [by-x by-y] :as grouped-coords}]
  )

(defn abs [n]
  (if (< 0 n)
    n
    (- n)))
#_(abs -1)

;; count steps for all possible three-block windows
(defn count-steps [any-relative-heights]
  (->> any-relative-heights
       (partition 2 1)
       (map (comp abs (partial apply -)))
       (frequencies)))

;; count steps for all possible three-block windows
(defn count-grouped-step-counts [steps more-key & genome-keys]
  #_(map steps (filter #(>= % (count genome-keys)) (keys steps)))
  (let [more-size (reduce + (map steps (filter #(>= % (count genome-keys)) (keys steps))))
        dynamic (into
                 {}
                 (map-indexed
                  (fn [i k]
                    [k (steps i)])
                  genome-keys))
        ]
    (assoc
     dynamic
     more-key more-size)))

(defn find-hole-coords [{:keys [width height field]}]
  (->> (for [x-index (range width)
             y-index (range 0 (dec height))
             :let [y-inc (inc y-index)]
             :when (and (-> field
                            (nth y-index)
                            (nth x-index))
                        (not (-> field
                                 (nth y-inc)
                                 (nth x-index))))]
         [x-index y-inc])))

(defn count-hole-setback [{:keys [height]} holes-coords]
  (->> holes-coords
       (map #(->> %
                  (second)
                  ((partial - height))))
       (reduce + 0)))
