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
      {:x
       {0 [[0 20]],
        7 [[7 19]],
        1 [[1 20] [1 21]],
        4 [[4 20]],
        6 [[6 19]],
        3 [[3 20]],
        2 [[2 20] [2 21]],
        9 [[9 17] [9 18]],
        5 [[5 19] [5 20]],
        8 [[8 17] [8 18] [8 19]]},
       :y
       {20 [[0 20] [1 20] [2 20] [3 20] [4 20] [5 20]],
        21 [[1 21] [2 21]],
        19 [[5 19] [6 19] [7 19] [8 19]],
        17 [[8 17] [9 17]],
        18 [[8 18] [9 18]]}}
      (group-coords finished-bridge-field))))

(describe
 "count-holes"
 (it "should return holes for finished placement"
     (should=
      13
      (count-holes finished-bridge-field (group-coords finished-bridge-field))))
 (it "should return holes for many"
     (should=
      [10 10 10 10 11 10 10 10 13]
      (map
       (fn [{:keys [state]}]
         (count-holes state (group-coords state)))
       (moves/find-piece-placements (placement/to-move unfinished-bridge-field))))))

(describe
 "weighted-height"
 (it "should return height of the highest column"
     (should=
      36
      (weighted-height (find-heights-from-bottom finished-bridge-field (group-coords finished-bridge-field)))))
 (it "should return height of the highest column"
     (should=
      [25 25 25 25 36 36 36 36 36]
      (map
       (fn [{:keys [state]}]
         (weighted-height (find-heights-from-bottom state (group-coords state))))
       (moves/find-piece-placements (placement/to-move unfinished-bridge-field))))))

(describe
 "field-roughness"
 (it "should return roughness"
     (should=
      2
      (field-roughness
       (find-heights-from-bottom finished-bridge-field (group-coords finished-bridge-field)))))
 (it "should return height of the highest column"
     (should=
      [1 1 1 1 2 2 4 2 2]
      (map
       (fn [{:keys [state]}]
         (field-roughness (find-heights-from-bottom state (group-coords state))))
       (moves/find-piece-placements (placement/to-move unfinished-bridge-field))))))
