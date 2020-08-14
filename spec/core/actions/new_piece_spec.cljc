(ns core.actions.new-piece-spec
  (:require [speclj.core :refer :all]
            [core.actions.new-piece :refer :all]))

(describe
 "coords-op"
 (it "should advance :next-piece"
     (should=
      {::some-state ::le-state
       :next-pieces [{:piece ::piece
                      :piece-bounds ::bounds}]}
      (new-piece
       (constantly true)
       {::some-state ::le-state
        :next-pieces [{}
                      {:piece ::piece
                       :piece-bounds ::bounds}]})))
 (it "should copy :piece from :next-piece"
     (should=
      {::some-state ::le-state
       :prev-piece ::a
       :next-pieces [{:prev-piece ::b}]}
      (new-piece
       (constantly true)
       {::some-state ::le-state
        :next-pieces [{:prev-piece ::a}
                      {:prev-piece ::b}]})))
 (it "should end game if impossible to place"
     (should=
      {::state ::le-state
       :game-state :ended
       :next-pieces [{:piece ::piece
                      :piece-bounds ::bounds}]}
      (new-piece
       (constantly false)
       {::state ::le-state
        :next-pieces [{:piece ::piece
                       :piece-bounds ::bounds}]}))))
