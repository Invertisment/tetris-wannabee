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
(defn right [current-piece field-nodes piece-pipe]
  (println "right" piece-pipe (tamper-coords current-piece inc identity))
  (go (>!
        piece-pipe
        (tamper-coords current-piece inc identity))))
(defn left [current-piece field-nodes piece-pipe]
  (println "left")
  (map
    (fn [[x y]]
      [(dec x) y])
    current-piece))
(defn bottom [current-piece field-nodes piece-pipe]
  (println "bottom"))
(defn rotate [current-piece field-nodes piece-pipe]
  (println "rotate"))

(defn change-listener [current-piece field-nodes piece-pipe char-code]
  #_(println "key-press" current-piece field-nodes piece-pipe char-code)
  ((case char-code
     "KeyA" left
     "KeyD" right
     "KeyW" rotate
     "KeyS" bottom
     nop) current-piece field-nodes piece-pipe))

(defn create-change-listener [get-current-piece-fn get-field-nodes-fn current-piece-pipe]
  #_(println "create-change-listener")
  (partial
    change-listener
    (get-current-piece-fn)
    (get-field-nodes-fn)
    current-piece-pipe))

