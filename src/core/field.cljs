(ns core.field
  (:require cljsjs.fabric
            [core.constants :refer [debug]]
            [clojure.set :refer [difference]]
            [core.constants :as const]))

(enable-console-print!)

(def block-size-px 25)

(def main-canvas
  (new js/fabric.Canvas "game-canvas"))
(def next-piece-canvas
  (new js/fabric.Canvas "next-piece-canvas"))

(defn create-rect [color [x y]]
  (new
    js/fabric.Rect
    (js-obj "left" (* x block-size-px)
            "top" (* y block-size-px)
            "fill" color
            "width" block-size-px
            "height" block-size-px
            "selectable" false)))

(defn create-rect-from-colored-pixel [{:keys [coord color]}]
  (create-rect color coord))

(defn create-rects [li]
  (into {} (map
             (juxt identity create-rect-from-colored-pixel)
             li)))

(defn get-debug-overlay [state]
  (when
    const/debug
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
    (:field state)))

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

(defn diff-show-hide [field-pixels state]
  (let
    [{:keys [show hide]} (get-diff (keys field-pixels) (get-blocks state))
     keyed-rects-to-show (create-rects show)
     to-remove (select-keys field-pixels hide)]
    {:keyed-rects-to-show keyed-rects-to-show
     :to-remove to-remove}))

#_(defn show! [field-pixels-atom state]
  (let
    [field-pixels (:field @field-pixels-atom)
     {:keys [show hide]} (get-diff (keys field-pixels) (get-blocks state))
     keyed-rects-to-show (create-rects show)
     to-remove (select-keys field-pixels hide)]
    (reset!
      field-pixels-atom
      {:field
       (merge
         (apply dissoc field-pixels hide)
         keyed-rects-to-show)})
    (show-on-canvas!
      main-canvas
      (vals keyed-rects-to-show)
      (vals to-remove))))

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
    [{:keys [field-pixels next-piece-pixels]} @field-pixels-atom
     field-pixels-diff (get-diff-blocks field-pixels (get-blocks state))
     next-piece-pixels-diff (get-diff-blocks next-piece-pixels (-> state :next-piece :piece))]
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
      next-piece-pixels-diff)))

