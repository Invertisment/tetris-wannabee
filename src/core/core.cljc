(ns core.core
  #?(:cljs (:require-macros [cljs.core.async.macros :refer [go]]))
  (:require
    #?(:cljs [cljs.core.async :refer [>!]])
    #?(:clj [clojure.core.async :refer [go >!]])
    [core.actions.move :refer [next-field-state]]))

(defn send-the-move! [output-chan move]
  (when move
    (go (>! output-chan move))))

(defn change-listener [state-atom state-valid? char-code]
  (let
    [new-state (next-field-state state-atom char-code)]
    (if
      (state-valid? new-state)
      new-state
      (println "invalid"))))

(defn create-change-listener [state-atom next-state-chan piece-valid?]
  (fn [char-code]
    (send-the-move!
      next-state-chan
      (change-listener
        state-atom
        piece-valid?
        char-code))))

