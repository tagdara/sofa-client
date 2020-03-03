(this["webpackJsonpsofa-client"]=this["webpackJsonpsofa-client"]||[]).push([[94,148,166],{114:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return s}));var n=a(6),l=a(0),r=a.n(l),o=a(38),i=a(50),c=a(752),u=Object(o.a)({half:{alignItems:"center",display:"flex",height:42,flexGrow:1,flexBasis:0,boxSizing:"border-box"},stack:{height:"auto",display:"flex",flexGrow:1,justifyContent:"space-between",flexWrap:"wrap",width:"100%",boxSizing:"border-box",marginRight:8,overflowX:"hidden",overflowY:"hidden",alignItems:"center",paddingRight:8},padLeft:{paddingLeft:16},slider:{margin:"-18px"}});function s(e){var t=u(),a=Object(l.useState)(0),o=Object(n.a)(a,2),s=o[0],d=o[1];return Object(l.useEffect)((function(){e.value&&d(e.value)}),[e.value]),r.a.createElement("div",{style:{minWidth:e.minWidth},className:e.padLeft?t.stack+" "+t.padLeft:e.half?t.half:t.stack},e.name?r.a.createElement(i.a,{variant:e.smallText?"caption":"subtitle1",className:t.stackLabel},e.name):null,e.unit?r.a.createElement(i.a,{variant:"caption",className:t.stackLabel},Array.isArray(s)?Math.floor(s[0])+" - "+Math.floor(s[1])+e.unit:Math.floor(s)+e.unit):null,r.a.createElement(c.a,{value:s,step:e.step,min:e.min,max:e.max,onChange:function(t,a){d(a),e.preChange&&e.preChange(a)},onChangeCommitted:function(t,a){e.change(a)},disabled:e.disabled}))}s.defaultProps={name:"",unit:"",min:0,max:100,step:1,default:0,value:0,tabs:"",disabled:!1,padLeft:!1,half:!1,minWidth:240,smallText:!1}},136:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return m}));var n=a(6),l=a(0),r=a.n(l),o=a(38),i=a(25),c=a(55),u=a(114),s=a(56),d=Object(o.a)({label:{display:"flex",flexGrow:1,flexBasis:0,minWidth:"35%"},line:{display:"flex",width:"100%",maxWidth:"100%",flexGrow:1,flexBasis:0,minHeight:48}});function m(e){var t=d(),a=Object(l.useState)(0),o=Object(n.a)(a,2),m=o[0],v=o[1];return Object(l.useEffect)((function(){v(e.value)}),[e.value]),r.a.createElement(i.a,{className:t.line},!e.reverse&&r.a.createElement(s.default,{small:e.small,onClick:e.avatarClick,noback:e.noAvatarBack,avatarState:e.avatarState},m),e.label&&r.a.createElement(c.a,{primary:e.label,className:t.label}),r.a.createElement(u.default,Object.assign({},e,{preChange:function(t){v(t),e.hasOwnProperty("preChange")&&e.preChange(t)}})),e.reverse&&r.a.createElement(s.default,{reverse:e.reverse,small:e.small,onClick:e.avatarClick,noback:e.noAvatarBack,avatarState:e.avatarState},m))}m.defaultProps={avatarClick:void 0,noAvatarBack:!1,avatarState:"on",reverse:!0,small:!1}},169:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return m}));var n=a(0),l=a.n(n),r=a(40),o=a(38),i=a(25),c=a(55),u=a(357),s=a(327),d=Object(o.a)((function(e){return{titleBar:{width:"100%",color:e.palette.primary.contrastText,backgroundColor:e.palette.primary.main},select:{minWidth:"50%"}}}));function m(e){var t=d(),a=Object(n.useContext)(r.DeviceContext),o=(0,a.getModes)((0,a.deviceByEndpointId)(e.device.endpointId),e.exclude);return Object.keys(o).map((function(a){return l.a.createElement(i.a,{key:a},l.a.createElement(c.a,{primary:a,key:a}),l.a.createElement(s.a,{disabled:e.disabled,className:t.select,displayEmpty:!0,value:e.device[a].mode.value?e.device[a].mode.value:"",onChange:function(t){return function(t,a,n){e.directive(e.device.endpointId,a,"SetMode",{mode:n})}(0,a,t.target.value)}},Object.keys(o[a]).map((function(e){return l.a.createElement(u.a,{key:o[a][e],value:e},o[a][e])}))))}))}m.defaultProps={exclude:[],disabled:!1}},188:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return x}));var n=a(0),l=a.n(n),r=a(38),o=a(289),i=a(369),c=a.n(i),u=a(370),s=a.n(u),d=a(341),m=a.n(d),v=a(342),f=a.n(v),p=a(420),E=a.n(p),C=a(97),g=a.n(C),b=a(98),h=a.n(b),k=a(734),w=a(735),N=Object(r.a)((function(e){return{gridList:{maxWidth:320,margin:"0 auto !important",backgroundColor:e.palette.background.default},gridButtonTile:{width:"100%",display:"flex",alignItems:"center",justifyContent:"center"},remoteButton:{width:"100%",flexGrow:1,height:"100%"}}}));function x(e){var t=N();function a(t){console.log("sending button",t),e.device.RemoteController.directive("PressRemoteButton",{buttonName:t})}return l.a.createElement(k.a,{cellHeight:80,className:t.gridList,cols:3},l.a.createElement(w.a,{cols:1}),l.a.createElement(w.a,{cols:1,className:t.gridButtonTile},l.a.createElement(o.a,{className:t.remoteButton,onClick:function(e){return a("CursorUp")}},l.a.createElement(m.a,null))),l.a.createElement(w.a,{cols:1,className:t.gridButtonTile}),l.a.createElement(w.a,{cols:1,className:t.gridButtonTile},l.a.createElement(o.a,{className:t.remoteButton,onClick:function(e){return a("CursorLeft")}},l.a.createElement(c.a,null))),l.a.createElement(w.a,{cols:1,className:t.gridButtonTile},l.a.createElement(o.a,{className:t.remoteButton,onClick:function(e){return a("DpadCenter")}},l.a.createElement(E.a,null))),l.a.createElement(w.a,{cols:1,className:t.gridButtonTile},l.a.createElement(o.a,{className:t.remoteButton,onClick:function(e){return a("CursorRight")}},l.a.createElement(s.a,null))),l.a.createElement(w.a,{cols:1,className:t.gridButtonTile}),l.a.createElement(w.a,{cols:1,className:t.gridButtonTile},l.a.createElement(o.a,{className:t.remoteButton,onClick:function(e){return a("CursorDown")}},l.a.createElement(f.a,null))),l.a.createElement(w.a,{cols:1,className:t.gridButtonTile}),l.a.createElement(w.a,{cols:1,className:t.gridButtonTile},l.a.createElement(o.a,{className:t.remoteButton,onClick:function(e){return a("Exit")}},l.a.createElement(h.a,null))),l.a.createElement(w.a,{cols:1,className:t.gridButtonTile}),l.a.createElement(w.a,{cols:1,className:t.gridButtonTile},l.a.createElement(o.a,{className:t.remoteButton,onClick:function(e){return a("Home")}},l.a.createElement(g.a,null))))}},216:function(e,t,a){"use strict";a.r(t),a.d(t,"Television",(function(){return O}));var n=a(6),l=a(0),r=a.n(l),o=a(38),i=a(40),c=a(25),u=a(347),s=a(55),d=a(338),m=a(335),v=a(361),f=a(339),p=a.n(f),E=a(530),C=a.n(E),g=a(136),b=a(26),h=a(188),k=a(22),w=a(169),N=a(357),x=a(327),y=Object(o.a)({list:{width:"100%"},bottomListItem:{flexWrap:"wrap",justifyContent:"flex-end"},select:{minWidth:"50%"},minLI:{minHeight:48,display:"flex",alignItems:"center"}});function O(e){var t=y(),a=Object(l.useState)(!1),o=Object(n.a)(a,2),f=o[0],E=o[1],O=Object(l.useState)(!1),S=Object(n.a)(O,2),B=S[0],I=S[1],j=Object(l.useContext)(i.DeviceContext),T=j.deviceByEndpointId,P=j.directive,L=(0,j.getInputs)(T(e.device.endpointId));function W(){return!!e.device.hasOwnProperty("SpeakerController")&&(!e.device.hasOwnProperty("Audio")||"Audio.audioSystem"===e.device.Audio.mode.value)}function A(){return B||"OFF"===e.device.PowerController.powerState.value?null:"OFF"!==e.device.PowerController.powerState.value&&W()?e.device.SpeakerController.volume.value+"% / "+e.device.InputController.input.value:e.device.InputController.input.value}return r.a.createElement(b.default,{wide:e.wide},r.a.createElement(c.a,{className:t.listItem},r.a.createElement(u.a,{onClick:function(){return I(!B)}},r.a.createElement(p.a,null)),r.a.createElement(k.default,null,r.a.createElement(s.a,{className:A()?t.normal:t.minLI,onClick:function(){return I(!B)},primary:e.device.friendlyName,secondary:A()})),r.a.createElement(d.a,null,"ON"!==e.device.PowerController.powerState.value?null:r.a.createElement(m.a,{onClick:function(){E(!f)}},r.a.createElement(C.a,null)),r.a.createElement(v.a,{color:"primary",checked:"ON"===e.device.PowerController.powerState.value,onChange:function(t){return a=t,void P(e.device.endpointId,"PowerController",a.target.checked?"TurnOn":"TurnOff");var a}}))),W()&&("ON"===e.device.PowerController.powerState.value||B)&&r.a.createElement(g.default,{label:"Volume",small:!0,reverse:!0,minWidth:64,value:e.device.SpeakerController.volume.value,change:function(t){P(e.device.endpointId,"SpeakerController","SetVolume",{volume:t})},avatarClick:function(){return t=!e.device.SpeakerController.mute.value,void P(e.device.endpointId,"SpeakerController","SetVolume",{mute:t});var t},avatarState:"ON"===e.device.PowerController.powerState.value?"on":"off",disabled:"OFF"===e.device.PowerController.powerState.value}),B&&r.a.createElement(c.a,{className:t.bottomListItem},r.a.createElement(s.a,{primary:"Input"}),r.a.createElement(x.a,{disabled:"ON"!==e.device.PowerController.powerState.value,className:t.select,displayEmpty:!0,value:e.device.InputController.input.value?e.device.InputController.input.value:"",onChange:function(t){return a=t.target.value,void P(e.device.endpointId,"InputController","SelectInput",{input:a});var a}},L.map((function(e){return r.a.createElement(N.a,{key:e,value:e},e)})))),B&&r.a.createElement(w.default,{disabled:"ON"!==e.device.PowerController.powerState.value,device:e.device,directive:P}),f&&r.a.createElement(c.a,{className:t.remoteListItem},r.a.createElement(h.default,{device:e.device})))}t.default=r.a.memo(O)}}]);
//# sourceMappingURL=94.6dd4b9cc.chunk.js.map