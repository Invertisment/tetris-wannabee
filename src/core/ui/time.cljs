(ns core.ui.time
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [core.constants :refer [time-between-levels]]
            [core.field-util :as field-util]
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
              #_(println "difficulty increase" (first levels))
              (reset! field-atom
                      (assoc state
                             :levels
                             (rest levels)))
              (setup-interval!
               level-tick-interval
               (:timeout (field-util/get-current-level state))
               (fn []
                 (let [{:keys [game-state]} @field-atom]
                   #_(println "tick time" game-state)
                   (if (= game-state :ended)
                     (do
                       #_(println "game ended")
                       (js/clearInterval @fall-progression-interval)
                       (js/clearInterval @level-tick-interval))
                     (go (>! tick-ch "tick"))))))))]
    (setup-interval!
     fall-progression-interval
     time-between-levels
     difficulty-increase-fn)
    (difficulty-increase-fn)))

(defn setup-fall [field-atom tick-ch]
  ;; Stabilize speed after starting game from :ended to :started
  (add-watch
   field-atom
   :time-tick-restart
   (fn [key reference old-state new-state]
     (let [prev-game-state (:game-state old-state)
           curr-game-state (:game-state new-state)]
       (when (= curr-game-state :started)
         (remove-watch field-atom :time-tick-restart))
       (when (and (= prev-game-state :ended)
                  (= curr-game-state :started))
         (setup-fall-progression field-atom tick-ch)))))
  ;; Set up progression
  (setup-fall-progression field-atom tick-ch))
