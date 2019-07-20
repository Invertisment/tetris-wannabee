(ns core.ai.moves-spec
  (:require [core.ai.moves :refer :all]
            [speclj.core :refer :all]
            [core.constants :refer [field-width field-height pieces]]
            [core.ai.util :as util]))

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
            (apply util/new-move (repeat 2 (first pieces))))))))

(describe
 "find-piece-placements"
 (it "should list possible moves"
     (should=
      #{[:left :left :left :bottom]
        [:left :left :bottom]
        [:left :bottom]
        [:right :right :right :bottom]
        [:right :right :bottom]
        [:right :bottom]
        [:bottom]}
      (set (map :path (find-piece-placements
                       (util/new-move (first pieces))) ))))
 (it "should place all pieces onto their fields"
     (should=
      [4 4 4 4 4 4 4]
      (map
       (comp count :field :state)
       (find-piece-placements
        (util/new-move (first pieces))))))
 (it "should return left first"
     (should=
      [:left :left :left :bottom]
      (:path (first (find-piece-placements
                     (util/new-move (first pieces))))))))
