(this["webpackJsonpsofa-client"]=this["webpackJsonpsofa-client"]||[]).push([[136,151],{131:function(e,a,t){"use strict";t.r(a),t.d(a,"default",(function(){return u}));var n=t(6),i=t(0),l=t.n(i),r=t(29),s=t(47),c=t(733),o=Object(r.a)({half:{alignItems:"center",display:"flex",height:42,flexGrow:1,flexBasis:0,boxSizing:"border-box"},stack:{height:"auto",display:"flex",flexGrow:1,justifyContent:"space-between",flexWrap:"wrap",width:"100%",boxSizing:"border-box",marginRight:8,overflowX:"hidden",alignItems:"center",paddingRight:8},padLeft:{paddingLeft:16},slider:{margin:"-18px"},small:{padding:3},smallLabel:{paddingLeft:8}});function u(e){var a=o(),t=Object(i.useState)(e.value),r=Object(n.a)(t,2),u=r[0],d=r[1];return Object(i.useEffect)((function(){d(e.value)}),[e.value]),l.a.createElement(l.a.Fragment,null,l.a.createElement(c.a,{className:a.small,value:void 0===u?0:u,step:e.step,min:e.min,max:e.max,onChange:function(a,t){d(t),e.preChange&&e.preChange(t)},onChangeCommitted:function(a,t){e.change(t)},disabled:void 0===u||e.disabled}),e.unit?l.a.createElement(s.a,{variant:"caption",className:a.smallLabel},Array.isArray(u)?Math.floor(u[0])+" - "+Math.floor(u[1])+e.unit:Math.floor(u)+e.unit):null)}u.defaultProps={unit:"",min:0,max:100,step:1,default:0,value:0,disabled:!1}},134:function(e,a,t){"use strict";t.r(a),t.d(a,"default",(function(){return u}));var n=t(0),i=t.n(n),l=t(29),r=t(131),s=t(393),c=t(392),o=Object(l.a)({indent:{paddingLeft:40,paddingRight:8},nobreak:{whiteSpace:"nowrap",alignItems:"center"}});function u(e){var a=o();return i.a.createElement(c.a,null,i.a.createElement(s.a,null,"Brightness"),i.a.createElement(s.a,null,e.interface.brightness.value+"%"),i.a.createElement(s.a,{className:a.nobreak},i.a.createElement(r.default,{value:e.interface.brightness.value,min:0,max:100,step:10,change:function(a){e.interface.directive("SetBrightness",{brightness:a})},disabled:!e.device.PowerController.powerState.value})))}}}]);
//# sourceMappingURL=136.57865369.chunk.js.map