(window.webpackJsonp=window.webpackJsonp||[]).push([[41,66],{249:function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o),a=n(1),i=n.n(a),l=n(3),c=n(13),u=n.n(c),s=n(9),f=n.n(s),p=n(26),d=n.n(p),m=n(23),y=n.n(m),g=n(32),b=n.n(g),h=n(44),w=n.n(h);function v(e){return(v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function E(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function j(e){return(j=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function O(e,t){return(O=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function S(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var C=function(e){function t(e){var n,o,r,a,i,l;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),o=this,r=j(t).call(this,e),n=!r||"object"!==v(r)&&"function"!=typeof r?S(o):r,a=S(S(n)),l=function(e){n.setState({newRegionName:e.target.value})},(i="editNewRegionName")in a?Object.defineProperty(a,i,{value:l,enumerable:!0,configurable:!0,writable:!0}):a[i]=l,n.state={newRegionName:""},n}var n,o,a;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&O(e,t)}(t,r.a.Component),n=t,(o=[{key:"render",value:function(){var e=this,t=this.props.classes;return r.a.createElement(f.a,{className:t.listItem},r.a.createElement(d.a,null,r.a.createElement(b.a,null)),r.a.createElement(y.a,{className:t.areaInput,id:"required",label:"Area name",margin:"normal",value:this.state.newRegionName,onChange:function(t){return e.editNewRegionName(t)}}),r.a.createElement(u.a,{"aria-label":"Confirm",onClick:function(t){return e.props.add(e.state.newRegionName)}},r.a.createElement(w.a,null)))}}])&&E(n.prototype,o),a&&E(n,a),t}();C.propTypes={classes:i.a.object.isRequired},t.default=Object(l.withStyles)(function(e){return{listItem:{padding:16,width:"100%"},areaInput:{marginTop:0,marginLeft:16,flexGrow:1}}})(C)},251:function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o),a=n(20),i=n.n(a),l=n(1),c=n.n(l),u=n(3),s=n(7),f=n.n(s),p=n(28),d=n.n(p),m=n(31),y=n.n(m),g=n(13),b=n.n(g),h=n(9),w=n.n(h),v=n(26),E=n.n(v),j=n(8),O=n.n(j),S=n(30),C=n.n(S),N=n(32),k=n.n(N),R=n(25),_=n.n(R),T=n(558),x=n.n(T),P=n(249);function I(e){return(I="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function A(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function F(e){return(F=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function L(e,t){return(L=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function D(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function M(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var J=function(e){function t(e){var n,o,r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),o=this,r=F(t).call(this,e),n=!r||"object"!==I(r)&&"function"!=typeof r?D(o):r,M(D(D(n)),"updateList",function(e,t){var o=n.state.regions;o[e].rooms=t,n.setState({regions:o})}),M(D(D(n)),"editNewRegionName",function(e){n.setState({newRegionName:e.target.value})}),M(D(D(n)),"handleAdd",function(e){if(n.props.done(),n.state.regions.hasOwnProperty(e))console.log("That region already exists");else{var t=n.state.regions;t[e]={areas:{},scenes:{}},n.setState({regions:t},function(){return n.addRegion(e,t[e])})}}),M(D(D(n)),"handleDelete",function(e){var t=n.state.regions;delete t[e],n.setState({regions:t},function(){return n.delRegion(e)})}),M(D(D(n)),"handleSelect",function(e){n.props.editMode||n.props.handleSelect(e)}),M(D(D(n)),"addRegion",function(e,t){fetch("/add/logic/region/"+e,{method:"post",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json"},body:JSON.stringify(t)}).then(function(e){return console.log(e)})}),M(D(D(n)),"delRegion",function(e){fetch("/del/logic/region/"+e,{method:"post",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json"},body:JSON.stringify({})}).then(function(e){return console.log(e)})}),M(D(D(n)),"saveRegion",function(e,t){fetch("/save/logic/region/"+e,{method:"post",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json"},body:JSON.stringify(t)}).then(function(e){return console.log(e)})}),M(D(D(n)),"done",function(){n.setState({add:!1,edit:!1})}),n.state={edit:!1,add:!1,adding:!1,selectedName:"",selectedDevices:[],areamap:{},regions:{},roomBrowser:!1,objectBrowser:!1},n}var n,o,a;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&L(e,t)}(t,r.a.Component),n=t,(o=[{key:"componentDidMount",value:function(){var e=this;fetch("/list/logic/regions").then(function(e){return e.json()}).then(function(t){return e.setState({regions:t})})}},{key:"render",value:function(){var e=this,t=this.props.classes,n=this.state,o=n.add,a=n.edit;return r.a.createElement(r.a.Fragment,null,r.a.createElement(y.a,{className:t.dialogContent},r.a.createElement(i.a,{className:t.List},Object.keys(this.state.regions).sort().map(function(n){return r.a.createElement(w.a,{className:t.listItem,key:n+"-reg",onClick:function(){return e.props.selectRegion(n)}},r.a.createElement(E.a,null,r.a.createElement(x.a,null)),r.a.createElement(O.a,{primary:n,secondary:Object.keys(e.state.regions[n].areas).length+" rooms"}),e.state.edit?r.a.createElement(C.a,null,r.a.createElement(b.a,{onClick:function(){return e.handleDelete(n)}},r.a.createElement(_.a,null)),r.a.createElement(b.a,{onClick:function(){return e.props.handleRegionEdit(n)}},r.a.createElement(k.a,null))):null)}),o?r.a.createElement(P.default,{add:this.handleAdd}):null)),r.a.createElement(d.a,{className:t.dialogActions},a||o?r.a.createElement(r.a.Fragment,null,o?r.a.createElement(f.a,{onClick:function(t){return e.done()},color:"primary",autoFocus:!0},"CANCEL"):r.a.createElement(f.a,{onClick:function(t){return e.done()},color:"primary",autoFocus:!0},"DONE")):r.a.createElement(r.a.Fragment,null,r.a.createElement(f.a,{onClick:function(t){return e.setState({add:!0})},color:"primary",autoFocus:!0},"ADD"),r.a.createElement(f.a,{onClick:function(t){return e.setState({edit:!0})},color:"primary",autoFocus:!0},"EDIT"),r.a.createElement(f.a,{onClick:function(t){return e.props.close()},color:"primary",autoFocus:!0},"OK"))))}}])&&A(n.prototype,o),a&&A(n,a),t}();J.propTypes={classes:c.a.object.isRequired},t.default=Object(u.withStyles)(function(e){return{content:{minWidth:0,padding:"0 !important",flexGrow:1,display:"flex",alignItems:"center"},list:{minWidth:320,width:"100%"},tabTitle:{backgroundColor:e.palette.primary[700],padding:0,paddingTop:"env(safe-area-inset-top)",display:"flex",alignItems:"center",justifyContent:"space-around"},dialogTitle:{display:"flex",alignItems:"center",justifyContent:"center",flexGrow:1,color:e.palette.primary.contrastText},dialogActions:{paddingBottom:"env(safe-area-inset-bottom)"},listItem:{padding:16,width:"100%"},dialogContent:{padding:0},sceneExpand:{padding:"0",marginBottom:2},areaInput:{marginTop:0,marginLeft:16}}})(J)},558:function(e,t,n){"use strict";var o=n(19);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(n(0)),a=(0,o(n(22)).default)(r.default.createElement(r.default.Fragment,null,r.default.createElement("path",{fill:"none",d:"M0 0h24v24H0z"}),r.default.createElement("path",{d:"M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z"})),"Layers");t.default=a}}]);