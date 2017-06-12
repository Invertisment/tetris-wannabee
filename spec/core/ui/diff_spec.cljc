(ns core.ui.diff-spec
  (:require [speclj.core :refer :all]
            [core.ui.diff :refer :all]))

(describe
  "block visibility diff"
  (it "should determine values to add"
      (should= {:add #{1 2 3}
                :rem #{}} (block-diff [#{} #{1 2 3}])))
  (it "should determine values to remove"
      (should= {:add #{}
                :rem #{1 2}} (block-diff [#{1 2} #{}])))
  (it "should determine values that don't need to be touched"
      (should= {:add #{3}
                :rem #{1}} (block-diff [#{1 2} #{2 3}]))))

(describe
  "remove blocks"
  (it "should remove blocks from canvas"
      (should= {:add #{1 2 3}
                :rem #{}} (block-diff [#{} #{1 2 3}]))))



