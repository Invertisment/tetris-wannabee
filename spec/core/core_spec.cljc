(ns core.core-spec
  (:require [speclj.core :refer :all]
            [core.core :refer :all]))

(describe
  "fn"
  #_(it "fn"
      (should= "I am a function!" (function))))

(run-specs)
