(ns core.ai.placement-spec
  (:require [core.ai.placement :refer :all]
            [speclj.core :refer :all]
            [core.ai.util :as util]
            [core.actions.move :as move]))

(describe
 "pick-best-piece-placement"
 (it "should take first when undecidable square"
     (should=
      [:left :left :left :left :bottom]
      (:path (pick-best-piece-placement
              {}
              (merge
               util/empty-field
               util/square-piece)))))
 (it "should take first when undecidable line"
     (should=
      [:left :left :left :bottom]
      (:path (pick-best-piece-placement
              {}
              (merge
               util/empty-field
               util/line-piece)))))
 (it "should take first when undecidable (new field created by move package)"
     (should=
      [:left :left :left :left :bottom]
      (:path (pick-best-piece-placement
              {}
              (move/new-field (take 3 (repeat util/square-piece))))))))

(describe
 "apply-pieces"
 (it "should list possible moves"
     (should=
      {:width 10,
       :field
       #{{:coord [3 21], :color "cyan"} {:coord [3 19], :color "cyan"}
         {:coord [1 20], :color "cyan"} {:coord [1 21], :color "cyan"}
         {:coord [0 19], :color "cyan"} {:coord [2 20], :color "cyan"}
         {:coord [1 19], :color "cyan"} {:coord [0 21], :color "cyan"}
         {:coord [2 21], :color "cyan"} {:coord [2 19], :color "cyan"}
         {:coord [3 20], :color "cyan"} {:coord [0 20], :color "cyan"}},
       :game-state :ended,
       :score {:lines-cleared 0},
       :height 22,
       :color "cyan",
       :next-pieces nil}
      (apply-pieces
       {}
       (assoc
        (merge
         util/empty-field
         util/line-piece)
        :next-pieces
        (take 2 (repeat util/line-piece))))))
 (it "should clear 20 lines with 10 squares as input"
     (should=
      {:lines-cleared 2}
      (:score
       (apply-pieces
        {:weighted-height -1}
        (move/new-field (take 5 (repeat util/square-piece))))))))
