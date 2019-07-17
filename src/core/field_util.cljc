(ns core.field-util
  (:require [core.constants :refer [max-gravity-interval]]))

(defn get-current-level [{:keys [levels]}]
  (or (first levels) max-gravity-interval))
