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

(defn right [piece]
  (coords-op-scalar piece inc identity))
(defn left [piece]
  (coords-op-scalar piece dec identity))
(defn bottom [piece]
  (coords-op-scalar piece identity inc))

(defn rotate [piece]
  (println "rotate")
  (coords-op-scalar piece identity dec))
(defn nop [& _])

(defn send-the-move [output-chan move]
  (when move
    (go (>! output-chan move))))

(defn change-listener [piece new-piece-chan block-valid? char-code]
  (let
    [moved-piece ((case char-code
                    "KeyA" left
                    "KeyD" right
                    "KeyW" rotate
                    "KeyS" bottom
                    nop) @piece)]
    (if
      (block-valid? (set moved-piece) #{})
      (send-the-move
        new-piece-chan
        moved-piece)
      (println "invalid"))))

(defn create-change-listener [piece-atom new-piece-chan block-valid?]
  (partial
    change-listener
    piece-atom
    new-piece-chan
    block-valid?))

