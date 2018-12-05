(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./src/light/lightDialogTemperature.js":
/*!*********************************************!*\
  !*** ./src/light/lightDialogTemperature.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ \"./node_modules/@material-ui/core/styles/index.js\");\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _material_ui_core_List__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/List */ \"./node_modules/@material-ui/core/List/index.js\");\n/* harmony import */ var _material_ui_core_List__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_List__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/ListItem */ \"./node_modules/@material-ui/core/ListItem/index.js\");\n/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/ListItemText */ \"./node_modules/@material-ui/core/ListItemText/index.js\");\n/* harmony import */ var _material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _sofaSlider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../sofaSlider */ \"./src/sofaSlider.js\");\n/* harmony import */ var _material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Chip */ \"./node_modules/@material-ui/core/Chip/index.js\");\n/* harmony import */ var _material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_7__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\n\n\n\nvar styles = function styles(theme) {\n  return {\n    chip: {\n      background: \"silver\",\n      color: \"black\",\n      margin: theme.spacing.unit\n    },\n    hotchip: {\n      background: \"orangeRed\",\n      color: \"white\",\n      margin: theme.spacing.unit\n    },\n    listItemLabel: {\n      paddingBottom: 0\n    },\n    chipLine: {\n      paddingTop: 0,\n      paddingLeft: 8,\n      paddingRight: 8\n    }\n  };\n};\n\nvar LightDialogTemperature =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(LightDialogTemperature, _React$Component);\n\n  function LightDialogTemperature(props) {\n    var _this;\n\n    _classCallCheck(this, LightDialogTemperature);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(LightDialogTemperature).call(this, props));\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"handlePreColorTemperatureChange\", function (value) {\n      _this.setState({\n        colorTemperatureInKelvin: value\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"handleColorTemperatureChange\", function (value) {\n      _this.props.sendAlexaCommand(_this.props.name, _this.props.endpointId, \"ColorTemperatureController\", \"SetColorTemperature\", {\n        \"colorTemperatureInKelvin\": value\n      });\n    });\n\n    _this.state = {\n      colorTemperatureInKelvin: 4000\n    };\n    return _this;\n  }\n\n  _createClass(LightDialogTemperature, [{\n    key: \"render\",\n    value: function render() {\n      var _this2 = this;\n\n      var classes = this.props.classes;\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_4___default.a, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_sofaSlider__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n        name: \"White Color Temperature\",\n        unit: \"°\",\n        value: this.state.colorTemperatureInKelvin,\n        min: 2000,\n        max: 7000,\n        step: 100,\n        preChange: this.handlePreColorTemperatureChange,\n        change: this.handleColorTemperatureChange,\n        disabled: !this.props.powerState\n      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_4___default.a, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_7___default.a, {\n        key: \"warm\",\n        label: \"warm\",\n        className: this.props.colorTemperatureInKelvin == 2200 ? classes.hotchip : classes.chip,\n        onClick: function onClick() {\n          return _this2.handleColorTemperatureChange(2200);\n        }\n      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_7___default.a, {\n        key: \"soft\",\n        label: \"soft\",\n        className: this.props.colorTemperatureInKelvin == 2700 ? classes.hotchip : classes.chip,\n        onClick: function onClick() {\n          return _this2.handleColorTemperatureChange(2700);\n        }\n      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_7___default.a, {\n        key: \"white\",\n        label: \"white\",\n        className: this.props.colorTemperatureInKelvin == 4000 ? classes.hotchip : classes.chip,\n        onClick: function onClick() {\n          return _this2.handleColorTemperatureChange(4000);\n        }\n      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_7___default.a, {\n        key: \"day\",\n        label: \"day\",\n        className: this.props.colorTemperatureInKelvin == 5500 ? classes.hotchip : classes.chip,\n        onClick: function onClick() {\n          return _this2.handleColorTemperatureChange(5500);\n        }\n      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_7___default.a, {\n        key: \"cool\",\n        label: \"cool\",\n        className: this.props.colorTemperatureInKelvin == 7000 ? classes.hotchip : classes.chip,\n        onClick: function onClick() {\n          return _this2.handleColorTemperatureChange(7000);\n        }\n      })));\n    }\n  }], [{\n    key: \"getDerivedStateFromProps\",\n    value: function getDerivedStateFromProps(nextProps, prevState) {\n      var changes = {};\n\n      if (nextProps.colorTemperatureInKelvin !== prevState.colorTemperatureInKelvin) {\n        changes['colorTemperatureInKelvin'] = nextProps.colorTemperatureInKelvin;\n      }\n\n      return changes;\n    }\n  }]);\n\n  return LightDialogTemperature;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\nLightDialogTemperature.propTypes = {\n  classes: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__[\"withStyles\"])(styles)(LightDialogTemperature));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbGlnaHQvbGlnaHREaWFsb2dUZW1wZXJhdHVyZS5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9saWdodC9saWdodERpYWxvZ1RlbXBlcmF0dXJlLmpzPzUyMzkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IHdpdGhTdHlsZXMgfSBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9zdHlsZXMnO1xuXG5pbXBvcnQgTGlzdCBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9MaXN0JztcbmltcG9ydCBMaXN0SXRlbSBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9MaXN0SXRlbSc7XG5pbXBvcnQgTGlzdEl0ZW1UZXh0IGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL0xpc3RJdGVtVGV4dCc7XG5pbXBvcnQgU29mYVNsaWRlciBmcm9tICcuLi9zb2ZhU2xpZGVyJztcbmltcG9ydCBDaGlwIGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL0NoaXAnO1xuXG5jb25zdCBzdHlsZXMgPSB0aGVtZSA9PiAoe1xuICAgICAgICBcbiAgICBjaGlwOiB7XG4gICAgICAgIGJhY2tncm91bmQ6IFwic2lsdmVyXCIsXG4gICAgICAgIGNvbG9yOiBcImJsYWNrXCIsXG4gICAgICAgIG1hcmdpbjogdGhlbWUuc3BhY2luZy51bml0LFxuICAgIH0sXG4gICAgaG90Y2hpcDoge1xuICAgICAgICBiYWNrZ3JvdW5kOiBcIm9yYW5nZVJlZFwiLFxuICAgICAgICBjb2xvcjogXCJ3aGl0ZVwiLFxuICAgICAgICBtYXJnaW46IHRoZW1lLnNwYWNpbmcudW5pdCxcbiAgICB9LFxuICAgIGxpc3RJdGVtTGFiZWw6IHtcbiAgICAgICAgcGFkZGluZ0JvdHRvbTogMCxcbiAgICB9LFxuICAgIGNoaXBMaW5lOiB7XG4gICAgICAgIHBhZGRpbmdUb3A6MCxcbiAgICAgICAgcGFkZGluZ0xlZnQ6OCxcbiAgICAgICAgcGFkZGluZ1JpZ2h0OjgsXG4gICAgfVxufSk7XG5cbmNsYXNzIExpZ2h0RGlhbG9nVGVtcGVyYXR1cmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgY29sb3JUZW1wZXJhdHVyZUluS2VsdmluOiA0MDAwLFxuICAgICAgICB9O1xuICAgIH0gXG5cbiAgICBzdGF0aWMgZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzKG5leHRQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgY2hhbmdlcz17fVxuICAgICAgICBpZiAobmV4dFByb3BzLmNvbG9yVGVtcGVyYXR1cmVJbktlbHZpbiAhPT0gcHJldlN0YXRlLmNvbG9yVGVtcGVyYXR1cmVJbktlbHZpbikge1xuICAgICAgICAgICAgY2hhbmdlc1snY29sb3JUZW1wZXJhdHVyZUluS2VsdmluJ109bmV4dFByb3BzLmNvbG9yVGVtcGVyYXR1cmVJbktlbHZpblxuICAgICAgICB9ICBcbiAgICAgICAgcmV0dXJuIGNoYW5nZXNcbiAgICB9ICAgIFxuICAgIFxuICAgIGhhbmRsZVByZUNvbG9yVGVtcGVyYXR1cmVDaGFuZ2UgPSB2YWx1ZSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjb2xvclRlbXBlcmF0dXJlSW5LZWx2aW46IHZhbHVlIH0pO1xuICAgIH07IFxuXG4gICAgaGFuZGxlQ29sb3JUZW1wZXJhdHVyZUNoYW5nZSA9IHZhbHVlID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5zZW5kQWxleGFDb21tYW5kKHRoaXMucHJvcHMubmFtZSwgdGhpcy5wcm9wcy5lbmRwb2ludElkLCBcIkNvbG9yVGVtcGVyYXR1cmVDb250cm9sbGVyXCIsIFwiU2V0Q29sb3JUZW1wZXJhdHVyZVwiLCB7IFwiY29sb3JUZW1wZXJhdHVyZUluS2VsdmluXCI6IHZhbHVlfSApXG4gICAgfTsgXG4gICAgXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGNvbnN0IHsgY2xhc3NlcyB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxMaXN0SXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxTb2ZhU2xpZGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cIldoaXRlIENvbG9yIFRlbXBlcmF0dXJlXCIgdW5pdD17XCLCsFwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLmNvbG9yVGVtcGVyYXR1cmVJbktlbHZpbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW49ezIwMDB9IG1heD17NzAwMH0gc3RlcD17MTAwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZUNoYW5nZT17dGhpcy5oYW5kbGVQcmVDb2xvclRlbXBlcmF0dXJlQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZT17dGhpcy5oYW5kbGVDb2xvclRlbXBlcmF0dXJlQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshdGhpcy5wcm9wcy5wb3dlclN0YXRlfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9MaXN0SXRlbT5cbiAgICAgICAgICAgICAgICAgICAgPExpc3RJdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgPENoaXAga2V5ID0gJ3dhcm0nIGxhYmVsPSBcIndhcm1cIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyAgKHRoaXMucHJvcHMuY29sb3JUZW1wZXJhdHVyZUluS2VsdmluPT0yMjAwKSA/IGNsYXNzZXMuaG90Y2hpcCA6IGNsYXNzZXMuY2hpcCB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17ICgpID0+IHRoaXMuaGFuZGxlQ29sb3JUZW1wZXJhdHVyZUNoYW5nZSgyMjAwKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Q2hpcCBrZXkgPSAnc29mdCcgbGFiZWw9IFwic29mdFwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17ICh0aGlzLnByb3BzLmNvbG9yVGVtcGVyYXR1cmVJbktlbHZpbj09MjcwMCkgPyBjbGFzc2VzLmhvdGNoaXAgOiBjbGFzc2VzLmNoaXB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17ICgpID0+IHRoaXMuaGFuZGxlQ29sb3JUZW1wZXJhdHVyZUNoYW5nZSgyNzAwKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Q2hpcCBrZXkgPSAnd2hpdGUnIGxhYmVsPSBcIndoaXRlXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgICh0aGlzLnByb3BzLmNvbG9yVGVtcGVyYXR1cmVJbktlbHZpbj09NDAwMCkgPyBjbGFzc2VzLmhvdGNoaXAgOiBjbGFzc2VzLmNoaXAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyAoKSA9PiB0aGlzLmhhbmRsZUNvbG9yVGVtcGVyYXR1cmVDaGFuZ2UoNDAwMCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPENoaXAga2V5ID0gJ2RheScgbGFiZWw9IFwiZGF5XCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgICh0aGlzLnByb3BzLmNvbG9yVGVtcGVyYXR1cmVJbktlbHZpbj09NTUwMCkgPyBjbGFzc2VzLmhvdGNoaXAgOiBjbGFzc2VzLmNoaXAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyAoKSA9PiB0aGlzLmhhbmRsZUNvbG9yVGVtcGVyYXR1cmVDaGFuZ2UoNTUwMCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPENoaXAga2V5ID0gJ2Nvb2wnIGxhYmVsPSBcImNvb2xcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyAgKHRoaXMucHJvcHMuY29sb3JUZW1wZXJhdHVyZUluS2VsdmluPT03MDAwKSA/IGNsYXNzZXMuaG90Y2hpcCA6IGNsYXNzZXMuY2hpcCB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17ICgpID0+IHRoaXMuaGFuZGxlQ29sb3JUZW1wZXJhdHVyZUNoYW5nZSg3MDAwKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvTGlzdEl0ZW0+XG4gICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5MaWdodERpYWxvZ1RlbXBlcmF0dXJlLnByb3BUeXBlcyA9IHtcbiAgICBjbGFzc2VzOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHN0eWxlcykoTGlnaHREaWFsb2dUZW1wZXJhdHVyZSk7XG5cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQWZBO0FBQUE7QUFDQTtBQXFCQTs7Ozs7QUFFQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQUZBO0FBa0JBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFwQkE7QUFzQkE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQXJCQTtBQUNBO0FBREE7QUFIQTtBQU1BO0FBQ0E7OztBQWtCQTtBQUFBO0FBQ0E7QUFEQTtBQUlBO0FBSUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFVQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFGQTtBQUlBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUZBO0FBSUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBRkE7QUFJQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFGQTtBQUlBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUZBO0FBT0E7OztBQXpEQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7Ozs7QUFqQkE7QUFDQTtBQXFFQTtBQUNBO0FBREE7QUFJQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/light/lightDialogTemperature.js\n");

/***/ }),

/***/ "./src/sofaSlider.js":
/*!***************************!*\
  !*** ./src/sofaSlider.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ \"./node_modules/@material-ui/core/styles/index.js\");\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Typography */ \"./node_modules/@material-ui/core/Typography/index.js\");\n/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _material_ui_lab_Slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/lab/Slider */ \"./node_modules/@material-ui/lab/Slider/index.js\");\n/* harmony import */ var _material_ui_lab_Slider__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_lab_Slider__WEBPACK_IMPORTED_MODULE_4__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n;\n\nvar styles = function styles(theme) {\n  return {\n    half: {\n      alignItems: \"center\",\n      display: \"flex\",\n      height: 42,\n      flexGrow: 1,\n      flexBasis: 0,\n      boxSizing: \"border-box\"\n    },\n    stack: {\n      height: 42,\n      display: \"flex\",\n      flexGrow: 1,\n      justifyContent: \"space-between\",\n      flexWrap: \"wrap\",\n      width: \"100%\",\n      boxSizing: \"border-box\",\n      marginRight: 8,\n      overflowX: \"hidden\"\n    },\n    padLeft: {\n      paddingLeft: 16\n    },\n    xstackLabel: {\n      alignSelf: \"flex-end\"\n    }\n  };\n};\n\nvar SofaSlider =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(SofaSlider, _React$Component);\n\n  function SofaSlider(props) {\n    var _this;\n\n    _classCallCheck(this, SofaSlider);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(SofaSlider).call(this, props));\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"handleDrag\", function (event, value) {\n      console.log('handledrag', event.target, value, _this.state.drag);\n\n      _this.setState({\n        prechange: false\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"handlePostPreChange\", function (event) {\n      _this.props.preChange(event);\n\n      if (_this.state.sendPrechange) {\n        _this.props.change(_this.state.value);\n\n        _this.setState({\n          sendPrechange: false\n        });\n      }\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"handlePreChange\", function (event, value) {\n      console.log('handleprechange', value, _this.state.drag);\n\n      _this.setState({\n        value: value,\n        delaySet: true,\n        prechange: true\n      }, function () {\n        return _this.handlePostPreChange(event);\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"handleChange\", function (event, value) {\n      console.log('handlechange', value, _this.state.drag);\n\n      _this.setState({\n        drag: false\n      });\n\n      if (_this.state.prechange) {\n        _this.props.change(_this.state.value);\n      } else {\n        _this.setState({\n          sendPrechange: true\n        });\n\n        console.log('change called before prechange');\n      }\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"delaySliderUpdates\", function () {\n      console.log('dsu');\n\n      _this.setState({\n        delaySet: true\n      }, function () {\n        return setTimeout(function () {\n          return endSliderDelay();\n        }, 1000);\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"endSliderDelay\", function () {\n      _this.setState({\n        delaySet: false\n      });\n    });\n\n    _this.state = {\n      value: 0,\n      delaySet: false,\n      drag: false,\n      prechange: false,\n      sendPrechange: false\n    };\n    return _this;\n  }\n\n  _createClass(SofaSlider, [{\n    key: \"render\",\n    value: function render() {\n      var _this$props = this.props,\n          classes = _this$props.classes,\n          disabled = _this$props.disabled,\n          name = _this$props.name,\n          unit = _this$props.unit,\n          padLeft = _this$props.padLeft,\n          half = _this$props.half,\n          minWidth = _this$props.minWidth;\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        style: {\n          \"minWidth\": minWidth\n        },\n        className: padLeft ? classes.stack + \" \" + classes.padLeft : half ? classes.half : classes.stack\n      }, name ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default.a, {\n        variant: \"subtitle1\",\n        className: classes.stackLabel\n      }, this.props.name) : null, unit ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default.a, {\n        variant: \"caption\",\n        className: classes.stackLabel\n      }, Math.floor(this.state.value) + this.props.unit) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_lab_Slider__WEBPACK_IMPORTED_MODULE_4___default.a, {\n        classes: {\n          container: classes.slider\n        },\n        value: this.state.value,\n        step: this.props.step,\n        min: this.props.min,\n        max: this.props.max,\n        onChange: this.handlePreChange,\n        onDragEnd: this.handleChange,\n        onDragStart: this.handleDrag,\n        disabled: this.props.disabled\n      }));\n    }\n  }], [{\n    key: \"getDerivedStateFromProps\",\n    value: function getDerivedStateFromProps(nextProps, prevState) {\n      var data = nextProps.deviceProperties;\n      var changes = {};\n\n      if (!prevState.delaySet) {\n        if (nextProps.hasOwnProperty('value')) {\n          changes.value = nextProps.value;\n        }\n      }\n\n      return changes;\n    }\n  }]);\n\n  return SofaSlider;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\nSofaSlider.defaultProps = {\n  name: '',\n  unit: '',\n  min: 0,\n  max: 100,\n  step: 1,\n  default: 0,\n  value: 0,\n  tabs: '',\n  disabled: false,\n  padLeft: false,\n  half: false,\n  minWidth: 240\n};\nSofaSlider.propTypes = {\n  classes: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__[\"withStyles\"])(styles)(SofaSlider));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc29mYVNsaWRlci5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9zb2ZhU2xpZGVyLmpzPzE5ZmUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IHdpdGhTdHlsZXMgfSBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9zdHlsZXMnO1xuaW1wb3J0IFR5cG9ncmFwaHkgZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvVHlwb2dyYXBoeSc7XG5pbXBvcnQgU2xpZGVyIGZyb20gJ0BtYXRlcmlhbC11aS9sYWIvU2xpZGVyJzs7XG5cbmNvbnN0IHN0eWxlcyA9IHRoZW1lID0+ICh7XG4gXG4gICAgaGFsZjoge1xuICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgaGVpZ2h0OiA0MixcbiAgICAgICAgZmxleEdyb3c6IDEsXG4gICAgICAgIGZsZXhCYXNpczogMCxcbiAgICAgICAgYm94U2l6aW5nOiBcImJvcmRlci1ib3hcIixcbiAgICB9LFxuICAgIHN0YWNrOiB7XG4gICAgICAgIGhlaWdodDogNDIsXG4gICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICBmbGV4R3JvdzogMSxcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6IFwic3BhY2UtYmV0d2VlblwiLFxuICAgICAgICBmbGV4V3JhcDogXCJ3cmFwXCIsXG4gICAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgICAgYm94U2l6aW5nOiBcImJvcmRlci1ib3hcIixcbiAgICAgICAgbWFyZ2luUmlnaHQ6IDgsXG4gICAgICAgIG92ZXJmbG93WDogXCJoaWRkZW5cIixcbiAgICB9LFxuICAgIHBhZExlZnQ6IHtcbiAgICAgICAgcGFkZGluZ0xlZnQ6IDE2LFxuICAgIH0sXG4gICAgeHN0YWNrTGFiZWw6IHtcbiAgICAgICAgYWxpZ25TZWxmOiBcImZsZXgtZW5kXCIsXG4gICAgfSxcblxuXG59KTtcblxuY2xhc3MgU29mYVNsaWRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICB2YWx1ZTogMCxcbiAgICAgICAgICAgIGRlbGF5U2V0OiBmYWxzZSxcbiAgICAgICAgICAgIGRyYWc6IGZhbHNlLFxuICAgICAgICAgICAgcHJlY2hhbmdlOiBmYWxzZSxcbiAgICAgICAgICAgIHNlbmRQcmVjaGFuZ2U6IGZhbHNlLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIFxuICAgIHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMobmV4dFByb3BzLCBwcmV2U3RhdGUpIHtcblxuICAgICAgICB2YXIgZGF0YT1uZXh0UHJvcHMuZGV2aWNlUHJvcGVydGllc1xuICAgICAgICB2YXIgY2hhbmdlcz17fVxuXG4gICAgICAgIGlmICghcHJldlN0YXRlLmRlbGF5U2V0KSB7XG4gICAgICAgICAgICBpZiAobmV4dFByb3BzLmhhc093blByb3BlcnR5KCd2YWx1ZScpKSB7XG4gICAgICAgICAgICAgICAgY2hhbmdlcy52YWx1ZT1uZXh0UHJvcHMudmFsdWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hhbmdlc1xuICAgIH1cblxuICAgIGhhbmRsZURyYWcgPSAoZXZlbnQsdmFsdWUpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2hhbmRsZWRyYWcnLGV2ZW50LnRhcmdldCwgdmFsdWUsIHRoaXMuc3RhdGUuZHJhZylcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cHJlY2hhbmdlOmZhbHNlfSlcbiAgICB9XG5cbiAgICBoYW5kbGVQb3N0UHJlQ2hhbmdlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMucHJlQ2hhbmdlKGV2ZW50KTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuc2VuZFByZWNoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5jaGFuZ2UodGhpcy5zdGF0ZS52YWx1ZSlcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbmRQcmVjaGFuZ2U6ZmFsc2V9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlUHJlQ2hhbmdlID0gKGV2ZW50LHZhbHVlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdoYW5kbGVwcmVjaGFuZ2UnLHZhbHVlLCB0aGlzLnN0YXRlLmRyYWcpXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2YWx1ZTogdmFsdWUsIGRlbGF5U2V0OiB0cnVlLCBwcmVjaGFuZ2U6dHJ1ZX0sICgpID0+IHRoaXMuaGFuZGxlUG9zdFByZUNoYW5nZShldmVudCkpO1xuICAgIH07IFxuXG4gICAgaGFuZGxlQ2hhbmdlID0gKGV2ZW50LHZhbHVlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdoYW5kbGVjaGFuZ2UnLHZhbHVlLCB0aGlzLnN0YXRlLmRyYWcpXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2RyYWc6IGZhbHNlfSlcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUucHJlY2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmNoYW5nZSh0aGlzLnN0YXRlLnZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbmRQcmVjaGFuZ2U6IHRydWV9KVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NoYW5nZSBjYWxsZWQgYmVmb3JlIHByZWNoYW5nZScpXG4gICAgICAgIH1cbiAgICB9OyBcbiAgICBcbiAgICBkZWxheVNsaWRlclVwZGF0ZXMgPSAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkc3UnKVxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgZGVsYXlTZXQ6IHRydWV9LFxuICAgICAgICAgICAgKCkgPT4gIHNldFRpbWVvdXQoKCkgPT4gZW5kU2xpZGVyRGVsYXkoKSwgMTAwMClcbiAgICAgICAgKVxuICAgIH1cbiAgICBcbiAgICBlbmRTbGlkZXJEZWxheSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGRlbGF5U2V0OiBmYWxzZX0pO1xuICAgIH1cbiAgIFxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBjb25zdCB7IGNsYXNzZXMsIGRpc2FibGVkLCBuYW1lLCB1bml0LCBwYWRMZWZ0LCBoYWxmLCBtaW5XaWR0aCB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IFwibWluV2lkdGhcIjogbWluV2lkdGggfX0gY2xhc3NOYW1lPXsgcGFkTGVmdCA/IGNsYXNzZXMuc3RhY2srXCIgXCIrY2xhc3Nlcy5wYWRMZWZ0OiAoIGhhbGYgPyBjbGFzc2VzLmhhbGYgOiBjbGFzc2VzLnN0YWNrKSB9ID5cbiAgICAgICAgICAgICAgICAgICAgeyBuYW1lID9cbiAgICAgICAgICAgICAgICAgICAgICAgIDxUeXBvZ3JhcGh5IHZhcmlhbnQ9XCJzdWJ0aXRsZTFcIiBjbGFzc05hbWU9e2NsYXNzZXMuc3RhY2tMYWJlbH0gPnt0aGlzLnByb3BzLm5hbWV9PC9UeXBvZ3JhcGh5PlxuICAgICAgICAgICAgICAgICAgICA6IG51bGwgfVxuICAgICAgICAgICAgICAgICAgICB7IHVuaXQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgPFR5cG9ncmFwaHkgdmFyaWFudD1cImNhcHRpb25cIiBjbGFzc05hbWU9e2NsYXNzZXMuc3RhY2tMYWJlbH0gPntNYXRoLmZsb29yKHRoaXMuc3RhdGUudmFsdWUpK3RoaXMucHJvcHMudW5pdH08L1R5cG9ncmFwaHk+XG4gICAgICAgICAgICAgICAgICAgIDogbnVsbCB9XG4gICAgICAgICAgICAgICAgICAgICAgICA8U2xpZGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcz17eyBjb250YWluZXI6IGNsYXNzZXMuc2xpZGVyIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9IHN0ZXA9e3RoaXMucHJvcHMuc3RlcH0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluPXt0aGlzLnByb3BzLm1pbn0gbWF4PXt0aGlzLnByb3BzLm1heH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVQcmVDaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25EcmFnRW5kPXt0aGlzLmhhbmRsZUNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRyYWdTdGFydD17dGhpcy5oYW5kbGVEcmFnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLnByb3BzLmRpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblNvZmFTbGlkZXIuZGVmYXVsdFByb3BzID0ge1xuICAgIG5hbWU6ICcnLFxuICAgIHVuaXQ6ICcnLFxuICAgIG1pbjogMCxcbiAgICBtYXg6IDEwMCxcbiAgICBzdGVwOiAxLFxuICAgIGRlZmF1bHQ6IDAsXG4gICAgdmFsdWU6IDAsXG4gICAgdGFiczogJycsXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgIHBhZExlZnQ6IGZhbHNlLFxuICAgIGhhbGY6IGZhbHNlLFxuICAgIG1pbldpZHRoOiAyNDAsXG59XG5cblNvZmFTbGlkZXIucHJvcFR5cGVzID0ge1xuICAgIGNsYXNzZXM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZXMoc3R5bGVzKShTb2ZhU2xpZGVyKTtcblxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFXQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBREE7QUF4QkE7QUFBQTtBQUNBO0FBOEJBOzs7OztBQUVBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBRkE7QUEyQkE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUE5QkE7QUFnQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQXRDQTtBQXdDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBM0NBO0FBNkNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUF0REE7QUF3REE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQTdEQTtBQStEQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBSEE7QUFVQTtBQUNBOzs7QUF1REE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBWUE7OztBQTdFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7Ozs7QUExQkE7QUFDQTtBQThGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVpBO0FBZUE7QUFDQTtBQURBO0FBSUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/sofaSlider.js\n");

/***/ })

}]);