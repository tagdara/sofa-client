(this["webpackJsonpsofa-client"]=this["webpackJsonpsofa-client"]||[]).push([[118,171,190],{120:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return d}));var n=a(6),l=a(0),r=a.n(l),i=a(32),o=a(60),c=a(950),u=Object(i.a)({half:{alignItems:"center",display:"flex",height:42,flexGrow:1,flexBasis:0,boxSizing:"border-box"},stack:{height:"auto",display:"flex",flexGrow:1,justifyContent:"space-between",flexWrap:"wrap",width:"100%",boxSizing:"border-box",marginRight:0,overflowX:"hidden",overflowY:"hidden",alignItems:"center",paddingRight:8},padLeft:{paddingLeft:16},slider:{margin:"-18px"}});function d(e){var t=u(),a=Object(l.useState)(0),i=Object(n.a)(a,2),d=i[0],s=i[1];return Object(l.useEffect)((function(){e.value&&s(e.value)}),[e.value]),r.a.createElement("div",{style:{minWidth:e.minWidth},className:e.padLeft?t.stack+" "+t.padLeft:e.half?t.half:t.stack},e.name?r.a.createElement(o.a,{variant:e.smallText?"caption":"subtitle1",className:t.stackLabel},e.name):null,e.unit?r.a.createElement(o.a,{variant:"caption",className:t.stackLabel},Array.isArray(d)?Math.floor(d[0])+" - "+Math.floor(d[1])+e.unit:Math.floor(d)+e.unit):null,r.a.createElement(c.a,{value:d,step:e.step,min:e.min,max:e.max,onChange:function(t,a){s(a),e.preChange&&e.preChange(a)},onChangeCommitted:function(t,a){e.change(a)},disabled:e.disabled}))}d.defaultProps={name:"",unit:"",min:0,max:100,step:1,default:0,value:0,tabs:"",disabled:!1,padLeft:!1,half:!1,minWidth:240,smallText:!1}},143:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return s}));var n=a(6),l=a(0),r=a.n(l),i=a(32),o=a(59),c=a(120),u=a(62),d=Object(i.a)({label:{display:"flex",flexGrow:1,flexBasis:0,minWidth:"35%",alignItems:"center"},line:{boxSizing:"border-box",display:"flex",width:"100%",maxWidth:"100%",flexGrow:1,flexBasis:0,minHeight:48,padding:"0 16px",alignItems:"center"},noPad:{boxSizing:"border-box",display:"flex",width:"100%",maxWidth:"100%",flexGrow:1,flexBasis:0,padding:0,alignItems:"center"}});function s(e){var t=d(),a=Object(l.useState)(0),i=Object(n.a)(a,2),s=i[0],m=i[1];return Object(l.useEffect)((function(){m(e.value)}),[e.value]),r.a.createElement("div",{className:e.noPad?t.noPad:t.line},!e.reverse&&r.a.createElement(u.default,{small:e.small,onClick:e.avatarClick,noback:e.noAvatarBack,avatarState:e.avatarState},s+e.avatarUnit),e.iconLabel&&e.iconLabel,e.label&&r.a.createElement(o.a,{primary:e.label,className:t.label}),r.a.createElement(c.default,Object.assign({},e,{preChange:function(t){m(t),e.hasOwnProperty("preChange")&&e.preChange(t)}})),e.reverse&&r.a.createElement(u.default,{reverse:e.reverse,small:e.small,onClick:e.avatarClick,noback:e.noAvatarBack,avatarState:e.avatarState},s+e.avatarUnit))}s.defaultProps={avatarClick:void 0,noAvatarBack:!1,avatarState:"on",reverse:!0,small:!1,avatarUnit:"",noPad:!1}},187:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return m}));var n=a(0),l=a.n(n),r=a(42),i=a(32),o=a(25),c=a(59),u=a(396),d=a(361),s=Object(i.a)((function(e){return{titleBar:{width:"100%",color:e.palette.primary.contrastText,backgroundColor:e.palette.primary.main},select:{minWidth:"50%"}}}));function m(e){var t=s(),a=Object(n.useContext)(r.DeviceContext),i=(0,a.getModes)((0,a.deviceByEndpointId)(e.device.endpointId),e.exclude);return Object.keys(i).map((function(a){return l.a.createElement(o.a,{key:a},l.a.createElement(c.a,{primary:a,key:a}),l.a.createElement(d.a,{disabled:e.disabled,className:t.select,displayEmpty:!0,value:e.device[a].mode.value?e.device[a].mode.value:"",onChange:function(t){return function(t,a,n){e.directive(e.device.endpointId,a,"SetMode",{mode:n})}(0,a,t.target.value)}},Object.keys(i[a]).map((function(e){return l.a.createElement(u.a,{key:i[a][e],value:e},i[a][e])}))))}))}m.defaultProps={exclude:[],disabled:!1}},210:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return y}));var n=a(0),l=a.n(n),r=a(32),i=a(319),o=a(448),c=a.n(o),u=a(449),d=a.n(u),s=a(386),m=a.n(s),v=a(387),f=a.n(v),p=a(507),g=a.n(p),E=a(100),b=a.n(E),C=a(101),h=a.n(C),x=a(935),k=a(936),w=Object(r.a)((function(e){return{gridList:{maxWidth:320,margin:"0 auto !important",backgroundColor:e.palette.background.default},gridButtonTile:{width:"100%",display:"flex",alignItems:"center",justifyContent:"center"},remoteButton:{width:"100%",flexGrow:1,height:"100%"}}}));function y(e){var t=w();function a(t){console.log("sending button",t),e.device.RemoteController.directive("PressRemoteButton",{buttonName:t})}return l.a.createElement(x.a,{cellHeight:80,className:t.gridList,cols:3},l.a.createElement(k.a,{cols:1}),l.a.createElement(k.a,{cols:1,className:t.gridButtonTile},l.a.createElement(i.a,{className:t.remoteButton,onClick:function(e){return a("CursorUp")}},l.a.createElement(m.a,null))),l.a.createElement(k.a,{cols:1,className:t.gridButtonTile}),l.a.createElement(k.a,{cols:1,className:t.gridButtonTile},l.a.createElement(i.a,{className:t.remoteButton,onClick:function(e){return a("CursorLeft")}},l.a.createElement(c.a,null))),l.a.createElement(k.a,{cols:1,className:t.gridButtonTile},l.a.createElement(i.a,{className:t.remoteButton,onClick:function(e){return a("DpadCenter")}},l.a.createElement(g.a,null))),l.a.createElement(k.a,{cols:1,className:t.gridButtonTile},l.a.createElement(i.a,{className:t.remoteButton,onClick:function(e){return a("CursorRight")}},l.a.createElement(d.a,null))),l.a.createElement(k.a,{cols:1,className:t.gridButtonTile}),l.a.createElement(k.a,{cols:1,className:t.gridButtonTile},l.a.createElement(i.a,{className:t.remoteButton,onClick:function(e){return a("CursorDown")}},l.a.createElement(f.a,null))),l.a.createElement(k.a,{cols:1,className:t.gridButtonTile}),l.a.createElement(k.a,{cols:1,className:t.gridButtonTile},l.a.createElement(i.a,{className:t.remoteButton,onClick:function(e){return a("Exit")}},l.a.createElement(h.a,null))),l.a.createElement(k.a,{cols:1,className:t.gridButtonTile}),l.a.createElement(k.a,{cols:1,className:t.gridButtonTile},l.a.createElement(i.a,{className:t.remoteButton,onClick:function(e){return a("Home")}},l.a.createElement(b.a,null))))}},237:function(e,t,a){"use strict";a.r(t),a.d(t,"Television",(function(){return O}));var n=a(6),l=a(0),r=a.n(l),i=a(32),o=a(42),c=a(25),u=a(397),d=a(59),s=a(392),m=a(367),v=a(419),f=a(371),p=a.n(f),g=a(776),E=a.n(g),b=a(143),C=a(27),h=a(210),x=a(24),k=a(187),w=a(396),y=a(361),N=Object(i.a)({list:{width:"100%",padding:0},bottomListItem:{flexWrap:"wrap",justifyContent:"flex-end"},select:{minWidth:"50%"},minLI:{minHeight:48,display:"flex",alignItems:"center"}});function O(e){var t=N(),a=Object(l.useState)(!1),i=Object(n.a)(a,2),f=i[0],g=i[1],O=Object(l.useState)(!1),S=Object(n.a)(O,2),B=S[0],I=S[1],j=Object(l.useContext)(o.DeviceContext),P=j.deviceByEndpointId,T=j.directive,L=(0,j.getInputs)(P(e.device.endpointId));function W(){return!!e.device.hasOwnProperty("SpeakerController")&&(!e.device.hasOwnProperty("Audio")||"Audio.audioSystem"===e.device.Audio.mode.value)}function A(){return B||"OFF"===e.device.PowerController.powerState.value?null:"OFF"!==e.device.PowerController.powerState.value&&W()?e.device.SpeakerController.volume.value+"% / "+e.device.InputController.input.value:e.device.InputController.input.value}return r.a.createElement(C.default,{wide:e.wide,nopad:!0},r.a.createElement(c.a,{className:t.listItem},r.a.createElement(u.a,{onClick:function(){return I(!B)}},r.a.createElement(p.a,null)),r.a.createElement(x.default,null,r.a.createElement(d.a,{className:A()?t.normal:t.minLI,onClick:function(){return I(!B)},primary:e.device.friendlyName,secondary:A()})),r.a.createElement(s.a,null,"ON"!==e.device.PowerController.powerState.value?null:r.a.createElement(m.a,{onClick:function(){g(!f)}},r.a.createElement(E.a,null)),r.a.createElement(v.a,{color:"primary",checked:"ON"===e.device.PowerController.powerState.value,onChange:function(t){return a=t,void T(e.device.endpointId,"PowerController",a.target.checked?"TurnOn":"TurnOff");var a}}))),W()&&("ON"===e.device.PowerController.powerState.value||B)&&r.a.createElement(b.default,{label:"Volume",small:!0,reverse:!0,minWidth:64,value:e.device.SpeakerController.volume.value,change:function(t){T(e.device.endpointId,"SpeakerController","SetVolume",{volume:t})},avatarClick:function(){return t=!e.device.SpeakerController.mute.value,void T(e.device.endpointId,"SpeakerController","SetVolume",{mute:t});var t},avatarState:"ON"===e.device.PowerController.powerState.value?"on":"off",disabled:"OFF"===e.device.PowerController.powerState.value}),B&&r.a.createElement(c.a,{className:t.bottomListItem},r.a.createElement(d.a,{primary:"Input"}),r.a.createElement(y.a,{disabled:"ON"!==e.device.PowerController.powerState.value,className:t.select,displayEmpty:!0,value:e.device.InputController.input.value?e.device.InputController.input.value:"",onChange:function(t){return a=t.target.value,void T(e.device.endpointId,"InputController","SelectInput",{input:a});var a}},L.map((function(e){return r.a.createElement(w.a,{key:e,value:e},e)})))),B&&r.a.createElement(k.default,{disabled:"ON"!==e.device.PowerController.powerState.value,device:e.device,directive:T}),f&&r.a.createElement(c.a,{className:t.remoteListItem},r.a.createElement(h.default,{device:e.device})))}t.default=r.a.memo(O)}}]);
//# sourceMappingURL=118.01310ba0.chunk.js.map