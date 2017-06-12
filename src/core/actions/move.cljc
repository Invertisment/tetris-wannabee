(ns core.actions.move)

(defn coords-op-scalar [blocks x-fn y-fn]
  (set (map
         (fn [[x y]]
           [(x-fn x) (y-fn y)])
         blocks)))

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

(defn move-piece [piece char-code]
  ((case char-code
     "KeyA" left
     "KeyD" right
     "KeyW" rotate
     "KeyS" bottom
     nop) piece))

(defn next-field-state [state char-code]
  (let
    [at-state @state]
    (assoc
      at-state
      :piece
      (move-piece
        (:piece
          at-state)
        char-code))))

