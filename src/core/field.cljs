(ns core.field
  (:require cljsjs.fabric
            [clojure.set :refer [difference]]
            [core.constants :as const]))

(def block-size-px 25)
(def block-highlight-margin 3)
(def block-roundness 2)

(def main-canvas
  (new js/fabric.StaticCanvas "game-canvas"))
(def next-piece-canvas
  (new js/fabric.StaticCanvas "next-piece-canvas"))
(def hold-piece-canvas
  (new js/fabric.StaticCanvas "hold-piece-canvas"))

(defn create-rect [color [x y]]
  (new js/fabric.Group
       (array
        (new
         js/fabric.Rect
         (js-obj
          "fill" color
          "width" (- block-size-px block-roundness)
          "height" (- block-size-px block-roundness)
          "strokeLineJoin" "round"
          "strokeWidth" block-roundness
          "stroke" color))
        (new
         js/fabric.Rect
         (js-obj
          "fill" "transparent"
          "width" (- block-size-px (/ block-roundness 2))
          "height" (- block-size-px (/ block-roundness 2))
          "strokeLineJoin" "round"
          "strokeWidth" (/ block-roundness 2)
          "stroke" "rgba(0,0,0,0.2)"))
        (new
         js/fabric.Polygon
         (array
          (clj->js {"x" 0 "y" 0})
          (clj->js {"x" 5 "y" 0})
          (clj->js {"x" 5 "y" 2})
          (clj->js {"x" 2 "y" 2})
          (clj->js {"x" 2 "y" 5})
          (clj->js {"x" 2 "y" 5})
          (clj->js {"x" 0 "y" 5}))
         (js-obj
          "fill" "rgba(200,255,255,0.6)"
          "left" block-highlight-margin
          "top" block-highlight-margin))
        (new
         js/fabric.Polygon
         (array
          (clj->js {"x" 0 "y" 0})
          (clj->js {"x" 5 "y" 0})
          (clj->js {"x" 5 "y" 2})
          (clj->js {"x" 0 "y" 2})
          (clj->js {"x" 0 "y" 5}))
         (js-obj
          "fill" "rgba(200,255,255,0.3)"
          "left" 0
          "top" 0)))
       (clj->js {"left" (* x block-size-px)
                 "top" (* y block-size-px)})))

(defn create-rect-from-colored-pixel [{:keys [coord color]}]
  (create-rect color coord))

(defn create-rects [li]
  (into {} (map
            (juxt identity create-rect-from-colored-pixel)
            li)))

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

(defn get-diff [old-visibles new-visibles]
  (let
    [o-set (set old-visibles)
     n-set (set new-visibles)]
    {:show (difference n-set o-set)
     :hide (difference o-set n-set)}))

(defn show-on-canvas! [canvas show-remove-diff]
  (reduce
    #(.add %1 %2)
    canvas
    (vals (:rects-to-show show-remove-diff)))
  (reduce
    #(.remove %1 %2)
    canvas
    (vals (:rects-to-hide show-remove-diff))))

(defn get-diff-blocks [field-pixels blocks]
  (let
      [{:keys [show hide]} (get-diff (keys field-pixels) blocks)
       keyed-rects-to-show (create-rects show)
       to-remove-main (select-keys field-pixels hide)]
    {:rects-to-show keyed-rects-to-show
     :rects-to-hide to-remove-main}))

(defn update-prev-blocks [old-pixels pixels-diff]
   (merge
     (apply dissoc old-pixels (keys (:rects-to-hide pixels-diff)))
     (:rects-to-show pixels-diff)))

(defn show! [field-pixels-atom state]
  (let
      [{:keys [field-pixels next-piece-pixels hold-piece-pixels]} @field-pixels-atom
       field-pixels-diff (get-diff-blocks field-pixels (get-blocks state))
       next-piece-pixels-diff (get-diff-blocks next-piece-pixels (-> state :next-pieces first :piece))
       hold-piece-pixels-diff (get-diff-blocks hold-piece-pixels (-> state :hold-piece :piece))
       ]
    (reset!
     field-pixels-atom
     (merge
      {:field-pixels (update-prev-blocks field-pixels field-pixels-diff)}
      {:next-piece-pixels (update-prev-blocks next-piece-pixels next-piece-pixels-diff)}))
    (show-on-canvas!
     main-canvas
     field-pixels-diff)
    (show-on-canvas!
     next-piece-canvas
     next-piece-pixels-diff)
    (show-on-canvas!
     hold-piece-canvas
     hold-piece-pixels-diff)))
