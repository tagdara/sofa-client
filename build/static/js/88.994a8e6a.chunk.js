(this["webpackJsonpsofa-client"]=this["webpackJsonpsofa-client"]||[]).push([[88,101],{183:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return m}));var o=a(6),r=a(0),n=a.n(r),c=a(23),i=a(53),l=a(335),d=a(357),s=a(328),u=a.n(s),p=a(24),h=a(55);function m(e){var t=Object(r.useState)(e.device.PowerController.powerState.value),a=Object(o.a)(t,2),s=a[0],m=a[1];return n.a.createElement(p.default,null,n.a.createElement(c.a,null,n.a.createElement(h.default,{avatarState:"ON"===s?"on":"off"},n.a.createElement(u.a,null)),n.a.createElement(i.a,{primary:e.device.friendlyName}),n.a.createElement(l.a,null,n.a.createElement(d.a,{color:"primary",checked:"ON"===e.device.PowerController.powerState.value,onChange:function(t){m(t.target.checked),t.target.checked?e.device.PowerController.directive("TurnOn"):e.device.PowerController.directive("TurnOff")}}))))}},205:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return c}));var o=a(0),r=a.n(o),n=a(183);function c(e){return r.a.createElement(r.a.Fragment,null,e.devices.map((function(e){return r.a.createElement(n.default,{key:e.endpointId,device:e})})))}},328:function(e,t,a){"use strict";var o=a(37);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(a(0)),n=(0,o(a(48)).default)(r.default.createElement("path",{d:"M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"}),"Tune");t.default=n},332:function(e,t,a){"use strict";var o=a(1),r=a(2),n=a(0),c=a.n(n),i=(a(5),a(3)),l=a(4),d=a(13),s=a(83),u=a(7),p=c.a.forwardRef((function(e,t){var a=e.edge,n=void 0!==a&&a,l=e.children,d=e.classes,p=e.className,h=e.color,m=void 0===h?"default":h,b=e.disabled,g=void 0!==b&&b,f=e.disableFocusRipple,v=void 0!==f&&f,y=e.size,k=void 0===y?"medium":y,O=Object(r.a)(e,["edge","children","classes","className","color","disabled","disableFocusRipple","size"]);return c.a.createElement(s.a,Object(o.a)({className:Object(i.a)(d.root,p,"default"!==m&&d["color".concat(Object(u.a)(m))],g&&d.disabled,{small:d["size".concat(Object(u.a)(k))]}[k],{start:d.edgeStart,end:d.edgeEnd}[n]),centerRipple:!0,focusRipple:!v,disabled:g,ref:t},O),c.a.createElement("span",{className:d.label},l))}));t.a=Object(l.a)((function(e){return{root:{textAlign:"center",flex:"0 0 auto",fontSize:e.typography.pxToRem(24),padding:12,borderRadius:"50%",overflow:"visible",color:e.palette.action.active,transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{backgroundColor:Object(d.c)(e.palette.action.active,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"&$disabled":{backgroundColor:"transparent",color:e.palette.action.disabled}},edgeStart:{marginLeft:-12,"$sizeSmall&":{marginLeft:-3}},edgeEnd:{marginRight:-12,"$sizeSmall&":{marginRight:-3}},colorInherit:{color:"inherit"},colorPrimary:{color:e.palette.primary.main,"&:hover":{backgroundColor:Object(d.c)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},colorSecondary:{color:e.palette.secondary.main,"&:hover":{backgroundColor:Object(d.c)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},disabled:{},sizeSmall:{padding:3,fontSize:e.typography.pxToRem(18)},label:{width:"100%",display:"flex",alignItems:"inherit",justifyContent:"inherit"}}}),{name:"MuiIconButton"})(p)},335:function(e,t,a){"use strict";var o=a(1),r=a(2),n=a(0),c=a.n(n),i=(a(5),a(3)),l=a(4),d=c.a.forwardRef((function(e,t){var a=e.classes,n=e.className,l=Object(r.a)(e,["classes","className"]);return c.a.createElement("div",Object(o.a)({className:Object(i.a)(a.root,n),ref:t},l))}));d.muiName="ListItemSecondaryAction",t.a=Object(l.a)({root:{position:"absolute",right:16,top:"50%",transform:"translateY(-50%)"}},{name:"MuiListItemSecondaryAction"})(d)},357:function(e,t,a){"use strict";var o=a(1),r=a(2),n=a(0),c=a.n(n),i=(a(5),a(3)),l=a(4),d=a(13),s=a(7),u=a(18),p=a(332),h=c.a.forwardRef((function(e,t){var a=e.autoFocus,n=e.checked,l=e.checkedIcon,d=e.classes,s=e.className,h=e.defaultChecked,m=e.disabled,b=e.icon,g=e.id,f=e.inputProps,v=e.inputRef,y=e.name,k=e.onBlur,O=e.onChange,j=e.onFocus,w=e.readOnly,C=e.required,S=e.tabIndex,$=e.type,z=e.value,E=Object(r.a)(e,["autoFocus","checked","checkedIcon","classes","className","defaultChecked","disabled","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"]),x=c.a.useRef(null!=n).current,N=c.a.useState(Boolean(h)),R=N[0],I=N[1],B=x?n:R,F=Object(u.a)(),P=m;F&&"undefined"===typeof P&&(P=F.disabled);var M="checkbox"===$||"radio"===$;return c.a.createElement(p.a,Object(o.a)({component:"span",className:Object(i.a)(d.root,s,B&&d.checked,P&&d.disabled),disabled:P,tabIndex:null,role:void 0,onFocus:function(e){j&&j(e),F&&F.onFocus&&F.onFocus(e)},onBlur:function(e){k&&k(e),F&&F.onBlur&&F.onBlur(e)},ref:t},E),c.a.createElement("input",Object(o.a)({autoFocus:a,checked:n,defaultChecked:h,className:d.input,disabled:P,id:M&&g,name:y,onChange:function(e){var t=e.target.checked;x||I(t),O&&O(e,t)},readOnly:w,ref:v,required:C,tabIndex:S,type:$,value:z},f)),B?l:b)})),m=Object(l.a)({root:{padding:9},checked:{},disabled:{},input:{cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}},{name:"PrivateSwitchBase"})(h),b=c.a.forwardRef((function(e,t){var a=e.classes,n=e.className,l=e.color,d=void 0===l?"secondary":l,u=e.disabled,p=void 0!==u&&u,h=e.edge,b=void 0!==h&&h,g=e.size,f=void 0===g?"medium":g,v=Object(r.a)(e,["classes","className","color","disabled","edge","size"]),y=c.a.createElement("span",{className:a.thumb});return c.a.createElement("span",{className:Object(i.a)(a.root,n,{start:a.edgeStart,end:a.edgeEnd}[b],{small:a["size".concat(Object(s.a)(f))]}[f])},c.a.createElement(m,Object(o.a)({type:"checkbox",icon:y,checkedIcon:y,classes:{root:Object(i.a)(a.switchBase,a["color".concat(Object(s.a)(d))]),input:a.input,checked:a.checked,disabled:a.disabled},ref:t,disabled:p},v)),c.a.createElement("span",{className:a.track}))}));t.a=Object(l.a)((function(e){return{root:{display:"inline-flex",width:58,height:38,overflow:"hidden",padding:12,boxSizing:"border-box",position:"relative",flexShrink:0,zIndex:0,verticalAlign:"middle"},edgeStart:{marginLeft:-8},edgeEnd:{marginRight:-8},switchBase:{position:"absolute",top:0,left:0,zIndex:1,color:"light"===e.palette.type?e.palette.grey[50]:e.palette.grey[400],transition:e.transitions.create(["left","transform"],{duration:e.transitions.duration.shortest}),"&$checked":{transform:"translateX(20px)"},"&$disabled":{color:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[800]},"&$checked + $track":{opacity:.5},"&$disabled + $track":{opacity:"light"===e.palette.type?.12:.1}},colorPrimary:{"&$checked":{color:e.palette.primary.main,"&:hover":{backgroundColor:Object(d.c)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[800]},"&$checked + $track":{backgroundColor:e.palette.primary.main},"&$disabled + $track":{backgroundColor:"light"===e.palette.type?e.palette.common.black:e.palette.common.white}},colorSecondary:{"&$checked":{color:e.palette.secondary.main,"&:hover":{backgroundColor:Object(d.c)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[800]},"&$checked + $track":{backgroundColor:e.palette.secondary.main},"&$disabled + $track":{backgroundColor:"light"===e.palette.type?e.palette.common.black:e.palette.common.white}},sizeSmall:{width:40,height:24,padding:7,"& $thumb":{width:16,height:16},"& $switchBase":{padding:4,"&$checked":{transform:"translateX(16px)"}}},checked:{},disabled:{},input:{left:"-100%",width:"300%"},thumb:{boxShadow:e.shadows[1],backgroundColor:"currentColor",width:20,height:20,borderRadius:"50%"},track:{height:"100%",width:"100%",borderRadius:7,zIndex:-1,transition:e.transitions.create(["opacity","background-color"],{duration:e.transitions.duration.shortest}),backgroundColor:"light"===e.palette.type?e.palette.common.black:e.palette.common.white,opacity:"light"===e.palette.type?.38:.3}}}),{name:"MuiSwitch"})(b)}}]);
//# sourceMappingURL=88.994a8e6a.chunk.js.map