(ns core.actions.count-score-test
  (:require [clojure.test :refer :all]
            [core.actions.count-score :as cs]))

(deftest add-cleared-lines-test
  (testing "should add nothing if no :line-clear-data"
    (is (= {:score {:lines-cleared 0}}
           (cs/add-cleared-lines {:score {:lines-cleared 0}}))))
  (testing "should add nothing if no lines"
    (is (= {:score {:lines-cleared 0}
            :line-clear-data {:count 0}}
           (cs/add-cleared-lines
            {:score {:lines-cleared 0}
             :line-clear-data {:count 0}}))))
  (testing "should add lines to :lines-cleared"
    (is (= {:score {:lines-cleared 2}
            :line-clear-data {:count 2}}
           (cs/add-cleared-lines
            {:score {:lines-cleared 0}
             :line-clear-data {:count 2}}))))
  (testing "should add lines to :lines-cleared (non zero prev)"
    (is (= {:score {:lines-cleared 8}
            :line-clear-data {:count 3}}
           (cs/add-cleared-lines
            {:score {:lines-cleared 5}
             :line-clear-data {:count 3}})))))
