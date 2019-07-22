(ns core.ai.moves
  (:require [core.actions.move :as move]
            [core.piece-validators :as v]))

(defn propagate-move [move-fn path-key move]
  (loop [{:keys [path state]} move
         all-iterations []]
    (let [moved (move-fn
                 v/field-valid?
                 identity
                 identity
                 state)]
      (if (or (= (:piece moved) (:piece state))
              (nil? moved))
        all-iterations
        (let [next {:path (conj path path-key)
                    :state moved}]
          (recur
           next
           (cons next all-iterations)))))))

(defn propagate-move-nonrepeatable [move-fn path-key {:keys [path state]}]
  [{:path (concat path [path-key])
    :state (move-fn
            v/field-valid?
            identity
            identity
            state)}])

(defn find-moves-left [move]
  (propagate-move move/left :left move))

(defn find-moves-right [move]
  (propagate-move move/right :right move))

(defn find-moves-bottom [move]
  (propagate-move-nonrepeatable move/bottom :bottom move))

(defn find-piece-placements [move]
  (mapcat
   (partial propagate-move move/bottom :bottom)
   (concat (find-moves-left move)
           [move]
           (reverse (find-moves-right move)))))
