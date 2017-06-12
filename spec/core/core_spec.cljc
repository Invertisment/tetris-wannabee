(ns core.core-spec
  (:require [speclj.core :refer :all]
            [core.core :as core]))

(with-redefs-fn
  {#'core.actions.move/next-field-state
   (fn [state-atom char-code] "valid state")}
  #(do
     (describe
       "valid state"
       (it "should call next-field-state"
           (should= "valid state" (core/change-listener
                                    nil
                                    (fn [a] true)
                                    "some code"))))))

(with-redefs-fn
  {#'core.actions.move/next-field-state
   (fn [state-atom char-code] "invalid state")}
  #(do
     (describe
       "invalid state"
       (it "should return nil"
           (should-not (core/change-listener
                         nil
                         (fn [a] false)
                         "some code"))))))

(run-specs)
