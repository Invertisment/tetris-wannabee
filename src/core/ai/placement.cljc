(ns core.ai.placement
  (:require [core.ai.moves :as moves]
            [core.piece-validators :as v]
            [core.ai.genome :as genome]))

(defn to-move [state]
  {:path []
   :state state})

(defn calculate-score-for-single-piece-placement [genome piece-placement]
  [(genome/calculate-score genome piece-placement) piece-placement])

(defn calculate-scores [genome piece-placements]
  (map
   (partial calculate-score-for-single-piece-placement genome)
   piece-placements))

(defn find-ranked-piece-placements [genome {:keys [width] :as state}]
  (->> (to-move state)
       (moves/find-piece-placements)
       (calculate-scores genome)))

(defn pick-better-state [[score-a move-a :as a] [score-b move-b :as b]]
  (if (< score-a score-b)
    b
    a))

(defn pick-best-state [ranked-piece-placements]
  (second (reduce
           pick-better-state
           ranked-piece-placements)))

(defn pick-best-piece-placement [genome {:keys [width] :as state}]
  (->> (find-ranked-piece-placements genome state)
       pick-best-state))

(defn- place-next-piece [is-game-ended-fn genome {:keys [state] :as placement}]
  (if (is-game-ended-fn (:state placement))
    placement
    (let [next-placement (pick-best-piece-placement genome state)]
      (assoc placement
             :state (:state next-placement)))))

(defn pick-best-2deep-piece-placement [is-game-ended-fn genome {:keys [width] :as state}]
  (->> (to-move state)
       (moves/find-piece-placements)
       (map (fn [piece-placement]
              (->> piece-placement
                   (place-next-piece is-game-ended-fn genome)
                   (calculate-score-for-single-piece-placement genome))))
       pick-best-state))

(defn place-best-piece [genome state]
  (:state (pick-best-piece-placement genome state)))

(defn place-best-look2-piece [is-game-ended-fn genome state]
  (:state (pick-best-2deep-piece-placement is-game-ended-fn genome state)))

(defn apply-pieces-while [is-game-ended-fn place-best-piece-fn genome state]
  (loop [state state]
    (if (is-game-ended-fn state)
      state
      (recur (place-best-piece-fn genome state)))))
