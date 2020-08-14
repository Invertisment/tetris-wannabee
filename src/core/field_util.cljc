(ns core.field-util
  (:require [core.constants :as const]))

(defn get-lines-cleared [state]
  (or (->> state :score :lines-cleared) 0))

(defn get-level-info [state]
  (->> state
       get-lines-cleared
       (const/get-current-level 0)))
