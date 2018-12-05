(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{255:function(e,t,a){"use strict";var l=a(19);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=l(a(0)),r=(0,l(a(22)).default)(n.default.createElement(n.default.Fragment,null,n.default.createElement("path",{d:"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"}),n.default.createElement("path",{fill:"none",d:"M0 0h24v24H0z"})),"ChevronRight");t.default=r},290:function(e,t,a){"use strict";a.r(t);var l=a(0),n=a.n(l),r=a(1),o=a.n(r),c=a(3),i=a(40),u=a.n(i),d=a(94),s=a.n(d),p=a(32),m=a.n(p),f=a(28),h=a.n(f),y=a(20),v=a.n(y),b=a(6),g=a.n(b),C=a(7),E=a.n(C),k=a(31),N=a.n(k),w=a(9),S=a.n(w),T=a(41),x=a.n(T),P=a(21),z=a.n(P),O=a(155),I=a.n(O),B=a(255),_=a.n(B),j=a(39),M=a.n(j),D=a(34),A=a.n(D),H=a(525),K=a.n(H),R=a(528),V=a.n(R),L=a(527),$=a.n(L),F=a(186),U=a.n(F),W=a(37),J=a.n(W),q=a(38);function G(e){return(G="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function Q(e,t){for(var a=0;a<t.length;a++){var l=t[a];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}function X(e){return(X=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function Y(e,t){return(Y=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function Z(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function ee(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var te=function(e){function t(e){var a,l,n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),l=this,n=X(t).call(this,e),a=!n||"object"!==G(n)&&"function"!=typeof n?Z(l):n,ee(Z(Z(a)),"handlePowerChange",function(e){a.setState({powerState:e.target.checked,target:a.props.device.friendlyName}),e.target.checked?a.props.sendAlexaCommand(a.props.device.friendlyName,"","PowerController","TurnOn"):a.props.sendAlexaCommand(a.props.device.friendlyName,"","PowerController","TurnOff")}),ee(Z(Z(a)),"handlePreVolumeChange",function(e){a.setState({volume:e,target:a.props.name})}),ee(Z(Z(a)),"handleVolumeChange",function(e){a.props.sendAlexaCommand(a.props.device.friendlyName,"","SpeakerController","SetVolume",e)}),ee(Z(Z(a)),"handleMuteChange",function(e){a.props.sendAlexaCommand(a.props.device.friendlyName,"","SpeakerController","SetMute",!a.state.muted)}),ee(Z(Z(a)),"handleSurround",function(e){a.props.sendAlexaCommand(a.props.device.friendlyName,"","SurroundController","SetSurround",e)}),ee(Z(Z(a)),"handleInput",function(e,t){a.props.sendAlexaCommand(a.props.device.friendlyName,"","InputController","SelectInput",t)}),ee(Z(Z(a)),"processInputs",function(e){for(var t=[],l=[],n=0;n<e.length;n++)l.includes(e[n].uri)||(t.push(e[n]),l.push(e[n].uri));a.setState({inputs:t})}),a.state={powerState:!1,inputs:[]},a}var a,l,r;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&Y(e,t)}(t,n.a.Component),a=t,(l=[{key:"componentDidMount",value:function(){var e=this;fetch("/list/sonybravia/inputs").then(function(e){return e.json()}).then(function(t){return e.processInputs(t)})}},{key:"render",value:function(){var e=this,t=this.props,a=t.classes,l=t.deviceProperties;return n.a.createElement(q.default,{title:"TV",open:this.props.open,close:this.props.close},n.a.createElement(m.a,null,n.a.createElement(v.a,null,n.a.createElement(g.a,null,n.a.createElement(E.a,{primary:"Power"}),n.a.createElement(N.a,null,n.a.createElement(x.a,{color:"primary",checked:"ON"==this.props.deviceProperties.powerState,onChange:this.handlePowerChange}))),n.a.createElement(z.a,null),n.a.createElement(g.a,null,n.a.createElement(u.a,{variant:"subtitle1",noWrap:!0},"Input")),n.a.createElement(g.a,null,n.a.createElement("div",{className:a.chipLine},n.a.createElement(s.a,{key:"Android TV",label:"Android TV",className:"Android TV"==this.props.deviceProperties.input?a.hotchip:a.chip,onClick:function(t){return e.handleInput(t,"Home")}}),this.state.inputs.map(function(t){return n.a.createElement(s.a,{key:t.uri,label:t.label?t.label:t.title,className:l.input==t.label||l.input==t.title?a.hotchip:a.chip,onClick:function(a){return e.handleInput(a,t.uri)}})}))),n.a.createElement(z.a,null),n.a.createElement(g.a,null,n.a.createElement(u.a,{variant:"subtitle1",noWrap:!0},"Remote Control")),n.a.createElement(g.a,null,n.a.createElement(U.a,{cellHeight:80,className:a.gridList,cols:3},n.a.createElement(J.a,{cols:1}),n.a.createElement(J.a,{cols:1,className:a.gridButtonTile},n.a.createElement(S.a,{className:a.remoteButton},n.a.createElement(M.a,null))),n.a.createElement(J.a,{cols:1,className:a.gridButtonTile}),n.a.createElement(J.a,{cols:1,className:a.gridButtonTile},n.a.createElement(S.a,{className:a.remoteButton},n.a.createElement(I.a,null))),n.a.createElement(J.a,{cols:1,className:a.gridButtonTile},n.a.createElement(S.a,{className:a.remoteButton},n.a.createElement(K.a,null))),n.a.createElement(J.a,{cols:1,className:a.gridButtonTile},n.a.createElement(S.a,{className:a.remoteButton},n.a.createElement(_.a,null))),n.a.createElement(J.a,{cols:1,className:a.gridButtonTile}),n.a.createElement(J.a,{cols:1,className:a.gridButtonTile},n.a.createElement(S.a,{className:a.remoteButton},n.a.createElement(A.a,null))),n.a.createElement(J.a,{cols:1,className:a.gridButtonTile}),n.a.createElement(J.a,{cols:1,className:a.gridButtonTile},n.a.createElement(S.a,{className:a.remoteButton},n.a.createElement($.a,null))),n.a.createElement(J.a,{cols:1,className:a.gridButtonTile}),n.a.createElement(J.a,{cols:1,className:a.gridButtonTile},n.a.createElement(S.a,{className:a.remoteButton},n.a.createElement(V.a,null))))))),n.a.createElement(h.a,{className:a.dialogActions},n.a.createElement(S.a,{onClick:function(){return e.props.close()},color:"primary",autoFocus:!0},"OK")))}}])&&Q(a.prototype,l),r&&Q(a,r),t}();te.propTypes={classes:o.a.object.isRequired},t.default=Object(c.withStyles)(function(e){return{chip:{margin:e.spacing.unit},hotchip:{background:e.palette.primary.main,color:"white",margin:e.spacing.unit},chipLine:{width:"100%"},gridList:{maxWidth:320,margin:"0 auto !important",backgroundColor:e.palette.background.default},gridButtonTile:{display:"flex",alignItems:"center",justifyContent:"center"},remoteButton:{height:"100%"},dialogActions:{paddingBottom:"env(safe-area-inset-bottom)"}}})(te)},525:function(e,t,a){"use strict";var l=a(19);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=l(a(0)),r=(0,l(a(22)).default)(n.default.createElement(n.default.Fragment,null,n.default.createElement("path",{fill:"none",d:"M0 0h24v24H0z"}),n.default.createElement("path",{d:"M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"})),"Fullscreen");t.default=r},527:function(e,t,a){"use strict";var l=a(19);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=l(a(0)),r=(0,l(a(22)).default)(n.default.createElement(n.default.Fragment,null,n.default.createElement("path",{fill:"none",d:"M0 0h24v24H0z"}),n.default.createElement("path",{d:"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"})),"ArrowBack");t.default=r},528:function(e,t,a){"use strict";var l=a(19);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=l(a(0)),r=(0,l(a(22)).default)(n.default.createElement(n.default.Fragment,null,n.default.createElement("path",{d:"M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"}),n.default.createElement("path",{fill:"none",d:"M0 0h24v24H0z"})),"Home");t.default=r},553:function(e,t,a){"use strict";var l=a(2);Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.styles=void 0;var n=l(a(4)),r=l(a(11)),o=l(a(5)),c=l(a(14)),i=l(a(15)),u=l(a(16)),d=l(a(17)),s=l(a(18)),p=l(a(0)),m=(l(a(1)),l(a(8))),f=l(a(69)),h=(l(a(27)),l(a(554))),y=l(a(10)),v=a(70),b=(l(a(185)),a(33));a(260);var g=function(e){var t="light"===e.palette.type?e.palette.grey[300]:e.palette.grey[700],a=(0,v.fade)(e.palette.text.primary,.26);return{root:{fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(13),display:"inline-flex",alignItems:"center",justifyContent:"center",height:32,color:e.palette.getContrastText(t),backgroundColor:t,borderRadius:16,whiteSpace:"nowrap",transition:e.transitions.create(["background-color","box-shadow"]),cursor:"default",outline:"none",textDecoration:"none",border:"none",padding:0,verticalAlign:"middle"},colorPrimary:{backgroundColor:e.palette.primary.main,color:e.palette.primary.contrastText},colorSecondary:{backgroundColor:e.palette.secondary.main,color:e.palette.secondary.contrastText},clickable:{WebkitTapHighlightColor:"transparent",cursor:"pointer","&:hover, &:focus":{backgroundColor:(0,v.emphasize)(t,.08)},"&:active":{boxShadow:e.shadows[1],backgroundColor:(0,v.emphasize)(t,.12)}},clickableColorPrimary:{"&:hover, &:focus":{backgroundColor:(0,v.emphasize)(e.palette.primary.main,.08)},"&:active":{backgroundColor:(0,v.emphasize)(e.palette.primary.main,.12)}},clickableColorSecondary:{"&:hover, &:focus":{backgroundColor:(0,v.emphasize)(e.palette.secondary.main,.08)},"&:active":{backgroundColor:(0,v.emphasize)(e.palette.secondary.main,.12)}},deletable:{"&:focus":{backgroundColor:(0,v.emphasize)(t,.08)}},deletableColorPrimary:{"&:focus":{backgroundColor:(0,v.emphasize)(e.palette.primary.main,.2)}},deletableColorSecondary:{"&:focus":{backgroundColor:(0,v.emphasize)(e.palette.secondary.main,.2)}},outlined:{backgroundColor:"transparent",border:"1px solid ".concat("light"===e.palette.type?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)"),"$clickable&:hover, $clickable&:focus, $deletable&:focus":{backgroundColor:(0,v.fade)(e.palette.text.primary,e.palette.action.hoverOpacity)}},outlinedPrimary:{color:e.palette.primary.main,border:"1px solid ".concat(e.palette.primary.main),"$clickable&:hover, $clickable&:focus, $deletable&:focus":{backgroundColor:(0,v.fade)(e.palette.primary.main,e.palette.action.hoverOpacity)}},outlinedSecondary:{color:e.palette.secondary.main,border:"1px solid ".concat(e.palette.secondary.main),"$clickable&:hover, $clickable&:focus, $deletable&:focus":{backgroundColor:(0,v.fade)(e.palette.secondary.main,e.palette.action.hoverOpacity)}},avatar:{marginRight:-4,width:32,height:32,color:"light"===e.palette.type?e.palette.grey[700]:e.palette.grey[300],fontSize:e.typography.pxToRem(16)},avatarColorPrimary:{color:e.palette.primary.contrastText,backgroundColor:e.palette.primary.dark},avatarColorSecondary:{color:e.palette.secondary.contrastText,backgroundColor:e.palette.secondary.dark},avatarChildren:{width:19,height:19},icon:{color:"light"===e.palette.type?e.palette.grey[700]:e.palette.grey[300],marginLeft:4,marginRight:-8},iconColorPrimary:{color:"inherit"},iconColorSecondary:{color:"inherit"},label:{display:"flex",alignItems:"center",paddingLeft:12,paddingRight:12,userSelect:"none",whiteSpace:"nowrap",cursor:"inherit"},deleteIcon:{WebkitTapHighlightColor:"transparent",color:a,cursor:"pointer",height:"auto",margin:"0 4px 0 -8px","&:hover":{color:(0,v.fade)(a,.4)}},deleteIconColorPrimary:{color:(0,v.fade)(e.palette.primary.contrastText,.7),"&:hover, &:active":{color:e.palette.primary.contrastText}},deleteIconColorSecondary:{color:(0,v.fade)(e.palette.primary.contrastText,.7),"&:hover, &:active":{color:e.palette.primary.contrastText}},deleteIconOutlinedColorPrimary:{color:(0,v.fade)(e.palette.primary.main,.7),"&:hover, &:active":{color:e.palette.primary.main}},deleteIconOutlinedColorSecondary:{color:(0,v.fade)(e.palette.secondary.main,.7),"&:hover, &:active":{color:e.palette.secondary.main}}}};t.styles=g;var C=function(e){function t(){var e,a;(0,c.default)(this,t);for(var l=arguments.length,n=new Array(l),r=0;r<l;r++)n[r]=arguments[r];return(a=(0,u.default)(this,(e=(0,d.default)(t)).call.apply(e,[this].concat(n)))).handleDeleteIconClick=function(e){e.stopPropagation();var t=a.props.onDelete;t&&t(e)},a.handleKeyDown=function(e){var t=a.props.onKeyDown;if(t&&t(e),e.currentTarget===e.target){var l=(0,f.default)(e);"space"!==l&&"enter"!==l&&"backspace"!==l&&"esc"!==l||e.preventDefault()}},a.handleKeyUp=function(e){var t=a.props,l=t.onClick,n=t.onDelete,r=t.onKeyUp;if(r&&r(e),e.currentTarget===e.target){var o=(0,f.default)(e);!l||"space"!==o&&"enter"!==o?n&&"backspace"===o?n(e):"esc"===o&&a.chipRef&&a.chipRef.blur():l(e)}},a}return(0,s.default)(t,e),(0,i.default)(t,[{key:"render",value:function(){var e,t=this,a=this.props,l=a.avatar,c=a.classes,i=a.className,u=a.clickable,d=a.color,s=a.component,f=a.deleteIcon,y=a.icon,v=a.label,g=a.onClick,C=a.onDelete,E=(a.onKeyDown,a.onKeyUp,a.tabIndex),k=a.variant,N=(0,o.default)(a,["avatar","classes","className","clickable","color","component","deleteIcon","icon","label","onClick","onDelete","onKeyDown","onKeyUp","tabIndex","variant"]),w=!(!1===u||!g)||u,S=(0,m.default)(c.root,(e={},(0,r.default)(e,c["color".concat((0,b.capitalize)(d))],"default"!==d),(0,r.default)(e,c.clickable,w),(0,r.default)(e,c["clickableColor".concat((0,b.capitalize)(d))],w&&"default"!==d),(0,r.default)(e,c.deletable,C),(0,r.default)(e,c["deletableColor".concat((0,b.capitalize)(d))],C&&"default"!==d),(0,r.default)(e,c.outlined,"outlined"===k),(0,r.default)(e,c.outlinedPrimary,"outlined"===k&&"primary"===d),(0,r.default)(e,c.outlinedSecondary,"outlined"===k&&"secondary"===d),e),i),T=null;if(C){var x,P=(x={},(0,r.default)(x,c["deleteIconColor".concat((0,b.capitalize)(d))],"default"!==d&&"outlined"!==k),(0,r.default)(x,c["deleteIconOutlinedColor".concat((0,b.capitalize)(d))],"default"!==d&&"outlined"===k),x);T=f&&p.default.isValidElement(f)?p.default.cloneElement(f,{className:(0,m.default)(f.props.className,c.deleteIcon,P),onClick:this.handleDeleteIconClick}):p.default.createElement(h.default,{className:(0,m.default)(c.deleteIcon,P),onClick:this.handleDeleteIconClick})}var z=null;l&&p.default.isValidElement(l)&&(z=p.default.cloneElement(l,{className:(0,m.default)(c.avatar,l.props.className,(0,r.default)({},c["avatarColor".concat((0,b.capitalize)(d))],"default"!==d)),childrenClassName:(0,m.default)(c.avatarChildren,l.props.childrenClassName)}));var O=null;y&&p.default.isValidElement(y)&&(O=p.default.cloneElement(y,{className:(0,m.default)(c.icon,y.props.className,(0,r.default)({},c["iconColor".concat((0,b.capitalize)(d))],"default"!==d))}));var I=E;return I||(I=g||C||w?0:-1),p.default.createElement(s,(0,n.default)({role:"button",className:S,tabIndex:I,onClick:g,onKeyDown:this.handleKeyDown,onKeyUp:this.handleKeyUp,ref:function(e){t.chipRef=e}},N),z||O,p.default.createElement("span",{className:c.label},v),T)}}]),t}(p.default.Component);C.propTypes={},C.defaultProps={component:"div",color:"default",variant:"default"};var E=(0,y.default)(g,{name:"MuiChip"})(C);t.default=E},554:function(e,t,a){"use strict";var l=a(2);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=l(a(0)),r=l(a(92)),o=l(a(76)),c=n.default.createElement("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"}),i=function(e){return n.default.createElement(o.default,e,c)};(i=(0,r.default)(i)).muiName="SvgIcon";var u=i;t.default=u},94:function(e,t,a){"use strict";var l=a(2);Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return n.default}});var n=l(a(553))}}]);