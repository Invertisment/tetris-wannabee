(ns core.actions.piece-ops-spec
  (:require [speclj.core :refer :all]
            [core.actions.piece-ops :as ops]))

(describe
  "coords-op"
  (it "should apply fn to coord"
      (should=
        [2 6]
        (ops/coords-op inc inc [1 5])))
  (it "should apply fn to coord 2"
      (should=
        [1 5]
        (ops/coords-op dec dec [2 6]))))

(describe
  "coords-op-scalar"
  (it "should apply fns to coord list"
      (should=
        {:piece #{[2 4] [4 7]}
         :piece-bounds {:x-range [2 3] :y-range [1 2]}}
        (ops/coords-op-scalar
          inc
          dec
          {:piece [[1 5] [3 8]]
           :piece-bounds {:x-range [1 2] :y-range [2 3]}}))))

(describe
  "coords-op-scalar-piece"
  (it "should apply fns to coord list"
      (should=
        #{[2 4] [4 7]}
        (ops/coords-op-scalar-piece inc dec [[1 5] [3 8]])))
  (it "should apply fns to coord list 2"
      (should=
        #{[1 7] [2 9]}
        (ops/coords-op-scalar-piece dec inc [[2 6] [3 8]]))))

(describe
  "coords-op-scalar-piece-bounds"
  (it "should apply fns to bounds map"
      (should=
        {:x-range [2 6]
         :y-range [1 3]}
        (ops/coords-op-scalar-piece-bounds inc dec {:x-range [1 5] :y-range [2 4]})))
  (it "should apply fns to bounds map 2"
        (should=
          {:x-range [0 4]
           :y-range [3 5]}
          (ops/coords-op-scalar-piece-bounds dec inc {:x-range [1 5] :y-range [2 4]}))))

