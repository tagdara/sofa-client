(this["webpackJsonpsofa-client"]=this["webpackJsonpsofa-client"]||[]).push([[9,163],{126:function(e,a,t){"use strict";t.r(a),t.d(a,"default",(function(){return r}));var n=t(0),i=t.n(n),l=t(132);function r(e){return Object(n.useEffect)((function(){void 0===e.interface.onLevel.value&&e.interface.hasOwnProperty("setDefault")&&e.interface.setDefault(100)}),[e.interface]),i.a.createElement(l.default,{value:e.interface.onLevel.value,unit:"%",min:0,max:100,step:10,change:function(a){e.interface.directive("SetOnLevel",{onLevel:a})}})}},132:function(e,a,t){"use strict";t.r(a),t.d(a,"default",(function(){return c}));var n=t(6),i=t(0),l=t.n(i),r=t(29),f=t(47),o=t(747),u=Object(r.a)({half:{alignItems:"center",display:"flex",height:42,flexGrow:1,flexBasis:0,boxSizing:"border-box"},stack:{height:"auto",display:"flex",flexGrow:1,justifyContent:"space-between",flexWrap:"wrap",width:"100%",boxSizing:"border-box",marginRight:8,overflowX:"hidden",alignItems:"center",paddingRight:8},padLeft:{paddingLeft:16},slider:{margin:"-18px"},small:{padding:3},smallLabel:{paddingLeft:8}});function c(e){var a=u(),t=Object(i.useState)(e.value),r=Object(n.a)(t,2),c=r[0],s=r[1];return Object(i.useEffect)((function(){s(e.value)}),[e.value]),l.a.createElement(l.a.Fragment,null,l.a.createElement(o.a,{className:a.small,value:void 0===c?0:c,step:e.step,min:e.min,max:e.max,onChange:function(a,t){s(t),e.preChange&&e.preChange(t)},onChangeCommitted:function(a,t){e.change(t)},disabled:void 0===c||e.disabled}),e.unit?l.a.createElement(f.a,{variant:"caption",className:a.smallLabel},Array.isArray(c)?Math.floor(c[0])+" - "+Math.floor(c[1])+e.unit:Math.floor(c)+e.unit):null)}c.defaultProps={unit:"",min:0,max:100,step:1,default:0,value:0,disabled:!1}}}]);
//# sourceMappingURL=9.5815f2e3.chunk.js.map