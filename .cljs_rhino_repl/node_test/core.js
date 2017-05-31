// Compiled by ClojureScript 1.7.228 {}
goog.provide('node_test.core');
goog.require('cljs.core');
goog.require('cljs.nodejs');
goog.require('cljs.core.async');
goog.require('node_test.crawler');
cljs.core.enable_console_print_BANG_.call(null);
node_test.core.log = (function node_test$core$log(var_args){
var args__9100__auto__ = [];
var len__9093__auto___10820 = arguments.length;
var i__9094__auto___10821 = (0);
while(true){
if((i__9094__auto___10821 < len__9093__auto___10820)){
args__9100__auto__.push((arguments[i__9094__auto___10821]));

var G__10822 = (i__9094__auto___10821 + (1));
i__9094__auto___10821 = G__10822;
continue;
} else {
}
break;
}

var argseq__9101__auto__ = ((((0) < args__9100__auto__.length))?(new cljs.core.IndexedSeq(args__9100__auto__.slice((0)),(0))):null);
return node_test.core.log.cljs$core$IFn$_invoke$arity$variadic(argseq__9101__auto__);
});

node_test.core.log.cljs$core$IFn$_invoke$arity$variadic = (function (item){
return cljs.core.apply.call(null,cljs.core.println,(new Date()).toString(),":",item);
});

node_test.core.log.cljs$lang$maxFixedArity = (0);

node_test.core.log.cljs$lang$applyTo = (function (seq10819){
return node_test.core.log.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq10819));
});
node_test.core.crawl_loop = (function node_test$core$crawl_loop(){
var c__10391__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10391__auto__){
return (function (){
var f__10392__auto__ = (function (){var switch__10370__auto__ = ((function (c__10391__auto__){
return (function (state_10870){
var state_val_10871 = (state_10870[(1)]);
if((state_val_10871 === (1))){
var state_10870__$1 = state_10870;
var statearr_10872_10887 = state_10870__$1;
(statearr_10872_10887[(2)] = null);

(statearr_10872_10887[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10871 === (2))){
var inst_10856 = node_test.crawler.crawl.call(null);
var inst_10857 = cljs.core.async.timeout.call(null,(2000));
var state_10870__$1 = (function (){var statearr_10873 = state_10870;
(statearr_10873[(7)] = inst_10856);

return statearr_10873;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10870__$1,(4),inst_10857);
} else {
if((state_val_10871 === (3))){
var inst_10868 = (state_10870[(2)]);
var state_10870__$1 = state_10870;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10870__$1,inst_10868);
} else {
if((state_val_10871 === (4))){
var inst_10859 = (state_10870[(2)]);
var inst_10860 = cljs.core.deref.call(null,node_test.core.is_ctrl_c_pressed);
var state_10870__$1 = (function (){var statearr_10874 = state_10870;
(statearr_10874[(8)] = inst_10859);

return statearr_10874;
})();
if(cljs.core.truth_(inst_10860)){
var statearr_10875_10888 = state_10870__$1;
(statearr_10875_10888[(1)] = (5));

} else {
var statearr_10876_10889 = state_10870__$1;
(statearr_10876_10889[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10871 === (5))){
var inst_10862 = cljs.core.println.call(null,"Done");
var state_10870__$1 = state_10870;
var statearr_10877_10890 = state_10870__$1;
(statearr_10877_10890[(2)] = inst_10862);

(statearr_10877_10890[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10871 === (6))){
var state_10870__$1 = state_10870;
var statearr_10878_10891 = state_10870__$1;
(statearr_10878_10891[(2)] = null);

(statearr_10878_10891[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10871 === (7))){
var inst_10866 = (state_10870[(2)]);
var state_10870__$1 = state_10870;
var statearr_10879_10892 = state_10870__$1;
(statearr_10879_10892[(2)] = inst_10866);

(statearr_10879_10892[(1)] = (3));


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
});})(c__10391__auto__))
;
return ((function (switch__10370__auto__,c__10391__auto__){
return (function() {
var node_test$core$crawl_loop_$_state_machine__10371__auto__ = null;
var node_test$core$crawl_loop_$_state_machine__10371__auto____0 = (function (){
var statearr_10883 = [null,null,null,null,null,null,null,null,null];
(statearr_10883[(0)] = node_test$core$crawl_loop_$_state_machine__10371__auto__);

(statearr_10883[(1)] = (1));

return statearr_10883;
});
var node_test$core$crawl_loop_$_state_machine__10371__auto____1 = (function (state_10870){
while(true){
var ret_value__10372__auto__ = (function (){try{while(true){
var result__10373__auto__ = switch__10370__auto__.call(null,state_10870);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10373__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10373__auto__;
}
break;
}
}catch (e10884){if((e10884 instanceof Object)){
var ex__10374__auto__ = e10884;
var statearr_10885_10893 = state_10870;
(statearr_10885_10893[(5)] = ex__10374__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10870);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10884;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10372__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__10894 = state_10870;
state_10870 = G__10894;
continue;
} else {
return ret_value__10372__auto__;
}
break;
}
});
node_test$core$crawl_loop_$_state_machine__10371__auto__ = function(state_10870){
switch(arguments.length){
case 0:
return node_test$core$crawl_loop_$_state_machine__10371__auto____0.call(this);
case 1:
return node_test$core$crawl_loop_$_state_machine__10371__auto____1.call(this,state_10870);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
node_test$core$crawl_loop_$_state_machine__10371__auto__.cljs$core$IFn$_invoke$arity$0 = node_test$core$crawl_loop_$_state_machine__10371__auto____0;
node_test$core$crawl_loop_$_state_machine__10371__auto__.cljs$core$IFn$_invoke$arity$1 = node_test$core$crawl_loop_$_state_machine__10371__auto____1;
return node_test$core$crawl_loop_$_state_machine__10371__auto__;
})()
;})(switch__10370__auto__,c__10391__auto__))
})();
var state__10393__auto__ = (function (){var statearr_10886 = f__10392__auto__.call(null);
(statearr_10886[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10391__auto__);

return statearr_10886;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10393__auto__);
});})(c__10391__auto__))
);

return c__10391__auto__;
});
node_test.core._main = (function node_test$core$_main(){
node_test.core.log.call(null,"test");

return node_test.core.crawl_loop.call(null);
});
cljs.core._STAR_main_cli_fn_STAR_ = node_test.core._main;

//# sourceMappingURL=core.js.map