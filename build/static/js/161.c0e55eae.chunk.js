(this["webpackJsonpsofa-client"]=this["webpackJsonpsofa-client"]||[]).push([[161,187],{121:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return b}));var n=a(6),r=a(0),o=a.n(r),i=a(32),c=a(16),l=a(41),u=a.n(l),d=a(40),m=a(115),s=a(25),p=a(59),f=Object(i.a)((function(e){return{base:{margin:1,overflowX:"hidden",alignContent:"start",padding:"3px !important",borderRadius:"4px 4px 4px 4px"},gridColumn:{overflowY:"hidden"},scrollColumn:{overflowY:"auto",maxHeight:"100%"},mobile:{height:16},desktop:{},background:{backgroundColor:e.palette.layer.section},center:{justifyContent:"center"}}}));function b(e){var t=Object(r.useContext)(c.LayoutContext).isMobile,a=f(),i=Object(r.useState)(e.show),l=Object(n.a)(i,2),b=l[0],E=l[1];return o.a.createElement(d.a,{container:!0,item:!0,spacing:1,key:e.name,xs:e.xs,className:u()(a.base,e.scroll?a.scrollColumn:a.gridColumn,e.background?a.background:null)},e.name&&o.a.createElement(d.a,{item:!0,xs:12,className:a.nopad},o.a.createElement(m.a,{className:a.nopad},o.a.createElement(s.a,{className:t?a.mobile:a.desktop},o.a.createElement(p.a,{primary:e.name,onClick:function(){return E(!b)}}),(!t||!e.break)&&o.a.createElement(o.a.Fragment,null,e.secondary)),t&&e.break&&o.a.createElement(s.a,{className:a.center},e.secondary))),b&&e.children)}b.defaultProps={break:!1,show:!0,scroll:!1,xs:12,background:!0}},281:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return C}));var n=a(6),r=a(0),o=a.n(r),i=a(42),c=a(32),l=a(314),u=a(117),d=a(25),m=a(27),s=a(396),p=a(361),f=a(118),b=a(319),E=a(479),h=a.n(E),g=(a(463),a(121)),y=a(743),k=Object(c.a)({dateEntry:{paddingRight:8,width:"20%"},timeEntry:{paddingRight:24,width:"20%"}}),v=Object(l.a)((function(e){return{input:{minWidth:"100px",borderRadius:4,position:"relative",backgroundColor:e.palette.background.paper,border:"1px solid #ced4da",fontSize:16,padding:"10px 26px 10px 12px",transition:e.transitions.create(["border-color","box-shadow"]),"&:focus":{borderRadius:4,borderColor:"#80bdff",boxShadow:"0 0 0 0.2rem rgba(0,123,255,.25)"}}}}))(f.a);function C(e){var t=k(),a=Object(r.useState)(e.device),c=Object(n.a)(a,2),l=c[0],f=c[1],E=Object(r.useState)("4h"),C=Object(n.a)(E,2),O=C[0],x=C[1],j=Object(r.useState)(h()().subtract(4,"day")),S=Object(n.a)(j,2),N=S[0],w=S[1],M=Object(r.useState)(N.format("YYYY-MM-DD")),Y=Object(n.a)(M,2),D=Y[0],R=Y[1],I=Object(r.useState)(N.format("HH:mm:ss")),P=Object(n.a)(I,2),A=P[0],z=P[1],H=Object(r.useState)(h()()),L=Object(n.a)(H,2),W=L[0],B=L[1],T=Object(r.useState)(W.format("YYYY-MM-DD")),F=Object(n.a)(T,2),J=F[0],G=F[1],K=Object(r.useState)(W.format("HH:mm:ss")),U=Object(n.a)(K,2),Q=U[0],X=U[1],_=Object(r.useState)([]),q=Object(n.a)(_,2),V=q[0],Z=q[1],$=Object(r.useContext)(i.DeviceContext),ee=$.deviceByEndpointId,te=$.devicesByController,ae=$.historyQuery,ne=te("TemperatureSensor"),re=h.a.tz.guess(),oe=window.innerWidth>1400?1400:window.innerWidth,ie=oe/2>500?500:oe/2;function ce(e,t){var a="SELECT ROUND(MEAN(temperature)) FROM controller_property WHERE time > '"+e.format()+"' AND temperature > -30 AND time < '"+t.format()+"' AND endpoint='"+l.endpointId+"' GROUP BY time("+O+") ORDER BY time ASC";ae(a).then((function(e){return Z(JSON.parse(e))}))}function le(e,t){var a=h()().subtract(e,t).format(),n=h()().format();w(a),B(n),ce(a,n)}console.log(N,W),Object(r.useEffect)((function(){console.log(V)}),[V]),Object(r.useEffect)((function(){var e=h()(D+" "+A);w(e)}),[A,D]),Object(r.useEffect)((function(){var e=h()(J+" "+Q);B(e)}),[Q,J]);return o.a.createElement(g.default,{name:e.device.friendlyName+" every "+O},o.a.createElement(m.default,{nopaper:!0,xs:12},o.a.createElement(d.a,null,o.a.createElement(p.a,{value:l.endpointId?l.endpointId:"",onChange:function(e){console.log("selected",e.target.value),f(ee(e.target.value))},input:o.a.createElement(v,{name:"input",id:"input"})},ne.map((function(e){return o.a.createElement(s.a,{key:e.endpointId,value:e.endpointId},e.friendlyName)})))),o.a.createElement(d.a,null,o.a.createElement(u.a,{className:t.dateEntry,variant:"outlined",onChange:function(e){return R(e.target.value)},id:"start",label:"Start",type:"date",value:D,InputLabelProps:{shrink:!0},inputProps:{step:300,style:{padding:10}}}),o.a.createElement(u.a,{className:t.timeEntry,variant:"outlined",onChange:function(e){return z(e.target.value)},id:"time",label:"Time",type:"time",value:A,InputLabelProps:{shrink:!0},inputProps:{step:300,style:{padding:10}}}),o.a.createElement(u.a,{className:t.dateEntry,variant:"outlined",onChange:function(e){return G(e.target.value)},id:"end",label:"End",type:"date",value:J,InputLabelProps:{shrink:!0},inputProps:{step:300,style:{padding:10}}}),o.a.createElement(u.a,{className:t.timeEntry,variant:"outlined",onChange:function(e){return X(e.target.value)},id:"endtime",label:"Time",type:"time",value:Q,InputLabelProps:{shrink:!0},inputProps:{step:300,style:{padding:10}}}),o.a.createElement(b.a,{onClick:function(){return ce(N,W)}},"Go")),o.a.createElement(d.a,null,o.a.createElement(b.a,{onClick:function(){return le(24,"hour")}},"24h"),o.a.createElement(b.a,{onClick:function(){return le(7,"day")}},"7d"),o.a.createElement(b.a,{onClick:function(){return le(14,"day")}},"14d"),o.a.createElement(b.a,{onClick:function(){return le(30,"day")}},"30d"),o.a.createElement(b.a,{onClick:function(){return le(90,"day")}},"90d")),o.a.createElement(d.a,null,o.a.createElement(b.a,{onClick:function(){return x("5s")}},"10m"),o.a.createElement(b.a,{onClick:function(){return x("1m")}},"10m"),o.a.createElement(b.a,{onClick:function(){return x("10m")}},"10m"),o.a.createElement(b.a,{onClick:function(){return x("30m")}},"30m"),o.a.createElement(b.a,{onClick:function(){return x("1h")}},"1h"),o.a.createElement(b.a,{onClick:function(){return x("4h")}},"4h"),o.a.createElement(b.a,{onClick:function(){return x("6h")}},"6h"))),V.length>0&&o.a.createElement(y.c,{width:oe,height:ie,data:V,margin:{top:16,right:16,left:8,bottom:16}},o.a.createElement(y.a,{vertical:!1}),o.a.createElement(y.e,{dataKey:"time",tickCount:10,scale:"time",type:"number",domain:["dataMin","dataMax"],tick:o.a.createElement((function(e){var t=e.x,a=e.y,n=e.payload;return o.a.createElement(o.a.Fragment,null,o.a.createElement(y.d,{x:t,y:a+8,fill:"#777",fontSize:10,textAnchor:"middle"},h.a.unix(n.value).tz(re).format("MMM D")),o.a.createElement(y.d,{x:t,y:a+20,fill:"#777",fontSize:10,textAnchor:"middle"},h.a.unix(n.value).tz(re).format("ha")))}),null)}),o.a.createElement(y.f,{type:"number",domain:[65,80],width:32}),o.a.createElement(y.b,{connectNulls:!0,type:"monotone",dataKey:"round",stroke:"#ff7300",dot:!0,strokeWidth:2})))}}}]);
//# sourceMappingURL=161.c0e55eae.chunk.js.map