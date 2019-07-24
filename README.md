# ClojureScript tetris
Compiles to JavaScript.
Playable on browser and controllable with keyboard: https://invertisment.github.io/cljs-tetris/

#### Controls:
    Piece control: w, a, s, d
    Hard-drop the current piece: Space
    Hold piece: r
    New game: n
    Activate AI: m

#### Development
##### Tools
lein, cljs, speclj

##### Auto build
lein cljsbuild auto

##### Running tests
lein spec -a

##### AI mechanism training
lein run
