(window.webpackJsonp=window.webpackJsonp||[]).push([[52,69],{262:function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o),a=n(1),i=n.n(a),c=n(3),l=n(20),s=n.n(l),u=n(9),f=n.n(u),p=n(8),b=n.n(p),m=n(12),y=n.n(m),d=n(52),h=n.n(d);function v(e){return(v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function g(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function w(e,t){return!t||"object"!==v(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function O(e){return(O=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function j(e,t){return(j=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var S=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),w(this,O(t).apply(this,arguments))}var n,o,a;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&j(e,t)}(t,r.a.Component),n=t,(o=[{key:"render",value:function(){var e=this,t=this.props.classes;return r.a.createElement(h.a,{elevation:1,className:t.content},r.a.createElement(s.a,null,r.a.createElement(f.a,{className:t.listItem},r.a.createElement(y.a,{onClick:function(){return e.handleClickSelect()},src:this.props.item.album_art_uri}),r.a.createElement(b.a,{primary:this.props.name,secondary:this.props.item.description}))))}}])&&g(n.prototype,o),a&&g(n,a),t}();S.propTypes={classes:i.a.object.isRequired},t.default=Object(c.withStyles)(function(e){return{content:{display:"flex",margin:"2 2",boxSizing:"border-box",padding:"8 16",alignItems:"center",flexBasis:0,flexGrow:1,flexWrap:"wrap",minWidth:"320px",maxHeight:"100px"},listItem:{padding:0}}})(S)},274:function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o),a=n(1),i=n.n(a),c=n(3),l=n(7),s=n.n(l),u=n(28),f=n.n(u),p=n(31),b=n.n(p),m=n(21),y=n.n(m),d=n(38),h=n(262);function v(e){return(v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function g(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function w(e){return(w=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function O(e,t){return(O=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function j(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var S=function(e){function t(e){var n,o,r,a,i,c;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),o=this,r=w(t).call(this,e),n=!r||"object"!==v(r)&&"function"!=typeof r?j(o):r,a=j(j(n)),c=function(e,t){0==t&&n.setState({frontTab:t,filter:"on"}),1==t&&n.setState({frontTab:t,filter:"all"})},(i="handleTab")in a?Object.defineProperty(a,i,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[i]=c,n.state={filter:"on",frontTab:0,favorites:[]},n}var n,o,a;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&O(e,t)}(t,r.a.Component),n=t,(o=[{key:"componentDidMount",value:function(){var e=this;fetch("/list/sonos/favorites").then(function(e){return e.json()}).then(function(t){return e.setState({favorites:t})})}},{key:"render",value:function(){var e=this,t=this.props.classes;return r.a.createElement(d.default,{open:this.props.open,close:this.props.close,maxWidth:"md",title:"Sonos Favorites",tabValue:this.state.frontTab,tabChange:this.handleTab,tabs:["Favorites","Queue"]},r.a.createElement(b.a,{className:t.dialogContent},r.a.createElement("div",{className:t.lGrid},this.state.favorites.map(function(e){return r.a.createElement(h.default,{key:e.item_id,itemid:e.item_id,name:e.title,item:e})}),r.a.createElement("div",{className:t.gridPlaceholder}))),r.a.createElement(y.a,null),r.a.createElement(f.a,{className:t.dialogActions},r.a.createElement(s.a,{onClick:function(t){return e.props.close(t)},color:"primary",autoFocus:!0},"OK")))}}])&&g(n.prototype,o),a&&g(n,a),t}();S.propTypes={classes:i.a.object.isRequired},t.default=Object(c.withStyles)(function(e){return{lGrid:{display:"flex",flexWrap:"wrap",padding:0,flex:"auto",flexGrow:0,margin:"0 0 auto 0"},gridPlaceholder:{height:2,minWidth:320,flexGrow:1,flexBasis:0},dialogContent:{height:"100%",padding:8},dialogActions:{paddingBottom:"env(safe-area-inset-bottom)"}}})(S)}}]);