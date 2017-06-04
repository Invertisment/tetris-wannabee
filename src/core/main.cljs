(ns core.main
  (:require-macros [cljs.core.async.macros :refer [go-loop]])
  (:require [cljs.core.async :refer [timeout <!]]
            [core.field :as fi]
            [core.core :refer [create-change-listener]]
            [core.keys :refer [setup-key-listener]]
            [core.state :as state]))

(enable-console-print!)

(defn game-loop []
  (state/before-save-piece-loop)
  (go-loop
    []
    (let [piece-change (<! state/after-save-piece-ch)]
      (fi/show piece-change)
      (when piece-change (recur)))))

(defn -main []
  (game-loop)
  (setup-key-listener
    (create-change-listener
      state/moving-piece
      state/before-save-piece-ch)))

(-main)

