(window.webpackJsonp=window.webpackJsonp||[]).push([[38,46,51],{239:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(1),i=n.n(o),l=n(3),s=n(40),c=n.n(s),p=n(538),u=n.n(p);function d(e){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function f(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function m(e){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function h(e,t){return(h=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function y(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function g(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var b=function(e){function t(e){var n,r,a;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),r=this,a=m(t).call(this,e),n=!a||"object"!==d(a)&&"function"!=typeof a?y(r):a,g(y(y(n)),"handleDrag",function(e,t){console.log("handledrag",e.target,t,n.state.drag),n.setState({prechange:!1})}),g(y(y(n)),"handlePostPreChange",function(e){n.props.preChange(e),n.state.sendPrechange&&(n.props.change(n.state.value),n.setState({sendPrechange:!1}))}),g(y(y(n)),"handlePreChange",function(e,t){console.log("handleprechange",t,n.state.drag),n.setState({value:t,delaySet:!0,prechange:!0},function(){return n.handlePostPreChange(e)})}),g(y(y(n)),"handleChange",function(e,t){console.log("handlechange",t,n.state.drag),n.setState({drag:!1}),n.state.prechange?n.props.change(n.state.value):(n.setState({sendPrechange:!0}),console.log("change called before prechange"))}),g(y(y(n)),"delaySliderUpdates",function(){console.log("dsu"),n.setState({delaySet:!0},function(){return setTimeout(function(){return endSliderDelay()},1e3)})}),g(y(y(n)),"endSliderDelay",function(){n.setState({delaySet:!1})}),n.state={value:0,delaySet:!1,drag:!1,prechange:!1,sendPrechange:!1},n}var n,r,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&h(e,t)}(t,a.a.Component),n=t,o=[{key:"getDerivedStateFromProps",value:function(e,t){e.deviceProperties;var n={};return t.delaySet||e.hasOwnProperty("value")&&(n.value=e.value),n}}],(r=[{key:"render",value:function(){var e=this.props,t=e.classes,n=(e.disabled,e.name),r=e.unit,o=e.padLeft,i=e.half;return a.a.createElement("div",{className:o?t.stack+" "+t.padLeft:i?t.half:t.stack},n?a.a.createElement(c.a,{variant:"subtitle1",className:t.stackLabel},this.props.name):null,r?a.a.createElement(c.a,{variant:"caption",className:t.stackLabel},Math.floor(this.state.value)+this.props.unit):null,a.a.createElement(u.a,{classes:{container:t.slider},value:this.state.value,step:this.props.step,min:this.props.min,max:this.props.max,onChange:this.handlePreChange,onDragEnd:this.handleChange,onDragStart:this.handleDrag,disabled:this.props.disabled}))}}])&&f(n.prototype,r),o&&f(n,o),t}();b.defaultProps={name:"",unit:"",min:0,max:100,step:1,default:0,value:0,tabs:"",disabled:!1,padLeft:!1,half:!1},b.propTypes={classes:i.a.object.isRequired},t.default=Object(l.withStyles)(function(e){return{half:{alignItems:"center",display:"flex",height:42,flexGrow:1,flexBasis:0,boxSizing:"border-box"},stack:{height:42,display:"flex",flexGrow:1,justifyContent:"space-between",flexWrap:"wrap",minWidth:240,width:"100%",boxSizing:"border-box",marginRight:8,overflowX:"hidden"},padLeft:{paddingLeft:16},xstackLabel:{alignSelf:"flex-end"}}})(b)},263:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(1),i=n.n(o),l=n(3),s=n(40),c=n.n(s),p=n(91),u=n.n(p),d=n(239),f=n(31),m=n.n(f),h=n(28),y=n.n(h),g=n(12),b=n.n(g),v=n(20),S=n.n(v),w=n(9),P=n.n(w),C=n(8),O=n.n(C),x=n(521),k=n.n(x),E=n(520),j=n.n(E),N=n(7),I=n.n(N),_=n(41),L=n.n(_),T=n(21),D=n.n(T),A=n(38);function V(e){return(V="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function R(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function G(e){return(G=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function M(e,t){return(M=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function W(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function F(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var B=function(e){function t(e){var n,r,a;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),r=this,a=G(t).call(this,e),n=!a||"object"!==V(a)&&"function"!=typeof a?W(r):a,F(W(W(n)),"handlePowerChange",function(e){n.setState({powerState:e.target.checked,target:n.props.device.friendlyName}),e.target.checked?n.props.sendAlexaCommand(n.props.device.friendlyName,n.props.device.endpointId,"PowerController","TurnOn"):n.props.sendAlexaCommand(n.props.device.friendlyName,n.props.device.endpointId,"PowerController","TurnOff")}),F(W(W(n)),"handlePreVolumeChange",function(e){n.setState({volume:e,target:n.props.name})}),F(W(W(n)),"handleVolumeChange",function(e){n.props.sendAlexaCommand(n.props.device.friendlyName,n.props.device.endpointId,"SpeakerController","SetVolume",{volume:e})}),F(W(W(n)),"handleMuteChange",function(e){n.props.sendAlexaCommand(n.props.device.friendlyName,n.props.device.endpointId,"SpeakerController","SetMute",{muted:!n.state.muted})}),F(W(W(n)),"handleSurround",function(e,t){n.props.sendAlexaCommand(n.props.device.friendlyName,n.props.device.endpointId,"SurroundController","SetSurround",{surround:t})}),F(W(W(n)),"handleInput",function(e,t){n.props.sendAlexaCommand(n.props.device.friendlyName,n.props.device.endpointId,"InputController","SelectInput",{input:t})}),n.state={topInputs:["TV","Sonos"],tracked:["surround","decoder","input","volume","powerState"],endpointId:"",surround:"",decoder:"",input:"",volume:0,powerState:!1},n}var n,r,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&M(e,t)}(t,a.a.Component),n=t,o=[{key:"getDerivedStateFromProps",value:function(e,t){var n=e.deviceProperties,r={};return n.hasOwnProperty("volume")&&(r.volume=n.volume),r}}],(r=[{key:"render",value:function(){var e=this,t=this.props,n=t.classes;t.fullScreen;return a.a.createElement(A.default,{title:this.props.name,open:this.props.showdialog,close:this.props.closeDialog},a.a.createElement(m.a,{className:n.content},a.a.createElement(S.a,null,a.a.createElement(P.a,{className:n.powerLine},a.a.createElement(L.a,{color:"primary",checked:"ON"==this.props.deviceProperties.powerState,onChange:this.handlePowerChange}),a.a.createElement(O.a,{className:n.powerLabel,primary:"Power"})),a.a.createElement(P.a,{className:n.sliderPaper},a.a.createElement(b.a,{onClick:function(){return e.handleMuteChange()}},this.props.deviceProperties.muted?a.a.createElement(j.a,null):a.a.createElement(k.a,null)),a.a.createElement(d.default,{name:"Volume",unit:"%",min:0,max:100,defaultValue:0,step:1,value:this.state.volume,preChange:this.handlePreVolumeChange,change:this.handleVolumeChange,padLeft:!0})),a.a.createElement(P.a,{className:n.chipListItem},a.a.createElement(c.a,{variant:"subtitle1",noWrap:!0,className:n.chipLineLabel},"Input"),a.a.createElement("div",{className:n.chipLine},Object.keys(this.props.inputs).map(function(t){return e.state.topInputs.includes(e.props.inputs[t])?a.a.createElement(u.a,{key:t,label:e.props.inputs[t],className:e.props.input==e.props.inputs[t]?n.hotchip:n.chip,onClick:function(n){return e.handleInput(n,t)}}):null}))),a.a.createElement(P.a,{className:n.chipListItem},a.a.createElement(c.a,{variant:"subtitle1",noWrap:!0,className:n.chipLineLabel},"Surround Sound"),a.a.createElement("div",{className:n.chipLine},a.a.createElement(u.a,{key:"7ch Stereo",label:"7ch Stereo",className:"7ch Stereo"==this.props.deviceProperties.surround?n.hotchip:n.chip,onClick:function(t){return e.handleSurround(t,"7ch Stereo")}}),a.a.createElement(u.a,{key:"Surround Decoder",label:"Surround Decoder",className:"Surround Decoder"==this.props.deviceProperties.surround?n.hotchip:n.chip,onClick:function(t){return e.handleSurround(t,"Surround Decoder")}}))))),a.a.createElement(D.a,null),a.a.createElement(y.a,{className:n.dialogActions},a.a.createElement(I.a,{onClick:function(){return e.props.closeDialog()},color:"primary",autoFocus:!0},"OK")))}}])&&R(n.prototype,r),o&&R(n,o),t}();B.propTypes={classes:i.a.object.isRequired},t.default=Object(l.withStyles)(function(e){var t;return F(t={content:{minWidth:0,padding:0,paddingBottom:16},metadata:{flex:1,display:"flex",flexDirection:"column"},chip:{background:"silver",color:"black",marginRight:e.spacing.unit,marginTop:e.spacing.unit,marginBottom:e.spacing.unit,marginLeft:0},hotchip:{background:"orangeRed",color:"white",marginRight:e.spacing.unit,marginTop:e.spacing.unit,marginBottom:e.spacing.unit,marginLeft:0},slider:{paddingTop:0,paddingRight:28,paddingLeft:10},slidername:{display:"flex",paddingRight:0,paddingLeft:10,alignItems:"center"},chipLineLabel:{width:"100%"},chipListItem:{width:"100%",display:"block",padding:"16 24"},chipLine:{paddingTop:0,width:"100%"},tabTitle:{backgroundColor:e.palette.primary[700],padding:0,paddingTop:"env(safe-area-inset-top)",display:"flex",alignItems:"center",justifyContent:"space-around"},dialogTitle:{display:"flex",alignItems:"center",justifyContent:"center",flexGrow:1,color:e.palette.primary.contrastText},dialogActions:{paddingBottom:"env(safe-area-inset-bottom)"},stack:{height:44,display:"flex",flexGrow:1,paddingLeft:16,justifyContent:"space-between",flexWrap:"wrap"},stackLabel:{alignSelf:"center"},sliderPaper:{display:"flex",flexDirection:"row",padding:"16 24",alignItems:"center"}},"dialogActions",{paddingBottom:"env(safe-area-inset-bottom)"}),F(t,"powerLine",{width:"100%",padding:"16 16 16 12"}),F(t,"powerLabel",{padding:0}),t})(B)},275:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(1),i=n.n(o),l=n(3),s=n(94),c=n.n(s),p=n(95),u=n.n(p),d=n(12),f=n.n(d),m=n(9),h=n.n(m),y=n(8),g=n.n(y),b=n(41),v=n.n(b),S=n(55),w=n.n(S),P=n(263),C=n(239),O=n(521),x=n.n(O),k=n(520),E=n.n(k);function j(e){return(j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function N(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function I(e){return(I=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _(e,t){return(_=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function L(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function T(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var D=function(e){function t(e){var n,r,a;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),r=this,a=I(t).call(this,e),n=!a||"object"!==j(a)&&"function"!=typeof a?L(r):a,T(L(L(n)),"handlePreVolumeChange",function(e){n.setState({volume:e,target:n.props.name})}),T(L(L(n)),"handleVolumeChange",function(e){n.props.sendAlexaCommand(n.props.device.friendlyName,n.props.device.endpointId,"SpeakerController","SetVolume",{volume:e})}),T(L(L(n)),"handleMuteChange",function(e){n.props.sendAlexaCommand(n.props.device.friendlyName,n.props.device.endpointId,"SpeakerController","SetMute",{muted:!n.state.muted})}),T(L(L(n)),"handlePowerChange",function(e){n.setState({powerState:e.target.checked}),e.target.checked?n.props.sendAlexaCommand(n.props.device.friendlyName,n.props.device.endpointId,"PowerController","TurnOn"):n.props.sendAlexaCommand(n.props.device.friendlyName,n.props.device.endpointId,"PowerController","TurnOff")}),T(L(L(n)),"handleClickOpen",function(){n.setState({showdialog:!0})}),T(L(L(n)),"closeDialog",function(){n.setState({showdialog:!1})}),T(L(L(n)),"getYamahaInput",function(e){for(var t in n.state.inputs){if(e==t)return n.state.inputs[t];if(e==t.replace("_",""))return n.state.inputs[t]}return e}),n.state={powerState:"OFF",showdialog:!1,inputs:{},volume:50},n.closeDialog=n.closeDialog.bind(L(L(n))),n}var n,r,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_(e,t)}(t,a.a.Component),n=t,o=[{key:"getDerivedStateFromProps",value:function(e,t){var n={};return e.deviceProperties.powerState!==t.powerState&&(n.powerState=e.deviceProperties.powerState),e.deviceProperties.volume!==t.volume&&(n.volume=e.deviceProperties.volume),n}}],(r=[{key:"componentDidMount",value:function(){var e=this;fetch("/list/yamaha/inputs").then(function(e){return e.json()}).then(function(t){return e.setState({inputs:t})})}},{key:"render",value:function(){var e=this,t=this.props,n=t.classes,r=t.name,o=t.device,i=t.deviceProperties,l=this.state,s=l.powerState,p=l.inputs;return a.a.createElement(c.a,{className:n.card},a.a.createElement(u.a,{className:n.content},a.a.createElement(h.a,{className:n.listItem},a.a.createElement(f.a,{onClick:function(){return e.handleClickOpen()},className:"ON"==s?n.hotAvatar:n.normalAvatar},a.a.createElement(w.a,null)),a.a.createElement(g.a,{onClick:function(){return e.handleClickOpen()},primary:r,secondary:this.getYamahaInput(i.input)+" / "+i.surround}),a.a.createElement(v.a,{color:"primary",checked:"ON"==s,onChange:function(t){return e.handlePowerChange(t)}})),"Sonos"==this.getYamahaInput(i.input)||"OFF"==s?null:a.a.createElement(h.a,{className:n.listItem},a.a.createElement(f.a,{onClick:function(){return e.handleMuteChange()}},this.props.deviceProperties.muted?a.a.createElement(E.a,null):a.a.createElement(x.a,null)),a.a.createElement(C.default,{name:"Volume",unit:"%",min:0,max:100,defaultValue:0,step:1,value:this.state.volume,preChange:this.handlePreVolumeChange,change:this.handleVolumeChange,padLeft:!0}))),a.a.createElement(P.default,{input:this.getYamahaInput(i.input),inputs:p,sendAlexaCommand:this.props.sendAlexaCommand,showdialog:this.state.showdialog,closeDialog:this.closeDialog,name:r,device:o,deviceProperties:i,sendMessage:this.props.sendMessage}))}}])&&N(n.prototype,r),o&&N(n,o),t}();D.propTypes={classes:i.a.object.isRequired},t.default=Object(l.withStyles)(function(e){return{hotAvatar:{backgroundColor:e.palette.primary.main,color:e.palette.primary.contrastText},icon:{minWidth:62,height:62,width:62,alignSelf:"flex-end"},listItem:{padding:"16 0",width:"100%"},card:{display:"flex",maxWidth:"480px",margin:"0 8",boxSizing:"border-box",justifyContent:"space-between",padding:"4 16"},xcontent:{minWidth:0,padding:"0 !important",flexGrow:1,display:"flex",alignItems:"center"},content:{width:"100%",padding:"0 !important",display:"flex",flexDirection:"column"}}})(D)},296:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(1),i=n.n(o),l=n(3),s=n(29),c=n(275);function p(e){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function m(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function h(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var y=function(e){function t(e){var n,r,a;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),r=this,a=d(t).call(this,e),n=!a||"object"!==p(a)&&"function"!=typeof a?m(r):a,h(m(m(n)),"handleGrid",function(e){e.stopPropagation(),n.setState({showGrid:!0})}),h(m(m(n)),"handleCloseGrid",function(e){e.stopPropagation(),n.setState({showGrid:!1})}),h(m(m(n)),"chooseActivePlayer",function(e){n.setState({activePlayer:e,showGrid:!1})}),h(m(m(n)),"isPlayerActive",function(e){return!!n.props.deviceProperties[e].hasOwnProperty("playbackState")&&"STOPPED"!=n.props.deviceProperties[e].playbackState}),n.state={activePlayer:"Office",showGrid:!1},n.chooseActivePlayer=n.chooseActivePlayer.bind(m(m(n))),n.handleGrid=n.handleGrid.bind(m(m(n))),n}var n,r,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(t,a.a.Component),n=t,(r=[{key:"componentDidMount",value:function(){var e=this;fetch("/list/yamaha/inputs").then(function(e){return e.json()}).then(function(t){return e.setState({inputs:t})})}},{key:"render",value:function(){var e=this,t=this.props.classes;return a.a.createElement("div",{className:t.list},this.props.devices.map(function(t){return a.a.createElement(c.default,{sendAlexaCommand:e.props.sendAlexaCommand,key:t.endpointId,name:t.friendlyName,device:t,deviceProperties:e.props.deviceProperties[t.friendlyName],sendMessage:e.props.sendMessage})}))}}])&&u(n.prototype,r),o&&u(n,o),t}();y.propTypes={classes:i.a.object.isRequired},t.default=Object(s.withData)(Object(l.withStyles)(function(e){return{list:{paddingBottom:4,minWidth:320}}})(y))}}]);