(ns core.actions.stick-spec
  (:require [speclj.core :refer :all]
            [core.actions.stick :as stick]
            [core.constants :as const]))

(describe
  "merge-piece-to-field"
  (it "should concat :piece with :field 1"
      (should=
       {:field
        [[nil nil nil nil nil nil nil nil "a" nil]]}
       (stick/stick-piece
        identity
        {:piece
         #{{:coord [8 0] :color "a"}}
         :piece-bounds [:something]
         :field
         [[nil nil nil nil nil nil nil nil nil nil]]})))
  (it "should concat :piece with :field 2"
      (should=
       {:field
        [[nil nil nil "a" nil nil nil nil nil nil]
         [nil nil nil "a" "a" "a" nil nil nil nil]
         [nil nil nil nil nil nil nil nil nil nil]
         [nil nil nil nil nil nil nil nil nil nil]]}
       (stick/stick-piece
        identity
        {:piece
         #{{:coord [4 1] :color "a"} {:coord [3 0] :color "a"}
           {:coord [5 1] :color "a"} {:coord [3 1] :color "a"}},
         :piece-bounds [:something]
         :field
         [[nil nil nil nil nil nil nil nil nil nil]
          [nil nil nil nil nil nil nil nil nil nil]
          [nil nil nil nil nil nil nil nil nil nil]
          [nil nil nil nil nil nil nil nil nil nil]]})))
  (it "should add second piece to the field"
      (should=
       {:field
        [[nil nil nil "b" nil nil nil nil nil nil]
         [nil nil nil "b" "b" "b" nil nil nil nil]
         [nil nil nil "a" nil nil nil nil nil nil]
         [nil nil nil "a" "a" "a" nil nil nil nil]]}
       (stick/stick-piece
        identity
        {:piece
         #{{:coord [4 1] :color "b"} {:coord [3 0] :color "b"}
           {:coord [5 1] :color "b"} {:coord [3 1] :color "b"}},
         :piece-bounds [:something]
         :field
         [[nil nil nil nil nil nil nil nil nil nil]
          [nil nil nil nil nil nil nil nil nil nil]
          [nil nil nil "a" nil nil nil nil nil nil]
          [nil nil nil "a" "a" "a" nil nil nil nil]]})))
  (it "should override anything it touches"
      (should=
       {:field
        [[nil nil nil "b" nil nil nil nil nil nil]
         [nil nil nil "b" "b" "b" nil nil nil nil]
         [nil nil nil "a" "a" "a" nil nil nil nil]]}
       (stick/stick-piece
        identity
        {:piece
         #{{:coord [4 1] :color "b"} {:coord [3 0] :color "b"}
           {:coord [5 1] :color "b"} {:coord [3 1] :color "b"}},
         :piece-bounds [:something]
         :field
         [[nil nil nil nil nil nil nil nil nil nil]
          [nil nil nil "a" nil nil nil nil nil nil]
          [nil nil nil "a" "a" "a" nil nil nil nil]]})))
  (it "should call clear lines fn 1"
      (should=
       :something
       (stick/stick-piece
        (fn [state] :something)
        {:piece #{}
         :piece-bounds [:something]
         :field
         [[nil nil nil nil nil nil nil nil nil nil]
          [nil nil nil "a" nil nil nil nil nil nil]
          [nil nil nil "a" "a" "a" nil nil nil nil]]}))))
