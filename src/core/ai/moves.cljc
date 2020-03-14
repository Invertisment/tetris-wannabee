(ns core.ai.moves
  (:require [core.actions.move :as move]
            [core.piece-validators :as v]
            [core.constants :as constants]))

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
        (let [next {:path (concat path [path-key])
                    :state moved}]
          (recur
           next
           (cons next all-iterations)))))))

(defn make-single-move [move-fn path-key {:keys [path state]}]
  {:path (concat path [path-key])
   :state (move-fn
           v/field-valid?
           identity
           identity
           state)})

(defn propagate-move-nonrepeatable [move-fn path-key move]
  (make-single-move move-fn path-key move))

(defn valid-move? [{:keys [state] :as move}]
  (v/field-valid? state))

(defn propagate-move-iterate [move-fn path-key move iterations]
  (filter
   valid-move?
   (loop [i iterations
          all-iterations [move]
          current-move move]
     (if (<= i 0)
       all-iterations
       (let [new-move (make-single-move move-fn path-key current-move)]
         (if (= :ended (:game-state (:state new-move)))
           (do
             (println "(= :ended (:game-state (:state new-move)))")
             all-iterations)
           (recur
            (dec i)
            (conj
             all-iterations
             new-move)
            new-move)))))))

(defn find-moves-left [move]
  (propagate-move move/left :left move))

(defn find-moves-right [move]
  (propagate-move move/right :right move))

(defn find-move-bottom [move]
  (propagate-move-nonrepeatable move/bottom :bottom move))

(defn find-move-down [move]
  (propagate-move-nonrepeatable move/down :bottom move))

(defn find-moves-bottom [move]
  [(find-move-bottom move)])

(defn find-moves-rotate [move]
  (propagate-move-iterate move/rotate :rotate move 3))

(defn find-piece-placements [move]
  #_(println "find-piece-placements count" (count (:next-pieces (:state move))))
  (let [rotated-moves (find-moves-rotate move)]
    (mapcat
     find-moves-bottom
     (concat (mapcat find-moves-left rotated-moves)
             rotated-moves
             (reverse (mapcat find-moves-right (reverse rotated-moves)))))))
