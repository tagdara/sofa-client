(this["webpackJsonpsofa-client"]=this["webpackJsonpsofa-client"]||[]).push([[203],{192:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return v}));var n=a(0),o=a.n(n),i=a(32),r=a(436),l=a(367),c=a(60),s=a(366),m=a.n(s),p=a(426),d=a.n(p),u=a(454),g=a.n(u),b=a(455),x=a.n(b),f=a(40),h=a(316),E=a(927),k=Object(i.a)({bigDialog:{backgroundColor:"#000",paddingTop:"env(safe-area-inset-top)",paddingBottom:"env(safe-area-inset-bottom)",minWidth:"320px",boxSizing:"border-box"},root:{backgroundColor:"#000"},paper:{backgroundColor:"#000",boxShadow:"none",overflow:"hidden"},coverArt:{width:"100%",maxWidth:"100%",background:"#000",opacity:"1.0",margin:"auto auto",borderRadius:4},titleText:{padding:"0 24 0 24",color:"#ccc"},artistText:{padding:"0 24 0 24",color:"#999"},maingrid:{padding:24,height:"100%",display:"flex",alignItems:"center"},nopad:{display:"flex",margin:0,boxSizing:"border-box",padding:0,flexWrap:"wrap",alignItems:"center",flexGrow:1,minWidth:"320px",flexBasis:0,position:"relative"},textbox:{justifyContent:"center",display:"flex",flexDirection:"column"},closebutton:{position:"fixed",top:8,right:8},pausebutton:{position:"fixed",bottom:8,right:8},skipbutton:{position:"fixed",bottom:8,right:72}});function v(e){var t="https://"+window.location.hostname,a=k(),n=window.innerWidth<=800;return console.log("src",e.src),o.a.createElement(r.a,{fullScreen:!0,open:e.open,onClose:function(){return e.close()},className:a.bigDialog,PaperProps:{classes:{root:a.paper}}},o.a.createElement(f.a,{container:!0,spacing:8,className:a.maingrid},o.a.createElement(f.a,{item:!0,xs:n?12:6},o.a.createElement(E.a,{direction:"right",in:!0,mountOnEnter:!0,unmountOnExit:!0},o.a.createElement(h.a,{elevation:1,className:a.nopad},o.a.createElement("img",{onError:function(t){t.target.src="/image/"+e.player.endpointId.split(":")[0]+"/darklogo"},className:a.coverArt,src:t+e.src,alt:e.title})))),o.a.createElement(f.a,{item:!0,xs:n?12:6,className:a.textbox},o.a.createElement(c.a,{className:a.titleText,variant:"h1"},e.title),o.a.createElement(c.a,{className:a.artistText,variant:"h2"},e.artist))),o.a.createElement(l.a,{className:a.skipbutton,onClick:function(t){return e.handlePlayPause(t)},color:"primary"},"PLAYING"===e.playbackState?o.a.createElement(g.a,null):o.a.createElement(d.a,null)),o.a.createElement(l.a,{className:a.pausebutton,onClick:function(t){return e.handleSkip(t)},color:"primary"},o.a.createElement(x.a,null)),o.a.createElement(l.a,{className:a.closebutton,onClick:function(){return e.close()},"aria-label":"Close",color:"primary",autoFocus:!0},o.a.createElement(m.a,null)))}}}]);
//# sourceMappingURL=203.a7d85aa7.chunk.js.map