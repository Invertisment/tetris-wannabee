(ns core.ai.moves-test
  (:require [core.ai.moves :as sut]
            [clojure.test :refer :all]
            [core.constants :refer [field-width field-height pieces]]
            [core.ai.util :as util]
            [core.actions.move :as move]
            [core.ai.placement :as placement]
            [core.piece-validators :as v]
            [core.constants :as constants]))

(deftest find-moves-left-test
 (testing "should return three states"
     (is (= #{[:left :left :left] [:left :left] [:left]}
            (set (map :path (sut/find-moves-left
                             (util/new-move (first pieces))))) ))))

(deftest find-moves-right-test
 (testing "should return three states"
     (is (= #{[:right :right :right] [:right :right] [:right]}
            (set (map :path (sut/find-moves-right
                             (util/new-move (first pieces))))) )))
 (testing "should return three states"
     (is (= #{[:right :right :right] [:right :right] [:right]}
            (set (map :path (sut/find-moves-right
                             (apply util/new-move pieces)))) ))))

(deftest drop-test
 (testing "should return state"
     (is (= #{[:bottom]}
            (set (map :path (sut/find-moves-bottom
                             (util/new-move (first pieces))))) )))
 (testing "should return :ended status for single piece"
     (is (= #{:ended}
            (set (map (comp :game-state :state)
                      (sut/find-moves-bottom
                       (util/new-move (first pieces))))) )))
 (testing "should return :started status for multiple pieces"
     (is (= [:started]
            (map (comp :game-state :state)
                 (sut/find-moves-bottom
                  (apply util/new-move (repeat 2 (first pieces))))) )))
 (testing "should return :started status for multiple pieces"
     (is (= [:started]
            (map (comp :game-state :state)
                 (sut/find-moves-bottom
                  (placement/to-move
                   (util/new-field
                    (repeat 10 util/square-piece)
                    [move/bottom
                     move/left move/left move/left move/left move/bottom
                     move/left move/left move/left move/left move/bottom
                     move/left move/left move/left move/left move/bottom
                     move/left move/left move/left move/left move/bottom
                     move/left move/left move/left move/left move/bottom])))) )))
 (testing "should return :started status for multiple pieces"
     (is (= [[:bottom]]
            (map :path
                 (sut/find-moves-bottom
                  (last
                   (sut/find-moves-rotate
                    (placement/to-move
                     (util/new-field
                      [util/line-piece util/l-piece util/square-piece util/line-piece
                       util/l-piece util/j-piece util/line-piece util/z-piece]
                      [move/rotate move/left move/left move/left move/left move/left move/bottom
                       move/left move/left move/left move/rotate move/left move/bottom
                       move/left move/left move/left move/left move/bottom
                       move/rotate move/left move/left move/left move/left move/bottom
                       move/rotate-counter-clockwise move/left move/left move/left move/bottom
                       move/rotate move/left move/left move/left move/left move/bottom
                       move/left move/left move/bottom
                       ])))))) ))))

(deftest rotate-test
 (testing "should return all four states"
     (is (= #{[:rotate :rotate :rotate] [] [:rotate] [:rotate :rotate]}
            (set (map :path (sut/find-moves-rotate
                             (util/new-move (first pieces))))) )))
 (testing "should not return invalid states"
     (is (= #{[]}
            (set (map :path (sut/find-moves-rotate
                             (placement/to-move
                              (util/new-field
                               [util/line-piece util/l-piece util/square-piece util/line-piece
                                util/l-piece util/j-piece util/line-piece util/z-piece]
                               [move/rotate move/left move/left move/left move/left move/left move/bottom
                                move/left move/left move/left move/rotate move/left move/bottom
                                move/left move/left move/left move/left move/bottom
                                move/rotate move/left move/left move/left move/left move/bottom
                                move/rotate-counter-clockwise move/left move/left move/left move/bottom
                                move/rotate move/left move/left move/left move/left move/bottom
                                move/left move/left move/bottom
                                ]))))) ))))

(deftest find-piece-placements-test
 (testing "should list possible moves"
     (is (= #{[:bottom]
              [:left :bottom]
              [:left :left :bottom]
              [:left :left :left :bottom]
              [:right :bottom]
              [:right :right :bottom]
              [:right :right :right :bottom]
              [:rotate :bottom]
              [:rotate :left :bottom]
              [:rotate :left :left :bottom]
              [:rotate :left :left :left :bottom]
              [:rotate :left :left :left :left :bottom]
              [:rotate :left :left :left :left :left :bottom]
              [:rotate :right :bottom]
              [:rotate :right :right :bottom]
              [:rotate :right :right :right :bottom]
              [:rotate :right :right :right :right :bottom]
              [:rotate :rotate :bottom]
              [:rotate :rotate :left :bottom]
              [:rotate :rotate :left :left :bottom]
              [:rotate :rotate :left :left :left :bottom]
              [:rotate :rotate :right :bottom]
              [:rotate :rotate :right :right :bottom]
              [:rotate :rotate :right :right :right :bottom]
              [:rotate :rotate :rotate :bottom]
              [:rotate :rotate :rotate :left :bottom]
              [:rotate :rotate :rotate :left :left :bottom]
              [:rotate :rotate :rotate :left :left :left :bottom]
              [:rotate :rotate :rotate :left :left :left :left :bottom]
              [:rotate :rotate :rotate :right :bottom]
              [:rotate :rotate :rotate :right :right :bottom]
              [:rotate :rotate :rotate :right :right :right :bottom]
              [:rotate :rotate :rotate :right :right :right :right :bottom]
              [:rotate :rotate :rotate :right :right :right :right :right :bottom]}
            (set (map :path (sut/find-piece-placements
                             (util/new-move (first pieces))))) )))
 (testing "should place all pieces onto their fields"
     (is (= 34
            (count
             (sut/find-piece-placements
              (util/new-move (first pieces)))) )))
 (testing "should return left first"
     (is (= [:left :left :left :bottom]
            (:path (first (sut/find-piece-placements
                           (util/new-move (first pieces))))) )))
 (testing "should support :next-piece"
     (is (= [:left :left :left :bottom]
            (:path (first (sut/find-piece-placements
                           (apply
                            util/new-move
                            (repeat 5 (first pieces)))))) )))
 (testing "should support :next-piece"
     (is (= [:left :left :left :left :bottom]
            (:path (first (sut/find-piece-placements
                           (placement/to-move
                            (util/new-field
                             (repeat 10 util/square-piece)
                             [move/bottom
                              move/left move/left move/left move/left move/bottom
                              move/left move/left move/left move/left move/bottom
                              move/left move/left move/left move/left move/bottom
                              move/left move/left move/left move/left move/bottom
                              move/left move/left move/left move/left move/bottom]))))) )))
 (testing "should preserve width at all times"
     (is
      (not-any?
       nil?
       (map
        (comp :width :state)
        (sut/find-piece-placements
         (util/new-move (first pieces))))))))
