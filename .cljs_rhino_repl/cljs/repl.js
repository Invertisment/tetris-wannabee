// Compiled by ClojureScript 1.7.228 {}
goog.provide('cljs.repl');
goog.require('cljs.core');
cljs.repl.print_doc = (function cljs$repl$print_doc(m){
cljs.core.println.call(null,"-------------------------");

cljs.core.println.call(null,[cljs.core.str((function (){var temp__4657__auto__ = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__4657__auto__)){
var ns = temp__4657__auto__;
return [cljs.core.str(ns),cljs.core.str("/")].join('');
} else {
return null;
}
})()),cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join(''));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Protocol");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m))){
var seq__9193_9207 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__9194_9208 = null;
var count__9195_9209 = (0);
var i__9196_9210 = (0);
while(true){
if((i__9196_9210 < count__9195_9209)){
var f_9211 = cljs.core._nth.call(null,chunk__9194_9208,i__9196_9210);
cljs.core.println.call(null,"  ",f_9211);

var G__9212 = seq__9193_9207;
var G__9213 = chunk__9194_9208;
var G__9214 = count__9195_9209;
var G__9215 = (i__9196_9210 + (1));
seq__9193_9207 = G__9212;
chunk__9194_9208 = G__9213;
count__9195_9209 = G__9214;
i__9196_9210 = G__9215;
continue;
} else {
var temp__4657__auto___9216 = cljs.core.seq.call(null,seq__9193_9207);
if(temp__4657__auto___9216){
var seq__9193_9217__$1 = temp__4657__auto___9216;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9193_9217__$1)){
var c__8840__auto___9218 = cljs.core.chunk_first.call(null,seq__9193_9217__$1);
var G__9219 = cljs.core.chunk_rest.call(null,seq__9193_9217__$1);
var G__9220 = c__8840__auto___9218;
var G__9221 = cljs.core.count.call(null,c__8840__auto___9218);
var G__9222 = (0);
seq__9193_9207 = G__9219;
chunk__9194_9208 = G__9220;
count__9195_9209 = G__9221;
i__9196_9210 = G__9222;
continue;
} else {
var f_9223 = cljs.core.first.call(null,seq__9193_9217__$1);
cljs.core.println.call(null,"  ",f_9223);

var G__9224 = cljs.core.next.call(null,seq__9193_9217__$1);
var G__9225 = null;
var G__9226 = (0);
var G__9227 = (0);
seq__9193_9207 = G__9224;
chunk__9194_9208 = G__9225;
count__9195_9209 = G__9226;
i__9196_9210 = G__9227;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_9228 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__8037__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__8037__auto__)){
return or__8037__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.call(null,arglists_9228);
} else {
cljs.core.prn.call(null,((cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first.call(null,arglists_9228)))?cljs.core.second.call(null,arglists_9228):arglists_9228));
}
} else {
}
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"special-form","special-form",-1326536374).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Special Form");

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.contains_QMARK_.call(null,m,new cljs.core.Keyword(null,"url","url",276297046))){
if(cljs.core.truth_(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))){
return cljs.core.println.call(null,[cljs.core.str("\n  Please see http://clojure.org/"),cljs.core.str(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))].join(''));
} else {
return null;
}
} else {
return cljs.core.println.call(null,[cljs.core.str("\n  Please see http://clojure.org/special_forms#"),cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join(''));
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Macro");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"REPL Special Function");
} else {
}

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
var seq__9197 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__9198 = null;
var count__9199 = (0);
var i__9200 = (0);
while(true){
if((i__9200 < count__9199)){
var vec__9201 = cljs.core._nth.call(null,chunk__9198,i__9200);
var name = cljs.core.nth.call(null,vec__9201,(0),null);
var map__9202 = cljs.core.nth.call(null,vec__9201,(1),null);
var map__9202__$1 = ((((!((map__9202 == null)))?((((map__9202.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9202.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9202):map__9202);
var doc = cljs.core.get.call(null,map__9202__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists = cljs.core.get.call(null,map__9202__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name);

cljs.core.println.call(null," ",arglists);

if(cljs.core.truth_(doc)){
cljs.core.println.call(null," ",doc);
} else {
}

var G__9229 = seq__9197;
var G__9230 = chunk__9198;
var G__9231 = count__9199;
var G__9232 = (i__9200 + (1));
seq__9197 = G__9229;
chunk__9198 = G__9230;
count__9199 = G__9231;
i__9200 = G__9232;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__9197);
if(temp__4657__auto__){
var seq__9197__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9197__$1)){
var c__8840__auto__ = cljs.core.chunk_first.call(null,seq__9197__$1);
var G__9233 = cljs.core.chunk_rest.call(null,seq__9197__$1);
var G__9234 = c__8840__auto__;
var G__9235 = cljs.core.count.call(null,c__8840__auto__);
var G__9236 = (0);
seq__9197 = G__9233;
chunk__9198 = G__9234;
count__9199 = G__9235;
i__9200 = G__9236;
continue;
} else {
var vec__9204 = cljs.core.first.call(null,seq__9197__$1);
var name = cljs.core.nth.call(null,vec__9204,(0),null);
var map__9205 = cljs.core.nth.call(null,vec__9204,(1),null);
var map__9205__$1 = ((((!((map__9205 == null)))?((((map__9205.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9205.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9205):map__9205);
var doc = cljs.core.get.call(null,map__9205__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists = cljs.core.get.call(null,map__9205__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name);

cljs.core.println.call(null," ",arglists);

if(cljs.core.truth_(doc)){
cljs.core.println.call(null," ",doc);
} else {
}

var G__9237 = cljs.core.next.call(null,seq__9197__$1);
var G__9238 = null;
var G__9239 = (0);
var G__9240 = (0);
seq__9197 = G__9237;
chunk__9198 = G__9238;
count__9199 = G__9239;
i__9200 = G__9240;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
}
});

//# sourceMappingURL=repl.js.map