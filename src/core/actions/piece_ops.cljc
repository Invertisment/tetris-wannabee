(ns core.actions.piece-ops)

(defn coords-op-scalar-piece [piece x-fn y-fn]
  (set (map
         (fn [[x y]]
           [(x-fn x) (y-fn y)])
         piece)))

(defn coords-op-scalar [{:keys [piece] :as field} x-fn y-fn]
  (assoc field
         :piece (coords-op-scalar-piece piece x-fn y-fn)))

(defn validate [valid? field]
  (when
    (valid? field)
    field))

(defn piece-op-scalar-valid [valid? & args]
  (validate valid? (apply coords-op-scalar args)))

