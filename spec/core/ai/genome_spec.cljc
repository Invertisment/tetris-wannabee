(ns core.ai.genome-spec
  (:require [core.ai.genome :refer :all]
            [speclj.core :refer :all]
            [clojure.set :as set]))

(describe
 "ensure-weight-existence"
 (it "smoke check"
     (should
      (>= 13
          (count
           (set/union
            (into #{} (keys (ensure-weight-existence {})))
            #{:cumulative-height :reverse-field-hole-depth-sum :horizontal-fullness
              :well-depth-one-px-from-wall :roughness :well-depth-at-wall :holes
              :well-depth-at-wall-minus-4 :well-depth-one-px-from-wall-minus-4 :id
              :rows-cleared :flatness :weighted-height})))))
 (it "should add zero coeffs"
     (should=
      {:cumulative-height 0,
       :reverse-field-hole-depth-sum 0,
       :horizontal-fullness 0,
       :well-depth-one-px-from-wall 0,
       :roughness 0,
       :well-depth-at-wall 0,
       :holes 0,
       :well-depth-at-wall-minus-4 0,
       :well-depth-one-px-from-wall-minus-4 0,
       :rows-cleared 0,
       :flatness 0,
       :weighted-height 0}
      (dissoc (ensure-weight-existence {}) :id)))
 (it "should persist vals"
     (should=
      {:id "nani"
       :cumulative-height 0,
       :reverse-field-hole-depth-sum 0,
       :horizontal-fullness 0,
       :well-depth-one-px-from-wall 0,
       :roughness 0,
       :well-depth-at-wall 0,
       :holes 0,
       :well-depth-at-wall-minus-4 "not changed"
       :well-depth-one-px-from-wall-minus-4 0,
       :rows-cleared 0,
       :flatness 0,
       :weighted-height 0}
      (ensure-weight-existence
       {:id "nani"
        :well-depth-at-wall-minus-4 "not changed"}))))
