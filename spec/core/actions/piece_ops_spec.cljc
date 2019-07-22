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

(def piece-27
  (ops/coords-op-scalar
   identity
   (fn [coord] (+ coord 25))
   {:piece [{:coord [1 1] :color :le-color}
            {:coord [2 2] :color :le-color}
            {:coord [2 3] :color :le-color}]
    :piece-bounds {:x-range [1 2] :y-range [2 3]}}))

(describe
 "get-piece-height"
 (it "should return piece height"
     (should= 27 (ops/get-piece-height piece-27)))
 (it "should return piece height + random"
     (let [number (rand-int 123123)]
       (should=
        number
        (ops/get-piece-height
         (ops/coords-op-scalar
          identity
          (fn [coord] (+ coord number))
          {:piece [{:coord [1 1] :color :le-color}
                   {:coord [2 2] :color :le-color}
                   {:coord [2 3] :color :le-color}]
           :piece-bounds {:x-range [1 2] :y-range [0 3]}}))))))

(describe
 "set-piece-height"
 (it "should return piece height"
     (should=
      {:piece
       #{{:coord [1 1336], :color :le-color}
         {:coord [2 1337], :color :le-color}
         {:coord [2 1338], :color :le-color}},
       :piece-bounds {:x-range [1 2], :y-range [1337 1338]}}
      (ops/set-piece-height piece-27 1337))))
