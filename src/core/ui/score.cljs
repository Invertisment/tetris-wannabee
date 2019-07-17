(ns core.ui.score
  (:require [core.field-util :as field-util]))

(def html-elem-lines-cleared
  (js/document.getElementById "lines-cleared"))

#_(def html-elem-points
  (js/document.getElementById "points"))

(def html-elem-level
  (js/document.getElementById "level"))

(defn show! [element data]
  (aset
    element "innerHTML"
    data))

(defn get-lines-cleared [field]
  (or (->> field :score :lines-cleared) 0))

#_(defn get-points [field]
  (or (->> field :score :points) 0))

(defn get-level [field]
  (:id (field-util/get-current-level field)))

(defn show-score! [field]
  (show!
    html-elem-lines-cleared
    (get-lines-cleared field))
  #_(show!
    html-elem-points
    (get-points field))
  (show!
    html-elem-level
    (get-level field))
  field)

