(this["webpackJsonpsofa-client"]=this["webpackJsonpsofa-client"]||[]).push([[84],{156:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return g}));var n=a(6),i=a(0),o=a.n(i),r=a(38),l=a(401),c=a(396),s=a.n(c),d=a(331),p=a.n(d),u=a(395),m=a.n(u),b=a(283),f=a(85),h=Object(r.a)({bigcamDialog:{backgroundColor:"#222",paddingTop:"env(safe-area-inset-top)",paddingBottom:"env(safe-area-inset-bottom)",minWidth:"320px",boxSizing:"border-box"},root:{backgroundColor:"#111"},paper:{backgroundColor:"#111",boxShadow:"none",overflow:"hidden"},bigcamPaper:{margin:"auto 4px",maxHeight:"100%",display:"flex"},bigcam:{width:"100%",height:"auto !important",maxWidth:"100%",maxHeight:"100%",background:"#222",opacity:"1.0",margin:"auto auto",padding:0,borderRadius:4},bigcamRotated:{position:"absolute",top:0,left:0,height:"100vw",maxWidth:"initial",padding:0,margin:"auto auto",marginTop:"calc((100vh - 100vw) / 2.5)",marginLeft:"calc((100vw * -1) /2.5) !important",borderRadius:4},rotatebutton:{zIndex:2e3,position:"absolute",top:16,right:72},ratebutton:{zIndex:2e3,position:"absolute",top:16,right:190},closebutton:{zIndex:2e3,position:"absolute",top:16,right:16}}),v=window.Hls;function g(e){var t=h(),a=Object(i.useState)(0),r=Object(n.a)(a,2),c=r[0],d=r[1],u=Object(i.useState)(""),g=Object(n.a)(u,2),x=g[0],y=g[1],E=Object(i.useRef)(null);function k(){document.querySelector("meta[name=viewport]").setAttribute("content","viewport-fit=cover, width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes")}function w(t){document.querySelector("meta[name=viewport]").setAttribute("content","viewport-fit=cover, width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"),e.close()}return Object(i.useEffect)((function(){k()}),[]),Object(i.useEffect)((function(){e.directive(e.camera.endpointId,"CameraStreamController","InitializeCameraStreams",{cameraStreams:[{protocol:"HLS",resolution:{width:640,height:480},authorizationType:"BASIC",videoCodec:"H264",audioCodec:"AAC"}]}).then((function(e){return y(e.payload.cameraStreams[0].uri)}))}),[e.camera]),Object(i.useEffect)((function(){if(console.log("uri update",x),k(),e.live&&window.Hls.isSupported()){var t=new v;t.loadSource(x),t.attachMedia(E.current),t.on(v.Events.MANIFEST_PARSED,(function(){E.current.play()}))}}),[x,e.live]),o.a.createElement(l.a,{fullScreen:!0,open:e.show,onClose:function(){return w()},className:t.bigcamDialog,PaperProps:{classes:{root:t.paper}}},!e.live&&o.a.createElement(f.a,{size:"medium","aria-label":"Rate",className:t.ratebutton,onClick:function(){return e.changeInterval()}},o.a.createElement(m.a,null),e.refreshInterval/1e3),o.a.createElement(f.a,{size:"medium",color:"primary","aria-label":"Close",className:t.closebutton,onClick:function(){return w()}},o.a.createElement(p.a,null)),o.a.createElement(f.a,{size:"medium","aria-label":"Rotate",className:t.rotatebutton,onClick:function(){return d(90!==c?90:0),void console.log("set rotate to ",c)}},o.a.createElement(s.a,null)),o.a.createElement(b.a,{className:t.bigcamPaper},e.live?o.a.createElement("video",{controls:!0,muted:!0,autoPlay:!0,playsInline:!0,id:"video",className:c>0?t.bigcamRotated:t.bigcam,style:{transform:"rotate(".concat(c,"deg)")},ref:E},o.a.createElement("source",{src:x,type:"application/x-mpegURL"})):o.a.createElement("img",{alt:e.camera.friendlyName,className:c>0?t.bigcamRotated:t.bigcam,style:{transform:"rotate(".concat(c,"deg)")},src:e.src})))}},331:function(e,t,a){"use strict";var n=a(39);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n(a(0)),o=(0,n(a(51)).default)(i.default.createElement("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close");t.default=o},387:function(e,t,a){"use strict";var n=a(1),i=a(2),o=a(0),r=a.n(o),l=(a(5),a(290)),c=a(91),s=a(40),d=a(58),p=a(9),u={entering:{opacity:1},entered:{opacity:1}},m={enter:c.b.enteringScreen,exit:c.b.leavingScreen},b=r.a.forwardRef((function(e,t){var a=e.children,o=e.in,c=e.onEnter,b=e.onExit,f=e.style,h=e.timeout,v=void 0===h?m:h,g=Object(i.a)(e,["children","in","onEnter","onExit","style","timeout"]),x=Object(s.a)(),y=Object(p.a)(a.ref,t);return r.a.createElement(l.a,Object(n.a)({appear:!0,in:o,onEnter:function(e,t){Object(d.b)(e);var a=Object(d.a)({style:f,timeout:v},{mode:"enter"});e.style.webkitTransition=x.transitions.create("opacity",a),e.style.transition=x.transitions.create("opacity",a),c&&c(e,t)},onExit:function(e){var t=Object(d.a)({style:f,timeout:v},{mode:"exit"});e.style.webkitTransition=x.transitions.create("opacity",t),e.style.transition=x.transitions.create("opacity",t),b&&b(e)},timeout:v},g),(function(e,t){return r.a.cloneElement(a,Object(n.a)({style:Object(n.a)({opacity:0,visibility:"exited"!==e||o?void 0:"hidden"},u[e],{},f,{},a.props.style),ref:y},t))}))}));t.a=b},395:function(e,t,a){"use strict";var n=a(39);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n(a(0)),o=(0,n(a(51)).default)(i.default.createElement("path",{d:"M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"}),"Timer");t.default=o},396:function(e,t,a){"use strict";var n=a(39);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n(a(0)),o=(0,n(a(51)).default)(i.default.createElement("path",{d:"M16.48 2.52c3.27 1.55 5.61 4.72 5.97 8.48h1.5C23.44 4.84 18.29 0 12 0l-.66.03 3.81 3.81 1.33-1.32zm-6.25-.77c-.59-.59-1.54-.59-2.12 0L1.75 8.11c-.59.59-.59 1.54 0 2.12l12.02 12.02c.59.59 1.54.59 2.12 0l6.36-6.36c.59-.59.59-1.54 0-2.12L10.23 1.75zm4.6 19.44L2.81 9.17l6.36-6.36 12.02 12.02-6.36 6.36zm-7.31.29C4.25 19.94 1.91 16.76 1.55 13H.05C.56 19.16 5.71 24 12 24l.66-.03-3.81-3.81-1.33 1.32z"}),"ScreenRotation");t.default=o},401:function(e,t,a){"use strict";var n=a(1),i=a(2),o=a(24),r=a(0),l=a.n(r),c=(a(5),a(3)),s=a(4),d=a(7),p=a(324),u=a(387),m=l.a.forwardRef((function(e,t){var a=e.children,o=e.classes,r=e.className,s=e.invisible,d=void 0!==s&&s,p=e.open,m=e.transitionDuration,b=Object(i.a)(e,["children","classes","className","invisible","open","transitionDuration"]);return l.a.createElement(u.a,Object(n.a)({in:p,timeout:m},b),l.a.createElement("div",{className:Object(c.a)(o.root,r,d&&o.invisible),"aria-hidden":!0,ref:t},a))})),b=Object(s.a)({root:{zIndex:-1,position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent",touchAction:"none"},invisible:{backgroundColor:"transparent"}},{name:"MuiBackdrop"})(m),f=a(91),h=a(283),v={enter:f.b.enteringScreen,exit:f.b.leavingScreen},g=l.a.forwardRef((function(e,t){var a=e.BackdropProps,o=e.children,r=e.classes,s=e.className,m=e.disableBackdropClick,f=void 0!==m&&m,g=e.disableEscapeKeyDown,x=void 0!==g&&g,y=e.fullScreen,E=void 0!==y&&y,k=e.fullWidth,w=void 0!==k&&k,j=e.maxWidth,O=void 0===j?"sm":j,C=e.onBackdropClick,S=e.onClose,W=e.onEnter,P=e.onEntered,B=e.onEntering,z=e.onEscapeKeyDown,N=e.onExit,D=e.onExited,R=e.onExiting,M=e.open,T=e.PaperComponent,A=void 0===T?h.a:T,I=e.PaperProps,H=void 0===I?{}:I,L=e.scroll,_=void 0===L?"paper":L,F=e.TransitionComponent,K=void 0===F?u.a:F,$=e.transitionDuration,X=void 0===$?v:$,Y=e.TransitionProps,q=e["aria-describedby"],J=e["aria-labelledby"],V=Object(i.a)(e,["BackdropProps","children","classes","className","disableBackdropClick","disableEscapeKeyDown","fullScreen","fullWidth","maxWidth","onBackdropClick","onClose","onEnter","onEntered","onEntering","onEscapeKeyDown","onExit","onExited","onExiting","open","PaperComponent","PaperProps","scroll","TransitionComponent","transitionDuration","TransitionProps","aria-describedby","aria-labelledby"]),U=l.a.useRef();return l.a.createElement(p.a,Object(n.a)({className:Object(c.a)(r.root,s),BackdropComponent:b,BackdropProps:Object(n.a)({transitionDuration:X},a),closeAfterTransition:!0,disableBackdropClick:f,disableEscapeKeyDown:x,onEscapeKeyDown:z,onClose:S,open:M,ref:t},V),l.a.createElement(K,Object(n.a)({appear:!0,in:M,timeout:X,onEnter:W,onEntering:B,onEntered:P,onExit:N,onExiting:R,onExited:D,role:"none presentation"},Y),l.a.createElement("div",{className:Object(c.a)(r.container,r["scroll".concat(Object(d.a)(_))]),onClick:function(e){e.target===e.currentTarget&&e.target===U.current&&(U.current=null,C&&C(e),!f&&S&&S(e,"backdropClick"))},onMouseDown:function(e){U.current=e.target}},l.a.createElement(A,Object(n.a)({elevation:24,role:"dialog","aria-describedby":q,"aria-labelledby":J},H,{className:Object(c.a)(r.paper,r["paperScroll".concat(Object(d.a)(_))],r["paperWidth".concat(Object(d.a)(String(O)))],H.className,E&&r.paperFullScreen,w&&r.paperFullWidth)}),o))))}));t.a=Object(s.a)((function(e){return{root:{"@media print":{position:"absolute !important"}},scrollPaper:{display:"flex",justifyContent:"center",alignItems:"center"},scrollBody:{overflowY:"auto",overflowX:"hidden",textAlign:"center","&:after":{content:'""',display:"inline-block",verticalAlign:"middle",height:"100%",width:"0"}},container:{height:"100%","@media print":{height:"auto"},outline:0},paper:{margin:32,position:"relative",overflowY:"auto","@media print":{overflowY:"visible",boxShadow:"none"}},paperScrollPaper:{display:"flex",flexDirection:"column",maxHeight:"calc(100% - 64px)"},paperScrollBody:{display:"inline-block",verticalAlign:"middle",textAlign:"left"},paperWidthFalse:{maxWidth:"calc(100% - 64px)"},paperWidthXs:{maxWidth:Math.max(e.breakpoints.values.xs,444),"&$paperScrollBody":Object(o.a)({},e.breakpoints.down(Math.max(e.breakpoints.values.xs,444)+64),{maxWidth:"calc(100% - 64px)"})},paperWidthSm:{maxWidth:e.breakpoints.values.sm,"&$paperScrollBody":Object(o.a)({},e.breakpoints.down(e.breakpoints.values.sm+64),{maxWidth:"calc(100% - 64px)"})},paperWidthMd:{maxWidth:e.breakpoints.values.md,"&$paperScrollBody":Object(o.a)({},e.breakpoints.down(e.breakpoints.values.md+64),{maxWidth:"calc(100% - 64px)"})},paperWidthLg:{maxWidth:e.breakpoints.values.lg,"&$paperScrollBody":Object(o.a)({},e.breakpoints.down(e.breakpoints.values.lg+64),{maxWidth:"calc(100% - 64px)"})},paperWidthXl:{maxWidth:e.breakpoints.values.xl,"&$paperScrollBody":Object(o.a)({},e.breakpoints.down(e.breakpoints.values.xl+64),{maxWidth:"calc(100% - 64px)"})},paperFullWidth:{width:"calc(100% - 64px)"},paperFullScreen:{margin:0,width:"100%",maxWidth:"100%",height:"100%",maxHeight:"none",borderRadius:0,"&$paperScrollBody":{margin:0,maxWidth:"100%"}}}}),{name:"MuiDialog"})(g)}}]);
//# sourceMappingURL=84.3be42307.chunk.js.map