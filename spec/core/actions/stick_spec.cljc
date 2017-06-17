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
         :piece-bounds #{}
         :piece-color :color}
        (stick/stick-piece
          (constantly {:piece #{} :bounds #{} :color :color})
          {:piece #{"piece"}
           :field #{"field"}})))
  (it "should produce new piece from factory fn"
      (should=
        {:piece #{"new piece"}
         :field #{"piece" "field"}
         :piece-bounds #{}
         :piece-color :color}
        (stick/stick-piece
          (constantly {:piece #{"new piece"} :bounds #{} :color :color})
          {:piece #{"piece"}
           :field #{"field"}})))
  (it "should set piece bounds using bounds-fn"
      (should=
        {:piece #{}
         :field #{"piece" "field"}
         :piece-bounds "expected piece bounds"
         :piece-color :color}
        (stick/stick-piece
          (constantly {:piece #{} :bounds "expected piece bounds" :color :color})
          {:piece #{"piece"}
           :field #{"field"}})))
  (it "should set piece bounds using bounds-fn"
      (should=
        {:piece #{}
         :field #{"piece" "field"}
         :piece-bounds "expected piece bounds"
         :piece-color "rebeccapurple"}
        (stick/stick-piece
          (constantly {:piece #{} :bounds "expected piece bounds" :color "rebeccapurple"})
          {:piece #{"piece"}
           :field #{"field"}}))))

