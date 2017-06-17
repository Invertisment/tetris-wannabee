(ns core.actions.stick-spec
  (:require [speclj.core :refer :all]
            [core.actions.stick :as stick]
            [core.constants :as const]))

(describe
  "merge-piece-to-field"
  (it "should concat :piece with :field"
      (should=
        {:piece #{}
         :field #{"piece" "field"}
         :piece-bounds "piece bounds"}
        (stick/stick-piece
          (constantly #{})
          (constantly "piece bounds")
          {:piece #{"piece"}
           :field #{"field"}})))
  (it "should produce new piece from factory fn"
      (should=
        {:piece #{"new piece"}
         :field #{"piece" "field"}
         :piece-bounds "piece bounds"}
        (stick/stick-piece
          (constantly #{"new piece"})
          (constantly "piece bounds")
          {:piece #{"piece"}
           :field #{"field"}})))
  (it "should set piece bounds using bounds-fn"
      (should=
        {:piece #{}
         :field #{"piece" "field"}
         :piece-bounds "expected piece bounds"}
        (stick/stick-piece
          (constantly #{})
          (constantly "expected piece bounds")
          {:piece #{"piece"}
           :field #{"field"}}))))

