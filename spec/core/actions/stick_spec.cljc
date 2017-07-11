(ns core.actions.stick-spec
  (:require [speclj.core :refer :all]
            [core.actions.stick :as stick]
            [core.constants :as const]))

(describe
  "merge-piece-to-field"
  (it "should concat :piece with :field"
      (should=
        {:field #{::piece1 ::field1}}
        (stick/stick-piece
          identity
          {:piece #{::piece1}
           :field #{::field1}})))
  (it "should produce new piece from factory fn"
      (should=
        {:field #{::piece2 ::field2}}
        (stick/stick-piece
          identity
          {:piece #{::piece2}
           :field #{::field2}}))))

