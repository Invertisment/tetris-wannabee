(ns core.ai.move-analysis-spec
  (:require [core.ai.move-analysis :refer :all]
            [core.ai.moves :as moves]
            [speclj.core :refer :all]
            [core.constants :refer [field-width field-height pieces]]
            [core.ai.util :as util]))

(describe
 "move-roughness"
 (it "should return roughness"
     (should=
      [nil nil nil nil nil nil nil]
      (map
       field-roughness
       (moves/find-piece-placements
        (util/new-move util/line-piece))))))

(describe
 "move-holes"
 (it "should return holes"
     (should=
      [nil nil nil nil nil nil nil nil]
      (map
       field-holes
       (moves/find-piece-placements
        (util/new-move util/z-piece))))))
