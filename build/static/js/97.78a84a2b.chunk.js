(this["webpackJsonpsofa-client"]=this["webpackJsonpsofa-client"]||[]).push([[97],{163:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return k}));var r=a(6),n=a(0),i=a.n(n),o=a(23),c=a(53),s=a(378),l=a.n(s),u=a(331),d=a.n(u),f=a(329),m=a.n(f),v=a(24),h=a(55),p=a(359);function k(e){var t=Object(n.useState)(!1),a=Object(r.a)(t,2),s=a[0],u=a[1];return i.a.createElement(v.default,{wide:e.wide},i.a.createElement(o.a,{button:e.launcher},e.edit?i.a.createElement(h.default,{avatarState:"off",onClick:function(){return e.delete(e.name)}},i.a.createElement(m.a,null)):i.a.createElement(i.a.Fragment,null,s?i.a.createElement(p.a,{style:{marginRight:16},size:36}):i.a.createElement(h.default,{avatarState:e.automation.favorite?"on":"off",onClick:function(){u(!0),e.run(e.name)}},e.automation.favorite&&"base"!==e.icon?i.a.createElement(l.a,null):i.a.createElement(d.a,null))),i.a.createElement(c.a,{primary:e.name,secondary:e.automation.triggers.length+" triggers / "+e.automation.conditions.length+" conditions / "+e.automation.actions.length+" actions",onClick:function(){u(!0),e.select(e.name)}})))}k.defaultProps={launcher:!1}},329:function(e,t,a){"use strict";var r=a(37);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(a(0)),i=(0,r(a(48)).default)(n.default.createElement("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close");t.default=i},331:function(e,t,a){"use strict";var r=a(37);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(a(0)),i=(0,r(a(48)).default)(n.default.createElement("path",{d:"M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"}),"List");t.default=i},359:function(e,t,a){"use strict";var r=a(1),n=a(2),i=a(0),o=a.n(i),c=(a(5),a(3)),s=a(4),l=a(7);function u(e){var t,a,r;return t=e,a=0,r=1,e=(Math.min(Math.max(a,t),r)-a)/(r-a),e=(e-=1)*e*e+1}var d=o.a.forwardRef((function(e,t){var a,i=e.classes,s=e.className,d=e.color,f=void 0===d?"primary":d,m=e.disableShrink,v=void 0!==m&&m,h=e.size,p=void 0===h?40:h,k=e.style,y=e.thickness,b=void 0===y?3.6:y,x=e.value,g=void 0===x?0:x,E=e.variant,D=void 0===E?"indeterminate":E,j=Object(n.a)(e,["classes","className","color","disableShrink","size","style","thickness","value","variant"]),M={},O={},z={};if("determinate"===D||"static"===D){var S=2*Math.PI*((44-b)/2);M.strokeDasharray=S.toFixed(3),z["aria-valuenow"]=Math.round(g),"static"===D?(M.strokeDashoffset="".concat(((100-g)/100*S).toFixed(3),"px"),O.transform="rotate(-90deg)"):(M.strokeDashoffset="".concat((a=(100-g)/100,a*a*S).toFixed(3),"px"),O.transform="rotate(".concat((270*u(g/70)).toFixed(3),"deg)"))}return o.a.createElement("div",Object(r.a)({className:Object(c.a)(i.root,s,"inherit"!==f&&i["color".concat(Object(l.a)(f))],{indeterminate:i.indeterminate,static:i.static}[D]),style:Object(r.a)({width:p,height:p},O,{},k),ref:t,role:"progressbar"},z,j),o.a.createElement("svg",{className:i.svg,viewBox:"".concat(22," ").concat(22," ").concat(44," ").concat(44)},o.a.createElement("circle",{className:Object(c.a)(i.circle,v&&i.circleDisableShrink,{indeterminate:i.circleIndeterminate,static:i.circleStatic}[D]),style:M,cx:44,cy:44,r:(44-b)/2,fill:"none",strokeWidth:b})))}));t.a=Object(s.a)((function(e){return{root:{display:"inline-block"},static:{transition:e.transitions.create("transform")},indeterminate:{animation:"$circular-rotate 1.4s linear infinite"},colorPrimary:{color:e.palette.primary.main},colorSecondary:{color:e.palette.secondary.main},svg:{display:"block"},circle:{stroke:"currentColor"},circleStatic:{transition:e.transitions.create("stroke-dashoffset")},circleIndeterminate:{animation:"$circular-dash 1.4s ease-in-out infinite",strokeDasharray:"80px, 200px",strokeDashoffset:"0px"},"@keyframes circular-rotate":{"100%":{transform:"rotate(360deg)"}},"@keyframes circular-dash":{"0%":{strokeDasharray:"1px, 200px",strokeDashoffset:"0px"},"50%":{strokeDasharray:"100px, 200px",strokeDashoffset:"-15px"},"100%":{strokeDasharray:"100px, 200px",strokeDashoffset:"-125px"}},circleDisableShrink:{animation:"none"}}}),{name:"MuiCircularProgress",flip:!1})(d)},378:function(e,t,a){"use strict";var r=a(37);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(a(0)),i=(0,r(a(48)).default)(n.default.createElement("path",{d:"M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"}),"Favorite");t.default=i}}]);
//# sourceMappingURL=97.78a84a2b.chunk.js.map