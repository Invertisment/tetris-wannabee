(ns core.actions.new-piece)

(defn new-piece [valid? state]
  (let [[first-piece & remaining-pieces] (:next-pieces state)
        new-state (merge
                   state
                   first-piece
                   {:next-pieces remaining-pieces})]
    (if (valid? new-state)
      new-state
      (assoc state :game-state :ended))))
