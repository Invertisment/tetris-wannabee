(ns core.ui.score)

(def html-elem-lines-cleared
  (js/document.getElementById "lines-cleared"))

(defn show! [element data]
  (aset
    element "innerHTML"
    data))

(defn get-lines-cleared [field]
  (or (->> field :score :lines-cleared) 0))

(defn show-score! [field]
  (show!
    html-elem-lines-cleared
    (get-lines-cleared field))
  field)

