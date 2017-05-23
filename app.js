// Bootstrap node.js
require('./out/goog/bootstrap/nodejs');

// Our app compiled by cljsbuild
require('./index.js');

// The core of our code
require('./out/node_test_m/core');

// The core of cljs
require('./out/cljs/core');

// Run main
// NOTE: Dashes in namespaces are replaced by underscores.
node_test_m.core._main();
