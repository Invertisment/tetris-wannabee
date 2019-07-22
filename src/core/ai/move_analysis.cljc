(ns core.ai.move-analysis
  (:require [clojure.set :as set]))

(defn group-coords [state]
  (let [coords (->> (:field state)
                    (map :coord)
                    sort)]
    {:by-x (group-by first coords)
     ;;:by-y (group-by second coords)
     }
    ))

;; sum of all empty cells underground
(defn count-holes [{:keys [height] :as state} {:keys [by-x] :as grouped-coords}]
  (reduce
   (fn [sum coords]
     (or
      (when-let [first-coord (first coords)]
        (let [[_ from] first-coord]
          (+ (dec (- height
                     from
                     (count (rest coords))))
             sum)))
      sum))
   0
   (vals by-x)))

(defn find-heights-from-bottom [{:keys [height] :as state} {:keys [by-x] :as grouped-coords}]
  (->> (vals by-x)
       (sort-by first)
       (map (fn [coords]
              (let [tallest-coord (or (dec (second (first coords))) 0)
                    height-from-bottom (- height tallest-coord)]
                height-from-bottom)))))

;; absolute height of the highest column to the power of 2
(defn weighted-height [heights-from-bottom]
  (->> heights-from-bottom
       (map #(* % %))
       (reduce max 0))
  #_(->> (vals by-x)
         (map (fn [coords]
                (let [tallest-coord (or (dec (second (first coords))) 0)
                      height-from-bottom (- height tallest-coord)]
                  (* height-from-bottom height-from-bottom))))
         (reduce max)))

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
