(ns core.field
  (:require [clojure.set :refer [difference intersection union]]
            [core.constants :as const]))

(def block-size-px 25)
(def block-highlight-margin 3)

(defn get-canvas-context [html-id]
  (.getContext (.getElementById js/document html-id) "2d"))

(def main-canvas-context
  (get-canvas-context "game-canvas"))
(def next-piece-canvas-context
  (get-canvas-context "next-piece-canvas"))
(def hold-piece-canvas-context
  (get-canvas-context "hold-piece-canvas"))

(defn calc-square-location [[x y]]
  [(* x block-size-px)
   (* y block-size-px)
   block-size-px
   block-size-px])

;; https://stackoverflow.com/a/13485654/2159808
(defn border [canvas-ctx stroke-style x y w h tl tr br bl]
  (aset canvas-ctx "strokeStyle" stroke-style)
  (aset canvas-ctx "lineWidth" 1)
  (let [r (+ x w)
        b (+ y h)]
    (doto canvas-ctx
      (.beginPath)
      (.moveTo (+ x tl) y)
      (.lineTo (- r tr) y)
      (.quadraticCurveTo r y r (+ y tr))
      (.lineTo r (- b br))
      (.quadraticCurveTo r b (- r br) b)
      (.lineTo (+ x bl) b)
      (.quadraticCurveTo x b x (- b bl))
      (.lineTo x (+ y tl))
      (.quadraticCurveTo x y (+ x tl) y)
      (.stroke))))

(defn filled-border [canvas-ctx stroke-style fill-style x y w h tl tr br bl]
  (aset canvas-ctx "fillStyle" fill-style)
  (border canvas-ctx stroke-style x y w h tl tr br bl)
  (.fill canvas-ctx))

(def block-spacing 0.7)
(def block-spacing-2 (* block-spacing 2))

(defn square [canvas-ctx color x y x-size y-size]
  (filled-border canvas-ctx
                 color
                 color
                 (+ x block-spacing)
                 (+ y block-spacing)
                 (- x-size block-spacing-2)
                 (- y-size block-spacing-2)
                 0
                 0
                 0
                 0))

(defn path [canvas-ctx fill-style path-points]
  (aset canvas-ctx "fillStyle" fill-style)
  (.beginPath canvas-ctx)
  (let [[[x y]] path-points]
    (.moveTo canvas-ctx x y))
  (reduce
   (fn [_ [x y]]
     (.lineTo canvas-ctx x y))
   nil
   path-points)
  (.fill canvas-ctx))


(defn highlight [canvas-ctx x y]
  (path canvas-ctx "rgba(200,255,255,0.6)"
        (map
         (fn [[coord-x coord-y]]
           [(+ x coord-x block-highlight-margin)
            (+ y coord-y block-highlight-margin)])
         [[0 0]
          [5 0]
          [5 2]
          [2 2]
          [2 5]
          [2 5]
          [0 5]]))
  (path canvas-ctx "rgba(200,255,255,0.3)"
        (map
         (fn [[coord-x coord-y]]
           [(+ x coord-x) (+ y coord-y)])
         [[0 0]
          [5 0]
          [5 2]
          [0 2]
          [0 5]])))

(defn draw-square [canvas-ctx {:keys [coord color]}]
  (let [[x y x-size y-size] (calc-square-location coord)]
    (square canvas-ctx color x y x-size y-size)
    (border canvas-ctx
            "rgba(0,0,0,0.02)"
            (+ x 0.5) (+ y 0.5)
            (dec x-size) (dec y-size)
            0
            0
            0
            0)
    (highlight canvas-ctx x y)))

(defn clear-square [canvas-ctx {:keys [coord color]}]
  (let [[x y x-size y-size] (calc-square-location coord)]
    (.clearRect canvas-ctx x y x-size y-size)))

(defn get-debug-overlay [state]
  (when
    const/piece-overlay
    (let
      [{:keys [x-range y-range]} (:piece-bounds state)]
      (difference
        (set
          (for [x (when (not-empty x-range) (apply range x-range))
                y (when (not-empty y-range) (apply range y-range))]
            (do
              {:coord [x y] :color "black"})))
        (map
          (fn [m]
            (assoc m :color "black"))
          (:piece state))))))

(defn get-blocks [state]
  (concat
   (:piece state)
   (get-debug-overlay state)
   (->> (:field state)
        (map-indexed (fn [vertical-index line]
                       (map-indexed
                        (fn [horizontal-index maybe-color]
                          (when maybe-color
                            {:coord [horizontal-index vertical-index] :color maybe-color}))
                        line)))
        (reduce concat)
        (remove nil?))))

(defn get-diff [in-field-visibles new-visibles]
  (let [in-field (set in-field-visibles)
        to-show (set new-visibles)]
    {:rects-to-hide (difference in-field to-show)
     :rects-to-show (difference to-show in-field)}))

(defn show-on-canvas! [canvas-context {:keys [rects-to-show rects-to-hide] :as rects-diff}]
  (reduce
   (fn [canvas-context block]
     (clear-square canvas-context block)
     canvas-context)
   canvas-context
   rects-to-hide)
  (reduce
   (fn [canvas-context block]
     (draw-square canvas-context block)
     canvas-context)
   canvas-context
   rects-to-show))

(defn update-prev-blocks [old-pixels {:keys [rects-to-show rects-to-hide] :as rects-diff}]
  (-> old-pixels
      (difference rects-to-hide)
      (union rects-to-show)))

(defn show! [field-pixels-atom state]
  (let [{:keys [field-pixels next-piece-pixels hold-piece-pixels]} @field-pixels-atom
        field-pixels-diff (get-diff field-pixels (get-blocks state))
        next-piece-pixels-diff (get-diff next-piece-pixels (-> state :next-pieces first :piece))
        hold-piece-pixels-diff (get-diff hold-piece-pixels (-> state :hold-piece :piece))]
    (reset!
     field-pixels-atom
     {:field-pixels (update-prev-blocks field-pixels field-pixels-diff)
      :next-piece-pixels (update-prev-blocks next-piece-pixels next-piece-pixels-diff)
      :hold-piece-pixels (update-prev-blocks hold-piece-pixels hold-piece-pixels-diff)})
    (show-on-canvas!
     main-canvas-context
     field-pixels-diff)
    (show-on-canvas!
     next-piece-canvas-context
     next-piece-pixels-diff)
    (show-on-canvas!
     hold-piece-canvas-context
     hold-piece-pixels-diff)))
