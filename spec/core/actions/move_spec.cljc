(ns core.actions.move-spec
  (:require [speclj.core :refer :all]
            [core.actions.move :as move]
            [core.constants :as const]))

(describe
  "determine-direction"
  (it "should have left"
      (should= #'core.actions.move/left (move/direction const/left)))
  (it "should have right"
      (should= #'core.actions.move/right (move/direction const/right)))
  (it "should have rotate"
      (should= #'core.actions.move/rotate (move/direction const/rotate)))
  (it "should have down"
      (should= #'core.actions.move/down (move/direction const/down)))
  (it "should have bottom"
      (should= #'core.actions.move/bottom (move/direction const/bottom)))
  (it "should have default case"
      (should= #'core.actions.move/nop (move/direction "anything else"))))

(describe
  "bottom"
  (it "should not do infinite loop on no :piece"
      (should= nil (move/bottom (constantly true) identity {}))))

(describe
  "new-game"
  (it "should create :piece"
      (should= {:field #{}
                :piece ::new-piece
                :piece-bounds ::piece-bounds
                :next-piece {:piece ::new-piece
                             :piece-bounds ::piece-bounds}
                :score {}}
               (with-redefs
                 [core.actions.piece-gen/generate-new-piece
                  (fn [_]
                    {:piece ::new-piece
                     :piece-bounds ::piece-bounds})]
                 (move/new-game
                   (constantly true)
                   identity
                   {}))))
  (it "should generate two distinct pieces"
      (should-not
        (let
          [{:keys [piece next-piece]}
           (with-redefs
             [core.actions.piece-gen/generate-new-piece
              (fn [_]
                {:piece (gensym "unique_for_testing_")
                 :piece-bounds (gensym "unique_for_testing_")})]
             (move/new-game
               (constantly true)
               identity
               {}))]
          (= piece (:piece next-piece)))))
  (it "should generate two distinct piece bounds"
      (should-not
        (let
          [{:keys [piece-bounds next-piece]}
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
          (= piece-bounds (:piece-bounds next-piece))))))

