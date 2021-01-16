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
                          [])))))))
  (testing "should take first when undecidable line"
    (is (= [:left :left :left :bottom]
           (:path (sut/pick-best-1deep-piece-placement
                   noop-genome
                   (merge
                    util/empty-field
                    util/line-piece))))))
  (testing "should take first when undecidable (new field created by move package)"
    (is (= [:left :left :left :left :bottom]
           (:path (sut/pick-best-1deep-piece-placement
                   noop-genome
                   (move/new-field (take 3 (repeat util/square-piece)))))))))

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

(defn is-game-ended? [state]
  (= :ended (:game-state state)))

(deftest apply-pieces-test
  (testing "should apply moves"
    (is (= {nil 208, "cyan" 12}
           (->> (sut/apply-pieces-while
                 is-game-ended?
                 sut/place-best-look1-piece
                 (genome/ensure-weight-existence {})
                 (assoc
                  (merge
                   util/empty-field
                   util/line-piece)
                  :next-pieces
                  (take 2 (repeat util/line-piece))))
                (:field)
                (reduce concat)
                (frequencies)))))
  (testing "should clear 2 lines with 10 squares as input"
    (is (= {:lines-cleared 2}
           (:score
            (sut/apply-pieces-while
             is-game-ended?
             sut/place-best-look1-piece
             (assoc-in (genome/ensure-weight-existence {})
                       [:risky :weighted-height] -1)
             (move/new-field (take 5 (repeat util/square-piece)))))))))
