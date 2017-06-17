(ns core.actions.piece-gen-spec
  (:require [speclj.core :refer :all]
            [core.actions.piece-gen :as gen]))

(def line-piece
  {:piece :line-piece :bounds :line-bounds})

(def l-piece
  {:piece :l-piece :bounds :l-bounds})

(describe
  "coords-op"
  (it "should apply fn to coord"
      (should=
      line-piece
        (gen/generate-new-piece
          [line-piece])))
  (it "should return nil on no pieces"
      (should=
        nil
        (gen/generate-new-piece
          []))))


