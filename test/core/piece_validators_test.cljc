(ns core.piece-validators-test
  (:require [clojure.test :refer :all]
            [core.piece-validators :as v]))

(deftest is-coordinate?-test
  (testing "happy path"
      (is (v/coord? 1 1 {:coord [0 0]})))
  (testing "happy path 2"
      (is (v/coord? 2 1 {:coord [1 0]})))
  (testing "out x"
      (is (not (v/coord? 1 1 {:coord [1 0]}))))
  (testing "out x 2"
      (is (not (v/coord? 3 1 {:coord [5 0]}))))
  (testing "out y"
      (is (not (v/coord? 3 1 {:coord [1 1]}))))
  (testing "out y 2"
      (is (not (v/coord? 2 2 {:coord [1 2]}))))
  (testing "out x below 0"
      (is (not (v/coord? 2 2 {:coord [-1 1]}))))
  (testing "out y below 0"
      (is (not (v/coord? 2 2 {:coord [0 -1]})))))

(deftest overlay?-test
  (testing "not valid"
      (is (not (v/overlay?
                   [[nil nil nil]
                    [nil "a" nil]
                    [nil nil nil]]
                   [{:coord [2 2]}]))))
  (testing "happy path"
      (is (v/overlay?
               [[nil nil nil]
                [nil "a" nil]
                [nil nil nil]]
               #{{:coord [1 1]}})))
  (testing "ok"
      (is (v/overlay?
                   [["a" "a" "a"]
                    ["a" "a" nil]
                    ["a" "a" "a"]]
                   #{{:coord [1 2]}})))
  (testing "no connections"
      (is (not (v/overlay?
                   [["a" "a" "a"]
                    ["a" "a" nil]
                    ["a" "a" "a"]]
                   #{{:coord [2 1]}})))))

(deftest possible-placement?-test
 (testing "happy path"
     (is (v/possible-placement? 1 2
                                    [[nil "a"]]
                                    #{{:coord [0 0]}})))
 (testing "valid"
     (is (v/possible-placement? 3 3
                                    [["a" nil nil]
                                     ["a" nil nil]
                                     ["a" nil nil]]
                                    #{{:coord [1 0]}})))
 (testing "not valid 1"
     (is (not (v/possible-placement? 1 1
                                        [["a"]]
                                        #{{:coord [0 0]}}))))
 (testing "not valid 2"
     (is (not (v/possible-placement? 3 3
                                        [["a" nil nil]
                                         ["a" nil nil]
                                         ["a" nil nil]]
                                        #{{:coord [0 0]}}))))
 (testing "bad coords"
     (is (not (v/possible-placement? 1 1
                                        [["a"]]
                                        #{{:coord [0 -2]}})))))

(deftest field-valid?-test
 (testing "happy path"
     (is (v/field-valid? {:width 1 :height 2
                              :piece #{{:coord [0 1]}}
                              :field [[nil]
                                      [nil]]})))
 (testing "not valid"
     (is (not (v/field-valid? {:width 1 :height 1
                                  :piece #{{:coord [0 0]}}
                                  :field [["a"]]}))))
 (testing "bad coords"
     (is (not (v/field-valid? {:width 1 :height 1
                                  :piece #{{:coord [0 -2]}}
                                  :field [[nil] [nil]]}))))
 (testing "nil is not valid :width"
     (is (not (v/field-valid? {:width nil :height 1
                                  :piece #{{:coord [0 0]}}
                                  :field [[nil nil]]}))))
 (testing "nil is not valid :height"
     (is (not (v/field-valid? {:width 1 :height nil
                                  :piece #{{:coord [0 0]}}
                                  :field #{{:coord [0 -2]}}}))))
 (testing "nil is not valid :piece"
     (is (not (v/field-valid? {:width 1 :height 1
                                  :piece nil
                                  :field #{{:coord [0 -2]}}}))))
 (testing "nil is not valid :field"
     (is (not (v/field-valid? {:width 1 :height 1
                                  :piece #{{:coord [0 0]}}
                                  :field nil}))))
 (testing "invalid piece"
     (is (not (v/field-valid? {:width 1 :height 2
                                  :piece #{{:coord [-1 0]}}
                                  :field [[nil nil]]})))))
