(this["webpackJsonpsofa-client"]=this["webpackJsonpsofa-client"]||[]).push([[15],{130:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return s}));var n=a(0),i=a.n(n),r=a(108),u=a(29),l=Object(u.a)({start:{paddingRight:8}});function s(e){var t=l();return Object(n.useEffect)((function(){void 0===e.interface.time.value&&e.interface.hasOwnProperty("setDefault")&&e.interface.setDefault({start:"08:00",end:"20:00"})}),[e.interface]),i.a.createElement(i.a.Fragment,null,i.a.createElement(r.a,{className:t.start,variant:"outlined",onChange:function(t){return e.interface.directive("SetTime",{start:t.target.value,end:e.value.end})},id:"start",label:"Start",type:"time",defaultValue:e.interface.time.value.start?e.interface.time.value.start:"",InputLabelProps:{shrink:!0},inputProps:{step:300,style:{padding:10}}}),i.a.createElement(r.a,{variant:"outlined",onChange:function(t){return e.interface.directive("SetTime",{start:e.interface.time.value.start,end:t.target.value})},id:"end",label:"End",type:"time",defaultValue:e.interface.time.value.end?e.interface.time.value.end:"",InputLabelProps:{shrink:!0},inputProps:{step:300,style:{padding:10}}}))}}}]);
//# sourceMappingURL=15.6ce5ae85.chunk.js.map