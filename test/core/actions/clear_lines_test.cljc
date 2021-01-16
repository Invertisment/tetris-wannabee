(ns core.actions.clear-lines-test
  (:require [clojure.test :refer :all]
            [core.actions.clear-lines :as cl]
            [core.constants :as const]))

(deftest non-full-line?-test
  (testing "find full line 1"
    (is (cl/non-full-line?
         [nil nil nil nil nil])))
  (testing "find full line 2"
    (is (cl/non-full-line?
         [1 1 1 1 1 nil])))
  (testing "find full line 3"
    (is (not (cl/non-full-line?
              [1 1 1 1 1])))))

(deftest remove-full-lines-test
 (testing "empty field"
   (is (= {:field [[nil nil nil nil nil]
                   [nil nil nil nil nil]
                   [nil nil nil nil nil]],
           :height 3
           :line-clear-data {:count 0}}
          (cl/remove-full-lines
           {:field
            [[nil nil nil nil nil]
             [nil nil nil nil nil]
             [nil nil nil nil nil]]
            :height 3}))))
 (testing "increase height of smaller field"
   (is (= {:field
           [[nil nil nil nil nil nil nil nil nil nil]
            [nil nil nil nil nil nil nil nil nil nil]
            [nil nil nil nil nil nil nil nil nil nil]
            [nil nil nil nil nil]]
           :height 4
           :line-clear-data {:count 3}}
          (cl/remove-full-lines
           {:field
            [[nil nil nil nil nil]]
            :height 4}))))
 (testing "remove full lines"
   (is (= {:field
           [[nil nil nil nil nil nil nil nil nil nil]
            [nil nil nil nil nil nil nil nil nil nil]
            [nil nil nil nil nil nil nil nil nil nil]
            [nil nil "b" nil nil]
            [nil nil "c" nil nil]
            [nil nil "d" nil nil]
            [nil nil "e" nil nil]]
           :height 7
           :line-clear-data {:count 3}}
          (cl/remove-full-lines
           {:field
            [[nil nil "b" nil nil]
             [nil nil "c" nil nil]
             ["a" "a" "a" "a" "a"]
             [nil nil "d" nil nil]
             ["a" "a" "a" "a" "a"]
             [nil nil "e" nil nil]]
            :height 7})))))
