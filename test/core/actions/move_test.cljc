(ns core.actions.move-test
  (:require [core.actions.move :as move]
            [core.constants :as const]
            [clojure.test :refer :all]
            [core.ai.util :as util]
            [core.piece-validators :as validators]))

(defmacro count-calls [fn-name body]
  `(let [counter# (atom 0)
         ~fn-name (fn [_] (swap! counter# inc))]
     ~body
     @counter#))

(deftest determine-direction-test
  (testing "should have left"
    (is (= #'core.actions.move/left (move/direction const/left) )))
  (testing "should have right"
    (is (= #'core.actions.move/right (move/direction const/right) )))
  (testing "should have rotate"
    (is (= #'core.actions.move/rotate (move/direction const/rotate) )))
  (testing "should have down"
    (is (= #'core.actions.move/down (move/direction const/down) )))
  (testing "should have bottom"
    (is (= #'core.actions.move/bottom (move/direction const/bottom) )))
  (testing "should have default case"
    (is (= #'core.actions.move/nop (move/direction "anything else") ))))

(def sample-field
  (util/new-field
   [util/line-piece
    util/line-piece
    util/z-piece
    util/line-piece
    util/z-piece
    util/z-piece
    util/z-piece
    util/z-piece
    util/z-piece
    util/line-piece
    util/line-piece
    util/line-piece
    util/line-piece
    util/line-piece
    util/line-piece
    util/line-piece
    util/line-piece
    util/line-piece
    util/line-piece]
   []))

(deftest bottom-test
  (testing "should not do infinite loop on no :piece"
    (is (= nil (move/bottom (constantly true) identity {}))))
  (testing "should put piece to bottom of the field"
    (is (= [nil nil nil "cyan" "cyan" "cyan" "cyan" nil nil nil]
           (->> sample-field
                (move/bottom validators/field-valid? identity)
                :field
                last))))
  (testing "should all pieces to bottom of the field"
    (is (= [[nil nil nil nil nil nil nil nil nil nil]
            [nil nil nil "cyan" "cyan" "cyan" "cyan" nil nil nil]
            [nil nil nil "orangered" "orangered" nil nil nil nil nil]
            [nil nil nil nil "orangered" "orangered" nil nil nil nil]
            [nil nil nil "cyan" "cyan" "cyan" "cyan" nil nil nil]
            [nil nil nil "cyan" "cyan" "cyan" "cyan" nil nil nil]]
           (->> sample-field
                (move/bottom validators/field-valid? identity)
                (move/bottom validators/field-valid? identity)
                (move/bottom validators/field-valid? identity)
                (move/bottom validators/field-valid? identity)
                :field
                (take-last 6)))))
  (testing "should drop all pieces"
    (is (= [[nil nil nil nil nil nil nil nil nil nil]
            [nil nil nil "cyan" "cyan" "cyan" "cyan" nil nil nil]
            [nil nil nil "cyan" "cyan" "cyan" "cyan" nil nil nil]
            [nil nil nil "cyan" "cyan" "cyan" "cyan" nil nil nil]
            [nil nil nil "cyan" "cyan" "cyan" "cyan" nil nil nil]
            [nil nil nil "cyan" "cyan" "cyan" "cyan" nil nil nil]
            [nil nil nil "cyan" "cyan" "cyan" "cyan" nil nil nil]
            [nil nil nil "orangered" "orangered" nil nil nil nil nil]
            [nil nil nil nil "orangered" "orangered" nil nil nil nil]
            [nil nil nil "orangered" "orangered" nil nil nil nil nil]
            [nil nil nil nil "orangered" "orangered" nil nil nil nil]
            [nil nil nil "orangered" "orangered" nil nil nil nil nil]
            [nil nil nil nil "orangered" "orangered" nil nil nil nil]
            [nil nil nil "orangered" "orangered" nil nil nil nil nil]
            [nil nil nil nil "orangered" "orangered" nil nil nil nil]
            [nil nil nil "orangered" "orangered" nil nil nil nil nil]
            [nil nil nil nil "orangered" "orangered" nil nil nil nil]
            [nil nil nil "cyan" "cyan" "cyan" "cyan" nil nil nil]
            [nil nil nil "orangered" "orangered" nil nil nil nil nil]
            [nil nil nil nil "orangered" "orangered" nil nil nil nil]
            [nil nil nil "cyan" "cyan" "cyan" "cyan" nil nil nil]
            [nil nil nil "cyan" "cyan" "cyan" "cyan" nil nil nil]]
           (->> (reduce
                 (fn [field _]
                   (move/bottom validators/field-valid? identity field))
                 sample-field
                 (range 15))
                :field))))
  (testing "should drop all pieces and end the game"
    (is (nil? (reduce
               (fn [field _]
                 (move/bottom validators/field-valid? identity field))
               sample-field
               (range 16))))))

(defn limit-next-pieces [state n]
  (update
   state
   :next-pieces
   (fn [infinite-seq]
     (take n infinite-seq))))

(defn remove-random-elements [state]
  (dissoc
   state
   :next-pieces
   :color
   :piece
   :piece-bounds))

(deftest new-game-test
  (testing "should create :piece"
    (is (= (sort [:color
                  :field
                  :game-state
                  :height
                  :levels
                  :next-pieces
                  :piece
                  :piece-bounds
                  :score
                  :width])
           (sort (keys (limit-next-pieces
                        (move/new-game
                         (constantly true)
                         identity
                         {})
                        1))) )))
  (testing "should generate two distinct pieces"
    (is (not (let
                 [{:keys [piece next-pieces]}
                  (with-redefs
                    [core.actions.piece-gen/generate-new-piece
                     (fn [_]
                       {:piece (gensym "unique_for_testing_")
                        :piece-bounds (gensym "unique_for_testing_")})]
                    (move/new-game
                     (constantly true)
                     identity
                     {}))]
               (= piece (:piece (first next-pieces)))))))
  (testing "should generate two distinct piece bounds"
    (is (not
         (let
             [{:keys [piece-bounds next-pieces]}
              (with-redefs
                [core.actions.piece-gen/generate-new-piece
                 (fn [_]
                   {:piece (gensym "unique_for_testing_")
                    :piece-bounds (gensym "unique_for_testing_")})]
                (move/new-game
                 (constantly true)
                 identity
                 {}))
              ]
           (= piece-bounds (:piece-bounds (first next-pieces)))))))
  #_(testing "should call gravity-restart-fn"
      (is (= 1
             (count-calls
              gravity-fn-call-counter
              (remove-random-elements
               (limit-next-pieces
                (move/new-game
                 (constantly true)
                 gravity-fn-call-counter
                 {})
                1))) )))
  (testing "should have many nils in :field"
    (is (= {nil 220}
           (frequencies
            (reduce
             concat
             (:field (limit-next-pieces
                      (move/new-game
                       (constantly true)
                       identity
                       {})
                      1)))) ))))
