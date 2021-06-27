(ns core.actions.gravity
  (:require [core.constants :as const]))

(defn create-pull-down-fn [change-listener]
  (fn [] (change-listener (first const/gravity-pull-down))))

