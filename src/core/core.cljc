(ns core.core
  #?(:cljs (:require-macros [cljs.core.async.macros :refer [go]]))
  (:require
    #?(:cljs [cljs.core.async :refer [>!]])
    #?(:clj [clojure.core.async :refer [go >!]])
    [core.actions.move :refer [next-field-state]]))

(defn send-the-move! [output-chan move]
  (when move
    (go (>! output-chan move))))

(defn change-listener [transition-fn state-atom valid? char-code]
   (transition-fn valid? @state-atom char-code))

(defn create-change-listener
  [state-atom next-state-chan valid?]
  (fn [char-code]
    (send-the-move!
      next-state-chan
      (change-listener
        next-field-state
        state-atom
        valid?
        char-code))))

