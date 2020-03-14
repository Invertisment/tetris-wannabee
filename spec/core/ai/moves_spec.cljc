(ns core.ai.moves-spec
  (:require [core.ai.moves :refer :all]
            [speclj.core :refer :all]
            [core.constants :refer [field-width field-height pieces]]
            [core.ai.util :as util]
            [core.actions.move :as move]
            [core.ai.placement :as placement]
            [core.piece-validators :as v]
            [core.constants :as constants]))

(describe
 "find-moves-left"
 (it "should return three states"
     (should=
      #{[:left :left :left] [:left :left] [:left]}
      (set (map :path (find-moves-left
                       (util/new-move (first pieces))))))))

(describe
 "find-moves-right"
 (it "should return three states"
     (should=
      #{[:right :right :right] [:right :right] [:right]}
      (set (map :path (find-moves-right
                       (util/new-move (first pieces)))))))
 (it "should return three states"
     (should=
      #{[:right :right :right] [:right :right] [:right]}
      (set (map :path (find-moves-right
                       (apply util/new-move pieces)))))))

(describe
 "drop"
 (it "should return state"
     (should=
      #{[:bottom]}
      (set (map :path (find-moves-bottom
                       (util/new-move (first pieces)))))))
 (it "should return :ended status for single piece"
     (should=
      #{:ended}
      (set (map (comp :game-state :state)
                (find-moves-bottom
                 (util/new-move (first pieces)))))))
 (it "should return :started status for multiple pieces"
     (should=
      [:started]
      (map (comp :game-state :state)
           (find-moves-bottom
            (apply util/new-move (repeat 2 (first pieces)))))))
 (it "should return :started status for multiple pieces"
     (should=
      [:started]
      (map (comp :game-state :state)
           (find-moves-bottom
            (placement/to-move
             (util/new-field
              (repeat 10 util/square-piece)
              [move/bottom
               move/left move/left move/left move/left move/bottom
               move/left move/left move/left move/left move/bottom
               move/left move/left move/left move/left move/bottom
               move/left move/left move/left move/left move/bottom
               move/left move/left move/left move/left move/bottom]))))))
 (it "should return :started status for multiple pieces"
     (should=
      [[:bottom]]
      (map :path
           (find-moves-bottom
            (last
             (find-moves-rotate
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
                 ])))))))))

(describe
 "rotate"
 (it "should return all four states"
     (should=
      #{[:rotate :rotate :rotate] [] [:rotate] [:rotate :rotate]}
      (set (map :path (find-moves-rotate
                       (util/new-move (first pieces)))))))
 (it "should not return invalid states"
     (should=
      #{[]}
      (set (map :path (find-moves-rotate
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
                          ]))))))))

(describe
 "find-piece-placements"
 (it "should list possible moves"
     (should=
      #{[:bottom]
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
      (set (map :path (find-piece-placements
                       (util/new-move (first pieces)))))))
 (it "should place all pieces onto their fields"
     (should=
      34
      (count
       (find-piece-placements
        (util/new-move (first pieces))))))
 (it "should return left first"
     (should=
      [:left :left :left :bottom]
      (:path (first (find-piece-placements
                     (util/new-move (first pieces)))))))
 (it "should support :next-piece"
     (should=
      [:left :left :left :bottom]
      (:path (first (find-piece-placements
                     (apply
                      util/new-move
                      (repeat 5 (first pieces))))))))
 (it "should support :next-piece"
     (should=
      [:left :left :left :left :bottom]
      (:path (first (find-piece-placements
                     (placement/to-move
                      (util/new-field
                       (repeat 10 util/square-piece)
                       [move/bottom
                        move/left move/left move/left move/left move/bottom
                        move/left move/left move/left move/left move/bottom
                        move/left move/left move/left move/left move/bottom
                        move/left move/left move/left move/left move/bottom
                        move/left move/left move/left move/left move/bottom])))))))
 (it "should preserve width at all times"
     (should
      (not-any?
       nil?
       (map
        (comp :width :state)
        (find-piece-placements
         (util/new-move (first pieces))))))))
