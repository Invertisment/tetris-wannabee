(ns core.ui.time
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require #_[core.constants :refer [time-between-levels]]
            [core.field-util :as field-util]
            [cljs.core.async :refer [>!]]))

(def standby-timeout (atom nil))

(defn reset-timeout! [save-atom interval-time callback-fn]
  (js/clearTimeout @save-atom)
  (reset!
   save-atom
   (js/setTimeout callback-fn interval-time)))

(defn reset-timer! [on-tick-listener state]
  #_(println "reset timeout" (field-util/get-level-info state) (:game-state state))
  (when (= :started (:game-state state))
    (reset-timeout!
     standby-timeout
     (:timeout (field-util/get-level-info state))
     on-tick-listener)))
