(ns core.actions.piece-ops)

(defn min-max-range [key-name li]
  [key-name
   ((juxt
      (partial reduce min)
      (partial reduce max))
    li)])

(defn get-piece-bounds [piece]
  (into {}
         ((juxt (comp
                  (partial min-max-range :x-range)
                  first)
                (comp
                  (partial min-max-range :y-range)
                  (partial map inc)
                  second))
          (apply map vector piece))))

(defn coords-op [x-fn y-fn [x y]]
  [(x-fn x) (y-fn y)])

(defn coords-op-scalar-piece [x-fn y-fn piece]
  (set (map
         (partial coords-op x-fn y-fn)
         piece)))

(defn coords-op-scalar-piece-bounds [x-fn y-fn {:keys [x-range y-range] :as bounds}]
  (assoc bounds
         :x-range (vec (map x-fn x-range))
         :y-range (vec (map y-fn y-range))))

(defn coords-op-scalar [x-fn y-fn {:keys [piece piece-bounds] :as field}]
  (assoc field
           :piece (coords-op-scalar-piece x-fn y-fn piece)
           :piece-bounds (coords-op-scalar-piece-bounds x-fn y-fn piece-bounds)))

(defn validate [valid? field]
  (when
    (valid? field)
    field))

(defn piece-op-scalar-valid [valid? field x-fn y-fn]
  (validate valid? (coords-op-scalar x-fn y-fn field )))

