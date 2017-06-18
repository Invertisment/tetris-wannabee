(ns core.actions.rotate)

(defn map-coord [piece-fn piece]
  (set (map
         (fn [{:keys [coord] :as data}]
           (let [[x y] coord]
             (assoc data :coord (piece-fn x y))))
         piece)))

(defn flip-piece-horizontally [{:keys [piece piece-bounds] :as state}]
  (let [[x-start x-end] (:x-range piece-bounds)
        x-end-dec (dec x-end)]
    (assoc state
           :piece (map-coord
                    (fn [x y]
                      [(- x-end-dec (- x x-start)) y])
                    piece))))

(defn flip-piece-vertically [{:keys [piece piece-bounds] :as state}]
  (let [[y-start y-end] (:y-range piece-bounds)
        y-end-dec (dec y-end)]
    (assoc state
           :piece (map-coord
                    (fn [x y]
                      [x (- y-end-dec (- y y-start))])
                    piece))))

(defn flip-piece-diagonally [{:keys [piece piece-bounds] :as state}]
  (let [[x-start] (:x-range piece-bounds)
        [y-start] (:y-range piece-bounds)]
    (assoc state :piece (map-coord
                          (fn [x y]
                            [(+ x-start (- y y-start))
                             (+ y-start (- x x-start))])
                          piece))))

(defn rotate-piece-clockwise [state]
  (-> state
      flip-piece-diagonally
      flip-piece-horizontally))

(defn rotate-piece-counter-clockwise [state]
  (-> state
      flip-piece-diagonally
      flip-piece-vertically))

