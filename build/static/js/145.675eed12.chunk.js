(this["webpackJsonpsofa-client"]=this["webpackJsonpsofa-client"]||[]).push([[145,192],{156:function(e,t,n){"use strict";n.r(t);var a=n(314),i=n(118),r=Object(a.a)((function(e){return{input:{minWidth:"100px",borderRadius:4,position:"relative",backgroundColor:e.palette.background.paper,border:"1px solid #ced4da",fontSize:16,padding:"10px 26px 10px 12px",transition:e.transitions.create(["border-color","box-shadow"]),"&:focus":{borderRadius:4,borderColor:"#80bdff",boxShadow:"0 0 0 0.2rem rgba(0,123,255,.25)"}}}}))(i.a);t.default=r},180:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return v}));var a=n(7),i=n(0),r=n.n(i),o=n(32),c=n(42),d=n(25),s=n(156),l=n(40),u=n(396),m=n(361),p=Object(o.a)({flex:{display:"flex",height:72,alignItems:"center"},wideSelect:{width:"100%"}});function v(e){var t=p(),n=Object(i.useContext)(c.DeviceContext),o=n.directives,v=(0,n.deviceDirectives)(e.device);function b(t){var n=function(e,t){if(void 0!==e&&void 0!==t&&o.hasOwnProperty(e)&&o[e].hasOwnProperty(t)){var n=o[e][t];for(var a in n)return a}}(t.controller,t.directive);e.save(e.index,Object(a.a)({},e.item,{propertyName:n,controller:t.controller,command:t.directive,instance:t.instance,value:void 0}))}function f(t){try{if(void 0!==t.instance)return e.device.endpointId+t.instance+t.directive}catch(n){}return e.device.endpointId+t.directive}return void 0!==e.device?r.a.createElement(l.a,{item:!0,xs:e.wide?12:4,className:t.flex},r.a.createElement(d.a,null,r.a.createElement(m.a,{className:t.wideSelect,value:function(){for(var t=0;t<v.length;t++)if(v[t].instance===e.item.instance&&v[t].controller===e.item.controller&&v[t].directive===e.item.command)return v[t];return""}(),onChange:function(e){return b(e.target.value)},input:r.a.createElement(s.default,{name:"command",id:"command-select"})},v.map((function(e){return r.a.createElement(u.a,{key:f(e),value:e},e.instance?e.directive+"."+e.instance.split(".")[1]:e.directive)}))))):null}},396:function(e,t,n){"use strict";var a=n(2),i=n(33),r=n(1),o=n(0),c=n.n(o),d=(n(5),n(3)),s=n(4),l=n(25),u=c.a.forwardRef((function(e,t){var n,i=e.classes,o=e.className,s=e.component,u=void 0===s?"li":s,m=e.disableGutters,p=void 0!==m&&m,v=e.role,b=void 0===v?"menuitem":v,f=e.selected,h=e.tabIndex,x=Object(a.a)(e,["classes","className","component","disableGutters","role","selected","tabIndex"]);return e.disabled||(n=void 0!==h?h:-1),c.a.createElement(l.a,Object(r.a)({button:!0,role:b,tabIndex:n,component:u,selected:f,disableGutters:p,classes:{dense:i.dense},className:Object(d.a)(i.root,o,f&&i.selected,!p&&i.gutters),ref:t},x))}));t.a=Object(s.a)((function(e){return{root:Object(r.a)({},e.typography.body1,Object(i.a)({minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",width:"auto",overflow:"hidden",whiteSpace:"nowrap"},e.breakpoints.up("sm"),{minHeight:"auto"})),gutters:{},selected:{},dense:Object(r.a)({},e.typography.body2,{minHeight:"auto"})}}),{name:"MuiMenuItem"})(u)}}]);
//# sourceMappingURL=145.675eed12.chunk.js.map