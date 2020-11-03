(defproject node_test "0.1.0-SNAPSHOT"
  :dependencies [[org.clojure/clojure "1.10.1"]
                 [org.clojure/clojurescript "1.10.597"] ; 1.9.542 does not work
                 [org.clojure/core.async "1.1.582"]
                 [flames "0.4.0"]]

  :profiles {:dev
             {:dependencies [[speclj "3.3.2"]
                             [javax.xml.bind/jaxb-api "2.4.0-b180830.0359"] ;; workaround for java 8+
                             ]
              :plugins [[lein-cljsbuild "1.1.7"]
                        [speclj "3.3.2"]]
              :source-paths ["src" "dev"]
              :test-paths ["spec"]}}
  :clean-targets
  [[:cljsbuild :builds 0 :compiler :output-to]
   :target-path
   :compile-path]
  :cljsbuild {:builds
              [{:id "dev"
                :source-paths ["src"]
                :compiler {:output-dir "out"
                           :output-to "index-dev.js"
                           :optimizations :none
                           :source-map true}}
               {:id "prod"
                :source-paths ["src"]
                :compiler {:output-to "index-prod.js"
                           :optimizations :whitespace}}]}
  :main core.ai.main)
