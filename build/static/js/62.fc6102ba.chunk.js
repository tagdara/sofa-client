(this["webpackJsonpsofa-client"]=this["webpackJsonpsofa-client"]||[]).push([[62,161,164],{111:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(74);function i(e){return r.a.createElement(l.a,e,r.a.createElement("path",{d:"M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"}))}i.muiName="SvgIcon",t.default=i},113:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return u}));var n=a(6),r=a(0),l=a.n(r),i=a(29),o=a(47),c=a(747),s=Object(i.a)({half:{alignItems:"center",display:"flex",height:42,flexGrow:1,flexBasis:0,boxSizing:"border-box"},stack:{height:"auto",display:"flex",flexGrow:1,justifyContent:"space-between",flexWrap:"wrap",width:"100%",boxSizing:"border-box",marginRight:8,overflowX:"hidden",overflowY:"hidden",alignItems:"center",paddingRight:8},padLeft:{paddingLeft:16},slider:{margin:"-18px"}});function u(e){var t=s(),a=Object(r.useState)(0),i=Object(n.a)(a,2),u=i[0],d=i[1];return Object(r.useEffect)((function(){e.value&&d(e.value)}),[e.value]),l.a.createElement("div",{style:{minWidth:e.minWidth},className:e.padLeft?t.stack+" "+t.padLeft:e.half?t.half:t.stack},e.name?l.a.createElement(o.a,{variant:e.smallText?"caption":"subtitle1",className:t.stackLabel},e.name):null,e.unit?l.a.createElement(o.a,{variant:"caption",className:t.stackLabel},Array.isArray(u)?Math.floor(u[0])+" - "+Math.floor(u[1])+e.unit:Math.floor(u)+e.unit):null,l.a.createElement(c.a,{value:u,step:e.step,min:e.min,max:e.max,onChange:function(t,a){d(a),e.preChange&&e.preChange(a)},onChangeCommitted:function(t,a){e.change(a)},disabled:e.disabled}))}u.defaultProps={name:"",unit:"",min:0,max:100,step:1,default:0,value:0,tabs:"",disabled:!1,padLeft:!1,half:!1,minWidth:240,smallText:!1}},149:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return h}));var n=a(6),r=a(0),l=a.n(r),i=a(29),o=a(332),c=a(345),s=a.n(c),u=a(388),d=a.n(u),f=a(359),m=Object(i.a)((function(e){return{baseOn:{height:48,width:48,boxSizing:"border-box",opacity:1,color:e.palette.dot.on},baseOff:{height:48,width:48,boxSizing:"border-box",opacity:1,color:e.palette.dot.off},onLine:{position:"absolute",right:"calc(50% + 6px)",top:"calc(50% - 1px)",height:2,background:e.palette.dot.on,width:"calc(100% - 13px)",display:"block",zIndex:-1,opacity:1},offLine:{position:"absolute",right:"calc(50% + 6px)",top:"calc(50% - 1px)",height:1,background:e.palette.dot.off,content:"",width:"calc(100% - 13px)",display:"block",zIndex:-1,opacity:1},selectedIcon:{height:24,width:24,zIndex:140},selectedZero:{height:20,width:20},zeroIcon:{margin:6,height:10,width:10,zIndex:40},smallIcon:{margin:8,height:8,width:8,zIndex:140,opacity:1},working:{margin:0}}}));function h(e){var t=m(),a=Object(r.useState)(e.level),i=Object(n.a)(a,2),c=i[0],u=i[1],h=Object(r.useState)(!1),v=Object(n.a)(h,2),p=v[0],g=v[1];return Object(r.useEffect)((function(){u(e.level),g(!1)}),[e.level]),l.a.createElement(l.a.Fragment,null,[0,1,2,3].map((function(a){return l.a.createElement(o.a,{key:a,onClick:function(){return function(t){g(!0),u(t),e.select(t)}(a)},className:c>0&&a<=c?t.baseOn:t.baseOff},0===a?l.a.createElement(l.a.Fragment,null,p&&a===c?l.a.createElement(f.a,{size:24,className:t.working}):l.a.createElement(d.a,{className:a===c?t.selectedZero:t.zeroIcon})):l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:a<=c?t.onLine:t.offLine}),p&&a===c?l.a.createElement(f.a,{size:24,className:t.working}):l.a.createElement(l.a.Fragment,null,a===c?l.a.createElement(s.a,{className:t.selectedIcon}):l.a.createElement(s.a,{style:{width:8+2*a,height:8+2*a,margin:0},className:t.smallIcon})),l.a.createElement("div",{style:{width:"calc(100% - "+(15-2*a)+"px)"},className:a<=c?t.onLine:t.offLine})))})))}},150:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return f}));var n=a(0),r=a.n(n),l=a(29),i=a(23),o=a(344),c=a(113),s=a(371),u=a.n(s),d=Object(l.a)({indent:{paddingLeft:40,paddingRight:8}});function f(e){var t=d();return r.a.createElement(i.a,null,r.a.createElement(o.a,{className:t.indent},r.a.createElement(u.a,null)),r.a.createElement(c.default,{name:"Brightness",smallText:!0,value:e.device.BrightnessController.brightness.value,unit:"%",min:0,max:100,step:10,change:function(t){e.device.BrightnessController.directive("SetBrightness",{brightness:t})},disabled:!e.device.PowerController.powerState.value}))}},151:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return f}));var n=a(0),r=a.n(n),l=a(29),i=a(23),o=a(344),c=a(113),s=a(372),u=a.n(s),d=Object(l.a)({indent:{paddingLeft:40,paddingRight:8}});function f(e){var t=d();return r.a.createElement(i.a,null,r.a.createElement(o.a,{className:t.indent},r.a.createElement(u.a,null)),r.a.createElement(c.default,{name:"Temperature",smallText:!0,unit:"\xb0",value:e.device.ColorTemperatureController.colorTemperatureInKelvin.value,min:2e3,max:7e3,step:100,change:function(t){e.device.ColorTemperatureController.directive("SetColorTemperature",{colorTemperatureInKelvin:t})},disabled:!e.powerState}))}},152:function(e,t,a){"use strict";a.r(t),a.d(t,"sl2sb",(function(){return p})),a.d(t,"sb2sl",(function(){return g})),a.d(t,"default",(function(){return b}));var n=a(6),r=a(0),l=a.n(r),i=a(29),o=a(23),c=a(344),s=a(285),u=a(375),d=a.n(u),f=a(345),m=a.n(f),h=a(390),v=Object(i.a)({wide:{width:"100%"},indent:{paddingLeft:40,paddingRight:8},button:{minWidth:24},revealIcon:{height:24,width:24,color:"FFE4B5"}}),p=function(e){e.h;var t=e.s,a=e.l,n={hue:e.h,saturation:0,brightness:0},r=t*(a<.5?a:1-a);return n.brightness=a+r,n.saturation=a>0?2*r/n.brightness:n.saturation,n},g=function(e){e.hue;var t=e.saturation,a=e.brightness,n={h:e.hue,s:0,l:0};return n.l=(2-t)*a/2,n.s=n.l&&n.l<1?t*a/(n.l<.5?2*n.l:2-2*n.l):n.s,n};function b(e){var t=v(),a={hue:43.5,saturation:.27,brightness:1},i=Object(r.useState)(a),u=Object(n.a)(i,2),f=u[0],b=u[1];return Object(r.useEffect)((function(){b(g(e.device.ColorController.color.value))}),[e.device.ColorController.color.value]),l.a.createElement(o.a,null,l.a.createElement(c.a,{className:t.indent},l.a.createElement(d.a,null)),l.a.createElement(h.HuePicker,{className:t.wide,color:f,onChangeComplete:function(t,a){b(t.hsl);var n=p(t.hsl);n.brightness=e.device.BrightnessController.brightness.value/100,e.device.ColorController.directive("SetColor",{color:n})}}),l.a.createElement(s.a,{size:"small",onClick:function(){return b(g(t=a)),t.brightness=e.device.BrightnessController.brightness.value/100,void e.device.ColorController.directive("SetColor",{color:t});var t},color:f===a?"primary":"default",className:t.button},l.a.createElement(m.a,{className:t.revealIcon})))}},159:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return E}));var n=a(6),r=a(0),l=a.n(r),i=a(29),o=a(55),c=a(23),s=a(53),u=a(357),d=a(111),f=a(404),m=a.n(f),h=a(150),v=a(151),p=a(152),g=a(24),b=Object(i.a)({iconSize:{height:24,width:24},stack:{height:44,display:"flex",flexGrow:1,paddingLeft:16,justifyContent:"space-between",flexWrap:"wrap"},tile:{display:"flex",flexGrow:1,height:90,paddingRight:8},sliderPaper:{display:"flex",flexDirection:"row",padding:"16 8 16 16",alignItems:"center"},nostack:{height:44,display:"flex",flexGrow:1,justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",maxWidth:480,minWidth:240,boxSizing:"border-box",marginRight:8},lightSwitch:{marginLeft:8},lightbar:{width:"100%",display:"flex",alignItems:"center",flexDirection:"column"},placeholder:{height:57,width:"100%"},listItem:{maxHeight:64,width:"100%"}});function E(e){var t=b(),a=Object(r.useState)(!1),i=Object(n.a)(a,2),f=i[0],E=i[1];function C(){try{return e.device.hasOwnProperty("EndpointHealth")?"OK"===e.device.EndpointHealth.connectivity.value.value:(console.log("no endpoint health",e.device),!0)}catch(t){return console.log("Error getting reachable state",t),!1}}return l.a.createElement(g.default,{nopaper:e.nopaper,xs:e.xs,thinmargin:e.thinmargin},l.a.createElement(c.a,{className:t.listItem},C()?l.a.createElement(o.default,{noback:!0,avatarState:"ON"===e.device.PowerController.powerState.value?"on":"off"},l.a.createElement(d.default,{className:t.iconSize})):l.a.createElement(o.default,{avatarState:"off"},l.a.createElement(m.a,{className:t.iconSize})),l.a.createElement(s.a,{onClick:function(){return E(!f)},primary:e.device.friendlyName,secondary:C()?"":"Off at switch"}),C()&&l.a.createElement(u.a,{color:"primary",className:t.lightSwitch,checked:"ON"===e.device.PowerController.powerState.value,onChange:function(t){t.target.checked?e.device.PowerController.directive("TurnOn"):e.device.PowerController.directive("TurnOff")}})),e.brightControl||f?e.device.hasOwnProperty("BrightnessController")?l.a.createElement(h.default,{device:e.device}):l.a.createElement(c.a,{className:t.placeholder}):null,e.tempControl||f?e.device.hasOwnProperty("ColorTemperatureController")?l.a.createElement(v.default,{device:e.device}):l.a.createElement(c.a,{className:t.placeholder}):null,e.colorControl||f?e.device.hasOwnProperty("ColorController")?l.a.createElement(p.default,{device:e.device}):l.a.createElement(c.a,{className:t.placeholder}):null)}E.defaultProps={nopaper:!1}},173:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return f}));var n=a(0),r=a.n(n),l=a(54),i=a(29),o=a(23),c=a(53),s=a(335),u=a(149),d=Object(i.a)({halves:{flexGrow:1,flexBasis:1,boxSizing:"border-box"}});function f(e){var t=d(),a=Object(n.useContext)(l.DataContext).deviceByEndpointId;return r.a.createElement(o.a,{className:t.areaListItem},r.a.createElement(c.a,{className:t.halves,onClick:function(){return e.selectArea(e.area.friendlyName)}},e.area.friendlyName," "),e.area.AreaController.shortcuts.value.length>0&&r.a.createElement(s.a,null,r.a.createElement(u.default,{half:!0,level:e.area.AreaController.shortcuts.value.includes(e.area.AreaController.scene.value)?e.area.AreaController.shortcuts.value.indexOf(e.area.AreaController.scene.value):0,select:function(t){a(e.area.AreaController.shortcuts.value[t]).SceneController.directive("Activate")}})))}},222:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return C}));var n=a(0),r=a.n(n),l=a(16),i=a(54),o=a(111),c=a(23),s=a(53),u=a(335),d=a(332),f=a(346),m=a.n(f),h=a(376),v=a.n(h),p=a(159),g=a(173),b=a(55),E=a(24);function C(e){var t=Object(n.useContext)(l.LayoutContext).applyLayoutCard,a=Object(n.useContext)(i.DataContext),f=a.deviceByEndpointId,h=a.lightCount,C=a.sortByName,x=a.area,w=h("on"),y=f("logic:area:"+x);function O(e){t("AreaLayout",{name:e})}return r.a.createElement(E.default,{wide:e.wide},h("all")?r.a.createElement(c.a,null,r.a.createElement(b.default,{noback:!0,avatarState:w?"on":"off",onClick:function(){return t("LightLayout")}},r.a.createElement(o.default,null)),r.a.createElement(s.a,{primary:w?w+" lights are on":"All lights off",onClick:function(){return t("LightLayout")}}),r.a.createElement(u.a,null,r.a.createElement(d.a,{onClick:function(e){return t("AreasLayout")}},r.a.createElement(m.a,null)))):r.a.createElement(c.a,null,r.a.createElement(b.default,{avatarState:"notready"},r.a.createElement(v.a,null)),r.a.createElement(s.a,{primary:"Waiting for light data"})),function(){var e=[];if(!x||void 0===y)return[];var t=y.AreaController.children.value;if(t)for(var a=0;a<t.length;a++){var n=f(t[a]);n&&n.displayCategories.includes("AREA")&&e.push(n)}return e}().map((function(e){return r.a.createElement(g.default,{area:e,key:e.endpointId,selectArea:O})})),function(){var e=[];if(!x||void 0===y)return[];var t=y.AreaController.children.value;if(t){for(var a=0;a<t.length;a++){var n=f(t[a]);n&&n.displayCategories.includes("LIGHT")&&e.push(n)}return C(e)}return e}().map((function(e){return r.a.createElement(p.default,{xs:12,nopaper:!0,thinmargin:!0,device:e,key:e.endpointId})})))}}}]);
//# sourceMappingURL=62.fc6102ba.chunk.js.map