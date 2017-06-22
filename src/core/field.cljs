(ns core.field
  (:require cljsjs.fabric
            [core.constants :refer [debug]]
            [clojure.set :refer [difference]]
            [core.constants :as const]))

(enable-console-print!)

(def block-size-px 25)

(def canvas
  (new js/fabric.Canvas "game-canvas"))

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

(defn show! [field-pixels-atom state]
  (let
    [field-pixels @field-pixels-atom
     {:keys [show hide]} (get-diff (keys field-pixels) (get-blocks state))
     keyed-rects-to-show (create-rects show)
     to-remove (select-keys field-pixels hide) ]
    (reset!
      field-pixels-atom
      (merge
        (apply dissoc field-pixels hide)
        keyed-rects-to-show))
    (reduce
      #(.add %1 %2)
      canvas
      (vals keyed-rects-to-show))
    (reduce
      #(.remove %1 %2)
      canvas
      (vals to-remove))))

