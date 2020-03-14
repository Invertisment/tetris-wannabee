(ns core.actions.count-score)

(defn remove-lines-clear-data [field-with-line-clear-data]
  (dissoc
    field-with-line-clear-data
    :line-clear-data))

(defn add-cleared-lines [field-with-line-clear-data]
  (assoc
   field-with-line-clear-data
   :score
   {:lines-cleared
    (-> field-with-line-clear-data
        :line-clear-data
        :count
        (+ (or (-> field-with-line-clear-data
                   :score
                   :lines-cleared)
               0)))}))

(defn count-score [field-with-line-clear-data]
  (->> field-with-line-clear-data
       add-cleared-lines
       remove-lines-clear-data))

