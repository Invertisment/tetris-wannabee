(ns core.core
  #?(:cljs (:require-macros [cljs.core.async.macros :refer [go]]))
  (:require
    #?(:cljs [cljs.core.async :refer [>!]])
    #?(:clj [clojure.core.async :refer [go >!]])
    [core.actions.move :refer [move-piece]]))

(defn send-the-move! [output-chan move]
  (when move
    (go (>! output-chan move))))

(defn change-listener [piece new-piece-chan piece-valid? char-code]
  (let
    [moved-piece (move-piece piece char-code)]
    (if
      (piece-valid? (set moved-piece) #{})
      (send-the-move!
        new-piece-chan
        moved-piece)
      (println "invalid"))))

(defn create-change-listener [piece-atom new-piece-chan piece-valid?]
  (partial
    change-listener
    piece-atom
    new-piece-chan
    piece-valid?))

