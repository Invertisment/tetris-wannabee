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
              (util/new-field
               [util/square-piece]
               [])))))
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
 (it "should apply moves"
     (should=
      {nil 208, "cyan" 12}
      (->> (apply-pieces
            {}
            (assoc
             (merge
              util/empty-field
              util/line-piece)
             :next-pieces
             (take 2 (repeat util/line-piece))))
           (:field)
           (reduce concat)
           (frequencies))))
 (it "should clear 2 lines with 10 squares as input"
     (should=
      {:lines-cleared 2}
      (:score
       (apply-pieces
        {:weighted-height -1}
        (move/new-field (take 5 (repeat util/square-piece))))))))
