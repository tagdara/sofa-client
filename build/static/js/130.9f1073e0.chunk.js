(this["webpackJsonpsofa-client"]=this["webpackJsonpsofa-client"]||[]).push([[130,180],{216:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return s}));var i=n(0),a=n.n(i),o=n(29),r=n(282),c=Object(o.a)((function(e){return{coverDimmer:{position:"absolute",top:0,left:0,right:0,bottom:0,backgroundColor:e.palette.background.default,opacity:"0.8",borderRadius:"4px 4px 0px 0px"}}}));function s(e){var t=c();return a.a.createElement(r.a,Object.assign({elevation:0,className:t.coverDimmer},e))}},261:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return m}));var i=n(6),a=n(0),o=n.n(a),r=n(29),c=n(47),s=n(23),l=n(216),u=n(384),d=Object(r.a)((function(e){return{bigcover:{width:"100%",maxHeight:480,position:"relative",padding:0,borderRadius:"4px 4px 0px 0px"},songTextBox:{position:"absolute",padding:16,top:0,bottom:64,display:"flex",flexDirection:"column",overflow:"hidden"},songTextHolder:{margin:"0 auto"},songTitle:{fontSize:"3rem",paddingBottom:16,flexBasis:0,flexGrow:2,display:"flex",overflow:"hidden"},songArtist:{fontSize:"2.2rem",fontWeight:200,flexBasis:0,flexGrow:1,display:"flex",overflow:"hidden"},imgItem:{padding:0,width:"100%"}}}));function m(e){var t=d(),n=Object(a.useState)(!0),r=Object(i.a)(n,2),m=r[0],f=r[1],p=Object(a.useState)(!1),b=Object(i.a)(p,2),x=b[0],g=b[1],v="https://"+window.location.hostname;function y(){f(!m)}return o.a.createElement(s.a,{className:t.imgItem,onClick:function(){return y()}},o.a.createElement(u.a,{in:x},o.a.createElement("img",{className:t.bigcover,src:v+e.art+"?time="+Date.now(),title:e.title,alt:e.title,onClick:function(){return y()},onLoad:function(){return g(!0)}})),m&&o.a.createElement(o.a.Fragment,null,o.a.createElement(l.default,{onClick:function(){return y()}}),o.a.createElement("div",{className:t.songTextBox},o.a.createElement("div",{className:t.songTextHolder},o.a.createElement(c.a,{className:t.songTitle,variant:"h3"},e.title),o.a.createElement(c.a,{className:t.songArtist,variant:"h4"},e.artist)))),e.children)}},384:function(e,t,n){"use strict";var i=n(1),a=n(2),o=n(0),r=n.n(o),c=(n(5),n(288)),s=n(88),l=n(38),u=n(56),d=n(9),m={entering:{opacity:1},entered:{opacity:1}},f={enter:s.b.enteringScreen,exit:s.b.leavingScreen},p=r.a.forwardRef((function(e,t){var n=e.children,o=e.in,s=e.onEnter,p=e.onExit,b=e.style,x=e.timeout,g=void 0===x?f:x,v=Object(a.a)(e,["children","in","onEnter","onExit","style","timeout"]),y=Object(l.a)(),h=Object(d.a)(n.ref,t);return r.a.createElement(c.a,Object(i.a)({appear:!0,in:o,onEnter:function(e,t){Object(u.b)(e);var n=Object(u.a)({style:b,timeout:g},{mode:"enter"});e.style.webkitTransition=y.transitions.create("opacity",n),e.style.transition=y.transitions.create("opacity",n),s&&s(e,t)},onExit:function(e){var t=Object(u.a)({style:b,timeout:g},{mode:"exit"});e.style.webkitTransition=y.transitions.create("opacity",t),e.style.transition=y.transitions.create("opacity",t),p&&p(e)},timeout:g},v),(function(e,t){return r.a.cloneElement(n,Object(i.a)({style:Object(i.a)({opacity:0,visibility:"exited"!==e||o?void 0:"hidden"},m[e],{},b,{},n.props.style),ref:h},t))}))}));t.a=p}}]);
//# sourceMappingURL=130.9f1073e0.chunk.js.map