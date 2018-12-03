(window.webpackJsonp=window.webpackJsonp||[]).push([[54],{292:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),o=r(1),s=r.n(o),i=r(3),u=r(94),c=r.n(u),l=r(267),m=r(290);function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function h(e){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function d(e,t){return(d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function b(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function C(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var y=function(e){function t(e){var r,n,a;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),n=this,a=h(t).call(this,e),r=!a||"object"!==f(a)&&"function"!=typeof a?b(n):a,C(b(b(r)),"setCurrentCamera",function(e){r.setState({cameras:e}),e.length>0?r.setState({currentCamera:e[0]}):r.setState({currentCamera:null})}),C(b(b(r)),"nextCamera",function(){var e=r.state.currentCameraNumber+1;e>r.state.cameras.length-1&&(e=0),e<0&&(e=r.state.cameras.length-1),r.setState({currentCameraNumber:e,currentCamera:r.state.cameras[e]})}),C(b(b(r)),"prevCamera",function(){var e=r.state.currentCameraNumber-1;e>r.state.cameras.length-1&&(e=0),e<0&&(e=r.state.cameras.length-1),r.setState({currentCameraNumber:e,currentCamera:r.state.cameras[e]})}),C(b(b(r)),"handleGridOpen",function(){r.setState({showGrid:!0})}),C(b(b(r)),"handleGridClose",function(){r.setState({showGrid:!1})}),r.state={cameras:[],currentCamera:null,currentCameraNumber:0,showGrid:!1},r.nextCamera=r.nextCamera.bind(b(b(r))),r.prevCamera=r.prevCamera.bind(b(b(r))),r.handleGridOpen=r.handleGridOpen.bind(b(b(r))),r.handleGridClose=r.handleGridClose.bind(b(b(r))),r}var r,n,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&d(e,t)}(t,a.a.Component),r=t,(n=[{key:"componentDidMount",value:function(){var e=this;fetch("/data/cameras").then(function(e){return e.json()}).then(function(t){return e.setCurrentCamera(t)})}},{key:"render",value:function(){var e=this.props.classes;return a.a.createElement(c.a,{className:e.CameraSelect},null!=this.state.currentCamera?a.a.createElement(l.default,{selectButtons:!0,openGrid:this.handleGridOpen,key:this.state.currentCamera,name:this.state.currentCamera,sender:this.props.sender,nextCamera:this.nextCamera,prevCamera:this.prevCamera}):null,this.state.showGrid?a.a.createElement(m.default,{open:this.state.showGrid,close:this.handleGridClose,cameras:this.state.cameras}):null)}}])&&p(r.prototype,n),o&&p(r,o),t}();y.propTypes={classes:s.a.object.isRequired},t.default=Object(i.withStyles)(function(e){return{CameraSelect:{margin:8,padding:0,minWidth:320}}})(y)}}]);