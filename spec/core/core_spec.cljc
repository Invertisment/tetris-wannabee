(ns core.core-spec
  (:require [speclj.core :refer :all]
            [core.core :as core]))

(describe
  "change-listener"
  (it "should call next-field-state"
      (should=
        "valid state"
        (core/change-listener
          (fn [_ _] "valid state")
          (atom nil)
          (fn [_] true)
          (fn [_ _] "unexpected output")
          "player action")))
  (it "should recover on bad state"
      (should=
        "recovery 1"
        (core/change-listener
          (fn [_ _] "unexpected output")
          (atom nil)
          (fn [_] false)
          (fn [_ _] "recovery 1")
          "player action")))
  (it "should recover on bad state"
      (should=
        "recovery 2"
        (core/change-listener
          (fn [_ _] "unexpected output")
          (atom nil)
          (fn [_] false)
          (fn [_ _] "recovery 2")
          "player action"))))

(run-specs)
