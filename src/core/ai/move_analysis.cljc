(ns core.ai.move-analysis
  (:require [clojure.set :as set]
            [net.cgrand.xforms :as x]))

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

(def reducer-count
  (completing
   (fn [number _]
     (inc number))))

(defn count-pixels [{:keys [field] :as state}]
  (transduce (comp (mapcat identity)
                   (remove nil?))
             reducer-count
             0
             field))

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
       (map first)))

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

(defn find-clearable-line-count-internal [free-pixel-positions remaining-lines clearable-line-count]
  (if (seq remaining-lines)
    (if (= 4 clearable-line-count)
      clearable-line-count
      (let [[line & remaining-lines] remaining-lines
            remaining-pixels (filter
                              (comp not line)
                              free-pixel-positions)
            remaining-pixel-count (count remaining-pixels)]
        (condp = remaining-pixel-count
          1 (recur remaining-pixels
                   remaining-lines
                   (if (= 1 (->> (filter nil? line)
                                 (take 2)
                                 count))
                     (inc clearable-line-count)
                     clearable-line-count))
          0 clearable-line-count
          (recur remaining-pixels
                 remaining-lines
                 clearable-line-count))))
    clearable-line-count))

(defn find-clearable-line-count [{:keys [field height width] :as state}
                                 max-piece-height
                                 min-piece-height]
  (find-clearable-line-count-internal
   (range width)
   (->> field
        (drop (- height max-piece-height))
        (take (- max-piece-height min-piece-height)))
   0))

;; sum of all empty cells underground
(defn count-holes [found-holes]
  (count found-holes))
#_(count-holes [1 2 3 4])

;; height of the highest column
(defn height [heights-from-bottom]
  (reduce max 0 heights-from-bottom))

;; height of the lowest column
(defn min-height [{:keys [height]} heights-from-bottom]
  (reduce min height heights-from-bottom))

;; sum of all block heights
(defn cumulative-height [heights-from-bottom]
(->> heights-from-bottom
     (reduce + 0)))

(defn abs [n] (max n (- n)))

(defn- field-flatness-imperative [roughness-counter flatness-counter heights-from-bottom]
  (loop [roughness-counter roughness-counter
         flatness-counter flatness-counter
         last-height (first heights-from-bottom)
         [current-height & remaining-heights] (rest heights-from-bottom)]
    (if-not current-height
      [roughness-counter flatness-counter]
      (recur (+ roughness-counter (abs (- last-height current-height)))
             ((if (= last-height current-height)
                inc
                identity)
              flatness-counter)
             current-height remaining-heights))))

;; Flatness:
;; sum of all flat neighbours
;; if the game field is empty this is the width of the map
;; except one outlier (for deepest well)
;;
;; Roughness:
;; sum of absolute differences between neighbours
;; if the game field is empty this is zero
;; except one outlier (for deepest well)
(defn field-roughness-flatness [heights-from-bottom]
  (field-flatness-imperative 0 0 heights-from-bottom)
  #_(transduce
   (comp
    (x/partition 2 1 (x/into []))
    (filter (fn [[a b]] (= a b))))
   reducer-count
   0
   heights-from-bottom
   #_(partition 2 1 heights-from-bottom))
  #_(->> heights-from-bottom
       (partition 2 1)
       (filter #(apply = %))
       count))

(defn calc-difference [[h1 h2]]
  (abs (- h1 h2)))

;; deepest side hole near side of the map
(defn well-depth-at-wall [heights-from-bottom]
  (max (calc-difference (take 2 heights-from-bottom))
       (calc-difference (take-last 2 heights-from-bottom))))

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
                    (when-let [step (get steps i)]
                      [k step]))
                  genome-keys))]
    (assoc
     dynamic
     more-key more-size)))

(defn find-hole-coords [{:keys [width height field]}]
  (for [x-index (range width)
        y-index (range 0 (dec height))
        :when (and (-> field
                       (nth y-index)
                       (nth x-index))
                   (not (-> field
                            (nth (inc y-index))
                            (nth x-index))))]
    [x-index (inc y-index)]))

(defn count-hole-setback [{:keys [height]} holes-coords]
  (transduce (map #(->> %
                        (second)
                        (- height)))
             +
             0
             holes-coords))
