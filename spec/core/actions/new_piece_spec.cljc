(ns core.actions.new-piece-spec
  (:require [speclj.core :refer :all]
            [core.actions.new-piece :refer :all]))

(describe
  "coords-op"
  (it "should generate a new piece to :next-piece"
      (should=
        {::some-state ::le-state
         :next-piece {:piece ::piece
                      :piece-bounds ::bouds}}
        (new-piece
          (constantly true)
          (constantly {:piece ::piece
                       :piece-bounds ::bouds})
          {::some-state ::le-state
           :next-piece {}})))
  (it "should copy :piece from :next-piece"
      (should=
        {::some-state ::le-state
         :prev-piece ::a
         :next-piece ::next-piece}
        (new-piece
          (constantly true)
          (constantly ::next-piece)
          {::some-state ::le-state
           :next-piece {:prev-piece ::a}})))
  (it "should end game if impossible to place"
      (should=
        {::state ::le-state
         :game-state :ended}
        (new-piece
          (constantly false)
          (constantly {:piece ::piece
                       :piece-bounds ::bouds})
          {::state ::le-state}))))

