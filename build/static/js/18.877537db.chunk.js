(this["webpackJsonpsofa-client"]=this["webpackJsonpsofa-client"]||[]).push([[18,142,147,151,164],{113:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return s}));var r=a(6),n=a(0),o=a.n(n),l=a(29),c=a(47),i=a(747),d=Object(l.a)({half:{alignItems:"center",display:"flex",height:42,flexGrow:1,flexBasis:0,boxSizing:"border-box"},stack:{height:"auto",display:"flex",flexGrow:1,justifyContent:"space-between",flexWrap:"wrap",width:"100%",boxSizing:"border-box",marginRight:8,overflowX:"hidden",overflowY:"hidden",alignItems:"center",paddingRight:8},padLeft:{paddingLeft:16},slider:{margin:"-18px"}});function s(e){var t=d(),a=Object(n.useState)(0),l=Object(r.a)(a,2),s=l[0],u=l[1];return Object(n.useEffect)((function(){e.value&&u(e.value)}),[e.value]),o.a.createElement("div",{style:{minWidth:e.minWidth},className:e.padLeft?t.stack+" "+t.padLeft:e.half?t.half:t.stack},e.name?o.a.createElement(c.a,{variant:e.smallText?"caption":"subtitle1",className:t.stackLabel},e.name):null,e.unit?o.a.createElement(c.a,{variant:"caption",className:t.stackLabel},Array.isArray(s)?Math.floor(s[0])+" - "+Math.floor(s[1])+e.unit:Math.floor(s)+e.unit):null,o.a.createElement(i.a,{value:s,step:e.step,min:e.min,max:e.max,onChange:function(t,a){u(a),e.preChange&&e.preChange(a)},onChangeCommitted:function(t,a){e.change(a)},disabled:e.disabled}))}s.defaultProps={name:"",unit:"",min:0,max:100,step:1,default:0,value:0,tabs:"",disabled:!1,padLeft:!1,half:!1,minWidth:240,smallText:!1}},148:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return p}));var r=a(6),n=a(0),o=a.n(n),l=a(29),c=a(23),i=a(53),d=a(113),s=a(55),u=Object(l.a)({label:{display:"flex",flexGrow:1,flexBasis:0,minWidth:"35%"},line:{display:"flex",width:"100%"}});function p(e){var t=u(),a=Object(n.useState)(0),l=Object(r.a)(a,2),p=l[0],m=l[1];return Object(n.useEffect)((function(){m(e.value)}),[e.value]),o.a.createElement(c.a,{className:t.line},!e.reverse&&o.a.createElement(s.default,{small:e.small,onClick:e.avatarClick,noback:e.noAvatarBack,avatarState:e.avatarState},p),e.label&&o.a.createElement(i.a,{primary:e.label,className:t.label}),o.a.createElement(d.default,Object.assign({},e,{preChange:function(t){m(t),e.hasOwnProperty("preChange")&&e.preChange(t)}})),e.reverse&&o.a.createElement(s.default,{reverse:e.reverse,small:e.small,onClick:e.avatarClick,noback:e.noAvatarBack,avatarState:e.avatarState},p))}p.defaultProps={avatarClick:void 0,noAvatarBack:!1,avatarState:"on",reverse:!0,small:!1}},166:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return u}));var r=a(0),n=a.n(r),o=a(29),l=a(23),c=a(53),i=a(351),d=a(323),s=Object(o.a)((function(e){return{titleBar:{width:"100%",color:e.palette.primary.contrastText,backgroundColor:e.palette.primary.main},select:{minWidth:"50%"}}}));function u(e){var t=s();function a(){for(var t={},a=0;a<e.device.interfaces.length;a++)if("ModeController"===e.device[e.device.interfaces[a]].controller){var r=e.device[e.device.interfaces[a]],n=r.capabilityResources.friendlyNames[0].value.text;if(e.exclude&&!e.exclude.includes(n)){for(var o=[],l=0;l<r.configuration.supportedModes.length;l++)o[r.configuration.supportedModes[l].value]=r.configuration.supportedModes[l].modeResources.friendlyNames[0].value.text;t[n]=o}}return t}return Object.keys(a()).map((function(r){return n.a.createElement(l.a,{key:r},n.a.createElement(c.a,{primary:r,key:r}),n.a.createElement(d.a,{disabled:e.disabled,className:t.select,displayEmpty:!0,value:e.device[r].mode.value?e.device[r].mode.value:"",onChange:function(t){return function(t,a,r){e.device[a].directive("SetMode",{mode:r})}(0,r,t.target.value)}},Object.keys(a()[r]).map((function(e){return n.a.createElement(i.a,{key:e,value:e},a()[r][e])}))))}))}u.defaultProps={exclude:[],disabled:!1}},209:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return i}));var r=a(0),n=a.n(r),o=a(29),l=a(332),c=Object(o.a)((function(e){return{off:{marginLeft:4,marginRight:8},on:{marginLeft:4,marginRight:8,"&:hover":{backgroundColor:e.palette.primary.light},backgroundColor:e.palette.primary.main,color:e.palette.primary.contrastText}}}));function i(e){var t=c();return n.a.createElement(l.a,{size:"small",className:t[e.buttonState],onClick:e.onClick,disabled:e.disabled},"on"===e.buttonState?e.onIcon:e.offIcon)}},219:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return S}));var r=a(6),n=a(0),o=a.n(n),l=a(54),c=a(29),i=a(23),d=a(53),s=a(344),u=a(357),p=a(336),m=a.n(p),f=a(703),v=a.n(f),b=a(704),h=a.n(b),g=a(148),y=a(24),k=a(209),C=a(166),x=a(351),O=a(323),w=Object(c.a)((function(e){return{titleBar:{width:"100%",color:e.palette.primary.contrastText,backgroundColor:"#444"},select:{minWidth:"50%"},titleText:{fontSize:18,fontWeight:700,flexGrow:1},cardline:{padding:"8px 16px 8px 16px",display:"flex"},nodetail:{padding:"8px 16px 8px 16px",display:"flex"},minLI:{minHeight:48,display:"flex",alignItems:"center"}}}));function S(e){var t=w(),a=Object(n.useContext)(l.DataContext).getModes,c=Object(n.useState)(e.device.SpeakerController.mute.value),p=Object(r.a)(c,2),f=p[0],b=p[1],S=Object(n.useState)("ON"===e.device.PowerController.powerState.value),j=Object(r.a)(S,2),E=j[0],I=j[1];function N(){for(var t=0;t<e.device.interfaces.length;t++)if("ModeController"===e.device[e.device.interfaces[t]].controller){var a=e.device[e.device.interfaces[t]];if("InputLock"===a.capabilityResources.friendlyNames[0].value.text)return a.mode.value}return null}return o.a.createElement(o.a.Fragment,null,o.a.createElement(y.default,{wide:e.wide},o.a.createElement(i.a,{className:t.cardline},o.a.createElement(s.a,{onClick:function(){return I(!E)}},o.a.createElement(m.a,null)),E&&"OFF"!==e.device.PowerController.powerState.value?o.a.createElement(d.a,{onClick:function(){return I(!E)},primary:e.device.friendlyName,className:t.minLI}):o.a.createElement(d.a,{onClick:function(){return I(!E)},primary:e.device.friendlyName,secondary:"OFF"===e.device.PowerController.powerState.value?"Off":e.device.InputController.input.value?e.device.SpeakerController.volume.value+"% / "+e.device.InputController.input.value+" / "+function(){var t=a(e.device).Surround;return t.hasOwnProperty(e.device.Surround.mode.value)?t[e.device.Surround.mode.value]:""}():null}),o.a.createElement(u.a,{color:"primary",checked:"ON"===e.device.PowerController.powerState.value,onChange:function(t){return a=t,void e.device.PowerController.directive(a.target.checked?"TurnOn":"TurnOff");var a}})),E&&o.a.createElement(o.a.Fragment,null,o.a.createElement(g.default,{avatarClick:function(){return t=!e.device.SpeakerController.mute.value,b(t),void e.device.SpeakerController.directive("SetVolume",{mute:!f});var t},avatarState:"ON"===e.device.PowerController.powerState.value?"on":"off",name:"Volume",min:0,max:100,defaultValue:0,step:1,value:e.device.SpeakerController.volume.value,disabled:"OFF"===e.device.PowerController.powerState.value,minWidth:240,change:function(t){e.device.SpeakerController.directive("SetVolume",{volume:t})}}),o.a.createElement(i.a,null,o.a.createElement(d.a,{primary:"Input"}),N()&&o.a.createElement(k.default,{buttonState:"InputLock.Locked"===N()?"on":"off",disabled:"ON"!==e.device.PowerController.powerState.value,onIcon:o.a.createElement(v.a,{fontSize:"small"}),offIcon:o.a.createElement(h.a,{fontSize:"small"}),onClick:function(t){return function(t,a){console.log(t,a);for(var r=0;r<e.device.interfaces.length;r++)if("ModeController"===e.device[e.device.interfaces[r]].controller){var n=e.device[e.device.interfaces[r]];"InputLock"===n.capabilityResources.friendlyNames[0].value.text&&n.directive("SetMode",{mode:a})}}(t,"InputLock.Locked"===N()?"InputLock.Unlocked":"InputLock.Locked")}}),o.a.createElement(O.a,{disabled:"ON"!==e.device.PowerController.powerState.value,className:t.select,displayEmpty:!0,value:e.device.InputController.input.value?e.device.InputController.input.value:"",onChange:function(t){return a=t.target.value,void e.device.InputController.directive("SelectInput",{input:a});var a}},function(){var t=[];if(e.device.InputController.hasOwnProperty("inputs"))for(var a=0;a<e.device.InputController.inputs.length;a++)t.push(e.device.InputController.inputs[a].name);return t}().map((function(e){return o.a.createElement(x.a,{key:e,value:e},e)})))),o.a.createElement(C.default,{disabled:"ON"!==e.device.PowerController.powerState.value,device:e.device,exclude:["InputLock"]}))))}},332:function(e,t,a){"use strict";var r=a(1),n=a(2),o=a(0),l=a.n(o),c=(a(5),a(3)),i=a(4),d=a(13),s=a(83),u=a(7),p=l.a.forwardRef((function(e,t){var a=e.edge,o=void 0!==a&&a,i=e.children,d=e.classes,p=e.className,m=e.color,f=void 0===m?"default":m,v=e.disabled,b=void 0!==v&&v,h=e.disableFocusRipple,g=void 0!==h&&h,y=e.size,k=void 0===y?"medium":y,C=Object(n.a)(e,["edge","children","classes","className","color","disabled","disableFocusRipple","size"]);return l.a.createElement(s.a,Object(r.a)({className:Object(c.a)(d.root,p,"default"!==f&&d["color".concat(Object(u.a)(f))],b&&d.disabled,{small:d["size".concat(Object(u.a)(k))]}[k],{start:d.edgeStart,end:d.edgeEnd}[o]),centerRipple:!0,focusRipple:!g,disabled:b,ref:t},C),l.a.createElement("span",{className:d.label},i))}));t.a=Object(i.a)((function(e){return{root:{textAlign:"center",flex:"0 0 auto",fontSize:e.typography.pxToRem(24),padding:12,borderRadius:"50%",overflow:"visible",color:e.palette.action.active,transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{backgroundColor:Object(d.c)(e.palette.action.active,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"&$disabled":{backgroundColor:"transparent",color:e.palette.action.disabled}},edgeStart:{marginLeft:-12,"$sizeSmall&":{marginLeft:-3}},edgeEnd:{marginRight:-12,"$sizeSmall&":{marginRight:-3}},colorInherit:{color:"inherit"},colorPrimary:{color:e.palette.primary.main,"&:hover":{backgroundColor:Object(d.c)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},colorSecondary:{color:e.palette.secondary.main,"&:hover":{backgroundColor:Object(d.c)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},disabled:{},sizeSmall:{padding:3,fontSize:e.typography.pxToRem(18)},label:{width:"100%",display:"flex",alignItems:"inherit",justifyContent:"inherit"}}}),{name:"MuiIconButton"})(p)},336:function(e,t,a){"use strict";var r=a(37);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(a(0)),o=(0,r(a(48)).default)(n.default.createElement(n.default.Fragment,null,n.default.createElement("path",{d:"M18.2 1H9.8C8.81 1 8 1.81 8 2.8v14.4c0 .99.81 1.79 1.8 1.79l8.4.01c.99 0 1.8-.81 1.8-1.8V2.8c0-.99-.81-1.8-1.8-1.8zM14 3c1.1 0 2 .89 2 2s-.9 2-2 2-2-.89-2-2 .9-2 2-2zm0 13.5c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"}),n.default.createElement("circle",{cx:"14",cy:"12.5",r:"2.5"}),n.default.createElement("path",{d:"M6 5H4v16c0 1.1.89 2 2 2h10v-2H6V5z"})),"SpeakerGroup");t.default=o},344:function(e,t,a){"use strict";var r=a(1),n=a(2),o=a(0),l=a.n(o),c=(a(5),a(3)),i=a(4),d=a(17),s=l.a.forwardRef((function(e,t){var a=e.classes,o=e.className,i=Object(n.a)(e,["classes","className"]),s=l.a.useContext(d.a);return l.a.createElement("div",Object(r.a)({className:Object(c.a)(a.root,o,"flex-start"===s.alignItems&&a.alignItemsFlexStart),ref:t},i))}));t.a=Object(i.a)((function(e){return{root:{minWidth:56,color:e.palette.action.active,flexShrink:0,display:"inline-flex"},alignItemsFlexStart:{marginTop:8}}}),{name:"MuiListItemIcon"})(s)},351:function(e,t,a){"use strict";var r=a(2),n=a(22),o=a(1),l=a(0),c=a.n(l),i=(a(5),a(3)),d=a(4),s=a(23),u=c.a.forwardRef((function(e,t){var a,n=e.classes,l=e.className,d=e.component,u=void 0===d?"li":d,p=e.disableGutters,m=void 0!==p&&p,f=e.role,v=void 0===f?"menuitem":f,b=e.selected,h=e.tabIndex,g=Object(r.a)(e,["classes","className","component","disableGutters","role","selected","tabIndex"]);return e.disabled||(a=void 0!==h?h:-1),c.a.createElement(s.a,Object(o.a)({button:!0,role:v,tabIndex:a,component:u,selected:b,disableGutters:m,classes:{dense:n.dense},className:Object(i.a)(n.root,l,b&&n.selected,!m&&n.gutters),ref:t},g))}));t.a=Object(d.a)((function(e){return{root:Object(o.a)({},e.typography.body1,Object(n.a)({minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",width:"auto",overflow:"hidden",whiteSpace:"nowrap"},e.breakpoints.up("sm"),{minHeight:"auto"})),gutters:{},selected:{},dense:Object(o.a)({},e.typography.body2,{minHeight:"auto"})}}),{name:"MuiMenuItem"})(u)},357:function(e,t,a){"use strict";var r=a(1),n=a(2),o=a(0),l=a.n(o),c=(a(5),a(3)),i=a(4),d=a(13),s=a(7),u=a(18),p=a(332),m=l.a.forwardRef((function(e,t){var a=e.autoFocus,o=e.checked,i=e.checkedIcon,d=e.classes,s=e.className,m=e.defaultChecked,f=e.disabled,v=e.icon,b=e.id,h=e.inputProps,g=e.inputRef,y=e.name,k=e.onBlur,C=e.onChange,x=e.onFocus,O=e.readOnly,w=e.required,S=e.tabIndex,j=e.type,E=e.value,I=Object(n.a)(e,["autoFocus","checked","checkedIcon","classes","className","defaultChecked","disabled","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"]),N=l.a.useRef(null!=o).current,z=l.a.useState(Boolean(m)),R=z[0],L=z[1],M=N?o:R,P=Object(u.a)(),$=f;P&&"undefined"===typeof $&&($=P.disabled);var F="checkbox"===j||"radio"===j;return l.a.createElement(p.a,Object(r.a)({component:"span",className:Object(c.a)(d.root,s,M&&d.checked,$&&d.disabled),disabled:$,tabIndex:null,role:void 0,onFocus:function(e){x&&x(e),P&&P.onFocus&&P.onFocus(e)},onBlur:function(e){k&&k(e),P&&P.onBlur&&P.onBlur(e)},ref:t},I),l.a.createElement("input",Object(r.a)({autoFocus:a,checked:o,defaultChecked:m,className:d.input,disabled:$,id:F&&b,name:y,onChange:function(e){var t=e.target.checked;N||L(t),C&&C(e,t)},readOnly:O,ref:g,required:w,tabIndex:S,type:j,value:E},h)),M?i:v)})),f=Object(i.a)({root:{padding:9},checked:{},disabled:{},input:{cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}},{name:"PrivateSwitchBase"})(m),v=l.a.forwardRef((function(e,t){var a=e.classes,o=e.className,i=e.color,d=void 0===i?"secondary":i,u=e.disabled,p=void 0!==u&&u,m=e.edge,v=void 0!==m&&m,b=e.size,h=void 0===b?"medium":b,g=Object(n.a)(e,["classes","className","color","disabled","edge","size"]),y=l.a.createElement("span",{className:a.thumb});return l.a.createElement("span",{className:Object(c.a)(a.root,o,{start:a.edgeStart,end:a.edgeEnd}[v],{small:a["size".concat(Object(s.a)(h))]}[h])},l.a.createElement(f,Object(r.a)({type:"checkbox",icon:y,checkedIcon:y,classes:{root:Object(c.a)(a.switchBase,a["color".concat(Object(s.a)(d))]),input:a.input,checked:a.checked,disabled:a.disabled},ref:t,disabled:p},g)),l.a.createElement("span",{className:a.track}))}));t.a=Object(i.a)((function(e){return{root:{display:"inline-flex",width:58,height:38,overflow:"hidden",padding:12,boxSizing:"border-box",position:"relative",flexShrink:0,zIndex:0,verticalAlign:"middle"},edgeStart:{marginLeft:-8},edgeEnd:{marginRight:-8},switchBase:{position:"absolute",top:0,left:0,zIndex:1,color:"light"===e.palette.type?e.palette.grey[50]:e.palette.grey[400],transition:e.transitions.create(["left","transform"],{duration:e.transitions.duration.shortest}),"&$checked":{transform:"translateX(20px)"},"&$disabled":{color:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[800]},"&$checked + $track":{opacity:.5},"&$disabled + $track":{opacity:"light"===e.palette.type?.12:.1}},colorPrimary:{"&$checked":{color:e.palette.primary.main,"&:hover":{backgroundColor:Object(d.c)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[800]},"&$checked + $track":{backgroundColor:e.palette.primary.main},"&$disabled + $track":{backgroundColor:"light"===e.palette.type?e.palette.common.black:e.palette.common.white}},colorSecondary:{"&$checked":{color:e.palette.secondary.main,"&:hover":{backgroundColor:Object(d.c)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[800]},"&$checked + $track":{backgroundColor:e.palette.secondary.main},"&$disabled + $track":{backgroundColor:"light"===e.palette.type?e.palette.common.black:e.palette.common.white}},sizeSmall:{width:40,height:24,padding:7,"& $thumb":{width:16,height:16},"& $switchBase":{padding:4,"&$checked":{transform:"translateX(16px)"}}},checked:{},disabled:{},input:{left:"-100%",width:"300%"},thumb:{boxShadow:e.shadows[1],backgroundColor:"currentColor",width:20,height:20,borderRadius:"50%"},track:{height:"100%",width:"100%",borderRadius:7,zIndex:-1,transition:e.transitions.create(["opacity","background-color"],{duration:e.transitions.duration.shortest}),backgroundColor:"light"===e.palette.type?e.palette.common.black:e.palette.common.white,opacity:"light"===e.palette.type?.38:.3}}}),{name:"MuiSwitch"})(v)},703:function(e,t,a){"use strict";var r=a(37);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(a(0)),o=(0,r(a(48)).default)(n.default.createElement("path",{d:"M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"}),"Lock");t.default=o},704:function(e,t,a){"use strict";var r=a(37);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(a(0)),o=(0,r(a(48)).default)(n.default.createElement("path",{d:"M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"}),"LockOpen");t.default=o}}]);
//# sourceMappingURL=18.877537db.chunk.js.map