(this["webpackJsonpsofa-client"]=this["webpackJsonpsofa-client"]||[]).push([[190],{120:function(e,a,t){"use strict";t.r(a),t.d(a,"default",(function(){return f}));var n=t(6),i=t(0),l=t.n(i),s=t(32),r=t(60),o=t(950),c=Object(s.a)({half:{alignItems:"center",display:"flex",height:42,flexGrow:1,flexBasis:0,boxSizing:"border-box"},stack:{height:"auto",display:"flex",flexGrow:1,justifyContent:"space-between",flexWrap:"wrap",width:"100%",boxSizing:"border-box",marginRight:0,overflowX:"hidden",overflowY:"hidden",alignItems:"center",paddingRight:8},padLeft:{paddingLeft:16},slider:{margin:"-18px"}});function f(e){var a=c(),t=Object(i.useState)(0),s=Object(n.a)(t,2),f=s[0],d=s[1];return Object(i.useEffect)((function(){e.value&&d(e.value)}),[e.value]),l.a.createElement("div",{style:{minWidth:e.minWidth},className:e.padLeft?a.stack+" "+a.padLeft:e.half?a.half:a.stack},e.name?l.a.createElement(r.a,{variant:e.smallText?"caption":"subtitle1",className:a.stackLabel},e.name):null,e.unit?l.a.createElement(r.a,{variant:"caption",className:a.stackLabel},Array.isArray(f)?Math.floor(f[0])+" - "+Math.floor(f[1])+e.unit:Math.floor(f)+e.unit):null,l.a.createElement(o.a,{value:f,step:e.step,min:e.min,max:e.max,onChange:function(a,t){d(t),e.preChange&&e.preChange(t)},onChangeCommitted:function(a,t){e.change(t)},disabled:e.disabled}))}f.defaultProps={name:"",unit:"",min:0,max:100,step:1,default:0,value:0,tabs:"",disabled:!1,padLeft:!1,half:!1,minWidth:240,smallText:!1}}}]);
//# sourceMappingURL=190.44787a13.chunk.js.map