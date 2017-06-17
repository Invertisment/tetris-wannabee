(ns core.actions.piece-ops-spec
  (:require [speclj.core :refer :all]
            [core.actions.piece-ops :as ops]))

(describe
  "coords-op"
  (it "should apply fn to coord"
      (should=
        {:coord [2 6] :color :le-color}
        (ops/coords-op inc inc {:coord [1 5] :color :le-color})))
  (it "should apply fn to coord 2"
      (should=
        {:coord [1 5] :color :le-color}
        (ops/coords-op dec dec {:coord [2 6] :color :le-color}))))

(describe
  "coords-op-scalar"
  (it "should apply fns to coord list"
      (should=
        {:piece #{{:coord [2 4] :color :le-color}
                  {:coord [4 7] :color :le-color}}
         :piece-bounds {:x-range [2 3] :y-range [1 2]}}
        (ops/coords-op-scalar
          inc
          dec
          {:piece [{:coord [1 5] :color :le-color}
                   {:coord [3 8] :color :le-color}]
           :piece-bounds {:x-range [1 2] :y-range [2 3]}}))))

(describe
  "coords-op-scalar-piece"
  (it "should apply fns to coord list"
      (should=
        #{{:coord [2 4] :color :le-color}
          {:coord [4 7] :color :le-color}}
        (ops/coords-op-scalar-piece inc dec [{:coord [1 5] :color :le-color}
                                             {:coord [3 8] :color :le-color}])))
  (it "should apply fns to coord list 2"
      (should=
        #{{:coord [1 7] :color :le-color}
          {:coord [2 9] :color :le-color}}
        (ops/coords-op-scalar-piece dec inc [{:coord [2 6] :color :le-color}
                                             {:coord [3 8] :color :le-color}]))))

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

