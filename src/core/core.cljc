(ns core.core
  #?(:cljs (:require-macros [cljs.core.async.macros :refer [go]]))
  #?(:cljs (:require [cljs.core.async :refer [>!]]))
  #?(:clj (:require [clojure.core.async :refer [go >!]])))

(defn coords-op-scalar [blocks x-fn y-fn]
  #_(println "get rekt")
  (map
    (fn [[x y]]
      [(x-fn x) (y-fn y)])
    blocks))

(defn nop [_ _ _])
(defn right [piece]
  (coords-op-scalar piece inc identity))
(defn left [piece]
  (coords-op-scalar piece dec identity))
(defn bottom [piece]
  (coords-op-scalar piece identity inc))
(defn rotate [piece]
  (println "rotate")
  (coords-op-scalar piece identity dec))

(defn send-the-move [output-chan move]
  (when
    move
    (go (>! output-chan move))))

(defn change-listener [piece new-piece-chan char-code]
  #_(println "key-press" piece new-piece-chan char-code)
  (send-the-move
    new-piece-chan
    ((case char-code
      "KeyA" left
      "KeyD" right
      "KeyW" rotate
      "KeyS" bottom
      nop) @piece)))

(defn create-change-listener [piece-atom new-piece-chan]
  #_(println "create-change-listener" piece-atom)
  (partial
    change-listener
    piece-atom
    new-piece-chan))

