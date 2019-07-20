(ns core.ai.move-analysis-spec
  (:require [core.ai.move-analysis :refer :all]
            [core.ai.moves :as moves]
            [speclj.core :refer :all]
            [core.constants :refer [field-width field-height pieces]]
            [core.ai.util :as util]))

(describe
 "pick-best-piece-placement"
 (it "should take first when undecidable"
     (should=
      [nil nil nil nil nil nil nil]
      (map
       move-roughness
       (moves/find-piece-placements
        (util/new-move util/line-piece))))))
