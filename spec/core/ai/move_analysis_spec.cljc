(ns core.ai.move-analysis-spec
  (:require [core.ai.move-analysis :refer :all]
            [core.ai.moves :as moves]
            [speclj.core :refer :all]
            [core.constants :refer [field-width field-height pieces]]
            [core.ai.util :as util]
            [core.actions.move :as move]
            [core.ai.placement :as placement]))

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

(describe
 "group-coords"
 (it "should return grouped coords"
     (should=
      {:by-x
       {0 [[0 20]],
        7 [[7 19]],
        1 [[1 20] [1 21]],
        4 [[4 20]],
        6 [[6 19]],
        3 [[3 20]],
        2 [[2 20] [2 21]],
        9 [[9 17] [9 18]],
        5 [[5 19] [5 20]],
        8 [[8 17] [8 18] [8 19]]}}
      (group-coords finished-bridge-field)))
 (it "should return grouped coords"
     (should=
      {:by-x
       {0 [[0 20]],
        7 [[7 19]],
        1 [[1 20] [1 21]],
        4 [[4 20]],
        6 [[6 19]],
        3 [[3 20]],
        2 [[2 20] [2 21]],
        5 [[5 19] [5 20]],
        8 [[8 19]]
        9 nil}}
      (group-coords unfinished-bridge-field))))

(describe
 "count-holes"
 (it "should return holes for finished placement"
     (should=
      13
      (count-holes finished-bridge-field (group-coords finished-bridge-field))))
 (it "should return holes for many"
     (should=
      [10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 11 11 11 11 10 10 10 13 10 10 10 13 10 10 10 13 10 10 10 13]
      (map
       (fn [{:keys [state]}]
         (count-holes state (group-coords state)))
       (moves/find-piece-placements (placement/to-move unfinished-bridge-field))))))

(describe
 "weighted-height"
 (it "should return height of the highest column"
     (should=
      25
      (weighted-height (find-heights-from-bottom finished-bridge-field (group-coords finished-bridge-field)))))
 (it "should return height of the highest column"
     (should=
      9
      (weighted-height (find-heights-from-bottom finished-bridge-field (group-coords unfinished-bridge-field)))))
 (it "should return height of the highest column"
     (should=
      (concat (repeat 16 16)
              (repeat 20 25))
      (map
       (fn [{:keys [state]}]
         (weighted-height (find-heights-from-bottom state (group-coords state))))
       (moves/find-piece-placements (placement/to-move unfinished-bridge-field))))))

(describe
 "field-roughness"
 (it "should return roughness"
     (should=
      3
      (field-roughness
       (find-heights-from-bottom finished-bridge-field (group-coords finished-bridge-field)))))
 (it "should return height of the highest column"
     (should=
      [7 7 7 5 7 7 7 5 7 7 7 5 7 7 7 5 7 7 7 7 7 7 5 3 7 7 5 3 7 7 5 3 7 7 5 3]
      (map
       (fn [{:keys [state]}]
         (field-roughness (find-heights-from-bottom state (group-coords state))))
       (moves/find-piece-placements (placement/to-move unfinished-bridge-field)))))
 (it "should return height of the highest column"
     (should=
      18
      (field-roughness [1 1 1 1 1 1 10 1 1 1 1])))
 (it "should return height of the highest column"
     (should=
      9
      (field-roughness [1 10])))
 (it "should return height of the highest column"
     (should=
      27
      (field-roughness [10 10 10 10 1 10 10 1 1])))
 (it "should return height of the highest column"
     (should=
      9
      (field-roughness [10 10 10 10 10 1 1 1 1]))))

(describe
 "count-hole-depths"
 (it "should return depths to each hole"
     (should=
      [[19 2] [21 4]]
      (count-hole-depths finished-bridge-field [17 18 20]))))

(describe
 "count-field-hole-depths"
 (it "should return depths to each hole"
     (should=
      [[21 1] [20 1] [21 2] [21 1] [20 1] [21 2] [21 1] [19 2] [20 3] [21 4] [21 2] [20 3] [21 4]]
      (count-field-hole-depths finished-bridge-field (group-coords finished-bridge-field))))
 (it "should handle nil"
     (should=
      []
      (count-field-hole-depths finished-bridge-field nil)))
 (it "should ignore non-hole columns"
     (should=
      []
      (count-field-hole-depths finished-bridge-field [15 16 17 18 19 20]))))

(describe
 "count-reverse-field-hole-depth-sum"
 (it "should return depths to each hole"
     (should=
      39
      (count-reverse-field-hole-depth-sum
       finished-bridge-field
       (count-field-hole-depths finished-bridge-field (group-coords finished-bridge-field)))))
 (it "should return depths to each hole unfinished bridge"
     (should=
      17
      (count-reverse-field-hole-depth-sum
       unfinished-bridge-field
       (count-field-hole-depths unfinished-bridge-field (group-coords unfinished-bridge-field))))))

(describe
 "count-reverse-field-hole-depth-sum"
 (it "should return depths to each hole"
     (should=
      10
      (count-hole-depth-of-first-three-lines
       finished-bridge-field
       (count-field-hole-depths finished-bridge-field (group-coords finished-bridge-field)))))
 (it "should return depths to each hole unfinished bridge"
     (should=
      14
      (count-hole-depth-of-first-three-lines
       unfinished-bridge-field
       (count-field-hole-depths unfinished-bridge-field (group-coords unfinished-bridge-field))))))
