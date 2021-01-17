(ns core.ai.placement
  (:require [core.ai.moves :as moves]
            [core.piece-validators :as v]
            [core.ai.genome :as genome]
            [core.actions.new-piece :as new-piece]))

(defn to-move [state]
  {:path []
   :state state})

(defn calculate-score-for-single-piece-placement [genome piece-placement]
  [(genome/calculate-score genome piece-placement) piece-placement])

(defn calculate-scores [genome piece-placements]
  (map
   (partial calculate-score-for-single-piece-placement genome)
   piece-placements))

(defn find-ranked-piece-placements [genome placement]
  (->> placement
       (moves/find-piece-placements)
       (calculate-scores genome)))

(defn pick-better-state [[score-a move-a :as a] [score-b move-b :as b]]
  (if (< score-a score-b)
    b
    a))

(defn pick-best-state [ranked-piece-placements]
  (second (reduce
           pick-better-state
           (first ranked-piece-placements)
           (rest ranked-piece-placements))))

(defn pick-best-1deep-piece-placement [genome placement]
  (->> placement
       (find-ranked-piece-placements genome)
       pick-best-state))

(defn- place-next-piece [is-game-ended-fn genome {:keys [state] :as placement}]
  (if (is-game-ended-fn (:state placement))
    placement
    (let [next-placement (pick-best-1deep-piece-placement genome placement)]
      (assoc placement
             :state (:state next-placement)))))

;; Computes well but tries too many pieces (N^2) and isn't suitable for front-end (500ms in Java)
(defn pick-best-2deep-piece-placement [is-game-ended-fn genome {:keys [width] :as state}]
  (->> (to-move state)
       (moves/find-piece-placements)
       (map (fn [piece-placement]
              (->> piece-placement
                   (place-next-piece is-game-ended-fn genome)
                   (calculate-score-for-single-piece-placement genome))))
       pick-best-state))

(defn swap-next-piece [is-game-ended-fn {:keys [next-pieces] :as state}]
  (let [[next-piece] next-pieces
        piece-keys (keys next-piece)
        current-piece (select-keys state piece-keys)]
    (assoc (new-piece/new-piece v/field-valid? state)
           :next-pieces (cons current-piece next-pieces))))

;; 2N
(defn- place-two-pieces-returning-first-piece-coord-path [is-game-ended-fn genome placement first-move-placements]
  (if (is-game-ended-fn (:state placement))
    placement
    (let [first-placement (or (->> first-move-placements
                                   (calculate-scores genome)
                                   pick-best-state)
                              placement)]
      (if (is-game-ended-fn (:state first-placement))
        first-placement
        (assoc (assoc-in (or (pick-best-1deep-piece-placement genome first-placement)
                             first-placement)
                         [:state :prev-piece-path]
                         (:prev-piece-path (:state first-placement)))
               :path (:path first-placement))))))

(defn- conflicting-placement? [piece-coord-path {:keys [state] :as placement}]
  (v/overlay? (:field state) piece-coord-path))

(defn- pick-non-conflicting-first-placement [piece-coord-path genome first-move-placements]
  (->> first-move-placements
       (remove (partial conflicting-placement? piece-coord-path))
       (calculate-scores genome)
       pick-best-state))

;; 2N of piece placements
(defn- swap-next-piece-and-place-two-pieces [is-game-ended-fn genome
                                             {:keys [state] :as placement}
                                             first-move-placements]
  (if (is-game-ended-fn state)
    placement
    (let [swapped-state (swap-next-piece is-game-ended-fn state)]
      (if (is-game-ended-fn swapped-state)
        placement
        (let [swapped-placement (to-move swapped-state)
              two-swapped-placement-with-first-prev-piece-path
              (place-two-pieces-returning-first-piece-coord-path
               is-game-ended-fn genome
               swapped-placement
               (moves/find-piece-placements swapped-placement))]
          (assoc two-swapped-placement-with-first-prev-piece-path
                 :path
                 (:path (pick-non-conflicting-first-placement
                         (-> two-swapped-placement-with-first-prev-piece-path
                             :state
                             :prev-piece-path)
                         genome first-move-placements))))))))

;; Takes about 4N piece lookups to compute
(defn pick-best-2deepcheap-piece-placement [is-game-ended-fn genome state]
  (let [placement (to-move state)
        first-move-placements (moves/find-piece-placements placement) ;; 1N
        swapped-piece-best-placement (swap-next-piece-and-place-two-pieces ;; 2N
                                      is-game-ended-fn genome placement
                                      first-move-placements)
        best-1looktwice-placement (place-two-pieces-returning-first-piece-coord-path ;; 1N
                                   is-game-ended-fn genome placement first-move-placements)]
    (if (> (genome/calculate-score genome swapped-piece-best-placement)
           (genome/calculate-score genome best-1looktwice-placement))
      swapped-piece-best-placement
      best-1looktwice-placement)))

(defn place-best-look1-piece [genome state]
  (:state (pick-best-1deep-piece-placement genome (to-move state))))

(defn place-best-look2-piece [is-game-ended-fn genome state]
  (:state (pick-best-2deep-piece-placement is-game-ended-fn genome state)))

(defn place-best-2deepcheap-piece [is-game-ended-fn genome state]
  (let [state (:state (pick-best-2deepcheap-piece-placement is-game-ended-fn genome state))]
    (println (:score state))
    state))

(defn apply-pieces-while [is-game-ended-fn place-best-piece-fn genome state]
  (loop [state state]
    (if (is-game-ended-fn state)
      state
      (recur (place-best-piece-fn genome state)))))
