(defproject node_test "0.1.0-SNAPSHOT"
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [org.clojure/clojurescript "1.7.228"] ; 1.9.542 does not work
                 [org.clojure/core.async "0.1.346.0-17112a-alpha"]]
  :profiles {:dev
             {:dependencies [[com.cemerick/piggieback "0.2.1"]
                             [org.clojure/tools.nrepl "0.2.10"]]
              :plugins [[lein-cljsbuild "1.1.6"]]
              :source-paths ["src" "dev"]
              :repl-options {:nrepl-middleware [cemerick.piggieback/wrap-cljs-repl]}}}
  :clean-targets
  [[:cljsbuild :builds 0 :compiler :output-to]
   :target-path
   :compile-path]
  :cljsbuild {:builds
              [{:id "dev"
                :source-paths ["src"]
                :compiler {:output-dir "out"
                           :output-to "index.js"
                           :optimizations :none
                           :source-map true
                           :target :nodejs}}]})
