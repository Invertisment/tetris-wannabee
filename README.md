# ClojureScript tetris
Compiles to JavaScript (for playing in browser) and Java (for headless training).
Playable on browser and controllable with keyboard: https://invertisment.github.io/cljs-tetris/

#### Controls:
    Piece control: w, a, s, d
    Hard-drop the current piece: Space
    Hold piece: r
    New game: n
    Activate AI: m

#### Development
##### Tools
lein, cljs, clojure test

##### Auto build
lein cljsbuild auto

##### Running tests
lein test

##### AI mechanism training
lein run
