(ns core.constants)

(def field-width 10)
(def field-height 22)

; Controls (js)
(def left "KeyA")
(def right "KeyD")
(def rotate "KeyW")
(def rotate-clockwise "KeyE")
(def rotate-counter-clockwise "KeyQ")
(def down "KeyS")
(def bottom "Space")

(def debug true)

; Bounds
(def bounds-2x2
  {:x-range [4 6]
   :y-range [0 2]})
(def bounds-3x3
  {:x-range [3 6]
   :y-range [0 3]})
(def bounds-4x4
  {:x-range [3 7]
   :y-range [0 4]})

; Pieces
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

(defn apply-color [{:keys [piece color] :as piece-data}]
  (assoc
    piece-data
    :piece (set (map
                  (fn [coord]
                    {:coord coord
                     :color color})
                  piece))))

(def pieces
  "These coordinated specify where tetrominoes
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

