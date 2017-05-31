// Compiled by ClojureScript 1.7.228 {}
goog.provide('cljs.core.async');
goog.require('cljs.core');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.ioc_helpers');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.timers');
cljs.core.async.fn_handler = (function cljs$core$async$fn_handler(var_args){
var args13001 = [];
var len__9095__auto___13007 = arguments.length;
var i__9096__auto___13008 = (0);
while(true){
if((i__9096__auto___13008 < len__9095__auto___13007)){
args13001.push((arguments[i__9096__auto___13008]));

var G__13009 = (i__9096__auto___13008 + (1));
i__9096__auto___13008 = G__13009;
continue;
} else {
}
break;
}

var G__13003 = args13001.length;
switch (G__13003) {
case 1:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13001.length)].join('')));

}
});

cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1 = (function (f){
return cljs.core.async.fn_handler.call(null,f,true);
});

cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2 = (function (f,blockable){
if(typeof cljs.core.async.t_cljs$core$async13004 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async13004 = (function (f,blockable,meta13005){
this.f = f;
this.blockable = blockable;
this.meta13005 = meta13005;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async13004.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_13006,meta13005__$1){
var self__ = this;
var _13006__$1 = this;
return (new cljs.core.async.t_cljs$core$async13004(self__.f,self__.blockable,meta13005__$1));
});

cljs.core.async.t_cljs$core$async13004.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_13006){
var self__ = this;
var _13006__$1 = this;
return self__.meta13005;
});

cljs.core.async.t_cljs$core$async13004.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async13004.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
});

cljs.core.async.t_cljs$core$async13004.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.blockable;
});

cljs.core.async.t_cljs$core$async13004.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
});

cljs.core.async.t_cljs$core$async13004.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"blockable","blockable",-28395259,null),new cljs.core.Symbol(null,"meta13005","meta13005",-366232346,null)], null);
});

cljs.core.async.t_cljs$core$async13004.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async13004.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async13004";

cljs.core.async.t_cljs$core$async13004.cljs$lang$ctorPrWriter = (function (this__8635__auto__,writer__8636__auto__,opt__8637__auto__){
return cljs.core._write.call(null,writer__8636__auto__,"cljs.core.async/t_cljs$core$async13004");
});

cljs.core.async.__GT_t_cljs$core$async13004 = (function cljs$core$async$__GT_t_cljs$core$async13004(f__$1,blockable__$1,meta13005){
return (new cljs.core.async.t_cljs$core$async13004(f__$1,blockable__$1,meta13005));
});

}

return (new cljs.core.async.t_cljs$core$async13004(f,blockable,cljs.core.PersistentArrayMap.EMPTY));
});

cljs.core.async.fn_handler.cljs$lang$maxFixedArity = 2;
/**
 * Returns a fixed buffer of size n. When full, puts will block/park.
 */
cljs.core.async.buffer = (function cljs$core$async$buffer(n){
return cljs.core.async.impl.buffers.fixed_buffer.call(null,n);
});
/**
 * Returns a buffer of size n. When full, puts will complete but
 *   val will be dropped (no transfer).
 */
cljs.core.async.dropping_buffer = (function cljs$core$async$dropping_buffer(n){
return cljs.core.async.impl.buffers.dropping_buffer.call(null,n);
});
/**
 * Returns a buffer of size n. When full, puts will complete, and be
 *   buffered, but oldest elements in buffer will be dropped (not
 *   transferred).
 */
cljs.core.async.sliding_buffer = (function cljs$core$async$sliding_buffer(n){
return cljs.core.async.impl.buffers.sliding_buffer.call(null,n);
});
/**
 * Returns true if a channel created with buff will never block. That is to say,
 * puts into this buffer will never cause the buffer to be full. 
 */
cljs.core.async.unblocking_buffer_QMARK_ = (function cljs$core$async$unblocking_buffer_QMARK_(buff){
if(!((buff == null))){
if((false) || (buff.cljs$core$async$impl$protocols$UnblockingBuffer$)){
return true;
} else {
if((!buff.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,buff);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,buff);
}
});
/**
 * Creates a channel with an optional buffer, an optional transducer (like (map f),
 *   (filter p) etc or a composition thereof), and an optional exception handler.
 *   If buf-or-n is a number, will create and use a fixed buffer of that size. If a
 *   transducer is supplied a buffer must be specified. ex-handler must be a
 *   fn of one argument - if an exception occurs during transformation it will be called
 *   with the thrown value as an argument, and any non-nil return value will be placed
 *   in the channel.
 */
cljs.core.async.chan = (function cljs$core$async$chan(var_args){
var args13013 = [];
var len__9095__auto___13016 = arguments.length;
var i__9096__auto___13017 = (0);
while(true){
if((i__9096__auto___13017 < len__9095__auto___13016)){
args13013.push((arguments[i__9096__auto___13017]));

var G__13018 = (i__9096__auto___13017 + (1));
i__9096__auto___13017 = G__13018;
continue;
} else {
}
break;
}

var G__13015 = args13013.length;
switch (G__13015) {
case 0:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13013.length)].join('')));

}
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.chan.call(null,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1 = (function (buf_or_n){
return cljs.core.async.chan.call(null,buf_or_n,null,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2 = (function (buf_or_n,xform){
return cljs.core.async.chan.call(null,buf_or_n,xform,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3 = (function (buf_or_n,xform,ex_handler){
var buf_or_n__$1 = ((cljs.core._EQ_.call(null,buf_or_n,(0)))?null:buf_or_n);
if(cljs.core.truth_(xform)){
if(cljs.core.truth_(buf_or_n__$1)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("buffer must be supplied when transducer is"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,new cljs.core.Symbol(null,"buf-or-n","buf-or-n",-1646815050,null)))].join('')));
}
} else {
}

return cljs.core.async.impl.channels.chan.call(null,((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer.call(null,buf_or_n__$1):buf_or_n__$1),xform,ex_handler);
});

cljs.core.async.chan.cljs$lang$maxFixedArity = 3;
/**
 * Creates a promise channel with an optional transducer, and an optional
 *   exception-handler. A promise channel can take exactly one value that consumers
 *   will receive. Once full, puts complete but val is dropped (no transfer).
 *   Consumers will block until either a value is placed in the channel or the
 *   channel is closed. See chan for the semantics of xform and ex-handler.
 */
cljs.core.async.promise_chan = (function cljs$core$async$promise_chan(var_args){
var args13020 = [];
var len__9095__auto___13023 = arguments.length;
var i__9096__auto___13024 = (0);
while(true){
if((i__9096__auto___13024 < len__9095__auto___13023)){
args13020.push((arguments[i__9096__auto___13024]));

var G__13025 = (i__9096__auto___13024 + (1));
i__9096__auto___13024 = G__13025;
continue;
} else {
}
break;
}

var G__13022 = args13020.length;
switch (G__13022) {
case 0:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13020.length)].join('')));

}
});

cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.promise_chan.call(null,null);
});

cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1 = (function (xform){
return cljs.core.async.promise_chan.call(null,xform,null);
});

cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2 = (function (xform,ex_handler){
return cljs.core.async.chan.call(null,cljs.core.async.impl.buffers.promise_buffer.call(null),xform,ex_handler);
});

cljs.core.async.promise_chan.cljs$lang$maxFixedArity = 2;
/**
 * Returns a channel that will close after msecs
 */
cljs.core.async.timeout = (function cljs$core$async$timeout(msecs){
return cljs.core.async.impl.timers.timeout.call(null,msecs);
});
/**
 * takes a val from port. Must be called inside a (go ...) block. Will
 *   return nil if closed. Will park if nothing is available.
 *   Returns true unless port is already closed
 */
cljs.core.async._LT__BANG_ = (function cljs$core$async$_LT__BANG_(port){
throw (new Error("<! used not in (go ...) block"));
});
/**
 * Asynchronously takes a val from port, passing to fn1. Will pass nil
 * if closed. If on-caller? (default true) is true, and value is
 * immediately available, will call fn1 on calling thread.
 * Returns nil.
 */
cljs.core.async.take_BANG_ = (function cljs$core$async$take_BANG_(var_args){
var args13027 = [];
var len__9095__auto___13030 = arguments.length;
var i__9096__auto___13031 = (0);
while(true){
if((i__9096__auto___13031 < len__9095__auto___13030)){
args13027.push((arguments[i__9096__auto___13031]));

var G__13032 = (i__9096__auto___13031 + (1));
i__9096__auto___13031 = G__13032;
continue;
} else {
}
break;
}

var G__13029 = args13027.length;
switch (G__13029) {
case 2:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13027.length)].join('')));

}
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,fn1){
return cljs.core.async.take_BANG_.call(null,port,fn1,true);
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,fn1,on_caller_QMARK_){
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.fn_handler.call(null,fn1));
if(cljs.core.truth_(ret)){
var val_13034 = cljs.core.deref.call(null,ret);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,val_13034);
} else {
cljs.core.async.impl.dispatch.run.call(null,((function (val_13034,ret){
return (function (){
return fn1.call(null,val_13034);
});})(val_13034,ret))
);
}
} else {
}

return null;
});

cljs.core.async.take_BANG_.cljs$lang$maxFixedArity = 3;
cljs.core.async.nop = (function cljs$core$async$nop(_){
return null;
});
cljs.core.async.fhnop = cljs.core.async.fn_handler.call(null,cljs.core.async.nop);
/**
 * puts a val into port. nil values are not allowed. Must be called
 *   inside a (go ...) block. Will park if no buffer space is available.
 *   Returns true unless port is already closed.
 */
cljs.core.async._GT__BANG_ = (function cljs$core$async$_GT__BANG_(port,val){
throw (new Error(">! used not in (go ...) block"));
});
/**
 * Asynchronously puts a val into port, calling fn0 (if supplied) when
 * complete. nil values are not allowed. Will throw if closed. If
 * on-caller? (default true) is true, and the put is immediately
 * accepted, will call fn0 on calling thread.  Returns nil.
 */
cljs.core.async.put_BANG_ = (function cljs$core$async$put_BANG_(var_args){
var args13035 = [];
var len__9095__auto___13038 = arguments.length;
var i__9096__auto___13039 = (0);
while(true){
if((i__9096__auto___13039 < len__9095__auto___13038)){
args13035.push((arguments[i__9096__auto___13039]));

var G__13040 = (i__9096__auto___13039 + (1));
i__9096__auto___13039 = G__13040;
continue;
} else {
}
break;
}

var G__13037 = args13035.length;
switch (G__13037) {
case 2:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13035.length)].join('')));

}
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,val){
var temp__4655__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fhnop);
if(cljs.core.truth_(temp__4655__auto__)){
var ret = temp__4655__auto__;
return cljs.core.deref.call(null,ret);
} else {
return true;
}
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,val,fn1){
return cljs.core.async.put_BANG_.call(null,port,val,fn1,true);
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (port,val,fn1,on_caller_QMARK_){
var temp__4655__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fn_handler.call(null,fn1));
if(cljs.core.truth_(temp__4655__auto__)){
var retb = temp__4655__auto__;
var ret = cljs.core.deref.call(null,retb);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,ret);
} else {
cljs.core.async.impl.dispatch.run.call(null,((function (ret,retb,temp__4655__auto__){
return (function (){
return fn1.call(null,ret);
});})(ret,retb,temp__4655__auto__))
);
}

return ret;
} else {
return true;
}
});

cljs.core.async.put_BANG_.cljs$lang$maxFixedArity = 4;
cljs.core.async.close_BANG_ = (function cljs$core$async$close_BANG_(port){
return cljs.core.async.impl.protocols.close_BANG_.call(null,port);
});
cljs.core.async.random_array = (function cljs$core$async$random_array(n){
var a = (new Array(n));
var n__8940__auto___13042 = n;
var x_13043 = (0);
while(true){
if((x_13043 < n__8940__auto___13042)){
(a[x_13043] = (0));

var G__13044 = (x_13043 + (1));
x_13043 = G__13044;
continue;
} else {
}
break;
}

var i = (1);
while(true){
if(cljs.core._EQ_.call(null,i,n)){
return a;
} else {
var j = cljs.core.rand_int.call(null,i);
(a[i] = (a[j]));

(a[j] = i);

var G__13045 = (i + (1));
i = G__13045;
continue;
}
break;
}
});
cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.call(null,true);
if(typeof cljs.core.async.t_cljs$core$async13049 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async13049 = (function (alt_flag,flag,meta13050){
this.alt_flag = alt_flag;
this.flag = flag;
this.meta13050 = meta13050;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async13049.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (flag){
return (function (_13051,meta13050__$1){
var self__ = this;
var _13051__$1 = this;
return (new cljs.core.async.t_cljs$core$async13049(self__.alt_flag,self__.flag,meta13050__$1));
});})(flag))
;

cljs.core.async.t_cljs$core$async13049.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (flag){
return (function (_13051){
var self__ = this;
var _13051__$1 = this;
return self__.meta13050;
});})(flag))
;

cljs.core.async.t_cljs$core$async13049.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async13049.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref.call(null,self__.flag);
});})(flag))
;

cljs.core.async.t_cljs$core$async13049.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
return true;
});})(flag))
;

cljs.core.async.t_cljs$core$async13049.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.flag,null);

return true;
});})(flag))
;

cljs.core.async.t_cljs$core$async13049.getBasis = ((function (flag){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"alt-flag","alt-flag",-1794972754,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"private","private",-558947994),true,new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(cljs.core.PersistentVector.EMPTY))], null)),new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta13050","meta13050",-639022771,null)], null);
});})(flag))
;

cljs.core.async.t_cljs$core$async13049.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async13049.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async13049";

cljs.core.async.t_cljs$core$async13049.cljs$lang$ctorPrWriter = ((function (flag){
return (function (this__8635__auto__,writer__8636__auto__,opt__8637__auto__){
return cljs.core._write.call(null,writer__8636__auto__,"cljs.core.async/t_cljs$core$async13049");
});})(flag))
;

cljs.core.async.__GT_t_cljs$core$async13049 = ((function (flag){
return (function cljs$core$async$alt_flag_$___GT_t_cljs$core$async13049(alt_flag__$1,flag__$1,meta13050){
return (new cljs.core.async.t_cljs$core$async13049(alt_flag__$1,flag__$1,meta13050));
});})(flag))
;

}

return (new cljs.core.async.t_cljs$core$async13049(cljs$core$async$alt_flag,flag,cljs.core.PersistentArrayMap.EMPTY));
});
cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
if(typeof cljs.core.async.t_cljs$core$async13055 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async13055 = (function (alt_handler,flag,cb,meta13056){
this.alt_handler = alt_handler;
this.flag = flag;
this.cb = cb;
this.meta13056 = meta13056;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async13055.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_13057,meta13056__$1){
var self__ = this;
var _13057__$1 = this;
return (new cljs.core.async.t_cljs$core$async13055(self__.alt_handler,self__.flag,self__.cb,meta13056__$1));
});

cljs.core.async.t_cljs$core$async13055.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_13057){
var self__ = this;
var _13057__$1 = this;
return self__.meta13056;
});

cljs.core.async.t_cljs$core$async13055.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async13055.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.flag);
});

cljs.core.async.t_cljs$core$async13055.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
});

cljs.core.async.t_cljs$core$async13055.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit.call(null,self__.flag);

return self__.cb;
});

cljs.core.async.t_cljs$core$async13055.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"alt-handler","alt-handler",963786170,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"private","private",-558947994),true,new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null)], null)))], null)),new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta13056","meta13056",-1226213584,null)], null);
});

cljs.core.async.t_cljs$core$async13055.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async13055.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async13055";

cljs.core.async.t_cljs$core$async13055.cljs$lang$ctorPrWriter = (function (this__8635__auto__,writer__8636__auto__,opt__8637__auto__){
return cljs.core._write.call(null,writer__8636__auto__,"cljs.core.async/t_cljs$core$async13055");
});

cljs.core.async.__GT_t_cljs$core$async13055 = (function cljs$core$async$alt_handler_$___GT_t_cljs$core$async13055(alt_handler__$1,flag__$1,cb__$1,meta13056){
return (new cljs.core.async.t_cljs$core$async13055(alt_handler__$1,flag__$1,cb__$1,meta13056));
});

}

return (new cljs.core.async.t_cljs$core$async13055(cljs$core$async$alt_handler,flag,cb,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * returns derefable [val port] if immediate, nil if enqueued
 */
cljs.core.async.do_alts = (function cljs$core$async$do_alts(fret,ports,opts){
var flag = cljs.core.async.alt_flag.call(null);
var n = cljs.core.count.call(null,ports);
var idxs = cljs.core.async.random_array.call(null,n);
var priority = new cljs.core.Keyword(null,"priority","priority",1431093715).cljs$core$IFn$_invoke$arity$1(opts);
var ret = (function (){var i = (0);
while(true){
if((i < n)){
var idx = (cljs.core.truth_(priority)?i:(idxs[i]));
var port = cljs.core.nth.call(null,ports,idx);
var wport = ((cljs.core.vector_QMARK_.call(null,port))?port.call(null,(0)):null);
var vbox = (cljs.core.truth_(wport)?(function (){var val = port.call(null,(1));
return cljs.core.async.impl.protocols.put_BANG_.call(null,wport,val,cljs.core.async.alt_handler.call(null,flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (p1__13058_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__13058_SHARP_,wport], null));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.alt_handler.call(null,flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__13059_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__13059_SHARP_,port], null));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));
if(cljs.core.truth_(vbox)){
return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref.call(null,vbox),(function (){var or__8037__auto__ = wport;
if(cljs.core.truth_(or__8037__auto__)){
return or__8037__auto__;
} else {
return port;
}
})()], null));
} else {
var G__13060 = (i + (1));
i = G__13060;
continue;
}
} else {
return null;
}
break;
}
})();
var or__8037__auto__ = ret;
if(cljs.core.truth_(or__8037__auto__)){
return or__8037__auto__;
} else {
if(cljs.core.contains_QMARK_.call(null,opts,new cljs.core.Keyword(null,"default","default",-1987822328))){
var temp__4657__auto__ = (function (){var and__8025__auto__ = cljs.core.async.impl.protocols.active_QMARK_.call(null,flag);
if(cljs.core.truth_(and__8025__auto__)){
return cljs.core.async.impl.protocols.commit.call(null,flag);
} else {
return and__8025__auto__;
}
})();
if(cljs.core.truth_(temp__4657__auto__)){
var got = temp__4657__auto__;
return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",-1987822328)], null));
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Completes at most one of several channel operations. Must be called
 * inside a (go ...) block. ports is a vector of channel endpoints,
 * which can be either a channel to take from or a vector of
 *   [channel-to-put-to val-to-put], in any combination. Takes will be
 *   made as if by <!, and puts will be made as if by >!. Unless
 *   the :priority option is true, if more than one port operation is
 *   ready a non-deterministic choice will be made. If no operation is
 *   ready and a :default value is supplied, [default-val :default] will
 *   be returned, otherwise alts! will park until the first operation to
 *   become ready completes. Returns [val port] of the completed
 *   operation, where val is the value taken for takes, and a
 *   boolean (true unless already closed, as per put!) for puts.
 * 
 *   opts are passed as :key val ... Supported options:
 * 
 *   :default val - the value to use if none of the operations are immediately ready
 *   :priority true - (default nil) when true, the operations will be tried in order.
 * 
 *   Note: there is no guarantee that the port exps or val exprs will be
 *   used, nor in what order should they be, so they should not be
 *   depended upon for side effects.
 */
cljs.core.async.alts_BANG_ = (function cljs$core$async$alts_BANG_(var_args){
var args__9102__auto__ = [];
var len__9095__auto___13066 = arguments.length;
var i__9096__auto___13067 = (0);
while(true){
if((i__9096__auto___13067 < len__9095__auto___13066)){
args__9102__auto__.push((arguments[i__9096__auto___13067]));

var G__13068 = (i__9096__auto___13067 + (1));
i__9096__auto___13067 = G__13068;
continue;
} else {
}
break;
}

var argseq__9103__auto__ = ((((1) < args__9102__auto__.length))?(new cljs.core.IndexedSeq(args__9102__auto__.slice((1)),(0))):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__9103__auto__);
});

cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__13063){
var map__13064 = p__13063;
var map__13064__$1 = ((((!((map__13064 == null)))?((((map__13064.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13064.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13064):map__13064);
var opts = map__13064__$1;
throw (new Error("alts! used not in (go ...) block"));
});

cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1);

cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq13061){
var G__13062 = cljs.core.first.call(null,seq13061);
var seq13061__$1 = cljs.core.next.call(null,seq13061);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__13062,seq13061__$1);
});
/**
 * Puts a val into port if it's possible to do so immediately.
 *   nil values are not allowed. Never blocks. Returns true if offer succeeds.
 */
cljs.core.async.offer_BANG_ = (function cljs$core$async$offer_BANG_(port,val){
var ret = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fn_handler.call(null,cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref.call(null,ret);
} else {
return null;
}
});
/**
 * Takes a val from port if it's possible to do so immediately.
 *   Never blocks. Returns value if successful, nil otherwise.
 */
cljs.core.async.poll_BANG_ = (function cljs$core$async$poll_BANG_(port){
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.fn_handler.call(null,cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref.call(null,ret);
} else {
return null;
}
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes
 */
cljs.core.async.pipe = (function cljs$core$async$pipe(var_args){
var args13069 = [];
var len__9095__auto___13119 = arguments.length;
var i__9096__auto___13120 = (0);
while(true){
if((i__9096__auto___13120 < len__9095__auto___13119)){
args13069.push((arguments[i__9096__auto___13120]));

var G__13121 = (i__9096__auto___13120 + (1));
i__9096__auto___13120 = G__13121;
continue;
} else {
}
break;
}

var G__13071 = args13069.length;
switch (G__13071) {
case 2:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13069.length)].join('')));

}
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2 = (function (from,to){
return cljs.core.async.pipe.call(null,from,to,true);
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3 = (function (from,to,close_QMARK_){
var c__10543__auto___13123 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10543__auto___13123){
return (function (){
var f__10544__auto__ = (function (){var switch__10478__auto__ = ((function (c__10543__auto___13123){
return (function (state_13095){
var state_val_13096 = (state_13095[(1)]);
if((state_val_13096 === (7))){
var inst_13091 = (state_13095[(2)]);
var state_13095__$1 = state_13095;
var statearr_13097_13124 = state_13095__$1;
(statearr_13097_13124[(2)] = inst_13091);

(statearr_13097_13124[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13096 === (1))){
var state_13095__$1 = state_13095;
var statearr_13098_13125 = state_13095__$1;
(statearr_13098_13125[(2)] = null);

(statearr_13098_13125[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13096 === (4))){
var inst_13074 = (state_13095[(7)]);
var inst_13074__$1 = (state_13095[(2)]);
var inst_13075 = (inst_13074__$1 == null);
var state_13095__$1 = (function (){var statearr_13099 = state_13095;
(statearr_13099[(7)] = inst_13074__$1);

return statearr_13099;
})();
if(cljs.core.truth_(inst_13075)){
var statearr_13100_13126 = state_13095__$1;
(statearr_13100_13126[(1)] = (5));

} else {
var statearr_13101_13127 = state_13095__$1;
(statearr_13101_13127[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13096 === (13))){
var state_13095__$1 = state_13095;
var statearr_13102_13128 = state_13095__$1;
(statearr_13102_13128[(2)] = null);

(statearr_13102_13128[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13096 === (6))){
var inst_13074 = (state_13095[(7)]);
var state_13095__$1 = state_13095;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13095__$1,(11),to,inst_13074);
} else {
if((state_val_13096 === (3))){
var inst_13093 = (state_13095[(2)]);
var state_13095__$1 = state_13095;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13095__$1,inst_13093);
} else {
if((state_val_13096 === (12))){
var state_13095__$1 = state_13095;
var statearr_13103_13129 = state_13095__$1;
(statearr_13103_13129[(2)] = null);

(statearr_13103_13129[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13096 === (2))){
var state_13095__$1 = state_13095;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13095__$1,(4),from);
} else {
if((state_val_13096 === (11))){
var inst_13084 = (state_13095[(2)]);
var state_13095__$1 = state_13095;
if(cljs.core.truth_(inst_13084)){
var statearr_13104_13130 = state_13095__$1;
(statearr_13104_13130[(1)] = (12));

} else {
var statearr_13105_13131 = state_13095__$1;
(statearr_13105_13131[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13096 === (9))){
var state_13095__$1 = state_13095;
var statearr_13106_13132 = state_13095__$1;
(statearr_13106_13132[(2)] = null);

(statearr_13106_13132[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13096 === (5))){
var state_13095__$1 = state_13095;
if(cljs.core.truth_(close_QMARK_)){
var statearr_13107_13133 = state_13095__$1;
(statearr_13107_13133[(1)] = (8));

} else {
var statearr_13108_13134 = state_13095__$1;
(statearr_13108_13134[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13096 === (14))){
var inst_13089 = (state_13095[(2)]);
var state_13095__$1 = state_13095;
var statearr_13109_13135 = state_13095__$1;
(statearr_13109_13135[(2)] = inst_13089);

(statearr_13109_13135[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13096 === (10))){
var inst_13081 = (state_13095[(2)]);
var state_13095__$1 = state_13095;
var statearr_13110_13136 = state_13095__$1;
(statearr_13110_13136[(2)] = inst_13081);

(statearr_13110_13136[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13096 === (8))){
var inst_13078 = cljs.core.async.close_BANG_.call(null,to);
var state_13095__$1 = state_13095;
var statearr_13111_13137 = state_13095__$1;
(statearr_13111_13137[(2)] = inst_13078);

(statearr_13111_13137[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__10543__auto___13123))
;
return ((function (switch__10478__auto__,c__10543__auto___13123){
return (function() {
var cljs$core$async$state_machine__10479__auto__ = null;
var cljs$core$async$state_machine__10479__auto____0 = (function (){
var statearr_13115 = [null,null,null,null,null,null,null,null];
(statearr_13115[(0)] = cljs$core$async$state_machine__10479__auto__);

(statearr_13115[(1)] = (1));

return statearr_13115;
});
var cljs$core$async$state_machine__10479__auto____1 = (function (state_13095){
while(true){
var ret_value__10480__auto__ = (function (){try{while(true){
var result__10481__auto__ = switch__10478__auto__.call(null,state_13095);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10481__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10481__auto__;
}
break;
}
}catch (e13116){if((e13116 instanceof Object)){
var ex__10482__auto__ = e13116;
var statearr_13117_13138 = state_13095;
(statearr_13117_13138[(5)] = ex__10482__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13095);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e13116;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10480__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13139 = state_13095;
state_13095 = G__13139;
continue;
} else {
return ret_value__10480__auto__;
}
break;
}
});
cljs$core$async$state_machine__10479__auto__ = function(state_13095){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__10479__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__10479__auto____1.call(this,state_13095);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__10479__auto____0;
cljs$core$async$state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__10479__auto____1;
return cljs$core$async$state_machine__10479__auto__;
})()
;})(switch__10478__auto__,c__10543__auto___13123))
})();
var state__10545__auto__ = (function (){var statearr_13118 = f__10544__auto__.call(null);
(statearr_13118[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10543__auto___13123);

return statearr_13118;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10545__auto__);
});})(c__10543__auto___13123))
);


return to;
});

cljs.core.async.pipe.cljs$lang$maxFixedArity = 3;
cljs.core.async.pipeline_STAR_ = (function cljs$core$async$pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,type){
if((n > (0))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"pos?","pos?",-244377722,null),new cljs.core.Symbol(null,"n","n",-2092305744,null))))].join('')));
}

var jobs = cljs.core.async.chan.call(null,n);
var results = cljs.core.async.chan.call(null,n);
var process = ((function (jobs,results){
return (function (p__13323){
var vec__13324 = p__13323;
var v = cljs.core.nth.call(null,vec__13324,(0),null);
var p = cljs.core.nth.call(null,vec__13324,(1),null);
var job = vec__13324;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1),xf,ex_handler);
var c__10543__auto___13506 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10543__auto___13506,res,vec__13324,v,p,job,jobs,results){
return (function (){
var f__10544__auto__ = (function (){var switch__10478__auto__ = ((function (c__10543__auto___13506,res,vec__13324,v,p,job,jobs,results){
return (function (state_13329){
var state_val_13330 = (state_13329[(1)]);
if((state_val_13330 === (1))){
var state_13329__$1 = state_13329;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13329__$1,(2),res,v);
} else {
if((state_val_13330 === (2))){
var inst_13326 = (state_13329[(2)]);
var inst_13327 = cljs.core.async.close_BANG_.call(null,res);
var state_13329__$1 = (function (){var statearr_13331 = state_13329;
(statearr_13331[(7)] = inst_13326);

return statearr_13331;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13329__$1,inst_13327);
} else {
return null;
}
}
});})(c__10543__auto___13506,res,vec__13324,v,p,job,jobs,results))
;
return ((function (switch__10478__auto__,c__10543__auto___13506,res,vec__13324,v,p,job,jobs,results){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__10479__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__10479__auto____0 = (function (){
var statearr_13335 = [null,null,null,null,null,null,null,null];
(statearr_13335[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__10479__auto__);

(statearr_13335[(1)] = (1));

return statearr_13335;
});
var cljs$core$async$pipeline_STAR__$_state_machine__10479__auto____1 = (function (state_13329){
while(true){
var ret_value__10480__auto__ = (function (){try{while(true){
var result__10481__auto__ = switch__10478__auto__.call(null,state_13329);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10481__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10481__auto__;
}
break;
}
}catch (e13336){if((e13336 instanceof Object)){
var ex__10482__auto__ = e13336;
var statearr_13337_13507 = state_13329;
(statearr_13337_13507[(5)] = ex__10482__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13329);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e13336;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10480__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13508 = state_13329;
state_13329 = G__13508;
continue;
} else {
return ret_value__10480__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__10479__auto__ = function(state_13329){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__10479__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__10479__auto____1.call(this,state_13329);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__10479__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__10479__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__10479__auto__;
})()
;})(switch__10478__auto__,c__10543__auto___13506,res,vec__13324,v,p,job,jobs,results))
})();
var state__10545__auto__ = (function (){var statearr_13338 = f__10544__auto__.call(null);
(statearr_13338[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10543__auto___13506);

return statearr_13338;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10545__auto__);
});})(c__10543__auto___13506,res,vec__13324,v,p,job,jobs,results))
);


cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});})(jobs,results))
;
var async = ((function (jobs,results,process){
return (function (p__13339){
var vec__13340 = p__13339;
var v = cljs.core.nth.call(null,vec__13340,(0),null);
var p = cljs.core.nth.call(null,vec__13340,(1),null);
var job = vec__13340;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1));
xf.call(null,v,res);

cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});})(jobs,results,process))
;
var n__8940__auto___13509 = n;
var __13510 = (0);
while(true){
if((__13510 < n__8940__auto___13509)){
var G__13341_13511 = (((type instanceof cljs.core.Keyword))?type.fqn:null);
switch (G__13341_13511) {
case "compute":
var c__10543__auto___13513 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__13510,c__10543__auto___13513,G__13341_13511,n__8940__auto___13509,jobs,results,process,async){
return (function (){
var f__10544__auto__ = (function (){var switch__10478__auto__ = ((function (__13510,c__10543__auto___13513,G__13341_13511,n__8940__auto___13509,jobs,results,process,async){
return (function (state_13354){
var state_val_13355 = (state_13354[(1)]);
if((state_val_13355 === (1))){
var state_13354__$1 = state_13354;
var statearr_13356_13514 = state_13354__$1;
(statearr_13356_13514[(2)] = null);

(statearr_13356_13514[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13355 === (2))){
var state_13354__$1 = state_13354;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13354__$1,(4),jobs);
} else {
if((state_val_13355 === (3))){
var inst_13352 = (state_13354[(2)]);
var state_13354__$1 = state_13354;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13354__$1,inst_13352);
} else {
if((state_val_13355 === (4))){
var inst_13344 = (state_13354[(2)]);
var inst_13345 = process.call(null,inst_13344);
var state_13354__$1 = state_13354;
if(cljs.core.truth_(inst_13345)){
var statearr_13357_13515 = state_13354__$1;
(statearr_13357_13515[(1)] = (5));

} else {
var statearr_13358_13516 = state_13354__$1;
(statearr_13358_13516[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13355 === (5))){
var state_13354__$1 = state_13354;
var statearr_13359_13517 = state_13354__$1;
(statearr_13359_13517[(2)] = null);

(statearr_13359_13517[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13355 === (6))){
var state_13354__$1 = state_13354;
var statearr_13360_13518 = state_13354__$1;
(statearr_13360_13518[(2)] = null);

(statearr_13360_13518[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13355 === (7))){
var inst_13350 = (state_13354[(2)]);
var state_13354__$1 = state_13354;
var statearr_13361_13519 = state_13354__$1;
(statearr_13361_13519[(2)] = inst_13350);

(statearr_13361_13519[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(__13510,c__10543__auto___13513,G__13341_13511,n__8940__auto___13509,jobs,results,process,async))
;
return ((function (__13510,switch__10478__auto__,c__10543__auto___13513,G__13341_13511,n__8940__auto___13509,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__10479__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__10479__auto____0 = (function (){
var statearr_13365 = [null,null,null,null,null,null,null];
(statearr_13365[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__10479__auto__);

(statearr_13365[(1)] = (1));

return statearr_13365;
});
var cljs$core$async$pipeline_STAR__$_state_machine__10479__auto____1 = (function (state_13354){
while(true){
var ret_value__10480__auto__ = (function (){try{while(true){
var result__10481__auto__ = switch__10478__auto__.call(null,state_13354);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10481__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10481__auto__;
}
break;
}
}catch (e13366){if((e13366 instanceof Object)){
var ex__10482__auto__ = e13366;
var statearr_13367_13520 = state_13354;
(statearr_13367_13520[(5)] = ex__10482__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13354);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e13366;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10480__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13521 = state_13354;
state_13354 = G__13521;
continue;
} else {
return ret_value__10480__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__10479__auto__ = function(state_13354){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__10479__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__10479__auto____1.call(this,state_13354);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__10479__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__10479__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__10479__auto__;
})()
;})(__13510,switch__10478__auto__,c__10543__auto___13513,G__13341_13511,n__8940__auto___13509,jobs,results,process,async))
})();
var state__10545__auto__ = (function (){var statearr_13368 = f__10544__auto__.call(null);
(statearr_13368[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10543__auto___13513);

return statearr_13368;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10545__auto__);
});})(__13510,c__10543__auto___13513,G__13341_13511,n__8940__auto___13509,jobs,results,process,async))
);


break;
case "async":
var c__10543__auto___13522 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__13510,c__10543__auto___13522,G__13341_13511,n__8940__auto___13509,jobs,results,process,async){
return (function (){
var f__10544__auto__ = (function (){var switch__10478__auto__ = ((function (__13510,c__10543__auto___13522,G__13341_13511,n__8940__auto___13509,jobs,results,process,async){
return (function (state_13381){
var state_val_13382 = (state_13381[(1)]);
if((state_val_13382 === (1))){
var state_13381__$1 = state_13381;
var statearr_13383_13523 = state_13381__$1;
(statearr_13383_13523[(2)] = null);

(statearr_13383_13523[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13382 === (2))){
var state_13381__$1 = state_13381;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13381__$1,(4),jobs);
} else {
if((state_val_13382 === (3))){
var inst_13379 = (state_13381[(2)]);
var state_13381__$1 = state_13381;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13381__$1,inst_13379);
} else {
if((state_val_13382 === (4))){
var inst_13371 = (state_13381[(2)]);
var inst_13372 = async.call(null,inst_13371);
var state_13381__$1 = state_13381;
if(cljs.core.truth_(inst_13372)){
var statearr_13384_13524 = state_13381__$1;
(statearr_13384_13524[(1)] = (5));

} else {
var statearr_13385_13525 = state_13381__$1;
(statearr_13385_13525[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13382 === (5))){
var state_13381__$1 = state_13381;
var statearr_13386_13526 = state_13381__$1;
(statearr_13386_13526[(2)] = null);

(statearr_13386_13526[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13382 === (6))){
var state_13381__$1 = state_13381;
var statearr_13387_13527 = state_13381__$1;
(statearr_13387_13527[(2)] = null);

(statearr_13387_13527[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13382 === (7))){
var inst_13377 = (state_13381[(2)]);
var state_13381__$1 = state_13381;
var statearr_13388_13528 = state_13381__$1;
(statearr_13388_13528[(2)] = inst_13377);

(statearr_13388_13528[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(__13510,c__10543__auto___13522,G__13341_13511,n__8940__auto___13509,jobs,results,process,async))
;
return ((function (__13510,switch__10478__auto__,c__10543__auto___13522,G__13341_13511,n__8940__auto___13509,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__10479__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__10479__auto____0 = (function (){
var statearr_13392 = [null,null,null,null,null,null,null];
(statearr_13392[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__10479__auto__);

(statearr_13392[(1)] = (1));

return statearr_13392;
});
var cljs$core$async$pipeline_STAR__$_state_machine__10479__auto____1 = (function (state_13381){
while(true){
var ret_value__10480__auto__ = (function (){try{while(true){
var result__10481__auto__ = switch__10478__auto__.call(null,state_13381);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10481__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10481__auto__;
}
break;
}
}catch (e13393){if((e13393 instanceof Object)){
var ex__10482__auto__ = e13393;
var statearr_13394_13529 = state_13381;
(statearr_13394_13529[(5)] = ex__10482__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13381);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e13393;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10480__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13530 = state_13381;
state_13381 = G__13530;
continue;
} else {
return ret_value__10480__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__10479__auto__ = function(state_13381){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__10479__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__10479__auto____1.call(this,state_13381);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__10479__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__10479__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__10479__auto__;
})()
;})(__13510,switch__10478__auto__,c__10543__auto___13522,G__13341_13511,n__8940__auto___13509,jobs,results,process,async))
})();
var state__10545__auto__ = (function (){var statearr_13395 = f__10544__auto__.call(null);
(statearr_13395[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10543__auto___13522);

return statearr_13395;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10545__auto__);
});})(__13510,c__10543__auto___13522,G__13341_13511,n__8940__auto___13509,jobs,results,process,async))
);


break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(type)].join('')));

}

var G__13531 = (__13510 + (1));
__13510 = G__13531;
continue;
} else {
}
break;
}

var c__10543__auto___13532 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10543__auto___13532,jobs,results,process,async){
return (function (){
var f__10544__auto__ = (function (){var switch__10478__auto__ = ((function (c__10543__auto___13532,jobs,results,process,async){
return (function (state_13417){
var state_val_13418 = (state_13417[(1)]);
if((state_val_13418 === (1))){
var state_13417__$1 = state_13417;
var statearr_13419_13533 = state_13417__$1;
(statearr_13419_13533[(2)] = null);

(statearr_13419_13533[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13418 === (2))){
var state_13417__$1 = state_13417;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13417__$1,(4),from);
} else {
if((state_val_13418 === (3))){
var inst_13415 = (state_13417[(2)]);
var state_13417__$1 = state_13417;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13417__$1,inst_13415);
} else {
if((state_val_13418 === (4))){
var inst_13398 = (state_13417[(7)]);
var inst_13398__$1 = (state_13417[(2)]);
var inst_13399 = (inst_13398__$1 == null);
var state_13417__$1 = (function (){var statearr_13420 = state_13417;
(statearr_13420[(7)] = inst_13398__$1);

return statearr_13420;
})();
if(cljs.core.truth_(inst_13399)){
var statearr_13421_13534 = state_13417__$1;
(statearr_13421_13534[(1)] = (5));

} else {
var statearr_13422_13535 = state_13417__$1;
(statearr_13422_13535[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13418 === (5))){
var inst_13401 = cljs.core.async.close_BANG_.call(null,jobs);
var state_13417__$1 = state_13417;
var statearr_13423_13536 = state_13417__$1;
(statearr_13423_13536[(2)] = inst_13401);

(statearr_13423_13536[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13418 === (6))){
var inst_13398 = (state_13417[(7)]);
var inst_13403 = (state_13417[(8)]);
var inst_13403__$1 = cljs.core.async.chan.call(null,(1));
var inst_13404 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_13405 = [inst_13398,inst_13403__$1];
var inst_13406 = (new cljs.core.PersistentVector(null,2,(5),inst_13404,inst_13405,null));
var state_13417__$1 = (function (){var statearr_13424 = state_13417;
(statearr_13424[(8)] = inst_13403__$1);

return statearr_13424;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13417__$1,(8),jobs,inst_13406);
} else {
if((state_val_13418 === (7))){
var inst_13413 = (state_13417[(2)]);
var state_13417__$1 = state_13417;
var statearr_13425_13537 = state_13417__$1;
(statearr_13425_13537[(2)] = inst_13413);

(statearr_13425_13537[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13418 === (8))){
var inst_13403 = (state_13417[(8)]);
var inst_13408 = (state_13417[(2)]);
var state_13417__$1 = (function (){var statearr_13426 = state_13417;
(statearr_13426[(9)] = inst_13408);

return statearr_13426;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13417__$1,(9),results,inst_13403);
} else {
if((state_val_13418 === (9))){
var inst_13410 = (state_13417[(2)]);
var state_13417__$1 = (function (){var statearr_13427 = state_13417;
(statearr_13427[(10)] = inst_13410);

return statearr_13427;
})();
var statearr_13428_13538 = state_13417__$1;
(statearr_13428_13538[(2)] = null);

(statearr_13428_13538[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
});})(c__10543__auto___13532,jobs,results,process,async))
;
return ((function (switch__10478__auto__,c__10543__auto___13532,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__10479__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__10479__auto____0 = (function (){
var statearr_13432 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_13432[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__10479__auto__);

(statearr_13432[(1)] = (1));

return statearr_13432;
});
var cljs$core$async$pipeline_STAR__$_state_machine__10479__auto____1 = (function (state_13417){
while(true){
var ret_value__10480__auto__ = (function (){try{while(true){
var result__10481__auto__ = switch__10478__auto__.call(null,state_13417);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10481__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10481__auto__;
}
break;
}
}catch (e13433){if((e13433 instanceof Object)){
var ex__10482__auto__ = e13433;
var statearr_13434_13539 = state_13417;
(statearr_13434_13539[(5)] = ex__10482__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13417);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e13433;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10480__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13540 = state_13417;
state_13417 = G__13540;
continue;
} else {
return ret_value__10480__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__10479__auto__ = function(state_13417){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__10479__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__10479__auto____1.call(this,state_13417);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__10479__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__10479__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__10479__auto__;
})()
;})(switch__10478__auto__,c__10543__auto___13532,jobs,results,process,async))
})();
var state__10545__auto__ = (function (){var statearr_13435 = f__10544__auto__.call(null);
(statearr_13435[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10543__auto___13532);

return statearr_13435;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10545__auto__);
});})(c__10543__auto___13532,jobs,results,process,async))
);


var c__10543__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10543__auto__,jobs,results,process,async){
return (function (){
var f__10544__auto__ = (function (){var switch__10478__auto__ = ((function (c__10543__auto__,jobs,results,process,async){
return (function (state_13473){
var state_val_13474 = (state_13473[(1)]);
if((state_val_13474 === (7))){
var inst_13469 = (state_13473[(2)]);
var state_13473__$1 = state_13473;
var statearr_13475_13541 = state_13473__$1;
(statearr_13475_13541[(2)] = inst_13469);

(statearr_13475_13541[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13474 === (20))){
var state_13473__$1 = state_13473;
var statearr_13476_13542 = state_13473__$1;
(statearr_13476_13542[(2)] = null);

(statearr_13476_13542[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13474 === (1))){
var state_13473__$1 = state_13473;
var statearr_13477_13543 = state_13473__$1;
(statearr_13477_13543[(2)] = null);

(statearr_13477_13543[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13474 === (4))){
var inst_13438 = (state_13473[(7)]);
var inst_13438__$1 = (state_13473[(2)]);
var inst_13439 = (inst_13438__$1 == null);
var state_13473__$1 = (function (){var statearr_13478 = state_13473;
(statearr_13478[(7)] = inst_13438__$1);

return statearr_13478;
})();
if(cljs.core.truth_(inst_13439)){
var statearr_13479_13544 = state_13473__$1;
(statearr_13479_13544[(1)] = (5));

} else {
var statearr_13480_13545 = state_13473__$1;
(statearr_13480_13545[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13474 === (15))){
var inst_13451 = (state_13473[(8)]);
var state_13473__$1 = state_13473;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13473__$1,(18),to,inst_13451);
} else {
if((state_val_13474 === (21))){
var inst_13464 = (state_13473[(2)]);
var state_13473__$1 = state_13473;
var statearr_13481_13546 = state_13473__$1;
(statearr_13481_13546[(2)] = inst_13464);

(statearr_13481_13546[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13474 === (13))){
var inst_13466 = (state_13473[(2)]);
var state_13473__$1 = (function (){var statearr_13482 = state_13473;
(statearr_13482[(9)] = inst_13466);

return statearr_13482;
})();
var statearr_13483_13547 = state_13473__$1;
(statearr_13483_13547[(2)] = null);

(statearr_13483_13547[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13474 === (6))){
var inst_13438 = (state_13473[(7)]);
var state_13473__$1 = state_13473;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13473__$1,(11),inst_13438);
} else {
if((state_val_13474 === (17))){
var inst_13459 = (state_13473[(2)]);
var state_13473__$1 = state_13473;
if(cljs.core.truth_(inst_13459)){
var statearr_13484_13548 = state_13473__$1;
(statearr_13484_13548[(1)] = (19));

} else {
var statearr_13485_13549 = state_13473__$1;
(statearr_13485_13549[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13474 === (3))){
var inst_13471 = (state_13473[(2)]);
var state_13473__$1 = state_13473;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13473__$1,inst_13471);
} else {
if((state_val_13474 === (12))){
var inst_13448 = (state_13473[(10)]);
var state_13473__$1 = state_13473;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13473__$1,(14),inst_13448);
} else {
if((state_val_13474 === (2))){
var state_13473__$1 = state_13473;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13473__$1,(4),results);
} else {
if((state_val_13474 === (19))){
var state_13473__$1 = state_13473;
var statearr_13486_13550 = state_13473__$1;
(statearr_13486_13550[(2)] = null);

(statearr_13486_13550[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13474 === (11))){
var inst_13448 = (state_13473[(2)]);
var state_13473__$1 = (function (){var statearr_13487 = state_13473;
(statearr_13487[(10)] = inst_13448);

return statearr_13487;
})();
var statearr_13488_13551 = state_13473__$1;
(statearr_13488_13551[(2)] = null);

(statearr_13488_13551[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13474 === (9))){
var state_13473__$1 = state_13473;
var statearr_13489_13552 = state_13473__$1;
(statearr_13489_13552[(2)] = null);

(statearr_13489_13552[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13474 === (5))){
var state_13473__$1 = state_13473;
if(cljs.core.truth_(close_QMARK_)){
var statearr_13490_13553 = state_13473__$1;
(statearr_13490_13553[(1)] = (8));

} else {
var statearr_13491_13554 = state_13473__$1;
(statearr_13491_13554[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13474 === (14))){
var inst_13451 = (state_13473[(8)]);
var inst_13453 = (state_13473[(11)]);
var inst_13451__$1 = (state_13473[(2)]);
var inst_13452 = (inst_13451__$1 == null);
var inst_13453__$1 = cljs.core.not.call(null,inst_13452);
var state_13473__$1 = (function (){var statearr_13492 = state_13473;
(statearr_13492[(8)] = inst_13451__$1);

(statearr_13492[(11)] = inst_13453__$1);

return statearr_13492;
})();
if(inst_13453__$1){
var statearr_13493_13555 = state_13473__$1;
(statearr_13493_13555[(1)] = (15));

} else {
var statearr_13494_13556 = state_13473__$1;
(statearr_13494_13556[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13474 === (16))){
var inst_13453 = (state_13473[(11)]);
var state_13473__$1 = state_13473;
var statearr_13495_13557 = state_13473__$1;
(statearr_13495_13557[(2)] = inst_13453);

(statearr_13495_13557[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13474 === (10))){
var inst_13445 = (state_13473[(2)]);
var state_13473__$1 = state_13473;
var statearr_13496_13558 = state_13473__$1;
(statearr_13496_13558[(2)] = inst_13445);

(statearr_13496_13558[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13474 === (18))){
var inst_13456 = (state_13473[(2)]);
var state_13473__$1 = state_13473;
var statearr_13497_13559 = state_13473__$1;
(statearr_13497_13559[(2)] = inst_13456);

(statearr_13497_13559[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13474 === (8))){
var inst_13442 = cljs.core.async.close_BANG_.call(null,to);
var state_13473__$1 = state_13473;
var statearr_13498_13560 = state_13473__$1;
(statearr_13498_13560[(2)] = inst_13442);

(statearr_13498_13560[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__10543__auto__,jobs,results,process,async))
;
return ((function (switch__10478__auto__,c__10543__auto__,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__10479__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__10479__auto____0 = (function (){
var statearr_13502 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_13502[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__10479__auto__);

(statearr_13502[(1)] = (1));

return statearr_13502;
});
var cljs$core$async$pipeline_STAR__$_state_machine__10479__auto____1 = (function (state_13473){
while(true){
var ret_value__10480__auto__ = (function (){try{while(true){
var result__10481__auto__ = switch__10478__auto__.call(null,state_13473);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10481__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10481__auto__;
}
break;
}
}catch (e13503){if((e13503 instanceof Object)){
var ex__10482__auto__ = e13503;
var statearr_13504_13561 = state_13473;
(statearr_13504_13561[(5)] = ex__10482__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13473);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e13503;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10480__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13562 = state_13473;
state_13473 = G__13562;
continue;
} else {
return ret_value__10480__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__10479__auto__ = function(state_13473){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__10479__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__10479__auto____1.call(this,state_13473);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__10479__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__10479__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__10479__auto__;
})()
;})(switch__10478__auto__,c__10543__auto__,jobs,results,process,async))
})();
var state__10545__auto__ = (function (){var statearr_13505 = f__10544__auto__.call(null);
(statearr_13505[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10543__auto__);

return statearr_13505;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10545__auto__);
});})(c__10543__auto__,jobs,results,process,async))
);

return c__10543__auto__;
});
/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the async function af, with parallelism n. af
 *   must be a function of two arguments, the first an input value and
 *   the second a channel on which to place the result(s). af must close!
 *   the channel before returning.  The presumption is that af will
 *   return immediately, having launched some asynchronous operation
 *   whose completion/callback will manipulate the result channel. Outputs
 *   will be returned in order relative to  the inputs. By default, the to
 *   channel will be closed when the from channel closes, but can be
 *   determined by the close?  parameter. Will stop consuming the from
 *   channel if the to channel closes.
 */
cljs.core.async.pipeline_async = (function cljs$core$async$pipeline_async(var_args){
var args13563 = [];
var len__9095__auto___13566 = arguments.length;
var i__9096__auto___13567 = (0);
while(true){
if((i__9096__auto___13567 < len__9095__auto___13566)){
args13563.push((arguments[i__9096__auto___13567]));

var G__13568 = (i__9096__auto___13567 + (1));
i__9096__auto___13567 = G__13568;
continue;
} else {
}
break;
}

var G__13565 = args13563.length;
switch (G__13565) {
case 4:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13563.length)].join('')));

}
});

cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4 = (function (n,to,af,from){
return cljs.core.async.pipeline_async.call(null,n,to,af,from,true);
});

cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5 = (function (n,to,af,from,close_QMARK_){
return cljs.core.async.pipeline_STAR_.call(null,n,to,af,from,close_QMARK_,null,new cljs.core.Keyword(null,"async","async",1050769601));
});

cljs.core.async.pipeline_async.cljs$lang$maxFixedArity = 5;
/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the transducer xf, with parallelism n. Because
 *   it is parallel, the transducer will be applied independently to each
 *   element, not across elements, and may produce zero or more outputs
 *   per input.  Outputs will be returned in order relative to the
 *   inputs. By default, the to channel will be closed when the from
 *   channel closes, but can be determined by the close?  parameter. Will
 *   stop consuming the from channel if the to channel closes.
 * 
 *   Note this is supplied for API compatibility with the Clojure version.
 *   Values of N > 1 will not result in actual concurrency in a
 *   single-threaded runtime.
 */
cljs.core.async.pipeline = (function cljs$core$async$pipeline(var_args){
var args13570 = [];
var len__9095__auto___13573 = arguments.length;
var i__9096__auto___13574 = (0);
while(true){
if((i__9096__auto___13574 < len__9095__auto___13573)){
args13570.push((arguments[i__9096__auto___13574]));

var G__13575 = (i__9096__auto___13574 + (1));
i__9096__auto___13574 = G__13575;
continue;
} else {
}
break;
}

var G__13572 = args13570.length;
switch (G__13572) {
case 4:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13570.length)].join('')));

}
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4 = (function (n,to,xf,from){
return cljs.core.async.pipeline.call(null,n,to,xf,from,true);
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5 = (function (n,to,xf,from,close_QMARK_){
return cljs.core.async.pipeline.call(null,n,to,xf,from,close_QMARK_,null);
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6 = (function (n,to,xf,from,close_QMARK_,ex_handler){
return cljs.core.async.pipeline_STAR_.call(null,n,to,xf,from,close_QMARK_,ex_handler,new cljs.core.Keyword(null,"compute","compute",1555393130));
});

cljs.core.async.pipeline.cljs$lang$maxFixedArity = 6;
/**
 * Takes a predicate and a source channel and returns a vector of two
 *   channels, the first of which will contain the values for which the
 *   predicate returned true, the second those for which it returned
 *   false.
 * 
 *   The out channels will be unbuffered by default, or two buf-or-ns can
 *   be supplied. The channels will close after the source channel has
 *   closed.
 */
cljs.core.async.split = (function cljs$core$async$split(var_args){
var args13577 = [];
var len__9095__auto___13630 = arguments.length;
var i__9096__auto___13631 = (0);
while(true){
if((i__9096__auto___13631 < len__9095__auto___13630)){
args13577.push((arguments[i__9096__auto___13631]));

var G__13632 = (i__9096__auto___13631 + (1));
i__9096__auto___13631 = G__13632;
continue;
} else {
}
break;
}

var G__13579 = args13577.length;
switch (G__13579) {
case 2:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13577.length)].join('')));

}
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.split.call(null,p,ch,null,null);
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$4 = (function (p,ch,t_buf_or_n,f_buf_or_n){
var tc = cljs.core.async.chan.call(null,t_buf_or_n);
var fc = cljs.core.async.chan.call(null,f_buf_or_n);
var c__10543__auto___13634 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10543__auto___13634,tc,fc){
return (function (){
var f__10544__auto__ = (function (){var switch__10478__auto__ = ((function (c__10543__auto___13634,tc,fc){
return (function (state_13605){
var state_val_13606 = (state_13605[(1)]);
if((state_val_13606 === (7))){
var inst_13601 = (state_13605[(2)]);
var state_13605__$1 = state_13605;
var statearr_13607_13635 = state_13605__$1;
(statearr_13607_13635[(2)] = inst_13601);

(statearr_13607_13635[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13606 === (1))){
var state_13605__$1 = state_13605;
var statearr_13608_13636 = state_13605__$1;
(statearr_13608_13636[(2)] = null);

(statearr_13608_13636[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13606 === (4))){
var inst_13582 = (state_13605[(7)]);
var inst_13582__$1 = (state_13605[(2)]);
var inst_13583 = (inst_13582__$1 == null);
var state_13605__$1 = (function (){var statearr_13609 = state_13605;
(statearr_13609[(7)] = inst_13582__$1);

return statearr_13609;
})();
if(cljs.core.truth_(inst_13583)){
var statearr_13610_13637 = state_13605__$1;
(statearr_13610_13637[(1)] = (5));

} else {
var statearr_13611_13638 = state_13605__$1;
(statearr_13611_13638[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13606 === (13))){
var state_13605__$1 = state_13605;
var statearr_13612_13639 = state_13605__$1;
(statearr_13612_13639[(2)] = null);

(statearr_13612_13639[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13606 === (6))){
var inst_13582 = (state_13605[(7)]);
var inst_13588 = p.call(null,inst_13582);
var state_13605__$1 = state_13605;
if(cljs.core.truth_(inst_13588)){
var statearr_13613_13640 = state_13605__$1;
(statearr_13613_13640[(1)] = (9));

} else {
var statearr_13614_13641 = state_13605__$1;
(statearr_13614_13641[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13606 === (3))){
var inst_13603 = (state_13605[(2)]);
var state_13605__$1 = state_13605;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13605__$1,inst_13603);
} else {
if((state_val_13606 === (12))){
var state_13605__$1 = state_13605;
var statearr_13615_13642 = state_13605__$1;
(statearr_13615_13642[(2)] = null);

(statearr_13615_13642[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13606 === (2))){
var state_13605__$1 = state_13605;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13605__$1,(4),ch);
} else {
if((state_val_13606 === (11))){
var inst_13582 = (state_13605[(7)]);
var inst_13592 = (state_13605[(2)]);
var state_13605__$1 = state_13605;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13605__$1,(8),inst_13592,inst_13582);
} else {
if((state_val_13606 === (9))){
var state_13605__$1 = state_13605;
var statearr_13616_13643 = state_13605__$1;
(statearr_13616_13643[(2)] = tc);

(statearr_13616_13643[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13606 === (5))){
var inst_13585 = cljs.core.async.close_BANG_.call(null,tc);
var inst_13586 = cljs.core.async.close_BANG_.call(null,fc);
var state_13605__$1 = (function (){var statearr_13617 = state_13605;
(statearr_13617[(8)] = inst_13585);

return statearr_13617;
})();
var statearr_13618_13644 = state_13605__$1;
(statearr_13618_13644[(2)] = inst_13586);

(statearr_13618_13644[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13606 === (14))){
var inst_13599 = (state_13605[(2)]);
var state_13605__$1 = state_13605;
var statearr_13619_13645 = state_13605__$1;
(statearr_13619_13645[(2)] = inst_13599);

(statearr_13619_13645[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13606 === (10))){
var state_13605__$1 = state_13605;
var statearr_13620_13646 = state_13605__$1;
(statearr_13620_13646[(2)] = fc);

(statearr_13620_13646[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13606 === (8))){
var inst_13594 = (state_13605[(2)]);
var state_13605__$1 = state_13605;
if(cljs.core.truth_(inst_13594)){
var statearr_13621_13647 = state_13605__$1;
(statearr_13621_13647[(1)] = (12));

} else {
var statearr_13622_13648 = state_13605__$1;
(statearr_13622_13648[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__10543__auto___13634,tc,fc))
;
return ((function (switch__10478__auto__,c__10543__auto___13634,tc,fc){
return (function() {
var cljs$core$async$state_machine__10479__auto__ = null;
var cljs$core$async$state_machine__10479__auto____0 = (function (){
var statearr_13626 = [null,null,null,null,null,null,null,null,null];
(statearr_13626[(0)] = cljs$core$async$state_machine__10479__auto__);

(statearr_13626[(1)] = (1));

return statearr_13626;
});
var cljs$core$async$state_machine__10479__auto____1 = (function (state_13605){
while(true){
var ret_value__10480__auto__ = (function (){try{while(true){
var result__10481__auto__ = switch__10478__auto__.call(null,state_13605);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10481__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10481__auto__;
}
break;
}
}catch (e13627){if((e13627 instanceof Object)){
var ex__10482__auto__ = e13627;
var statearr_13628_13649 = state_13605;
(statearr_13628_13649[(5)] = ex__10482__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13605);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e13627;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10480__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13650 = state_13605;
state_13605 = G__13650;
continue;
} else {
return ret_value__10480__auto__;
}
break;
}
});
cljs$core$async$state_machine__10479__auto__ = function(state_13605){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__10479__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__10479__auto____1.call(this,state_13605);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__10479__auto____0;
cljs$core$async$state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__10479__auto____1;
return cljs$core$async$state_machine__10479__auto__;
})()
;})(switch__10478__auto__,c__10543__auto___13634,tc,fc))
})();
var state__10545__auto__ = (function (){var statearr_13629 = f__10544__auto__.call(null);
(statearr_13629[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10543__auto___13634);

return statearr_13629;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10545__auto__);
});})(c__10543__auto___13634,tc,fc))
);


return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tc,fc], null);
});

cljs.core.async.split.cljs$lang$maxFixedArity = 4;
/**
 * f should be a function of 2 arguments. Returns a channel containing
 *   the single result of applying f to init and the first item from the
 *   channel, then applying f to that result and the 2nd item, etc. If
 *   the channel closes without yielding items, returns init and f is not
 *   called. ch must close before reduce produces a result.
 */
cljs.core.async.reduce = (function cljs$core$async$reduce(f,init,ch){
var c__10543__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10543__auto__){
return (function (){
var f__10544__auto__ = (function (){var switch__10478__auto__ = ((function (c__10543__auto__){
return (function (state_13714){
var state_val_13715 = (state_13714[(1)]);
if((state_val_13715 === (7))){
var inst_13710 = (state_13714[(2)]);
var state_13714__$1 = state_13714;
var statearr_13716_13737 = state_13714__$1;
(statearr_13716_13737[(2)] = inst_13710);

(statearr_13716_13737[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13715 === (1))){
var inst_13694 = init;
var state_13714__$1 = (function (){var statearr_13717 = state_13714;
(statearr_13717[(7)] = inst_13694);

return statearr_13717;
})();
var statearr_13718_13738 = state_13714__$1;
(statearr_13718_13738[(2)] = null);

(statearr_13718_13738[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13715 === (4))){
var inst_13697 = (state_13714[(8)]);
var inst_13697__$1 = (state_13714[(2)]);
var inst_13698 = (inst_13697__$1 == null);
var state_13714__$1 = (function (){var statearr_13719 = state_13714;
(statearr_13719[(8)] = inst_13697__$1);

return statearr_13719;
})();
if(cljs.core.truth_(inst_13698)){
var statearr_13720_13739 = state_13714__$1;
(statearr_13720_13739[(1)] = (5));

} else {
var statearr_13721_13740 = state_13714__$1;
(statearr_13721_13740[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13715 === (6))){
var inst_13697 = (state_13714[(8)]);
var inst_13694 = (state_13714[(7)]);
var inst_13701 = (state_13714[(9)]);
var inst_13701__$1 = f.call(null,inst_13694,inst_13697);
var inst_13702 = cljs.core.reduced_QMARK_.call(null,inst_13701__$1);
var state_13714__$1 = (function (){var statearr_13722 = state_13714;
(statearr_13722[(9)] = inst_13701__$1);

return statearr_13722;
})();
if(inst_13702){
var statearr_13723_13741 = state_13714__$1;
(statearr_13723_13741[(1)] = (8));

} else {
var statearr_13724_13742 = state_13714__$1;
(statearr_13724_13742[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13715 === (3))){
var inst_13712 = (state_13714[(2)]);
var state_13714__$1 = state_13714;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13714__$1,inst_13712);
} else {
if((state_val_13715 === (2))){
var state_13714__$1 = state_13714;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13714__$1,(4),ch);
} else {
if((state_val_13715 === (9))){
var inst_13701 = (state_13714[(9)]);
var inst_13694 = inst_13701;
var state_13714__$1 = (function (){var statearr_13725 = state_13714;
(statearr_13725[(7)] = inst_13694);

return statearr_13725;
})();
var statearr_13726_13743 = state_13714__$1;
(statearr_13726_13743[(2)] = null);

(statearr_13726_13743[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13715 === (5))){
var inst_13694 = (state_13714[(7)]);
var state_13714__$1 = state_13714;
var statearr_13727_13744 = state_13714__$1;
(statearr_13727_13744[(2)] = inst_13694);

(statearr_13727_13744[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13715 === (10))){
var inst_13708 = (state_13714[(2)]);
var state_13714__$1 = state_13714;
var statearr_13728_13745 = state_13714__$1;
(statearr_13728_13745[(2)] = inst_13708);

(statearr_13728_13745[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13715 === (8))){
var inst_13701 = (state_13714[(9)]);
var inst_13704 = cljs.core.deref.call(null,inst_13701);
var state_13714__$1 = state_13714;
var statearr_13729_13746 = state_13714__$1;
(statearr_13729_13746[(2)] = inst_13704);

(statearr_13729_13746[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
});})(c__10543__auto__))
;
return ((function (switch__10478__auto__,c__10543__auto__){
return (function() {
var cljs$core$async$reduce_$_state_machine__10479__auto__ = null;
var cljs$core$async$reduce_$_state_machine__10479__auto____0 = (function (){
var statearr_13733 = [null,null,null,null,null,null,null,null,null,null];
(statearr_13733[(0)] = cljs$core$async$reduce_$_state_machine__10479__auto__);

(statearr_13733[(1)] = (1));

return statearr_13733;
});
var cljs$core$async$reduce_$_state_machine__10479__auto____1 = (function (state_13714){
while(true){
var ret_value__10480__auto__ = (function (){try{while(true){
var result__10481__auto__ = switch__10478__auto__.call(null,state_13714);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10481__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10481__auto__;
}
break;
}
}catch (e13734){if((e13734 instanceof Object)){
var ex__10482__auto__ = e13734;
var statearr_13735_13747 = state_13714;
(statearr_13735_13747[(5)] = ex__10482__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13714);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e13734;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10480__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13748 = state_13714;
state_13714 = G__13748;
continue;
} else {
return ret_value__10480__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__10479__auto__ = function(state_13714){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__10479__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__10479__auto____1.call(this,state_13714);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__10479__auto____0;
cljs$core$async$reduce_$_state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__10479__auto____1;
return cljs$core$async$reduce_$_state_machine__10479__auto__;
})()
;})(switch__10478__auto__,c__10543__auto__))
})();
var state__10545__auto__ = (function (){var statearr_13736 = f__10544__auto__.call(null);
(statearr_13736[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10543__auto__);

return statearr_13736;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10545__auto__);
});})(c__10543__auto__))
);

return c__10543__auto__;
});
/**
 * async/reduces a channel with a transformation (xform f).
 *   Returns a channel containing the result.  ch must close before
 *   transduce produces a result.
 */
cljs.core.async.transduce = (function cljs$core$async$transduce(xform,f,init,ch){
var f__$1 = xform.call(null,f);
var c__10543__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10543__auto__,f__$1){
return (function (){
var f__10544__auto__ = (function (){var switch__10478__auto__ = ((function (c__10543__auto__,f__$1){
return (function (state_13768){
var state_val_13769 = (state_13768[(1)]);
if((state_val_13769 === (1))){
var inst_13763 = cljs.core.async.reduce.call(null,f__$1,init,ch);
var state_13768__$1 = state_13768;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13768__$1,(2),inst_13763);
} else {
if((state_val_13769 === (2))){
var inst_13765 = (state_13768[(2)]);
var inst_13766 = f__$1.call(null,inst_13765);
var state_13768__$1 = state_13768;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13768__$1,inst_13766);
} else {
return null;
}
}
});})(c__10543__auto__,f__$1))
;
return ((function (switch__10478__auto__,c__10543__auto__,f__$1){
return (function() {
var cljs$core$async$transduce_$_state_machine__10479__auto__ = null;
var cljs$core$async$transduce_$_state_machine__10479__auto____0 = (function (){
var statearr_13773 = [null,null,null,null,null,null,null];
(statearr_13773[(0)] = cljs$core$async$transduce_$_state_machine__10479__auto__);

(statearr_13773[(1)] = (1));

return statearr_13773;
});
var cljs$core$async$transduce_$_state_machine__10479__auto____1 = (function (state_13768){
while(true){
var ret_value__10480__auto__ = (function (){try{while(true){
var result__10481__auto__ = switch__10478__auto__.call(null,state_13768);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10481__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10481__auto__;
}
break;
}
}catch (e13774){if((e13774 instanceof Object)){
var ex__10482__auto__ = e13774;
var statearr_13775_13777 = state_13768;
(statearr_13775_13777[(5)] = ex__10482__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13768);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e13774;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10480__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13778 = state_13768;
state_13768 = G__13778;
continue;
} else {
return ret_value__10480__auto__;
}
break;
}
});
cljs$core$async$transduce_$_state_machine__10479__auto__ = function(state_13768){
switch(arguments.length){
case 0:
return cljs$core$async$transduce_$_state_machine__10479__auto____0.call(this);
case 1:
return cljs$core$async$transduce_$_state_machine__10479__auto____1.call(this,state_13768);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$transduce_$_state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$transduce_$_state_machine__10479__auto____0;
cljs$core$async$transduce_$_state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$transduce_$_state_machine__10479__auto____1;
return cljs$core$async$transduce_$_state_machine__10479__auto__;
})()
;})(switch__10478__auto__,c__10543__auto__,f__$1))
})();
var state__10545__auto__ = (function (){var statearr_13776 = f__10544__auto__.call(null);
(statearr_13776[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10543__auto__);

return statearr_13776;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10545__auto__);
});})(c__10543__auto__,f__$1))
);

return c__10543__auto__;
});
/**
 * Puts the contents of coll into the supplied channel.
 * 
 *   By default the channel will be closed after the items are copied,
 *   but can be determined by the close? parameter.
 * 
 *   Returns a channel which will close after the items are copied.
 */
cljs.core.async.onto_chan = (function cljs$core$async$onto_chan(var_args){
var args13779 = [];
var len__9095__auto___13831 = arguments.length;
var i__9096__auto___13832 = (0);
while(true){
if((i__9096__auto___13832 < len__9095__auto___13831)){
args13779.push((arguments[i__9096__auto___13832]));

var G__13833 = (i__9096__auto___13832 + (1));
i__9096__auto___13832 = G__13833;
continue;
} else {
}
break;
}

var G__13781 = args13779.length;
switch (G__13781) {
case 2:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13779.length)].join('')));

}
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan.call(null,ch,coll,true);
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
var c__10543__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10543__auto__){
return (function (){
var f__10544__auto__ = (function (){var switch__10478__auto__ = ((function (c__10543__auto__){
return (function (state_13806){
var state_val_13807 = (state_13806[(1)]);
if((state_val_13807 === (7))){
var inst_13788 = (state_13806[(2)]);
var state_13806__$1 = state_13806;
var statearr_13808_13835 = state_13806__$1;
(statearr_13808_13835[(2)] = inst_13788);

(statearr_13808_13835[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13807 === (1))){
var inst_13782 = cljs.core.seq.call(null,coll);
var inst_13783 = inst_13782;
var state_13806__$1 = (function (){var statearr_13809 = state_13806;
(statearr_13809[(7)] = inst_13783);

return statearr_13809;
})();
var statearr_13810_13836 = state_13806__$1;
(statearr_13810_13836[(2)] = null);

(statearr_13810_13836[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13807 === (4))){
var inst_13783 = (state_13806[(7)]);
var inst_13786 = cljs.core.first.call(null,inst_13783);
var state_13806__$1 = state_13806;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13806__$1,(7),ch,inst_13786);
} else {
if((state_val_13807 === (13))){
var inst_13800 = (state_13806[(2)]);
var state_13806__$1 = state_13806;
var statearr_13811_13837 = state_13806__$1;
(statearr_13811_13837[(2)] = inst_13800);

(statearr_13811_13837[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13807 === (6))){
var inst_13791 = (state_13806[(2)]);
var state_13806__$1 = state_13806;
if(cljs.core.truth_(inst_13791)){
var statearr_13812_13838 = state_13806__$1;
(statearr_13812_13838[(1)] = (8));

} else {
var statearr_13813_13839 = state_13806__$1;
(statearr_13813_13839[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13807 === (3))){
var inst_13804 = (state_13806[(2)]);
var state_13806__$1 = state_13806;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13806__$1,inst_13804);
} else {
if((state_val_13807 === (12))){
var state_13806__$1 = state_13806;
var statearr_13814_13840 = state_13806__$1;
(statearr_13814_13840[(2)] = null);

(statearr_13814_13840[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13807 === (2))){
var inst_13783 = (state_13806[(7)]);
var state_13806__$1 = state_13806;
if(cljs.core.truth_(inst_13783)){
var statearr_13815_13841 = state_13806__$1;
(statearr_13815_13841[(1)] = (4));

} else {
var statearr_13816_13842 = state_13806__$1;
(statearr_13816_13842[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13807 === (11))){
var inst_13797 = cljs.core.async.close_BANG_.call(null,ch);
var state_13806__$1 = state_13806;
var statearr_13817_13843 = state_13806__$1;
(statearr_13817_13843[(2)] = inst_13797);

(statearr_13817_13843[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13807 === (9))){
var state_13806__$1 = state_13806;
if(cljs.core.truth_(close_QMARK_)){
var statearr_13818_13844 = state_13806__$1;
(statearr_13818_13844[(1)] = (11));

} else {
var statearr_13819_13845 = state_13806__$1;
(statearr_13819_13845[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13807 === (5))){
var inst_13783 = (state_13806[(7)]);
var state_13806__$1 = state_13806;
var statearr_13820_13846 = state_13806__$1;
(statearr_13820_13846[(2)] = inst_13783);

(statearr_13820_13846[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13807 === (10))){
var inst_13802 = (state_13806[(2)]);
var state_13806__$1 = state_13806;
var statearr_13821_13847 = state_13806__$1;
(statearr_13821_13847[(2)] = inst_13802);

(statearr_13821_13847[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13807 === (8))){
var inst_13783 = (state_13806[(7)]);
var inst_13793 = cljs.core.next.call(null,inst_13783);
var inst_13783__$1 = inst_13793;
var state_13806__$1 = (function (){var statearr_13822 = state_13806;
(statearr_13822[(7)] = inst_13783__$1);

return statearr_13822;
})();
var statearr_13823_13848 = state_13806__$1;
(statearr_13823_13848[(2)] = null);

(statearr_13823_13848[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__10543__auto__))
;
return ((function (switch__10478__auto__,c__10543__auto__){
return (function() {
var cljs$core$async$state_machine__10479__auto__ = null;
var cljs$core$async$state_machine__10479__auto____0 = (function (){
var statearr_13827 = [null,null,null,null,null,null,null,null];
(statearr_13827[(0)] = cljs$core$async$state_machine__10479__auto__);

(statearr_13827[(1)] = (1));

return statearr_13827;
});
var cljs$core$async$state_machine__10479__auto____1 = (function (state_13806){
while(true){
var ret_value__10480__auto__ = (function (){try{while(true){
var result__10481__auto__ = switch__10478__auto__.call(null,state_13806);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10481__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10481__auto__;
}
break;
}
}catch (e13828){if((e13828 instanceof Object)){
var ex__10482__auto__ = e13828;
var statearr_13829_13849 = state_13806;
(statearr_13829_13849[(5)] = ex__10482__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13806);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e13828;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10480__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13850 = state_13806;
state_13806 = G__13850;
continue;
} else {
return ret_value__10480__auto__;
}
break;
}
});
cljs$core$async$state_machine__10479__auto__ = function(state_13806){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__10479__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__10479__auto____1.call(this,state_13806);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__10479__auto____0;
cljs$core$async$state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__10479__auto____1;
return cljs$core$async$state_machine__10479__auto__;
})()
;})(switch__10478__auto__,c__10543__auto__))
})();
var state__10545__auto__ = (function (){var statearr_13830 = f__10544__auto__.call(null);
(statearr_13830[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10543__auto__);

return statearr_13830;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10545__auto__);
});})(c__10543__auto__))
);

return c__10543__auto__;
});

cljs.core.async.onto_chan.cljs$lang$maxFixedArity = 3;
/**
 * Creates and returns a channel which contains the contents of coll,
 *   closing when exhausted.
 */
cljs.core.async.to_chan = (function cljs$core$async$to_chan(coll){
var ch = cljs.core.async.chan.call(null,cljs.core.bounded_count.call(null,(100),coll));
cljs.core.async.onto_chan.call(null,ch,coll);

return ch;
});

/**
 * @interface
 */
cljs.core.async.Mux = function(){};

cljs.core.async.muxch_STAR_ = (function cljs$core$async$muxch_STAR_(_){
if((!((_ == null))) && (!((_.cljs$core$async$Mux$muxch_STAR_$arity$1 == null)))){
return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else {
var x__8692__auto__ = (((_ == null))?null:_);
var m__8693__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__8692__auto__)]);
if(!((m__8693__auto__ == null))){
return m__8693__auto__.call(null,_);
} else {
var m__8693__auto____$1 = (cljs.core.async.muxch_STAR_["_"]);
if(!((m__8693__auto____$1 == null))){
return m__8693__auto____$1.call(null,_);
} else {
throw cljs.core.missing_protocol.call(null,"Mux.muxch*",_);
}
}
}
});


/**
 * @interface
 */
cljs.core.async.Mult = function(){};

cljs.core.async.tap_STAR_ = (function cljs$core$async$tap_STAR_(m,ch,close_QMARK_){
if((!((m == null))) && (!((m.cljs$core$async$Mult$tap_STAR_$arity$3 == null)))){
return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else {
var x__8692__auto__ = (((m == null))?null:m);
var m__8693__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__8692__auto__)]);
if(!((m__8693__auto__ == null))){
return m__8693__auto__.call(null,m,ch,close_QMARK_);
} else {
var m__8693__auto____$1 = (cljs.core.async.tap_STAR_["_"]);
if(!((m__8693__auto____$1 == null))){
return m__8693__auto____$1.call(null,m,ch,close_QMARK_);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.tap*",m);
}
}
}
});

cljs.core.async.untap_STAR_ = (function cljs$core$async$untap_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mult$untap_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else {
var x__8692__auto__ = (((m == null))?null:m);
var m__8693__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__8692__auto__)]);
if(!((m__8693__auto__ == null))){
return m__8693__auto__.call(null,m,ch);
} else {
var m__8693__auto____$1 = (cljs.core.async.untap_STAR_["_"]);
if(!((m__8693__auto____$1 == null))){
return m__8693__auto____$1.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.untap*",m);
}
}
}
});

cljs.core.async.untap_all_STAR_ = (function cljs$core$async$untap_all_STAR_(m){
if((!((m == null))) && (!((m.cljs$core$async$Mult$untap_all_STAR_$arity$1 == null)))){
return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else {
var x__8692__auto__ = (((m == null))?null:m);
var m__8693__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__8692__auto__)]);
if(!((m__8693__auto__ == null))){
return m__8693__auto__.call(null,m);
} else {
var m__8693__auto____$1 = (cljs.core.async.untap_all_STAR_["_"]);
if(!((m__8693__auto____$1 == null))){
return m__8693__auto____$1.call(null,m);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.untap-all*",m);
}
}
}
});

/**
 * Creates and returns a mult(iple) of the supplied channel. Channels
 *   containing copies of the channel can be created with 'tap', and
 *   detached with 'untap'.
 * 
 *   Each item is distributed to all taps in parallel and synchronously,
 *   i.e. each tap must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow taps from holding up the mult.
 * 
 *   Items received when there are no taps get dropped.
 * 
 *   If a tap puts to a closed channel, it will be removed from the mult.
 */
cljs.core.async.mult = (function cljs$core$async$mult(ch){
var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var m = (function (){
if(typeof cljs.core.async.t_cljs$core$async14072 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async14072 = (function (mult,ch,cs,meta14073){
this.mult = mult;
this.ch = ch;
this.cs = cs;
this.meta14073 = meta14073;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async14072.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs){
return (function (_14074,meta14073__$1){
var self__ = this;
var _14074__$1 = this;
return (new cljs.core.async.t_cljs$core$async14072(self__.mult,self__.ch,self__.cs,meta14073__$1));
});})(cs))
;

cljs.core.async.t_cljs$core$async14072.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs){
return (function (_14074){
var self__ = this;
var _14074__$1 = this;
return self__.meta14073;
});})(cs))
;

cljs.core.async.t_cljs$core$async14072.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async14072.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(cs))
;

cljs.core.async.t_cljs$core$async14072.prototype.cljs$core$async$Mult$ = true;

cljs.core.async.t_cljs$core$async14072.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = ((function (cs){
return (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async14072.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = ((function (cs){
return (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch__$1);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async14072.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async14072.getBasis = ((function (cs){
return (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"mult","mult",-1187640995,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Creates and returns a mult(iple) of the supplied channel. Channels\n  containing copies of the channel can be created with 'tap', and\n  detached with 'untap'.\n\n  Each item is distributed to all taps in parallel and synchronously,\n  i.e. each tap must accept before the next item is distributed. Use\n  buffering/windowing to prevent slow taps from holding up the mult.\n\n  Items received when there are no taps get dropped.\n\n  If a tap puts to a closed channel, it will be removed from the mult."], null)),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta14073","meta14073",-2091047928,null)], null);
});})(cs))
;

cljs.core.async.t_cljs$core$async14072.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async14072.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async14072";

cljs.core.async.t_cljs$core$async14072.cljs$lang$ctorPrWriter = ((function (cs){
return (function (this__8635__auto__,writer__8636__auto__,opt__8637__auto__){
return cljs.core._write.call(null,writer__8636__auto__,"cljs.core.async/t_cljs$core$async14072");
});})(cs))
;

cljs.core.async.__GT_t_cljs$core$async14072 = ((function (cs){
return (function cljs$core$async$mult_$___GT_t_cljs$core$async14072(mult__$1,ch__$1,cs__$1,meta14073){
return (new cljs.core.async.t_cljs$core$async14072(mult__$1,ch__$1,cs__$1,meta14073));
});})(cs))
;

}

return (new cljs.core.async.t_cljs$core$async14072(cljs$core$async$mult,ch,cs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var dchan = cljs.core.async.chan.call(null,(1));
var dctr = cljs.core.atom.call(null,null);
var done = ((function (cs,m,dchan,dctr){
return (function (_){
if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.call(null,dchan,true);
} else {
return null;
}
});})(cs,m,dchan,dctr))
;
var c__10543__auto___14293 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10543__auto___14293,cs,m,dchan,dctr,done){
return (function (){
var f__10544__auto__ = (function (){var switch__10478__auto__ = ((function (c__10543__auto___14293,cs,m,dchan,dctr,done){
return (function (state_14205){
var state_val_14206 = (state_14205[(1)]);
if((state_val_14206 === (7))){
var inst_14201 = (state_14205[(2)]);
var state_14205__$1 = state_14205;
var statearr_14207_14294 = state_14205__$1;
(statearr_14207_14294[(2)] = inst_14201);

(statearr_14207_14294[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (20))){
var inst_14106 = (state_14205[(7)]);
var inst_14116 = cljs.core.first.call(null,inst_14106);
var inst_14117 = cljs.core.nth.call(null,inst_14116,(0),null);
var inst_14118 = cljs.core.nth.call(null,inst_14116,(1),null);
var state_14205__$1 = (function (){var statearr_14208 = state_14205;
(statearr_14208[(8)] = inst_14117);

return statearr_14208;
})();
if(cljs.core.truth_(inst_14118)){
var statearr_14209_14295 = state_14205__$1;
(statearr_14209_14295[(1)] = (22));

} else {
var statearr_14210_14296 = state_14205__$1;
(statearr_14210_14296[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (27))){
var inst_14146 = (state_14205[(9)]);
var inst_14148 = (state_14205[(10)]);
var inst_14077 = (state_14205[(11)]);
var inst_14153 = (state_14205[(12)]);
var inst_14153__$1 = cljs.core._nth.call(null,inst_14146,inst_14148);
var inst_14154 = cljs.core.async.put_BANG_.call(null,inst_14153__$1,inst_14077,done);
var state_14205__$1 = (function (){var statearr_14211 = state_14205;
(statearr_14211[(12)] = inst_14153__$1);

return statearr_14211;
})();
if(cljs.core.truth_(inst_14154)){
var statearr_14212_14297 = state_14205__$1;
(statearr_14212_14297[(1)] = (30));

} else {
var statearr_14213_14298 = state_14205__$1;
(statearr_14213_14298[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (1))){
var state_14205__$1 = state_14205;
var statearr_14214_14299 = state_14205__$1;
(statearr_14214_14299[(2)] = null);

(statearr_14214_14299[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (24))){
var inst_14106 = (state_14205[(7)]);
var inst_14123 = (state_14205[(2)]);
var inst_14124 = cljs.core.next.call(null,inst_14106);
var inst_14086 = inst_14124;
var inst_14087 = null;
var inst_14088 = (0);
var inst_14089 = (0);
var state_14205__$1 = (function (){var statearr_14215 = state_14205;
(statearr_14215[(13)] = inst_14088);

(statearr_14215[(14)] = inst_14086);

(statearr_14215[(15)] = inst_14123);

(statearr_14215[(16)] = inst_14089);

(statearr_14215[(17)] = inst_14087);

return statearr_14215;
})();
var statearr_14216_14300 = state_14205__$1;
(statearr_14216_14300[(2)] = null);

(statearr_14216_14300[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (39))){
var state_14205__$1 = state_14205;
var statearr_14220_14301 = state_14205__$1;
(statearr_14220_14301[(2)] = null);

(statearr_14220_14301[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (4))){
var inst_14077 = (state_14205[(11)]);
var inst_14077__$1 = (state_14205[(2)]);
var inst_14078 = (inst_14077__$1 == null);
var state_14205__$1 = (function (){var statearr_14221 = state_14205;
(statearr_14221[(11)] = inst_14077__$1);

return statearr_14221;
})();
if(cljs.core.truth_(inst_14078)){
var statearr_14222_14302 = state_14205__$1;
(statearr_14222_14302[(1)] = (5));

} else {
var statearr_14223_14303 = state_14205__$1;
(statearr_14223_14303[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (15))){
var inst_14088 = (state_14205[(13)]);
var inst_14086 = (state_14205[(14)]);
var inst_14089 = (state_14205[(16)]);
var inst_14087 = (state_14205[(17)]);
var inst_14102 = (state_14205[(2)]);
var inst_14103 = (inst_14089 + (1));
var tmp14217 = inst_14088;
var tmp14218 = inst_14086;
var tmp14219 = inst_14087;
var inst_14086__$1 = tmp14218;
var inst_14087__$1 = tmp14219;
var inst_14088__$1 = tmp14217;
var inst_14089__$1 = inst_14103;
var state_14205__$1 = (function (){var statearr_14224 = state_14205;
(statearr_14224[(18)] = inst_14102);

(statearr_14224[(13)] = inst_14088__$1);

(statearr_14224[(14)] = inst_14086__$1);

(statearr_14224[(16)] = inst_14089__$1);

(statearr_14224[(17)] = inst_14087__$1);

return statearr_14224;
})();
var statearr_14225_14304 = state_14205__$1;
(statearr_14225_14304[(2)] = null);

(statearr_14225_14304[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (21))){
var inst_14127 = (state_14205[(2)]);
var state_14205__$1 = state_14205;
var statearr_14229_14305 = state_14205__$1;
(statearr_14229_14305[(2)] = inst_14127);

(statearr_14229_14305[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (31))){
var inst_14153 = (state_14205[(12)]);
var inst_14157 = done.call(null,null);
var inst_14158 = cljs.core.async.untap_STAR_.call(null,m,inst_14153);
var state_14205__$1 = (function (){var statearr_14230 = state_14205;
(statearr_14230[(19)] = inst_14157);

return statearr_14230;
})();
var statearr_14231_14306 = state_14205__$1;
(statearr_14231_14306[(2)] = inst_14158);

(statearr_14231_14306[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (32))){
var inst_14147 = (state_14205[(20)]);
var inst_14146 = (state_14205[(9)]);
var inst_14148 = (state_14205[(10)]);
var inst_14145 = (state_14205[(21)]);
var inst_14160 = (state_14205[(2)]);
var inst_14161 = (inst_14148 + (1));
var tmp14226 = inst_14147;
var tmp14227 = inst_14146;
var tmp14228 = inst_14145;
var inst_14145__$1 = tmp14228;
var inst_14146__$1 = tmp14227;
var inst_14147__$1 = tmp14226;
var inst_14148__$1 = inst_14161;
var state_14205__$1 = (function (){var statearr_14232 = state_14205;
(statearr_14232[(22)] = inst_14160);

(statearr_14232[(20)] = inst_14147__$1);

(statearr_14232[(9)] = inst_14146__$1);

(statearr_14232[(10)] = inst_14148__$1);

(statearr_14232[(21)] = inst_14145__$1);

return statearr_14232;
})();
var statearr_14233_14307 = state_14205__$1;
(statearr_14233_14307[(2)] = null);

(statearr_14233_14307[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (40))){
var inst_14173 = (state_14205[(23)]);
var inst_14177 = done.call(null,null);
var inst_14178 = cljs.core.async.untap_STAR_.call(null,m,inst_14173);
var state_14205__$1 = (function (){var statearr_14234 = state_14205;
(statearr_14234[(24)] = inst_14177);

return statearr_14234;
})();
var statearr_14235_14308 = state_14205__$1;
(statearr_14235_14308[(2)] = inst_14178);

(statearr_14235_14308[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (33))){
var inst_14164 = (state_14205[(25)]);
var inst_14166 = cljs.core.chunked_seq_QMARK_.call(null,inst_14164);
var state_14205__$1 = state_14205;
if(inst_14166){
var statearr_14236_14309 = state_14205__$1;
(statearr_14236_14309[(1)] = (36));

} else {
var statearr_14237_14310 = state_14205__$1;
(statearr_14237_14310[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (13))){
var inst_14096 = (state_14205[(26)]);
var inst_14099 = cljs.core.async.close_BANG_.call(null,inst_14096);
var state_14205__$1 = state_14205;
var statearr_14238_14311 = state_14205__$1;
(statearr_14238_14311[(2)] = inst_14099);

(statearr_14238_14311[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (22))){
var inst_14117 = (state_14205[(8)]);
var inst_14120 = cljs.core.async.close_BANG_.call(null,inst_14117);
var state_14205__$1 = state_14205;
var statearr_14239_14312 = state_14205__$1;
(statearr_14239_14312[(2)] = inst_14120);

(statearr_14239_14312[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (36))){
var inst_14164 = (state_14205[(25)]);
var inst_14168 = cljs.core.chunk_first.call(null,inst_14164);
var inst_14169 = cljs.core.chunk_rest.call(null,inst_14164);
var inst_14170 = cljs.core.count.call(null,inst_14168);
var inst_14145 = inst_14169;
var inst_14146 = inst_14168;
var inst_14147 = inst_14170;
var inst_14148 = (0);
var state_14205__$1 = (function (){var statearr_14240 = state_14205;
(statearr_14240[(20)] = inst_14147);

(statearr_14240[(9)] = inst_14146);

(statearr_14240[(10)] = inst_14148);

(statearr_14240[(21)] = inst_14145);

return statearr_14240;
})();
var statearr_14241_14313 = state_14205__$1;
(statearr_14241_14313[(2)] = null);

(statearr_14241_14313[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (41))){
var inst_14164 = (state_14205[(25)]);
var inst_14180 = (state_14205[(2)]);
var inst_14181 = cljs.core.next.call(null,inst_14164);
var inst_14145 = inst_14181;
var inst_14146 = null;
var inst_14147 = (0);
var inst_14148 = (0);
var state_14205__$1 = (function (){var statearr_14242 = state_14205;
(statearr_14242[(27)] = inst_14180);

(statearr_14242[(20)] = inst_14147);

(statearr_14242[(9)] = inst_14146);

(statearr_14242[(10)] = inst_14148);

(statearr_14242[(21)] = inst_14145);

return statearr_14242;
})();
var statearr_14243_14314 = state_14205__$1;
(statearr_14243_14314[(2)] = null);

(statearr_14243_14314[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (43))){
var state_14205__$1 = state_14205;
var statearr_14244_14315 = state_14205__$1;
(statearr_14244_14315[(2)] = null);

(statearr_14244_14315[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (29))){
var inst_14189 = (state_14205[(2)]);
var state_14205__$1 = state_14205;
var statearr_14245_14316 = state_14205__$1;
(statearr_14245_14316[(2)] = inst_14189);

(statearr_14245_14316[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (44))){
var inst_14198 = (state_14205[(2)]);
var state_14205__$1 = (function (){var statearr_14246 = state_14205;
(statearr_14246[(28)] = inst_14198);

return statearr_14246;
})();
var statearr_14247_14317 = state_14205__$1;
(statearr_14247_14317[(2)] = null);

(statearr_14247_14317[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (6))){
var inst_14137 = (state_14205[(29)]);
var inst_14136 = cljs.core.deref.call(null,cs);
var inst_14137__$1 = cljs.core.keys.call(null,inst_14136);
var inst_14138 = cljs.core.count.call(null,inst_14137__$1);
var inst_14139 = cljs.core.reset_BANG_.call(null,dctr,inst_14138);
var inst_14144 = cljs.core.seq.call(null,inst_14137__$1);
var inst_14145 = inst_14144;
var inst_14146 = null;
var inst_14147 = (0);
var inst_14148 = (0);
var state_14205__$1 = (function (){var statearr_14248 = state_14205;
(statearr_14248[(29)] = inst_14137__$1);

(statearr_14248[(20)] = inst_14147);

(statearr_14248[(9)] = inst_14146);

(statearr_14248[(10)] = inst_14148);

(statearr_14248[(30)] = inst_14139);

(statearr_14248[(21)] = inst_14145);

return statearr_14248;
})();
var statearr_14249_14318 = state_14205__$1;
(statearr_14249_14318[(2)] = null);

(statearr_14249_14318[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (28))){
var inst_14164 = (state_14205[(25)]);
var inst_14145 = (state_14205[(21)]);
var inst_14164__$1 = cljs.core.seq.call(null,inst_14145);
var state_14205__$1 = (function (){var statearr_14250 = state_14205;
(statearr_14250[(25)] = inst_14164__$1);

return statearr_14250;
})();
if(inst_14164__$1){
var statearr_14251_14319 = state_14205__$1;
(statearr_14251_14319[(1)] = (33));

} else {
var statearr_14252_14320 = state_14205__$1;
(statearr_14252_14320[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (25))){
var inst_14147 = (state_14205[(20)]);
var inst_14148 = (state_14205[(10)]);
var inst_14150 = (inst_14148 < inst_14147);
var inst_14151 = inst_14150;
var state_14205__$1 = state_14205;
if(cljs.core.truth_(inst_14151)){
var statearr_14253_14321 = state_14205__$1;
(statearr_14253_14321[(1)] = (27));

} else {
var statearr_14254_14322 = state_14205__$1;
(statearr_14254_14322[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (34))){
var state_14205__$1 = state_14205;
var statearr_14255_14323 = state_14205__$1;
(statearr_14255_14323[(2)] = null);

(statearr_14255_14323[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (17))){
var state_14205__$1 = state_14205;
var statearr_14256_14324 = state_14205__$1;
(statearr_14256_14324[(2)] = null);

(statearr_14256_14324[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (3))){
var inst_14203 = (state_14205[(2)]);
var state_14205__$1 = state_14205;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14205__$1,inst_14203);
} else {
if((state_val_14206 === (12))){
var inst_14132 = (state_14205[(2)]);
var state_14205__$1 = state_14205;
var statearr_14257_14325 = state_14205__$1;
(statearr_14257_14325[(2)] = inst_14132);

(statearr_14257_14325[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (2))){
var state_14205__$1 = state_14205;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_14205__$1,(4),ch);
} else {
if((state_val_14206 === (23))){
var state_14205__$1 = state_14205;
var statearr_14258_14326 = state_14205__$1;
(statearr_14258_14326[(2)] = null);

(statearr_14258_14326[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (35))){
var inst_14187 = (state_14205[(2)]);
var state_14205__$1 = state_14205;
var statearr_14259_14327 = state_14205__$1;
(statearr_14259_14327[(2)] = inst_14187);

(statearr_14259_14327[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (19))){
var inst_14106 = (state_14205[(7)]);
var inst_14110 = cljs.core.chunk_first.call(null,inst_14106);
var inst_14111 = cljs.core.chunk_rest.call(null,inst_14106);
var inst_14112 = cljs.core.count.call(null,inst_14110);
var inst_14086 = inst_14111;
var inst_14087 = inst_14110;
var inst_14088 = inst_14112;
var inst_14089 = (0);
var state_14205__$1 = (function (){var statearr_14260 = state_14205;
(statearr_14260[(13)] = inst_14088);

(statearr_14260[(14)] = inst_14086);

(statearr_14260[(16)] = inst_14089);

(statearr_14260[(17)] = inst_14087);

return statearr_14260;
})();
var statearr_14261_14328 = state_14205__$1;
(statearr_14261_14328[(2)] = null);

(statearr_14261_14328[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (11))){
var inst_14086 = (state_14205[(14)]);
var inst_14106 = (state_14205[(7)]);
var inst_14106__$1 = cljs.core.seq.call(null,inst_14086);
var state_14205__$1 = (function (){var statearr_14262 = state_14205;
(statearr_14262[(7)] = inst_14106__$1);

return statearr_14262;
})();
if(inst_14106__$1){
var statearr_14263_14329 = state_14205__$1;
(statearr_14263_14329[(1)] = (16));

} else {
var statearr_14264_14330 = state_14205__$1;
(statearr_14264_14330[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (9))){
var inst_14134 = (state_14205[(2)]);
var state_14205__$1 = state_14205;
var statearr_14265_14331 = state_14205__$1;
(statearr_14265_14331[(2)] = inst_14134);

(statearr_14265_14331[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (5))){
var inst_14084 = cljs.core.deref.call(null,cs);
var inst_14085 = cljs.core.seq.call(null,inst_14084);
var inst_14086 = inst_14085;
var inst_14087 = null;
var inst_14088 = (0);
var inst_14089 = (0);
var state_14205__$1 = (function (){var statearr_14266 = state_14205;
(statearr_14266[(13)] = inst_14088);

(statearr_14266[(14)] = inst_14086);

(statearr_14266[(16)] = inst_14089);

(statearr_14266[(17)] = inst_14087);

return statearr_14266;
})();
var statearr_14267_14332 = state_14205__$1;
(statearr_14267_14332[(2)] = null);

(statearr_14267_14332[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (14))){
var state_14205__$1 = state_14205;
var statearr_14268_14333 = state_14205__$1;
(statearr_14268_14333[(2)] = null);

(statearr_14268_14333[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (45))){
var inst_14195 = (state_14205[(2)]);
var state_14205__$1 = state_14205;
var statearr_14269_14334 = state_14205__$1;
(statearr_14269_14334[(2)] = inst_14195);

(statearr_14269_14334[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (26))){
var inst_14137 = (state_14205[(29)]);
var inst_14191 = (state_14205[(2)]);
var inst_14192 = cljs.core.seq.call(null,inst_14137);
var state_14205__$1 = (function (){var statearr_14270 = state_14205;
(statearr_14270[(31)] = inst_14191);

return statearr_14270;
})();
if(inst_14192){
var statearr_14271_14335 = state_14205__$1;
(statearr_14271_14335[(1)] = (42));

} else {
var statearr_14272_14336 = state_14205__$1;
(statearr_14272_14336[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (16))){
var inst_14106 = (state_14205[(7)]);
var inst_14108 = cljs.core.chunked_seq_QMARK_.call(null,inst_14106);
var state_14205__$1 = state_14205;
if(inst_14108){
var statearr_14273_14337 = state_14205__$1;
(statearr_14273_14337[(1)] = (19));

} else {
var statearr_14274_14338 = state_14205__$1;
(statearr_14274_14338[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (38))){
var inst_14184 = (state_14205[(2)]);
var state_14205__$1 = state_14205;
var statearr_14275_14339 = state_14205__$1;
(statearr_14275_14339[(2)] = inst_14184);

(statearr_14275_14339[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (30))){
var state_14205__$1 = state_14205;
var statearr_14276_14340 = state_14205__$1;
(statearr_14276_14340[(2)] = null);

(statearr_14276_14340[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (10))){
var inst_14089 = (state_14205[(16)]);
var inst_14087 = (state_14205[(17)]);
var inst_14095 = cljs.core._nth.call(null,inst_14087,inst_14089);
var inst_14096 = cljs.core.nth.call(null,inst_14095,(0),null);
var inst_14097 = cljs.core.nth.call(null,inst_14095,(1),null);
var state_14205__$1 = (function (){var statearr_14277 = state_14205;
(statearr_14277[(26)] = inst_14096);

return statearr_14277;
})();
if(cljs.core.truth_(inst_14097)){
var statearr_14278_14341 = state_14205__$1;
(statearr_14278_14341[(1)] = (13));

} else {
var statearr_14279_14342 = state_14205__$1;
(statearr_14279_14342[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (18))){
var inst_14130 = (state_14205[(2)]);
var state_14205__$1 = state_14205;
var statearr_14280_14343 = state_14205__$1;
(statearr_14280_14343[(2)] = inst_14130);

(statearr_14280_14343[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (42))){
var state_14205__$1 = state_14205;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_14205__$1,(45),dchan);
} else {
if((state_val_14206 === (37))){
var inst_14173 = (state_14205[(23)]);
var inst_14077 = (state_14205[(11)]);
var inst_14164 = (state_14205[(25)]);
var inst_14173__$1 = cljs.core.first.call(null,inst_14164);
var inst_14174 = cljs.core.async.put_BANG_.call(null,inst_14173__$1,inst_14077,done);
var state_14205__$1 = (function (){var statearr_14281 = state_14205;
(statearr_14281[(23)] = inst_14173__$1);

return statearr_14281;
})();
if(cljs.core.truth_(inst_14174)){
var statearr_14282_14344 = state_14205__$1;
(statearr_14282_14344[(1)] = (39));

} else {
var statearr_14283_14345 = state_14205__$1;
(statearr_14283_14345[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14206 === (8))){
var inst_14088 = (state_14205[(13)]);
var inst_14089 = (state_14205[(16)]);
var inst_14091 = (inst_14089 < inst_14088);
var inst_14092 = inst_14091;
var state_14205__$1 = state_14205;
if(cljs.core.truth_(inst_14092)){
var statearr_14284_14346 = state_14205__$1;
(statearr_14284_14346[(1)] = (10));

} else {
var statearr_14285_14347 = state_14205__$1;
(statearr_14285_14347[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__10543__auto___14293,cs,m,dchan,dctr,done))
;
return ((function (switch__10478__auto__,c__10543__auto___14293,cs,m,dchan,dctr,done){
return (function() {
var cljs$core$async$mult_$_state_machine__10479__auto__ = null;
var cljs$core$async$mult_$_state_machine__10479__auto____0 = (function (){
var statearr_14289 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_14289[(0)] = cljs$core$async$mult_$_state_machine__10479__auto__);

(statearr_14289[(1)] = (1));

return statearr_14289;
});
var cljs$core$async$mult_$_state_machine__10479__auto____1 = (function (state_14205){
while(true){
var ret_value__10480__auto__ = (function (){try{while(true){
var result__10481__auto__ = switch__10478__auto__.call(null,state_14205);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10481__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10481__auto__;
}
break;
}
}catch (e14290){if((e14290 instanceof Object)){
var ex__10482__auto__ = e14290;
var statearr_14291_14348 = state_14205;
(statearr_14291_14348[(5)] = ex__10482__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14205);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e14290;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10480__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__14349 = state_14205;
state_14205 = G__14349;
continue;
} else {
return ret_value__10480__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__10479__auto__ = function(state_14205){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__10479__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__10479__auto____1.call(this,state_14205);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__10479__auto____0;
cljs$core$async$mult_$_state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__10479__auto____1;
return cljs$core$async$mult_$_state_machine__10479__auto__;
})()
;})(switch__10478__auto__,c__10543__auto___14293,cs,m,dchan,dctr,done))
})();
var state__10545__auto__ = (function (){var statearr_14292 = f__10544__auto__.call(null);
(statearr_14292[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10543__auto___14293);

return statearr_14292;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10545__auto__);
});})(c__10543__auto___14293,cs,m,dchan,dctr,done))
);


return m;
});
/**
 * Copies the mult source onto the supplied channel.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.tap = (function cljs$core$async$tap(var_args){
var args14350 = [];
var len__9095__auto___14353 = arguments.length;
var i__9096__auto___14354 = (0);
while(true){
if((i__9096__auto___14354 < len__9095__auto___14353)){
args14350.push((arguments[i__9096__auto___14354]));

var G__14355 = (i__9096__auto___14354 + (1));
i__9096__auto___14354 = G__14355;
continue;
} else {
}
break;
}

var G__14352 = args14350.length;
switch (G__14352) {
case 2:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14350.length)].join('')));

}
});

cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2 = (function (mult,ch){
return cljs.core.async.tap.call(null,mult,ch,true);
});

cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3 = (function (mult,ch,close_QMARK_){
cljs.core.async.tap_STAR_.call(null,mult,ch,close_QMARK_);

return ch;
});

cljs.core.async.tap.cljs$lang$maxFixedArity = 3;
/**
 * Disconnects a target channel from a mult
 */
cljs.core.async.untap = (function cljs$core$async$untap(mult,ch){
return cljs.core.async.untap_STAR_.call(null,mult,ch);
});
/**
 * Disconnects all target channels from a mult
 */
cljs.core.async.untap_all = (function cljs$core$async$untap_all(mult){
return cljs.core.async.untap_all_STAR_.call(null,mult);
});

/**
 * @interface
 */
cljs.core.async.Mix = function(){};

cljs.core.async.admix_STAR_ = (function cljs$core$async$admix_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mix$admix_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else {
var x__8692__auto__ = (((m == null))?null:m);
var m__8693__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__8692__auto__)]);
if(!((m__8693__auto__ == null))){
return m__8693__auto__.call(null,m,ch);
} else {
var m__8693__auto____$1 = (cljs.core.async.admix_STAR_["_"]);
if(!((m__8693__auto____$1 == null))){
return m__8693__auto____$1.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.admix*",m);
}
}
}
});

cljs.core.async.unmix_STAR_ = (function cljs$core$async$unmix_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mix$unmix_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else {
var x__8692__auto__ = (((m == null))?null:m);
var m__8693__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__8692__auto__)]);
if(!((m__8693__auto__ == null))){
return m__8693__auto__.call(null,m,ch);
} else {
var m__8693__auto____$1 = (cljs.core.async.unmix_STAR_["_"]);
if(!((m__8693__auto____$1 == null))){
return m__8693__auto____$1.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.unmix*",m);
}
}
}
});

cljs.core.async.unmix_all_STAR_ = (function cljs$core$async$unmix_all_STAR_(m){
if((!((m == null))) && (!((m.cljs$core$async$Mix$unmix_all_STAR_$arity$1 == null)))){
return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else {
var x__8692__auto__ = (((m == null))?null:m);
var m__8693__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__8692__auto__)]);
if(!((m__8693__auto__ == null))){
return m__8693__auto__.call(null,m);
} else {
var m__8693__auto____$1 = (cljs.core.async.unmix_all_STAR_["_"]);
if(!((m__8693__auto____$1 == null))){
return m__8693__auto____$1.call(null,m);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.unmix-all*",m);
}
}
}
});

cljs.core.async.toggle_STAR_ = (function cljs$core$async$toggle_STAR_(m,state_map){
if((!((m == null))) && (!((m.cljs$core$async$Mix$toggle_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else {
var x__8692__auto__ = (((m == null))?null:m);
var m__8693__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__8692__auto__)]);
if(!((m__8693__auto__ == null))){
return m__8693__auto__.call(null,m,state_map);
} else {
var m__8693__auto____$1 = (cljs.core.async.toggle_STAR_["_"]);
if(!((m__8693__auto____$1 == null))){
return m__8693__auto____$1.call(null,m,state_map);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.toggle*",m);
}
}
}
});

cljs.core.async.solo_mode_STAR_ = (function cljs$core$async$solo_mode_STAR_(m,mode){
if((!((m == null))) && (!((m.cljs$core$async$Mix$solo_mode_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else {
var x__8692__auto__ = (((m == null))?null:m);
var m__8693__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__8692__auto__)]);
if(!((m__8693__auto__ == null))){
return m__8693__auto__.call(null,m,mode);
} else {
var m__8693__auto____$1 = (cljs.core.async.solo_mode_STAR_["_"]);
if(!((m__8693__auto____$1 == null))){
return m__8693__auto____$1.call(null,m,mode);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.solo-mode*",m);
}
}
}
});

cljs.core.async.ioc_alts_BANG_ = (function cljs$core$async$ioc_alts_BANG_(var_args){
var args__9102__auto__ = [];
var len__9095__auto___14367 = arguments.length;
var i__9096__auto___14368 = (0);
while(true){
if((i__9096__auto___14368 < len__9095__auto___14367)){
args__9102__auto__.push((arguments[i__9096__auto___14368]));

var G__14369 = (i__9096__auto___14368 + (1));
i__9096__auto___14368 = G__14369;
continue;
} else {
}
break;
}

var argseq__9103__auto__ = ((((3) < args__9102__auto__.length))?(new cljs.core.IndexedSeq(args__9102__auto__.slice((3)),(0))):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__9103__auto__);
});

cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__14361){
var map__14362 = p__14361;
var map__14362__$1 = ((((!((map__14362 == null)))?((((map__14362.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14362.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14362):map__14362);
var opts = map__14362__$1;
var statearr_14364_14370 = state;
(statearr_14364_14370[cljs.core.async.impl.ioc_helpers.STATE_IDX] = cont_block);


var temp__4657__auto__ = cljs.core.async.do_alts.call(null,((function (map__14362,map__14362__$1,opts){
return (function (val){
var statearr_14365_14371 = state;
(statearr_14365_14371[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state);
});})(map__14362,map__14362__$1,opts))
,ports,opts);
if(cljs.core.truth_(temp__4657__auto__)){
var cb = temp__4657__auto__;
var statearr_14366_14372 = state;
(statearr_14366_14372[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = cljs.core.deref.call(null,cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
});

cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3);

cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq14357){
var G__14358 = cljs.core.first.call(null,seq14357);
var seq14357__$1 = cljs.core.next.call(null,seq14357);
var G__14359 = cljs.core.first.call(null,seq14357__$1);
var seq14357__$2 = cljs.core.next.call(null,seq14357__$1);
var G__14360 = cljs.core.first.call(null,seq14357__$2);
var seq14357__$3 = cljs.core.next.call(null,seq14357__$2);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__14358,G__14359,G__14360,seq14357__$3);
});
/**
 * Creates and returns a mix of one or more input channels which will
 *   be put on the supplied out channel. Input sources can be added to
 *   the mix with 'admix', and removed with 'unmix'. A mix supports
 *   soloing, muting and pausing multiple inputs atomically using
 *   'toggle', and can solo using either muting or pausing as determined
 *   by 'solo-mode'.
 * 
 *   Each channel can have zero or more boolean modes set via 'toggle':
 * 
 *   :solo - when true, only this (ond other soloed) channel(s) will appear
 *        in the mix output channel. :mute and :pause states of soloed
 *        channels are ignored. If solo-mode is :mute, non-soloed
 *        channels are muted, if :pause, non-soloed channels are
 *        paused.
 * 
 *   :mute - muted channels will have their contents consumed but not included in the mix
 *   :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
 */
cljs.core.async.mix = (function cljs$core$async$mix(out){
var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pause","pause",-2095325672),null,new cljs.core.Keyword(null,"mute","mute",1151223646),null], null), null);
var attrs = cljs.core.conj.call(null,solo_modes,new cljs.core.Keyword(null,"solo","solo",-316350075));
var solo_mode = cljs.core.atom.call(null,new cljs.core.Keyword(null,"mute","mute",1151223646));
var change = cljs.core.async.chan.call(null);
var changed = ((function (cs,solo_modes,attrs,solo_mode,change){
return (function (){
return cljs.core.async.put_BANG_.call(null,change,true);
});})(cs,solo_modes,attrs,solo_mode,change))
;
var pick = ((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (attr,chs){
return cljs.core.reduce_kv.call(null,((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (ret,c,v){
if(cljs.core.truth_(attr.call(null,v))){
return cljs.core.conj.call(null,ret,c);
} else {
return ret;
}
});})(cs,solo_modes,attrs,solo_mode,change,changed))
,cljs.core.PersistentHashSet.EMPTY,chs);
});})(cs,solo_modes,attrs,solo_mode,change,changed))
;
var calc_state = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick){
return (function (){
var chs = cljs.core.deref.call(null,cs);
var mode = cljs.core.deref.call(null,solo_mode);
var solos = pick.call(null,new cljs.core.Keyword(null,"solo","solo",-316350075),chs);
var pauses = pick.call(null,new cljs.core.Keyword(null,"pause","pause",-2095325672),chs);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"solos","solos",1441458643),solos,new cljs.core.Keyword(null,"mutes","mutes",1068806309),pick.call(null,new cljs.core.Keyword(null,"mute","mute",1151223646),chs),new cljs.core.Keyword(null,"reads","reads",-1215067361),cljs.core.conj.call(null,(((cljs.core._EQ_.call(null,mode,new cljs.core.Keyword(null,"pause","pause",-2095325672))) && (!(cljs.core.empty_QMARK_.call(null,solos))))?cljs.core.vec.call(null,solos):cljs.core.vec.call(null,cljs.core.remove.call(null,pauses,cljs.core.keys.call(null,chs)))),change)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick))
;
var m = (function (){
if(typeof cljs.core.async.t_cljs$core$async14536 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async14536 = (function (change,mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta14537){
this.change = change;
this.mix = mix;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta14537 = meta14537;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async14536.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_14538,meta14537__$1){
var self__ = this;
var _14538__$1 = this;
return (new cljs.core.async.t_cljs$core$async14536(self__.change,self__.mix,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta14537__$1));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async14536.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_14538){
var self__ = this;
var _14538__$1 = this;
return self__.meta14537;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async14536.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async14536.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async14536.prototype.cljs$core$async$Mix$ = true;

cljs.core.async.t_cljs$core$async14536.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async14536.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async14536.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async14536.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.partial.call(null,cljs.core.merge_with,cljs.core.merge),state_map);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async14536.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,mode){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.solo_modes.call(null,mode))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("mode must be one of: "),cljs.core.str(self__.solo_modes)].join('')),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"mode","mode",-2000032078,null))))].join('')));
}

cljs.core.reset_BANG_.call(null,self__.solo_mode,mode);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async14536.getBasis = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (){
return new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),cljs.core.with_meta(new cljs.core.Symbol(null,"mix","mix",2121373763,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"out","out",729986010,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Creates and returns a mix of one or more input channels which will\n  be put on the supplied out channel. Input sources can be added to\n  the mix with 'admix', and removed with 'unmix'. A mix supports\n  soloing, muting and pausing multiple inputs atomically using\n  'toggle', and can solo using either muting or pausing as determined\n  by 'solo-mode'.\n\n  Each channel can have zero or more boolean modes set via 'toggle':\n\n  :solo - when true, only this (ond other soloed) channel(s) will appear\n          in the mix output channel. :mute and :pause states of soloed\n          channels are ignored. If solo-mode is :mute, non-soloed\n          channels are muted, if :pause, non-soloed channels are\n          paused.\n\n  :mute - muted channels will have their contents consumed but not included in the mix\n  :pause - paused channels will not have their contents consumed (and thus also not included in the mix)\n"], null)),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta14537","meta14537",1975475274,null)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async14536.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async14536.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async14536";

cljs.core.async.t_cljs$core$async14536.cljs$lang$ctorPrWriter = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (this__8635__auto__,writer__8636__auto__,opt__8637__auto__){
return cljs.core._write.call(null,writer__8636__auto__,"cljs.core.async/t_cljs$core$async14536");
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.__GT_t_cljs$core$async14536 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function cljs$core$async$mix_$___GT_t_cljs$core$async14536(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta14537){
return (new cljs.core.async.t_cljs$core$async14536(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta14537));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

}

return (new cljs.core.async.t_cljs$core$async14536(change,cljs$core$async$mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__10543__auto___14699 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10543__auto___14699,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (){
var f__10544__auto__ = (function (){var switch__10478__auto__ = ((function (c__10543__auto___14699,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (state_14636){
var state_val_14637 = (state_14636[(1)]);
if((state_val_14637 === (7))){
var inst_14554 = (state_14636[(2)]);
var state_14636__$1 = state_14636;
var statearr_14638_14700 = state_14636__$1;
(statearr_14638_14700[(2)] = inst_14554);

(statearr_14638_14700[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14637 === (20))){
var inst_14566 = (state_14636[(7)]);
var state_14636__$1 = state_14636;
var statearr_14639_14701 = state_14636__$1;
(statearr_14639_14701[(2)] = inst_14566);

(statearr_14639_14701[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14637 === (27))){
var state_14636__$1 = state_14636;
var statearr_14640_14702 = state_14636__$1;
(statearr_14640_14702[(2)] = null);

(statearr_14640_14702[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14637 === (1))){
var inst_14542 = (state_14636[(8)]);
var inst_14542__$1 = calc_state.call(null);
var inst_14544 = (inst_14542__$1 == null);
var inst_14545 = cljs.core.not.call(null,inst_14544);
var state_14636__$1 = (function (){var statearr_14641 = state_14636;
(statearr_14641[(8)] = inst_14542__$1);

return statearr_14641;
})();
if(inst_14545){
var statearr_14642_14703 = state_14636__$1;
(statearr_14642_14703[(1)] = (2));

} else {
var statearr_14643_14704 = state_14636__$1;
(statearr_14643_14704[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14637 === (24))){
var inst_14589 = (state_14636[(9)]);
var inst_14596 = (state_14636[(10)]);
var inst_14610 = (state_14636[(11)]);
var inst_14610__$1 = inst_14589.call(null,inst_14596);
var state_14636__$1 = (function (){var statearr_14644 = state_14636;
(statearr_14644[(11)] = inst_14610__$1);

return statearr_14644;
})();
if(cljs.core.truth_(inst_14610__$1)){
var statearr_14645_14705 = state_14636__$1;
(statearr_14645_14705[(1)] = (29));

} else {
var statearr_14646_14706 = state_14636__$1;
(statearr_14646_14706[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14637 === (4))){
var inst_14557 = (state_14636[(2)]);
var state_14636__$1 = state_14636;
if(cljs.core.truth_(inst_14557)){
var statearr_14647_14707 = state_14636__$1;
(statearr_14647_14707[(1)] = (8));

} else {
var statearr_14648_14708 = state_14636__$1;
(statearr_14648_14708[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14637 === (15))){
var inst_14583 = (state_14636[(2)]);
var state_14636__$1 = state_14636;
if(cljs.core.truth_(inst_14583)){
var statearr_14649_14709 = state_14636__$1;
(statearr_14649_14709[(1)] = (19));

} else {
var statearr_14650_14710 = state_14636__$1;
(statearr_14650_14710[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14637 === (21))){
var inst_14588 = (state_14636[(12)]);
var inst_14588__$1 = (state_14636[(2)]);
var inst_14589 = cljs.core.get.call(null,inst_14588__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_14590 = cljs.core.get.call(null,inst_14588__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_14591 = cljs.core.get.call(null,inst_14588__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_14636__$1 = (function (){var statearr_14651 = state_14636;
(statearr_14651[(9)] = inst_14589);

(statearr_14651[(12)] = inst_14588__$1);

(statearr_14651[(13)] = inst_14590);

return statearr_14651;
})();
return cljs.core.async.ioc_alts_BANG_.call(null,state_14636__$1,(22),inst_14591);
} else {
if((state_val_14637 === (31))){
var inst_14618 = (state_14636[(2)]);
var state_14636__$1 = state_14636;
if(cljs.core.truth_(inst_14618)){
var statearr_14652_14711 = state_14636__$1;
(statearr_14652_14711[(1)] = (32));

} else {
var statearr_14653_14712 = state_14636__$1;
(statearr_14653_14712[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14637 === (32))){
var inst_14595 = (state_14636[(14)]);
var state_14636__$1 = state_14636;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14636__$1,(35),out,inst_14595);
} else {
if((state_val_14637 === (33))){
var inst_14588 = (state_14636[(12)]);
var inst_14566 = inst_14588;
var state_14636__$1 = (function (){var statearr_14654 = state_14636;
(statearr_14654[(7)] = inst_14566);

return statearr_14654;
})();
var statearr_14655_14713 = state_14636__$1;
(statearr_14655_14713[(2)] = null);

(statearr_14655_14713[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14637 === (13))){
var inst_14566 = (state_14636[(7)]);
var inst_14573 = inst_14566.cljs$lang$protocol_mask$partition0$;
var inst_14574 = (inst_14573 & (64));
var inst_14575 = inst_14566.cljs$core$ISeq$;
var inst_14576 = (inst_14574) || (inst_14575);
var state_14636__$1 = state_14636;
if(cljs.core.truth_(inst_14576)){
var statearr_14656_14714 = state_14636__$1;
(statearr_14656_14714[(1)] = (16));

} else {
var statearr_14657_14715 = state_14636__$1;
(statearr_14657_14715[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14637 === (22))){
var inst_14596 = (state_14636[(10)]);
var inst_14595 = (state_14636[(14)]);
var inst_14594 = (state_14636[(2)]);
var inst_14595__$1 = cljs.core.nth.call(null,inst_14594,(0),null);
var inst_14596__$1 = cljs.core.nth.call(null,inst_14594,(1),null);
var inst_14597 = (inst_14595__$1 == null);
var inst_14598 = cljs.core._EQ_.call(null,inst_14596__$1,change);
var inst_14599 = (inst_14597) || (inst_14598);
var state_14636__$1 = (function (){var statearr_14658 = state_14636;
(statearr_14658[(10)] = inst_14596__$1);

(statearr_14658[(14)] = inst_14595__$1);

return statearr_14658;
})();
if(cljs.core.truth_(inst_14599)){
var statearr_14659_14716 = state_14636__$1;
(statearr_14659_14716[(1)] = (23));

} else {
var statearr_14660_14717 = state_14636__$1;
(statearr_14660_14717[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14637 === (36))){
var inst_14588 = (state_14636[(12)]);
var inst_14566 = inst_14588;
var state_14636__$1 = (function (){var statearr_14661 = state_14636;
(statearr_14661[(7)] = inst_14566);

return statearr_14661;
})();
var statearr_14662_14718 = state_14636__$1;
(statearr_14662_14718[(2)] = null);

(statearr_14662_14718[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14637 === (29))){
var inst_14610 = (state_14636[(11)]);
var state_14636__$1 = state_14636;
var statearr_14663_14719 = state_14636__$1;
(statearr_14663_14719[(2)] = inst_14610);

(statearr_14663_14719[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14637 === (6))){
var state_14636__$1 = state_14636;
var statearr_14664_14720 = state_14636__$1;
(statearr_14664_14720[(2)] = false);

(statearr_14664_14720[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14637 === (28))){
var inst_14606 = (state_14636[(2)]);
var inst_14607 = calc_state.call(null);
var inst_14566 = inst_14607;
var state_14636__$1 = (function (){var statearr_14665 = state_14636;
(statearr_14665[(15)] = inst_14606);

(statearr_14665[(7)] = inst_14566);

return statearr_14665;
})();
var statearr_14666_14721 = state_14636__$1;
(statearr_14666_14721[(2)] = null);

(statearr_14666_14721[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14637 === (25))){
var inst_14632 = (state_14636[(2)]);
var state_14636__$1 = state_14636;
var statearr_14667_14722 = state_14636__$1;
(statearr_14667_14722[(2)] = inst_14632);

(statearr_14667_14722[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14637 === (34))){
var inst_14630 = (state_14636[(2)]);
var state_14636__$1 = state_14636;
var statearr_14668_14723 = state_14636__$1;
(statearr_14668_14723[(2)] = inst_14630);

(statearr_14668_14723[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14637 === (17))){
var state_14636__$1 = state_14636;
var statearr_14669_14724 = state_14636__$1;
(statearr_14669_14724[(2)] = false);

(statearr_14669_14724[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14637 === (3))){
var state_14636__$1 = state_14636;
var statearr_14670_14725 = state_14636__$1;
(statearr_14670_14725[(2)] = false);

(statearr_14670_14725[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14637 === (12))){
var inst_14634 = (state_14636[(2)]);
var state_14636__$1 = state_14636;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14636__$1,inst_14634);
} else {
if((state_val_14637 === (2))){
var inst_14542 = (state_14636[(8)]);
var inst_14547 = inst_14542.cljs$lang$protocol_mask$partition0$;
var inst_14548 = (inst_14547 & (64));
var inst_14549 = inst_14542.cljs$core$ISeq$;
var inst_14550 = (inst_14548) || (inst_14549);
var state_14636__$1 = state_14636;
if(cljs.core.truth_(inst_14550)){
var statearr_14671_14726 = state_14636__$1;
(statearr_14671_14726[(1)] = (5));

} else {
var statearr_14672_14727 = state_14636__$1;
(statearr_14672_14727[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14637 === (23))){
var inst_14595 = (state_14636[(14)]);
var inst_14601 = (inst_14595 == null);
var state_14636__$1 = state_14636;
if(cljs.core.truth_(inst_14601)){
var statearr_14673_14728 = state_14636__$1;
(statearr_14673_14728[(1)] = (26));

} else {
var statearr_14674_14729 = state_14636__$1;
(statearr_14674_14729[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14637 === (35))){
var inst_14621 = (state_14636[(2)]);
var state_14636__$1 = state_14636;
if(cljs.core.truth_(inst_14621)){
var statearr_14675_14730 = state_14636__$1;
(statearr_14675_14730[(1)] = (36));

} else {
var statearr_14676_14731 = state_14636__$1;
(statearr_14676_14731[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14637 === (19))){
var inst_14566 = (state_14636[(7)]);
var inst_14585 = cljs.core.apply.call(null,cljs.core.hash_map,inst_14566);
var state_14636__$1 = state_14636;
var statearr_14677_14732 = state_14636__$1;
(statearr_14677_14732[(2)] = inst_14585);

(statearr_14677_14732[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14637 === (11))){
var inst_14566 = (state_14636[(7)]);
var inst_14570 = (inst_14566 == null);
var inst_14571 = cljs.core.not.call(null,inst_14570);
var state_14636__$1 = state_14636;
if(inst_14571){
var statearr_14678_14733 = state_14636__$1;
(statearr_14678_14733[(1)] = (13));

} else {
var statearr_14679_14734 = state_14636__$1;
(statearr_14679_14734[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14637 === (9))){
var inst_14542 = (state_14636[(8)]);
var state_14636__$1 = state_14636;
var statearr_14680_14735 = state_14636__$1;
(statearr_14680_14735[(2)] = inst_14542);

(statearr_14680_14735[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14637 === (5))){
var state_14636__$1 = state_14636;
var statearr_14681_14736 = state_14636__$1;
(statearr_14681_14736[(2)] = true);

(statearr_14681_14736[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14637 === (14))){
var state_14636__$1 = state_14636;
var statearr_14682_14737 = state_14636__$1;
(statearr_14682_14737[(2)] = false);

(statearr_14682_14737[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14637 === (26))){
var inst_14596 = (state_14636[(10)]);
var inst_14603 = cljs.core.swap_BANG_.call(null,cs,cljs.core.dissoc,inst_14596);
var state_14636__$1 = state_14636;
var statearr_14683_14738 = state_14636__$1;
(statearr_14683_14738[(2)] = inst_14603);

(statearr_14683_14738[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14637 === (16))){
var state_14636__$1 = state_14636;
var statearr_14684_14739 = state_14636__$1;
(statearr_14684_14739[(2)] = true);

(statearr_14684_14739[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14637 === (38))){
var inst_14626 = (state_14636[(2)]);
var state_14636__$1 = state_14636;
var statearr_14685_14740 = state_14636__$1;
(statearr_14685_14740[(2)] = inst_14626);

(statearr_14685_14740[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14637 === (30))){
var inst_14589 = (state_14636[(9)]);
var inst_14596 = (state_14636[(10)]);
var inst_14590 = (state_14636[(13)]);
var inst_14613 = cljs.core.empty_QMARK_.call(null,inst_14589);
var inst_14614 = inst_14590.call(null,inst_14596);
var inst_14615 = cljs.core.not.call(null,inst_14614);
var inst_14616 = (inst_14613) && (inst_14615);
var state_14636__$1 = state_14636;
var statearr_14686_14741 = state_14636__$1;
(statearr_14686_14741[(2)] = inst_14616);

(statearr_14686_14741[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14637 === (10))){
var inst_14542 = (state_14636[(8)]);
var inst_14562 = (state_14636[(2)]);
var inst_14563 = cljs.core.get.call(null,inst_14562,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_14564 = cljs.core.get.call(null,inst_14562,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_14565 = cljs.core.get.call(null,inst_14562,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_14566 = inst_14542;
var state_14636__$1 = (function (){var statearr_14687 = state_14636;
(statearr_14687[(16)] = inst_14565);

(statearr_14687[(17)] = inst_14564);

(statearr_14687[(18)] = inst_14563);

(statearr_14687[(7)] = inst_14566);

return statearr_14687;
})();
var statearr_14688_14742 = state_14636__$1;
(statearr_14688_14742[(2)] = null);

(statearr_14688_14742[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14637 === (18))){
var inst_14580 = (state_14636[(2)]);
var state_14636__$1 = state_14636;
var statearr_14689_14743 = state_14636__$1;
(statearr_14689_14743[(2)] = inst_14580);

(statearr_14689_14743[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14637 === (37))){
var state_14636__$1 = state_14636;
var statearr_14690_14744 = state_14636__$1;
(statearr_14690_14744[(2)] = null);

(statearr_14690_14744[(1)] = (38));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14637 === (8))){
var inst_14542 = (state_14636[(8)]);
var inst_14559 = cljs.core.apply.call(null,cljs.core.hash_map,inst_14542);
var state_14636__$1 = state_14636;
var statearr_14691_14745 = state_14636__$1;
(statearr_14691_14745[(2)] = inst_14559);

(statearr_14691_14745[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__10543__auto___14699,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
;
return ((function (switch__10478__auto__,c__10543__auto___14699,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function() {
var cljs$core$async$mix_$_state_machine__10479__auto__ = null;
var cljs$core$async$mix_$_state_machine__10479__auto____0 = (function (){
var statearr_14695 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_14695[(0)] = cljs$core$async$mix_$_state_machine__10479__auto__);

(statearr_14695[(1)] = (1));

return statearr_14695;
});
var cljs$core$async$mix_$_state_machine__10479__auto____1 = (function (state_14636){
while(true){
var ret_value__10480__auto__ = (function (){try{while(true){
var result__10481__auto__ = switch__10478__auto__.call(null,state_14636);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10481__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10481__auto__;
}
break;
}
}catch (e14696){if((e14696 instanceof Object)){
var ex__10482__auto__ = e14696;
var statearr_14697_14746 = state_14636;
(statearr_14697_14746[(5)] = ex__10482__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14636);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e14696;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10480__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__14747 = state_14636;
state_14636 = G__14747;
continue;
} else {
return ret_value__10480__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__10479__auto__ = function(state_14636){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__10479__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__10479__auto____1.call(this,state_14636);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__10479__auto____0;
cljs$core$async$mix_$_state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__10479__auto____1;
return cljs$core$async$mix_$_state_machine__10479__auto__;
})()
;})(switch__10478__auto__,c__10543__auto___14699,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
})();
var state__10545__auto__ = (function (){var statearr_14698 = f__10544__auto__.call(null);
(statearr_14698[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10543__auto___14699);

return statearr_14698;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10545__auto__);
});})(c__10543__auto___14699,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
);


return m;
});
/**
 * Adds ch as an input to the mix
 */
cljs.core.async.admix = (function cljs$core$async$admix(mix,ch){
return cljs.core.async.admix_STAR_.call(null,mix,ch);
});
/**
 * Removes ch as an input to the mix
 */
cljs.core.async.unmix = (function cljs$core$async$unmix(mix,ch){
return cljs.core.async.unmix_STAR_.call(null,mix,ch);
});
/**
 * removes all inputs from the mix
 */
cljs.core.async.unmix_all = (function cljs$core$async$unmix_all(mix){
return cljs.core.async.unmix_all_STAR_.call(null,mix);
});
/**
 * Atomically sets the state(s) of one or more channels in a mix. The
 *   state map is a map of channels -> channel-state-map. A
 *   channel-state-map is a map of attrs -> boolean, where attr is one or
 *   more of :mute, :pause or :solo. Any states supplied are merged with
 *   the current state.
 * 
 *   Note that channels can be added to a mix via toggle, which can be
 *   used to add channels in a particular (e.g. paused) state.
 */
cljs.core.async.toggle = (function cljs$core$async$toggle(mix,state_map){
return cljs.core.async.toggle_STAR_.call(null,mix,state_map);
});
/**
 * Sets the solo mode of the mix. mode must be one of :mute or :pause
 */
cljs.core.async.solo_mode = (function cljs$core$async$solo_mode(mix,mode){
return cljs.core.async.solo_mode_STAR_.call(null,mix,mode);
});

/**
 * @interface
 */
cljs.core.async.Pub = function(){};

cljs.core.async.sub_STAR_ = (function cljs$core$async$sub_STAR_(p,v,ch,close_QMARK_){
if((!((p == null))) && (!((p.cljs$core$async$Pub$sub_STAR_$arity$4 == null)))){
return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else {
var x__8692__auto__ = (((p == null))?null:p);
var m__8693__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__8692__auto__)]);
if(!((m__8693__auto__ == null))){
return m__8693__auto__.call(null,p,v,ch,close_QMARK_);
} else {
var m__8693__auto____$1 = (cljs.core.async.sub_STAR_["_"]);
if(!((m__8693__auto____$1 == null))){
return m__8693__auto____$1.call(null,p,v,ch,close_QMARK_);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.sub*",p);
}
}
}
});

cljs.core.async.unsub_STAR_ = (function cljs$core$async$unsub_STAR_(p,v,ch){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_STAR_$arity$3 == null)))){
return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else {
var x__8692__auto__ = (((p == null))?null:p);
var m__8693__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__8692__auto__)]);
if(!((m__8693__auto__ == null))){
return m__8693__auto__.call(null,p,v,ch);
} else {
var m__8693__auto____$1 = (cljs.core.async.unsub_STAR_["_"]);
if(!((m__8693__auto____$1 == null))){
return m__8693__auto____$1.call(null,p,v,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_ = (function cljs$core$async$unsub_all_STAR_(var_args){
var args14748 = [];
var len__9095__auto___14751 = arguments.length;
var i__9096__auto___14752 = (0);
while(true){
if((i__9096__auto___14752 < len__9095__auto___14751)){
args14748.push((arguments[i__9096__auto___14752]));

var G__14753 = (i__9096__auto___14752 + (1));
i__9096__auto___14752 = G__14753;
continue;
} else {
}
break;
}

var G__14750 = args14748.length;
switch (G__14750) {
case 1:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14748.length)].join('')));

}
});

cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (p){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$1 == null)))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else {
var x__8692__auto__ = (((p == null))?null:p);
var m__8693__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__8692__auto__)]);
if(!((m__8693__auto__ == null))){
return m__8693__auto__.call(null,p);
} else {
var m__8693__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);
if(!((m__8693__auto____$1 == null))){
return m__8693__auto____$1.call(null,p);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (p,v){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$2 == null)))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else {
var x__8692__auto__ = (((p == null))?null:p);
var m__8693__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__8692__auto__)]);
if(!((m__8693__auto__ == null))){
return m__8693__auto__.call(null,p,v);
} else {
var m__8693__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);
if(!((m__8693__auto____$1 == null))){
return m__8693__auto____$1.call(null,p,v);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_.cljs$lang$maxFixedArity = 2;

/**
 * Creates and returns a pub(lication) of the supplied channel,
 *   partitioned into topics by the topic-fn. topic-fn will be applied to
 *   each value on the channel and the result will determine the 'topic'
 *   on which that value will be put. Channels can be subscribed to
 *   receive copies of topics using 'sub', and unsubscribed using
 *   'unsub'. Each topic will be handled by an internal mult on a
 *   dedicated channel. By default these internal channels are
 *   unbuffered, but a buf-fn can be supplied which, given a topic,
 *   creates a buffer with desired properties.
 * 
 *   Each item is distributed to all subs in parallel and synchronously,
 *   i.e. each sub must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow subs from holding up the pub.
 * 
 *   Items received when there are no matching subs get dropped.
 * 
 *   Note that if buf-fns are used then each topic is handled
 *   asynchronously, i.e. if a channel is subscribed to more than one
 *   topic it should not expect them to be interleaved identically with
 *   the source.
 */
cljs.core.async.pub = (function cljs$core$async$pub(var_args){
var args14756 = [];
var len__9095__auto___14881 = arguments.length;
var i__9096__auto___14882 = (0);
while(true){
if((i__9096__auto___14882 < len__9095__auto___14881)){
args14756.push((arguments[i__9096__auto___14882]));

var G__14883 = (i__9096__auto___14882 + (1));
i__9096__auto___14882 = G__14883;
continue;
} else {
}
break;
}

var G__14758 = args14756.length;
switch (G__14758) {
case 2:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14756.length)].join('')));

}
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2 = (function (ch,topic_fn){
return cljs.core.async.pub.call(null,ch,topic_fn,cljs.core.constantly.call(null,null));
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3 = (function (ch,topic_fn,buf_fn){
var mults = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var ensure_mult = ((function (mults){
return (function (topic){
var or__8037__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,mults),topic);
if(cljs.core.truth_(or__8037__auto__)){
return or__8037__auto__;
} else {
return cljs.core.get.call(null,cljs.core.swap_BANG_.call(null,mults,((function (or__8037__auto__,mults){
return (function (p1__14755_SHARP_){
if(cljs.core.truth_(p1__14755_SHARP_.call(null,topic))){
return p1__14755_SHARP_;
} else {
return cljs.core.assoc.call(null,p1__14755_SHARP_,topic,cljs.core.async.mult.call(null,cljs.core.async.chan.call(null,buf_fn.call(null,topic))));
}
});})(or__8037__auto__,mults))
),topic);
}
});})(mults))
;
var p = (function (){
if(typeof cljs.core.async.t_cljs$core$async14759 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Pub}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async14759 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta14760){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta14760 = meta14760;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async14759.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (mults,ensure_mult){
return (function (_14761,meta14760__$1){
var self__ = this;
var _14761__$1 = this;
return (new cljs.core.async.t_cljs$core$async14759(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta14760__$1));
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async14759.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (mults,ensure_mult){
return (function (_14761){
var self__ = this;
var _14761__$1 = this;
return self__.meta14760;
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async14759.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async14759.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async14759.prototype.cljs$core$async$Pub$ = true;

cljs.core.async.t_cljs$core$async14759.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = self__.ensure_mult.call(null,topic);
return cljs.core.async.tap.call(null,m,ch__$1,close_QMARK_);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async14759.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1){
var self__ = this;
var p__$1 = this;
var temp__4657__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,self__.mults),topic);
if(cljs.core.truth_(temp__4657__auto__)){
var m = temp__4657__auto__;
return cljs.core.async.untap.call(null,m,ch__$1);
} else {
return null;
}
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async14759.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_.call(null,self__.mults,cljs.core.PersistentArrayMap.EMPTY);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async14759.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = ((function (mults,ensure_mult){
return (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.call(null,self__.mults,cljs.core.dissoc,topic);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async14759.getBasis = ((function (mults,ensure_mult){
return (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta14760","meta14760",939395145,null)], null);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async14759.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async14759.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async14759";

cljs.core.async.t_cljs$core$async14759.cljs$lang$ctorPrWriter = ((function (mults,ensure_mult){
return (function (this__8635__auto__,writer__8636__auto__,opt__8637__auto__){
return cljs.core._write.call(null,writer__8636__auto__,"cljs.core.async/t_cljs$core$async14759");
});})(mults,ensure_mult))
;

cljs.core.async.__GT_t_cljs$core$async14759 = ((function (mults,ensure_mult){
return (function cljs$core$async$__GT_t_cljs$core$async14759(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta14760){
return (new cljs.core.async.t_cljs$core$async14759(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta14760));
});})(mults,ensure_mult))
;

}

return (new cljs.core.async.t_cljs$core$async14759(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__10543__auto___14885 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10543__auto___14885,mults,ensure_mult,p){
return (function (){
var f__10544__auto__ = (function (){var switch__10478__auto__ = ((function (c__10543__auto___14885,mults,ensure_mult,p){
return (function (state_14833){
var state_val_14834 = (state_14833[(1)]);
if((state_val_14834 === (7))){
var inst_14829 = (state_14833[(2)]);
var state_14833__$1 = state_14833;
var statearr_14835_14886 = state_14833__$1;
(statearr_14835_14886[(2)] = inst_14829);

(statearr_14835_14886[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14834 === (20))){
var state_14833__$1 = state_14833;
var statearr_14836_14887 = state_14833__$1;
(statearr_14836_14887[(2)] = null);

(statearr_14836_14887[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14834 === (1))){
var state_14833__$1 = state_14833;
var statearr_14837_14888 = state_14833__$1;
(statearr_14837_14888[(2)] = null);

(statearr_14837_14888[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14834 === (24))){
var inst_14812 = (state_14833[(7)]);
var inst_14821 = cljs.core.swap_BANG_.call(null,mults,cljs.core.dissoc,inst_14812);
var state_14833__$1 = state_14833;
var statearr_14838_14889 = state_14833__$1;
(statearr_14838_14889[(2)] = inst_14821);

(statearr_14838_14889[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14834 === (4))){
var inst_14764 = (state_14833[(8)]);
var inst_14764__$1 = (state_14833[(2)]);
var inst_14765 = (inst_14764__$1 == null);
var state_14833__$1 = (function (){var statearr_14839 = state_14833;
(statearr_14839[(8)] = inst_14764__$1);

return statearr_14839;
})();
if(cljs.core.truth_(inst_14765)){
var statearr_14840_14890 = state_14833__$1;
(statearr_14840_14890[(1)] = (5));

} else {
var statearr_14841_14891 = state_14833__$1;
(statearr_14841_14891[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14834 === (15))){
var inst_14806 = (state_14833[(2)]);
var state_14833__$1 = state_14833;
var statearr_14842_14892 = state_14833__$1;
(statearr_14842_14892[(2)] = inst_14806);

(statearr_14842_14892[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14834 === (21))){
var inst_14826 = (state_14833[(2)]);
var state_14833__$1 = (function (){var statearr_14843 = state_14833;
(statearr_14843[(9)] = inst_14826);

return statearr_14843;
})();
var statearr_14844_14893 = state_14833__$1;
(statearr_14844_14893[(2)] = null);

(statearr_14844_14893[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14834 === (13))){
var inst_14788 = (state_14833[(10)]);
var inst_14790 = cljs.core.chunked_seq_QMARK_.call(null,inst_14788);
var state_14833__$1 = state_14833;
if(inst_14790){
var statearr_14845_14894 = state_14833__$1;
(statearr_14845_14894[(1)] = (16));

} else {
var statearr_14846_14895 = state_14833__$1;
(statearr_14846_14895[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14834 === (22))){
var inst_14818 = (state_14833[(2)]);
var state_14833__$1 = state_14833;
if(cljs.core.truth_(inst_14818)){
var statearr_14847_14896 = state_14833__$1;
(statearr_14847_14896[(1)] = (23));

} else {
var statearr_14848_14897 = state_14833__$1;
(statearr_14848_14897[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14834 === (6))){
var inst_14814 = (state_14833[(11)]);
var inst_14812 = (state_14833[(7)]);
var inst_14764 = (state_14833[(8)]);
var inst_14812__$1 = topic_fn.call(null,inst_14764);
var inst_14813 = cljs.core.deref.call(null,mults);
var inst_14814__$1 = cljs.core.get.call(null,inst_14813,inst_14812__$1);
var state_14833__$1 = (function (){var statearr_14849 = state_14833;
(statearr_14849[(11)] = inst_14814__$1);

(statearr_14849[(7)] = inst_14812__$1);

return statearr_14849;
})();
if(cljs.core.truth_(inst_14814__$1)){
var statearr_14850_14898 = state_14833__$1;
(statearr_14850_14898[(1)] = (19));

} else {
var statearr_14851_14899 = state_14833__$1;
(statearr_14851_14899[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14834 === (25))){
var inst_14823 = (state_14833[(2)]);
var state_14833__$1 = state_14833;
var statearr_14852_14900 = state_14833__$1;
(statearr_14852_14900[(2)] = inst_14823);

(statearr_14852_14900[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14834 === (17))){
var inst_14788 = (state_14833[(10)]);
var inst_14797 = cljs.core.first.call(null,inst_14788);
var inst_14798 = cljs.core.async.muxch_STAR_.call(null,inst_14797);
var inst_14799 = cljs.core.async.close_BANG_.call(null,inst_14798);
var inst_14800 = cljs.core.next.call(null,inst_14788);
var inst_14774 = inst_14800;
var inst_14775 = null;
var inst_14776 = (0);
var inst_14777 = (0);
var state_14833__$1 = (function (){var statearr_14853 = state_14833;
(statearr_14853[(12)] = inst_14777);

(statearr_14853[(13)] = inst_14774);

(statearr_14853[(14)] = inst_14776);

(statearr_14853[(15)] = inst_14775);

(statearr_14853[(16)] = inst_14799);

return statearr_14853;
})();
var statearr_14854_14901 = state_14833__$1;
(statearr_14854_14901[(2)] = null);

(statearr_14854_14901[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14834 === (3))){
var inst_14831 = (state_14833[(2)]);
var state_14833__$1 = state_14833;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14833__$1,inst_14831);
} else {
if((state_val_14834 === (12))){
var inst_14808 = (state_14833[(2)]);
var state_14833__$1 = state_14833;
var statearr_14855_14902 = state_14833__$1;
(statearr_14855_14902[(2)] = inst_14808);

(statearr_14855_14902[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14834 === (2))){
var state_14833__$1 = state_14833;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_14833__$1,(4),ch);
} else {
if((state_val_14834 === (23))){
var state_14833__$1 = state_14833;
var statearr_14856_14903 = state_14833__$1;
(statearr_14856_14903[(2)] = null);

(statearr_14856_14903[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14834 === (19))){
var inst_14814 = (state_14833[(11)]);
var inst_14764 = (state_14833[(8)]);
var inst_14816 = cljs.core.async.muxch_STAR_.call(null,inst_14814);
var state_14833__$1 = state_14833;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14833__$1,(22),inst_14816,inst_14764);
} else {
if((state_val_14834 === (11))){
var inst_14774 = (state_14833[(13)]);
var inst_14788 = (state_14833[(10)]);
var inst_14788__$1 = cljs.core.seq.call(null,inst_14774);
var state_14833__$1 = (function (){var statearr_14857 = state_14833;
(statearr_14857[(10)] = inst_14788__$1);

return statearr_14857;
})();
if(inst_14788__$1){
var statearr_14858_14904 = state_14833__$1;
(statearr_14858_14904[(1)] = (13));

} else {
var statearr_14859_14905 = state_14833__$1;
(statearr_14859_14905[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14834 === (9))){
var inst_14810 = (state_14833[(2)]);
var state_14833__$1 = state_14833;
var statearr_14860_14906 = state_14833__$1;
(statearr_14860_14906[(2)] = inst_14810);

(statearr_14860_14906[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14834 === (5))){
var inst_14771 = cljs.core.deref.call(null,mults);
var inst_14772 = cljs.core.vals.call(null,inst_14771);
var inst_14773 = cljs.core.seq.call(null,inst_14772);
var inst_14774 = inst_14773;
var inst_14775 = null;
var inst_14776 = (0);
var inst_14777 = (0);
var state_14833__$1 = (function (){var statearr_14861 = state_14833;
(statearr_14861[(12)] = inst_14777);

(statearr_14861[(13)] = inst_14774);

(statearr_14861[(14)] = inst_14776);

(statearr_14861[(15)] = inst_14775);

return statearr_14861;
})();
var statearr_14862_14907 = state_14833__$1;
(statearr_14862_14907[(2)] = null);

(statearr_14862_14907[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14834 === (14))){
var state_14833__$1 = state_14833;
var statearr_14866_14908 = state_14833__$1;
(statearr_14866_14908[(2)] = null);

(statearr_14866_14908[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14834 === (16))){
var inst_14788 = (state_14833[(10)]);
var inst_14792 = cljs.core.chunk_first.call(null,inst_14788);
var inst_14793 = cljs.core.chunk_rest.call(null,inst_14788);
var inst_14794 = cljs.core.count.call(null,inst_14792);
var inst_14774 = inst_14793;
var inst_14775 = inst_14792;
var inst_14776 = inst_14794;
var inst_14777 = (0);
var state_14833__$1 = (function (){var statearr_14867 = state_14833;
(statearr_14867[(12)] = inst_14777);

(statearr_14867[(13)] = inst_14774);

(statearr_14867[(14)] = inst_14776);

(statearr_14867[(15)] = inst_14775);

return statearr_14867;
})();
var statearr_14868_14909 = state_14833__$1;
(statearr_14868_14909[(2)] = null);

(statearr_14868_14909[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14834 === (10))){
var inst_14777 = (state_14833[(12)]);
var inst_14774 = (state_14833[(13)]);
var inst_14776 = (state_14833[(14)]);
var inst_14775 = (state_14833[(15)]);
var inst_14782 = cljs.core._nth.call(null,inst_14775,inst_14777);
var inst_14783 = cljs.core.async.muxch_STAR_.call(null,inst_14782);
var inst_14784 = cljs.core.async.close_BANG_.call(null,inst_14783);
var inst_14785 = (inst_14777 + (1));
var tmp14863 = inst_14774;
var tmp14864 = inst_14776;
var tmp14865 = inst_14775;
var inst_14774__$1 = tmp14863;
var inst_14775__$1 = tmp14865;
var inst_14776__$1 = tmp14864;
var inst_14777__$1 = inst_14785;
var state_14833__$1 = (function (){var statearr_14869 = state_14833;
(statearr_14869[(12)] = inst_14777__$1);

(statearr_14869[(13)] = inst_14774__$1);

(statearr_14869[(14)] = inst_14776__$1);

(statearr_14869[(15)] = inst_14775__$1);

(statearr_14869[(17)] = inst_14784);

return statearr_14869;
})();
var statearr_14870_14910 = state_14833__$1;
(statearr_14870_14910[(2)] = null);

(statearr_14870_14910[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14834 === (18))){
var inst_14803 = (state_14833[(2)]);
var state_14833__$1 = state_14833;
var statearr_14871_14911 = state_14833__$1;
(statearr_14871_14911[(2)] = inst_14803);

(statearr_14871_14911[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14834 === (8))){
var inst_14777 = (state_14833[(12)]);
var inst_14776 = (state_14833[(14)]);
var inst_14779 = (inst_14777 < inst_14776);
var inst_14780 = inst_14779;
var state_14833__$1 = state_14833;
if(cljs.core.truth_(inst_14780)){
var statearr_14872_14912 = state_14833__$1;
(statearr_14872_14912[(1)] = (10));

} else {
var statearr_14873_14913 = state_14833__$1;
(statearr_14873_14913[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__10543__auto___14885,mults,ensure_mult,p))
;
return ((function (switch__10478__auto__,c__10543__auto___14885,mults,ensure_mult,p){
return (function() {
var cljs$core$async$state_machine__10479__auto__ = null;
var cljs$core$async$state_machine__10479__auto____0 = (function (){
var statearr_14877 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_14877[(0)] = cljs$core$async$state_machine__10479__auto__);

(statearr_14877[(1)] = (1));

return statearr_14877;
});
var cljs$core$async$state_machine__10479__auto____1 = (function (state_14833){
while(true){
var ret_value__10480__auto__ = (function (){try{while(true){
var result__10481__auto__ = switch__10478__auto__.call(null,state_14833);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10481__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10481__auto__;
}
break;
}
}catch (e14878){if((e14878 instanceof Object)){
var ex__10482__auto__ = e14878;
var statearr_14879_14914 = state_14833;
(statearr_14879_14914[(5)] = ex__10482__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14833);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e14878;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10480__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__14915 = state_14833;
state_14833 = G__14915;
continue;
} else {
return ret_value__10480__auto__;
}
break;
}
});
cljs$core$async$state_machine__10479__auto__ = function(state_14833){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__10479__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__10479__auto____1.call(this,state_14833);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__10479__auto____0;
cljs$core$async$state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__10479__auto____1;
return cljs$core$async$state_machine__10479__auto__;
})()
;})(switch__10478__auto__,c__10543__auto___14885,mults,ensure_mult,p))
})();
var state__10545__auto__ = (function (){var statearr_14880 = f__10544__auto__.call(null);
(statearr_14880[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10543__auto___14885);

return statearr_14880;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10545__auto__);
});})(c__10543__auto___14885,mults,ensure_mult,p))
);


return p;
});

cljs.core.async.pub.cljs$lang$maxFixedArity = 3;
/**
 * Subscribes a channel to a topic of a pub.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.sub = (function cljs$core$async$sub(var_args){
var args14916 = [];
var len__9095__auto___14919 = arguments.length;
var i__9096__auto___14920 = (0);
while(true){
if((i__9096__auto___14920 < len__9095__auto___14919)){
args14916.push((arguments[i__9096__auto___14920]));

var G__14921 = (i__9096__auto___14920 + (1));
i__9096__auto___14920 = G__14921;
continue;
} else {
}
break;
}

var G__14918 = args14916.length;
switch (G__14918) {
case 3:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14916.length)].join('')));

}
});

cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3 = (function (p,topic,ch){
return cljs.core.async.sub.call(null,p,topic,ch,true);
});

cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4 = (function (p,topic,ch,close_QMARK_){
return cljs.core.async.sub_STAR_.call(null,p,topic,ch,close_QMARK_);
});

cljs.core.async.sub.cljs$lang$maxFixedArity = 4;
/**
 * Unsubscribes a channel from a topic of a pub
 */
cljs.core.async.unsub = (function cljs$core$async$unsub(p,topic,ch){
return cljs.core.async.unsub_STAR_.call(null,p,topic,ch);
});
/**
 * Unsubscribes all channels from a pub, or a topic of a pub
 */
cljs.core.async.unsub_all = (function cljs$core$async$unsub_all(var_args){
var args14923 = [];
var len__9095__auto___14926 = arguments.length;
var i__9096__auto___14927 = (0);
while(true){
if((i__9096__auto___14927 < len__9095__auto___14926)){
args14923.push((arguments[i__9096__auto___14927]));

var G__14928 = (i__9096__auto___14927 + (1));
i__9096__auto___14927 = G__14928;
continue;
} else {
}
break;
}

var G__14925 = args14923.length;
switch (G__14925) {
case 1:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14923.length)].join('')));

}
});

cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1 = (function (p){
return cljs.core.async.unsub_all_STAR_.call(null,p);
});

cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2 = (function (p,topic){
return cljs.core.async.unsub_all_STAR_.call(null,p,topic);
});

cljs.core.async.unsub_all.cljs$lang$maxFixedArity = 2;
/**
 * Takes a function and a collection of source channels, and returns a
 *   channel which contains the values produced by applying f to the set
 *   of first items taken from each source channel, followed by applying
 *   f to the set of second items from each channel, until any one of the
 *   channels is closed, at which point the output channel will be
 *   closed. The returned channel will be unbuffered by default, or a
 *   buf-or-n can be supplied
 */
cljs.core.async.map = (function cljs$core$async$map(var_args){
var args14930 = [];
var len__9095__auto___15001 = arguments.length;
var i__9096__auto___15002 = (0);
while(true){
if((i__9096__auto___15002 < len__9095__auto___15001)){
args14930.push((arguments[i__9096__auto___15002]));

var G__15003 = (i__9096__auto___15002 + (1));
i__9096__auto___15002 = G__15003;
continue;
} else {
}
break;
}

var G__14932 = args14930.length;
switch (G__14932) {
case 2:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14930.length)].join('')));

}
});

cljs.core.async.map.cljs$core$IFn$_invoke$arity$2 = (function (f,chs){
return cljs.core.async.map.call(null,f,chs,null);
});

cljs.core.async.map.cljs$core$IFn$_invoke$arity$3 = (function (f,chs,buf_or_n){
var chs__$1 = cljs.core.vec.call(null,chs);
var out = cljs.core.async.chan.call(null,buf_or_n);
var cnt = cljs.core.count.call(null,chs__$1);
var rets = cljs.core.object_array.call(null,cnt);
var dchan = cljs.core.async.chan.call(null,(1));
var dctr = cljs.core.atom.call(null,null);
var done = cljs.core.mapv.call(null,((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (i){
return ((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (ret){
(rets[i] = ret);

if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.call(null,dchan,rets.slice((0)));
} else {
return null;
}
});
;})(chs__$1,out,cnt,rets,dchan,dctr))
});})(chs__$1,out,cnt,rets,dchan,dctr))
,cljs.core.range.call(null,cnt));
var c__10543__auto___15005 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10543__auto___15005,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (){
var f__10544__auto__ = (function (){var switch__10478__auto__ = ((function (c__10543__auto___15005,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (state_14971){
var state_val_14972 = (state_14971[(1)]);
if((state_val_14972 === (7))){
var state_14971__$1 = state_14971;
var statearr_14973_15006 = state_14971__$1;
(statearr_14973_15006[(2)] = null);

(statearr_14973_15006[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14972 === (1))){
var state_14971__$1 = state_14971;
var statearr_14974_15007 = state_14971__$1;
(statearr_14974_15007[(2)] = null);

(statearr_14974_15007[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14972 === (4))){
var inst_14935 = (state_14971[(7)]);
var inst_14937 = (inst_14935 < cnt);
var state_14971__$1 = state_14971;
if(cljs.core.truth_(inst_14937)){
var statearr_14975_15008 = state_14971__$1;
(statearr_14975_15008[(1)] = (6));

} else {
var statearr_14976_15009 = state_14971__$1;
(statearr_14976_15009[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14972 === (15))){
var inst_14967 = (state_14971[(2)]);
var state_14971__$1 = state_14971;
var statearr_14977_15010 = state_14971__$1;
(statearr_14977_15010[(2)] = inst_14967);

(statearr_14977_15010[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14972 === (13))){
var inst_14960 = cljs.core.async.close_BANG_.call(null,out);
var state_14971__$1 = state_14971;
var statearr_14978_15011 = state_14971__$1;
(statearr_14978_15011[(2)] = inst_14960);

(statearr_14978_15011[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14972 === (6))){
var state_14971__$1 = state_14971;
var statearr_14979_15012 = state_14971__$1;
(statearr_14979_15012[(2)] = null);

(statearr_14979_15012[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14972 === (3))){
var inst_14969 = (state_14971[(2)]);
var state_14971__$1 = state_14971;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14971__$1,inst_14969);
} else {
if((state_val_14972 === (12))){
var inst_14957 = (state_14971[(8)]);
var inst_14957__$1 = (state_14971[(2)]);
var inst_14958 = cljs.core.some.call(null,cljs.core.nil_QMARK_,inst_14957__$1);
var state_14971__$1 = (function (){var statearr_14980 = state_14971;
(statearr_14980[(8)] = inst_14957__$1);

return statearr_14980;
})();
if(cljs.core.truth_(inst_14958)){
var statearr_14981_15013 = state_14971__$1;
(statearr_14981_15013[(1)] = (13));

} else {
var statearr_14982_15014 = state_14971__$1;
(statearr_14982_15014[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14972 === (2))){
var inst_14934 = cljs.core.reset_BANG_.call(null,dctr,cnt);
var inst_14935 = (0);
var state_14971__$1 = (function (){var statearr_14983 = state_14971;
(statearr_14983[(7)] = inst_14935);

(statearr_14983[(9)] = inst_14934);

return statearr_14983;
})();
var statearr_14984_15015 = state_14971__$1;
(statearr_14984_15015[(2)] = null);

(statearr_14984_15015[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14972 === (11))){
var inst_14935 = (state_14971[(7)]);
var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_14971,(10),Object,null,(9));
var inst_14944 = chs__$1.call(null,inst_14935);
var inst_14945 = done.call(null,inst_14935);
var inst_14946 = cljs.core.async.take_BANG_.call(null,inst_14944,inst_14945);
var state_14971__$1 = state_14971;
var statearr_14985_15016 = state_14971__$1;
(statearr_14985_15016[(2)] = inst_14946);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14971__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14972 === (9))){
var inst_14935 = (state_14971[(7)]);
var inst_14948 = (state_14971[(2)]);
var inst_14949 = (inst_14935 + (1));
var inst_14935__$1 = inst_14949;
var state_14971__$1 = (function (){var statearr_14986 = state_14971;
(statearr_14986[(7)] = inst_14935__$1);

(statearr_14986[(10)] = inst_14948);

return statearr_14986;
})();
var statearr_14987_15017 = state_14971__$1;
(statearr_14987_15017[(2)] = null);

(statearr_14987_15017[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14972 === (5))){
var inst_14955 = (state_14971[(2)]);
var state_14971__$1 = (function (){var statearr_14988 = state_14971;
(statearr_14988[(11)] = inst_14955);

return statearr_14988;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_14971__$1,(12),dchan);
} else {
if((state_val_14972 === (14))){
var inst_14957 = (state_14971[(8)]);
var inst_14962 = cljs.core.apply.call(null,f,inst_14957);
var state_14971__$1 = state_14971;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14971__$1,(16),out,inst_14962);
} else {
if((state_val_14972 === (16))){
var inst_14964 = (state_14971[(2)]);
var state_14971__$1 = (function (){var statearr_14989 = state_14971;
(statearr_14989[(12)] = inst_14964);

return statearr_14989;
})();
var statearr_14990_15018 = state_14971__$1;
(statearr_14990_15018[(2)] = null);

(statearr_14990_15018[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14972 === (10))){
var inst_14939 = (state_14971[(2)]);
var inst_14940 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);
var state_14971__$1 = (function (){var statearr_14991 = state_14971;
(statearr_14991[(13)] = inst_14939);

return statearr_14991;
})();
var statearr_14992_15019 = state_14971__$1;
(statearr_14992_15019[(2)] = inst_14940);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14971__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14972 === (8))){
var inst_14953 = (state_14971[(2)]);
var state_14971__$1 = state_14971;
var statearr_14993_15020 = state_14971__$1;
(statearr_14993_15020[(2)] = inst_14953);

(statearr_14993_15020[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__10543__auto___15005,chs__$1,out,cnt,rets,dchan,dctr,done))
;
return ((function (switch__10478__auto__,c__10543__auto___15005,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function() {
var cljs$core$async$state_machine__10479__auto__ = null;
var cljs$core$async$state_machine__10479__auto____0 = (function (){
var statearr_14997 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_14997[(0)] = cljs$core$async$state_machine__10479__auto__);

(statearr_14997[(1)] = (1));

return statearr_14997;
});
var cljs$core$async$state_machine__10479__auto____1 = (function (state_14971){
while(true){
var ret_value__10480__auto__ = (function (){try{while(true){
var result__10481__auto__ = switch__10478__auto__.call(null,state_14971);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10481__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10481__auto__;
}
break;
}
}catch (e14998){if((e14998 instanceof Object)){
var ex__10482__auto__ = e14998;
var statearr_14999_15021 = state_14971;
(statearr_14999_15021[(5)] = ex__10482__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14971);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e14998;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10480__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__15022 = state_14971;
state_14971 = G__15022;
continue;
} else {
return ret_value__10480__auto__;
}
break;
}
});
cljs$core$async$state_machine__10479__auto__ = function(state_14971){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__10479__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__10479__auto____1.call(this,state_14971);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__10479__auto____0;
cljs$core$async$state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__10479__auto____1;
return cljs$core$async$state_machine__10479__auto__;
})()
;})(switch__10478__auto__,c__10543__auto___15005,chs__$1,out,cnt,rets,dchan,dctr,done))
})();
var state__10545__auto__ = (function (){var statearr_15000 = f__10544__auto__.call(null);
(statearr_15000[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10543__auto___15005);

return statearr_15000;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10545__auto__);
});})(c__10543__auto___15005,chs__$1,out,cnt,rets,dchan,dctr,done))
);


return out;
});

cljs.core.async.map.cljs$lang$maxFixedArity = 3;
/**
 * Takes a collection of source channels and returns a channel which
 *   contains all values taken from them. The returned channel will be
 *   unbuffered by default, or a buf-or-n can be supplied. The channel
 *   will close after all the source channels have closed.
 */
cljs.core.async.merge = (function cljs$core$async$merge(var_args){
var args15024 = [];
var len__9095__auto___15080 = arguments.length;
var i__9096__auto___15081 = (0);
while(true){
if((i__9096__auto___15081 < len__9095__auto___15080)){
args15024.push((arguments[i__9096__auto___15081]));

var G__15082 = (i__9096__auto___15081 + (1));
i__9096__auto___15081 = G__15082;
continue;
} else {
}
break;
}

var G__15026 = args15024.length;
switch (G__15026) {
case 1:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args15024.length)].join('')));

}
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1 = (function (chs){
return cljs.core.async.merge.call(null,chs,null);
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2 = (function (chs,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__10543__auto___15084 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10543__auto___15084,out){
return (function (){
var f__10544__auto__ = (function (){var switch__10478__auto__ = ((function (c__10543__auto___15084,out){
return (function (state_15056){
var state_val_15057 = (state_15056[(1)]);
if((state_val_15057 === (7))){
var inst_15036 = (state_15056[(7)]);
var inst_15035 = (state_15056[(8)]);
var inst_15035__$1 = (state_15056[(2)]);
var inst_15036__$1 = cljs.core.nth.call(null,inst_15035__$1,(0),null);
var inst_15037 = cljs.core.nth.call(null,inst_15035__$1,(1),null);
var inst_15038 = (inst_15036__$1 == null);
var state_15056__$1 = (function (){var statearr_15058 = state_15056;
(statearr_15058[(9)] = inst_15037);

(statearr_15058[(7)] = inst_15036__$1);

(statearr_15058[(8)] = inst_15035__$1);

return statearr_15058;
})();
if(cljs.core.truth_(inst_15038)){
var statearr_15059_15085 = state_15056__$1;
(statearr_15059_15085[(1)] = (8));

} else {
var statearr_15060_15086 = state_15056__$1;
(statearr_15060_15086[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15057 === (1))){
var inst_15027 = cljs.core.vec.call(null,chs);
var inst_15028 = inst_15027;
var state_15056__$1 = (function (){var statearr_15061 = state_15056;
(statearr_15061[(10)] = inst_15028);

return statearr_15061;
})();
var statearr_15062_15087 = state_15056__$1;
(statearr_15062_15087[(2)] = null);

(statearr_15062_15087[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15057 === (4))){
var inst_15028 = (state_15056[(10)]);
var state_15056__$1 = state_15056;
return cljs.core.async.ioc_alts_BANG_.call(null,state_15056__$1,(7),inst_15028);
} else {
if((state_val_15057 === (6))){
var inst_15052 = (state_15056[(2)]);
var state_15056__$1 = state_15056;
var statearr_15063_15088 = state_15056__$1;
(statearr_15063_15088[(2)] = inst_15052);

(statearr_15063_15088[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15057 === (3))){
var inst_15054 = (state_15056[(2)]);
var state_15056__$1 = state_15056;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_15056__$1,inst_15054);
} else {
if((state_val_15057 === (2))){
var inst_15028 = (state_15056[(10)]);
var inst_15030 = cljs.core.count.call(null,inst_15028);
var inst_15031 = (inst_15030 > (0));
var state_15056__$1 = state_15056;
if(cljs.core.truth_(inst_15031)){
var statearr_15065_15089 = state_15056__$1;
(statearr_15065_15089[(1)] = (4));

} else {
var statearr_15066_15090 = state_15056__$1;
(statearr_15066_15090[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15057 === (11))){
var inst_15028 = (state_15056[(10)]);
var inst_15045 = (state_15056[(2)]);
var tmp15064 = inst_15028;
var inst_15028__$1 = tmp15064;
var state_15056__$1 = (function (){var statearr_15067 = state_15056;
(statearr_15067[(11)] = inst_15045);

(statearr_15067[(10)] = inst_15028__$1);

return statearr_15067;
})();
var statearr_15068_15091 = state_15056__$1;
(statearr_15068_15091[(2)] = null);

(statearr_15068_15091[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15057 === (9))){
var inst_15036 = (state_15056[(7)]);
var state_15056__$1 = state_15056;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_15056__$1,(11),out,inst_15036);
} else {
if((state_val_15057 === (5))){
var inst_15050 = cljs.core.async.close_BANG_.call(null,out);
var state_15056__$1 = state_15056;
var statearr_15069_15092 = state_15056__$1;
(statearr_15069_15092[(2)] = inst_15050);

(statearr_15069_15092[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15057 === (10))){
var inst_15048 = (state_15056[(2)]);
var state_15056__$1 = state_15056;
var statearr_15070_15093 = state_15056__$1;
(statearr_15070_15093[(2)] = inst_15048);

(statearr_15070_15093[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15057 === (8))){
var inst_15028 = (state_15056[(10)]);
var inst_15037 = (state_15056[(9)]);
var inst_15036 = (state_15056[(7)]);
var inst_15035 = (state_15056[(8)]);
var inst_15040 = (function (){var cs = inst_15028;
var vec__15033 = inst_15035;
var v = inst_15036;
var c = inst_15037;
return ((function (cs,vec__15033,v,c,inst_15028,inst_15037,inst_15036,inst_15035,state_val_15057,c__10543__auto___15084,out){
return (function (p1__15023_SHARP_){
return cljs.core.not_EQ_.call(null,c,p1__15023_SHARP_);
});
;})(cs,vec__15033,v,c,inst_15028,inst_15037,inst_15036,inst_15035,state_val_15057,c__10543__auto___15084,out))
})();
var inst_15041 = cljs.core.filterv.call(null,inst_15040,inst_15028);
var inst_15028__$1 = inst_15041;
var state_15056__$1 = (function (){var statearr_15071 = state_15056;
(statearr_15071[(10)] = inst_15028__$1);

return statearr_15071;
})();
var statearr_15072_15094 = state_15056__$1;
(statearr_15072_15094[(2)] = null);

(statearr_15072_15094[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});})(c__10543__auto___15084,out))
;
return ((function (switch__10478__auto__,c__10543__auto___15084,out){
return (function() {
var cljs$core$async$state_machine__10479__auto__ = null;
var cljs$core$async$state_machine__10479__auto____0 = (function (){
var statearr_15076 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_15076[(0)] = cljs$core$async$state_machine__10479__auto__);

(statearr_15076[(1)] = (1));

return statearr_15076;
});
var cljs$core$async$state_machine__10479__auto____1 = (function (state_15056){
while(true){
var ret_value__10480__auto__ = (function (){try{while(true){
var result__10481__auto__ = switch__10478__auto__.call(null,state_15056);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10481__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10481__auto__;
}
break;
}
}catch (e15077){if((e15077 instanceof Object)){
var ex__10482__auto__ = e15077;
var statearr_15078_15095 = state_15056;
(statearr_15078_15095[(5)] = ex__10482__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_15056);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e15077;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10480__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__15096 = state_15056;
state_15056 = G__15096;
continue;
} else {
return ret_value__10480__auto__;
}
break;
}
});
cljs$core$async$state_machine__10479__auto__ = function(state_15056){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__10479__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__10479__auto____1.call(this,state_15056);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__10479__auto____0;
cljs$core$async$state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__10479__auto____1;
return cljs$core$async$state_machine__10479__auto__;
})()
;})(switch__10478__auto__,c__10543__auto___15084,out))
})();
var state__10545__auto__ = (function (){var statearr_15079 = f__10544__auto__.call(null);
(statearr_15079[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10543__auto___15084);

return statearr_15079;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10545__auto__);
});})(c__10543__auto___15084,out))
);


return out;
});

cljs.core.async.merge.cljs$lang$maxFixedArity = 2;
/**
 * Returns a channel containing the single (collection) result of the
 *   items taken from the channel conjoined to the supplied
 *   collection. ch must close before into produces a result.
 */
cljs.core.async.into = (function cljs$core$async$into(coll,ch){
return cljs.core.async.reduce.call(null,cljs.core.conj,coll,ch);
});
/**
 * Returns a channel that will return, at most, n items from ch. After n items
 * have been returned, or ch has been closed, the return chanel will close.
 * 
 *   The output channel is unbuffered by default, unless buf-or-n is given.
 */
cljs.core.async.take = (function cljs$core$async$take(var_args){
var args15097 = [];
var len__9095__auto___15146 = arguments.length;
var i__9096__auto___15147 = (0);
while(true){
if((i__9096__auto___15147 < len__9095__auto___15146)){
args15097.push((arguments[i__9096__auto___15147]));

var G__15148 = (i__9096__auto___15147 + (1));
i__9096__auto___15147 = G__15148;
continue;
} else {
}
break;
}

var G__15099 = args15097.length;
switch (G__15099) {
case 2:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args15097.length)].join('')));

}
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.take.call(null,n,ch,null);
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__10543__auto___15150 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10543__auto___15150,out){
return (function (){
var f__10544__auto__ = (function (){var switch__10478__auto__ = ((function (c__10543__auto___15150,out){
return (function (state_15123){
var state_val_15124 = (state_15123[(1)]);
if((state_val_15124 === (7))){
var inst_15105 = (state_15123[(7)]);
var inst_15105__$1 = (state_15123[(2)]);
var inst_15106 = (inst_15105__$1 == null);
var inst_15107 = cljs.core.not.call(null,inst_15106);
var state_15123__$1 = (function (){var statearr_15125 = state_15123;
(statearr_15125[(7)] = inst_15105__$1);

return statearr_15125;
})();
if(inst_15107){
var statearr_15126_15151 = state_15123__$1;
(statearr_15126_15151[(1)] = (8));

} else {
var statearr_15127_15152 = state_15123__$1;
(statearr_15127_15152[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15124 === (1))){
var inst_15100 = (0);
var state_15123__$1 = (function (){var statearr_15128 = state_15123;
(statearr_15128[(8)] = inst_15100);

return statearr_15128;
})();
var statearr_15129_15153 = state_15123__$1;
(statearr_15129_15153[(2)] = null);

(statearr_15129_15153[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15124 === (4))){
var state_15123__$1 = state_15123;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_15123__$1,(7),ch);
} else {
if((state_val_15124 === (6))){
var inst_15118 = (state_15123[(2)]);
var state_15123__$1 = state_15123;
var statearr_15130_15154 = state_15123__$1;
(statearr_15130_15154[(2)] = inst_15118);

(statearr_15130_15154[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15124 === (3))){
var inst_15120 = (state_15123[(2)]);
var inst_15121 = cljs.core.async.close_BANG_.call(null,out);
var state_15123__$1 = (function (){var statearr_15131 = state_15123;
(statearr_15131[(9)] = inst_15120);

return statearr_15131;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_15123__$1,inst_15121);
} else {
if((state_val_15124 === (2))){
var inst_15100 = (state_15123[(8)]);
var inst_15102 = (inst_15100 < n);
var state_15123__$1 = state_15123;
if(cljs.core.truth_(inst_15102)){
var statearr_15132_15155 = state_15123__$1;
(statearr_15132_15155[(1)] = (4));

} else {
var statearr_15133_15156 = state_15123__$1;
(statearr_15133_15156[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15124 === (11))){
var inst_15100 = (state_15123[(8)]);
var inst_15110 = (state_15123[(2)]);
var inst_15111 = (inst_15100 + (1));
var inst_15100__$1 = inst_15111;
var state_15123__$1 = (function (){var statearr_15134 = state_15123;
(statearr_15134[(10)] = inst_15110);

(statearr_15134[(8)] = inst_15100__$1);

return statearr_15134;
})();
var statearr_15135_15157 = state_15123__$1;
(statearr_15135_15157[(2)] = null);

(statearr_15135_15157[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15124 === (9))){
var state_15123__$1 = state_15123;
var statearr_15136_15158 = state_15123__$1;
(statearr_15136_15158[(2)] = null);

(statearr_15136_15158[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15124 === (5))){
var state_15123__$1 = state_15123;
var statearr_15137_15159 = state_15123__$1;
(statearr_15137_15159[(2)] = null);

(statearr_15137_15159[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15124 === (10))){
var inst_15115 = (state_15123[(2)]);
var state_15123__$1 = state_15123;
var statearr_15138_15160 = state_15123__$1;
(statearr_15138_15160[(2)] = inst_15115);

(statearr_15138_15160[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15124 === (8))){
var inst_15105 = (state_15123[(7)]);
var state_15123__$1 = state_15123;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_15123__$1,(11),out,inst_15105);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});})(c__10543__auto___15150,out))
;
return ((function (switch__10478__auto__,c__10543__auto___15150,out){
return (function() {
var cljs$core$async$state_machine__10479__auto__ = null;
var cljs$core$async$state_machine__10479__auto____0 = (function (){
var statearr_15142 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_15142[(0)] = cljs$core$async$state_machine__10479__auto__);

(statearr_15142[(1)] = (1));

return statearr_15142;
});
var cljs$core$async$state_machine__10479__auto____1 = (function (state_15123){
while(true){
var ret_value__10480__auto__ = (function (){try{while(true){
var result__10481__auto__ = switch__10478__auto__.call(null,state_15123);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10481__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10481__auto__;
}
break;
}
}catch (e15143){if((e15143 instanceof Object)){
var ex__10482__auto__ = e15143;
var statearr_15144_15161 = state_15123;
(statearr_15144_15161[(5)] = ex__10482__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_15123);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e15143;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10480__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__15162 = state_15123;
state_15123 = G__15162;
continue;
} else {
return ret_value__10480__auto__;
}
break;
}
});
cljs$core$async$state_machine__10479__auto__ = function(state_15123){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__10479__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__10479__auto____1.call(this,state_15123);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__10479__auto____0;
cljs$core$async$state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__10479__auto____1;
return cljs$core$async$state_machine__10479__auto__;
})()
;})(switch__10478__auto__,c__10543__auto___15150,out))
})();
var state__10545__auto__ = (function (){var statearr_15145 = f__10544__auto__.call(null);
(statearr_15145[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10543__auto___15150);

return statearr_15145;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10545__auto__);
});})(c__10543__auto___15150,out))
);


return out;
});

cljs.core.async.take.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
if(typeof cljs.core.async.t_cljs$core$async15170 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async15170 = (function (map_LT_,f,ch,meta15171){
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta15171 = meta15171;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async15170.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_15172,meta15171__$1){
var self__ = this;
var _15172__$1 = this;
return (new cljs.core.async.t_cljs$core$async15170(self__.map_LT_,self__.f,self__.ch,meta15171__$1));
});

cljs.core.async.t_cljs$core$async15170.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_15172){
var self__ = this;
var _15172__$1 = this;
return self__.meta15171;
});

cljs.core.async.t_cljs$core$async15170.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async15170.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async15170.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async15170.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async15170.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,(function (){
if(typeof cljs.core.async.t_cljs$core$async15173 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async15173 = (function (map_LT_,f,ch,meta15171,_,fn1,meta15174){
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta15171 = meta15171;
this._ = _;
this.fn1 = fn1;
this.meta15174 = meta15174;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async15173.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (___$1){
return (function (_15175,meta15174__$1){
var self__ = this;
var _15175__$1 = this;
return (new cljs.core.async.t_cljs$core$async15173(self__.map_LT_,self__.f,self__.ch,self__.meta15171,self__._,self__.fn1,meta15174__$1));
});})(___$1))
;

cljs.core.async.t_cljs$core$async15173.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (___$1){
return (function (_15175){
var self__ = this;
var _15175__$1 = this;
return self__.meta15174;
});})(___$1))
;

cljs.core.async.t_cljs$core$async15173.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async15173.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.fn1);
});})(___$1))
;

cljs.core.async.t_cljs$core$async15173.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
return true;
});})(___$1))
;

cljs.core.async.t_cljs$core$async15173.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit.call(null,self__.fn1);
return ((function (f1,___$2,___$1){
return (function (p1__15163_SHARP_){
return f1.call(null,(((p1__15163_SHARP_ == null))?null:self__.f.call(null,p1__15163_SHARP_)));
});
;})(f1,___$2,___$1))
});})(___$1))
;

cljs.core.async.t_cljs$core$async15173.getBasis = ((function (___$1){
return (function (){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map<","map<",-1235808357,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta15171","meta15171",-1789428622,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("cljs.core.async","t_cljs$core$async15170","cljs.core.async/t_cljs$core$async15170",919624302,null)], null)),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta15174","meta15174",-441927234,null)], null);
});})(___$1))
;

cljs.core.async.t_cljs$core$async15173.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async15173.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async15173";

cljs.core.async.t_cljs$core$async15173.cljs$lang$ctorPrWriter = ((function (___$1){
return (function (this__8635__auto__,writer__8636__auto__,opt__8637__auto__){
return cljs.core._write.call(null,writer__8636__auto__,"cljs.core.async/t_cljs$core$async15173");
});})(___$1))
;

cljs.core.async.__GT_t_cljs$core$async15173 = ((function (___$1){
return (function cljs$core$async$map_LT__$___GT_t_cljs$core$async15173(map_LT___$1,f__$1,ch__$1,meta15171__$1,___$2,fn1__$1,meta15174){
return (new cljs.core.async.t_cljs$core$async15173(map_LT___$1,f__$1,ch__$1,meta15171__$1,___$2,fn1__$1,meta15174));
});})(___$1))
;

}

return (new cljs.core.async.t_cljs$core$async15173(self__.map_LT_,self__.f,self__.ch,self__.meta15171,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY));
})()
);
if(cljs.core.truth_((function (){var and__8025__auto__ = ret;
if(cljs.core.truth_(and__8025__auto__)){
return !((cljs.core.deref.call(null,ret) == null));
} else {
return and__8025__auto__;
}
})())){
return cljs.core.async.impl.channels.box.call(null,self__.f.call(null,cljs.core.deref.call(null,ret)));
} else {
return ret;
}
});

cljs.core.async.t_cljs$core$async15170.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async15170.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
});

cljs.core.async.t_cljs$core$async15170.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map<","map<",-1235808357,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta15171","meta15171",-1789428622,null)], null);
});

cljs.core.async.t_cljs$core$async15170.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async15170.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async15170";

cljs.core.async.t_cljs$core$async15170.cljs$lang$ctorPrWriter = (function (this__8635__auto__,writer__8636__auto__,opt__8637__auto__){
return cljs.core._write.call(null,writer__8636__auto__,"cljs.core.async/t_cljs$core$async15170");
});

cljs.core.async.__GT_t_cljs$core$async15170 = (function cljs$core$async$map_LT__$___GT_t_cljs$core$async15170(map_LT___$1,f__$1,ch__$1,meta15171){
return (new cljs.core.async.t_cljs$core$async15170(map_LT___$1,f__$1,ch__$1,meta15171));
});

}

return (new cljs.core.async.t_cljs$core$async15170(cljs$core$async$map_LT_,f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
if(typeof cljs.core.async.t_cljs$core$async15179 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async15179 = (function (map_GT_,f,ch,meta15180){
this.map_GT_ = map_GT_;
this.f = f;
this.ch = ch;
this.meta15180 = meta15180;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async15179.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_15181,meta15180__$1){
var self__ = this;
var _15181__$1 = this;
return (new cljs.core.async.t_cljs$core$async15179(self__.map_GT_,self__.f,self__.ch,meta15180__$1));
});

cljs.core.async.t_cljs$core$async15179.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_15181){
var self__ = this;
var _15181__$1 = this;
return self__.meta15180;
});

cljs.core.async.t_cljs$core$async15179.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async15179.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async15179.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async15179.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t_cljs$core$async15179.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async15179.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,self__.f.call(null,val),fn1);
});

cljs.core.async.t_cljs$core$async15179.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map>","map>",1676369295,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta15180","meta15180",603199601,null)], null);
});

cljs.core.async.t_cljs$core$async15179.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async15179.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async15179";

cljs.core.async.t_cljs$core$async15179.cljs$lang$ctorPrWriter = (function (this__8635__auto__,writer__8636__auto__,opt__8637__auto__){
return cljs.core._write.call(null,writer__8636__auto__,"cljs.core.async/t_cljs$core$async15179");
});

cljs.core.async.__GT_t_cljs$core$async15179 = (function cljs$core$async$map_GT__$___GT_t_cljs$core$async15179(map_GT___$1,f__$1,ch__$1,meta15180){
return (new cljs.core.async.t_cljs$core$async15179(map_GT___$1,f__$1,ch__$1,meta15180));
});

}

return (new cljs.core.async.t_cljs$core$async15179(cljs$core$async$map_GT_,f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
if(typeof cljs.core.async.t_cljs$core$async15185 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async15185 = (function (filter_GT_,p,ch,meta15186){
this.filter_GT_ = filter_GT_;
this.p = p;
this.ch = ch;
this.meta15186 = meta15186;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async15185.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_15187,meta15186__$1){
var self__ = this;
var _15187__$1 = this;
return (new cljs.core.async.t_cljs$core$async15185(self__.filter_GT_,self__.p,self__.ch,meta15186__$1));
});

cljs.core.async.t_cljs$core$async15185.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_15187){
var self__ = this;
var _15187__$1 = this;
return self__.meta15186;
});

cljs.core.async.t_cljs$core$async15185.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async15185.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async15185.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async15185.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async15185.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t_cljs$core$async15185.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async15185.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.p.call(null,val))){
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box.call(null,cljs.core.not.call(null,cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch)));
}
});

cljs.core.async.t_cljs$core$async15185.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"filter>","filter>",-37644455,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta15186","meta15186",-1248668194,null)], null);
});

cljs.core.async.t_cljs$core$async15185.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async15185.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async15185";

cljs.core.async.t_cljs$core$async15185.cljs$lang$ctorPrWriter = (function (this__8635__auto__,writer__8636__auto__,opt__8637__auto__){
return cljs.core._write.call(null,writer__8636__auto__,"cljs.core.async/t_cljs$core$async15185");
});

cljs.core.async.__GT_t_cljs$core$async15185 = (function cljs$core$async$filter_GT__$___GT_t_cljs$core$async15185(filter_GT___$1,p__$1,ch__$1,meta15186){
return (new cljs.core.async.t_cljs$core$async15185(filter_GT___$1,p__$1,ch__$1,meta15186));
});

}

return (new cljs.core.async.t_cljs$core$async15185(cljs$core$async$filter_GT_,p,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_GT_ = (function cljs$core$async$remove_GT_(p,ch){
return cljs.core.async.filter_GT_.call(null,cljs.core.complement.call(null,p),ch);
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_LT_ = (function cljs$core$async$filter_LT_(var_args){
var args15188 = [];
var len__9095__auto___15232 = arguments.length;
var i__9096__auto___15233 = (0);
while(true){
if((i__9096__auto___15233 < len__9095__auto___15232)){
args15188.push((arguments[i__9096__auto___15233]));

var G__15234 = (i__9096__auto___15233 + (1));
i__9096__auto___15233 = G__15234;
continue;
} else {
}
break;
}

var G__15190 = args15188.length;
switch (G__15190) {
case 2:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args15188.length)].join('')));

}
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.filter_LT_.call(null,p,ch,null);
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__10543__auto___15236 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10543__auto___15236,out){
return (function (){
var f__10544__auto__ = (function (){var switch__10478__auto__ = ((function (c__10543__auto___15236,out){
return (function (state_15211){
var state_val_15212 = (state_15211[(1)]);
if((state_val_15212 === (7))){
var inst_15207 = (state_15211[(2)]);
var state_15211__$1 = state_15211;
var statearr_15213_15237 = state_15211__$1;
(statearr_15213_15237[(2)] = inst_15207);

(statearr_15213_15237[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15212 === (1))){
var state_15211__$1 = state_15211;
var statearr_15214_15238 = state_15211__$1;
(statearr_15214_15238[(2)] = null);

(statearr_15214_15238[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15212 === (4))){
var inst_15193 = (state_15211[(7)]);
var inst_15193__$1 = (state_15211[(2)]);
var inst_15194 = (inst_15193__$1 == null);
var state_15211__$1 = (function (){var statearr_15215 = state_15211;
(statearr_15215[(7)] = inst_15193__$1);

return statearr_15215;
})();
if(cljs.core.truth_(inst_15194)){
var statearr_15216_15239 = state_15211__$1;
(statearr_15216_15239[(1)] = (5));

} else {
var statearr_15217_15240 = state_15211__$1;
(statearr_15217_15240[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15212 === (6))){
var inst_15193 = (state_15211[(7)]);
var inst_15198 = p.call(null,inst_15193);
var state_15211__$1 = state_15211;
if(cljs.core.truth_(inst_15198)){
var statearr_15218_15241 = state_15211__$1;
(statearr_15218_15241[(1)] = (8));

} else {
var statearr_15219_15242 = state_15211__$1;
(statearr_15219_15242[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15212 === (3))){
var inst_15209 = (state_15211[(2)]);
var state_15211__$1 = state_15211;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_15211__$1,inst_15209);
} else {
if((state_val_15212 === (2))){
var state_15211__$1 = state_15211;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_15211__$1,(4),ch);
} else {
if((state_val_15212 === (11))){
var inst_15201 = (state_15211[(2)]);
var state_15211__$1 = state_15211;
var statearr_15220_15243 = state_15211__$1;
(statearr_15220_15243[(2)] = inst_15201);

(statearr_15220_15243[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15212 === (9))){
var state_15211__$1 = state_15211;
var statearr_15221_15244 = state_15211__$1;
(statearr_15221_15244[(2)] = null);

(statearr_15221_15244[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15212 === (5))){
var inst_15196 = cljs.core.async.close_BANG_.call(null,out);
var state_15211__$1 = state_15211;
var statearr_15222_15245 = state_15211__$1;
(statearr_15222_15245[(2)] = inst_15196);

(statearr_15222_15245[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15212 === (10))){
var inst_15204 = (state_15211[(2)]);
var state_15211__$1 = (function (){var statearr_15223 = state_15211;
(statearr_15223[(8)] = inst_15204);

return statearr_15223;
})();
var statearr_15224_15246 = state_15211__$1;
(statearr_15224_15246[(2)] = null);

(statearr_15224_15246[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15212 === (8))){
var inst_15193 = (state_15211[(7)]);
var state_15211__$1 = state_15211;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_15211__$1,(11),out,inst_15193);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});})(c__10543__auto___15236,out))
;
return ((function (switch__10478__auto__,c__10543__auto___15236,out){
return (function() {
var cljs$core$async$state_machine__10479__auto__ = null;
var cljs$core$async$state_machine__10479__auto____0 = (function (){
var statearr_15228 = [null,null,null,null,null,null,null,null,null];
(statearr_15228[(0)] = cljs$core$async$state_machine__10479__auto__);

(statearr_15228[(1)] = (1));

return statearr_15228;
});
var cljs$core$async$state_machine__10479__auto____1 = (function (state_15211){
while(true){
var ret_value__10480__auto__ = (function (){try{while(true){
var result__10481__auto__ = switch__10478__auto__.call(null,state_15211);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10481__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10481__auto__;
}
break;
}
}catch (e15229){if((e15229 instanceof Object)){
var ex__10482__auto__ = e15229;
var statearr_15230_15247 = state_15211;
(statearr_15230_15247[(5)] = ex__10482__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_15211);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e15229;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10480__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__15248 = state_15211;
state_15211 = G__15248;
continue;
} else {
return ret_value__10480__auto__;
}
break;
}
});
cljs$core$async$state_machine__10479__auto__ = function(state_15211){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__10479__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__10479__auto____1.call(this,state_15211);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__10479__auto____0;
cljs$core$async$state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__10479__auto____1;
return cljs$core$async$state_machine__10479__auto__;
})()
;})(switch__10478__auto__,c__10543__auto___15236,out))
})();
var state__10545__auto__ = (function (){var statearr_15231 = f__10544__auto__.call(null);
(statearr_15231[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10543__auto___15236);

return statearr_15231;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10545__auto__);
});})(c__10543__auto___15236,out))
);


return out;
});

cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var args15249 = [];
var len__9095__auto___15252 = arguments.length;
var i__9096__auto___15253 = (0);
while(true){
if((i__9096__auto___15253 < len__9095__auto___15252)){
args15249.push((arguments[i__9096__auto___15253]));

var G__15254 = (i__9096__auto___15253 + (1));
i__9096__auto___15253 = G__15254;
continue;
} else {
}
break;
}

var G__15251 = args15249.length;
switch (G__15251) {
case 2:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args15249.length)].join('')));

}
});

cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.remove_LT_.call(null,p,ch,null);
});

cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
return cljs.core.async.filter_LT_.call(null,cljs.core.complement.call(null,p),ch,buf_or_n);
});

cljs.core.async.remove_LT_.cljs$lang$maxFixedArity = 3;
cljs.core.async.mapcat_STAR_ = (function cljs$core$async$mapcat_STAR_(f,in$,out){
var c__10543__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10543__auto__){
return (function (){
var f__10544__auto__ = (function (){var switch__10478__auto__ = ((function (c__10543__auto__){
return (function (state_15421){
var state_val_15422 = (state_15421[(1)]);
if((state_val_15422 === (7))){
var inst_15417 = (state_15421[(2)]);
var state_15421__$1 = state_15421;
var statearr_15423_15464 = state_15421__$1;
(statearr_15423_15464[(2)] = inst_15417);

(statearr_15423_15464[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15422 === (20))){
var inst_15387 = (state_15421[(7)]);
var inst_15398 = (state_15421[(2)]);
var inst_15399 = cljs.core.next.call(null,inst_15387);
var inst_15373 = inst_15399;
var inst_15374 = null;
var inst_15375 = (0);
var inst_15376 = (0);
var state_15421__$1 = (function (){var statearr_15424 = state_15421;
(statearr_15424[(8)] = inst_15398);

(statearr_15424[(9)] = inst_15373);

(statearr_15424[(10)] = inst_15375);

(statearr_15424[(11)] = inst_15374);

(statearr_15424[(12)] = inst_15376);

return statearr_15424;
})();
var statearr_15425_15465 = state_15421__$1;
(statearr_15425_15465[(2)] = null);

(statearr_15425_15465[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15422 === (1))){
var state_15421__$1 = state_15421;
var statearr_15426_15466 = state_15421__$1;
(statearr_15426_15466[(2)] = null);

(statearr_15426_15466[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15422 === (4))){
var inst_15362 = (state_15421[(13)]);
var inst_15362__$1 = (state_15421[(2)]);
var inst_15363 = (inst_15362__$1 == null);
var state_15421__$1 = (function (){var statearr_15427 = state_15421;
(statearr_15427[(13)] = inst_15362__$1);

return statearr_15427;
})();
if(cljs.core.truth_(inst_15363)){
var statearr_15428_15467 = state_15421__$1;
(statearr_15428_15467[(1)] = (5));

} else {
var statearr_15429_15468 = state_15421__$1;
(statearr_15429_15468[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15422 === (15))){
var state_15421__$1 = state_15421;
var statearr_15433_15469 = state_15421__$1;
(statearr_15433_15469[(2)] = null);

(statearr_15433_15469[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15422 === (21))){
var state_15421__$1 = state_15421;
var statearr_15434_15470 = state_15421__$1;
(statearr_15434_15470[(2)] = null);

(statearr_15434_15470[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15422 === (13))){
var inst_15373 = (state_15421[(9)]);
var inst_15375 = (state_15421[(10)]);
var inst_15374 = (state_15421[(11)]);
var inst_15376 = (state_15421[(12)]);
var inst_15383 = (state_15421[(2)]);
var inst_15384 = (inst_15376 + (1));
var tmp15430 = inst_15373;
var tmp15431 = inst_15375;
var tmp15432 = inst_15374;
var inst_15373__$1 = tmp15430;
var inst_15374__$1 = tmp15432;
var inst_15375__$1 = tmp15431;
var inst_15376__$1 = inst_15384;
var state_15421__$1 = (function (){var statearr_15435 = state_15421;
(statearr_15435[(9)] = inst_15373__$1);

(statearr_15435[(14)] = inst_15383);

(statearr_15435[(10)] = inst_15375__$1);

(statearr_15435[(11)] = inst_15374__$1);

(statearr_15435[(12)] = inst_15376__$1);

return statearr_15435;
})();
var statearr_15436_15471 = state_15421__$1;
(statearr_15436_15471[(2)] = null);

(statearr_15436_15471[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15422 === (22))){
var state_15421__$1 = state_15421;
var statearr_15437_15472 = state_15421__$1;
(statearr_15437_15472[(2)] = null);

(statearr_15437_15472[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15422 === (6))){
var inst_15362 = (state_15421[(13)]);
var inst_15371 = f.call(null,inst_15362);
var inst_15372 = cljs.core.seq.call(null,inst_15371);
var inst_15373 = inst_15372;
var inst_15374 = null;
var inst_15375 = (0);
var inst_15376 = (0);
var state_15421__$1 = (function (){var statearr_15438 = state_15421;
(statearr_15438[(9)] = inst_15373);

(statearr_15438[(10)] = inst_15375);

(statearr_15438[(11)] = inst_15374);

(statearr_15438[(12)] = inst_15376);

return statearr_15438;
})();
var statearr_15439_15473 = state_15421__$1;
(statearr_15439_15473[(2)] = null);

(statearr_15439_15473[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15422 === (17))){
var inst_15387 = (state_15421[(7)]);
var inst_15391 = cljs.core.chunk_first.call(null,inst_15387);
var inst_15392 = cljs.core.chunk_rest.call(null,inst_15387);
var inst_15393 = cljs.core.count.call(null,inst_15391);
var inst_15373 = inst_15392;
var inst_15374 = inst_15391;
var inst_15375 = inst_15393;
var inst_15376 = (0);
var state_15421__$1 = (function (){var statearr_15440 = state_15421;
(statearr_15440[(9)] = inst_15373);

(statearr_15440[(10)] = inst_15375);

(statearr_15440[(11)] = inst_15374);

(statearr_15440[(12)] = inst_15376);

return statearr_15440;
})();
var statearr_15441_15474 = state_15421__$1;
(statearr_15441_15474[(2)] = null);

(statearr_15441_15474[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15422 === (3))){
var inst_15419 = (state_15421[(2)]);
var state_15421__$1 = state_15421;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_15421__$1,inst_15419);
} else {
if((state_val_15422 === (12))){
var inst_15407 = (state_15421[(2)]);
var state_15421__$1 = state_15421;
var statearr_15442_15475 = state_15421__$1;
(statearr_15442_15475[(2)] = inst_15407);

(statearr_15442_15475[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15422 === (2))){
var state_15421__$1 = state_15421;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_15421__$1,(4),in$);
} else {
if((state_val_15422 === (23))){
var inst_15415 = (state_15421[(2)]);
var state_15421__$1 = state_15421;
var statearr_15443_15476 = state_15421__$1;
(statearr_15443_15476[(2)] = inst_15415);

(statearr_15443_15476[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15422 === (19))){
var inst_15402 = (state_15421[(2)]);
var state_15421__$1 = state_15421;
var statearr_15444_15477 = state_15421__$1;
(statearr_15444_15477[(2)] = inst_15402);

(statearr_15444_15477[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15422 === (11))){
var inst_15373 = (state_15421[(9)]);
var inst_15387 = (state_15421[(7)]);
var inst_15387__$1 = cljs.core.seq.call(null,inst_15373);
var state_15421__$1 = (function (){var statearr_15445 = state_15421;
(statearr_15445[(7)] = inst_15387__$1);

return statearr_15445;
})();
if(inst_15387__$1){
var statearr_15446_15478 = state_15421__$1;
(statearr_15446_15478[(1)] = (14));

} else {
var statearr_15447_15479 = state_15421__$1;
(statearr_15447_15479[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15422 === (9))){
var inst_15409 = (state_15421[(2)]);
var inst_15410 = cljs.core.async.impl.protocols.closed_QMARK_.call(null,out);
var state_15421__$1 = (function (){var statearr_15448 = state_15421;
(statearr_15448[(15)] = inst_15409);

return statearr_15448;
})();
if(cljs.core.truth_(inst_15410)){
var statearr_15449_15480 = state_15421__$1;
(statearr_15449_15480[(1)] = (21));

} else {
var statearr_15450_15481 = state_15421__$1;
(statearr_15450_15481[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15422 === (5))){
var inst_15365 = cljs.core.async.close_BANG_.call(null,out);
var state_15421__$1 = state_15421;
var statearr_15451_15482 = state_15421__$1;
(statearr_15451_15482[(2)] = inst_15365);

(statearr_15451_15482[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15422 === (14))){
var inst_15387 = (state_15421[(7)]);
var inst_15389 = cljs.core.chunked_seq_QMARK_.call(null,inst_15387);
var state_15421__$1 = state_15421;
if(inst_15389){
var statearr_15452_15483 = state_15421__$1;
(statearr_15452_15483[(1)] = (17));

} else {
var statearr_15453_15484 = state_15421__$1;
(statearr_15453_15484[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15422 === (16))){
var inst_15405 = (state_15421[(2)]);
var state_15421__$1 = state_15421;
var statearr_15454_15485 = state_15421__$1;
(statearr_15454_15485[(2)] = inst_15405);

(statearr_15454_15485[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15422 === (10))){
var inst_15374 = (state_15421[(11)]);
var inst_15376 = (state_15421[(12)]);
var inst_15381 = cljs.core._nth.call(null,inst_15374,inst_15376);
var state_15421__$1 = state_15421;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_15421__$1,(13),out,inst_15381);
} else {
if((state_val_15422 === (18))){
var inst_15387 = (state_15421[(7)]);
var inst_15396 = cljs.core.first.call(null,inst_15387);
var state_15421__$1 = state_15421;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_15421__$1,(20),out,inst_15396);
} else {
if((state_val_15422 === (8))){
var inst_15375 = (state_15421[(10)]);
var inst_15376 = (state_15421[(12)]);
var inst_15378 = (inst_15376 < inst_15375);
var inst_15379 = inst_15378;
var state_15421__$1 = state_15421;
if(cljs.core.truth_(inst_15379)){
var statearr_15455_15486 = state_15421__$1;
(statearr_15455_15486[(1)] = (10));

} else {
var statearr_15456_15487 = state_15421__$1;
(statearr_15456_15487[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__10543__auto__))
;
return ((function (switch__10478__auto__,c__10543__auto__){
return (function() {
var cljs$core$async$mapcat_STAR__$_state_machine__10479__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__10479__auto____0 = (function (){
var statearr_15460 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_15460[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__10479__auto__);

(statearr_15460[(1)] = (1));

return statearr_15460;
});
var cljs$core$async$mapcat_STAR__$_state_machine__10479__auto____1 = (function (state_15421){
while(true){
var ret_value__10480__auto__ = (function (){try{while(true){
var result__10481__auto__ = switch__10478__auto__.call(null,state_15421);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10481__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10481__auto__;
}
break;
}
}catch (e15461){if((e15461 instanceof Object)){
var ex__10482__auto__ = e15461;
var statearr_15462_15488 = state_15421;
(statearr_15462_15488[(5)] = ex__10482__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_15421);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e15461;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10480__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__15489 = state_15421;
state_15421 = G__15489;
continue;
} else {
return ret_value__10480__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__10479__auto__ = function(state_15421){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__10479__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__10479__auto____1.call(this,state_15421);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__10479__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__10479__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__10479__auto__;
})()
;})(switch__10478__auto__,c__10543__auto__))
})();
var state__10545__auto__ = (function (){var statearr_15463 = f__10544__auto__.call(null);
(statearr_15463[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10543__auto__);

return statearr_15463;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10545__auto__);
});})(c__10543__auto__))
);

return c__10543__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var args15490 = [];
var len__9095__auto___15493 = arguments.length;
var i__9096__auto___15494 = (0);
while(true){
if((i__9096__auto___15494 < len__9095__auto___15493)){
args15490.push((arguments[i__9096__auto___15494]));

var G__15495 = (i__9096__auto___15494 + (1));
i__9096__auto___15494 = G__15495;
continue;
} else {
}
break;
}

var G__15492 = args15490.length;
switch (G__15492) {
case 2:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args15490.length)].join('')));

}
});

cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = (function (f,in$){
return cljs.core.async.mapcat_LT_.call(null,f,in$,null);
});

cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = (function (f,in$,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
cljs.core.async.mapcat_STAR_.call(null,f,in$,out);

return out;
});

cljs.core.async.mapcat_LT_.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_GT_ = (function cljs$core$async$mapcat_GT_(var_args){
var args15497 = [];
var len__9095__auto___15500 = arguments.length;
var i__9096__auto___15501 = (0);
while(true){
if((i__9096__auto___15501 < len__9095__auto___15500)){
args15497.push((arguments[i__9096__auto___15501]));

var G__15502 = (i__9096__auto___15501 + (1));
i__9096__auto___15501 = G__15502;
continue;
} else {
}
break;
}

var G__15499 = args15497.length;
switch (G__15499) {
case 2:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args15497.length)].join('')));

}
});

cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = (function (f,out){
return cljs.core.async.mapcat_GT_.call(null,f,out,null);
});

cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = (function (f,out,buf_or_n){
var in$ = cljs.core.async.chan.call(null,buf_or_n);
cljs.core.async.mapcat_STAR_.call(null,f,in$,out);

return in$;
});

cljs.core.async.mapcat_GT_.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.unique = (function cljs$core$async$unique(var_args){
var args15504 = [];
var len__9095__auto___15555 = arguments.length;
var i__9096__auto___15556 = (0);
while(true){
if((i__9096__auto___15556 < len__9095__auto___15555)){
args15504.push((arguments[i__9096__auto___15556]));

var G__15557 = (i__9096__auto___15556 + (1));
i__9096__auto___15556 = G__15557;
continue;
} else {
}
break;
}

var G__15506 = args15504.length;
switch (G__15506) {
case 1:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args15504.length)].join('')));

}
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return cljs.core.async.unique.call(null,ch,null);
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2 = (function (ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__10543__auto___15559 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10543__auto___15559,out){
return (function (){
var f__10544__auto__ = (function (){var switch__10478__auto__ = ((function (c__10543__auto___15559,out){
return (function (state_15530){
var state_val_15531 = (state_15530[(1)]);
if((state_val_15531 === (7))){
var inst_15525 = (state_15530[(2)]);
var state_15530__$1 = state_15530;
var statearr_15532_15560 = state_15530__$1;
(statearr_15532_15560[(2)] = inst_15525);

(statearr_15532_15560[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15531 === (1))){
var inst_15507 = null;
var state_15530__$1 = (function (){var statearr_15533 = state_15530;
(statearr_15533[(7)] = inst_15507);

return statearr_15533;
})();
var statearr_15534_15561 = state_15530__$1;
(statearr_15534_15561[(2)] = null);

(statearr_15534_15561[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15531 === (4))){
var inst_15510 = (state_15530[(8)]);
var inst_15510__$1 = (state_15530[(2)]);
var inst_15511 = (inst_15510__$1 == null);
var inst_15512 = cljs.core.not.call(null,inst_15511);
var state_15530__$1 = (function (){var statearr_15535 = state_15530;
(statearr_15535[(8)] = inst_15510__$1);

return statearr_15535;
})();
if(inst_15512){
var statearr_15536_15562 = state_15530__$1;
(statearr_15536_15562[(1)] = (5));

} else {
var statearr_15537_15563 = state_15530__$1;
(statearr_15537_15563[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15531 === (6))){
var state_15530__$1 = state_15530;
var statearr_15538_15564 = state_15530__$1;
(statearr_15538_15564[(2)] = null);

(statearr_15538_15564[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15531 === (3))){
var inst_15527 = (state_15530[(2)]);
var inst_15528 = cljs.core.async.close_BANG_.call(null,out);
var state_15530__$1 = (function (){var statearr_15539 = state_15530;
(statearr_15539[(9)] = inst_15527);

return statearr_15539;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_15530__$1,inst_15528);
} else {
if((state_val_15531 === (2))){
var state_15530__$1 = state_15530;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_15530__$1,(4),ch);
} else {
if((state_val_15531 === (11))){
var inst_15510 = (state_15530[(8)]);
var inst_15519 = (state_15530[(2)]);
var inst_15507 = inst_15510;
var state_15530__$1 = (function (){var statearr_15540 = state_15530;
(statearr_15540[(10)] = inst_15519);

(statearr_15540[(7)] = inst_15507);

return statearr_15540;
})();
var statearr_15541_15565 = state_15530__$1;
(statearr_15541_15565[(2)] = null);

(statearr_15541_15565[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15531 === (9))){
var inst_15510 = (state_15530[(8)]);
var state_15530__$1 = state_15530;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_15530__$1,(11),out,inst_15510);
} else {
if((state_val_15531 === (5))){
var inst_15510 = (state_15530[(8)]);
var inst_15507 = (state_15530[(7)]);
var inst_15514 = cljs.core._EQ_.call(null,inst_15510,inst_15507);
var state_15530__$1 = state_15530;
if(inst_15514){
var statearr_15543_15566 = state_15530__$1;
(statearr_15543_15566[(1)] = (8));

} else {
var statearr_15544_15567 = state_15530__$1;
(statearr_15544_15567[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15531 === (10))){
var inst_15522 = (state_15530[(2)]);
var state_15530__$1 = state_15530;
var statearr_15545_15568 = state_15530__$1;
(statearr_15545_15568[(2)] = inst_15522);

(statearr_15545_15568[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15531 === (8))){
var inst_15507 = (state_15530[(7)]);
var tmp15542 = inst_15507;
var inst_15507__$1 = tmp15542;
var state_15530__$1 = (function (){var statearr_15546 = state_15530;
(statearr_15546[(7)] = inst_15507__$1);

return statearr_15546;
})();
var statearr_15547_15569 = state_15530__$1;
(statearr_15547_15569[(2)] = null);

(statearr_15547_15569[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});})(c__10543__auto___15559,out))
;
return ((function (switch__10478__auto__,c__10543__auto___15559,out){
return (function() {
var cljs$core$async$state_machine__10479__auto__ = null;
var cljs$core$async$state_machine__10479__auto____0 = (function (){
var statearr_15551 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_15551[(0)] = cljs$core$async$state_machine__10479__auto__);

(statearr_15551[(1)] = (1));

return statearr_15551;
});
var cljs$core$async$state_machine__10479__auto____1 = (function (state_15530){
while(true){
var ret_value__10480__auto__ = (function (){try{while(true){
var result__10481__auto__ = switch__10478__auto__.call(null,state_15530);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10481__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10481__auto__;
}
break;
}
}catch (e15552){if((e15552 instanceof Object)){
var ex__10482__auto__ = e15552;
var statearr_15553_15570 = state_15530;
(statearr_15553_15570[(5)] = ex__10482__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_15530);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e15552;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10480__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__15571 = state_15530;
state_15530 = G__15571;
continue;
} else {
return ret_value__10480__auto__;
}
break;
}
});
cljs$core$async$state_machine__10479__auto__ = function(state_15530){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__10479__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__10479__auto____1.call(this,state_15530);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__10479__auto____0;
cljs$core$async$state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__10479__auto____1;
return cljs$core$async$state_machine__10479__auto__;
})()
;})(switch__10478__auto__,c__10543__auto___15559,out))
})();
var state__10545__auto__ = (function (){var statearr_15554 = f__10544__auto__.call(null);
(statearr_15554[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10543__auto___15559);

return statearr_15554;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10545__auto__);
});})(c__10543__auto___15559,out))
);


return out;
});

cljs.core.async.unique.cljs$lang$maxFixedArity = 2;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var args15572 = [];
var len__9095__auto___15642 = arguments.length;
var i__9096__auto___15643 = (0);
while(true){
if((i__9096__auto___15643 < len__9095__auto___15642)){
args15572.push((arguments[i__9096__auto___15643]));

var G__15644 = (i__9096__auto___15643 + (1));
i__9096__auto___15643 = G__15644;
continue;
} else {
}
break;
}

var G__15574 = args15572.length;
switch (G__15574) {
case 2:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args15572.length)].join('')));

}
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.partition.call(null,n,ch,null);
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__10543__auto___15646 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10543__auto___15646,out){
return (function (){
var f__10544__auto__ = (function (){var switch__10478__auto__ = ((function (c__10543__auto___15646,out){
return (function (state_15612){
var state_val_15613 = (state_15612[(1)]);
if((state_val_15613 === (7))){
var inst_15608 = (state_15612[(2)]);
var state_15612__$1 = state_15612;
var statearr_15614_15647 = state_15612__$1;
(statearr_15614_15647[(2)] = inst_15608);

(statearr_15614_15647[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15613 === (1))){
var inst_15575 = (new Array(n));
var inst_15576 = inst_15575;
var inst_15577 = (0);
var state_15612__$1 = (function (){var statearr_15615 = state_15612;
(statearr_15615[(7)] = inst_15577);

(statearr_15615[(8)] = inst_15576);

return statearr_15615;
})();
var statearr_15616_15648 = state_15612__$1;
(statearr_15616_15648[(2)] = null);

(statearr_15616_15648[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15613 === (4))){
var inst_15580 = (state_15612[(9)]);
var inst_15580__$1 = (state_15612[(2)]);
var inst_15581 = (inst_15580__$1 == null);
var inst_15582 = cljs.core.not.call(null,inst_15581);
var state_15612__$1 = (function (){var statearr_15617 = state_15612;
(statearr_15617[(9)] = inst_15580__$1);

return statearr_15617;
})();
if(inst_15582){
var statearr_15618_15649 = state_15612__$1;
(statearr_15618_15649[(1)] = (5));

} else {
var statearr_15619_15650 = state_15612__$1;
(statearr_15619_15650[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15613 === (15))){
var inst_15602 = (state_15612[(2)]);
var state_15612__$1 = state_15612;
var statearr_15620_15651 = state_15612__$1;
(statearr_15620_15651[(2)] = inst_15602);

(statearr_15620_15651[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15613 === (13))){
var state_15612__$1 = state_15612;
var statearr_15621_15652 = state_15612__$1;
(statearr_15621_15652[(2)] = null);

(statearr_15621_15652[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15613 === (6))){
var inst_15577 = (state_15612[(7)]);
var inst_15598 = (inst_15577 > (0));
var state_15612__$1 = state_15612;
if(cljs.core.truth_(inst_15598)){
var statearr_15622_15653 = state_15612__$1;
(statearr_15622_15653[(1)] = (12));

} else {
var statearr_15623_15654 = state_15612__$1;
(statearr_15623_15654[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15613 === (3))){
var inst_15610 = (state_15612[(2)]);
var state_15612__$1 = state_15612;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_15612__$1,inst_15610);
} else {
if((state_val_15613 === (12))){
var inst_15576 = (state_15612[(8)]);
var inst_15600 = cljs.core.vec.call(null,inst_15576);
var state_15612__$1 = state_15612;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_15612__$1,(15),out,inst_15600);
} else {
if((state_val_15613 === (2))){
var state_15612__$1 = state_15612;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_15612__$1,(4),ch);
} else {
if((state_val_15613 === (11))){
var inst_15592 = (state_15612[(2)]);
var inst_15593 = (new Array(n));
var inst_15576 = inst_15593;
var inst_15577 = (0);
var state_15612__$1 = (function (){var statearr_15624 = state_15612;
(statearr_15624[(7)] = inst_15577);

(statearr_15624[(10)] = inst_15592);

(statearr_15624[(8)] = inst_15576);

return statearr_15624;
})();
var statearr_15625_15655 = state_15612__$1;
(statearr_15625_15655[(2)] = null);

(statearr_15625_15655[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15613 === (9))){
var inst_15576 = (state_15612[(8)]);
var inst_15590 = cljs.core.vec.call(null,inst_15576);
var state_15612__$1 = state_15612;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_15612__$1,(11),out,inst_15590);
} else {
if((state_val_15613 === (5))){
var inst_15577 = (state_15612[(7)]);
var inst_15585 = (state_15612[(11)]);
var inst_15580 = (state_15612[(9)]);
var inst_15576 = (state_15612[(8)]);
var inst_15584 = (inst_15576[inst_15577] = inst_15580);
var inst_15585__$1 = (inst_15577 + (1));
var inst_15586 = (inst_15585__$1 < n);
var state_15612__$1 = (function (){var statearr_15626 = state_15612;
(statearr_15626[(11)] = inst_15585__$1);

(statearr_15626[(12)] = inst_15584);

return statearr_15626;
})();
if(cljs.core.truth_(inst_15586)){
var statearr_15627_15656 = state_15612__$1;
(statearr_15627_15656[(1)] = (8));

} else {
var statearr_15628_15657 = state_15612__$1;
(statearr_15628_15657[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15613 === (14))){
var inst_15605 = (state_15612[(2)]);
var inst_15606 = cljs.core.async.close_BANG_.call(null,out);
var state_15612__$1 = (function (){var statearr_15630 = state_15612;
(statearr_15630[(13)] = inst_15605);

return statearr_15630;
})();
var statearr_15631_15658 = state_15612__$1;
(statearr_15631_15658[(2)] = inst_15606);

(statearr_15631_15658[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15613 === (10))){
var inst_15596 = (state_15612[(2)]);
var state_15612__$1 = state_15612;
var statearr_15632_15659 = state_15612__$1;
(statearr_15632_15659[(2)] = inst_15596);

(statearr_15632_15659[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15613 === (8))){
var inst_15585 = (state_15612[(11)]);
var inst_15576 = (state_15612[(8)]);
var tmp15629 = inst_15576;
var inst_15576__$1 = tmp15629;
var inst_15577 = inst_15585;
var state_15612__$1 = (function (){var statearr_15633 = state_15612;
(statearr_15633[(7)] = inst_15577);

(statearr_15633[(8)] = inst_15576__$1);

return statearr_15633;
})();
var statearr_15634_15660 = state_15612__$1;
(statearr_15634_15660[(2)] = null);

(statearr_15634_15660[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__10543__auto___15646,out))
;
return ((function (switch__10478__auto__,c__10543__auto___15646,out){
return (function() {
var cljs$core$async$state_machine__10479__auto__ = null;
var cljs$core$async$state_machine__10479__auto____0 = (function (){
var statearr_15638 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_15638[(0)] = cljs$core$async$state_machine__10479__auto__);

(statearr_15638[(1)] = (1));

return statearr_15638;
});
var cljs$core$async$state_machine__10479__auto____1 = (function (state_15612){
while(true){
var ret_value__10480__auto__ = (function (){try{while(true){
var result__10481__auto__ = switch__10478__auto__.call(null,state_15612);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10481__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10481__auto__;
}
break;
}
}catch (e15639){if((e15639 instanceof Object)){
var ex__10482__auto__ = e15639;
var statearr_15640_15661 = state_15612;
(statearr_15640_15661[(5)] = ex__10482__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_15612);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e15639;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10480__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__15662 = state_15612;
state_15612 = G__15662;
continue;
} else {
return ret_value__10480__auto__;
}
break;
}
});
cljs$core$async$state_machine__10479__auto__ = function(state_15612){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__10479__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__10479__auto____1.call(this,state_15612);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__10479__auto____0;
cljs$core$async$state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__10479__auto____1;
return cljs$core$async$state_machine__10479__auto__;
})()
;})(switch__10478__auto__,c__10543__auto___15646,out))
})();
var state__10545__auto__ = (function (){var statearr_15641 = f__10544__auto__.call(null);
(statearr_15641[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10543__auto___15646);

return statearr_15641;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10545__auto__);
});})(c__10543__auto___15646,out))
);


return out;
});

cljs.core.async.partition.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var args15663 = [];
var len__9095__auto___15737 = arguments.length;
var i__9096__auto___15738 = (0);
while(true){
if((i__9096__auto___15738 < len__9095__auto___15737)){
args15663.push((arguments[i__9096__auto___15738]));

var G__15739 = (i__9096__auto___15738 + (1));
i__9096__auto___15738 = G__15739;
continue;
} else {
}
break;
}

var G__15665 = args15663.length;
switch (G__15665) {
case 2:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args15663.length)].join('')));

}
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2 = (function (f,ch){
return cljs.core.async.partition_by.call(null,f,ch,null);
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3 = (function (f,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__10543__auto___15741 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10543__auto___15741,out){
return (function (){
var f__10544__auto__ = (function (){var switch__10478__auto__ = ((function (c__10543__auto___15741,out){
return (function (state_15707){
var state_val_15708 = (state_15707[(1)]);
if((state_val_15708 === (7))){
var inst_15703 = (state_15707[(2)]);
var state_15707__$1 = state_15707;
var statearr_15709_15742 = state_15707__$1;
(statearr_15709_15742[(2)] = inst_15703);

(statearr_15709_15742[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15708 === (1))){
var inst_15666 = [];
var inst_15667 = inst_15666;
var inst_15668 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_15707__$1 = (function (){var statearr_15710 = state_15707;
(statearr_15710[(7)] = inst_15668);

(statearr_15710[(8)] = inst_15667);

return statearr_15710;
})();
var statearr_15711_15743 = state_15707__$1;
(statearr_15711_15743[(2)] = null);

(statearr_15711_15743[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15708 === (4))){
var inst_15671 = (state_15707[(9)]);
var inst_15671__$1 = (state_15707[(2)]);
var inst_15672 = (inst_15671__$1 == null);
var inst_15673 = cljs.core.not.call(null,inst_15672);
var state_15707__$1 = (function (){var statearr_15712 = state_15707;
(statearr_15712[(9)] = inst_15671__$1);

return statearr_15712;
})();
if(inst_15673){
var statearr_15713_15744 = state_15707__$1;
(statearr_15713_15744[(1)] = (5));

} else {
var statearr_15714_15745 = state_15707__$1;
(statearr_15714_15745[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15708 === (15))){
var inst_15697 = (state_15707[(2)]);
var state_15707__$1 = state_15707;
var statearr_15715_15746 = state_15707__$1;
(statearr_15715_15746[(2)] = inst_15697);

(statearr_15715_15746[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15708 === (13))){
var state_15707__$1 = state_15707;
var statearr_15716_15747 = state_15707__$1;
(statearr_15716_15747[(2)] = null);

(statearr_15716_15747[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15708 === (6))){
var inst_15667 = (state_15707[(8)]);
var inst_15692 = inst_15667.length;
var inst_15693 = (inst_15692 > (0));
var state_15707__$1 = state_15707;
if(cljs.core.truth_(inst_15693)){
var statearr_15717_15748 = state_15707__$1;
(statearr_15717_15748[(1)] = (12));

} else {
var statearr_15718_15749 = state_15707__$1;
(statearr_15718_15749[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15708 === (3))){
var inst_15705 = (state_15707[(2)]);
var state_15707__$1 = state_15707;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_15707__$1,inst_15705);
} else {
if((state_val_15708 === (12))){
var inst_15667 = (state_15707[(8)]);
var inst_15695 = cljs.core.vec.call(null,inst_15667);
var state_15707__$1 = state_15707;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_15707__$1,(15),out,inst_15695);
} else {
if((state_val_15708 === (2))){
var state_15707__$1 = state_15707;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_15707__$1,(4),ch);
} else {
if((state_val_15708 === (11))){
var inst_15671 = (state_15707[(9)]);
var inst_15675 = (state_15707[(10)]);
var inst_15685 = (state_15707[(2)]);
var inst_15686 = [];
var inst_15687 = inst_15686.push(inst_15671);
var inst_15667 = inst_15686;
var inst_15668 = inst_15675;
var state_15707__$1 = (function (){var statearr_15719 = state_15707;
(statearr_15719[(7)] = inst_15668);

(statearr_15719[(8)] = inst_15667);

(statearr_15719[(11)] = inst_15685);

(statearr_15719[(12)] = inst_15687);

return statearr_15719;
})();
var statearr_15720_15750 = state_15707__$1;
(statearr_15720_15750[(2)] = null);

(statearr_15720_15750[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15708 === (9))){
var inst_15667 = (state_15707[(8)]);
var inst_15683 = cljs.core.vec.call(null,inst_15667);
var state_15707__$1 = state_15707;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_15707__$1,(11),out,inst_15683);
} else {
if((state_val_15708 === (5))){
var inst_15671 = (state_15707[(9)]);
var inst_15675 = (state_15707[(10)]);
var inst_15668 = (state_15707[(7)]);
var inst_15675__$1 = f.call(null,inst_15671);
var inst_15676 = cljs.core._EQ_.call(null,inst_15675__$1,inst_15668);
var inst_15677 = cljs.core.keyword_identical_QMARK_.call(null,inst_15668,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var inst_15678 = (inst_15676) || (inst_15677);
var state_15707__$1 = (function (){var statearr_15721 = state_15707;
(statearr_15721[(10)] = inst_15675__$1);

return statearr_15721;
})();
if(cljs.core.truth_(inst_15678)){
var statearr_15722_15751 = state_15707__$1;
(statearr_15722_15751[(1)] = (8));

} else {
var statearr_15723_15752 = state_15707__$1;
(statearr_15723_15752[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15708 === (14))){
var inst_15700 = (state_15707[(2)]);
var inst_15701 = cljs.core.async.close_BANG_.call(null,out);
var state_15707__$1 = (function (){var statearr_15725 = state_15707;
(statearr_15725[(13)] = inst_15700);

return statearr_15725;
})();
var statearr_15726_15753 = state_15707__$1;
(statearr_15726_15753[(2)] = inst_15701);

(statearr_15726_15753[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15708 === (10))){
var inst_15690 = (state_15707[(2)]);
var state_15707__$1 = state_15707;
var statearr_15727_15754 = state_15707__$1;
(statearr_15727_15754[(2)] = inst_15690);

(statearr_15727_15754[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15708 === (8))){
var inst_15671 = (state_15707[(9)]);
var inst_15675 = (state_15707[(10)]);
var inst_15667 = (state_15707[(8)]);
var inst_15680 = inst_15667.push(inst_15671);
var tmp15724 = inst_15667;
var inst_15667__$1 = tmp15724;
var inst_15668 = inst_15675;
var state_15707__$1 = (function (){var statearr_15728 = state_15707;
(statearr_15728[(7)] = inst_15668);

(statearr_15728[(14)] = inst_15680);

(statearr_15728[(8)] = inst_15667__$1);

return statearr_15728;
})();
var statearr_15729_15755 = state_15707__$1;
(statearr_15729_15755[(2)] = null);

(statearr_15729_15755[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__10543__auto___15741,out))
;
return ((function (switch__10478__auto__,c__10543__auto___15741,out){
return (function() {
var cljs$core$async$state_machine__10479__auto__ = null;
var cljs$core$async$state_machine__10479__auto____0 = (function (){
var statearr_15733 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_15733[(0)] = cljs$core$async$state_machine__10479__auto__);

(statearr_15733[(1)] = (1));

return statearr_15733;
});
var cljs$core$async$state_machine__10479__auto____1 = (function (state_15707){
while(true){
var ret_value__10480__auto__ = (function (){try{while(true){
var result__10481__auto__ = switch__10478__auto__.call(null,state_15707);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10481__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10481__auto__;
}
break;
}
}catch (e15734){if((e15734 instanceof Object)){
var ex__10482__auto__ = e15734;
var statearr_15735_15756 = state_15707;
(statearr_15735_15756[(5)] = ex__10482__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_15707);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e15734;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10480__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__15757 = state_15707;
state_15707 = G__15757;
continue;
} else {
return ret_value__10480__auto__;
}
break;
}
});
cljs$core$async$state_machine__10479__auto__ = function(state_15707){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__10479__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__10479__auto____1.call(this,state_15707);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__10479__auto____0;
cljs$core$async$state_machine__10479__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__10479__auto____1;
return cljs$core$async$state_machine__10479__auto__;
})()
;})(switch__10478__auto__,c__10543__auto___15741,out))
})();
var state__10545__auto__ = (function (){var statearr_15736 = f__10544__auto__.call(null);
(statearr_15736[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10543__auto___15741);

return statearr_15736;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10545__auto__);
});})(c__10543__auto___15741,out))
);


return out;
});

cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3;

//# sourceMappingURL=async.js.map