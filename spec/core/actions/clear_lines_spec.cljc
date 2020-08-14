(ns core.actions.clear-lines-spec
  (:require [speclj.core :refer :all]
            [core.actions.clear-lines :as cl]
            [core.constants :as const]))

(describe
 "non-full-line?"
 (it "find full line 1"
     (should
      (cl/non-full-line?
       [nil nil nil nil nil])))
 (it "find full line 2"
     (should
      (cl/non-full-line?
       [1 1 1 1 1 nil])))
 (it "find full line 3"
     (should-not
      (cl/non-full-line?
       [1 1 1 1 1]))))

(describe
 "remove-full-lines"
 (it "empty field"
     (should=
      {:field [[nil nil nil nil nil]
               [nil nil nil nil nil]
               [nil nil nil nil nil]],
       :height 3
       :line-clear-data {:count 0}}
      (cl/remove-full-lines
       {:field
        [[nil nil nil nil nil]
         [nil nil nil nil nil]
         [nil nil nil nil nil]]
        :height 3})))
 (it "increase height of smaller field"
     (should=
      {:field
       [[nil nil nil nil nil nil nil nil nil nil]
        [nil nil nil nil nil nil nil nil nil nil]
        [nil nil nil nil nil nil nil nil nil nil]
        [nil nil nil nil nil]]
       :height 4
       :line-clear-data {:count 3}}
      (cl/remove-full-lines
       {:field
        [[nil nil nil nil nil]]
        :height 4})))
 (it "remove full lines"
     (should=
      {:field
       [[nil nil nil nil nil nil nil nil nil nil]
        [nil nil nil nil nil nil nil nil nil nil]
        [nil nil nil nil nil nil nil nil nil nil]
        [nil nil "b" nil nil]
        [nil nil "c" nil nil]
        [nil nil "d" nil nil]
        [nil nil "e" nil nil]]
       :height 7
       :line-clear-data {:count 3}}
      (cl/remove-full-lines
       {:field
        [[nil nil "b" nil nil]
         [nil nil "c" nil nil]
         ["a" "a" "a" "a" "a"]
         [nil nil "d" nil nil]
         ["a" "a" "a" "a" "a"]
         [nil nil "e" nil nil]]
        :height 7}))))
