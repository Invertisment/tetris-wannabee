(ns core.ai.placement-test
  (:require [core.ai.placement :as sut]
            [clojure.test :refer :all]
            [core.ai.util :as util]
            [core.ai.genome :as genome]
            [core.ai.moves :as moves]
            [core.ai.placement :as placement]
            [core.actions.move :as move]))

(def clearable-line-in-two-moves-field
  (util/new-field
   [util/line-piece
    util/line-piece
    util/t-piece
    util/line-piece]
   [move/left move/left move/left move/bottom
    move/right move/bottom
    ;;move/rotate-counter-clockwise move/right move/right move/right move/right move/bottom
    ;;move/rotate-counter-clockwise move/right move/right move/right move/right move/right move/bottom
    ]))

(def noop-genome (genome/ensure-weight-existence {}))
(def line-clear-genome (-> (genome/ensure-weight-existence {})
                           (update-in [:safe :rows-cleared] inc)
                           (update-in [:risky :rows-cleared] inc)))

(deftest find-ranked-piece-placements-test
  (testing "should find 34 moves; genome coeffs are zero"
    (is (= {0 34}
           (->> (sut/find-ranked-piece-placements
                 noop-genome
                 clearable-line-in-two-moves-field)
                (map first)
                frequencies)))))

(deftest pick-best-1deep-piece-placement-test
  (testing "should take first when undecidable square"
    (is (= [:left :left :left :left :bottom]
           (time (:path (sut/pick-best-1deep-piece-placement
                         noop-genome
                         (util/new-field
                          [util/square-piece]
                          []))))))))

(deftest pick-best-2deep-piece-placement-test
  (testing "should find that it's possible to clear a line (without :lines-cleared coeff)"
    (is (= [:rotate :rotate :rotate :right :right :right :right :bottom]
           (time (:path (sut/pick-best-2deep-piece-placement
                         (constantly false)
                         line-clear-genome
                         clearable-line-in-two-moves-field))))))
  (testing "should return regular next piece if game is ended"
    (is (= [:left :left :left :bottom]
           (time (:path (sut/pick-best-2deep-piece-placement
                         (constantly true)
                         line-clear-genome
                         clearable-line-in-two-moves-field)))))))
