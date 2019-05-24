# ClojureScript tetris
Compiles to JavaScript.
Playable on browser and controllable with keyboard.

Playable on https://invertisment.github.io/cljs-tetris/

#### Controls:
    Piece control: w, a, s, d
    Hard-drop the current piece: Space
    New game: n (doesn't restart piece falling, use reload to do it)

#### Development
##### Tools
lein, cljs, speclj

##### Auto build
lein cljsbuild auto

##### Running tests
lein spec -a
