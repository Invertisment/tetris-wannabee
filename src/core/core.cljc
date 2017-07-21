(ns core.core
  #?(:cljs (:require-macros [cljs.core.async.macros :refer [go]]))
  (:require
    #?(:cljs [cljs.core.async :refer [>!]])
    #?(:clj [clojure.core.async :refer [go >!]])
    [core.actions.move :refer [next-field-state]]
    [core.constants :as const]))

(defn send-the-move! [output-chan move]
  (when move
    (go (>! output-chan move))))

(defn change-listener [transition-fn state-atom valid? update-score-fn char-code]
  (transition-fn valid? update-score-fn @state-atom char-code))

(defn create-change-listener
  [state-atom next-state-chan valid? update-score-fn]
  (fn [char-code]
    (send-the-move!
      next-state-chan
      (change-listener
        next-field-state
        state-atom
        valid?
        update-score-fn
        char-code))))

(defn start-game [state-atom next-state-chan update-score-fn]
  (send-the-move!
    next-state-chan
    (change-listener
      next-field-state
      state-atom
      (constantly true)
      update-score-fn
      const/new-game)))

