(ns core.core-spec
  (:require [speclj.core :refer :all]
            [core.core :as core]
            #_[clojure-future :refer :all]
            [clojure.future :as fs]
            [clojure.spec.alpha :as s]))

(s/def ::width fs/nat-int?)
(s/def ::height fs/nat-int?)
(s/def ::single-coordinate fs/nat-int?)
(s/def ::coordinates (s/coll-of ::single-coordinate :count 2 :kind vector?))
(s/def ::field fs/nat-int?)
(s/def ::state (s/keys :req [::width ::height ::field]))

(describe
  "change-listener"
  (it "should call next-field-state"
      (should=
        "valid state"
        (core/change-listener
          (fn [_ _ _ _ _] "valid state")
          (atom nil)
          (fn [_] true)
          identity
          identity
          "player action"))))

(run-specs)
