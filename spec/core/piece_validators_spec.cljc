(ns core.piece-validators-spec
  (:require [speclj.core :refer :all]
            [core.piece-validators :as v]))

(describe
  "is coordinate?"
  (it "happy path"
      (should (v/coord? 1 1 [0 0])))
  (it "happy path 2"
      (should (v/coord? 2 1 [1 0])))
  (it "out x"
      (should-not (v/coord? 1 1 [1 0])))
  (it "out x 2"
      (should-not (v/coord? 3 1 [5 0])))
  (it "out y"
      (should-not (v/coord? 3 1 [1 1])))
  (it "out y 2"
      (should-not (v/coord? 2 2 [1 2])))
  (it "out x below 0"
      (should-not (v/coord? 2 2 [-1 1])))
  (it "out y below 0"
      (should-not (v/coord? 2 2 [0 -1]))))

(describe
  "overlay?"
  (it "not valid"
      (should-not (v/overlay? #{1} #{2})))
  (it  "happy path"
      (should (v/overlay? #{1} #{1}))))

(describe
  "possible-placement?"
  (it "happy path"
      (should (v/possible-placement? 1 2  #{[0 1]} #{[0 0]})))
  (it "not valid"
      (should-not (v/possible-placement? 1 1 #{[0 0]} #{[0 0]})))
  (it "bad coords"
      (should-not (v/possible-placement? 1 1 #{[0 0]} #{[0 -2]}))))

(describe
  "field-valid?"
  (it "happy path"
      (should (v/field-valid? {:width 1 :height 2  :piece #{[0 1]} :field #{[0 0]}})))
  (it "not valid"
      (should-not (v/field-valid? {:width 1 :height 1 :piece #{[0 0]} :field #{[0 0]}})))
  (it "bad coords"
      (should-not (v/field-valid? {:width 1 :height 1 :piece #{[0 0]} :field #{[0 -2]}})))
  (it "nil is not valid :width"
      (should-not (v/field-valid? {:width nil :height 1 :piece #{[0 0]} :field #{[0 -2]}})))
  (it "nil is not valid :height"
      (should-not (v/field-valid? {:width 1 :height nil :piece #{[0 0]} :field #{[0 -2]}})))
  (it "nil is not valid :piece"
      (should-not (v/field-valid? {:width 1 :height 1 :piece nil :field #{[0 -2]}})))
  (it "nil is not valid :field"
      (should-not (v/field-valid? {:width 1 :height 1 :piece #{[0 0]} :field nil}))))

