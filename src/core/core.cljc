(ns core.core
  #?(:cljs (:require-macros [cljs.core.async.macros :refer [go]]))
  #?(:cljs (:require [cljs.core.async :refer [>!]]))
  #?(:clj (:require [clojure.core.async :refer [go >!]]))
)

(defn tamper-coords [blocks x-fn y-fn]
  (map
    (fn [[x y]]
      [(x-fn x) (y-fn y)])
    blocks))

(defn nop [_ _ _])
(defn right [current-piece piece-pipe]
  (tamper-coords current-piece inc identity))
(defn left [current-piece piece-pipe]
  (tamper-coords current-piece dec identity))
(defn bottom [current-piece piece-pipe]
  (tamper-coords current-piece identity inc))
(defn rotate [current-piece piece-pipe]
  (println "rotate")
  (tamper-coords current-piece identity dec))

(defn send-the-move [output-chan data]
  (when
    data
    (go (>! output-chan data))))

(defn change-listener [current-piece piece-pipe char-code]
  #_(println "key-press" current-piece piece-pipe char-code)
  (send-the-move
    piece-pipe
    ((case char-code
      "KeyA" left
      "KeyD" right
      "KeyW" rotate
      "KeyS" bottom
      nop) @current-piece piece-pipe)))

(defn create-change-listener [get-current-piece-atom current-piece-pipe]
  #_(println "create-change-listener" get-current-piece-atom)
  (partial
    change-listener
    get-current-piece-atom
    current-piece-pipe))

