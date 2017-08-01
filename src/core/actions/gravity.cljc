(ns core.actions.gravity
  (:require [core.constants :as const]))

(defn create-pull-down-fn [change-listener]
  (fn [] (change-listener const/gravity-pull-down)))

