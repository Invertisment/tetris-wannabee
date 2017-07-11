(ns core.actions.new-piece-spec
  (:require [speclj.core :refer :all]
            [core.actions.new-piece :refer :all]))

(describe
  "coords-op"
  (it "should return nil on no pieces"
      (should=
        {:piece ::piece
         :piece-bounds ::bouds
         ::state ::le-state}
        (new-piece
          (constantly true)
          (constantly {:piece ::piece
                       :piece-bounds ::bouds})
          {::state ::le-state})))
  (it "should end game if impossible to place"
      (should=
        {::state ::le-state
         :game-state :ended}
        (new-piece
          (constantly false)
          (constantly {:piece ::piece
                       :piece-bounds ::bouds})
          {::state ::le-state}))))

