(window.webpackJsonp=window.webpackJsonp||[]).push([[2,67],{256:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(1),i=n.n(o),s=n(3),l=n(29),c=n.n(l),u=n(543),p=n.n(u),f=n(26),d=n.n(f),m=n(13),y=n.n(m),h=n(542),g=n.n(h),b=n(6),v=n.n(b),w=n(24),O=n.n(w),j=n(7),E=n.n(j),S=n(31),C=n.n(S);function A(e){return(A="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function k(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function N(e,t){return!t||"object"!==A(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function T(e){return(T=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _(e,t){return(_=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var P=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),N(this,T(t).apply(this,arguments))}var n,a,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_(e,t)}(t,r.a.Component),n=t,(a=[{key:"render",value:function(){var e=this,t=this.props,n=t.classes,a=t.name,o=t.deviceCount,i=t.inRegion,s=t.edit;return r.a.createElement(v.a,{className:n.listItem,key:a+"-grp"},r.a.createElement(O.a,null,r.a.createElement(p.a,null)),r.a.createElement(E.a,{primary:a,secondary:o+" devices"}),s?r.a.createElement(C.a,null,r.a.createElement(y.a,{onClick:function(t){return e.delArea(a)}},r.a.createElement(d.a,null)),r.a.createElement(y.a,{onClick:function(){return e.props.editArea(a)}},r.a.createElement(c.a,null))):r.a.createElement(C.a,null,r.a.createElement(g.a,{color:"primary",checked:i,onClick:function(t){return e.props.handleCheck(t,a)}})))}}])&&k(n.prototype,a),o&&k(n,o),t}();P.propTypes={classes:i.a.object.isRequired},t.default=Object(s.withStyles)(function(e){return{listItem:{padding:16,width:"100%"}}})(P)},257:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(1),i=n.n(o),s=n(3),l=n(29),c=n.n(l),u=n(44),p=n.n(u),f=n(23),d=n.n(f),m=n(13),y=n.n(m),h=n(6),g=n.n(h),b=n(24),v=n.n(b),w=n(31),O=n.n(w);function j(e){return(j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function E(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function S(e){return(S=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function C(e,t){return(C=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function A(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var k=function(e){function t(e){var n,a,r,o,i,s;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),a=this,r=S(t).call(this,e),n=!r||"object"!==j(r)&&"function"!=typeof r?A(a):r,o=A(A(n)),s=function(e){n.setState({newAreaName:e.target.value})},(i="editNewAreaName")in o?Object.defineProperty(o,i,{value:s,enumerable:!0,configurable:!0,writable:!0}):o[i]=s,n.state={newAreaName:""},n}var n,a,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&C(e,t)}(t,r.a.Component),n=t,(a=[{key:"render",value:function(){var e=this,t=this.props,n=t.classes,a=t.addArea,o=this.state.newAreaName;return r.a.createElement("form",{noValidate:!0,autoComplete:"off"},r.a.createElement(g.a,{className:n.listItem},r.a.createElement(v.a,null,r.a.createElement(c.a,null)),r.a.createElement(d.a,{className:n.input,id:"required",label:"Area name",margin:"normal",value:o,onChange:function(t){return e.editNewAreaName(t)}}),r.a.createElement(O.a,null,r.a.createElement(y.a,{onClick:function(e){return a(o)}},r.a.createElement(p.a,null)))))}}])&&E(n.prototype,a),o&&E(n,o),t}();k.propTypes={classes:i.a.object.isRequired},t.default=Object(s.withStyles)(function(e){return{listItem:{padding:16,width:"100%"},input:{marginTop:0,marginLeft:16}}})(k)},265:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(20),i=n.n(o),s=n(1),l=n.n(s),c=n(3),u=n(9),p=n.n(u),f=n(28),d=n.n(f),m=n(32),y=n.n(m),h=n(279),g=n(256),b=n(257),v=n(280),w=n(111);function O(e){return(O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function j(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function E(e){return(E=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function S(e,t){return(S=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function C(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function A(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var k=function(e){function t(e){var n,a,r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),a=this,r=E(t).call(this,e),n=!r||"object"!==O(r)&&"function"!=typeof r?C(a):r,A(C(C(n)),"handleSave",function(e){console.log(n.state.areamap),n.groupSaveChanges(),n.props.close(e)}),A(C(C(n)),"deviceByName",function(e){for(var t=0;t<n.props.devices.length;t++)if(n.props.devices[t].friendlyName==e)return n.props.devices[t]}),A(C(C(n)),"updateList",function(e,t){for(var a=n.state.areamap,r={},o=0;o<t.length;o++)r[t[o]]={endpointId:n.deviceByName(t[o]).endpointId};a[e].lights=r,n.setState({areamap:a})}),A(C(C(n)),"editNewAreaName",function(e){n.setState({newAreaName:e.target.value})}),A(C(C(n)),"handleAdding",function(){n.setState({adding:!0})}),A(C(C(n)),"handleDelete",function(e){var t=n.state.areamap;delete t[e],n.setState({areamap:t})}),A(C(C(n)),"handleDoneAdding",function(e){if(e)if(n.state.areamap.hasOwnProperty(n.state.newAreaName))console.log("That area already exists");else{var t=n.state.areamap;t[n.state.newAreaName]={lights:{}},n.setState({areamap:t})}n.setState({adding:!1})}),A(C(C(n)),"handleObjectBrowser",function(){n.setState({objectBrowser:!0})}),A(C(C(n)),"handleCloseObjectBrowser",function(){n.setState({objectBrowser:!1})}),A(C(C(n)),"handleClick",function(e){if(!n.state.adding){console.log(e,n.state.areamap[e].lights);var t=Object.keys(n.state.areamap[e].lights);n.setState({selectedName:e,selectedDevices:t,objectBrowser:!0})}}),A(C(C(n)),"getLightsByArea",function(e){return n.state.areas.hasOwnProperty(e)&&n.state.areas[e].hasOwnProperty("lights")?n.state.areas[e].lights:{}}),A(C(C(n)),"isAreaInRegion",function(e){return!(!n.state.region.hasOwnProperty("areas")||!n.state.region.areas.hasOwnProperty(e))}),A(C(C(n)),"handleCheck",function(e,t){var a;(console.log(e.target.checked,t,n.isAreaInRegion(t)),e.target.checked)?n.isAreaInRegion(t)||((a=n.state.region).areas[t]=n.state.areas[t]):n.isAreaInRegion(t)&&(delete(a=n.state.region).areas[t],console.log("removed",t,a));n.setState({region:a},function(){return n.regionSaveChanges(n.props.name)})}),A(C(C(n)),"regionSaveChanges",function(e){fetch("/save/logic/region/"+e,{method:"post",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json"},body:JSON.stringify(n.state.region)})}),A(C(C(n)),"delArea",function(e){n.state.areas.hasOwnProperty(e)?fetch("/del/logic/area/"+e,{method:"post",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json"},body:JSON.stringify({})}).then(n.loadAreas()):console.log("That area doesnt exists")}),A(C(C(n)),"addArea",function(e){n.setState({add:!1}),n.state.areas.hasOwnProperty(e)?console.log("That area already exists"):fetch("/add/logic/area/"+e,{method:"post",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json"},body:JSON.stringify({lights:{},scenes:{}})}).then(n.loadAreas())}),A(C(C(n)),"editArea",function(e){n.setState({editArea:e})}),A(C(C(n)),"loadAreas",function(){fetch("/list/logic/areas").then(function(e){return e.json()}).then(function(e){return n.setState({areas:e})})}),n.state={edit:!1,adding:!1,selectedName:"",selectedDevices:[],areas:{},objectBrowser:!1,region:{},editArea:!1},n.loadAreas=n.loadAreas.bind(C(C(n))),n}var n,a,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&S(e,t)}(t,r.a.Component),n=t,(a=[{key:"componentDidMount",value:function(){var e=this;console.log(Object.keys(this.state.region).length),this.loadAreas(),fetch("/list/logic/region/"+this.props.name).then(function(e){return e.json()}).then(function(t){return e.setState({region:t},function(){return console.log("cdm",e.props.name,e.state.region)})})}},{key:"render",value:function(){var e=this,t=this.props,n=t.classes,a=t.name,o=this.state,s=o.add,l=o.edit,c=o.areas,u=(o.region,o.editArea);return r.a.createElement(r.a.Fragment,null,r.a.createElement(w.default,{title:a}),r.a.createElement(y.a,{className:n.dialogContent},r.a.createElement(i.a,{className:n.list},u?r.a.createElement(v.default,{name:u,area:c[u],loadAreas:this.loadAreas}):r.a.createElement(r.a.Fragment,null,Object.keys(c).sort().map(function(t){return r.a.createElement(g.default,{key:t,name:t,inRegion:e.isAreaInRegion(t),edit:l,editArea:e.editArea,handleCheck:e.handleCheck,deviceCount:Object.keys(e.getLightsByArea(t)).length})})),s?r.a.createElement(b.default,{addArea:this.addArea}):null)),r.a.createElement(d.a,{className:n.dialogActions},s||l||u?r.a.createElement(p.a,{onClick:function(t){return e.setState({edit:!1,add:!1,editArea:!1})},color:"primary",autoFocus:!0},s?"CANCEL":"OK"):r.a.createElement(r.a.Fragment,null,r.a.createElement(p.a,{onClick:function(t){return e.setState({add:!0})},color:"primary",autoFocus:!0},"ADD"),r.a.createElement(p.a,{onClick:function(t){return e.setState({edit:!0})},color:"primary",autoFocus:!0},"EDIT"),r.a.createElement(p.a,{onClick:function(t){return e.props.close()},color:"primary",autoFocus:!0},"OK"))),this.state.objectBrowser?r.a.createElement(h.default,{updateList:this.updateList,name:this.state.selectedName,selectedDevices:this.state.selectedDevices,open:this.state.objectBrowser,close:this.handleCloseObjectBrowser,devices:this.props.devices,propertiesFromDevices:this.props.propertiesFromDevices}):null)}}])&&j(n.prototype,a),o&&j(n,o),t}();k.propTypes={classes:l.a.object.isRequired},t.default=Object(c.withStyles)(function(e){var t;return A(t={list:{minWidth:320},content:{minWidth:0,padding:"0 !important",flexGrow:1,display:"flex",alignItems:"center"}},"list",{width:"100%"}),A(t,"tabTitle",{backgroundColor:e.palette.primary[700],padding:0,paddingTop:"env(safe-area-inset-top)",display:"flex",alignItems:"center",justifyContent:"space-around"}),A(t,"dialogTitle",{display:"flex",alignItems:"center",justifyContent:"center",flexGrow:1,color:e.palette.primary.contrastText}),A(t,"dialogActions",{paddingBottom:"env(safe-area-inset-bottom)"}),A(t,"listItem",{padding:16,width:"100%"}),A(t,"dialogContent",{padding:0}),A(t,"sceneExpand",{padding:"0",marginBottom:2}),A(t,"areaInput",{marginTop:0,marginLeft:16}),t})(k)},279:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(20),i=n.n(o),s=n(1),l=n.n(s),c=n(3),u=n(9),p=n.n(u),f=n(21),d=n.n(f),m=n(542),y=n.n(m),h=n(28),g=n.n(h),b=n(32),v=n.n(b),w=n(25),O=n.n(w),j=n(6),E=n.n(j),S=n(24),C=n.n(S),A=n(7),k=n.n(A),N=n(31),T=n.n(N),_=n(38);function P(e){return(P="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function x(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function I(e){return(I=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function D(e,t){return(D=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function B(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function R(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var L=function(e){function t(e){var n,a,r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),a=this,r=I(t).call(this,e),n=!r||"object"!==P(r)&&"function"!=typeof r?B(a):r,R(B(B(n)),"handleToggle",function(e){return function(){if(console.log(n.state),n.state.selectedDevices.includes(e)){var t=(a=n.state.selectedDevices).indexOf(e);a.splice(t,1)}else{var a;(a=n.state.selectedDevices).push(e)}n.setState({selectedDevices:a.sort()})}}),R(B(B(n)),"handleSave",function(e){console.log(n.props.name,n.state.selectedDevices),n.props.updateList(n.props.name,n.state.selectedDevices),n.props.close(e)}),n.state={selectedDevices:n.props.selectedDevices},n}var n,a,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&D(e,t)}(t,r.a.Component),n=t,(a=[{key:"componentDidMount",value:function(){console.log("xx",this.props.selectedDevices)}},{key:"render",value:function(){var e=this,t=this.props,n=t.classes;t.fullScreen;return r.a.createElement(_.default,{open:this.props.open,close:this.props.close,title:this.props.name},r.a.createElement(d.a,null),r.a.createElement(v.a,{className:n.dialogContent},r.a.createElement(i.a,{className:n.thermostatList},this.props.devices.map(function(t){return r.a.createElement(E.a,{className:n.listItem,key:t.endpointId+"-dlg"},r.a.createElement(C.a,null,r.a.createElement(O.a,null)),r.a.createElement(k.a,{primary:t.friendlyName,secondary:t.displayCategories[0]}),r.a.createElement(T.a,null,r.a.createElement(y.a,{onChange:e.handleToggle(t.friendlyName),checked:e.state.selectedDevices.includes(t.friendlyName)})))}))),r.a.createElement(d.a,null),r.a.createElement(g.a,{className:n.dialogActions},r.a.createElement(p.a,{onClick:function(t){return e.handleSave(t)},color:"primary",autoFocus:!0},"OK")))}}])&&x(n.prototype,a),o&&x(n,o),t}();L.propTypes={classes:l.a.object.isRequired,fullScreen:l.a.bool.isRequired},t.default=Object(c.withStyles)(function(e){return{list:{minWidth:320},content:{minWidth:0,padding:"0 !important",flexGrow:1,display:"flex",alignItems:"center"},thermostatList:{width:"100%"},tabTitle:{backgroundColor:e.palette.primary[700],padding:0,paddingTop:"env(safe-area-inset-top)",display:"flex",alignItems:"center",justifyContent:"space-around"},dialogTitle:{display:"flex",alignItems:"center",justifyContent:"center",flexGrow:1,color:e.palette.primary.contrastText},dialogActions:{paddingBottom:"env(safe-area-inset-bottom)"},listItem:{padding:16,width:"100%"},dialogContent:{padding:0},sceneExpand:{padding:"0",marginBottom:2}}})(L)},280:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(1),i=n.n(o),s=n(3),l=n(542),c=n.n(l),u=n(25),p=n.n(u),f=n(6),d=n.n(f),m=n(24),y=n.n(m),h=n(7),g=n.n(h),b=n(31),v=n.n(b),w=n(30);n(256),n(257);function O(e){return(O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function j(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function E(e){return(E=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function S(e,t){return(S=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function C(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function A(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var k=function(e){function t(e){var n,a,r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),a=this,r=E(t).call(this,e),n=!r||"object"!==O(r)&&"function"!=typeof r?C(a):r,A(C(C(n)),"saveArea",function(e,t){fetch("/save/logic/area/"+e,{method:"post",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json"},body:JSON.stringify(t)}).then(n.props.loadAreas())}),A(C(C(n)),"isLightInArea",function(e){return!(!n.props.area.hasOwnProperty("lights")||!n.props.area.lights.hasOwnProperty(e))}),A(C(C(n)),"handleCheck",function(e,t){var a;(console.log(e.target.checked,t),e.target.checked)?((a=n.props.area).lights[t.friendlyName]={endpointId:t.endpointId},n.saveArea(n.props.name,a)):n.isLightInArea(t.friendlyName)&&(delete(a=n.props.area).lights[t.friendlyName],console.log("removed",t.friendlyName,a),n.saveArea(n.props.name,a))}),n.state={edit:!1,adding:!1,selectedName:"",selectedDevices:[],areas:{},objectBrowser:!1,region:{}},n}var n,a,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&S(e,t)}(t,r.a.Component),n=t,(a=[{key:"componentDidMount",value:function(){console.log(this.props.area)}},{key:"render",value:function(){var e=this,t=this.props,n=t.classes,a=(t.area,this.state);a.add,a.edit,a.areas,a.region;return r.a.createElement(r.a.Fragment,null,this.props.devices.map(function(t){return"LIGHT"==t.displayCategories[0]?r.a.createElement(d.a,{className:n.listItem,key:t.endpointId+"-dlg"},r.a.createElement(y.a,null,r.a.createElement(p.a,null)),r.a.createElement(g.a,{primary:t.friendlyName,secondary:t.displayCategories[0]}),r.a.createElement(v.a,null,r.a.createElement(c.a,{onClick:function(n){return e.handleCheck(n,t)},checked:e.isLightInArea(t.friendlyName),color:"primary"}))):null}))}}])&&j(n.prototype,a),o&&j(n,o),t}();k.propTypes={classes:i.a.object.isRequired},t.default=Object(w.withData)(Object(s.withStyles)(function(e){var t;return A(t={list:{minWidth:320},content:{minWidth:0,padding:"0 !important",flexGrow:1,display:"flex",alignItems:"center"}},"list",{width:"100%"}),A(t,"tabTitle",{backgroundColor:e.palette.primary[700],padding:0,paddingTop:"env(safe-area-inset-top)",display:"flex",alignItems:"center",justifyContent:"space-around"}),A(t,"dialogTitle",{display:"flex",alignItems:"center",justifyContent:"center",flexGrow:1,color:e.palette.primary.contrastText}),A(t,"dialogActions",{paddingBottom:"env(safe-area-inset-bottom)"}),A(t,"listItem",{padding:16,width:"100%"}),A(t,"dialogContent",{padding:0}),A(t,"sceneExpand",{padding:"0",marginBottom:2}),A(t,"areaInput",{marginTop:0,marginLeft:16}),t})(k))}}]);