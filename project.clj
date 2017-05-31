(defproject node_test "0.1.0-SNAPSHOT"
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [org.clojure/clojurescript "1.7.228"] ; 1.9.542 does not work
                 [org.clojure/core.async "0.3.442"]]
  :profiles {:dev
             {:dependencies [[com.cemerick/piggieback "0.2.1"]
                             [org.clojure/tools.nrepl "0.2.10"]
                             [speclj "3.3.2"]]
              :plugins [[lein-cljsbuild "1.1.6"]
                        [speclj "3.3.0"]]
              :source-paths ["src" "dev"] 
              :test-paths ["spec"]
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
                           :source-map true}}]})
