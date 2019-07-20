(ns core.ai.placement-spec
  (:require [core.ai.placement :refer :all]
            [speclj.core :refer :all]
            [core.ai.util :as util]))

(describe
 "pick-best-piece-placement"
 (it "should take first when undecidable"
     (should=
      [:left :left :left :left :bottom]
      (:path (pick-best-piece-placement
              {}
              (merge
               util/empty-field
               util/square-piece))))))

(describe
 "apply-pieces"
 (it "should list possible moves"
     (should=
      {:width 10,
       :field
       #{{:coord [3 21], :color "cyan"} {:coord [3 19], :color "cyan"}
         {:coord [1 20], :color "cyan"} {:coord [1 21], :color "cyan"}
         {:coord [5 19], :color "cyan"} {:coord [6 19], :color "cyan"}
         {:coord [2 20], :color "cyan"} {:coord [0 21], :color "cyan"}
         {:coord [2 21], :color "cyan"} {:coord [3 20], :color "cyan"}
         {:coord [0 20], :color "cyan"} {:coord [4 19], :color "cyan"}},
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
        (take 2 (repeat util/line-piece)))))))
