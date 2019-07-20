(ns core.state
  (:require-macros [cljs.core.async.macros :refer [go-loop]])
  (:require [cljs.core.async :refer [chan sliding-buffer]]
            [core.constants :refer [field-width field-height gravity-intervals]]))

(def field (atom {:field #{} :width field-width
                  :height field-height
                  :game-state :not-started
                  :levels gravity-intervals
                  :next-pieces []}))

(def field-pixels (atom {:field-pixels {}
                         :next-piece-pixels {}}))

(def before-save-piece-ch (chan (sliding-buffer 1)))
(def after-save-piece-ch (chan (sliding-buffer 1)))

(defn before-save-piece-loop []
  (go-loop
    []
    (let [new-piece (<! before-save-piece-ch)]
      (reset! field new-piece)
      (>! after-save-piece-ch new-piece)
      (when new-piece (recur)))))
