(ns core.actions.gravity-spec
  (:require [speclj.core :refer :all]
            [core.actions.gravity :as grav]))

#_(describe
  "on-move-fn"
  (it "should set the time of last game interaction"
      (should=
        {::some-state ::lalala
         :last-interaction {:time ::last-interaction-time}}
        (grav/on-move-fn
          (constantly ::last-interaction-time)
          {::some-state ::lalala}))))


