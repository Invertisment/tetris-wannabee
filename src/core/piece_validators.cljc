(ns core.piece-validators)

(defn coord? [map-width map-height [x y]]
  (and
    (< x map-width)
    (< y map-height)
    (<= 0 x)
    (<= 0 y)))

(defn overlay? [shape-a shape-b]
  (some shape-a shape-b))

(defn possible-placement? [map-width map-height shape-a shape-b]
  (let
    [valid? (partial coord? map-width map-height)]
    (and
      (every? valid? shape-b)
      (every? valid? shape-a)
      (not (some shape-a shape-b)))))

(defn field-valid? [{:keys [width height piece field]}]
  (possible-placement? width height piece field))

