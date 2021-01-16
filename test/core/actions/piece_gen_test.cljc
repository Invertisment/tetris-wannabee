(ns core.actions.piece-gen-test
  (:require [clojure.test :refer :all]
            [core.actions.piece-gen :as gen]))

(def line-piece
  {:piece :line-piece :bounds :line-bounds})

(def l-piece
  {:piece :l-piece :bounds :l-bounds})

(deftest coords-op-test
  (testing "should apply fn to coord"
    (is (= line-piece
           (gen/generate-new-piece
            [line-piece]))))
  (testing "should return nil on no pieces"
    (is (= nil
           (gen/generate-new-piece
            [])))))


