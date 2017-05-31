// Compiled by ClojureScript 1.7.228 {}
goog.provide('cljs.nodejs');
goog.require('cljs.core');
cljs.nodejs.require = require;
cljs.nodejs.process = process;
cljs.nodejs.enable_util_print_BANG_ = (function cljs$nodejs$enable_util_print_BANG_(){
cljs.core._STAR_print_newline_STAR_ = false;

cljs.core._STAR_print_fn_STAR_ = (function() { 
var G__12993__delegate = function (args){
return console.log.apply(console,cljs.core.into_array.call(null,args));
};
var G__12993 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__12994__i = 0, G__12994__a = new Array(arguments.length -  0);
while (G__12994__i < G__12994__a.length) {G__12994__a[G__12994__i] = arguments[G__12994__i + 0]; ++G__12994__i;}
  args = new cljs.core.IndexedSeq(G__12994__a,0);
} 
return G__12993__delegate.call(this,args);};
G__12993.cljs$lang$maxFixedArity = 0;
G__12993.cljs$lang$applyTo = (function (arglist__12995){
var args = cljs.core.seq(arglist__12995);
return G__12993__delegate(args);
});
G__12993.cljs$core$IFn$_invoke$arity$variadic = G__12993__delegate;
return G__12993;
})()
;

cljs.core._STAR_print_err_fn_STAR_ = (function() { 
var G__12996__delegate = function (args){
return console.error.apply(console,cljs.core.into_array.call(null,args));
};
var G__12996 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__12997__i = 0, G__12997__a = new Array(arguments.length -  0);
while (G__12997__i < G__12997__a.length) {G__12997__a[G__12997__i] = arguments[G__12997__i + 0]; ++G__12997__i;}
  args = new cljs.core.IndexedSeq(G__12997__a,0);
} 
return G__12996__delegate.call(this,args);};
G__12996.cljs$lang$maxFixedArity = 0;
G__12996.cljs$lang$applyTo = (function (arglist__12998){
var args = cljs.core.seq(arglist__12998);
return G__12996__delegate(args);
});
G__12996.cljs$core$IFn$_invoke$arity$variadic = G__12996__delegate;
return G__12996;
})()
;

return null;
});

//# sourceMappingURL=nodejs.js.map