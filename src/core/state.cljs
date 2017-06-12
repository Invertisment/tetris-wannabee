(ns core.state
  (:require-macros [cljs.core.async.macros :refer [go-loop]])
  (:require [cljs.core.async :refer [chan sliding-buffer]]
            [core.constants :refer [field-width field-height]]))

(def field (atom {:piece #{[1 1] [1 2] [1 3] [2 1]}
                  :field #{[5 5]}
                  :width field-width
                  :height field-height}))

(def before-save-piece-ch (chan (sliding-buffer 1)))
(def after-save-piece-ch (chan (sliding-buffer 1)))

(defn before-save-piece-loop []
  (go-loop
    []
    (let [prev-piece @field
          new-piece (<! before-save-piece-ch)]
      (reset! field new-piece)
      (>! after-save-piece-ch [prev-piece new-piece])
      (when new-piece (recur)))))
