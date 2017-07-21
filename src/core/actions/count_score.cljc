(ns core.actions.count-score)

(defn add-cleared-lines [field-with-line-clear-data]
  (assoc
    (dissoc
      field-with-line-clear-data
      :line-clear-data)
    :score
    {:lines-cleared
     (-> field-with-line-clear-data
         :line-clear-data
         :full-line-ids
         count
         (+ (-> field-with-line-clear-data
                :score
                :lines-cleared)))}))

(def count-score add-cleared-lines)

