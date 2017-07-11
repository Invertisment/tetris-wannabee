(ns core.actions.clear-lines-spec
  (:require [speclj.core :refer :all]
            [core.actions.clear-lines :as cl]
            [core.constants :as const]))

(describe
  "group-into-lines"
  (it "should group by y index"
      (should=
        {2 [{:coord [1 2] :color "chartreuse"}]
         1 [{:coord [1 1] :color "chartreuse"}]
         0 [{:coord [1 0] :color "chartreuse"}
            {:coord [2 0] :color "chartreuse"}]}
        (cl/group-into-lines {:field #{{:coord [1 0] :color "chartreuse"}
                                       {:coord [1 1] :color "chartreuse"}
                                       {:coord [1 2] :color "chartreuse"}
                                       {:coord [2 0] :color "chartreuse"}}})))
  (it "should group by y index"
      (should=
        {2 [{:coord [1 2] :color "chartreuse"}
            {:coord [8 2] :color "chartreuse 1"}]
         0 [{:coord [1 0] :color "chartreuse"}
            {:coord [2 0] :color "chartreuse"}]}
        (cl/group-into-lines {:field #{{:coord [1 2] :color "chartreuse"}
                                       {:coord [8 2] :color "chartreuse 1"}
                                       {:coord [1 0] :color "chartreuse"}
                                       {:coord [2 0] :color "chartreuse"}}}))))

(describe
  "find-full-lines"
  (it "should find no lines"
      (should=
        {:full-line-ids ()
         :lines {2 [{:coord [1 2] :color "chartreuse"}
                    {:coord [8 2] :color "chartreuse 1"}]
                 0 [{:coord [1 0] :color "chartreuse"}
                    {:coord [2 0] :color "chartreuse"}]}}
        (cl/find-full-lines {:width 3}
                            {2 [{:coord [1 2] :color "chartreuse"}
                                {:coord [8 2] :color "chartreuse 1"}]
                             0 [{:coord [1 0] :color "chartreuse"}
                                {:coord [2 0] :color "chartreuse"}]})))
  (it "should find one line [2]"
      (should=
        {:full-line-ids '(2)
         :lines {0 [{:coord [2 0] :color "chartreuse"}]}}
        (cl/find-full-lines {:width 2}
                            {2 [{:coord [1 2] :color "chartreuse"}
                                {:coord [8 2] :color "chartreuse 1"}]
                             0 [{:coord [2 0] :color "chartreuse"}]})))
  (it "should find one line [3]"
      (should=
        {:full-line-ids '(0)
         :lines {2 [{:coord [1 2] :color "chartreuse"}
                    {:coord [8 2] :color "chartreuse 1"}]}}
        (cl/find-full-lines {:width 3}
                            {2 [{:coord [1 2] :color "chartreuse"}
                                {:coord [8 2] :color "chartreuse 1"}]
                             0 [{:coord [2 0] :color "chartreuse"}
                                {:coord [3 0] :color "chartreuse"}
                                {:coord [4 0] :color "chartreuse"}]}))))

(describe
  "find-upper-line-ids"
  (it "should find no lines"
      (should=
        []
        (cl/find-upper-line-ids 0)))
  (it "should find single line"
      (should=
        [0]
        (cl/find-upper-line-ids 1))))

(describe
  "group-upper-line-ids"
  (it "no lines"
      (should=
        {}
        (cl/group-upper-line-ids [])))
  (it "lines 1"
      (should=
        {0 1
         1 1
         2 1}
        (cl/group-upper-line-ids [3])))
  (it "lines 2"
      (should=
        {0 2
         1 2
         2 2
         3 1
         4 1
         5 1}
        (cl/group-upper-line-ids [3 6])))
  (it "lines 3"
      (should=
        {0 3
         1 3
         2 3
         3 2
         4 2
         5 2
         6 1}
        (cl/group-upper-line-ids [3 6 7]))))

(describe
  "move-single-line"
  (it "line 1"
      (should=
        #{{:coord [1 3] :color "chartreuse"}
          {:coord [8 5] :color "chartreuse 1"}}
        (cl/move-single-line
          [{:coord [1 2] :color "chartreuse"}
           {:coord [8 4] :color "chartreuse 1"}]
          (partial + 1))))
  (it "line 2"
      (should=
        #{{:coord [1 6] :color "chartreuse"}
          {:coord [1 2] :color "chartreuse"}
          {:coord [2 2] :color "chartreuse"}}
        (cl/move-single-line
          [{:coord [1 4] :color "chartreuse"}
           {:coord [1 0] :color "chartreuse"}
           {:coord [2 0] :color "chartreuse"}]
          (partial + 2)))))

(describe
  "move-lines"
  (it "no lines"
      (should=
        #{}
        (cl/move-lines {:line-shifts
                        {0 0 1 1 2 2}
                        :lines {}})))
  (it "lines 1"
      (should=
        #{{:coord [1 4] :color "chartreuse"}
          {:coord [8 4] :color "chartreuse 1"}
          {:coord [1 0] :color "chartreuse"}
          {:coord [2 0] :color "chartreuse"}}
        (cl/move-lines {:line-shifts
                        {0 0 1 1 2 2}
                        :lines
                        {2 [{:coord [1 2] :color "chartreuse"}
                            {:coord [8 2] :color "chartreuse 1"}]
                         0 [{:coord [1 0] :color "chartreuse"}
                            {:coord [2 0] :color "chartreuse"}]}}
                       )))
  (it "lines 2"
      (should=
        #{{:coord [0 6] :color "chartreuse"}
          {:coord [4 2] :color "chartreuse 1"}
          {:coord [1 2] :color "chartreuse"}
          {:coord [2 9] :color "chartreuse"}}
        (cl/move-lines {:line-shifts {0 0 1 1 2 2}
                        :lines
                        {2 [{:coord [0 4] :color "chartreuse"}
                            {:coord [4 0] :color "chartreuse 1"}]
                         1 [{:coord [1 1] :color "chartreuse"}
                            {:coord [2 8] :color "chartreuse"}]}})))
  (it "no NPE"
      (should=
        #{{:coord [0 4] :color "chartreuse"}
          {:coord [4 0] :color "chartreuse 1"}}
        (cl/move-lines {:line-shifts {}
                        :lines
                        {2 [{:coord [0 4] :color "chartreuse"}
                            {:coord [4 0] :color "chartreuse 1"}]}}))))

(describe
  "compute-line-shifts"
  (it "compute-line-shifts a"
      (should=
        {:line-shifts {0 3
                       1 2
                       2 2
                       3 1
                       4 1
                       5 1
                       6 1}
         :lines :some-lines}
        (cl/compute-line-shifts
          {:full-line-ids '(1 3 7)
           :lines :some-lines})))
  (it "compute-line-shifts b"
      (should=
        {:line-shifts {0 2
                       1 2
                       2 1
                       3 1
                       4 1}
         :lines :some-lines}
        (cl/compute-line-shifts
          {:full-line-ids '(2 5)
           :lines :some-lines}))))

(describe
  "remove-full-lines"
  (it "no lines"
      (should=
        {:field #{{:coord [0 0] :color "color q"}
                  {:coord [0 1] :color "color w"}}
         :width 2
         :height 2}
        (cl/remove-full-lines
          {:field #{{:coord [0 0] :color "color q"}
                    {:coord [0 1] :color "color w"}}
           :width 2
           :height 2})))
  (it "one line -> nothing left"
      (should=
        {:field #{}
         :width 2
         :height 2}
        (cl/remove-full-lines
          {:field #{{:coord [0 0] :color "color a"}
                    {:coord [1 0] :color "color b"}}
           :width 2
           :height 2})))
  (it "one line -> block in bottom, no move"
      (should=
        {:field #{{:coord [0 1] :color "color a"}}
         :width 2
         :height 2}
        (cl/remove-full-lines
          {:field #{{:coord [0 0] :color "color c"}
                    {:coord [1 0] :color "color b"}
                    {:coord [0 1] :color "color a"}}
           :width 2
           :height 2})))
  (it "one line -> block in bottom, with move"
      (should=
        {:field #{{:coord [0 1] :color "color c"}}
         :width 2
         :height 2}
        (cl/remove-full-lines
          {:field #{{:coord [0 0] :color "color c"}
                    {:coord [1 1] :color "color b"}
                    {:coord [0 1] :color "color a"}}
           :width 2
           :height 2}))))



