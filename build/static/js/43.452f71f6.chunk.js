(this["webpackJsonpsofa-client"]=this["webpackJsonpsofa-client"]||[]).push([[43,56,72,137],{113:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return p}));var n=a(6),r=a(0),o=a.n(r),l=a(31),c=a(18),i=a(42),s=a.n(i),u=a(39),d=a(108),m=a(25),f=a(56),v=a(336),h=Object(l.a)((function(e){return{base:{margin:1,overflowX:"hidden",alignContent:"start",padding:"3px !important",borderRadius:"4px 4px 4px 4px"},gridColumn:{overflowY:"hidden"},scrollColumn:{overflowY:"auto",height:"100%"},nopad:{padding:0},background:{backgroundColor:e.palette.background.page}}}));function p(e){var t=Object(r.useContext)(c.LayoutContext).isMobile,a=h(),l=Object(r.useState)(e.show),i=Object(n.a)(l,2),p=i[0],b=i[1];return o.a.createElement(u.a,{container:!0,item:!0,spacing:1,key:e.name,xs:e.xs,className:s()(a.base,e.scroll?a.scrollColumn:a.gridColumn,e.background?a.background:null)},e.name&&o.a.createElement(u.a,{item:!0,xs:12,className:a.nopad},o.a.createElement(d.a,{className:a.nopad},o.a.createElement(m.a,null,o.a.createElement(f.a,{primary:e.name,onClick:function(){return b(!p)}}),(!t||!e.break)&&o.a.createElement(v.a,null,e.secondary)),t&&e.break&&o.a.createElement(m.a,null,o.a.createElement(v.a,null,e.secondary)))),p&&e.children)}p.defaultProps={break:!1,show:!0,scroll:!1,xs:12,background:!0}},164:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return k}));var n=a(6),r=a(0),o=a.n(r),l=a(25),c=a(56),i=a(336),s=a(332),u=a(380),d=a.n(u),m=a(333),f=a.n(m),v=a(367),h=a.n(v),p=a(330),b=a.n(p),E=a(26),y=a(58),g=a(360);function k(e){var t=Object(r.useState)(!1),a=Object(n.a)(t,2),u=a[0],m=a[1];return o.a.createElement(E.default,{wide:e.wide},o.a.createElement(l.a,{button:e.launcher},e.edit?o.a.createElement(y.default,{avatarState:"off",onClick:function(){return e.delete(e.name)}},o.a.createElement(b.a,null)):o.a.createElement(o.a.Fragment,null,u?o.a.createElement(g.a,{style:{marginRight:16},size:36}):o.a.createElement(y.default,{avatarState:e.automation.favorite?"on":"off",onClick:function(){m(!0),e.run(e.name)}},e.automation.favorite&&"base"!==e.icon?o.a.createElement(d.a,null):o.a.createElement(f.a,null))),o.a.createElement(c.a,{primary:e.name,secondary:e.automation.triggers.length+" triggers / "+e.automation.conditions.length+" conditions / "+e.automation.actions.length+" actions",onClick:function(){m(!0),e.run(e.name)}}),e.allowEdit&&o.a.createElement(i.a,null,o.a.createElement(s.a,{size:"small",onClick:function(){return e.select(e.name)}},o.a.createElement(h.a,null)))))}k.defaultProps={launcher:!1,allowEdit:!0}},196:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return v}));var n=a(6),r=a(0),o=a.n(r),l=a(57),c=a(12),i=a(18),s=a(164),u=a(113),d=a(367),m=a.n(d),f=a(332);function v(e){var t=Object(r.useContext)(i.LayoutContext),a=t.applyBackPage,d=t.applyLayoutCard,v=Object(r.useContext)(l.DataContext).deviceStateByEndpointId,h=Object(r.useContext)(c.NetworkContext).getJSON,p=Object(r.useState)({}),b=Object(n.a)(p,2),E=b[0],y=b[1],g="https://"+window.location.hostname;function k(e){var t=v("logic:activity:"+e);return console.log("auto",e,t),t.SceneController.directive("Activate"),!0}function x(e){a("SystemLayout",{}),d("AutomationLayout",{name:e,noBottom:!0})}return Object(r.useEffect)((function(){h("list/logic/automations").then((function(e){return y(e)}))}),[h,g]),o.a.createElement(u.default,{name:"Automations",secondary:o.a.createElement(f.a,{onClick:function(){return d("AutomationsLayout",{favorites:!1})}},o.a.createElement(m.a,{fontSize:"small"}))},Object.keys(E).sort().map((function(e){return E[e].favorite&&o.a.createElement(s.default,{allowEdit:!1,launcher:!0,key:e,icon:"base",name:e,automation:E[e],run:k,select:x})})))}},247:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return j}));var n=a(0),r=a.n(n),o=a(64),l=a(18),c=a(12),i=a(113),s=a(26),u=a(196),d=a(329),m=a.n(d),f=a(708),v=a.n(f),h=a(367),p=a.n(h),b=a(104),E=a.n(b),y=a(341),g=a.n(y),k=a(25),x=a(345),C=a(56),O=a(51);function j(e){var t=Object(n.useContext)(c.NetworkContext),a=t.sofaConsole,d=t.logout,f=Object(n.useContext)(l.LayoutContext).applyLayoutCard,h=Object(n.useContext)(o.ThemeContext),b=h.applyTheme,y=h.colorScheme;return r.a.createElement(r.a.Fragment,null,r.a.createElement(u.default,null),r.a.createElement(i.default,{name:"System"},r.a.createElement(s.default,null,r.a.createElement(k.a,{onClick:function(){return b("dark"===y?"light":"dark")}},r.a.createElement(x.a,null,r.a.createElement(v.a,null)),r.a.createElement(C.a,{primary:"dark"===y?"Light Mode":"Dark Mode",secondary:"Change interface color to suit your surroundings"}))),r.a.createElement(s.default,null,r.a.createElement(k.a,{onClick:function(){return"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})),void window.location.reload(!0)}},r.a.createElement(x.a,null,r.a.createElement(E.a,null)),r.a.createElement(C.a,{primary:"Reload",secondary:"Get the latest update to the client in your browser."}))),r.a.createElement(s.default,null,r.a.createElement(k.a,{onClick:function(){return f("AdapterLayout")}},r.a.createElement(x.a,null,r.a.createElement(m.a,null)),r.a.createElement(C.a,{primary:"Adapters",secondary:"Check the status or restart an adapter."}))),r.a.createElement(s.default,null,r.a.createElement(k.a,{onClick:function(){return function(e,t){var a="http://"+window.location.hostname+":"+e;window.open(a,t)}("3000","_devsofa")}},r.a.createElement(x.a,null,r.a.createElement(g.a,null)),r.a.createElement(C.a,{primary:"Development",secondary:"Run the developer build."}))),r.a.createElement(s.default,null,r.a.createElement(k.a,{onClick:function(){return function(e,t){var a=window.location.protocol+"//"+window.location.hostname+":"+e;window.open(a,t)}("8443","_editor")}},r.a.createElement(x.a,null,r.a.createElement(p.a,null)),r.a.createElement(C.a,{primary:"Editor",secondary:"Edit Sofa code and view logs."}))),r.a.createElement(s.default,null,r.a.createElement(k.a,{onClick:function(){return f("DeviceLayout")}},r.a.createElement(x.a,null,r.a.createElement(m.a,null)),r.a.createElement(C.a,{primary:"All Devices",secondary:"Check the status of any device."}))),r.a.createElement(s.default,null,r.a.createElement(k.a,{onClick:function(){return d()}},r.a.createElement(x.a,null,r.a.createElement(p.a,null)),r.a.createElement(C.a,{primary:"Logout",secondary:"Log out of Sofa."}))),r.a.createElement(s.default,null,r.a.createElement(O.a,null,a))))}},329:function(e,t,a){"use strict";var n=a(40);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(0)),o=(0,n(a(52)).default)(r.default.createElement("path",{d:"M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"}),"Tune");t.default=o},330:function(e,t,a){"use strict";var n=a(40);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(0)),o=(0,n(a(52)).default)(r.default.createElement("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close");t.default=o},332:function(e,t,a){"use strict";var n=a(1),r=a(2),o=a(0),l=a.n(o),c=(a(5),a(3)),i=a(4),s=a(15),u=a(84),d=a(7),m=l.a.forwardRef((function(e,t){var a=e.edge,o=void 0!==a&&a,i=e.children,s=e.classes,m=e.className,f=e.color,v=void 0===f?"default":f,h=e.disabled,p=void 0!==h&&h,b=e.disableFocusRipple,E=void 0!==b&&b,y=e.size,g=void 0===y?"medium":y,k=Object(r.a)(e,["edge","children","classes","className","color","disabled","disableFocusRipple","size"]);return l.a.createElement(u.a,Object(n.a)({className:Object(c.a)(s.root,m,"default"!==v&&s["color".concat(Object(d.a)(v))],p&&s.disabled,{small:s["size".concat(Object(d.a)(g))]}[g],{start:s.edgeStart,end:s.edgeEnd}[o]),centerRipple:!0,focusRipple:!E,disabled:p,ref:t},k),l.a.createElement("span",{className:s.label},i))}));t.a=Object(i.a)((function(e){return{root:{textAlign:"center",flex:"0 0 auto",fontSize:e.typography.pxToRem(24),padding:12,borderRadius:"50%",overflow:"visible",color:e.palette.action.active,transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{backgroundColor:Object(s.c)(e.palette.action.active,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"&$disabled":{backgroundColor:"transparent",color:e.palette.action.disabled}},edgeStart:{marginLeft:-12,"$sizeSmall&":{marginLeft:-3}},edgeEnd:{marginRight:-12,"$sizeSmall&":{marginRight:-3}},colorInherit:{color:"inherit"},colorPrimary:{color:e.palette.primary.main,"&:hover":{backgroundColor:Object(s.c)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},colorSecondary:{color:e.palette.secondary.main,"&:hover":{backgroundColor:Object(s.c)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},disabled:{},sizeSmall:{padding:3,fontSize:e.typography.pxToRem(18)},label:{width:"100%",display:"flex",alignItems:"inherit",justifyContent:"inherit"}}}),{name:"MuiIconButton"})(m)},333:function(e,t,a){"use strict";var n=a(40);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(0)),o=(0,n(a(52)).default)(r.default.createElement("path",{d:"M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"}),"List");t.default=o},336:function(e,t,a){"use strict";var n=a(1),r=a(2),o=a(0),l=a.n(o),c=(a(5),a(3)),i=a(4),s=l.a.forwardRef((function(e,t){var a=e.classes,o=e.className,i=Object(r.a)(e,["classes","className"]);return l.a.createElement("div",Object(n.a)({className:Object(c.a)(a.root,o),ref:t},i))}));s.muiName="ListItemSecondaryAction",t.a=Object(i.a)({root:{position:"absolute",right:16,top:"50%",transform:"translateY(-50%)"}},{name:"MuiListItemSecondaryAction"})(s)},341:function(e,t,a){"use strict";var n=a(40);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(0)),o=(0,n(a(52)).default)(r.default.createElement(r.default.Fragment,null,r.default.createElement("path",{d:"M22 9V7h-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2v-2h-2V9h2zm-4 10H4V5h14v14zM6 13h5v4H6zm6-6h4v3h-4zM6 7h5v5H6zm6 4h4v6h-4z"}),r.default.createElement("path",{fill:"none",d:"M0 0h24v24H0zm0 0h24v24H0z"})),"DeveloperBoard");t.default=o},345:function(e,t,a){"use strict";var n=a(1),r=a(2),o=a(0),l=a.n(o),c=(a(5),a(3)),i=a(4),s=a(19),u=l.a.forwardRef((function(e,t){var a=e.classes,o=e.className,i=Object(r.a)(e,["classes","className"]),u=l.a.useContext(s.a);return l.a.createElement("div",Object(n.a)({className:Object(c.a)(a.root,o,"flex-start"===u.alignItems&&a.alignItemsFlexStart),ref:t},i))}));t.a=Object(i.a)((function(e){return{root:{minWidth:56,color:e.palette.action.active,flexShrink:0,display:"inline-flex"},alignItemsFlexStart:{marginTop:8}}}),{name:"MuiListItemIcon"})(u)},360:function(e,t,a){"use strict";var n=a(1),r=a(2),o=a(0),l=a.n(o),c=(a(5),a(3)),i=a(4),s=a(7);function u(e){var t,a,n;return t=e,a=0,n=1,e=(Math.min(Math.max(a,t),n)-a)/(n-a),e=(e-=1)*e*e+1}var d=l.a.forwardRef((function(e,t){var a,o=e.classes,i=e.className,d=e.color,m=void 0===d?"primary":d,f=e.disableShrink,v=void 0!==f&&f,h=e.size,p=void 0===h?40:h,b=e.style,E=e.thickness,y=void 0===E?3.6:E,g=e.value,k=void 0===g?0:g,x=e.variant,C=void 0===x?"indeterminate":x,O=Object(r.a)(e,["classes","className","color","disableShrink","size","style","thickness","value","variant"]),j={},z={},w={};if("determinate"===C||"static"===C){var S=2*Math.PI*((44-y)/2);j.strokeDasharray=S.toFixed(3),w["aria-valuenow"]=Math.round(k),"static"===C?(j.strokeDashoffset="".concat(((100-k)/100*S).toFixed(3),"px"),z.transform="rotate(-90deg)"):(j.strokeDashoffset="".concat((a=(100-k)/100,a*a*S).toFixed(3),"px"),z.transform="rotate(".concat((270*u(k/70)).toFixed(3),"deg)"))}return l.a.createElement("div",Object(n.a)({className:Object(c.a)(o.root,i,"inherit"!==m&&o["color".concat(Object(s.a)(m))],{indeterminate:o.indeterminate,static:o.static}[C]),style:Object(n.a)({width:p,height:p},z,{},b),ref:t,role:"progressbar"},w,O),l.a.createElement("svg",{className:o.svg,viewBox:"".concat(22," ").concat(22," ").concat(44," ").concat(44)},l.a.createElement("circle",{className:Object(c.a)(o.circle,v&&o.circleDisableShrink,{indeterminate:o.circleIndeterminate,static:o.circleStatic}[C]),style:j,cx:44,cy:44,r:(44-y)/2,fill:"none",strokeWidth:y})))}));t.a=Object(i.a)((function(e){return{root:{display:"inline-block"},static:{transition:e.transitions.create("transform")},indeterminate:{animation:"$circular-rotate 1.4s linear infinite"},colorPrimary:{color:e.palette.primary.main},colorSecondary:{color:e.palette.secondary.main},svg:{display:"block"},circle:{stroke:"currentColor"},circleStatic:{transition:e.transitions.create("stroke-dashoffset")},circleIndeterminate:{animation:"$circular-dash 1.4s ease-in-out infinite",strokeDasharray:"80px, 200px",strokeDashoffset:"0px"},"@keyframes circular-rotate":{"100%":{transform:"rotate(360deg)"}},"@keyframes circular-dash":{"0%":{strokeDasharray:"1px, 200px",strokeDashoffset:"0px"},"50%":{strokeDasharray:"100px, 200px",strokeDashoffset:"-15px"},"100%":{strokeDasharray:"100px, 200px",strokeDashoffset:"-125px"}},circleDisableShrink:{animation:"none"}}}),{name:"MuiCircularProgress",flip:!1})(d)},367:function(e,t,a){"use strict";var n=a(40);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(0)),o=(0,n(a(52)).default)(r.default.createElement("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}),"Edit");t.default=o},380:function(e,t,a){"use strict";var n=a(40);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(0)),o=(0,n(a(52)).default)(r.default.createElement("path",{d:"M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"}),"Favorite");t.default=o},708:function(e,t,a){"use strict";var n=a(40);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(0)),o=(0,n(a(52)).default)(r.default.createElement("path",{d:"M10 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h5v2h2V1h-2v2zm0 15H5l5-6v6zm9-15h-5v2h5v13l-5-6v9h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"Compare");t.default=o}}]);
//# sourceMappingURL=43.452f71f6.chunk.js.map