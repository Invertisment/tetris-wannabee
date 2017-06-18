(ns core.actions.rotate-spec
  (:require [speclj.core :refer :all]
            [core.actions.rotate :as stick]
            [core.constants :as const]))

(describe
  "flip-piece-horizontally"
  (it "should nop with line piece"
      (should=
        (const/apply-color const/line-piece)
        (stick/flip-piece-horizontally
          (const/apply-color const/line-piece))))
  (it "should turn j into l"
      (should=
        (const/apply-color (assoc const/l-piece :piece #{[3 0] [3 1] [4 1] [5 1]}))
        (stick/flip-piece-horizontally
          (const/apply-color const/l-piece))))
  (it "should turn z into reverse z"
      (should=
        (const/apply-color (assoc const/z-piece :piece #{[4 0] [5 0] [3 1] [4 1]}))
        (stick/flip-piece-horizontally
          (const/apply-color const/z-piece)))))

#_(describe
  "flip-piece-vertically"
  (it "should flip with line piece"
      (should=
        (const/apply-color (assoc const/line-piece :piece #{[3 2] [4 2] [5 2] [6 2]}))
        (stick/flip-piece-vertically
          (const/apply-color const/line-piece))))
  (it "should flip t piece"
      (should=
        (const/apply-color (assoc const/t-piece :piece #{[4 2] [3 1] [4 1] [5 1]}))
        (stick/flip-piece-vertically
          (const/apply-color const/t-piece)))))

(describe
  "flip-piece-diagonally"
  (it "should nop with diagonal block"
      (should=
        (const/apply-color {:piece #{[4 0]} :piece-bounds const/bounds-2x2})
        (stick/flip-piece-diagonally
          (const/apply-color {:piece #{[4 0]} :piece-bounds const/bounds-2x2}))))
  (it "should transpose non diagonal block"
      (should=
        (const/apply-color {:piece #{[5 0]} :piece-bounds const/bounds-2x2})
        (stick/flip-piece-diagonally
          (const/apply-color {:piece #{[4 1]} :piece-bounds const/bounds-2x2}))))
  (it "should turn initial l into last rotation of j"
      (should=
        (const/apply-color (assoc const/l-piece :piece #{[4 0] [4 1] [4 2] [3 2]}))
        (stick/flip-piece-diagonally
          (const/apply-color const/l-piece))))
  (it "should turn z into last rotation of reverse z"
      (should=
        (const/apply-color (assoc const/z-piece :piece #{[3 0] [3 1] [4 1] [4 2]}))
        (stick/flip-piece-diagonally
          (const/apply-color const/z-piece))))
  (it "should turn z into last rotation of reverse z"
      (should=
        (const/apply-color (assoc const/z-piece
                                  :piece #{[3 2] [3 3] [4 3] [4 4]}
                                  :piece-bounds {:x-range [3 6]
                                           :y-range [2 4]}))
        (stick/flip-piece-diagonally
          (const/apply-color (assoc const/z-piece :piece #{[3 2] [4 2] [4 3] [5 3]}
                                    :piece-bounds {:x-range [3 6]
                                             :y-range [2 4]})))))
  (it "should turn z into last rotation of reverse z moved"
      (should=
        (const/apply-color (assoc const/z-piece
                                  :piece #{[3 3] [3 4] [4 4] [4 5]}
                                  :piece-bounds {:x-range [3 6]
                                           :y-range [3 5]}))
        (stick/flip-piece-diagonally
          (const/apply-color (assoc const/z-piece :piece #{[3 3] [4 3] [4 4] [5 4]}
                                    :piece-bounds {:x-range [3 6]
                                             :y-range [3 5]}))))))

(describe
  "rotate-piece-clockwise"
  (it "should rotate z into its second phase"
      (should=
        (const/apply-color (assoc const/z-piece :piece #{[5 0] [5 1] [4 1] [4 2]}))
        (stick/rotate-piece-clockwise
          (const/apply-color const/z-piece))))
  (it "should rotate line piece"
      (should=
        (const/apply-color (assoc const/line-piece :piece #{[5 0] [5 1] [5 2] [5 3]}))
        (stick/rotate-piece-clockwise
          (const/apply-color const/line-piece)))))

(describe
  "rotate-piece-counter-clockwise"
  (it "should rotate line piece back"
      (should=
        (const/apply-color (assoc const/line-piece :piece #{[4 0] [4 1] [4 2] [4 3]}))
        (stick/rotate-piece-counter-clockwise
          (const/apply-color const/line-piece))))
  (it "should rotate z into its last phase"
      (should=
        (const/apply-color (assoc const/z-piece :piece #{[4 0] [4 1] [3 1] [3 2]}))
        (stick/rotate-piece-counter-clockwise
          (const/apply-color const/z-piece)))))

