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
  (and
    (every? (partial coord? map-width map-height) shape-b)
    (every? (partial coord? map-width map-height) shape-a)
    (not (some shape-a shape-b))))
