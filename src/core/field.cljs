(ns core.field
  (:require cljsjs.fabric
            [cljs.core.async :refer [chan]]))

(enable-console-print!)

(def current-piece-pipe (chan 5))

(def block-size-px 50)
(def field-size-in-blocks [10 22])

(def canvas
  (new js/fabric.Canvas "game-canvas"))

(def field-blocks #{})
(def curr-piece #{[1 1] [1 2] [1 3] [2 1]})

(defn get-field-blocks []
  field-blocks)
(defn get-curr-piece []
  curr-piece)

(defn create-rect [[x y]]
  (new
    js/fabric.Rect
    (js-obj "left" (* x block-size-px)
            "top" (* y block-size-px)
            "fill" "rebeccapurple"
            "width" block-size-px
            "height" block-size-px)))

(defn show [coords]
  (println "showing" coords)
  (reduce
    #(.add %1 %2)
    canvas
    (map create-rect coords)))

