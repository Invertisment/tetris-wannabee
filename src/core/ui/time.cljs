(ns core.ui.time
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [core.constants :refer [time-between-levels]]
            [cljs.core.async :refer [>!]]))

(def fall-progression-interval (atom nil))
(def level-tick-interval (atom nil))

(defn setup-interval! [save-atom interval-time callback-fn]
  (js/clearInterval @save-atom)
  (reset!
   save-atom
   (js/setInterval callback-fn interval-time)))

(defn setup-fall-progression [field-atom tick-ch]
  (letfn [(difficulty-increase-fn []
            (let
                [{:keys [levels] :as state} @field-atom]
              (println "difficulty increase" (first levels))
              (reset! field-atom
                      (assoc state
                             :levels
                             (rest levels)))
              (setup-interval!
               level-tick-interval
               (:timeout (first levels))
               (fn []
                 (let [{:keys [game-state]} @field-atom]
                   (println "tick time" game-state)
                   (if (= game-state :ended)
                     (do
                       (println "game ended")
                       (js/clearInterval @fall-progression-interval)
                       (js/clearInterval @level-tick-interval))
                     (go (>! tick-ch "tick"))))))))]
    (setup-interval!
     fall-progression-interval
     time-between-levels
     difficulty-increase-fn)
    (difficulty-increase-fn)))

(defn setup-fall [field-atom tick-ch]
  (setup-fall-progression field-atom tick-ch))
