(this["webpackJsonpsofa-client"]=this["webpackJsonpsofa-client"]||[]).push([[63,75,92,159],{142:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return s}));var r=a(0),n=a.n(r),o=a(31),i=a(39),c=a(51),l=Object(o.a)({root:{alignItems:"flex-end",padding:"16px 16px 0px 16px !important",height:64,display:"flex"},underline:{alignItems:"flex-end",padding:"16px 16px 0px 16px !important",height:64,display:"flex",borderBottom:"1px solid"},label:{display:"flex",flexGrow:1}});function s(e){var t=l();return n.a.createElement(i.a,{item:!0,xs:12,className:e.line?t.underline:t.root},n.a.createElement(c.a,{className:t.label,variant:e.size?e.size:"h6"},e.label),e.children)}},150:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return p}));var r=a(6),n=a(0),o=a.n(n),i=a(31),c=a(332),l=a(346),s=a.n(l),d=a(390),u=a.n(d),m=a(360),f=Object(i.a)((function(e){return{baseOn:{height:48,width:48,boxSizing:"border-box",opacity:1,color:e.palette.dot.on},baseOff:{height:48,width:48,boxSizing:"border-box",opacity:1,color:e.palette.dot.off},onLine:{position:"absolute",right:"calc(50% + 6px)",top:"calc(50% - 1px)",height:2,background:e.palette.dot.on,width:"calc(100% - 13px)",display:"block",zIndex:-1,opacity:1},offLine:{position:"absolute",right:"calc(50% + 6px)",top:"calc(50% - 1px)",height:1,background:e.palette.dot.off,content:"",width:"calc(100% - 13px)",display:"block",zIndex:-1,opacity:1},selectedIcon:{height:24,width:24,zIndex:140},selectedZero:{height:20,width:20},zeroIcon:{margin:6,height:10,width:10,zIndex:40},smallIcon:{margin:8,height:8,width:8,zIndex:140,opacity:1},working:{margin:0}}}));function p(e){var t=f(),a=Object(n.useState)(e.level),i=Object(r.a)(a,2),l=i[0],d=i[1],p=Object(n.useState)(!1),h=Object(r.a)(p,2),b=h[0],v=h[1];return Object(n.useEffect)((function(){d(e.level),v(!1)}),[e.level]),o.a.createElement(o.a.Fragment,null,[0,1,2,3].map((function(a){return o.a.createElement(c.a,{key:a,onClick:function(){return function(t){v(!0),d(t),e.select(t)}(a)},className:l>0&&a<=l?t.baseOn:t.baseOff},0===a?o.a.createElement(o.a.Fragment,null,b&&a===l?o.a.createElement(m.a,{size:24,className:t.working}):o.a.createElement(u.a,{className:a===l?t.selectedZero:t.zeroIcon})):o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:a<=l?t.onLine:t.offLine}),b&&a===l?o.a.createElement(m.a,{size:24,className:t.working}):o.a.createElement(o.a.Fragment,null,a===l?o.a.createElement(s.a,{className:t.selectedIcon}):o.a.createElement(s.a,{style:{width:8+2*a,height:8+2*a,margin:0},className:t.smallIcon})),o.a.createElement("div",{style:{width:"calc(100% - "+(15-2*a)+"px)"},className:a<=l?t.onLine:t.offLine})))})))}},174:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return m}));var r=a(0),n=a.n(r),o=a(57),i=a(31),c=a(25),l=a(56),s=a(336),d=a(150),u=Object(i.a)({halves:{flexGrow:1,flexBasis:1,boxSizing:"border-box"}});function m(e){var t=u(),a=Object(r.useContext)(o.DataContext).deviceStateByEndpointId;return n.a.createElement(c.a,{className:t.areaListItem},n.a.createElement(l.a,{className:t.halves,onClick:function(){return e.selectArea(e.area.friendlyName)}},e.area.friendlyName," "),function(){try{if(e.area.AreaController.shortcuts.value.length>0)return!0}catch(t){return!1}return!1}()&&n.a.createElement(s.a,null,n.a.createElement(d.default,{half:!0,level:e.area.AreaController.shortcuts.value.includes(e.area.AreaController.scene.value)?e.area.AreaController.shortcuts.value.indexOf(e.area.AreaController.scene.value):0,select:function(t){console.log("lev",e.area.AreaController.shortcuts.value[t]);var r=a(e.area.AreaController.shortcuts.value[t]);console.log("scene",r),r.SceneController.directive("Activate")}})))}},225:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return d}));var r=a(0),n=a.n(r),o=a(18),i=a(57),c=a(142),l=a(174),s=a(26);function d(e){var t=Object(r.useContext)(o.LayoutContext).applyLayout,a=Object(r.useContext)(i.DataContext),d=a.setArea,u=(0,a.deviceStatesByCategory)("AREA");function m(e){d(e),t("Home")}return console.log("Areas",u),n.a.createElement(n.a.Fragment,null,n.a.createElement(c.default,{label:"Areas"}),u.map((function(t){return n.a.createElement(s.default,{wide:e.wide,key:t.endpointId},n.a.createElement(l.default,{area:t,name:t.friendlyName,shortcuts:t.shortcuts,selectArea:m}))})))}},332:function(e,t,a){"use strict";var r=a(1),n=a(2),o=a(0),i=a.n(o),c=(a(5),a(3)),l=a(4),s=a(15),d=a(84),u=a(7),m=i.a.forwardRef((function(e,t){var a=e.edge,o=void 0!==a&&a,l=e.children,s=e.classes,m=e.className,f=e.color,p=void 0===f?"default":f,h=e.disabled,b=void 0!==h&&h,v=e.disableFocusRipple,g=void 0!==v&&v,x=e.size,y=void 0===x?"medium":x,k=Object(n.a)(e,["edge","children","classes","className","color","disabled","disableFocusRipple","size"]);return i.a.createElement(d.a,Object(r.a)({className:Object(c.a)(s.root,m,"default"!==p&&s["color".concat(Object(u.a)(p))],b&&s.disabled,{small:s["size".concat(Object(u.a)(y))]}[y],{start:s.edgeStart,end:s.edgeEnd}[o]),centerRipple:!0,focusRipple:!g,disabled:b,ref:t},k),i.a.createElement("span",{className:s.label},l))}));t.a=Object(l.a)((function(e){return{root:{textAlign:"center",flex:"0 0 auto",fontSize:e.typography.pxToRem(24),padding:12,borderRadius:"50%",overflow:"visible",color:e.palette.action.active,transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{backgroundColor:Object(s.c)(e.palette.action.active,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"&$disabled":{backgroundColor:"transparent",color:e.palette.action.disabled}},edgeStart:{marginLeft:-12,"$sizeSmall&":{marginLeft:-3}},edgeEnd:{marginRight:-12,"$sizeSmall&":{marginRight:-3}},colorInherit:{color:"inherit"},colorPrimary:{color:e.palette.primary.main,"&:hover":{backgroundColor:Object(s.c)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},colorSecondary:{color:e.palette.secondary.main,"&:hover":{backgroundColor:Object(s.c)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},disabled:{},sizeSmall:{padding:3,fontSize:e.typography.pxToRem(18)},label:{width:"100%",display:"flex",alignItems:"inherit",justifyContent:"inherit"}}}),{name:"MuiIconButton"})(m)},336:function(e,t,a){"use strict";var r=a(1),n=a(2),o=a(0),i=a.n(o),c=(a(5),a(3)),l=a(4),s=i.a.forwardRef((function(e,t){var a=e.classes,o=e.className,l=Object(n.a)(e,["classes","className"]);return i.a.createElement("div",Object(r.a)({className:Object(c.a)(a.root,o),ref:t},l))}));s.muiName="ListItemSecondaryAction",t.a=Object(l.a)({root:{position:"absolute",right:16,top:"50%",transform:"translateY(-50%)"}},{name:"MuiListItemSecondaryAction"})(s)},346:function(e,t,a){"use strict";var r=a(40);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(a(0)),o=(0,r(a(52)).default)(n.default.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"}),"Lens");t.default=o},360:function(e,t,a){"use strict";var r=a(1),n=a(2),o=a(0),i=a.n(o),c=(a(5),a(3)),l=a(4),s=a(7);function d(e){var t,a,r;return t=e,a=0,r=1,e=(Math.min(Math.max(a,t),r)-a)/(r-a),e=(e-=1)*e*e+1}var u=i.a.forwardRef((function(e,t){var a,o=e.classes,l=e.className,u=e.color,m=void 0===u?"primary":u,f=e.disableShrink,p=void 0!==f&&f,h=e.size,b=void 0===h?40:h,v=e.style,g=e.thickness,x=void 0===g?3.6:g,y=e.value,k=void 0===y?0:y,O=e.variant,E=void 0===O?"indeterminate":O,j=Object(n.a)(e,["classes","className","color","disableShrink","size","style","thickness","value","variant"]),C={},N={},w={};if("determinate"===E||"static"===E){var z=2*Math.PI*((44-x)/2);C.strokeDasharray=z.toFixed(3),w["aria-valuenow"]=Math.round(k),"static"===E?(C.strokeDashoffset="".concat(((100-k)/100*z).toFixed(3),"px"),N.transform="rotate(-90deg)"):(C.strokeDashoffset="".concat((a=(100-k)/100,a*a*z).toFixed(3),"px"),N.transform="rotate(".concat((270*d(k/70)).toFixed(3),"deg)"))}return i.a.createElement("div",Object(r.a)({className:Object(c.a)(o.root,l,"inherit"!==m&&o["color".concat(Object(s.a)(m))],{indeterminate:o.indeterminate,static:o.static}[E]),style:Object(r.a)({width:b,height:b},N,{},v),ref:t,role:"progressbar"},w,j),i.a.createElement("svg",{className:o.svg,viewBox:"".concat(22," ").concat(22," ").concat(44," ").concat(44)},i.a.createElement("circle",{className:Object(c.a)(o.circle,p&&o.circleDisableShrink,{indeterminate:o.circleIndeterminate,static:o.circleStatic}[E]),style:C,cx:44,cy:44,r:(44-x)/2,fill:"none",strokeWidth:x})))}));t.a=Object(l.a)((function(e){return{root:{display:"inline-block"},static:{transition:e.transitions.create("transform")},indeterminate:{animation:"$circular-rotate 1.4s linear infinite"},colorPrimary:{color:e.palette.primary.main},colorSecondary:{color:e.palette.secondary.main},svg:{display:"block"},circle:{stroke:"currentColor"},circleStatic:{transition:e.transitions.create("stroke-dashoffset")},circleIndeterminate:{animation:"$circular-dash 1.4s ease-in-out infinite",strokeDasharray:"80px, 200px",strokeDashoffset:"0px"},"@keyframes circular-rotate":{"100%":{transform:"rotate(360deg)"}},"@keyframes circular-dash":{"0%":{strokeDasharray:"1px, 200px",strokeDashoffset:"0px"},"50%":{strokeDasharray:"100px, 200px",strokeDashoffset:"-15px"},"100%":{strokeDasharray:"100px, 200px",strokeDashoffset:"-125px"}},circleDisableShrink:{animation:"none"}}}),{name:"MuiCircularProgress",flip:!1})(u)},390:function(e,t,a){"use strict";var r=a(40);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(a(0)),o=(0,r(a(52)).default)(n.default.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"RadioButtonUnchecked");t.default=o}}]);
//# sourceMappingURL=63.79b0fbe3.chunk.js.map