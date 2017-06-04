(ns core.state
  (:require-macros [cljs.core.async.macros :refer [go-loop]])
  (:require [cljs.core.async :refer [chan sliding-buffer]]))

(def moving-piece (atom #{[1 1] [1 2] [1 3] [2 1]}))

(def before-save-piece-ch (chan (sliding-buffer 1)))
(def after-save-piece-ch (chan (sliding-buffer 1)))

(defn before-save-piece-loop []
  (go-loop
    []
    (let [prev-piece @moving-piece
          new-piece (<! before-save-piece-ch)]
      (reset! moving-piece new-piece)
      (>! after-save-piece-ch [prev-piece new-piece])
      (when new-piece (recur)))))
