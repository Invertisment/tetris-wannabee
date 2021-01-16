(ns core.actions.clear-lines
  (:require [core.actions.piece-ops :refer [coords-op-scalar-piece]]
            [core.constants :as const]))

(defn non-full-line? [line]
  (some #(= nil %) line))

(defn fill [height row-count field]
  (vec (concat (repeat (- height (count field)) const/empty-row)
               field)))

(defn remove-full-lines [{:keys [field height] :as state}]
  (let [clear-field (filter non-full-line? field)
        empty-row-count (- height (count clear-field))
        filled-field (fill height empty-row-count clear-field)]
    (assoc state
           :field filled-field
           :line-clear-data {:count empty-row-count})))
#_(time (remove-full-lines {:field [[:a] [:b nil]] :height 10}))
