(ns core.piece-validators)

(defn coord? [map-width map-height {:keys [coord]}]
  (let [[x y] coord]
    (and
     (< x map-width)
     (< y map-height)
     (<= 0 x)
     (<= 0 y))))

(defn overlay? [field shape]
  (some
   (fn [{:keys [coord] :as pixel-data}]
     (let [[x y] coord]
       (-> field
           (get y)
           (get x))))
   shape))

(defn possible-placement? [map-width map-height field shape]
  (let [valid? (partial coord? map-width map-height)]
    (and
     (not (overlay? field shape))
     (every? valid? shape))))

(defn cheaper-field-valid? [{:keys [width height piece field] :as state}]
  (possible-placement? width height field piece))

(defn field-valid? [{:keys [width height piece field] :as state}]
  (when (not-any? nil? [width height piece field])
    (possible-placement? width height field piece)))

(defn validate [valid? field]
  (when (valid? field)
    field))
