(ns core.piece-validators-spec
  (:require [speclj.core :refer :all]
            [core.piece-validators :as v]))

(describe
  "is coordinate?"
  (it "happy path"
      (should (v/coord? 1 1 {:coord [0 0]})))
  (it "happy path 2"
      (should (v/coord? 2 1 {:coord [1 0]})))
  (it "out x"
      (should-not (v/coord? 1 1 {:coord [1 0]})))
  (it "out x 2"
      (should-not (v/coord? 3 1 {:coord [5 0]})))
  (it "out y"
      (should-not (v/coord? 3 1 {:coord [1 1]})))
  (it "out y 2"
      (should-not (v/coord? 2 2 {:coord [1 2]})))
  (it "out x below 0"
      (should-not (v/coord? 2 2 {:coord [-1 1]})))
  (it "out y below 0"
      (should-not (v/coord? 2 2 {:coord [0 -1]}))))

(describe
  "overlay?"
  (it "not valid"
      (should-not (v/overlay?
                   [[nil nil nil]
                    [nil "a" nil]
                    [nil nil nil]]
                   #{{:coord [2 2]}})))
  (it "happy path"
      (should (v/overlay?
               [[nil nil nil]
                [nil "a" nil]
                [nil nil nil]]
               #{{:coord [1 1]}})))
  (it "ok"
      (should (v/overlay?
                   [["a" "a" "a"]
                    ["a" "a" nil]
                    ["a" "a" "a"]]
                   #{{:coord [1 2]}})))
  (it "no connections"
      (should-not (v/overlay?
                   [["a" "a" "a"]
                    ["a" "a" nil]
                    ["a" "a" "a"]]
                   #{{:coord [2 1]}}))))

(describe
 "possible-placement?"
 (it "happy path"
     (should (v/possible-placement? 1 2
                                    [[nil "a"]]
                                    #{{:coord [0 0]}})))
 (it "valid"
     (should (v/possible-placement? 3 3
                                    [["a" nil nil]
                                     ["a" nil nil]
                                     ["a" nil nil]]
                                    #{{:coord [1 0]}})))
 (it "not valid 1"
     (should-not (v/possible-placement? 1 1
                                        [["a"]]
                                        #{{:coord [0 0]}})))
 (it "not valid 2"
     (should-not (v/possible-placement? 3 3
                                        [["a" nil nil]
                                         ["a" nil nil]
                                         ["a" nil nil]]
                                        #{{:coord [0 0]}})))
 (it "bad coords"
     (should-not (v/possible-placement? 1 1
                                        [["a"]]
                                        #{{:coord [0 -2]}}))))

(describe
 "field-valid?"
 (it "happy path"
     (should (v/field-valid? {:width 1 :height 2
                              :piece #{{:coord [0 1]}}
                              :field [[nil]
                                      [nil]]})))
 (it "not valid"
     (should-not (v/field-valid? {:width 1 :height 1
                                  :piece #{{:coord [0 0]}}
                                  :field [["a"]]})))
 (it "bad coords"
     (should-not (v/field-valid? {:width 1 :height 1
                                  :piece #{{:coord [0 -2]}}
                                  :field [[nil] [nil]]})))
 (it "nil is not valid :width"
     (should-not (v/field-valid? {:width nil :height 1
                                  :piece #{{:coord [0 0]}}
                                  :field [[nil nil]]})))
 (it "nil is not valid :height"
     (should-not (v/field-valid? {:width 1 :height nil
                                  :piece #{{:coord [0 0]}}
                                  :field #{{:coord [0 -2]}}})))
 (it "nil is not valid :piece"
     (should-not (v/field-valid? {:width 1 :height 1
                                  :piece nil
                                  :field #{{:coord [0 -2]}}})))
 (it "nil is not valid :field"
     (should-not (v/field-valid? {:width 1 :height 1
                                  :piece #{{:coord [0 0]}}
                                  :field nil})))
 (it "nil is not valid :coord"
     (should-not (v/field-valid? {:width 1 :height 1
                                  :piece #{{:coord nil}}
                                  :field [[nil nil]]})))
 (it "invalid piece"
     (should-not (v/field-valid? {:width 1 :height 2
                                  :piece #{{:coord [-1 0]}}
                                  :field [[nil nil]]}))))
