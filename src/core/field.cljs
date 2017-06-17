(ns core.field
  (:require cljsjs.fabric
            [core.constants :refer [debug]]
            [clojure.set :refer [difference]]))

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

(defn create-rects [color li]
  (map
    (partial create-rect color)
    li))

(defn produce-debug-piece-overlay [state]
  (when
    true
    (create-rects
      "orangered"
      (let
        [{:keys [x-range y-range]} (:piece-bounds state)]
        (difference
          (set
            (for [x (apply range x-range)
                  y (apply range y-range)]
              [x y]))
          (:piece state))))))

(defn show! [[old-state new-state]]
  #_(println "showing " old-state new-state)
  (.clear canvas)
  (reduce
    #(.add %1 %2)
    canvas
    (concat
      (create-rects
        "rebeccapurple"
        (:piece new-state))
      (produce-debug-piece-overlay new-state)
      (create-rects
        "dodgerblue"
        (:field new-state)))))

