(ns core.keys)

(defn produce-keypress-fn [on-key-fn]
  (fn [keyboard-event]
    (on-key-fn (aget keyboard-event "code"))))

(defn setup-key-listener [on-key-fn]
  (println "setting up keys listener")
  (-> js/document
      (.getElementById "doc-body")
      (.addEventListener "keypress" (produce-keypress-fn on-key-fn))))
