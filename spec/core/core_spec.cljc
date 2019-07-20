(ns core.core-spec
  (:require [speclj.core :refer :all]
            [core.core :as core]))

(describe
 "change-listener"
 (it "should call next-field-state"
     (should=
      "valid state"
      (core/change-listener
       (fn [_ _ _ _ _] "valid state")
       (atom nil)
       (fn [_] true)
       identity
       identity
       "player action"))))

(run-specs)
