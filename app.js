// Bootstrap node.js
//require('./out/goog/bootstrap/nodejs');

// Our app compiled by cljsbuild
require('./index.js');

// The core of our code
require('./out/core/core');
require('./out/core/fabric');
require('./out/core/main');

// The core of cljs
require('./out/cljs/core');

// Run main
// NOTE: Dashes in namespaces are replaced by underscores.
core.main._main();
