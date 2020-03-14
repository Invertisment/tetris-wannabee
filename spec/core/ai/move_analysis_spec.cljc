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
 "find-heights-from-bottom"
 (it "find height 1"
     (should=
      [2 2 2 2 2 3 3 3 5 5]
      (find-heights-from-bottom finished-bridge-field)))
 (it "find height 2"
     (should=
      [2 2 2 2 2 3 3 3 3 0]
      (find-heights-from-bottom unfinished-bridge-field))))

(describe
 "find-relative-heights"
 (it "find relative height 1"
     (should=
      [0 0 0 0 0 1 1 1 3 3]
      (find-relative-heights (find-heights-from-bottom finished-bridge-field))))
 (it "find relative height 2"
     (should=
      [2 2 2 2 2 3 3 3 3 0]
      (find-relative-heights (find-heights-from-bottom unfinished-bridge-field)))))

#_(describe
 "find-holes-x"
 (it "should find-holes-x 1"
     (should=
      [1 0 0 1 1 1 2 2 2 3]
      (find-holes-x
       (group-coords finished-bridge-field)
       (find-heights-from-bottom finished-bridge-field))))
 (it "should find-holes-x 2"
     (should=
      [1 0 0 1 1 1 2 2 2 0]
      (find-holes-x
       (group-coords unfinished-bridge-field)
       (find-heights-from-bottom unfinished-bridge-field)))))

(describe
 "remove-lower-holes"
 (it "should remove-lower-holes 1"
     (should=
      [0 7 4 6 3 9 5 8]
      (remove-lower-holes 0 [[0 2] [7 3] [4 2] [6 3] [3 2] [9 5] [5 3] [8 5]])))
 (it "should remove-lower-holes 2"
     (should=
      [7 6 9 8]
      (remove-lower-holes 1 [[7 3] [6 3] [9 5] [8 5]])))
 (it "should remove-lower-holes 3"
     (should=
      [9]
      (remove-lower-holes 2 [[0 2] [1 2] [4 2] [3 2] [2 2] [9 5]])))
 (it "should remove-lower-holes 4"
     (should=
      ()
      (remove-lower-holes 3 [[0 2] [7 3] [1 2] [4 2] [6 3] [3 2] [2 2] [5 3]])))
 (it "should remove-lower-holes 5"
     (should=
      ()
      (remove-lower-holes 4 [[0 2] [7 3] [1 2] [4 2] [6 3] [3 2] [2 2] [5 3]]))))

#_(describe
 "find-holes-y"
 (it "should return holes for finished placement"
     (should=
      [1 0 0 1 1 1 2 2 2 3]
      (find-holes-y
       finished-bridge-field
       (group-coords finished-bridge-field)
       (find-heights-from-bottom finished-bridge-field (group-coords finished-bridge-field)))))
 #_(it "should return holes for finished placement"
       (should=
        [1 0 0 1 1 1 2 2 2 0]
        (find-holes-y
         (group-coords unfinished-bridge-field)
         (find-heights-from-bottom unfinished-bridge-field (group-coords unfinished-bridge-field))))))

#_(describe
 "count-holes"
 (it "should return holes for finished placement"
     (should=
      13
      (count-holes
       (find-holes-x
        (group-coords finished-bridge-field)
        (find-heights-from-bottom finished-bridge-field (group-coords finished-bridge-field))))))
 (it "should return holes for many"
     (should=
      [10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 11 11 11 11 10 10 10 13 10 10 10 13 10 10 10 13 10 10 10 13]
      (map
       (fn [{:keys [state]}]
         (count-holes
          (find-holes-x
           (group-coords state)
           (find-heights-from-bottom state (group-coords state)))))
       (moves/find-piece-placements (placement/to-move unfinished-bridge-field))))))

(describe
 "weighted-height"
 (it "should return height of the highest column"
     (should=
      5
      (weighted-height (find-heights-from-bottom finished-bridge-field))))
 (it "should return height of the highest column"
     (should=
      5
      (weighted-height (find-heights-from-bottom finished-bridge-field))))
 (it "should return height of the highest column"
     (should=
      (concat (repeat 16 4)
              (repeat 20 5))
      (map
       (fn [{:keys [state]}]
         (weighted-height (find-heights-from-bottom state)))
       (moves/find-piece-placements (placement/to-move unfinished-bridge-field))))))

(describe
 "field-roughness"
 (it "should return roughness"
     (should=
      3
      (field-roughness
       (find-heights-from-bottom finished-bridge-field))))
 (it "should return height of the highest column"
     (should=
      [6 8 8 6 6 8 8 6 6 8 8 6 6 8 8 6 8 8 8 8 8 8 8 3 8 8 8 3 8 8 8 3 8 8 8 3]
      (map
       (fn [{:keys [state]}]
         (field-roughness (find-heights-from-bottom state)))
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
 "count-horizontal-fullness"
 (it "fullness 1"
     (should=
      (/ 30 (+ 6 2 4))
      (count-horizontal-fullness unfinished-bridge-field)))
 (it "fullness 2"
     (should=
      (/ 50 (+ 6 2 4 2 2))
      (count-horizontal-fullness finished-bridge-field))))

#_(describe
 "count-field-hole-depths"
 (it "should return depths to each hole"
     (should=
      [[21 1] [20 1] [21 2] [21 1] [20 1] [21 2] [21 1] [19 2] [20 3] [21 4] [21 2] [20 3] [21 4]]
      (count-field-hole-depths finished-bridge-field (group-coords finished-bridge-field))))
 (it "should ignore non-hole columns"
     (should=
      [[21 1] [20 1] [21 2] [21 1] [20 1] [21 2] [21 1] [21 2] [20 1] [21 2]]
      (count-field-hole-depths finished-bridge-field (group-coords unfinished-bridge-field))))
 (it "should handle nil"
     (should=
      []
      (count-field-hole-depths finished-bridge-field nil))))

#_(describe
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

#_(describe
 "count-hole-toxicity"
 (it "should return "
     (should=
      (+ (* 6 6)
         (* 2 2)
         (* 4 4))
      (count-hole-toxicity
       (find-heights-from-bottom unfinished-bridge-field (group-coords unfinished-bridge-field))
       (group-coords unfinished-bridge-field))))
 (it "should return "
     (should=
      (+ (* 6 6)
         (* 3 (* 2 2))
         (* 4 4))
      (count-hole-toxicity
       (find-heights-from-bottom finished-bridge-field (group-coords finished-bridge-field))
       (group-coords finished-bridge-field)))))
