(ns core.ai.genome-test
  (:require [core.ai.genome :as sut]
            [clojure.test :refer :all]
            [clojure.set :as sets]))

(deftest ensure-weight-existence-test
  (testing "smoke check"
    (is
     (not (empty? (into #{} (keys (sut/ensure-weight-existence {})))))))
  (testing "should add zero coeffs"
    (is (= #{0}
           (->> (dissoc (sut/ensure-weight-existence {}) :id)
                vals
                (mapcat vals)
                (into #{})))))
  (testing "should persist vals"
    (is (= #{0 "not changed"}
           (->> (dissoc (sut/ensure-weight-existence
                         {:id "nani"
                          :risky {:well-depth-at-wall-minus-4 "not changed"}})
                        :id)
                vals
                (mapcat vals)
                (into #{}))))))
