(ns core.piece-validators)

(defn coord? [map-width map-height {:keys [coord]}]
  (let [[x y] coord]
    (and
     coord
     (< x map-width)
     (< y map-height)
     (<= 0 x)
     (<= 0 y))))

(defn overlay? [field shape]
  (some
   (fn [coord]
     (get-in field (reverse coord)))
   (map :coord shape)))

(defn possible-placement? [map-width map-height field shape]
  (let [valid? (partial coord? map-width map-height)]
    (and
     (every? valid? shape)
     (not (overlay? field shape)))))

(defn field-valid? [{:keys [width height piece field] :as state}]
  (when (not-any? nil? [width height piece field])
    (possible-placement? width height field piece)))

(defn validate [valid? field]
  (when (valid? field)
    field))
