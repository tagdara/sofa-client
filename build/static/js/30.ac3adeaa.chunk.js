(this["webpackJsonpsofa-client"]=this["webpackJsonpsofa-client"]||[]).push([[30,198],{155:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),i=a(32),o=a(949),c=a(436),l=a(927),s=Object(i.a)({dialogPaper:{minHeight:"90vh",maxHeight:"90vh",overflowX:"hidden",display:"flex"}}),u=n.a.forwardRef((function(e,t){return n.a.createElement(l.a,Object.assign({direction:"down",ref:t},e))}));function d(e){var t=s();return n.a.createElement(c.a,{fullScreen:e.fullScreen,fullWidth:e.fullWidth,maxWidth:e.maxWidth,open:e.open,onClose:e.close,TransitionComponent:u,classes:{paper:t.dialogPaper}},e.children)}d.defaultProps={maxWidth:"sm",tabs:"",tabValue:"",tabChange:"",fullWidth:!0},t.default=Object(o.a)()(d)},174:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return g}));var r=a(6),n=a(0),i=a.n(n),o=a(32),c=a(436),l=a(468),s=a.n(l),u=a(366),d=a.n(u),m=a(467),f=a.n(m),p=a(316),v=a(94),b=Object(o.a)({bigcamDialog:{backgroundColor:"#222",paddingTop:"env(safe-area-inset-top)",paddingBottom:"env(safe-area-inset-bottom)",minWidth:"320px",boxSizing:"border-box"},root:{backgroundColor:"#111"},paper:{backgroundColor:"#111",boxShadow:"none",overflow:"hidden"},bigcamPaper:{margin:"auto 4px",maxHeight:"100%",display:"flex"},bigcam:{width:"100%",height:"auto !important",maxWidth:"100%",maxHeight:"100%",background:"#222",opacity:"1.0",margin:"auto auto",padding:0,borderRadius:4},bigcamRotated:{position:"absolute",top:0,left:0,height:"100vw",maxWidth:"initial",padding:0,margin:"auto auto",marginTop:"calc((100vh - 100vw) / 2.5)",marginLeft:"calc((100vw * -1) /2.5) !important",borderRadius:4},rotatebutton:{zIndex:2e3,position:"absolute",top:16,right:72},ratebutton:{zIndex:2e3,position:"absolute",top:16,right:190},closebutton:{zIndex:2e3,position:"absolute",top:16,right:16}}),h=window.Hls;function g(e){var t=b(),a=Object(n.useState)(0),o=Object(r.a)(a,2),l=o[0],u=o[1],m=Object(n.useState)(""),g=Object(r.a)(m,2),y=g[0],x=g[1],E=Object(n.useRef)(null);function C(){document.querySelector("meta[name=viewport]").setAttribute("content","viewport-fit=cover, width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes")}function O(t){document.querySelector("meta[name=viewport]").setAttribute("content","viewport-fit=cover, width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"),e.close()}return Object(n.useEffect)((function(){C()}),[]),Object(n.useEffect)((function(){e.directive(e.camera.endpointId,"CameraStreamController","InitializeCameraStreams",{cameraStreams:[{protocol:"HLS",resolution:{width:640,height:480},authorizationType:"BASIC",videoCodec:"H264",audioCodec:"AAC"}]}).then((function(e){return x(e.payload.cameraStreams[0].uri)}))}),[e.camera]),Object(n.useEffect)((function(){if(console.log("uri update",y),C(),e.live&&window.Hls.isSupported()){var t=new h;t.loadSource(y),t.attachMedia(E.current),t.on(h.Events.MANIFEST_PARSED,(function(){E.current.play()}))}}),[y,e.live]),i.a.createElement(c.a,{fullScreen:!0,open:e.show,onClose:function(){return O()},className:t.bigcamDialog,PaperProps:{classes:{root:t.paper}}},!e.live&&i.a.createElement(v.a,{size:"medium","aria-label":"Rate",className:t.ratebutton,onClick:function(){return e.changeInterval()}},i.a.createElement(f.a,null),e.refreshInterval/1e3),i.a.createElement(v.a,{size:"medium",color:"primary","aria-label":"Close",className:t.closebutton,onClick:function(){return O()}},i.a.createElement(d.a,null)),i.a.createElement(v.a,{size:"medium","aria-label":"Rotate",className:t.rotatebutton,onClick:function(){return u(90!==l?90:0),void console.log("set rotate to ",l)}},i.a.createElement(s.a,null)),i.a.createElement(p.a,{className:t.bigcamPaper},e.live?i.a.createElement("video",{controls:!0,muted:!0,autoPlay:!0,playsInline:!0,id:"video",className:l>0?t.bigcamRotated:t.bigcam,style:{transform:"rotate(".concat(l,"deg)")},ref:E},i.a.createElement("source",{src:y,type:"application/x-mpegURL"})):i.a.createElement("img",{alt:e.camera.friendlyName,className:l>0?t.bigcamRotated:t.bigcam,style:{transform:"rotate(".concat(l,"deg)")},src:e.src})))}},185:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return y}));var r=a(6),n=a(0),i=a.n(n),o=a(16),c=a(32),l=a(430),s=a(367),u=a(448),d=a.n(u),m=a(449),f=a.n(m),p=a(402),v=a.n(p),b=a(174),h=a(27),g=Object(c.a)({nextbutton:{position:"absolute",top:"40%",right:8},prevbutton:{position:"absolute",top:"40%",left:8},gridbutton:{position:"absolute",left:8,bottom:8},newgridbutton:{position:"absolute",right:8,bottom:8},im:{width:"100%",height:"auto",borderRadius:4,display:"flex"},hiddenimage:{height:0,display:"none"},hidden:{borderRadius:4,position:"relative",width:"100%",paddingTop:"56.25%"},spinner:{position:"absolute",margin:"auto",top:0,left:0,right:0,bottom:0}});function y(e){var t=g(),a=Object(n.useContext)(o.LayoutContext),c=a.isMobile,u=a.applyLayoutCard,m=[1e3,500,5e3,3e3],p=Object(n.useState)(!1),y=Object(r.a)(p,2),x=y[0],E=y[1],C=Object(n.useState)(!1),O=Object(r.a)(C,2),j=O[0],k=O[1],z=Object(n.useState)(3e3),w=Object(r.a)(z,2),S=w[0],N=w[1],I=Object(n.useState)(""),R=Object(r.a)(I,2),M=R[0],B=R[1],L=Object(n.useState)(""),P=Object(r.a)(L,2),D=P[0],T=P[1],W=Object(n.useState)(!1),_=Object(r.a)(W,2),H=_[0],A=_[1];return function(e,t){var a=Object(n.useRef)();Object(n.useEffect)((function(){a.current=e}),[e]),Object(n.useEffect)((function(){if(null!==t){var e=setInterval((function(){a.current()}),t);return function(){return clearInterval(e)}}}),[t])}((function(){M&&T(M+"?time="+Date.now())}),S),Object(n.useEffect)((function(){e.camera&&H!==e.camera.endpointId&&(A(e.camera.endpointId),e.directive(e.camera.endpointId,"CameraStreamController","InitializeCameraStreams",{cameraStreams:[{protocol:"HLS",resolution:{width:640,height:480},authorizationType:"BASIC",videoCodec:"H264",audioCodec:"AAC"}]}).then((function(e){return T((t=e).payload.imageUri+"?time="+Date.now()),void B(t.payload.imageUri);var t})))}),[e.camera,H]),i.a.createElement(h.default,{wide:e.wide,nopad:!0,noMargin:e.top,thinmargin:c},M&&i.a.createElement("img",{className:x?t.im:t.hiddenimage,src:D,onLoad:function(){x||E(!0)},onClick:function(){k(!0)},alt:e.camera.friendlyName+" Security Camera"}),x?i.a.createElement(i.a.Fragment,null,e.prevCamera&&i.a.createElement(s.a,{color:"primary",className:t.prevbutton,onClick:function(){return e.prevCamera()}},i.a.createElement(d.a,null)),e.nextCamera&&i.a.createElement(s.a,{color:"primary",className:t.nextbutton,onClick:function(){return e.nextCamera()}},i.a.createElement(f.a,null)),e.selectButtons&&i.a.createElement(s.a,{color:"primary",className:t.newgridbutton,onClick:function(){return u("CameraLayout")}},i.a.createElement(v.a,null))):i.a.createElement("div",{className:t.hidden},i.a.createElement(l.a,{className:t.spinner,size:50})),j&&i.a.createElement(b.default,{directive:e.directive,live:!0,camera:e.camera,name:e.name,refreshInterval:S,changeInterval:function(){N(m.shift()),m.push(S)},show:j,close:function(){k(!1)},src:M}))}},242:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return g}));var r=a(6),n=a(0),i=a.n(n),o=a(32),c=a(461),l=a(319),s=a(485),u=a.n(s),d=a(366),m=a.n(d),f=a(117),p=a(40),v=a(185),b=a(155),h=Object(o.a)({content:{minWidth:0,paddingBottom:16},gridList:{maxWidth:320,paddingTop:16,margin:"0 auto !important"},gridButtonTile:{display:"flex",alignItems:"center",justifyContent:"center"},gridTitle:{margin:1,alignItems:"center",display:"flex",paddingBottom:16,justifyContent:"space-around"},bigButton:{width:"100%",height:72},nameInput:{height:72,alignItems:"flex-end",display:"flex"}});function g(e){var t=h(),a=Object(n.useState)([]),o=Object(r.a)(a,2),s=o[0],d=o[1];function g(e){d(s+e)}function y(){d(""),e.close()}return i.a.createElement(b.default,{maxWidth:"xs",open:e.open,close:y},i.a.createElement(c.a,null,i.a.createElement(p.a,{container:!0,item:!0,spacing:1,xs:12},i.a.createElement(p.a,{item:!0,xs:12}),i.a.createElement(v.default,{wide:!0,camera:e.camera,selectButtons:!1,directive:e.directive}),i.a.createElement(p.a,{item:!0,xs:12,className:t.nameInput},i.a.createElement(f.a,{id:"required",fullWidth:!0,margin:"normal",value:s,type:"password",onChange:function(e){return d(e.target.value)}})),i.a.createElement(p.a,{item:!0,xs:4},i.a.createElement(l.a,{className:t.bigButton,variant:"outlined",color:"primary",size:"large",onClick:function(){return g("1")}},"1")),i.a.createElement(p.a,{item:!0,xs:4},i.a.createElement(l.a,{className:t.bigButton,variant:"outlined",color:"primary",size:"large",onClick:function(){return g("2")}},"2")),i.a.createElement(p.a,{item:!0,xs:4},i.a.createElement(l.a,{className:t.bigButton,variant:"outlined",color:"primary",size:"large",onClick:function(){return g("3")}},"3")),i.a.createElement(p.a,{item:!0,xs:4},i.a.createElement(l.a,{className:t.bigButton,variant:"outlined",color:"primary",size:"large",onClick:function(){return g("4")}},"4")),i.a.createElement(p.a,{item:!0,xs:4},i.a.createElement(l.a,{className:t.bigButton,variant:"outlined",color:"primary",size:"large",onClick:function(){return g("5")}},"5")),i.a.createElement(p.a,{item:!0,xs:4},i.a.createElement(l.a,{className:t.bigButton,variant:"outlined",color:"primary",size:"large",onClick:function(){return g("6")}},"6")),i.a.createElement(p.a,{item:!0,xs:4},i.a.createElement(l.a,{className:t.bigButton,variant:"outlined",color:"primary",size:"large",onClick:function(){return g("7")}},"7")),i.a.createElement(p.a,{item:!0,xs:4},i.a.createElement(l.a,{className:t.bigButton,variant:"outlined",color:"primary",size:"large",onClick:function(){return g("8")}},"8")),i.a.createElement(p.a,{item:!0,xs:4},i.a.createElement(l.a,{className:t.bigButton,variant:"outlined",color:"primary",size:"large",onClick:function(){return g("9")}},"9")),i.a.createElement(p.a,{item:!0,xs:4},i.a.createElement(l.a,{className:t.bigButton,size:"large",onClick:function(){return y()}},i.a.createElement(m.a,null))),i.a.createElement(p.a,{item:!0,xs:4},i.a.createElement(l.a,{className:t.bigButton,variant:"outlined",color:"primary",size:"large",onClick:function(){return g("0")}},"0")),i.a.createElement(p.a,{item:!0,xs:4},i.a.createElement(l.a,{className:t.bigButton,size:"large",onClick:function(){return e.submitPin(s),void d("")},autoFocus:!0},i.a.createElement(u.a,null))))))}},366:function(e,t,a){"use strict";var r=a(23);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(a(0)),i=(0,r(a(26)).default)(n.default.createElement("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close");t.default=i},367:function(e,t,a){"use strict";var r=a(1),n=a(2),i=a(0),o=a.n(i),c=(a(5),a(3)),l=a(4),s=a(15),u=a(86),d=a(8),m=o.a.forwardRef((function(e,t){var a=e.edge,i=void 0!==a&&a,l=e.children,s=e.classes,m=e.className,f=e.color,p=void 0===f?"default":f,v=e.disabled,b=void 0!==v&&v,h=e.disableFocusRipple,g=void 0!==h&&h,y=e.size,x=void 0===y?"medium":y,E=Object(n.a)(e,["edge","children","classes","className","color","disabled","disableFocusRipple","size"]);return o.a.createElement(u.a,Object(r.a)({className:Object(c.a)(s.root,m,"default"!==p&&s["color".concat(Object(d.a)(p))],b&&s.disabled,{small:s["size".concat(Object(d.a)(x))]}[x],{start:s.edgeStart,end:s.edgeEnd}[i]),centerRipple:!0,focusRipple:!g,disabled:b,ref:t},E),o.a.createElement("span",{className:s.label},l))}));t.a=Object(l.a)((function(e){return{root:{textAlign:"center",flex:"0 0 auto",fontSize:e.typography.pxToRem(24),padding:12,borderRadius:"50%",overflow:"visible",color:e.palette.action.active,transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{backgroundColor:Object(s.c)(e.palette.action.active,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"&$disabled":{backgroundColor:"transparent",color:e.palette.action.disabled}},edgeStart:{marginLeft:-12,"$sizeSmall&":{marginLeft:-3}},edgeEnd:{marginRight:-12,"$sizeSmall&":{marginRight:-3}},colorInherit:{color:"inherit"},colorPrimary:{color:e.palette.primary.main,"&:hover":{backgroundColor:Object(s.c)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},colorSecondary:{color:e.palette.secondary.main,"&:hover":{backgroundColor:Object(s.c)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},disabled:{},sizeSmall:{padding:3,fontSize:e.typography.pxToRem(18)},label:{width:"100%",display:"flex",alignItems:"inherit",justifyContent:"inherit"}}}),{name:"MuiIconButton"})(m)},402:function(e,t,a){"use strict";var r=a(23);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(a(0)),i=(0,r(a(26)).default)(n.default.createElement("path",{d:"M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z"}),"ViewModule");t.default=i},430:function(e,t,a){"use strict";var r=a(1),n=a(2),i=a(0),o=a.n(i),c=(a(5),a(3)),l=a(4),s=a(8);function u(e){var t,a,r;return t=e,a=0,r=1,e=(Math.min(Math.max(a,t),r)-a)/(r-a),e=(e-=1)*e*e+1}var d=o.a.forwardRef((function(e,t){var a,i=e.classes,l=e.className,d=e.color,m=void 0===d?"primary":d,f=e.disableShrink,p=void 0!==f&&f,v=e.size,b=void 0===v?40:v,h=e.style,g=e.thickness,y=void 0===g?3.6:g,x=e.value,E=void 0===x?0:x,C=e.variant,O=void 0===C?"indeterminate":C,j=Object(n.a)(e,["classes","className","color","disableShrink","size","style","thickness","value","variant"]),k={},z={},w={};if("determinate"===O||"static"===O){var S=2*Math.PI*((44-y)/2);k.strokeDasharray=S.toFixed(3),w["aria-valuenow"]=Math.round(E),"static"===O?(k.strokeDashoffset="".concat(((100-E)/100*S).toFixed(3),"px"),z.transform="rotate(-90deg)"):(k.strokeDashoffset="".concat((a=(100-E)/100,a*a*S).toFixed(3),"px"),z.transform="rotate(".concat((270*u(E/70)).toFixed(3),"deg)"))}return o.a.createElement("div",Object(r.a)({className:Object(c.a)(i.root,l,"inherit"!==m&&i["color".concat(Object(s.a)(m))],{indeterminate:i.indeterminate,static:i.static}[O]),style:Object(r.a)({width:b,height:b},z,{},h),ref:t,role:"progressbar"},w,j),o.a.createElement("svg",{className:i.svg,viewBox:"".concat(22," ").concat(22," ").concat(44," ").concat(44)},o.a.createElement("circle",{className:Object(c.a)(i.circle,p&&i.circleDisableShrink,{indeterminate:i.circleIndeterminate,static:i.circleStatic}[O]),style:k,cx:44,cy:44,r:(44-y)/2,fill:"none",strokeWidth:y})))}));t.a=Object(l.a)((function(e){return{root:{display:"inline-block"},static:{transition:e.transitions.create("transform")},indeterminate:{animation:"$circular-rotate 1.4s linear infinite"},colorPrimary:{color:e.palette.primary.main},colorSecondary:{color:e.palette.secondary.main},svg:{display:"block"},circle:{stroke:"currentColor"},circleStatic:{transition:e.transitions.create("stroke-dashoffset")},circleIndeterminate:{animation:"$circular-dash 1.4s ease-in-out infinite",strokeDasharray:"80px, 200px",strokeDashoffset:"0px"},"@keyframes circular-rotate":{"100%":{transform:"rotate(360deg)"}},"@keyframes circular-dash":{"0%":{strokeDasharray:"1px, 200px",strokeDashoffset:"0px"},"50%":{strokeDasharray:"100px, 200px",strokeDashoffset:"-15px"},"100%":{strokeDasharray:"100px, 200px",strokeDashoffset:"-125px"}},circleDisableShrink:{animation:"none"}}}),{name:"MuiCircularProgress",flip:!1})(d)},448:function(e,t,a){"use strict";var r=a(23);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(a(0)),i=(0,r(a(26)).default)(n.default.createElement("path",{d:"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"}),"ChevronLeft");t.default=i},449:function(e,t,a){"use strict";var r=a(23);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(a(0)),i=(0,r(a(26)).default)(n.default.createElement("path",{d:"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"}),"ChevronRight");t.default=i},461:function(e,t,a){"use strict";var r=a(1),n=a(2),i=a(0),o=a.n(i),c=(a(5),a(3)),l=a(4),s=o.a.forwardRef((function(e,t){var a=e.classes,i=e.className,l=e.dividers,s=void 0!==l&&l,u=Object(n.a)(e,["classes","className","dividers"]);return o.a.createElement("div",Object(r.a)({className:Object(c.a)(a.root,i,s&&a.dividers),ref:t},u))}));t.a=Object(l.a)((function(e){return{root:{flex:"1 1 auto",WebkitOverflowScrolling:"touch",overflowY:"auto",padding:"8px 24px","&:first-child":{paddingTop:20}},dividers:{padding:"16px 24px",borderTop:"1px solid ".concat(e.palette.divider),borderBottom:"1px solid ".concat(e.palette.divider)}}}),{name:"MuiDialogContent"})(s)},467:function(e,t,a){"use strict";var r=a(23);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(a(0)),i=(0,r(a(26)).default)(n.default.createElement("path",{d:"M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"}),"Timer");t.default=i},468:function(e,t,a){"use strict";var r=a(23);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(a(0)),i=(0,r(a(26)).default)(n.default.createElement("path",{d:"M16.48 2.52c3.27 1.55 5.61 4.72 5.97 8.48h1.5C23.44 4.84 18.29 0 12 0l-.66.03 3.81 3.81 1.33-1.32zm-6.25-.77c-.59-.59-1.54-.59-2.12 0L1.75 8.11c-.59.59-.59 1.54 0 2.12l12.02 12.02c.59.59 1.54.59 2.12 0l6.36-6.36c.59-.59.59-1.54 0-2.12L10.23 1.75zm4.6 19.44L2.81 9.17l6.36-6.36 12.02 12.02-6.36 6.36zm-7.31.29C4.25 19.94 1.91 16.76 1.55 13H.05C.56 19.16 5.71 24 12 24l.66-.03-3.81-3.81-1.33 1.32z"}),"ScreenRotation");t.default=i},485:function(e,t,a){"use strict";var r=a(23);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(a(0)),i=(0,r(a(26)).default)(n.default.createElement("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"}),"Check");t.default=i}}]);
//# sourceMappingURL=30.ac3adeaa.chunk.js.map