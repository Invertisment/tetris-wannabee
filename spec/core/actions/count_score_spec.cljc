(ns core.actions.count-score-spec
  (:require [speclj.core :refer :all]
            [core.actions.count-score :as cs]))

(describe
  "add-cleared-lines"
  (it "should add nothing if no :line-clear-data"
      (should=
        {:score {:lines-cleared 0}}
        (cs/add-cleared-lines {:score {:lines-cleared 0}})))
  (it "should add nothing if no lines"
      (should=
        {:score {:lines-cleared 0}}
        (cs/add-cleared-lines
          {:score {:lines-cleared 0}
           :line-clear-data {:full-line-ids '()}})))
  (it "should add lines to :lines-cleared"
      (should=
        {:score {:lines-cleared 2}}
        (cs/add-cleared-lines
          {:score {:lines-cleared 0}
           :line-clear-data {:full-line-ids '(12313 123)}})))
  (it "should add lines to :lines-cleared (non zero prev)"
      (should=
        {:score {:lines-cleared 8}}
        (cs/add-cleared-lines
          {:score {:lines-cleared 5}
           :line-clear-data {:full-line-ids '(0 12313 123)}}))))
