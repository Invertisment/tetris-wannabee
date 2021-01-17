(ns core.actions.piece-ops-test
  (:require [clojure.test :refer :all]
            [core.actions.piece-ops :as ops]))

(deftest coords-op-test
  (testing "should apply fn to coord"
    (is (= {:coord [2 6] :color :le-color}
           (ops/coords-op inc inc {:coord [1 5] :color :le-color}))))
  (testing "should apply fn to coord 2"
    (is (= {:coord [1 5] :color :le-color}
           (ops/coords-op dec dec {:coord [2 6] :color :le-color})))))

(deftest coords-op-scalar-test
  (testing "should apply fns to coord list"
    (is (= {:piece [{:coord [2 4] :color :le-color}
                    {:coord [4 7] :color :le-color}]
            :piece-bounds {:x-range [2 3] :y-range [1 2]}
            :piece-path [{:coord [1 5] :color :le-color}
                         {:coord [3 8] :color :le-color}]}
           (ops/coords-op-scalar
            inc
            dec
            {:piece [{:coord [1 5] :color :le-color}
                     {:coord [3 8] :color :le-color}]
             :piece-bounds {:x-range [1 2] :y-range [2 3]}
             :piece-path []}))))
  (testing "should accumulate piece path"
    (is (= {:piece [{:coord [1 5] :color :le-color} {:coord [3 8] :color :le-color}]
            :piece-bounds {:x-range [1 2] :y-range [2 3]}
            :piece-path
            [{:coord [4 7] :color :le-color}
             {:coord [2 4] :color :le-color}
             {:coord [5 6] :color :le-color}
             {:coord [3 3] :color :le-color}
             {:coord [4 7] :color :le-color}
             {:coord [2 4] :color :le-color}
             {:coord [3 8] :color :le-color}
             {:coord [1 5] :color :le-color}]}
           (->> {:piece [{:coord [1 5] :color :le-color}
                         {:coord [3 8] :color :le-color}]
                 :piece-bounds {:x-range [1 2] :y-range [2 3]}}
                (ops/coords-op-scalar inc dec)
                (ops/coords-op-scalar inc dec)
                (ops/coords-op-scalar dec inc)
                (ops/coords-op-scalar dec inc)))))
  #_(testing "should be fast"
      (is (time (loop [i 0]
                  (if (>= i 100000)
                    :ok
                    (do (->> {:piece [{:coord [1 5] :color :le-color}
                                      {:coord [3 8] :color :le-color}]
                              :piece-bounds {:x-range [1 2] :y-range [2 3]}}
                             (ops/coords-op-scalar inc dec)
                             (ops/coords-op-scalar inc dec)
                             (ops/coords-op-scalar inc dec)
                             (ops/coords-op-scalar inc dec)
                             (ops/coords-op-scalar dec inc)
                             (ops/coords-op-scalar dec inc)
                             (ops/coords-op-scalar dec inc)
                             (ops/coords-op-scalar dec inc))
                        (recur (inc i)))))))))

(deftest coords-op-scalar-piece-test
  (testing "should apply fns to coord list"
    (is (= [{:coord [2 4] :color :le-color}
            {:coord [4 7] :color :le-color}]
           (ops/coords-op-scalar-piece inc dec [{:coord [1 5] :color :le-color}
                                                {:coord [3 8] :color :le-color}]))))
  (testing "should apply fns to coord list 2"
    (is (= [{:coord [1 7] :color :le-color}
            {:coord [2 9] :color :le-color}]
           (ops/coords-op-scalar-piece dec inc [{:coord [2 6] :color :le-color}
                                                {:coord [3 8] :color :le-color}])))))

(deftest coords-op-scalar-piece-bounds-test
  (testing "should apply fns to bounds map"
    (is (= {:x-range [2 6]
            :y-range [1 3]}
           (ops/coords-op-scalar-piece-bounds inc dec {:x-range [1 5] :y-range [2 4]}))))
  (testing "should apply fns to bounds map 2"
    (is (= {:x-range [0 4]
            :y-range [3 5]}
           (ops/coords-op-scalar-piece-bounds dec inc {:x-range [1 5] :y-range [2 4]})))))

(def piece-27
  (-> (ops/coords-op-scalar
       identity
       (fn [coord] (+ coord 25))
       {:piece [{:coord [1 1] :color :le-color}
                {:coord [2 2] :color :le-color}
                {:coord [2 3] :color :le-color}]
        :piece-bounds {:x-range [1 2] :y-range [2 3]}
        :piece-path []})
      (update :piece-path empty)))

(deftest get-piece-height-test
  (testing "should return piece height"
    (is (= 27 (ops/get-piece-height piece-27))))
  (testing "should return piece height + random"
    (let [number (rand-int 123123)]
      (is (= number
             (ops/get-piece-height
              (ops/coords-op-scalar
               identity
               (fn [coord] (+ coord number))
               {:piece [{:coord [1 1] :color :le-color}
                        {:coord [2 2] :color :le-color}
                        {:coord [2 3] :color :le-color}]
                :piece-bounds {:x-range [1 2] :y-range [0 3]}})))))))

(deftest set-piece-height-test
  (testing "should return piece height"
    (is (= {:piece
            [{:coord [1 1336] :color :le-color}
             {:coord [2 1337] :color :le-color}
             {:coord [2 1338] :color :le-color}]
            :piece-bounds {:x-range [1 2] :y-range [1337 1338]}
            :piece-path [{:coord [1 26] :color :le-color}
                         {:coord [2 27] :color :le-color}
                         {:coord [2 28] :color :le-color}]}
           (ops/set-piece-height piece-27 1337)))))
