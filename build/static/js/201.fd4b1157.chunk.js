(this["webpackJsonpsofa-client"]=this["webpackJsonpsofa-client"]||[]).push([[201],{231:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return p}));var n=a(6),c=a(0),l=a.n(c),r=a(25),u=a(317),i=a(59),o=a(322),s=a(99),f=a.n(s),m=a(27),h=a(117);function p(e){var t=Object(c.useState)(""),a=Object(n.a)(t,2),s=a[0],p=a[1],E=Object(c.useState)(!1),d=Object(n.a)(E,2),b=d[0],g=d[1];return l.a.createElement(m.default,{wide:e.wide},l.a.createElement(r.a,null,l.a.createElement(u.a,{onClick:function(){return e.setLayoutCard("PlayersLayout",{})}},l.a.createElement(o.a,null,l.a.createElement(f.a,null))),l.a.createElement(i.a,{primary:"Waiting for player data",onClick:function(){return g(!b)}})),b&&l.a.createElement(l.a.Fragment,null,l.a.createElement(r.a,{onClick:function(){fetch("/list/echo/captcha/"+s).then((function(e){return e.json()}))}},l.a.createElement("img",{src:"/captcha.jpg",alt:"captcha"})),l.a.createElement(r.a,null,l.a.createElement(h.a,{fullWidth:!0,label:"Captcha",value:s,onChange:function(e){return p(e.target.value)}}))))}}}]);
//# sourceMappingURL=201.fd4b1157.chunk.js.map