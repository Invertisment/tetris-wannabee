(ns core.actions.piece-ops)

(defn coords-op [x-fn y-fn {:keys [coord] :as data}]
  (let
    [[x y] coord]
    (assoc data
           :coord [(x-fn x) (y-fn y)])))

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

(defn piece-op-scalar [x-fn y-fn field]
  (coords-op-scalar x-fn y-fn field))
