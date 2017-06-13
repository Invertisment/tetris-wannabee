(ns core.actions.stick
  (:require [core.constants :as const]
            [clojure.set :refer [union]]))

(defn stick-piece [new-piece-fn state]
  (assoc state
         :field (union
                  (:field state)
                  (:piece state))
         :piece (new-piece-fn)))


