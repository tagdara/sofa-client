(this["webpackJsonpsofa-client"]=this["webpackJsonpsofa-client"]||[]).push([[63,72,105],{174:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return g}));var n=a(6),r=a(0),i=a.n(r),o=a(32),c=a(436),l=a(468),s=a.n(l),d=a(366),u=a.n(d),p=a(467),m=a.n(p),b=a(316),f=a(94),h=Object(o.a)({bigcamDialog:{backgroundColor:"#222",paddingTop:"env(safe-area-inset-top)",paddingBottom:"env(safe-area-inset-bottom)",minWidth:"320px",boxSizing:"border-box"},root:{backgroundColor:"#111"},paper:{backgroundColor:"#111",boxShadow:"none",overflow:"hidden"},bigcamPaper:{margin:"auto 4px",maxHeight:"100%",display:"flex"},bigcam:{width:"100%",height:"auto !important",maxWidth:"100%",maxHeight:"100%",background:"#222",opacity:"1.0",margin:"auto auto",padding:0,borderRadius:4},bigcamRotated:{position:"absolute",top:0,left:0,height:"100vw",maxWidth:"initial",padding:0,margin:"auto auto",marginTop:"calc((100vh - 100vw) / 2.5)",marginLeft:"calc((100vw * -1) /2.5) !important",borderRadius:4},rotatebutton:{zIndex:2e3,position:"absolute",top:16,right:72},ratebutton:{zIndex:2e3,position:"absolute",top:16,right:190},closebutton:{zIndex:2e3,position:"absolute",top:16,right:16}}),v=window.Hls;function g(e){var t=h(),a=Object(r.useState)(0),o=Object(n.a)(a,2),l=o[0],d=o[1],p=Object(r.useState)(""),g=Object(n.a)(p,2),y=g[0],x=g[1],k=Object(r.useRef)(null);function E(){document.querySelector("meta[name=viewport]").setAttribute("content","viewport-fit=cover, width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes")}function j(t){document.querySelector("meta[name=viewport]").setAttribute("content","viewport-fit=cover, width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"),e.close()}return Object(r.useEffect)((function(){E()}),[]),Object(r.useEffect)((function(){e.directive(e.camera.endpointId,"CameraStreamController","InitializeCameraStreams",{cameraStreams:[{protocol:"HLS",resolution:{width:640,height:480},authorizationType:"BASIC",videoCodec:"H264",audioCodec:"AAC"}]}).then((function(e){return x(e.payload.cameraStreams[0].uri)}))}),[e.camera]),Object(r.useEffect)((function(){if(console.log("uri update",y),E(),e.live&&window.Hls.isSupported()){var t=new v;t.loadSource(y),t.attachMedia(k.current),t.on(v.Events.MANIFEST_PARSED,(function(){k.current.play()}))}}),[y,e.live]),i.a.createElement(c.a,{fullScreen:!0,open:e.show,onClose:function(){return j()},className:t.bigcamDialog,PaperProps:{classes:{root:t.paper}}},!e.live&&i.a.createElement(f.a,{size:"medium","aria-label":"Rate",className:t.ratebutton,onClick:function(){return e.changeInterval()}},i.a.createElement(m.a,null),e.refreshInterval/1e3),i.a.createElement(f.a,{size:"medium",color:"primary","aria-label":"Close",className:t.closebutton,onClick:function(){return j()}},i.a.createElement(u.a,null)),i.a.createElement(f.a,{size:"medium","aria-label":"Rotate",className:t.rotatebutton,onClick:function(){return d(90!==l?90:0),void console.log("set rotate to ",l)}},i.a.createElement(s.a,null)),i.a.createElement(b.a,{className:t.bigcamPaper},e.live?i.a.createElement("video",{controls:!0,muted:!0,autoPlay:!0,playsInline:!0,id:"video",className:l>0?t.bigcamRotated:t.bigcam,style:{transform:"rotate(".concat(l,"deg)")},ref:k},i.a.createElement("source",{src:y,type:"application/x-mpegURL"})):i.a.createElement("img",{alt:e.camera.friendlyName,className:l>0?t.bigcamRotated:t.bigcam,style:{transform:"rotate(".concat(l,"deg)")},src:e.src})))}},185:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return y}));var n=a(6),r=a(0),i=a.n(r),o=a(16),c=a(32),l=a(430),s=a(367),d=a(448),u=a.n(d),p=a(449),m=a.n(p),b=a(402),f=a.n(b),h=a(174),v=a(27),g=Object(c.a)({nextbutton:{position:"absolute",top:"40%",right:8},prevbutton:{position:"absolute",top:"40%",left:8},gridbutton:{position:"absolute",left:8,bottom:8},newgridbutton:{position:"absolute",right:8,bottom:8},im:{width:"100%",height:"auto",borderRadius:4,display:"flex"},hiddenimage:{height:0,display:"none"},hidden:{borderRadius:4,position:"relative",width:"100%",paddingTop:"56.25%"},spinner:{position:"absolute",margin:"auto",top:0,left:0,right:0,bottom:0}});function y(e){var t=g(),a=Object(r.useContext)(o.LayoutContext),c=a.isMobile,d=a.applyLayoutCard,p=[1e3,500,5e3,3e3],b=Object(r.useState)(!1),y=Object(n.a)(b,2),x=y[0],k=y[1],E=Object(r.useState)(!1),j=Object(n.a)(E,2),O=j[0],C=j[1],w=Object(r.useState)(3e3),S=Object(n.a)(w,2),z=S[0],N=S[1],D=Object(r.useState)(""),R=Object(n.a)(D,2),W=R[0],M=R[1],P=Object(r.useState)(""),I=Object(n.a)(P,2),B=I[0],L=I[1],T=Object(r.useState)(!1),A=Object(n.a)(T,2),H=A[0],F=A[1];return function(e,t){var a=Object(r.useRef)();Object(r.useEffect)((function(){a.current=e}),[e]),Object(r.useEffect)((function(){if(null!==t){var e=setInterval((function(){a.current()}),t);return function(){return clearInterval(e)}}}),[t])}((function(){W&&L(W+"?time="+Date.now())}),z),Object(r.useEffect)((function(){e.camera&&H!==e.camera.endpointId&&(F(e.camera.endpointId),e.directive(e.camera.endpointId,"CameraStreamController","InitializeCameraStreams",{cameraStreams:[{protocol:"HLS",resolution:{width:640,height:480},authorizationType:"BASIC",videoCodec:"H264",audioCodec:"AAC"}]}).then((function(e){return L((t=e).payload.imageUri+"?time="+Date.now()),void M(t.payload.imageUri);var t})))}),[e.camera,H]),i.a.createElement(v.default,{wide:e.wide,nopad:!0,noMargin:e.top,thinmargin:c},W&&i.a.createElement("img",{className:x?t.im:t.hiddenimage,src:B,onLoad:function(){x||k(!0)},onClick:function(){C(!0)},alt:e.camera.friendlyName+" Security Camera"}),x?i.a.createElement(i.a.Fragment,null,e.prevCamera&&i.a.createElement(s.a,{color:"primary",className:t.prevbutton,onClick:function(){return e.prevCamera()}},i.a.createElement(u.a,null)),e.nextCamera&&i.a.createElement(s.a,{color:"primary",className:t.nextbutton,onClick:function(){return e.nextCamera()}},i.a.createElement(m.a,null)),e.selectButtons&&i.a.createElement(s.a,{color:"primary",className:t.newgridbutton,onClick:function(){return d("CameraLayout")}},i.a.createElement(f.a,null))):i.a.createElement("div",{className:t.hidden},i.a.createElement(l.a,{className:t.spinner,size:50})),O&&i.a.createElement(h.default,{directive:e.directive,live:!0,camera:e.camera,name:e.name,refreshInterval:z,changeInterval:function(){N(p.shift()),p.push(z)},show:O,close:function(){C(!1)},src:W}))}},366:function(e,t,a){"use strict";var n=a(23);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(0)),i=(0,n(a(26)).default)(r.default.createElement("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close");t.default=i},367:function(e,t,a){"use strict";var n=a(1),r=a(2),i=a(0),o=a.n(i),c=(a(5),a(3)),l=a(4),s=a(15),d=a(86),u=a(8),p=o.a.forwardRef((function(e,t){var a=e.edge,i=void 0!==a&&a,l=e.children,s=e.classes,p=e.className,m=e.color,b=void 0===m?"default":m,f=e.disabled,h=void 0!==f&&f,v=e.disableFocusRipple,g=void 0!==v&&v,y=e.size,x=void 0===y?"medium":y,k=Object(r.a)(e,["edge","children","classes","className","color","disabled","disableFocusRipple","size"]);return o.a.createElement(d.a,Object(n.a)({className:Object(c.a)(s.root,p,"default"!==b&&s["color".concat(Object(u.a)(b))],h&&s.disabled,{small:s["size".concat(Object(u.a)(x))]}[x],{start:s.edgeStart,end:s.edgeEnd}[i]),centerRipple:!0,focusRipple:!g,disabled:h,ref:t},k),o.a.createElement("span",{className:s.label},l))}));t.a=Object(l.a)((function(e){return{root:{textAlign:"center",flex:"0 0 auto",fontSize:e.typography.pxToRem(24),padding:12,borderRadius:"50%",overflow:"visible",color:e.palette.action.active,transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{backgroundColor:Object(s.c)(e.palette.action.active,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"&$disabled":{backgroundColor:"transparent",color:e.palette.action.disabled}},edgeStart:{marginLeft:-12,"$sizeSmall&":{marginLeft:-3}},edgeEnd:{marginRight:-12,"$sizeSmall&":{marginRight:-3}},colorInherit:{color:"inherit"},colorPrimary:{color:e.palette.primary.main,"&:hover":{backgroundColor:Object(s.c)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},colorSecondary:{color:e.palette.secondary.main,"&:hover":{backgroundColor:Object(s.c)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},disabled:{},sizeSmall:{padding:3,fontSize:e.typography.pxToRem(18)},label:{width:"100%",display:"flex",alignItems:"inherit",justifyContent:"inherit"}}}),{name:"MuiIconButton"})(p)},402:function(e,t,a){"use strict";var n=a(23);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(0)),i=(0,n(a(26)).default)(r.default.createElement("path",{d:"M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z"}),"ViewModule");t.default=i},430:function(e,t,a){"use strict";var n=a(1),r=a(2),i=a(0),o=a.n(i),c=(a(5),a(3)),l=a(4),s=a(8);function d(e){var t,a,n;return t=e,a=0,n=1,e=(Math.min(Math.max(a,t),n)-a)/(n-a),e=(e-=1)*e*e+1}var u=o.a.forwardRef((function(e,t){var a,i=e.classes,l=e.className,u=e.color,p=void 0===u?"primary":u,m=e.disableShrink,b=void 0!==m&&m,f=e.size,h=void 0===f?40:f,v=e.style,g=e.thickness,y=void 0===g?3.6:g,x=e.value,k=void 0===x?0:x,E=e.variant,j=void 0===E?"indeterminate":E,O=Object(r.a)(e,["classes","className","color","disableShrink","size","style","thickness","value","variant"]),C={},w={},S={};if("determinate"===j||"static"===j){var z=2*Math.PI*((44-y)/2);C.strokeDasharray=z.toFixed(3),S["aria-valuenow"]=Math.round(k),"static"===j?(C.strokeDashoffset="".concat(((100-k)/100*z).toFixed(3),"px"),w.transform="rotate(-90deg)"):(C.strokeDashoffset="".concat((a=(100-k)/100,a*a*z).toFixed(3),"px"),w.transform="rotate(".concat((270*d(k/70)).toFixed(3),"deg)"))}return o.a.createElement("div",Object(n.a)({className:Object(c.a)(i.root,l,"inherit"!==p&&i["color".concat(Object(s.a)(p))],{indeterminate:i.indeterminate,static:i.static}[j]),style:Object(n.a)({width:h,height:h},w,{},v),ref:t,role:"progressbar"},S,O),o.a.createElement("svg",{className:i.svg,viewBox:"".concat(22," ").concat(22," ").concat(44," ").concat(44)},o.a.createElement("circle",{className:Object(c.a)(i.circle,b&&i.circleDisableShrink,{indeterminate:i.circleIndeterminate,static:i.circleStatic}[j]),style:C,cx:44,cy:44,r:(44-y)/2,fill:"none",strokeWidth:y})))}));t.a=Object(l.a)((function(e){return{root:{display:"inline-block"},static:{transition:e.transitions.create("transform")},indeterminate:{animation:"$circular-rotate 1.4s linear infinite"},colorPrimary:{color:e.palette.primary.main},colorSecondary:{color:e.palette.secondary.main},svg:{display:"block"},circle:{stroke:"currentColor"},circleStatic:{transition:e.transitions.create("stroke-dashoffset")},circleIndeterminate:{animation:"$circular-dash 1.4s ease-in-out infinite",strokeDasharray:"80px, 200px",strokeDashoffset:"0px"},"@keyframes circular-rotate":{"100%":{transform:"rotate(360deg)"}},"@keyframes circular-dash":{"0%":{strokeDasharray:"1px, 200px",strokeDashoffset:"0px"},"50%":{strokeDasharray:"100px, 200px",strokeDashoffset:"-15px"},"100%":{strokeDasharray:"100px, 200px",strokeDashoffset:"-125px"}},circleDisableShrink:{animation:"none"}}}),{name:"MuiCircularProgress",flip:!1})(u)},431:function(e,t,a){"use strict";var n=a(1),r=a(2),i=a(0),o=a.n(i),c=(a(5),a(323)),l=a(96),s=a(43),d=a(65),u=a(10),p={entering:{opacity:1},entered:{opacity:1}},m={enter:l.b.enteringScreen,exit:l.b.leavingScreen},b=o.a.forwardRef((function(e,t){var a=e.children,i=e.in,l=e.onEnter,b=e.onExit,f=e.style,h=e.timeout,v=void 0===h?m:h,g=Object(r.a)(e,["children","in","onEnter","onExit","style","timeout"]),y=Object(s.a)(),x=Object(u.a)(a.ref,t);return o.a.createElement(c.a,Object(n.a)({appear:!0,in:i,onEnter:function(e,t){Object(d.b)(e);var a=Object(d.a)({style:f,timeout:v},{mode:"enter"});e.style.webkitTransition=y.transitions.create("opacity",a),e.style.transition=y.transitions.create("opacity",a),l&&l(e,t)},onExit:function(e){var t=Object(d.a)({style:f,timeout:v},{mode:"exit"});e.style.webkitTransition=y.transitions.create("opacity",t),e.style.transition=y.transitions.create("opacity",t),b&&b(e)},timeout:v},g),(function(e,t){return o.a.cloneElement(a,Object(n.a)({style:Object(n.a)({opacity:0,visibility:"exited"!==e||i?void 0:"hidden"},p[e],{},f,{},a.props.style),ref:x},t))}))}));t.a=b},436:function(e,t,a){"use strict";var n=a(1),r=a(2),i=a(33),o=a(0),c=a.n(o),l=(a(5),a(3)),s=a(4),d=a(8),u=a(360),p=a(431),m=c.a.forwardRef((function(e,t){var a=e.children,i=e.classes,o=e.className,s=e.invisible,d=void 0!==s&&s,u=e.open,m=e.transitionDuration,b=Object(r.a)(e,["children","classes","className","invisible","open","transitionDuration"]);return c.a.createElement(p.a,Object(n.a)({in:u,timeout:m},b),c.a.createElement("div",{className:Object(l.a)(i.root,o,d&&i.invisible),"aria-hidden":!0,ref:t},a))})),b=Object(s.a)({root:{zIndex:-1,position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent",touchAction:"none"},invisible:{backgroundColor:"transparent"}},{name:"MuiBackdrop"})(m),f=a(96),h=a(316),v={enter:f.b.enteringScreen,exit:f.b.leavingScreen},g=c.a.forwardRef((function(e,t){var a=e.BackdropProps,i=e.children,o=e.classes,s=e.className,m=e.disableBackdropClick,f=void 0!==m&&m,g=e.disableEscapeKeyDown,y=void 0!==g&&g,x=e.fullScreen,k=void 0!==x&&x,E=e.fullWidth,j=void 0!==E&&E,O=e.maxWidth,C=void 0===O?"sm":O,w=e.onBackdropClick,S=e.onClose,z=e.onEnter,N=e.onEntered,D=e.onEntering,R=e.onEscapeKeyDown,W=e.onExit,M=e.onExited,P=e.onExiting,I=e.open,B=e.PaperComponent,L=void 0===B?h.a:B,T=e.PaperProps,A=void 0===T?{}:T,H=e.scroll,F=void 0===H?"paper":H,_=e.TransitionComponent,$=void 0===_?p.a:_,K=e.transitionDuration,V=void 0===K?v:K,U=e.TransitionProps,X=e["aria-describedby"],Y=e["aria-labelledby"],q=Object(r.a)(e,["BackdropProps","children","classes","className","disableBackdropClick","disableEscapeKeyDown","fullScreen","fullWidth","maxWidth","onBackdropClick","onClose","onEnter","onEntered","onEntering","onEscapeKeyDown","onExit","onExited","onExiting","open","PaperComponent","PaperProps","scroll","TransitionComponent","transitionDuration","TransitionProps","aria-describedby","aria-labelledby"]),J=c.a.useRef();return c.a.createElement(u.a,Object(n.a)({className:Object(l.a)(o.root,s),BackdropComponent:b,BackdropProps:Object(n.a)({transitionDuration:V},a),closeAfterTransition:!0,disableBackdropClick:f,disableEscapeKeyDown:y,onEscapeKeyDown:R,onClose:S,open:I,ref:t},q),c.a.createElement($,Object(n.a)({appear:!0,in:I,timeout:V,onEnter:z,onEntering:D,onEntered:N,onExit:W,onExiting:P,onExited:M,role:"none presentation"},U),c.a.createElement("div",{className:Object(l.a)(o.container,o["scroll".concat(Object(d.a)(F))]),onClick:function(e){e.target===e.currentTarget&&e.target===J.current&&(J.current=null,w&&w(e),!f&&S&&S(e,"backdropClick"))},onMouseDown:function(e){J.current=e.target}},c.a.createElement(L,Object(n.a)({elevation:24,role:"dialog","aria-describedby":X,"aria-labelledby":Y},A,{className:Object(l.a)(o.paper,o["paperScroll".concat(Object(d.a)(F))],o["paperWidth".concat(Object(d.a)(String(C)))],A.className,k&&o.paperFullScreen,j&&o.paperFullWidth)}),i))))}));t.a=Object(s.a)((function(e){return{root:{"@media print":{position:"absolute !important"}},scrollPaper:{display:"flex",justifyContent:"center",alignItems:"center"},scrollBody:{overflowY:"auto",overflowX:"hidden",textAlign:"center","&:after":{content:'""',display:"inline-block",verticalAlign:"middle",height:"100%",width:"0"}},container:{height:"100%","@media print":{height:"auto"},outline:0},paper:{margin:32,position:"relative",overflowY:"auto","@media print":{overflowY:"visible",boxShadow:"none"}},paperScrollPaper:{display:"flex",flexDirection:"column",maxHeight:"calc(100% - 64px)"},paperScrollBody:{display:"inline-block",verticalAlign:"middle",textAlign:"left"},paperWidthFalse:{maxWidth:"calc(100% - 64px)"},paperWidthXs:{maxWidth:Math.max(e.breakpoints.values.xs,444),"&$paperScrollBody":Object(i.a)({},e.breakpoints.down(Math.max(e.breakpoints.values.xs,444)+64),{maxWidth:"calc(100% - 64px)"})},paperWidthSm:{maxWidth:e.breakpoints.values.sm,"&$paperScrollBody":Object(i.a)({},e.breakpoints.down(e.breakpoints.values.sm+64),{maxWidth:"calc(100% - 64px)"})},paperWidthMd:{maxWidth:e.breakpoints.values.md,"&$paperScrollBody":Object(i.a)({},e.breakpoints.down(e.breakpoints.values.md+64),{maxWidth:"calc(100% - 64px)"})},paperWidthLg:{maxWidth:e.breakpoints.values.lg,"&$paperScrollBody":Object(i.a)({},e.breakpoints.down(e.breakpoints.values.lg+64),{maxWidth:"calc(100% - 64px)"})},paperWidthXl:{maxWidth:e.breakpoints.values.xl,"&$paperScrollBody":Object(i.a)({},e.breakpoints.down(e.breakpoints.values.xl+64),{maxWidth:"calc(100% - 64px)"})},paperFullWidth:{width:"calc(100% - 64px)"},paperFullScreen:{margin:0,width:"100%",maxWidth:"100%",height:"100%",maxHeight:"none",borderRadius:0,"&$paperScrollBody":{margin:0,maxWidth:"100%"}}}}),{name:"MuiDialog"})(g)},448:function(e,t,a){"use strict";var n=a(23);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(0)),i=(0,n(a(26)).default)(r.default.createElement("path",{d:"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"}),"ChevronLeft");t.default=i},449:function(e,t,a){"use strict";var n=a(23);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(0)),i=(0,n(a(26)).default)(r.default.createElement("path",{d:"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"}),"ChevronRight");t.default=i},467:function(e,t,a){"use strict";var n=a(23);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(0)),i=(0,n(a(26)).default)(r.default.createElement("path",{d:"M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"}),"Timer");t.default=i},468:function(e,t,a){"use strict";var n=a(23);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(0)),i=(0,n(a(26)).default)(r.default.createElement("path",{d:"M16.48 2.52c3.27 1.55 5.61 4.72 5.97 8.48h1.5C23.44 4.84 18.29 0 12 0l-.66.03 3.81 3.81 1.33-1.32zm-6.25-.77c-.59-.59-1.54-.59-2.12 0L1.75 8.11c-.59.59-.59 1.54 0 2.12l12.02 12.02c.59.59 1.54.59 2.12 0l6.36-6.36c.59-.59.59-1.54 0-2.12L10.23 1.75zm4.6 19.44L2.81 9.17l6.36-6.36 12.02 12.02-6.36 6.36zm-7.31.29C4.25 19.94 1.91 16.76 1.55 13H.05C.56 19.16 5.71 24 12 24l.66-.03-3.81-3.81-1.33 1.32z"}),"ScreenRotation");t.default=i}}]);
//# sourceMappingURL=63.71d4bb48.chunk.js.map