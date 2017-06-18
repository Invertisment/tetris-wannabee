(ns core.piece-validators)

(defn coord? [map-width map-height {:keys [coord]}]
  (let
    [[x y] coord]
    (and
      coord
      (< x map-width)
      (< y map-height)
      (<= 0 x)
      (<= 0 y))))

(defn overlay? [shape-a shape-b]
  (some
    (set (map :coord shape-a))
    (map :coord shape-b)))

(defn possible-placement? [map-width map-height shape-a shape-b]
  (let
    [valid? (partial coord? map-width map-height)]
    (and
      (every? valid? shape-b)
      (every? valid? shape-a)
      (not (overlay? shape-a shape-b)))))

(defn field-valid? [{:keys [width height piece field] :as state}]
  (when
    (not-any? nil? (vals state))
    (possible-placement? width height piece field)))

(defn validate [valid? field]
  (when
    (valid? field)
    field))
