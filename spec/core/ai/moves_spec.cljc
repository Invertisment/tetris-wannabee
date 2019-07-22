(ns core.ai.moves-spec
  (:require [core.ai.moves :refer :all]
            [speclj.core :refer :all]
            [core.constants :refer [field-width field-height pieces]]
            [core.ai.util :as util]
            [core.actions.move :as move]
            [core.ai.placement :as placement]
            [core.piece-validators :as v]))

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
             (merge
              (move/new-field (repeat 5 util/square-piece))
              {:field #{{:coord [1 21], :color "gold"} {:coord [0 16], :color "gold"}
                        {:coord [1 18], :color "gold"} {:coord [1 19], :color "gold"}
                        {:coord [5 21], :color "gold"} {:coord [1 16], :color "gold"}
                        {:coord [1 15], :color "gold"} {:coord [0 14], :color "gold"}
                        {:coord [0 17], :color "gold"} {:coord [4 21], :color "gold"}
                        {:coord [0 21], :color "gold"} {:coord [0 19], :color "gold"}
                        {:coord [4 20], :color "gold"} {:coord [0 15], :color "gold"}
                        {:coord [0 20], :color "gold"} {:coord [0 18], :color "gold"}
                        {:coord [1 17], :color "gold"} {:coord [5 20], :color "gold"}
                        {:coord [1 20], :color "gold"} {:coord [1 14], :color "gold"}}})))))))

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
                       (util/new-move (first pieces)))))))
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
                      (merge
                       (move/new-field (repeat 5 util/square-piece))
                       {:field #{{:coord [1 21], :color "gold"} {:coord [0 16], :color "gold"}
                                 {:coord [1 18], :color "gold"} {:coord [1 19], :color "gold"}
                                 {:coord [5 21], :color "gold"} {:coord [1 16], :color "gold"}
                                 {:coord [1 15], :color "gold"} {:coord [0 14], :color "gold"}
                                 {:coord [0 17], :color "gold"} {:coord [4 21], :color "gold"}
                                 {:coord [0 21], :color "gold"} {:coord [0 19], :color "gold"}
                                 {:coord [4 20], :color "gold"} {:coord [0 15], :color "gold"}
                                 {:coord [0 20], :color "gold"} {:coord [0 18], :color "gold"}
                                 {:coord [1 17], :color "gold"} {:coord [5 20], :color "gold"}
                                 {:coord [1 20], :color "gold"} {:coord [1 14], :color "gold"}}}))))))))
