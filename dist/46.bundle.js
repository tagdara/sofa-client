(window.webpackJsonp=window.webpackJsonp||[]).push([[46,71],{270:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(1),i=n.n(a),c=n(3),l=n(9),s=n.n(l),u=n(28),p=n.n(u),f=n(32),y=n.n(f),d=n(21),m=n.n(d),b=n(271),h=n(38);function v(e){return(v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function P(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function O(e,t){return!t||"object"!==v(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function w(e){return(w=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function S(e,t){return(S=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var g=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),O(this,w(t).apply(this,arguments))}var n,r,a;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&S(e,t)}(t,o.a.Component),n=t,(r=[{key:"render",value:function(){var e=this,t=this.props,n=t.classes,r=t.open,a=t.close,i=t.devices,c=t.deviceProperties;return o.a.createElement(h.default,{title:"Sonos Zones",open:r,close:a},o.a.createElement(y.a,{className:n.dialogContent},i.map(function(t){return o.a.createElement(b.default,{sendAlexaCommand:e.props.sendAlexaCommand,devices:i,chooseActivePlayer:e.props.chooseActivePlayer,key:t.endpointId+"sonosgi",name:t.friendlyName,device:t,deviceProperties:c[t.friendlyName],linkedPlayers:c})})),o.a.createElement(m.a,null),o.a.createElement(p.a,{className:n.dialogActions},o.a.createElement(s.a,{onClick:function(t){return e.props.close(t)},color:"primary",autoFocus:!0},"OK")))}}])&&P(n.prototype,r),a&&P(n,a),t}();g.propTypes={classes:i.a.object.isRequired},t.default=Object(c.withStyles)(function(e){return{dialogContent:{height:"100%",padding:8},dialogActions:{paddingBottom:"env(safe-area-inset-bottom)"}}})(g)},276:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(1),i=n.n(a),c=n(3),l=n(6),s=n.n(l),u=n(7),p=n.n(u),f=n(12),y=n.n(f),d=n(573),m=n.n(d),b=n(99);function h(e){return(h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function v(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function P(e,t){return!t||"object"!==h(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function O(e){return(O=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function w(e,t){return(w=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var S=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),P(this,O(t).apply(this,arguments))}var n,r,a;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&w(e,t)}(t,o.a.Component),n=t,(r=[{key:"render",value:function(){var e=this,t=this.props,n=t.classes;t.theme,t.name;return o.a.createElement(b.default,null,o.a.createElement(s.a,{className:n.listItem,onClick:function(){return e.props.choose()}},o.a.createElement(y.a,null,o.a.createElement(m.a,null)),o.a.createElement(p.a,{primary:"No music playing"})))}}])&&v(n.prototype,r),a&&v(n,a),t}();S.propTypes={classes:i.a.object.isRequired},t.default=Object(c.withStyles)(function(e){return{listItem:{width:"100%",minHeight:48,padding:0}}})(S)},298:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(1),i=n.n(a),c=n(3),l=n(270),s=n(294),u=n(276),p=n(30);function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function y(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function m(e,t){return(m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function b(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function h(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var v=function(e){function t(e){var n,r,o;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),r=this,o=d(t).call(this,e),n=!o||"object"!==f(o)&&"function"!=typeof o?b(r):o,h(b(b(n)),"handleSelectPlayer",function(e){n.setState({selectPlayer:!0})}),h(b(b(n)),"handleCloseSelectPlayer",function(e){n.setState({selectPlayer:!1})}),h(b(b(n)),"chooseActivePlayer",function(e){n.setState({activePlayer:e,selectPlayer:!1})}),h(b(b(n)),"chooseUserPlayer",function(e){n.setState({userPlayer:e,selectPlayer:!1})}),h(b(b(n)),"playerDeviceByName",function(e){for(var t=0;t<n.props.devices.length;t++)if(n.props.devices[t].friendlyName==e)return n.props.devices[t]}),h(b(b(n)),"isPlayerStopped",function(e){return!n.props.deviceProperties.hasOwnProperty(e)||!n.props.deviceProperties[e].hasOwnProperty("playbackState")||"STOPPED"==n.props.deviceProperties[e].playbackState}),n.state={defaultPlayer:"Office",activePlayer:"",userPlayer:"",selectPlayer:!1},n}var n,r,a;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(t,o.a.Component),n=t,a=[{key:"getDerivedStateFromProps",value:function(e,t){var n=e.deviceProperties,r={};if(!t.userPlayer&&e.hasOwnProperty("devices")){for(var o="",a=0;a<e.devices.length;a++){var i=e.devices[a].friendlyName;if(n.hasOwnProperty(i)){var c=n[i];c.hasOwnProperty("playbackState")&&"PLAYING"==c.playbackState&&(""!=o&&i!=t.defaultPlayer||(o=c.input==i||""==c.input?i:c.input))}}r.activePlayer=o||t.defaultPlayer}else t.activePlayer!=t.userPlayer&&(r.activePlayer=t.userPlayer);return r}}],(r=[{key:"render",value:function(){var e=this.props,t=(e.classes,e.devices),n=e.deviceProperties,r=this.state,a=r.activePlayer,i=r.selectPlayer,c=r.userPlayer;return o.a.createElement(o.a.Fragment,null,this.isPlayerStopped(a)&&""===c?o.a.createElement(u.default,{choose:this.handleSelectPlayer}):o.a.createElement(s.default,{name:a,sendAlexaCommand:this.props.sendAlexaCommand,deviceByName:this.props.deviceByName,selectPlayer:this.handleSelectPlayer,device:this.playerDeviceByName(a),deviceProperties:n}),i?o.a.createElement(l.default,{sendAlexaCommand:this.props.sendAlexaCommand,close:this.handleCloseSelectPlayer,open:i,chooseActivePlayer:this.chooseUserPlayer,devices:t,deviceProperties:n}):null)}}])&&y(n.prototype,r),a&&y(n,a),t}();v.propTypes={classes:i.a.object.isRequired},t.default=Object(p.withData)(Object(c.withStyles)(function(e){return{list:{paddingBottom:4,display:"flex",flexGrow:1,flexDirection:"column"}}})(v))}}]);