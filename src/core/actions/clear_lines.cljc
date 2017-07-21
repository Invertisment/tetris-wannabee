(ns core.actions.clear-lines
  (:require [core.actions.piece-ops :refer [coords-op-scalar-piece]]))

(defn group-into-lines [{:keys [field]}]
  (group-by
    (comp second :coord)
    field))

(defn full-line? [width pixels]
  (= (count pixels) width))

(defn find-full-lines [{:keys [width]} grouped-lines]
  (reduce
    (fn [full-lines-res prefixed-line]
      (if
        (full-line? width (second prefixed-line))
        (assoc
          full-lines-res
          :full-line-ids
          (conj (:full-line-ids full-lines-res) (first prefixed-line)))
        (assoc
          full-lines-res
          :lines
          (merge (:lines full-lines-res) prefixed-line))))
    {:full-line-ids () :lines {}}
    grouped-lines))

(defn find-upper-line-ids [line-number]
  (range 0 line-number))

(defn group-upper-line-ids [line-numbers]
  (reduce
    (partial merge-with +)
    {}
    (map
      (comp frequencies find-upper-line-ids)
      line-numbers)))

(defn move-single-line [line move-fn]
  (coords-op-scalar-piece
    identity
    move-fn
    line))

(defn compute-line-shifts
  [{:keys [full-line-ids lines] :as data}]
  (merge
    data
    {:line-shifts (group-upper-line-ids full-line-ids)}))

(defn move-lines [{:keys [line-shifts lines] :as data}]
  (merge
    data
    {:lines
     (into #{} (mapcat
                 (fn [[line-id line]]
                   (move-single-line
                     line
                     (partial + (or (get line-shifts line-id) 0))))
                 lines))}))

(defn remove-full-lines [field]
  (let [{:keys [lines full-line-ids] :as moved}
        (->> field
             group-into-lines
             (find-full-lines field)
             compute-line-shifts
             move-lines)]
    (assoc
      field
      :field lines
      :line-clear-data {:full-line-ids full-line-ids})))

