(this["webpackJsonpsofa-client"]=this["webpackJsonpsofa-client"]||[]).push([[189],{171:function(e,a,t){"use strict";t.r(a),t.d(a,"default",(function(){return f}));var n=t(6),i=t(0),l=t.n(i),r=t(32),s=t(60),o=t(950),d=Object(r.a)({half:{alignItems:"center",display:"flex",height:42,flexGrow:1,flexBasis:0,boxSizing:"border-box"},stack:{height:"auto",display:"flex",flexGrow:1,justifyContent:"space-between",flexWrap:"wrap",width:"100%",boxSizing:"border-box",marginRight:8,overflowX:"hidden",alignItems:"center",paddingRight:8},padLeft:{paddingLeft:16},slider:{margin:"-18px"},small:{padding:3},smallLabel:{paddingLeft:16}});function f(e){var a=d(),t=Object(i.useState)(e.value),r=Object(n.a)(t,2),f=r[0],u=r[1];return Object(i.useEffect)((function(){u(e.value)}),[e.value]),l.a.createElement(l.a.Fragment,null,l.a.createElement(o.a,{className:a.small,value:void 0===f?0:f,step:e.step,min:e.min,max:e.max,onChange:function(a,t){u(t),e.preChange&&e.preChange(t)},onChangeCommitted:function(a,t){e.change(t)},disabled:void 0===f||e.disabled}),e.unit?l.a.createElement(s.a,{variant:"caption",className:a.smallLabel},Array.isArray(f)?Math.floor(f[0])+" - "+Math.floor(f[1])+e.unit:Math.floor(f)+e.unit):null)}f.defaultProps={unit:"",min:0,max:100,step:1,default:0,value:0,disabled:!1}}}]);
//# sourceMappingURL=189.2bcdf8c3.chunk.js.map