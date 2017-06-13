(ns core.core
  #?(:cljs (:require-macros [cljs.core.async.macros :refer [go]]))
  (:require
    #?(:cljs [cljs.core.async :refer [>!]])
    #?(:clj [clojure.core.async :refer [go >!]])
    [core.actions.move :refer [next-field-state]]
    [core.actions.invalid-position :refer [recover-bad-placement]]))

(defn send-the-move! [output-chan move]
  (when move
    (go (>! output-chan move))))

(defn change-listener [transition-fn state-atom valid? recov-fn char-code]
  (let
    [state @state-atom
     new-state (transition-fn state char-code)]
    (if
      (valid? new-state)
      new-state
      (recov-fn char-code state))))

(defn create-change-listener
  [state-atom next-state-chan piece-valid?]
  (fn [char-code]
    (send-the-move!
      next-state-chan
      (change-listener
        next-field-state
        state-atom
        piece-valid?
        recover-bad-placement
        char-code))))

