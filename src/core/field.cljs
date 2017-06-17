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
            "height" block-size-px)))

(defn create-rect-from-colored-pixel [{:keys [coord color]}]
  (create-rect color coord))

(defn create-rects [li]
  (map
    create-rect-from-colored-pixel
    li))

(defn produce-debug-piece-overlay [state]
  (when
    const/debug
    (create-rects
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
            (:piece state)))))))

(defn show! [[old-state new-state]]
  #_(println "showing " #_old-state new-state)
  (.clear canvas)
  (reduce
    #(.add %1 %2)
    canvas
    (concat
      (create-rects (:piece new-state))
      (produce-debug-piece-overlay new-state)
      (create-rects (:field new-state))
      #_(create-rects
        "dodgerblue"
        (:field new-state)))))

