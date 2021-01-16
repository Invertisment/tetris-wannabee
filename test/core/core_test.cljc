(ns core.core-test
  (:require [clojure.test :refer :all]
            [core.core :as core]))

(deftest change-listener-test
  (testing "should call next-field-state"
    (is (= "valid state"
           (core/change-listener
            (fn [_ _ _] "valid state")
            (atom nil)
            identity
            "player action")))))
