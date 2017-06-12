(ns core.core
  #?(:cljs (:require-macros [cljs.core.async.macros :refer [go]]))
  (:require
    #?(:cljs [cljs.core.async :refer [>!]])
    #?(:clj [clojure.core.async :refer [go >!]])
    [core.actions.move :refer [move-piece]]))

(defn send-the-move! [output-chan move]
  (when move
    (go (>! output-chan move))))

(defn change-listener [state-atom piece-valid? char-code]
  (let
    [moved-piece (move-piece state-atom char-code)]
    (if
      (piece-valid? moved-piece #{})
      moved-piece
      (println "invalid"))))

(defn create-change-listener [state-atom next-state-chan piece-valid?]
  (fn [char-code]
    (send-the-move!
      next-state-chan
      (change-listener
        state-atom
        piece-valid?
        char-code))))

