(this["webpackJsonpsofa-client"]=this["webpackJsonpsofa-client"]||[]).push([[148,182],{184:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return l}));var r=a(0),n=a.n(r),u=a(23),o=a(53),i=a(16),c=a(24),d=a(55);function l(e){var t,a=Object(r.useContext)(i.LayoutContext),l=a.applyLayoutCard,s=a.applyBackPage;return n.a.createElement(c.default,{wide:e.wide},n.a.createElement(u.a,{onClick:e.onClick},n.a.createElement(d.default,{onClick:function(){return s("ThermostatLayout",{}),void l("ThermostatHistory",{device:e.device,days:7})},avatarState:(t=e.device.TemperatureSensor.temperature.deepvalue,t?t>=74?"hot":t<70?"cool":"mid":"disabled")},e.device.TemperatureSensor.temperature.value?e.device.TemperatureSensor.temperature.deepvalue:"--"),n.a.createElement(o.a,{primary:e.device.friendlyName})))}},247:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return c}));var r=a(0),n=a.n(r),u=a(16),o=a(54),i=a(184);function c(e){var t=Object(r.useContext)(u.LayoutContext).applyLayoutCard,a=(0,Object(r.useContext)(o.DataContext).deviceByFriendlyName)(e.Primary);return a?n.a.createElement(i.default,{onClick:function(){return t("ThermostatLayout")},key:a.endpointId,device:a,wide:e.wide}):null}}}]);
//# sourceMappingURL=148.d841136d.chunk.js.map