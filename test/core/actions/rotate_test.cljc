(ns core.actions.rotate-test
  (:require [clojure.test :refer :all]
            [core.actions.rotate :as stick]
            [core.constants :as const]))

(deftest flip-piece-horizontally-test
  (testing "should nop with line piece"
    (is (= (const/apply-color const/line-piece)
           (stick/flip-piece-horizontally
            (const/apply-color const/line-piece)))))
  (testing "should turn j into l"
    (is (= (const/apply-color (assoc const/l-piece :piece #{[3 0] [3 1] [4 1] [5 1]}))
           (stick/flip-piece-horizontally
            (const/apply-color const/l-piece)))))
  (testing "should turn z into reverse z"
    (is (= (const/apply-color (assoc const/z-piece :piece #{[4 0] [5 0] [3 1] [4 1]}))
           (stick/flip-piece-horizontally
            (const/apply-color const/z-piece))))))

#_(deftest flip-piece-vertically-test
    (testing "should flip with line piece"
      (is (= (const/apply-color (assoc const/line-piece :piece #{[3 2] [4 2] [5 2] [6 2]}))
             (stick/flip-piece-vertically
              (const/apply-color const/line-piece)))))
    (testing "should flip t piece"
      (is (= (const/apply-color (assoc const/t-piece :piece #{[4 2] [3 1] [4 1] [5 1]}))
             (stick/flip-piece-vertically
              (const/apply-color const/t-piece))))))

(deftest flip-piece-diagonally-test
  (testing "should nop with diagonal block"
    (is (= (const/apply-color {:piece #{[4 0]} :piece-bounds const/bounds-2x2})
           (stick/flip-piece-diagonally
            (const/apply-color {:piece #{[4 0]} :piece-bounds const/bounds-2x2})))))
  (testing "should transpose non diagonal block"
    (is (= (const/apply-color {:piece #{[5 0]} :piece-bounds const/bounds-2x2})
           (stick/flip-piece-diagonally
            (const/apply-color {:piece #{[4 1]} :piece-bounds const/bounds-2x2})))))
  (testing "should turn initial l into last rotation of j"
    (is (= (const/apply-color (assoc const/l-piece :piece #{[4 0] [4 1] [4 2] [3 2]}))
           (stick/flip-piece-diagonally
            (const/apply-color const/l-piece)))))
  (testing "should turn z into last rotation of reverse z"
    (is (= (const/apply-color (assoc const/z-piece :piece #{[3 0] [3 1] [4 1] [4 2]}))
           (stick/flip-piece-diagonally
            (const/apply-color const/z-piece)))))
  (testing "should turn z into last rotation of reverse z"
    (is (= (const/apply-color (assoc const/z-piece
                                     :piece #{[3 2] [3 3] [4 3] [4 4]}
                                     :piece-bounds {:x-range [3 6]
                                                    :y-range [2 4]}))
           (stick/flip-piece-diagonally
            (const/apply-color (assoc const/z-piece :piece #{[3 2] [4 2] [4 3] [5 3]}
                                      :piece-bounds {:x-range [3 6]
                                                     :y-range [2 4]}))))))
  (testing "should turn z into last rotation of reverse z moved"
    (is (= (const/apply-color (assoc const/z-piece
                                     :piece #{[3 3] [3 4] [4 4] [4 5]}
                                     :piece-bounds {:x-range [3 6]
                                                    :y-range [3 5]}))
           (stick/flip-piece-diagonally
            (const/apply-color (assoc const/z-piece :piece #{[3 3] [4 3] [4 4] [5 4]}
                                      :piece-bounds {:x-range [3 6]
                                                     :y-range [3 5]})))))))

(deftest rotate-piece-clockwise-test
  (testing "should rotate z into its second phase"
    (is (= (const/apply-color (assoc const/z-piece :piece #{[5 0] [5 1] [4 1] [4 2]}))
           (stick/rotate-piece-clockwise
            (const/apply-color const/z-piece)))))
  (testing "should rotate line piece"
    (is (= (const/apply-color (assoc const/line-piece :piece #{[5 0] [5 1] [5 2] [5 3]}))
           (stick/rotate-piece-clockwise
            (const/apply-color const/line-piece))))))

(deftest rotate-piece-counter-clockwise-test
  (testing "should rotate line piece back"
    (is (= (const/apply-color (assoc const/line-piece :piece #{[4 0] [4 1] [4 2] [4 3]}))
           (stick/rotate-piece-counter-clockwise
            (const/apply-color const/line-piece)))))
  (testing "should rotate z into its last phase"
    (is (= (const/apply-color (assoc const/z-piece :piece #{[4 0] [4 1] [3 1] [3 2]}))
           (stick/rotate-piece-counter-clockwise
            (const/apply-color const/z-piece))))))

