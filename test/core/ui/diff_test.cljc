(ns core.ui.diff-test
  (:require [clojure.test :refer :all]
            [core.ui.diff :as sut]))

(deftest block-visibility-diff-test
  (testing "should determine values to add"
      (is (= {:add #{1 2 3} :rem #{}}
             (sut/block-diff [#{} #{1 2 3}]))))
  (testing "should determine values to remove"
      (is (= {:add #{} :rem #{1 2}}
             (sut/block-diff [#{1 2} #{}]))))
  (testing "should determine values that don't need to be touched"
      (is (= {:add #{3} :rem #{1}}
             (sut/block-diff [#{1 2} #{2 3}])))))

(deftest remove-blocks-test
  (testing "should remove blocks from canvas"
      (is (= {:add #{1 2 3} :rem #{}}
             (sut/block-diff [#{} #{1 2 3}])))))

