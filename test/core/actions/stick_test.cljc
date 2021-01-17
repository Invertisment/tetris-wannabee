(ns core.actions.stick-test
  (:require [core.actions.stick :as stick]
            [core.constants :as const]
            [clojure.test :refer :all]))

(deftest merge-piece-to-field
  (testing "should concat :piece with :field 1"
    (is (= {:field
            [[nil nil nil nil nil nil nil nil "a" nil]]
            :prev-piece-path [{:coord [8 0] :color "a"}]}
           (stick/stick-piece
            {:piece
             #{{:coord [8 0] :color "a"}}
             :piece-bounds [:something]
             :field
             [[nil nil nil nil nil nil nil nil nil nil]]}))))
  (testing "should concat :piece with :field 2"
    (is (= {:field
            [[nil nil nil "a" nil nil nil nil nil nil]
             [nil nil nil "a" "a" "a" nil nil nil nil]
             [nil nil nil nil nil nil nil nil nil nil]
             [nil nil nil nil nil nil nil nil nil nil]]
            :prev-piece-path [{:coord [3 1] :color "a"}
                              {:coord [5 1] :color "a"}
                              {:coord [4 1] :color "a"}
                              {:coord [3 0] :color "a"}]}
           (stick/stick-piece
            {:piece
             #{{:coord [4 1] :color "a"} {:coord [3 0] :color "a"}
               {:coord [5 1] :color "a"} {:coord [3 1] :color "a"}}
             :piece-bounds [:something]
             :field
             [[nil nil nil nil nil nil nil nil nil nil]
              [nil nil nil nil nil nil nil nil nil nil]
              [nil nil nil nil nil nil nil nil nil nil]
              [nil nil nil nil nil nil nil nil nil nil]]}))))
  (testing "should add second piece to the field"
    (is (= {:field
            [[nil nil nil "b" nil nil nil nil nil nil]
             [nil nil nil "b" "b" "b" nil nil nil nil]
             [nil nil nil "a" nil nil nil nil nil nil]
             [nil nil nil "a" "a" "a" nil nil nil nil]]
            :prev-piece-path [{:coord [4 1] :color "b"}
                              {:coord [3 1] :color "b"}
                              {:coord [5 1] :color "b"}
                              {:coord [3 0] :color "b"}]}
           (stick/stick-piece
            {:piece
             #{{:coord [4 1] :color "b"} {:coord [3 0] :color "b"}
               {:coord [5 1] :color "b"} {:coord [3 1] :color "b"}}
             :piece-bounds [:something]
             :field
             [[nil nil nil nil nil nil nil nil nil nil]
              [nil nil nil nil nil nil nil nil nil nil]
              [nil nil nil "a" nil nil nil nil nil nil]
              [nil nil nil "a" "a" "a" nil nil nil nil]]}))))
  (testing "should override anything testing touches"
    (is (= {:field
            [[nil nil nil "b" nil nil nil nil nil nil]
             [nil nil nil "b" "b" "b" nil nil nil nil]
             [nil nil nil "a" "a" "a" nil nil nil nil]]
            :prev-piece-path [{:coord [4 1] :color "b"}
                              {:coord [3 1] :color "b"}
                              {:coord [5 1] :color "b"}
                              {:coord [3 0] :color "b"}]}
           (stick/stick-piece
            {:piece
             #{{:coord [4 1] :color "b"} {:coord [3 0] :color "b"}
               {:coord [5 1] :color "b"} {:coord [3 1] :color "b"}}
             :piece-bounds [:something]
             :field
             [[nil nil nil nil nil nil nil nil nil nil]
              [nil nil nil "a" nil nil nil nil nil nil]
              [nil nil nil "a" "a" "a" nil nil nil nil]]}))))
  (testing "should be fine if called two times"
    (is (= [{:field
             [[nil nil nil "b" nil nil nil nil nil nil]
              [nil nil nil "b" "b" "b" nil nil nil nil]
              [nil nil nil "a" "a" "a" nil nil nil nil]]
             :prev-piece-path [{:coord [4 1] :color "b"}
                               {:coord [3 1] :color "b"}
                               {:coord [5 1] :color "b"}
                               {:coord [3 0] :color "b"}]}
            {:field
             [[nil nil nil "c" nil nil nil nil nil nil]
              [nil nil nil "c" "c" "c" nil nil nil nil]
              [nil nil nil "a" "a" "a" nil nil nil nil]]
             :prev-piece-path [{:coord [5 1] :color "c"}
                               {:coord [4 1] :color "c"}
                               {:coord [3 0] :color "c"}
                               {:coord [3 1] :color "c"}]}]
           (let [field [[nil nil nil nil nil nil nil nil nil nil]
                        [nil nil nil "a" nil nil nil nil nil nil]
                        [nil nil nil "a" "a" "a" nil nil nil nil]]]
             [(stick/stick-piece
               {:piece
                #{{:coord [4 1] :color "b"} {:coord [3 0] :color "b"}
                  {:coord [5 1] :color "b"} {:coord [3 1] :color "b"}}
                :piece-bounds [:something]
                :field
                field})
              (stick/stick-piece
               {:piece
                #{{:coord [4 1] :color "c"} {:coord [3 0] :color "c"}
                  {:coord [5 1] :color "c"} {:coord [3 1] :color "c"}}
                :piece-bounds [:something]
                :field
                field})])))))
