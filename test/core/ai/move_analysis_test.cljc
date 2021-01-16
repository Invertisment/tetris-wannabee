(ns core.ai.move-analysis-test
  (:require [core.ai.move-analysis :as sut]
            [core.ai.moves :as moves]
            [clojure.test :refer :all]
            [core.constants :refer [field-width field-height pieces]]
            [core.ai.util :as util]
            [core.actions.move :as move]
            [core.ai.placement :as placement]
            [core.constants :as const]))

(def unfinished-bridge-field
  (util/new-field
   [util/z-piece
    util/line-piece
    util/line-piece
    util/square-piece]
   [move/left move/left move/left move/bottom
    move/left move/bottom
    move/right move/right move/bottom]))

(def finished-bridge-field
  (util/new-field
   [util/z-piece
    util/line-piece
    util/line-piece
    util/square-piece]
   [move/left move/left move/left move/bottom
    move/left move/bottom
    move/right move/right move/bottom
    move/right move/right move/right move/right move/bottom]))

(def one-clearable-line-field
  (util/new-field
   [util/line-piece
    util/line-piece
    util/t-piece]
   [move/left move/left move/left move/bottom
    move/right move/bottom
    move/rotate-counter-clockwise move/right move/right move/right move/right move/bottom]))

(def three-times-four-hole-field
  (util/new-field
   [util/line-piece
    util/line-piece
    util/line-piece
    util/line-piece
    util/line-piece
    util/t-piece]
   [move/rotate-counter-clockwise move/left move/left move/left move/left move/bottom
    move/left move/left move/left move/bottom
    move/rotate-counter-clockwise move/left move/left move/left move/left move/bottom
    move/left move/left move/left move/bottom
    move/rotate-counter-clockwise move/left move/left move/left move/left move/bottom
    move/left move/left move/left move/bottom
    ]))

(deftest find-heights-from-bottom-test
  (testing "find height 1"
    (is (= [2 2 2 2 2 3 3 3 5 5]
           (sut/find-heights-from-bottom finished-bridge-field))))
  (testing "find height 2"
    (is (= [2 2 2 2 2 3 3 3 3 0]
           (sut/find-heights-from-bottom unfinished-bridge-field)))))

(deftest find-relative-heights-test
  (testing "find relative height 1"
    (is (= [0 0 0 0 0 1 1 1 3 3]
           (sut/find-relative-heights (sut/find-heights-from-bottom finished-bridge-field)))))
  (testing "find relative height 2"
    (is (= [2 2 2 2 2 3 3 3 3 0]
           (sut/find-relative-heights (sut/find-heights-from-bottom unfinished-bridge-field))))))

#_(deftest find-holes-x-test
    (testing "should find-holes-x 1"
      (is (= [1 0 0 1 1 1 2 2 2 3]
             (find-holes-x
              (group-coords finished-bridge-field)
              (sut/find-heights-from-bottom finished-bridge-field)))))
    (testing "should find-holes-x 2"
      (is (= [1 0 0 1 1 1 2 2 2 0]
             (find-holes-x
              (group-coords unfinished-bridge-field)
              (sut/find-heights-from-bottom unfinished-bridge-field))))))

(deftest remove-lower-holes-test
  (testing "should remove-lower-holes 1"
    (is (= [0 7 4 6 3 9 5 8]
           (sut/remove-lower-holes 0 [[0 2] [7 3] [4 2] [6 3] [3 2] [9 5] [5 3] [8 5]]))))
  (testing "should remove-lower-holes 2"
    (is (= [7 6 9 8]
           (sut/remove-lower-holes 1 [[7 3] [6 3] [9 5] [8 5]]))))
  (testing "should remove-lower-holes 3"
    (is (= [9]
           (sut/remove-lower-holes 2 [[0 2] [1 2] [4 2] [3 2] [2 2] [9 5]]))))
  (testing "should remove-lower-holes 4"
    (is (= ()
           (sut/remove-lower-holes 3 [[0 2] [7 3] [1 2] [4 2] [6 3] [3 2] [2 2] [5 3]]))))
  (testing "should remove-lower-holes 5"
    (is (= ()
           (sut/remove-lower-holes 4 [[0 2] [7 3] [1 2] [4 2] [6 3] [3 2] [2 2] [5 3]])))))

#_(deftest find-holes-y-test
    (testing "should return holes for finished placement"
      (is (= [1 0 0 1 1 1 2 2 2 3]
             (find-holes-y
              finished-bridge-field
              (group-coords finished-bridge-field)
              (sut/find-heights-from-bottom finished-bridge-field (group-coords finished-bridge-field))))))
    #_(testing "should return holes for finished placement"
        (is (= [1 0 0 1 1 1 2 2 2 0]
               (find-holes-y
                (group-coords unfinished-bridge-field)
                (sut/find-heights-from-bottom unfinished-bridge-field (group-coords unfinished-bridge-field)))))))

#_(deftest count-holes-test
    (testing "should return holes for finished placement"
      (is (= 13
             (count-holes
              (find-holes-x
               (group-coords finished-bridge-field)
               (sut/find-heights-from-bottom finished-bridge-field (group-coords finished-bridge-field)))))))
    (testing "should return holes for many"
      (is (= [10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 11 11 11 11 10 10 10 13 10 10 10 13 10 10 10 13 10 10 10 13]
             (map
              (fn [{:keys [state]}]
                (count-holes
                 (find-holes-x
                  (group-coords state)
                  (sut/find-heights-from-bottom state (group-coords state)))))
              (moves/find-piece-placements (placement/to-move unfinished-bridge-field)))))))

(deftest height-test
  (testing "should return height of the highest column"
    (is (= 5
           (sut/height (sut/find-heights-from-bottom finished-bridge-field)))))
  (testing "should return height of the highest column"
    (is (= 5
           (sut/height (sut/find-heights-from-bottom finished-bridge-field)))))
  (testing "should return height of the highest column"
    (is (= (concat (repeat 16 4)
                   (repeat 20 5))
           (map
            (fn [{:keys [state]}]
              (sut/height (sut/find-heights-from-bottom state)))
            (moves/find-piece-placements (placement/to-move unfinished-bridge-field)))))))

(deftest field-roughness-test
  (testing "should return roughness"
    (is (= 3
           (sut/field-roughness
            (sut/find-heights-from-bottom finished-bridge-field)))))
  (testing "should return height of the highest column"
    (is (= [6 8 8 6 6 8 8 6 6 8 8 6 6 8 8 6 8 8 8 8 8 8 8 3 8 8 8 3 8 8 8 3 8 8 8 3]
           (map
            (fn [{:keys [state]}]
              (sut/field-roughness (sut/find-heights-from-bottom state)))
            (moves/find-piece-placements (placement/to-move unfinished-bridge-field))))))
  (testing "should return height of the highest column"
    (is (= 18
           (sut/field-roughness [1 1 1 1 1 1 10 1 1 1 1]))))
  (testing "should return height of the highest column"
    (is (= 9
           (sut/field-roughness [1 10]))))
  (testing "should return height of the highest column"
    (is (= 27
           (sut/field-roughness [10 10 10 10 1 10 10 1 1]))))
  (testing "should return height of the highest column"
    (is (= 9
           (sut/field-roughness [10 10 10 10 10 1 1 1 1])))))

(deftest count-hole-depths-test
  (testing "should return depths to each hole"
    (is (= [[19 2] [21 4]]
           (sut/count-hole-depths finished-bridge-field [17 18 20])))))

(deftest count-horizontal-space-test
  (testing "fullness 1"
    (is (= (/ (+ 6 2 4) 30)
           (sut/count-horizontal-space unfinished-bridge-field))))
  (testing "fullness 2"
    (is (= (/ (+ 6 2 4 2 2) 50)
           (sut/count-horizontal-space finished-bridge-field)))))

#_(deftest count-field-hole-depths-test
    (testing "should return depths to each hole"
      (is (= [[21 1] [20 1] [21 2] [21 1] [20 1] [21 2] [21 1] [19 2] [20 3] [21 4] [21 2] [20 3] [21 4]]
             (count-field-hole-depths finished-bridge-field (group-coords finished-bridge-field)))))
    (testing "should ignore non-hole columns"
      (is (= [[21 1] [20 1] [21 2] [21 1] [20 1] [21 2] [21 1] [21 2] [20 1] [21 2]]
             (count-field-hole-depths finished-bridge-field (group-coords unfinished-bridge-field)))))
    (testing "should handle nil"
      (is (= []
             (count-field-hole-depths finished-bridge-field nil)))))

#_(deftest count-reverse-field-hole-depth-sum-test
    (testing "should return depths to each hole"
      (is (= 39
             (count-reverse-field-hole-depth-sum
              finished-bridge-field
              (count-field-hole-depths finished-bridge-field (group-coords finished-bridge-field))))))
    (testing "should return depths to each hole unfinished bridge"
      (is (= 17
             (count-reverse-field-hole-depth-sum
              unfinished-bridge-field
              (count-field-hole-depths unfinished-bridge-field (group-coords unfinished-bridge-field)))))))

#_(deftest count-hole-toxicity-test
    (testing "should return "
      (is (= (+ (* 6 6)
                (* 2 2)
                (* 4 4))
             (count-hole-toxicity
              (sut/find-heights-from-bottom unfinished-bridge-field (group-coords unfinished-bridge-field))
              (group-coords unfinished-bridge-field)))))
    (testing "should return "
      (is (= (+ (* 6 6)
                (* 3 (* 2 2))
                (* 4 4))
             (count-hole-toxicity
              (sut/find-heights-from-bottom finished-bridge-field (group-coords finished-bridge-field))
              (group-coords finished-bridge-field))))))

(deftest count-steps-test
  (testing "should return grouped steps"
    (is (= {0 7
            1 1
            3 1}
           (sut/count-steps (sut/find-heights-from-bottom unfinished-bridge-field)))))
  (testing "should return grouped steps"
    (is (= {0 7
            1 1
            2 1}
           (sut/count-steps (sut/find-heights-from-bottom finished-bridge-field))))))

(deftest count-grouped-step-counts-test
  (testing "should return grouped steps 1"
    (is (= {:more 9}
           (sut/count-grouped-step-counts (sut/count-steps (sut/find-heights-from-bottom unfinished-bridge-field)) :more))))
  (testing "should return grouped steps 2"
    (is (= {:zero 7
            :more 2}
           (sut/count-grouped-step-counts (sut/count-steps (sut/find-heights-from-bottom unfinished-bridge-field)) :more :zero))))
  (testing "should return grouped steps 3"
    (is (= {:zero 7
            :one 1
            :more 1}
           (sut/count-grouped-step-counts (sut/count-steps (sut/find-heights-from-bottom unfinished-bridge-field)) :more :zero :one))))
  (testing "should return grouped steps 4"
    (is (= {:more 9}
           (sut/count-grouped-step-counts (sut/count-steps (sut/find-heights-from-bottom finished-bridge-field)) :more))))
  (testing "should return grouped steps 5"
    (is (= {:zero 7
            :more 2}
           (sut/count-grouped-step-counts (sut/count-steps (sut/find-heights-from-bottom finished-bridge-field)) :more :zero))))
  (testing "should return grouped steps 6"
    (is (= {:zero 7
            :one 1
            :more 1}
           (sut/count-grouped-step-counts (sut/count-steps (sut/find-heights-from-bottom finished-bridge-field)) :more :zero :one))))
  (testing "should return grouped steps; no nil outputs"
    (is (= {:zero 7
            :one 1
            :more 0
            :b 1}
           (sut/count-grouped-step-counts (sut/count-steps (sut/find-heights-from-bottom unfinished-bridge-field)) :more :zero :one :a :b :c :d :e :f)))))

(deftest count-hole-setback-test
  (testing "should return grouped steps 1"
    (is (= 10
           (sut/count-hole-setback unfinished-bridge-field (sut/find-hole-coords unfinished-bridge-field)))))
  (testing "should return grouped steps 4"
    (is (= 13
           (sut/count-hole-setback finished-bridge-field (sut/find-hole-coords finished-bridge-field)))))
  (testing "should return grouped steps 4"
    (is (= 67
           (sut/count-hole-setback three-times-four-hole-field
                                   (sut/find-hole-coords three-times-four-hole-field))))))

(deftest count-pixels-test
  (testing "should count pixels"
    (is (= 12
           (sut/count-pixels unfinished-bridge-field))))
  (testing "should count pixels 2"
    (is (= 16
           (sut/count-pixels finished-bridge-field)))))

(deftest find-clearable-line-count-test
  (testing "should count 1px clearable lines"
    (is (= 0
           (sut/find-clearable-line-count
            unfinished-bridge-field
            (sut/height (sut/find-heights-from-bottom unfinished-bridge-field))
            (reduce min const/field-height (sut/find-heights-from-bottom unfinished-bridge-field))))))
  (testing "should count 1px clearable lines; no results"
    (is (= 0
           (sut/find-clearable-line-count
            finished-bridge-field
            (sut/height (sut/find-heights-from-bottom finished-bridge-field))
            (reduce min const/field-height (sut/find-heights-from-bottom finished-bridge-field))))))
  (testing "should count 1px clearable lines; no results"
    (is (= 1
           (sut/find-clearable-line-count
            one-clearable-line-field
            (sut/height (sut/find-heights-from-bottom one-clearable-line-field))
            (reduce min const/field-height (sut/find-heights-from-bottom one-clearable-line-field)))))))
