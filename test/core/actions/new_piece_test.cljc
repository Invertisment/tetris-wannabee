(ns core.actions.new-piece-test
  (:require [clojure.test :refer :all]
            [core.actions.new-piece :as sut]))

(deftest coords-op-test
  (testing "should advance :next-piece"
    (is (= {::some-state ::le-state
            :next-pieces [{:piece ::piece
                           :piece-bounds ::bounds}]}
           (sut/new-piece
            (constantly true)
            {::some-state ::le-state
             :next-pieces [{}
                           {:piece ::piece
                            :piece-bounds ::bounds}]}))))
  (testing "should copy :piece from :next-piece"
    (is (= {::some-state ::le-state
            :prev-piece ::a
            :next-pieces [{:prev-piece ::b}]}
           (sut/new-piece
            (constantly true)
            {::some-state ::le-state
             :next-pieces [{:prev-piece ::a}
                           {:prev-piece ::b}]}))))
  (testing "should end game if impossible to place"
    (is (= {::state ::le-state
            :game-state :ended
            :next-pieces [{:piece ::piece
                           :piece-bounds ::bounds}]}
           (sut/new-piece
            (constantly false)
            {::state ::le-state
             :next-pieces [{:piece ::piece
                            :piece-bounds ::bounds}]})))))
