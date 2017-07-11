(ns core.actions.move-spec
  (:require [speclj.core :refer :all]
            [core.actions.move :as move]
            [core.constants :as const]))

(describe
  "determine-direction"
  (it "should have left"
      (should= #'core.actions.move/left (move/direction const/left)))
  (it "should have right"
      (should= #'core.actions.move/right (move/direction const/right)))
  (it "should have rotate"
      (should= #'core.actions.move/rotate (move/direction const/rotate)))
  (it "should have down"
      (should= #'core.actions.move/down (move/direction const/down)))
  (it "should have bottom"
      (should= #'core.actions.move/bottom (move/direction const/bottom)))
  (it "should have default case"
      (should= #'core.actions.move/nop (move/direction "anything else"))))

(describe
  "bottom"
  (it "should not do infinite loop on no :piece"
      (should= nil (move/bottom (constantly true) {}))))
