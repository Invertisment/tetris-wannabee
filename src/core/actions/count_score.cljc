(ns core.actions.count-score)

(defn remove-lines-clear-data [field-with-line-clear-data]
  (dissoc
   field-with-line-clear-data
   :line-clear-data))

(defn- add-lines [maybe-old-num new-num]
  (+ (or maybe-old-num 0) new-num))

(defn add-cleared-lines [field-with-line-clear-data]
  (update-in field-with-line-clear-data
            [:score :lines-cleared]
            add-lines (get-in field-with-line-clear-data
                              [:line-clear-data :count] 0)))

(defn count-score [field-with-line-clear-data]
  (->> field-with-line-clear-data
       add-cleared-lines
       remove-lines-clear-data))

