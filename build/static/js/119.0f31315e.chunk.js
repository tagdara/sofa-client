(this["webpackJsonpsofa-client"]=this["webpackJsonpsofa-client"]||[]).push([[119],{268:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(38),i=n(335),c=n(2),s=n(24),l=n(1),u=(n(5),n(3)),d=n(4),f=n(91),b=n(8),m=n.n(b),p=n(13),g=n(9),v=n(29),O=n(23);function j(e){return e.substring(2).toLowerCase()}var h=o.a.forwardRef((function(e,t){var n=e.children,a=e.mouseEvent,r=void 0===a?"onClick":a,i=e.touchEvent,c=void 0===i?"onTouchEnd":i,s=e.onClickAway,l=o.a.useRef(!1),u=o.a.useRef(null),d=o.a.useRef(!1);o.a.useEffect((function(){return d.current=!0,function(){d.current=!1}}),[]);var f=Object(g.a)(u,t),b=o.a.useCallback((function(e){Object(v.a)(f,m.a.findDOMNode(e))}),[f]),h=Object(g.a)(n.ref,b),E=Object(O.a)((function(e){if(d.current)if(l.current)l.current=!1;else if(u.current){var t=Object(p.a)(u.current);t.documentElement&&t.documentElement.contains(e.target)&&!u.current.contains(e.target)&&s(e)}})),k=o.a.useCallback((function(){l.current=!0}),[]);return o.a.useEffect((function(){if(!1!==c){var e=j(c),t=Object(p.a)(u.current);return t.addEventListener(e,E),t.addEventListener("touchmove",k),function(){t.removeEventListener(e,E),t.removeEventListener("touchmove",k)}}}),[E,k,c]),o.a.useEffect((function(){if(!1!==r){var e=j(r),t=Object(p.a)(u.current);return t.addEventListener(e,E),function(){t.removeEventListener(e,E)}}}),[E,r]),o.a.createElement(o.a.Fragment,null,o.a.cloneElement(n,{ref:h}))})),E=n(7),k=n(53),C=n(325),y=n(285),x=n(15),w=o.a.forwardRef((function(e,t){var n=e.action,a=e.classes,r=e.className,i=e.message,s=e.role,d=void 0===s?"alert":s,f=Object(c.a)(e,["action","classes","className","message","role"]);return o.a.createElement(y.a,Object(l.a)({role:d,square:!0,elevation:6,className:Object(u.a)(a.root,r),ref:t},f),o.a.createElement("div",{className:a.message},i),n?o.a.createElement("div",{className:a.action},n):null)})),L=Object(d.a)((function(e){var t="light"===e.palette.type?.8:.98,n=Object(x.b)(e.palette.background.default,t);return{root:Object(l.a)({},e.typography.body2,Object(s.a)({color:e.palette.getContrastText(n),backgroundColor:n,display:"flex",alignItems:"center",flexWrap:"wrap",padding:"6px 16px",borderRadius:e.shape.borderRadius,flexGrow:1},e.breakpoints.up("sm"),{flexGrow:"initial",minWidth:288})),message:{padding:"8px 0"},action:{display:"flex",alignItems:"center",marginLeft:"auto",paddingLeft:16,marginRight:-8}}}),{name:"MuiSnackbarContent"})(w),R=o.a.forwardRef((function(e,t){var n=e.action,a=e.anchorOrigin,r=(a=void 0===a?{vertical:"bottom",horizontal:"center"}:a).vertical,i=a.horizontal,s=e.autoHideDuration,d=void 0===s?null:s,b=e.children,m=e.classes,p=e.className,g=e.ClickAwayListenerProps,v=e.ContentProps,j=e.disableWindowBlurListener,y=void 0!==j&&j,x=e.message,w=e.onClose,R=e.onEnter,T=e.onEntered,z=e.onEntering,N=e.onExit,S=e.onExited,M=e.onExiting,P=e.onMouseEnter,B=e.onMouseLeave,D=e.open,I=e.resumeHideDuration,A=e.TransitionComponent,H=void 0===A?C.a:A,W=e.transitionDuration,F=void 0===W?{enter:f.b.enteringScreen,exit:f.b.leavingScreen}:W,$=e.TransitionProps,G=Object(c.a)(e,["action","anchorOrigin","autoHideDuration","children","classes","className","ClickAwayListenerProps","ContentProps","disableWindowBlurListener","message","onClose","onEnter","onEntered","onEntering","onExit","onExited","onExiting","onMouseEnter","onMouseLeave","open","resumeHideDuration","TransitionComponent","transitionDuration","TransitionProps"]),J=o.a.useRef(),_=o.a.useState(!0),q=_[0],X=_[1],K=Object(O.a)((function(){w&&w.apply(void 0,arguments)})),Q=Object(O.a)((function(e){w&&null!=e&&(clearTimeout(J.current),J.current=setTimeout((function(){K(null,"timeout")}),e))}));o.a.useEffect((function(){return D&&Q(d),function(){clearTimeout(J.current)}}),[D,d,Q]);var U=function(){clearTimeout(J.current)},V=o.a.useCallback((function(){null!=d&&Q(null!=I?I:.5*d)}),[d,I,Q]);return o.a.useEffect((function(){if(!y&&D)return window.addEventListener("focus",V),window.addEventListener("blur",U),function(){window.removeEventListener("focus",V),window.removeEventListener("blur",U)}}),[y,V,D]),!D&&q?null:o.a.createElement(h,Object(l.a)({onClickAway:function(e){w&&w(e,"clickaway")}},g),o.a.createElement("div",Object(l.a)({className:Object(u.a)(m.root,m["anchorOrigin".concat(Object(E.a)(r)).concat(Object(E.a)(i))],p),onMouseEnter:function(e){P&&P(e),U()},onMouseLeave:function(e){B&&B(e),V()},ref:t},G),o.a.createElement(H,Object(l.a)({appear:!0,in:D,onEnter:Object(k.a)((function(){X(!1)}),R),onEntered:T,onEntering:z,onExit:N,onExited:Object(k.a)((function(){X(!0)}),S),onExiting:M,timeout:F,direction:"top"===r?"down":"up"},$),b||o.a.createElement(L,Object(l.a)({message:x,action:n},v)))))})),T=Object(d.a)((function(e){var t={top:8},n={bottom:8},a={justifyContent:"flex-end"},o={justifyContent:"flex-start"},r={top:24},i={bottom:24},c={right:24},u={left:24},d={left:"50%",right:"auto",transform:"translateX(-50%)"};return{root:{zIndex:e.zIndex.snackbar,position:"fixed",display:"flex",left:8,right:8,justifyContent:"center",alignItems:"center"},anchorOriginTopCenter:Object(l.a)({},t,Object(s.a)({},e.breakpoints.up("sm"),Object(l.a)({},r,{},d))),anchorOriginBottomCenter:Object(l.a)({},n,Object(s.a)({},e.breakpoints.up("sm"),Object(l.a)({},i,{},d))),anchorOriginTopRight:Object(l.a)({},t,{},a,Object(s.a)({},e.breakpoints.up("sm"),Object(l.a)({left:"auto"},r,{},c))),anchorOriginBottomRight:Object(l.a)({},n,{},a,Object(s.a)({},e.breakpoints.up("sm"),Object(l.a)({left:"auto"},i,{},c))),anchorOriginTopLeft:Object(l.a)({},t,{},o,Object(s.a)({},e.breakpoints.up("sm"),Object(l.a)({right:"auto"},r,{},u))),anchorOriginBottomLeft:Object(l.a)({},n,{},o,Object(s.a)({},e.breakpoints.up("sm"),Object(l.a)({right:"auto"},i,{},u)))}}),{flip:!1,name:"MuiSnackbar"})(R),z=n(333),N=n.n(z);n.d(t,"default",(function(){return M}));var S=Object(r.a)((function(e){return{snackBar:{marginBottom:"env(safe-area-inset-bottom)"}}}));function M(e){var t=S();return o.a.createElement(T,{className:t.snackbar,anchorOrigin:{vertical:"bottom",horizontal:"right"},open:e.open,onClose:e.close,autoHideDuration:e.duration,message:o.a.createElement("span",{id:"snackbar"},e.message),action:[o.a.createElement(i.a,{key:"close","aria-label":"Close",color:"inherit",onClick:e.close},o.a.createElement(N.a,null))]})}M.defaultProps={duration:1e4}},333:function(e,t,n){"use strict";var a=n(39);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=a(n(0)),r=(0,a(n(51)).default)(o.default.createElement("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close");t.default=r},335:function(e,t,n){"use strict";var a=n(1),o=n(2),r=n(0),i=n.n(r),c=(n(5),n(3)),s=n(4),l=n(15),u=n(86),d=n(7),f=i.a.forwardRef((function(e,t){var n=e.edge,r=void 0!==n&&n,s=e.children,l=e.classes,f=e.className,b=e.color,m=void 0===b?"default":b,p=e.disabled,g=void 0!==p&&p,v=e.disableFocusRipple,O=void 0!==v&&v,j=e.size,h=void 0===j?"medium":j,E=Object(o.a)(e,["edge","children","classes","className","color","disabled","disableFocusRipple","size"]);return i.a.createElement(u.a,Object(a.a)({className:Object(c.a)(l.root,f,"default"!==m&&l["color".concat(Object(d.a)(m))],g&&l.disabled,{small:l["size".concat(Object(d.a)(h))]}[h],{start:l.edgeStart,end:l.edgeEnd}[r]),centerRipple:!0,focusRipple:!O,disabled:g,ref:t},E),i.a.createElement("span",{className:l.label},s))}));t.a=Object(s.a)((function(e){return{root:{textAlign:"center",flex:"0 0 auto",fontSize:e.typography.pxToRem(24),padding:12,borderRadius:"50%",overflow:"visible",color:e.palette.action.active,transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{backgroundColor:Object(l.c)(e.palette.action.active,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"&$disabled":{backgroundColor:"transparent",color:e.palette.action.disabled}},edgeStart:{marginLeft:-12,"$sizeSmall&":{marginLeft:-3}},edgeEnd:{marginRight:-12,"$sizeSmall&":{marginRight:-3}},colorInherit:{color:"inherit"},colorPrimary:{color:e.palette.primary.main,"&:hover":{backgroundColor:Object(l.c)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},colorSecondary:{color:e.palette.secondary.main,"&:hover":{backgroundColor:Object(l.c)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},disabled:{},sizeSmall:{padding:3,fontSize:e.typography.pxToRem(18)},label:{width:"100%",display:"flex",alignItems:"inherit",justifyContent:"inherit"}}}),{name:"MuiIconButton"})(f)}}]);
//# sourceMappingURL=119.0f31315e.chunk.js.map