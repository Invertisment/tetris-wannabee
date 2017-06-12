(ns core.actions.move
  (:require [core.constants :as const]))

(defn coords-op-scalar [blocks x-fn y-fn]
  (set (map
         (fn [[x y]]
           [(x-fn x) (y-fn y)])
         blocks)))

(defn right [piece]
  (coords-op-scalar piece inc identity))

(defn left [piece]
  (coords-op-scalar piece dec identity))

(defn down [piece]
  (coords-op-scalar piece identity inc))

(defn rotate [piece]
  (println "rotate")
  (coords-op-scalar piece identity dec))

(defn bottom [piece]
  (println "bottom")
  (coords-op-scalar piece identity inc))

(defn nop [& _])

(defn direction [const-value]
  (condp = const-value
    const/rotate #'rotate
    const/left #'left
    const/right #'right
    const/down #'down
    const/bottom #'bottom
    #'nop))

(defn move-piece [piece key-code]
  ((direction key-code) piece))

(defn next-field-state [state key-code]
  (let
    [at-state @state]
    (assoc
      at-state
      :piece
      (move-piece
        (:piece
          at-state)
        key-code))))

