(ns core.actions.stick-spec
  (:require [speclj.core :refer :all]
            [core.actions.stick :as stick]
            [core.constants :as const]))

(describe
  "merge-piece-to-field"
  (it "should concat :piece with :field"
      (should=
        {:piece #{}
         :field #{"piece" "field"}}
        (stick/stick-piece
          (constantly #{})
          {:piece #{"piece"}
           :field #{"field"}})))
  (it "should produce new piece from factory fn"
      (should=
        {:piece #{"new piece"}
         :field #{"piece" "field"}}
        (stick/stick-piece
          (constantly #{"new piece"})
          {:piece #{"piece"}
           :field #{"field"}}))))

