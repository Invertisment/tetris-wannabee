(ns core.actions.move-spec
  (:require [speclj.core :refer :all]
            [core.actions.move :as move]
            [core.constants :as const]))

(defmacro count-calls [fn-name body]
  `(let [counter# (atom 0)
         ~fn-name (fn [] (swap! counter# inc))         ]
     ~body
     @counter#))

(describe
  "determine-direction"
  (it "should have left"
      (should= #'core.actions.move/left (move/direction const/left)))
  (it "should have right"
      (should= #'core.actions.move/right (move/direction const/right)))
  (it "should have rotate"
      (should= #'core.actions.move/rotate (move/direction const/rotate)))
  (it "should have down"
      (should= #'core.actions.move/down (move/direction const/down)))
  (it "should have bottom"
      (should= #'core.actions.move/bottom (move/direction const/bottom)))
  (it "should have default case"
      (should= #'core.actions.move/nop (move/direction "anything else"))))

(describe
 "bottom"
 (it "should not do infinite loop on no :piece"
     (should= nil (move/bottom (constantly true) identity identity {}))))

(defn limit-next-pieces [state n]
  (update
   state
   :next-pieces
   (fn [infinite-seq]
     (take n infinite-seq))))

(defn remove-random-elements [state]
  (dissoc
   state
   :next-pieces
   :color
   :piece
   :piece-bounds))

(describe
 "new-game"
 (it "should create :piece"
     (should= (sort [:color
                     :field
                     :game-state
                     :height
                     :levels
                     :next-pieces
                     :piece
                     :piece-bounds
                     :score
                     :width])
              (sort (keys (limit-next-pieces
                           (move/new-game
                            (constantly true)
                            identity
                            #()
                            {})
                           1)))))
 (it "should generate two distinct pieces"
     (should-not
      (let
          [{:keys [piece next-pieces]}
           (with-redefs
             [core.actions.piece-gen/generate-new-piece
              (fn [_]
                {:piece (gensym "unique_for_testing_")
                 :piece-bounds (gensym "unique_for_testing_")})]
             (move/new-game
              (constantly true)
              identity
              #()
              {}))]
        (= piece (:piece (first next-pieces))))))
 (it "should generate two distinct piece bounds"
     (should-not
      (let
          [{:keys [piece-bounds next-pieces]}
           (with-redefs
             [core.actions.piece-gen/generate-new-piece
              (fn [_]
                {:piece (gensym "unique_for_testing_")
                 :piece-bounds (gensym "unique_for_testing_")})]
             (move/new-game
              (constantly true)
              identity
              #()
              {}))
           ]
        (= piece-bounds (:piece-bounds (first next-pieces))))))
 (it "should call gravity-restart-fn"
     (should= 1
              (count-calls
               gravity-fn-call-counter
               (remove-random-elements
                (limit-next-pieces
                 (move/new-game
                  (constantly true)
                  identity
                  gravity-fn-call-counter
                  {})
                 1)))))
 (it "should have many nils in :field"
     (should= {nil 220}
              (frequencies
               (reduce
                concat
                (:field (limit-next-pieces
                         (move/new-game
                          (constantly true)
                          identity
                          #()
                          {})
                         1)))))))
