(ns core.ui.time
  (:require [core.constants :refer [time-between-levels]]))

(def fall-progression-interval (atom nil))

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
    (send fall-progression-interval (fn [old-interval]
                                      (js/clearInterval old-interval)
                                      fall-progression-interval))
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

