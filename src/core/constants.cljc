(ns core.constants)

(def field-width 10)
(def field-height 22)

;; Controls (js)
(def left #{"KeyA" "ArrowLeft"})
(def right #{"KeyD" "ArrowRight"})
(def rotate-clockwise #{"KeyW" "KeyE" "ArrowUp"})
(def rotate-counter-clockwise #{"KeyQ"})
(def down #{"KeyS" "ArrowDown"})
(def bottom #{"Space"})
(def hold #{"KeyR"})
(def new-game #{"KeyN"})
(def toggle-ai #{"KeyM"})
(def toggle-ai-speed #{"Minus"})
(def toggle-ai-controls #{"Equal"})
(def gravity-pull-down #{"internal_gravity-pull"})

(def debug true)
(def piece-overlay false)

;; Bounds
(def bounds-2x2
  {:x-range [4 6]
   :y-range [0 2]})
(def bounds-3x3
  {:x-range [3 6]
   :y-range [0 3]})
(def bounds-4x4
  {:x-range [3 7]
   :y-range [0 4]})

;; Pieces
(def line-piece
  {:piece #{[3 1] [4 1] [5 1] [6 1]} :piece-bounds bounds-4x4 :color "cyan"})
(def j-piece
  {:piece #{[3 0] [3 1] [4 1] [5 1]} :piece-bounds bounds-3x3 :color "royalblue"})
(def l-piece
  {:piece #{[3 1] [4 1] [5 1] [5 0]} :piece-bounds bounds-3x3 :color "darkorange"})
(def square-piece
  {:piece #{[4 0] [5 0] [4 1] [5 1]} :piece-bounds bounds-2x2 :color "gold"})
(def z-reverse-piece
  {:piece #{[4 0] [5 0] [3 1] [4 1]} :piece-bounds bounds-3x3 :color "limegreen"})
(def t-piece
  {:piece #{[4 0] [3 1] [4 1] [5 1]} :piece-bounds bounds-3x3 :color "rebeccapurple"})
(def z-piece
  {:piece #{[3 0] [4 0] [4 1] [5 1]} :piece-bounds bounds-3x3 :color "orangered"})

(def empty-row
  (vec
   (map
    (constantly nil)
    (range field-width))))

(defn apply-color [{:keys [piece color] :as piece-data}]
  (assoc
    piece-data
    :piece (set (map
                  (fn [coord]
                    {:coord coord
                     :color color})
                  piece))))

(def pieces
  "These coordinates specify where tetrominoes
  spawn and their initial rotation"
  (map
   apply-color
   [line-piece
    j-piece
    l-piece
    square-piece
    z-reverse-piece
    t-piece
    z-piece]))

"http://harddrop.com/wiki/Tetris_(NES,_Nintendo)"
(def gravity-frames-per-second
  (->> (concat
        [48 43 38 33 28 23 18 13 8 6]
        (repeat 3 5)
        (repeat 3 4)
        (repeat 3 3)
        (repeat 10 2)
        #_(repeat 1) ;; added in a fn
        )
       #_(take 30)))

(defn adjust-gravity-time [frames-per-interval]
  (-> frames-per-interval
      (* 1000)
      (/ 60.0988)
      (+ 250)
      int))

(def gravity-intervals
  (->> gravity-frames-per-second
       (map-indexed
        (fn [id frames-per-interval]
          {:id id
           :timeout (adjust-gravity-time frames-per-interval)}))
       (vec)))

(def max-gravity-interval
  {:id "Max"
   :timeout (adjust-gravity-time 1)})

(defn get-current-level [start-level lines-cleared]
  (let [level (max start-level (quot lines-cleared 10))]
    (if (contains? gravity-intervals level)
      (gravity-intervals level)
      max-gravity-interval)))
#_(map (partial get-current-level 0)
       (range 0 1000 1))
#_(map (partial get-current-level 5)
       (range 0 1000 1))
