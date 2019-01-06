(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[194],{

/***/ "./src/light/lightDialogOnLevel.js":
/*!*****************************************!*\
  !*** ./src/light/lightDialogOnLevel.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ \"./node_modules/@material-ui/core/styles/index.js\");\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/ListItem */ \"./node_modules/@material-ui/core/ListItem/index.js\");\n/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _sofaSlider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../sofaSlider */ \"./src/sofaSlider.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\nvar styles = function styles(theme) {\n  return {\n    root: {\n      width: '100%',\n      display: 'flex',\n      flexWrap: 'wrap'\n    }\n  };\n};\n\nvar LightDialogOnLevel =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(LightDialogOnLevel, _React$Component);\n\n  function LightDialogOnLevel(props) {\n    var _this;\n\n    _classCallCheck(this, LightDialogOnLevel);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(LightDialogOnLevel).call(this, props));\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"handlePreOnLevelChange\", function (value) {\n      _this.setState({\n        onLevel: value\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"handleOnLevelChange\", function (event) {\n      console.log('Levelchange', _this.state.onLevel);\n\n      _this.props.sendAlexaCommand(_this.props.name, _this.props.endpointId, \"SwitchController\", \"SetOnLevel\", {\n        \"onLevel\": event\n      });\n    });\n\n    _this.state = {\n      onLevel: \"no\"\n    };\n    return _this;\n  }\n\n  _createClass(LightDialogOnLevel, [{\n    key: \"render\",\n    value: function render() {\n      var classes = this.props.classes;\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_3___default.a, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_sofaSlider__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n        name: \"On Level\",\n        value: this.state.onLevel,\n        unit: \"%\",\n        min: 0,\n        max: 100,\n        step: 10,\n        preChange: this.handlePreOnLevelChange,\n        change: this.handleOnLevelChange,\n        disabled: !this.props.powerState\n      }));\n    }\n  }], [{\n    key: \"getDerivedStateFromProps\",\n    value: function getDerivedStateFromProps(nextProps, prevState) {\n      var data = nextProps;\n      var changes = {};\n\n      if (data.hasOwnProperty('onLevel')) {\n        changes.onLevel = data.onLevel;\n      }\n\n      return changes;\n    }\n  }]);\n\n  return LightDialogOnLevel;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\nLightDialogOnLevel.propTypes = {\n  classes: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__[\"withStyles\"])(styles)(LightDialogOnLevel));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbGlnaHQvbGlnaHREaWFsb2dPbkxldmVsLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2xpZ2h0L2xpZ2h0RGlhbG9nT25MZXZlbC5qcz84ZmE2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyB3aXRoU3R5bGVzIH0gZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvc3R5bGVzJztcblxuaW1wb3J0IExpc3RJdGVtIGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL0xpc3RJdGVtJztcbmltcG9ydCBTb2ZhU2xpZGVyIGZyb20gJy4uL3NvZmFTbGlkZXInO1xuXG5jb25zdCBzdHlsZXMgPSB0aGVtZSA9PiAoe1xuICAgICAgICBcbiAgICByb290OiB7XG4gICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgZmxleFdyYXA6ICd3cmFwJyxcbiAgICB9LFxufSk7XG5cbmNsYXNzIExpZ2h0RGlhbG9nT25MZXZlbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBvbkxldmVsOiBcIm5vXCIsXG4gICAgICAgIH07XG4gICAgfSBcbiAgICBcbiAgICBzdGF0aWMgZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzKG5leHRQcm9wcywgcHJldlN0YXRlKSB7XG5cbiAgICAgICAgdmFyIGRhdGE9bmV4dFByb3BzXG4gICAgICAgIHZhciBjaGFuZ2VzPXt9XG4gICAgICAgIFxuICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSgnb25MZXZlbCcpKSB7XG4gICAgICAgICAgICBjaGFuZ2VzLm9uTGV2ZWw9ZGF0YS5vbkxldmVsXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2hhbmdlc1xuICAgIH0gXG4gICAgXG4gICAgaGFuZGxlUHJlT25MZXZlbENoYW5nZSA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgb25MZXZlbDogdmFsdWUgfSk7XG4gICAgfTsgXG5cbiAgICBoYW5kbGVPbkxldmVsQ2hhbmdlID0gZXZlbnQgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnTGV2ZWxjaGFuZ2UnLCB0aGlzLnN0YXRlLm9uTGV2ZWwpXG4gICAgICAgIHRoaXMucHJvcHMuc2VuZEFsZXhhQ29tbWFuZCh0aGlzLnByb3BzLm5hbWUsIHRoaXMucHJvcHMuZW5kcG9pbnRJZCwgXCJTd2l0Y2hDb250cm9sbGVyXCIsIFwiU2V0T25MZXZlbFwiLCB7IFwib25MZXZlbFwiIDogZXZlbnQgfSApXG4gICAgfTsgXG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgY29uc3QgeyBjbGFzc2VzIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPExpc3RJdGVtPlxuICAgICAgICAgICAgICAgICAgICA8U29mYVNsaWRlclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cIk9uIExldmVsXCIgdmFsdWU9e3RoaXMuc3RhdGUub25MZXZlbH0gdW5pdD1cIiVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgbWluPXswfSBtYXg9ezEwMH0gc3RlcD17MTB9XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVDaGFuZ2U9e3RoaXMuaGFuZGxlUHJlT25MZXZlbENoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZT17dGhpcy5oYW5kbGVPbkxldmVsQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyF0aGlzLnByb3BzLnBvd2VyU3RhdGV9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9MaXN0SXRlbT5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkxpZ2h0RGlhbG9nT25MZXZlbC5wcm9wVHlwZXMgPSB7XG4gICAgY2xhc3NlczogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcyhzdHlsZXMpKExpZ2h0RGlhbG9nT25MZXZlbCk7XG5cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFGQTtBQUFBO0FBQ0E7QUFRQTs7Ozs7QUFFQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQUZBO0FBcUJBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUF2QkE7QUF5QkE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUF6QkE7QUFDQTtBQURBO0FBSEE7QUFNQTtBQUNBOzs7QUFzQkE7QUFBQTtBQUlBO0FBR0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFTQTs7O0FBcENBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBcEJBO0FBQ0E7QUFnREE7QUFDQTtBQURBO0FBSUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/light/lightDialogOnLevel.js\n");

/***/ }),

/***/ "./src/sofaSlider.js":
/*!***************************!*\
  !*** ./src/sofaSlider.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ \"./node_modules/@material-ui/core/styles/index.js\");\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Typography */ \"./node_modules/@material-ui/core/Typography/index.js\");\n/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _material_ui_lab_Slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/lab/Slider */ \"./node_modules/@material-ui/lab/Slider/index.js\");\n/* harmony import */ var _material_ui_lab_Slider__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_lab_Slider__WEBPACK_IMPORTED_MODULE_4__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n;\n\nvar styles = function styles(theme) {\n  return {\n    half: {\n      alignItems: \"center\",\n      display: \"flex\",\n      height: 42,\n      flexGrow: 1,\n      flexBasis: 0,\n      boxSizing: \"border-box\"\n    },\n    stack: {\n      height: \"auto\",\n      display: \"flex\",\n      flexGrow: 1,\n      justifyContent: \"space-between\",\n      flexWrap: \"wrap\",\n      width: \"100%\",\n      boxSizing: \"border-box\",\n      marginRight: 8,\n      overflowX: \"hidden\",\n      alignItems: \"center\",\n      paddingRight: 8\n    },\n    padLeft: {\n      paddingLeft: 16\n    },\n    xstackLabel: {\n      alignSelf: \"flex-end\"\n    },\n    slider: {\n      padding: \"8px 0\"\n    }\n  };\n};\n\nvar SofaSlider =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(SofaSlider, _React$Component);\n\n  function SofaSlider(props) {\n    var _this;\n\n    _classCallCheck(this, SofaSlider);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(SofaSlider).call(this, props));\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"handleDrag\", function (event, value) {\n      //console.log('handledrag',event.target, value, this.state.drag)\n      _this.setState({\n        prechange: false\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"handlePostPreChange\", function (event) {\n      _this.props.preChange(event);\n\n      if (_this.state.sendPrechange) {\n        _this.props.change(_this.state.value);\n\n        _this.setState({\n          sendPrechange: false\n        });\n      }\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"handlePreChange\", function (event, value) {\n      //console.log('handleprechange',value, this.state.drag)\n      _this.setState({\n        value: value,\n        delaySet: true,\n        prechange: true\n      }, function () {\n        return _this.handlePostPreChange(event);\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"handleChange\", function (event, value) {\n      //console.log('handlechange',value, this.state.drag)\n      _this.setState({\n        drag: false\n      });\n\n      if (_this.state.prechange) {\n        _this.props.change(_this.state.value);\n      } else {\n        _this.setState({\n          sendPrechange: true\n        });\n\n        console.log('change called before prechange');\n      }\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"delaySliderUpdates\", function () {\n      //console.log('dsu')\n      _this.setState({\n        delaySet: true\n      }, function () {\n        return setTimeout(function () {\n          return endSliderDelay();\n        }, 1000);\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"endSliderDelay\", function () {\n      _this.setState({\n        delaySet: false\n      });\n    });\n\n    _this.state = {\n      value: 0,\n      delaySet: false,\n      drag: false,\n      prechange: false,\n      sendPrechange: false\n    };\n    return _this;\n  }\n\n  _createClass(SofaSlider, [{\n    key: \"render\",\n    value: function render() {\n      var _this$props = this.props,\n          classes = _this$props.classes,\n          disabled = _this$props.disabled,\n          name = _this$props.name,\n          unit = _this$props.unit,\n          padLeft = _this$props.padLeft,\n          half = _this$props.half,\n          minWidth = _this$props.minWidth,\n          smallText = _this$props.smallText;\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        style: {\n          \"minWidth\": minWidth\n        },\n        className: padLeft ? classes.stack + \" \" + classes.padLeft : half ? classes.half : classes.stack\n      }, name ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default.a, {\n        variant: smallText ? \"caption\" : \"subtitle1\",\n        className: classes.stackLabel\n      }, this.props.name) : null, unit ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default.a, {\n        variant: \"caption\",\n        className: classes.stackLabel\n      }, Math.floor(this.state.value) + this.props.unit) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_lab_Slider__WEBPACK_IMPORTED_MODULE_4___default.a, {\n        classes: {\n          container: classes.slider\n        },\n        value: this.state.value,\n        step: this.props.step,\n        min: this.props.min,\n        max: this.props.max,\n        onChange: this.handlePreChange,\n        onDragEnd: this.handleChange,\n        onDragStart: this.handleDrag,\n        disabled: this.props.disabled\n      }));\n    }\n  }], [{\n    key: \"getDerivedStateFromProps\",\n    value: function getDerivedStateFromProps(nextProps, prevState) {\n      var data = nextProps.deviceProperties;\n      var changes = {};\n\n      if (!prevState.delaySet) {\n        if (nextProps.hasOwnProperty('value')) {\n          changes.value = nextProps.value;\n        }\n      }\n\n      return changes;\n    }\n  }]);\n\n  return SofaSlider;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\nSofaSlider.defaultProps = {\n  name: '',\n  unit: '',\n  min: 0,\n  max: 100,\n  step: 1,\n  default: 0,\n  value: 0,\n  tabs: '',\n  disabled: false,\n  padLeft: false,\n  half: false,\n  minWidth: 240,\n  smallText: false\n};\nSofaSlider.propTypes = {\n  classes: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__[\"withStyles\"])(styles)(SofaSlider));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc29mYVNsaWRlci5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9zb2ZhU2xpZGVyLmpzPzE5ZmUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IHdpdGhTdHlsZXMgfSBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9zdHlsZXMnO1xuaW1wb3J0IFR5cG9ncmFwaHkgZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvVHlwb2dyYXBoeSc7XG5pbXBvcnQgU2xpZGVyIGZyb20gJ0BtYXRlcmlhbC11aS9sYWIvU2xpZGVyJzs7XG5cbmNvbnN0IHN0eWxlcyA9IHRoZW1lID0+ICh7XG4gXG4gICAgaGFsZjoge1xuICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgaGVpZ2h0OiA0MixcbiAgICAgICAgZmxleEdyb3c6IDEsXG4gICAgICAgIGZsZXhCYXNpczogMCxcbiAgICAgICAgYm94U2l6aW5nOiBcImJvcmRlci1ib3hcIixcbiAgICB9LFxuICAgIHN0YWNrOiB7XG4gICAgICAgIGhlaWdodDogXCJhdXRvXCIsXG4gICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICBmbGV4R3JvdzogMSxcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6IFwic3BhY2UtYmV0d2VlblwiLFxuICAgICAgICBmbGV4V3JhcDogXCJ3cmFwXCIsXG4gICAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgICAgYm94U2l6aW5nOiBcImJvcmRlci1ib3hcIixcbiAgICAgICAgbWFyZ2luUmlnaHQ6IDgsXG4gICAgICAgIG92ZXJmbG93WDogXCJoaWRkZW5cIixcbiAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgICAgcGFkZGluZ1JpZ2h0OiA4LFxuICAgIH0sXG4gICAgcGFkTGVmdDoge1xuICAgICAgICBwYWRkaW5nTGVmdDogMTYsXG4gICAgfSxcbiAgICB4c3RhY2tMYWJlbDoge1xuICAgICAgICBhbGlnblNlbGY6IFwiZmxleC1lbmRcIixcbiAgICB9LFxuICAgIHNsaWRlcjoge1xuICAgICAgICBwYWRkaW5nOiBcIjhweCAwXCIsXG4gICAgfVxuXG59KTtcblxuY2xhc3MgU29mYVNsaWRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICB2YWx1ZTogMCxcbiAgICAgICAgICAgIGRlbGF5U2V0OiBmYWxzZSxcbiAgICAgICAgICAgIGRyYWc6IGZhbHNlLFxuICAgICAgICAgICAgcHJlY2hhbmdlOiBmYWxzZSxcbiAgICAgICAgICAgIHNlbmRQcmVjaGFuZ2U6IGZhbHNlLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIFxuICAgIHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMobmV4dFByb3BzLCBwcmV2U3RhdGUpIHtcblxuICAgICAgICB2YXIgZGF0YT1uZXh0UHJvcHMuZGV2aWNlUHJvcGVydGllc1xuICAgICAgICB2YXIgY2hhbmdlcz17fVxuXG4gICAgICAgIGlmICghcHJldlN0YXRlLmRlbGF5U2V0KSB7XG4gICAgICAgICAgICBpZiAobmV4dFByb3BzLmhhc093blByb3BlcnR5KCd2YWx1ZScpKSB7XG4gICAgICAgICAgICAgICAgY2hhbmdlcy52YWx1ZT1uZXh0UHJvcHMudmFsdWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hhbmdlc1xuICAgIH1cblxuICAgIGhhbmRsZURyYWcgPSAoZXZlbnQsdmFsdWUpID0+IHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnaGFuZGxlZHJhZycsZXZlbnQudGFyZ2V0LCB2YWx1ZSwgdGhpcy5zdGF0ZS5kcmFnKVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtwcmVjaGFuZ2U6ZmFsc2V9KVxuICAgIH1cblxuICAgIGhhbmRsZVBvc3RQcmVDaGFuZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5wcmVDaGFuZ2UoZXZlbnQpO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5zZW5kUHJlY2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmNoYW5nZSh0aGlzLnN0YXRlLnZhbHVlKVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VuZFByZWNoYW5nZTpmYWxzZX0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVQcmVDaGFuZ2UgPSAoZXZlbnQsdmFsdWUpID0+IHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnaGFuZGxlcHJlY2hhbmdlJyx2YWx1ZSwgdGhpcy5zdGF0ZS5kcmFnKVxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgdmFsdWU6IHZhbHVlLCBkZWxheVNldDogdHJ1ZSwgcHJlY2hhbmdlOnRydWV9LCAoKSA9PiB0aGlzLmhhbmRsZVBvc3RQcmVDaGFuZ2UoZXZlbnQpKTtcbiAgICB9OyBcblxuICAgIGhhbmRsZUNoYW5nZSA9IChldmVudCx2YWx1ZSkgPT4ge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdoYW5kbGVjaGFuZ2UnLHZhbHVlLCB0aGlzLnN0YXRlLmRyYWcpXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2RyYWc6IGZhbHNlfSlcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUucHJlY2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmNoYW5nZSh0aGlzLnN0YXRlLnZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbmRQcmVjaGFuZ2U6IHRydWV9KVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NoYW5nZSBjYWxsZWQgYmVmb3JlIHByZWNoYW5nZScpXG4gICAgICAgIH1cbiAgICB9OyBcbiAgICBcbiAgICBkZWxheVNsaWRlclVwZGF0ZXMgPSAoKSA9PiB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ2RzdScpXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBkZWxheVNldDogdHJ1ZX0sXG4gICAgICAgICAgICAoKSA9PiAgc2V0VGltZW91dCgoKSA9PiBlbmRTbGlkZXJEZWxheSgpLCAxMDAwKVxuICAgICAgICApXG4gICAgfVxuICAgIFxuICAgIGVuZFNsaWRlckRlbGF5ID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgZGVsYXlTZXQ6IGZhbHNlfSk7XG4gICAgfVxuICAgXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGNvbnN0IHsgY2xhc3NlcywgZGlzYWJsZWQsIG5hbWUsIHVuaXQsIHBhZExlZnQsIGhhbGYsIG1pbldpZHRoLCBzbWFsbFRleHQgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBcIm1pbldpZHRoXCI6IG1pbldpZHRoIH19IGNsYXNzTmFtZT17IHBhZExlZnQgPyBjbGFzc2VzLnN0YWNrK1wiIFwiK2NsYXNzZXMucGFkTGVmdDogKCBoYWxmID8gY2xhc3Nlcy5oYWxmIDogY2xhc3Nlcy5zdGFjaykgfSA+XG4gICAgICAgICAgICAgICAgICAgIHsgbmFtZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICA8VHlwb2dyYXBoeSB2YXJpYW50PXsgc21hbGxUZXh0ID8gXCJjYXB0aW9uXCIgOiBcInN1YnRpdGxlMVwiIH0gY2xhc3NOYW1lPXtjbGFzc2VzLnN0YWNrTGFiZWx9ID57dGhpcy5wcm9wcy5uYW1lfTwvVHlwb2dyYXBoeT5cbiAgICAgICAgICAgICAgICAgICAgOiAgIG51bGwgfVxuICAgICAgICAgICAgICAgICAgICB7IHVuaXQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgPFR5cG9ncmFwaHkgdmFyaWFudD1cImNhcHRpb25cIiBjbGFzc05hbWU9e2NsYXNzZXMuc3RhY2tMYWJlbH0gPntNYXRoLmZsb29yKHRoaXMuc3RhdGUudmFsdWUpK3RoaXMucHJvcHMudW5pdH08L1R5cG9ncmFwaHk+XG4gICAgICAgICAgICAgICAgICAgIDogbnVsbCB9XG4gICAgICAgICAgICAgICAgICAgICAgICA8U2xpZGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcz17eyBjb250YWluZXI6IGNsYXNzZXMuc2xpZGVyIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9IHN0ZXA9e3RoaXMucHJvcHMuc3RlcH0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluPXt0aGlzLnByb3BzLm1pbn0gbWF4PXt0aGlzLnByb3BzLm1heH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVQcmVDaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25EcmFnRW5kPXt0aGlzLmhhbmRsZUNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRyYWdTdGFydD17dGhpcy5oYW5kbGVEcmFnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLnByb3BzLmRpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblNvZmFTbGlkZXIuZGVmYXVsdFByb3BzID0ge1xuICAgIG5hbWU6ICcnLFxuICAgIHVuaXQ6ICcnLFxuICAgIG1pbjogMCxcbiAgICBtYXg6IDEwMCxcbiAgICBzdGVwOiAxLFxuICAgIGRlZmF1bHQ6IDAsXG4gICAgdmFsdWU6IDAsXG4gICAgdGFiczogJycsXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgIHBhZExlZnQ6IGZhbHNlLFxuICAgIGhhbGY6IGZhbHNlLFxuICAgIG1pbldpZHRoOiAyNDAsXG4gICAgc21hbGxUZXh0OiBmYWxzZSxcbn1cblxuU29mYVNsaWRlci5wcm9wVHlwZXMgPSB7XG4gICAgY2xhc3NlczogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcyhzdHlsZXMpKFNvZmFTbGlkZXIpO1xuXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBWEE7QUFhQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBREE7QUE3QkE7QUFBQTtBQUNBO0FBa0NBOzs7OztBQUVBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBRkE7QUEyQkE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBOUJBO0FBZ0NBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUF0Q0E7QUF3Q0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUEzQ0E7QUE2Q0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUF0REE7QUF3REE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUE3REE7QUErREE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQTlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQUhBO0FBVUE7QUFDQTs7O0FBdURBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBWUE7OztBQTdFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7Ozs7QUExQkE7QUFDQTtBQThGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBYkE7QUFnQkE7QUFDQTtBQURBO0FBSUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/sofaSlider.js\n");

/***/ })

}]);