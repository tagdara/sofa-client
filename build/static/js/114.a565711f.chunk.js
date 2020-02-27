(this["webpackJsonpsofa-client"]=this["webpackJsonpsofa-client"]||[]).push([[114],{155:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return v}));var n=a(6),o=a(0),r=a.n(o),i=a(29),c=a(399),l=a(393),u=a.n(l),s=a(329),m=a.n(s),d=a(392),p=a.n(d),b=a(282),f=a(82),g=Object(i.a)({bigcamDialog:{backgroundColor:"#222",paddingTop:"env(safe-area-inset-top)",paddingBottom:"env(safe-area-inset-bottom)",minWidth:"320px",boxSizing:"border-box"},root:{backgroundColor:"#111"},paper:{backgroundColor:"#111",boxShadow:"none",overflow:"hidden"},bigcamPaper:{margin:"auto 4px",maxHeight:"100%",display:"flex"},bigcam:{width:"100%",height:"auto !important",maxWidth:"100%",maxHeight:"100%",background:"#222",opacity:"1.0",margin:"auto auto",padding:0,borderRadius:4},bigcamRotated:{position:"absolute",top:0,left:0,height:"100vw",maxWidth:"initial",padding:0,margin:"auto auto",marginTop:"calc((100vh - 100vw) / 2.5)",marginLeft:"calc((100vw * -1) /2.5) !important",borderRadius:4},rotatebutton:{zIndex:2e3,position:"absolute",top:16,right:72},ratebutton:{zIndex:2e3,position:"absolute",top:16,right:190},closebutton:{zIndex:2e3,position:"absolute",top:16,right:16}}),h=window.Hls;function v(e){var t=g(),a=Object(o.useState)(0),i=Object(n.a)(a,2),l=i[0],s=i[1],d=Object(o.useState)(""),v=Object(n.a)(d,2),C=v[0],E=v[1],w=Object(o.useRef)(null);function y(){document.querySelector("meta[name=viewport]").setAttribute("content","viewport-fit=cover, width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes")}function S(t){document.querySelector("meta[name=viewport]").setAttribute("content","viewport-fit=cover, width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"),e.close()}return Object(o.useEffect)((function(){y()}),[]),Object(o.useEffect)((function(){e.camera.CameraStreamController.directive("InitializeCameraStreams",{cameraStreams:[{protocol:"HLS",resolution:{width:640,height:480},authorizationType:"BASIC",videoCodec:"H264",audioCodec:"AAC"}]}).then((function(e){return E(e.payload.cameraStreams[0].uri)}))}),[e.camera]),Object(o.useEffect)((function(){if(console.log("uri update",C),y(),e.live&&window.Hls.isSupported()){var t=new h;t.loadSource(C),t.attachMedia(w.current),t.on(h.Events.MANIFEST_PARSED,(function(){w.current.play()}))}}),[C,e.live]),r.a.createElement(c.a,{fullScreen:!0,open:e.show,onClose:function(){return S()},className:t.bigcamDialog,PaperProps:{classes:{root:t.paper}}},!e.live&&r.a.createElement(f.a,{size:"medium","aria-label":"Rate",className:t.ratebutton,onClick:function(){return e.changeInterval()}},r.a.createElement(p.a,null),e.refreshInterval/1e3),r.a.createElement(f.a,{size:"medium",color:"primary","aria-label":"Close",className:t.closebutton,onClick:function(){return S()}},r.a.createElement(m.a,null)),r.a.createElement(f.a,{size:"medium","aria-label":"Rotate",className:t.rotatebutton,onClick:function(){return s(90!==l?90:0),void console.log("set rotate to ",l)}},r.a.createElement(u.a,null)),r.a.createElement(b.a,{className:t.bigcamPaper},e.live?r.a.createElement("video",{controls:!0,muted:!0,autoPlay:!0,playsInline:!0,id:"video",className:l>0?t.bigcamRotated:t.bigcam,style:{transform:"rotate(".concat(l,"deg)")},ref:w},r.a.createElement("source",{src:C,type:"application/x-mpegURL"})):r.a.createElement("img",{alt:e.camera.friendlyName,className:l>0?t.bigcamRotated:t.bigcam,style:{transform:"rotate(".concat(l,"deg)")},src:e.src})))}},164:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return C}));var n=a(6),o=a(0),r=a.n(o),i=a(16),c=a(29),l=a(359),u=a(332),s=a(368),m=a.n(s),d=a(369),p=a.n(d),b=a(346),f=a.n(b),g=a(155),h=a(24),v=Object(c.a)({nextbutton:{position:"absolute",top:"40%",right:8},prevbutton:{position:"absolute",top:"40%",left:8},gridbutton:{position:"absolute",left:8,bottom:8},newgridbutton:{position:"absolute",right:8,bottom:8},im:{width:"100%",height:"auto",borderRadius:4,display:"flex"},hiddenimage:{height:0,display:"none"},hidden:{borderRadius:4,position:"relative",width:"100%",paddingTop:"56.25%"},spinner:{position:"absolute",margin:"auto",top:0,left:0,right:0,bottom:0}});function C(e){var t=v(),a=Object(o.useContext)(i.LayoutContext),c=a.isMobile,s=a.applyLayoutCard,d=[1e3,500,5e3,3e3],b=Object(o.useState)(!1),C=Object(n.a)(b,2),E=C[0],w=C[1],y=Object(o.useState)(!1),S=Object(n.a)(y,2),j=S[0],O=S[1],x=Object(o.useState)(3e3),N=Object(n.a)(x,2),I=N[0],k=N[1],R=Object(o.useState)(""),z=Object(n.a)(R,2),A=z[0],H=z[1],L=Object(o.useState)(""),D=Object(n.a)(L,2),P=D[0],T=D[1];return function(e,t){var a=Object(o.useRef)();Object(o.useEffect)((function(){a.current=e}),[e]),Object(o.useEffect)((function(){if(null!==t){var e=setInterval((function(){a.current()}),t);return function(){return clearInterval(e)}}}),[t])}((function(){A&&T(A+"?time="+Date.now())}),I),Object(o.useEffect)((function(){e.camera.CameraStreamController.directive("InitializeCameraStreams",{cameraStreams:[{protocol:"HLS",resolution:{width:640,height:480},authorizationType:"BASIC",videoCodec:"H264",audioCodec:"AAC"}]}).then((function(e){return T((t=e).payload.imageUri+"?time="+Date.now()),void H(t.payload.imageUri);var t}))}),[e.camera]),r.a.createElement(h.default,{wide:e.wide,nopad:!0,thinmargin:c},A&&r.a.createElement("img",{className:E?t.im:t.hiddenimage,src:P,onLoad:function(){E||w(!0)},onClick:function(){O(!0)},alt:e.camera.friendlyName+" Security Camera"}),E?r.a.createElement(r.a.Fragment,null,e.prevCamera&&r.a.createElement(u.a,{color:"primary",className:t.prevbutton,onClick:function(){return e.prevCamera()}},r.a.createElement(m.a,null)),e.nextCamera&&r.a.createElement(u.a,{color:"primary",className:t.nextbutton,onClick:function(){return e.nextCamera()}},r.a.createElement(p.a,null)),e.selectButtons&&r.a.createElement(u.a,{color:"primary",className:t.newgridbutton,onClick:function(){return s("CameraLayout")}},r.a.createElement(f.a,null))):r.a.createElement("div",{className:t.hidden},r.a.createElement(l.a,{className:t.spinner,size:50})),j&&r.a.createElement(g.default,{live:!0,camera:e.camera,name:e.name,refreshInterval:I,changeInterval:function(){k(d.shift()),d.push(I)},show:j,close:function(){O(!1)},src:A}))}},227:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return p}));var n=a(0),o=a.n(n),r=a(54),i=a(164),c=a(428),l=a.n(c),u=a(107),s=a(23),m=a(344),d=a(53);function p(e){var t=(0,Object(n.useContext)(r.DataContext).devicesByCategory)(["CAMERA"]);return o.a.createElement(o.a.Fragment,null,t.map((function(e){return o.a.createElement(i.default,{camera:e,key:e.endpointId,name:e.friendlyName})})),o.a.createElement(u.a,null,o.a.createElement(s.a,{button:!0,onClick:function(){window.open("https://unifi-video.dayton.tech:7443","_nvr")}},o.a.createElement(m.a,null,o.a.createElement(l.a,null)),o.a.createElement(d.a,{primary:"Unifi NVR"}))))}}}]);
//# sourceMappingURL=114.a565711f.chunk.js.map