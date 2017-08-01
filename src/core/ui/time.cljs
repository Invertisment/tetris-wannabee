(ns core.ui.time
  (:require [core.constants :refer [time-between-levels]]))

(defn get-time []
  (.getTime (js/Date.)))

(defn setup-fall-progression [field-atom]
  (js/setInterval
    #(let
       [{:keys [levels] :as state} @field-atom]
       (reset! field-atom
               (assoc state
                      :levels
                      (rest levels))))
    time-between-levels))

(defn setup-fall [field-atom change-listener]
  (let [level-progression-interval
        (setup-fall-progression field-atom)]
   (letfn
     [(recurring-function []
        (let
          [state @field-atom]
          (if (= :ended (:game-state state))
            (do
              (js/clearInterval level-progression-interval))
            (do
              (change-listener)
              (js/setTimeout
                recurring-function
                (-> state
                    :levels
                    first
                    :timeout))))))]
     (js/setTimeout
       recurring-function
       800))))

