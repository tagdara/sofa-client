(this["webpackJsonpsofa-client"]=this["webpackJsonpsofa-client"]||[]).push([[94],{202:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return f}));var o=a(0),r=a.n(o),c=a(25),n=a(59),l=a(392),i=a(419),d=a(525),s=a.n(d),u=a(487),p=a.n(u),m=a(488),h=a.n(m),b=a(27),v=a(62);function f(e){return r.a.createElement(b.default,null,r.a.createElement(c.a,null,r.a.createElement(v.default,{noback:!0,avatarState:"ON"===e.device.PowerController.powerState.value?"on":"off"},r.a.createElement(s.a,null)),"ON"===e.device.PowerController.powerState.value?r.a.createElement(n.a,{primary:e.device.friendlyName,secondary:"LOCKED"===e.device.LockController.lockState.value?"Locked":"Unlocked"}):r.a.createElement(n.a,{primary:e.device.friendlyName,secondary:"Powered off"}),r.a.createElement(l.a,null,r.a.createElement(i.a,{color:"primary",checked:"ON"===e.device.PowerController.powerState.value,onChange:function(t){t.target.checked?e.directive(e.device.endpointId,"PowerController","TurnOn",{},{},""):e.directive(e.device.endpointId,"PowerController","TurnOff",{},{},"")}}))),"ON"===e.device.PowerController.powerState.value&&r.a.createElement(c.a,null,r.a.createElement(v.default,{avatarState:"LOCKED"===e.device.LockController.lockState.value?"off":"on"},"LOCKED"===e.device.LockController.lockState.value?r.a.createElement(p.a,null):r.a.createElement(h.a,null)),r.a.createElement(l.a,null,r.a.createElement(i.a,{color:"primary",checked:"LOCKED"===e.device.LockController.lockState.value,onChange:function(t){t.target.checked?e.directive(e.device.endpointId,"LockController","Lock",{},{},""):e.directive(e.device.endpointId,"LockController","Unlock",{},{},"")}}))))}},367:function(e,t,a){"use strict";var o=a(1),r=a(2),c=a(0),n=a.n(c),l=(a(5),a(3)),i=a(4),d=a(15),s=a(86),u=a(8),p=n.a.forwardRef((function(e,t){var a=e.edge,c=void 0!==a&&a,i=e.children,d=e.classes,p=e.className,m=e.color,h=void 0===m?"default":m,b=e.disabled,v=void 0!==b&&b,f=e.disableFocusRipple,g=void 0!==f&&f,k=e.size,y=void 0===k?"medium":k,O=Object(r.a)(e,["edge","children","classes","className","color","disabled","disableFocusRipple","size"]);return n.a.createElement(s.a,Object(o.a)({className:Object(l.a)(d.root,p,"default"!==h&&d["color".concat(Object(u.a)(h))],v&&d.disabled,{small:d["size".concat(Object(u.a)(y))]}[y],{start:d.edgeStart,end:d.edgeEnd}[c]),centerRipple:!0,focusRipple:!g,disabled:v,ref:t},O),n.a.createElement("span",{className:d.label},i))}));t.a=Object(i.a)((function(e){return{root:{textAlign:"center",flex:"0 0 auto",fontSize:e.typography.pxToRem(24),padding:12,borderRadius:"50%",overflow:"visible",color:e.palette.action.active,transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{backgroundColor:Object(d.c)(e.palette.action.active,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"&$disabled":{backgroundColor:"transparent",color:e.palette.action.disabled}},edgeStart:{marginLeft:-12,"$sizeSmall&":{marginLeft:-3}},edgeEnd:{marginRight:-12,"$sizeSmall&":{marginRight:-3}},colorInherit:{color:"inherit"},colorPrimary:{color:e.palette.primary.main,"&:hover":{backgroundColor:Object(d.c)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},colorSecondary:{color:e.palette.secondary.main,"&:hover":{backgroundColor:Object(d.c)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},disabled:{},sizeSmall:{padding:3,fontSize:e.typography.pxToRem(18)},label:{width:"100%",display:"flex",alignItems:"inherit",justifyContent:"inherit"}}}),{name:"MuiIconButton"})(p)},392:function(e,t,a){"use strict";var o=a(1),r=a(2),c=a(0),n=a.n(c),l=(a(5),a(3)),i=a(4),d=n.a.forwardRef((function(e,t){var a=e.classes,c=e.className,i=Object(r.a)(e,["classes","className"]);return n.a.createElement("div",Object(o.a)({className:Object(l.a)(a.root,c),ref:t},i))}));d.muiName="ListItemSecondaryAction",t.a=Object(i.a)({root:{position:"absolute",right:16,top:"50%",transform:"translateY(-50%)"}},{name:"MuiListItemSecondaryAction"})(d)},419:function(e,t,a){"use strict";var o=a(1),r=a(2),c=a(0),n=a.n(c),l=(a(5),a(3)),i=a(4),d=a(15),s=a(8),u=a(21),p=a(367),m=n.a.forwardRef((function(e,t){var a=e.autoFocus,c=e.checked,i=e.checkedIcon,d=e.classes,s=e.className,m=e.defaultChecked,h=e.disabled,b=e.icon,v=e.id,f=e.inputProps,g=e.inputRef,k=e.name,y=e.onBlur,O=e.onChange,C=e.onFocus,w=e.readOnly,E=e.required,j=e.tabIndex,S=e.type,z=e.value,$=Object(r.a)(e,["autoFocus","checked","checkedIcon","classes","className","defaultChecked","disabled","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"]),N=n.a.useRef(null!=c).current,x=n.a.useState(Boolean(m)),I=x[0],L=x[1],R=N?c:I,P=Object(u.a)(),B=h;P&&"undefined"===typeof B&&(B=P.disabled);var F="checkbox"===S||"radio"===S;return n.a.createElement(p.a,Object(o.a)({component:"span",className:Object(l.a)(d.root,s,R&&d.checked,B&&d.disabled),disabled:B,tabIndex:null,role:void 0,onFocus:function(e){C&&C(e),P&&P.onFocus&&P.onFocus(e)},onBlur:function(e){y&&y(e),P&&P.onBlur&&P.onBlur(e)},ref:t},$),n.a.createElement("input",Object(o.a)({autoFocus:a,checked:c,defaultChecked:m,className:d.input,disabled:B,id:F&&v,name:k,onChange:function(e){var t=e.target.checked;N||L(t),O&&O(e,t)},readOnly:w,ref:g,required:E,tabIndex:j,type:S,value:z},f)),R?i:b)})),h=Object(i.a)({root:{padding:9},checked:{},disabled:{},input:{cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}},{name:"PrivateSwitchBase"})(m),b=n.a.forwardRef((function(e,t){var a=e.classes,c=e.className,i=e.color,d=void 0===i?"secondary":i,u=e.disabled,p=void 0!==u&&u,m=e.edge,b=void 0!==m&&m,v=e.size,f=void 0===v?"medium":v,g=Object(r.a)(e,["classes","className","color","disabled","edge","size"]),k=n.a.createElement("span",{className:a.thumb});return n.a.createElement("span",{className:Object(l.a)(a.root,c,{start:a.edgeStart,end:a.edgeEnd}[b],{small:a["size".concat(Object(s.a)(f))]}[f])},n.a.createElement(h,Object(o.a)({type:"checkbox",icon:k,checkedIcon:k,classes:{root:Object(l.a)(a.switchBase,a["color".concat(Object(s.a)(d))]),input:a.input,checked:a.checked,disabled:a.disabled},ref:t,disabled:p},g)),n.a.createElement("span",{className:a.track}))}));t.a=Object(i.a)((function(e){return{root:{display:"inline-flex",width:58,height:38,overflow:"hidden",padding:12,boxSizing:"border-box",position:"relative",flexShrink:0,zIndex:0,verticalAlign:"middle"},edgeStart:{marginLeft:-8},edgeEnd:{marginRight:-8},switchBase:{position:"absolute",top:0,left:0,zIndex:1,color:"light"===e.palette.type?e.palette.grey[50]:e.palette.grey[400],transition:e.transitions.create(["left","transform"],{duration:e.transitions.duration.shortest}),"&$checked":{transform:"translateX(20px)"},"&$disabled":{color:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[800]},"&$checked + $track":{opacity:.5},"&$disabled + $track":{opacity:"light"===e.palette.type?.12:.1}},colorPrimary:{"&$checked":{color:e.palette.primary.main,"&:hover":{backgroundColor:Object(d.c)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[800]},"&$checked + $track":{backgroundColor:e.palette.primary.main},"&$disabled + $track":{backgroundColor:"light"===e.palette.type?e.palette.common.black:e.palette.common.white}},colorSecondary:{"&$checked":{color:e.palette.secondary.main,"&:hover":{backgroundColor:Object(d.c)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[800]},"&$checked + $track":{backgroundColor:e.palette.secondary.main},"&$disabled + $track":{backgroundColor:"light"===e.palette.type?e.palette.common.black:e.palette.common.white}},sizeSmall:{width:40,height:24,padding:7,"& $thumb":{width:16,height:16},"& $switchBase":{padding:4,"&$checked":{transform:"translateX(16px)"}}},checked:{},disabled:{},input:{left:"-100%",width:"300%"},thumb:{boxShadow:e.shadows[1],backgroundColor:"currentColor",width:20,height:20,borderRadius:"50%"},track:{height:"100%",width:"100%",borderRadius:7,zIndex:-1,transition:e.transitions.create(["opacity","background-color"],{duration:e.transitions.duration.shortest}),backgroundColor:"light"===e.palette.type?e.palette.common.black:e.palette.common.white,opacity:"light"===e.palette.type?.38:.3}}}),{name:"MuiSwitch"})(b)},487:function(e,t,a){"use strict";var o=a(23);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(a(0)),c=(0,o(a(26)).default)(r.default.createElement("path",{d:"M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"}),"Lock");t.default=c},488:function(e,t,a){"use strict";var o=a(23);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(a(0)),c=(0,o(a(26)).default)(r.default.createElement("path",{d:"M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"}),"LockOpen");t.default=c},525:function(e,t,a){"use strict";var o=a(23);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(a(0)),c=(0,o(a(26)).default)(r.default.createElement("path",{d:"M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z"}),"DesktopWindows");t.default=c}}]);
//# sourceMappingURL=94.6c8c1533.chunk.js.map