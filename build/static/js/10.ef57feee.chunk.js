(this["webpackJsonpsofa-client"]=this["webpackJsonpsofa-client"]||[]).push([[10,165],{116:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return d}));var a=n(6),i=n(0),l=n.n(i),r=n(38),o=n(50),c=n(751),s=Object(r.a)({half:{alignItems:"center",display:"flex",height:42,flexGrow:1,flexBasis:0,boxSizing:"border-box"},stack:{height:"auto",display:"flex",flexGrow:1,justifyContent:"space-between",flexWrap:"wrap",width:"100%",boxSizing:"border-box",marginRight:8,overflowX:"hidden",alignItems:"center",paddingRight:8},padLeft:{paddingLeft:16},slider:{margin:"-18px"},small:{padding:3},smallLabel:{paddingLeft:16}});function d(e){var t=s(),n=Object(i.useState)(e.value),r=Object(a.a)(n,2),d=r[0],u=r[1];return Object(i.useEffect)((function(){u(e.value)}),[e.value]),l.a.createElement(l.a.Fragment,null,l.a.createElement(c.a,{className:t.small,value:void 0===d?0:d,step:e.step,min:e.min,max:e.max,onChange:function(t,n){u(n),e.preChange&&e.preChange(n)},onChangeCommitted:function(t,n){e.change(n)},disabled:void 0===d||e.disabled}),e.unit?l.a.createElement(o.a,{variant:"caption",className:t.smallLabel},Array.isArray(d)?Math.floor(d[0])+" - "+Math.floor(d[1])+e.unit:Math.floor(d)+e.unit):null)}d.defaultProps={unit:"",min:0,max:100,step:1,default:0,value:0,disabled:!1}},129:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return r}));var a=n(0),i=n.n(a),l=n(116);function r(e){return Object(a.useEffect)((function(){void 0===e.item.value&&e.directive(e.device.endpointId,"OnLevelController","SetOnLevel",{onLevel:80},{},e.item.instance)}),[e.item,e.device,e.interface]),i.a.createElement(l.default,{value:parseInt(e.item.value.onLevel),unit:"%",min:0,max:100,step:10,change:function(t){e.directive(e.device.endpointId,"OnLevelController","SetOnLevel",{onLevel:t},{},e.item.instance)}})}}}]);
//# sourceMappingURL=10.ef57feee.chunk.js.map