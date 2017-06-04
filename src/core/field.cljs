(ns core.field
  (:require cljsjs.fabric))

(enable-console-print!)

(def block-size-px 25)
(def field-size-in-blocks [10 22])

(def canvas
  (new js/fabric.Canvas "game-canvas"))

(defn create-rect [[x y]]
  (new
    js/fabric.Rect
    (js-obj "left" (* x block-size-px)
            "top" (* y block-size-px)
            "fill" "rebeccapurple"
            "width" block-size-px
            "height" block-size-px)))

(defn show [[old-coords new-coords]]
  #_(println "showing" old-coords new-coords)
  (.clear canvas)
  (reduce
    #(.add %1 %2)
    canvas
    (map create-rect new-coords)))

