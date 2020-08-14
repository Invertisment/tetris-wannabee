(ns core.ai.genome-spec
  (:require [core.ai.genome :refer :all]
            [speclj.core :refer :all]
            [clojure.set :as sets]))

(describe
 "ensure-weight-existence"
 (it "smoke check"
     (should-not
      (empty? (into #{} (keys (ensure-weight-existence {}))))))
 (it "should add zero coeffs"
     (should=
      #{0}
      (into #{} (vals (dissoc (ensure-weight-existence {}) :id)))))
 (it "should persist vals"
     (should=
      #{0 "not changed"}
      (->> (dissoc (ensure-weight-existence
                    {:id "nani"
                     :well-depth-at-wall-minus-4 "not changed"})
                   :id)
           (vals)
           (into #{})))))
