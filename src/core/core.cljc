(ns core.core
  #?(:cljs (:require-macros [cljs.core.async.macros :refer [go]]))
  (:require
   #?(:cljs [cljs.core.async :refer [>! put!] :as async])
   #?(:clj [clojure.core.async :refer [go >! put!] :as async])
   [core.actions.move :refer [next-field-state]]
   [core.constants :as const]))

(defn get-move [transition-fn state-atom update-score-fn char-code]
  (transition-fn update-score-fn @state-atom char-code))

(defn create-change-listener
  [state-atom next-state-chan update-score-fn]
  (fn [char-code]
    (go (when-let [move (get-move
                         next-field-state
                         state-atom
                         update-score-fn
                         char-code)]
          (>! next-state-chan move)))))

(defn start-game [state-atom next-state-chan update-score-fn]
  (->> (get-move
        next-field-state
        state-atom
        update-score-fn
        (first const/new-game))
       (put! next-state-chan)))
