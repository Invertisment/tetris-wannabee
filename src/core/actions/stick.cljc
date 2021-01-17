(ns core.actions.stick
  (:require [core.constants :as const]
            [clojure.set :refer [union]]))

(defn- put-piece [field piece]
  (persistent!
   (reduce
    (fn [field-2d {:keys [coord color]}]
      (let [[x y] coord]
        (assoc! field-2d y (assoc (get field-2d y) x color))))
    (transient field)
    piece)))

(defn stick-piece [{:keys [field piece piece-path] :as state}]
  (assoc
   (dissoc state :piece :piece-bounds :piece-path)
   :field
   (put-piece field piece)
   :prev-piece-path (into piece-path piece)))
