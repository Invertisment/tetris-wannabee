(ns core.actions.piece-ops
  (:require [clojure.set :as sets]))

(defn coords-op [x-fn y-fn {:keys [coord path] :as data}]
  (let [[x y] coord]
    (assoc data
           :coord [(x-fn x) (y-fn y)])))

(defn coords-op-scalar-piece [x-fn y-fn piece]
  (map
   (partial coords-op x-fn y-fn)
   piece))

(defn coords-op-scalar-piece-bounds [x-fn y-fn {:keys [x-range y-range] :as bounds}]
  (assoc bounds
         :x-range (map x-fn x-range)
         :y-range (map y-fn y-range)))

(defn coords-op-scalar [x-fn y-fn {:keys [piece piece-bounds piece-path] :as field}]
  (assoc field
         :piece (coords-op-scalar-piece x-fn y-fn piece)
         :piece-bounds (coords-op-scalar-piece-bounds x-fn y-fn piece-bounds)
         :piece-path (into piece-path piece)))

(defn piece-op-scalar [x-fn y-fn field]
  (coords-op-scalar x-fn y-fn field))

(defn get-piece-height [piece]
  (-> piece
      :piece-bounds
      :y-range
      first))

(defn set-piece-height [piece new-height]
  (let [current-h (get-piece-height piece)]
    (coords-op-scalar
     identity
     #(+ (- % current-h) new-height)
     piece)))
