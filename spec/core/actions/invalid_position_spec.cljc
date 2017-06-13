(ns core.actions.invalid-position-spec
  (:require [speclj.core :refer :all]
            [core.actions.invalid-position :as move]
            [core.constants :as const]))

(describe
  "merge-piece-to-field"
  (it "should concat :piece with :field"
      (should=
        {:piece #{}
         :field #{"piece" "field"}}
        (move/merge-piece-to-field
          (constantly #{})
          {:piece #{"piece"}
           :field #{"field"}})))
  (it "should produce new piece from factory fn"
      (should=
        {:piece #{"new piece"}
         :field #{"piece" "field"}}
        (move/merge-piece-to-field
          (constantly #{"new piece"})
          {:piece #{"piece"}
           :field #{"field"}}))))

(describe
  "handle-invalid-position"
  (it "should use on-down-fn on down action"
      (should=
        "on-down-fn output"
        (move/handle-invalid-position
          (constantly "on-down-fn output")
          const/down
          {:piece #{"piece"}
           :field #{"field"}})))
  (it "should use on-down-fn on down action 2"
      (should=
        "on-down-fn output 2"
        (move/handle-invalid-position
          (constantly "on-down-fn output 2")
          const/down
          {:piece #{"piece"}
           :field #{"field"}})))
  (it "should return nil on non down action"
      (should-not
        (move/handle-invalid-position
          nil
          const/left
          {:piece #{"piece"}
           :field #{"field"}}))))

(with-redefs-fn
  {#'core.actions.invalid-position/merge-piece-to-field
   (fn [b a] "merging the state")}
  #(describe
    "recover-bad-placement"
    (it "should use handle-invalid-position [true]"
        (should=
          "merging the state"
          (move/recover-bad-placement
            nil
            const/down
            {:piece #{"piece"}
             :field #{"field"}})))
    (it "should use handle-invalid-position [false]"
        (should=
          nil
          (move/recover-bad-placement
            nil
            const/rotate
            {:piece #{"piece"}
             :field #{"field"}})))))

