(this["webpackJsonpsofa-client"]=this["webpackJsonpsofa-client"]||[]).push([[160],{171:function(e,t,i){"use strict";i.r(t),i.d(t,"default",(function(){return m}));var n=i(6),o=i(0),a=i.n(o),r=i(38),s=i(50),l=i(387),c=i(37),d=Object(r.a)((function(e){return{bigcover:{width:"100%",maxHeight:480,position:"relative",padding:0,height:"auto",minHeight:100},songTextBox:{position:"absolute",padding:16,top:0,bottom:64,display:"flex",flexDirection:"column",overflow:"hidden"},songImageHolder:{position:"relative",padding:"16px 0 0 16px",margin:0},songTextHolder:{paddingLeft:16,paddingTop:16,boxSizing:"border-box",display:"flex",justifyContent:"center",flexDirection:"column",position:"relative",height:"60%"},songButtonHolder:{paddingLeft:16,display:"flex",justifyContent:"flex-end",flexDirection:"column",position:"relative",height:"40%"},songTitle:{fontSize:"3rem",paddingBottom:16,flexBasis:0,flexGrow:2,display:"flex",overflow:"hidden"},songArtist:{fontSize:"2.2rem",fontWeight:200,flexBasis:0,flexGrow:1,display:"flex",overflow:"hidden"},imgItem:{padding:0,width:"100%",minWidth:"100%"},songText:{width:"100%"},topbox:{paddingBottom:8,borderBottom:"0px solid",borderBottomColor:e.palette.divider}}}));function m(e){var t=d(),i=Object(o.useState)(!1),r=Object(n.a)(i,2),m=r[0],p=r[1],f="https://"+window.location.hostname;return a.a.createElement(c.a,{container:!0,className:t.topbox},a.a.createElement(c.a,{item:!0,xs:4,className:t.songImageHolder},a.a.createElement(l.a,{in:m},a.a.createElement("img",{className:t.bigcover,src:f+e.art+"?title="+e.title,title:e.title,alt:e.title,onClick:function(t){return e.cover(t)},onLoad:function(){return p(!0)}}))),a.a.createElement(c.a,{item:!0,container:!0,xs:8},a.a.createElement(c.a,{item:!0,xs:12,className:t.songTextHolder},a.a.createElement(s.a,{variant:"subtitle1",className:t.songText},e.title),a.a.createElement(s.a,{variant:"subtitle2",className:t.songText},e.artist)),a.a.createElement(c.a,{item:!0,xs:12,className:t.songButtonHolder},e.children)))}},387:function(e,t,i){"use strict";var n=i(1),o=i(2),a=i(0),r=i.n(a),s=(i(5),i(292)),l=i(91),c=i(41),d=i(58),m=i(9),p={entering:{opacity:1},entered:{opacity:1}},f={enter:l.b.enteringScreen,exit:l.b.leavingScreen},u=r.a.forwardRef((function(e,t){var i=e.children,a=e.in,l=e.onEnter,u=e.onExit,g=e.style,x=e.timeout,b=void 0===x?f:x,h=Object(o.a)(e,["children","in","onEnter","onExit","style","timeout"]),y=Object(c.a)(),v=Object(m.a)(i.ref,t);return r.a.createElement(s.a,Object(n.a)({appear:!0,in:a,onEnter:function(e,t){Object(d.b)(e);var i=Object(d.a)({style:g,timeout:b},{mode:"enter"});e.style.webkitTransition=y.transitions.create("opacity",i),e.style.transition=y.transitions.create("opacity",i),l&&l(e,t)},onExit:function(e){var t=Object(d.a)({style:g,timeout:b},{mode:"exit"});e.style.webkitTransition=y.transitions.create("opacity",t),e.style.transition=y.transitions.create("opacity",t),u&&u(e)},timeout:b},h),(function(e,t){return r.a.cloneElement(i,Object(n.a)({style:Object(n.a)({opacity:0,visibility:"exited"!==e||a?void 0:"hidden"},p[e],{},g,{},i.props.style),ref:v},t))}))}));t.a=u}}]);
//# sourceMappingURL=160.4c2e6f4c.chunk.js.map