(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[164],{

/***/ "./node_modules/@material-ui/icons/Check.js":
/*!**************************************************!*\
  !*** ./node_modules/@material-ui/icons/Check.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@material-ui/icons/node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _createSvgIcon = _interopRequireDefault(__webpack_require__(/*! ./utils/createSvgIcon */ \"./node_modules/@material-ui/icons/utils/createSvgIcon.js\"));\n\nvar _default = (0, _createSvgIcon.default)(_react.default.createElement(_react.default.Fragment, null, _react.default.createElement(\"path\", {\n  fill: \"none\",\n  d: \"M0 0h24v24H0z\"\n}), _react.default.createElement(\"path\", {\n  d: \"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z\"\n})), 'Check');\n\nexports.default = _default;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsLXVpL2ljb25zL0NoZWNrLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC11aS9pY29ucy9DaGVjay5qcz9lNmIwIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcblxudmFyIF9yZWFjdCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcInJlYWN0XCIpKTtcblxudmFyIF9jcmVhdGVTdmdJY29uID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlscy9jcmVhdGVTdmdJY29uXCIpKTtcblxudmFyIF9kZWZhdWx0ID0gKDAsIF9jcmVhdGVTdmdJY29uLmRlZmF1bHQpKF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX3JlYWN0LmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHtcbiAgZmlsbDogXCJub25lXCIsXG4gIGQ6IFwiTTAgMGgyNHYyNEgwelwiXG59KSwgX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBhdGhcIiwge1xuICBkOiBcIk05IDE2LjE3TDQuODMgMTJsLTEuNDIgMS40MUw5IDE5IDIxIDdsLTEuNDEtMS40MXpcIlxufSkpLCAnQ2hlY2snKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/@material-ui/icons/Check.js\n");

/***/ }),

/***/ "./src/automation/automationDialog.js":
/*!********************************************!*\
  !*** ./src/automation/automationDialog.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _automationList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./automationList */ \"./src/automation/automationList.js\");\n/* harmony import */ var _automationEditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./automationEditor */ \"./src/automation/automationEditor.js\");\n/* harmony import */ var _sofaDialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../sofaDialog */ \"./src/sofaDialog.js\");\n/* harmony import */ var _DataContext_withData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../DataContext/withData */ \"./src/DataContext/withData.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\n\nvar AutomationBuilder =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(AutomationBuilder, _React$Component);\n\n  function AutomationBuilder(props) {\n    var _this;\n\n    _classCallCheck(this, AutomationBuilder);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(AutomationBuilder).call(this, props));\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"handleClose\", function () {\n      _this.setState({\n        editing: false,\n        adding: false\n      });\n\n      _this.props.close();\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"handleEditAutomation\", function () {\n      _this.setState({\n        addingAction: true\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"handleDoneEditAutomation\", function () {\n      _this.setState({\n        addingAction: false,\n        editing: false,\n        adding: false\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"handleDoneEditing\", function () {\n      _this.setState({\n        editing: false\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"handleSelectAutomation\", function (name) {\n      _this.setState({\n        adding: false,\n        editing: true,\n        selectedAutomation: name\n      });\n    });\n\n    _this.state = {\n      controllers: {},\n      automations: {},\n      newAutomationName: '',\n      addingAction: false,\n      adding: false,\n      editing: false,\n      selectedAutomation: '',\n      regionData: {},\n      areamap: {},\n      sceneData: {}\n    };\n    return _this;\n  }\n\n  _createClass(AutomationBuilder, [{\n    key: \"render\",\n    value: function render() {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_sofaDialog__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n        title: \"Automation\",\n        open: this.props.open,\n        close: this.props.close\n      }, this.state.editing ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_automationEditor__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n        name: this.state.selectedAutomation,\n        doneEditing: this.handleDoneEditing\n      }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_automationList__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n        close: this.handleClose,\n        sendAlexaCommand: this.props.sendAlexaCommand,\n        save: this.saveAutomationActions,\n        delete: this.handleDeleteAutomation,\n        editMode: this.state.adding,\n        doneEditing: this.doneAdding,\n        controllers: this.state.controllers,\n        select: this.handleSelectAutomation\n      }));\n    }\n  }]);\n\n  return AutomationBuilder;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_DataContext_withData__WEBPACK_IMPORTED_MODULE_5__[\"withData\"])(AutomationBuilder));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXV0b21hdGlvbi9hdXRvbWF0aW9uRGlhbG9nLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2F1dG9tYXRpb24vYXV0b21hdGlvbkRpYWxvZy5qcz8yOTNhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCBBdXRvbWF0aW9uTGlzdCBmcm9tICcuL2F1dG9tYXRpb25MaXN0JztcbmltcG9ydCBBdXRvbWF0aW9uRWRpdG9yIGZyb20gJy4vYXV0b21hdGlvbkVkaXRvcic7XG5pbXBvcnQgU29mYURpYWxvZyBmcm9tICcuLi9zb2ZhRGlhbG9nJztcblxuaW1wb3J0IHsgd2l0aERhdGEgfSBmcm9tICcuLi9EYXRhQ29udGV4dC93aXRoRGF0YSc7XG5cbmNsYXNzIEF1dG9tYXRpb25CdWlsZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGNvbnRyb2xsZXJzOiB7fSxcbiAgICAgICAgICAgIGF1dG9tYXRpb25zOiB7fSxcbiAgICAgICAgICAgIG5ld0F1dG9tYXRpb25OYW1lOiAnJyxcbiAgICAgICAgICAgIGFkZGluZ0FjdGlvbjogZmFsc2UsXG4gICAgICAgICAgICBhZGRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgZWRpdGluZzogZmFsc2UsXG4gICAgICAgICAgICBzZWxlY3RlZEF1dG9tYXRpb246ICcnLFxuICAgICAgICAgICAgcmVnaW9uRGF0YToge30sXG4gICAgICAgICAgICBhcmVhbWFwOiB7fSxcbiAgICAgICAgICAgIHNjZW5lRGF0YToge30sXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgaGFuZGxlQ2xvc2UgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2VkaXRpbmc6IGZhbHNlLCBhZGRpbmc6IGZhbHNlfSlcbiAgICAgICAgdGhpcy5wcm9wcy5jbG9zZSgpXG4gICAgfVxuXG4gICAgaGFuZGxlRWRpdEF1dG9tYXRpb24gPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2FkZGluZ0FjdGlvbjp0cnVlfSlcbiAgICB9XG5cbiAgICBoYW5kbGVEb25lRWRpdEF1dG9tYXRpb24gPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2FkZGluZ0FjdGlvbjpmYWxzZSwgZWRpdGluZzpmYWxzZSwgYWRkaW5nOiBmYWxzZX0pXG4gICAgfVxuXG4gICAgaGFuZGxlRG9uZUVkaXRpbmcgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2VkaXRpbmc6ZmFsc2V9KVxuICAgIH1cblxuICAgIGhhbmRsZVNlbGVjdEF1dG9tYXRpb24gPSAobmFtZSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHthZGRpbmc6IGZhbHNlLCBlZGl0aW5nOnRydWUsIHNlbGVjdGVkQXV0b21hdGlvbjpuYW1lfSlcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFNvZmFEaWFsb2cgdGl0bGU9XCJBdXRvbWF0aW9uXCIgb3Blbj17dGhpcy5wcm9wcy5vcGVufSBjbG9zZT17dGhpcy5wcm9wcy5jbG9zZX0gPlxuICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5lZGl0aW5nID9cbiAgICAgICAgICAgICAgICAgICAgPEF1dG9tYXRpb25FZGl0b3IgbmFtZT17dGhpcy5zdGF0ZS5zZWxlY3RlZEF1dG9tYXRpb259IGRvbmVFZGl0aW5nPXt0aGlzLmhhbmRsZURvbmVFZGl0aW5nfSAvPlxuICAgICAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICAgICAgPEF1dG9tYXRpb25MaXN0IGNsb3NlPXt0aGlzLmhhbmRsZUNsb3NlfSBzZW5kQWxleGFDb21tYW5kPXt0aGlzLnByb3BzLnNlbmRBbGV4YUNvbW1hbmR9IHNhdmU9e3RoaXMuc2F2ZUF1dG9tYXRpb25BY3Rpb25zfSBkZWxldGU9e3RoaXMuaGFuZGxlRGVsZXRlQXV0b21hdGlvbn0gZWRpdE1vZGU9e3RoaXMuc3RhdGUuYWRkaW5nfSBkb25lRWRpdGluZz17dGhpcy5kb25lQWRkaW5nfSBjb250cm9sbGVycz17dGhpcy5zdGF0ZS5jb250cm9sbGVyc30gc2VsZWN0PXt0aGlzLmhhbmRsZVNlbGVjdEF1dG9tYXRpb259IC8+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9Tb2ZhRGlhbG9nPlxuICAgICAgICApXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoRGF0YShBdXRvbWF0aW9uQnVpbGRlcik7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7Ozs7QUFFQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQUZBO0FBa0JBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFyQkE7QUF1QkE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQXpCQTtBQTJCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQTdCQTtBQStCQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBakNBO0FBbUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFWQTtBQUhBO0FBZUE7QUFDQTs7O0FBc0JBO0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBOzs7O0FBbkRBO0FBQ0E7QUFxREEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/automation/automationDialog.js\n");

/***/ }),

/***/ "./src/sofaDialog.js":
/*!***************************!*\
  !*** ./src/sofaDialog.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/styles */ \"./node_modules/@material-ui/styles/index.es.js\");\n/* harmony import */ var _material_ui_core_withMobileDialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/withMobileDialog */ \"./node_modules/@material-ui/core/withMobileDialog/index.js\");\n/* harmony import */ var _material_ui_core_withMobileDialog__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_withMobileDialog__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Dialog */ \"./node_modules/@material-ui/core/Dialog/index.js\");\n/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _material_ui_core_Slide__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Slide */ \"./node_modules/@material-ui/core/Slide/index.js\");\n/* harmony import */ var _material_ui_core_Slide__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Slide__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _sofaDialogTitle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sofaDialogTitle */ \"./src/sofaDialogTitle.js\");\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\n\n\n\n\nvar useStyles = Object(_material_ui_styles__WEBPACK_IMPORTED_MODULE_1__[\"makeStyles\"])({\n  dialog: {\n    height: \"100%\"\n  }\n});\n\nfunction Transition(props) {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Slide__WEBPACK_IMPORTED_MODULE_4___default.a, _extends({\n    direction: \"down\"\n  }, props));\n}\n\nfunction SofaDialog(props) {\n  var classes = useStyles();\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_3___default.a, {\n    className: classes.dialog,\n    fullScreen: props.fullScreen,\n    fullWidth: true,\n    maxWidth: props.maxWidth,\n    open: props.open,\n    onClose: props.close,\n    TransitionComponent: Transition\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_sofaDialogTitle__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n    title: props.title,\n    tabs: props.tabs,\n    tabValue: props.tabValue,\n    tabChange: props.tabChange\n  }), props.children);\n}\n\nSofaDialog.defaultProps = {\n  maxWidth: 'sm',\n  tabs: '',\n  tabVale: '',\n  tabChange: ''\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (_material_ui_core_withMobileDialog__WEBPACK_IMPORTED_MODULE_2___default()()(SofaDialog));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc29mYURpYWxvZy5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9zb2ZhRGlhbG9nLmpzPzQwNjIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgbWFrZVN0eWxlcyB9IGZyb20gJ0BtYXRlcmlhbC11aS9zdHlsZXMnO1xuaW1wb3J0IHdpdGhNb2JpbGVEaWFsb2cgZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvd2l0aE1vYmlsZURpYWxvZyc7XG5cbmltcG9ydCBEaWFsb2cgZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvRGlhbG9nJztcbmltcG9ydCBTbGlkZSBmcm9tICAnQG1hdGVyaWFsLXVpL2NvcmUvU2xpZGUnO1xuaW1wb3J0IFNvZmFEaWFsb2dUaXRsZSBmcm9tICcuL3NvZmFEaWFsb2dUaXRsZSc7XG5cbmNvbnN0IHVzZVN0eWxlcyA9IG1ha2VTdHlsZXMoe1xuXG4gICAgZGlhbG9nOiB7IGhlaWdodCA6IFwiMTAwJVwiLCB9LFxuXG59KTtcblxuZnVuY3Rpb24gVHJhbnNpdGlvbihwcm9wcykge1xuICAgIHJldHVybiA8U2xpZGUgZGlyZWN0aW9uPVwiZG93blwiIHsuLi5wcm9wc30gLz47XG59XG5cbmZ1bmN0aW9uIFNvZmFEaWFsb2cocHJvcHMpIHtcblxuICAgIGNvbnN0IGNsYXNzZXMgPSB1c2VTdHlsZXMoKTtcbiAgICByZXR1cm4gKFxuICAgICAgICA8RGlhbG9nIGNsYXNzTmFtZT17Y2xhc3Nlcy5kaWFsb2d9XG4gICAgICAgICAgICBmdWxsU2NyZWVuPXtwcm9wcy5mdWxsU2NyZWVufVxuICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfVxuICAgICAgICAgICAgbWF4V2lkdGg9e3Byb3BzLm1heFdpZHRofVxuICAgICAgICAgICAgb3Blbj17cHJvcHMub3Blbn0gIFxuICAgICAgICAgICAgb25DbG9zZT17cHJvcHMuY2xvc2V9XG4gICAgICAgICAgICBUcmFuc2l0aW9uQ29tcG9uZW50PXtUcmFuc2l0aW9ufVxuICAgICAgICA+XG4gICAgICAgICAgICA8U29mYURpYWxvZ1RpdGxlIHRpdGxlPXtwcm9wcy50aXRsZX0gdGFicz17cHJvcHMudGFic30gdGFiVmFsdWU9e3Byb3BzLnRhYlZhbHVlfSB0YWJDaGFuZ2U9e3Byb3BzLnRhYkNoYW5nZX0gLz5cbiAgICAgICAgICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgPC9EaWFsb2c+XG4gICAgKVxufVxuXG5Tb2ZhRGlhbG9nLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBtYXhXaWR0aDogJ3NtJyxcbiAgICB0YWJzOiAnJyxcbiAgICB0YWJWYWxlOiAnJyxcbiAgICB0YWJDaGFuZ2U6ICcnLFxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoTW9iaWxlRGlhbG9nKCkoU29mYURpYWxvZyk7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQUE7QUFBQTtBQUZBO0FBQ0E7QUFLQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBUUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFPQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/sofaDialog.js\n");

/***/ }),

/***/ "./src/sofaDialogTitle.js":
/*!********************************!*\
  !*** ./src/sofaDialogTitle.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ \"./node_modules/@material-ui/core/styles/index.js\");\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _material_ui_core_withMobileDialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/withMobileDialog */ \"./node_modules/@material-ui/core/withMobileDialog/index.js\");\n/* harmony import */ var _material_ui_core_withMobileDialog__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_withMobileDialog__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Dialog */ \"./node_modules/@material-ui/core/Dialog/index.js\");\n/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/DialogTitle */ \"./node_modules/@material-ui/core/DialogTitle/index.js\");\n/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Divider */ \"./node_modules/@material-ui/core/Divider/index.js\");\n/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _material_ui_core_Slide__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Slide */ \"./node_modules/@material-ui/core/Slide/index.js\");\n/* harmony import */ var _material_ui_core_Slide__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Slide__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Tabs */ \"./node_modules/@material-ui/core/Tabs/index.js\");\n/* harmony import */ var _material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/Tab */ \"./node_modules/@material-ui/core/Tab/index.js\");\n/* harmony import */ var _material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/Toolbar */ \"./node_modules/@material-ui/core/Toolbar/index.js\");\n/* harmony import */ var _material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/Typography */ \"./node_modules/@material-ui/core/Typography/index.js\");\n/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_11__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar styles = function styles(theme) {\n  return {\n    dialogTitleText: {\n      display: \"flex\",\n      alignItems: \"center\",\n      justifyContent: \"center\",\n      flexGrow: 1,\n      color: theme.palette.primary.contrastText,\n      height: 36\n    },\n    smallBar: {\n      padding: 0,\n      paddingTop: \"env(safe-area-inset-top)\",\n      backgroundColor: theme.palette.primary.dark\n    },\n    bigBar: {\n      padding: 0,\n      paddingTop: \"env(safe-area-inset-top)\",\n      backgroundColor: theme.palette.primary.dark\n    },\n    titleBar: {\n      height: 36,\n      minHeight: 36\n    },\n    tabBar: {\n      height: 48,\n      minHeight: 48,\n      display: \"flex\",\n      flexGrow: 1,\n      flexDirection: \"column\"\n    },\n    tabs: {\n      color: theme.palette.primary.contrastText\n    }\n  };\n};\n\nfunction Transition(props) {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Slide__WEBPACK_IMPORTED_MODULE_7___default.a, _extends({\n    direction: \"up\"\n  }, props));\n}\n\nvar SofaDialogTitle =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(SofaDialogTitle, _React$Component);\n\n  function SofaDialogTitle() {\n    _classCallCheck(this, SofaDialogTitle);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(SofaDialogTitle).apply(this, arguments));\n  }\n\n  _createClass(SofaDialogTitle, [{\n    key: \"render\",\n    value: function render() {\n      var _this$props = this.props,\n          classes = _this$props.classes,\n          title = _this$props.title,\n          tabValue = _this$props.tabValue,\n          tabs = _this$props.tabs;\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_5___default.a, {\n        className: this.props.tabs ? classes.bigBar : classes.smallBar\n      }, title ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_10___default.a, {\n        elevation: 1,\n        className: classes.titleBar\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_11___default.a, {\n        variant: \"subtitle1\",\n        className: classes.dialogTitleText\n      }, title)) : null, tabs ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_10___default.a, {\n        elevation: 1,\n        className: classes.tabBar\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_8___default.a, {\n        centered: true,\n        className: classes.tabs,\n        value: tabValue,\n        onChange: this.props.tabChange\n      }, this.props.tabs.map(function (name) {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_9___default.a, {\n          key: name,\n          label: name\n        });\n      }))) : null);\n    }\n  }]);\n\n  return SofaDialogTitle;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\nSofaDialogTitle.defaultProps = {\n  tabs: ''\n};\nSofaDialogTitle.propTypes = {\n  classes: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__[\"withStyles\"])(styles)(SofaDialogTitle));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc29mYURpYWxvZ1RpdGxlLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL3NvZmFEaWFsb2dUaXRsZS5qcz84YWFkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyB3aXRoU3R5bGVzIH0gZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvc3R5bGVzJztcbmltcG9ydCB3aXRoTW9iaWxlRGlhbG9nIGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL3dpdGhNb2JpbGVEaWFsb2cnO1xuXG5pbXBvcnQgRGlhbG9nIGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL0RpYWxvZyc7XG5pbXBvcnQgRGlhbG9nVGl0bGUgZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvRGlhbG9nVGl0bGUnO1xuaW1wb3J0IERpdmlkZXIgZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvRGl2aWRlcic7XG5pbXBvcnQgU2xpZGUgZnJvbSAgJ0BtYXRlcmlhbC11aS9jb3JlL1NsaWRlJztcbmltcG9ydCBUYWJzIGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL1RhYnMnO1xuaW1wb3J0IFRhYiBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9UYWInO1xuXG5pbXBvcnQgVG9vbGJhciBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9Ub29sYmFyJztcbmltcG9ydCBUeXBvZ3JhcGh5IGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL1R5cG9ncmFwaHknO1xuXG5jb25zdCBzdHlsZXMgPSB0aGVtZSA9PiAoe1xuXG4gICAgZGlhbG9nVGl0bGVUZXh0OiB7XG4gICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgICBqdXN0aWZ5Q29udGVudDogXCJjZW50ZXJcIixcbiAgICAgICAgZmxleEdyb3c6IDEsXG4gICAgICAgIGNvbG9yOiB0aGVtZS5wYWxldHRlLnByaW1hcnkuY29udHJhc3RUZXh0LFxuICAgICAgICBoZWlnaHQ6IDM2LFxuICAgIH0sXG4gICAgc21hbGxCYXI6IHtcbiAgICAgICAgcGFkZGluZzowLFxuICAgICAgICBwYWRkaW5nVG9wOiBcImVudihzYWZlLWFyZWEtaW5zZXQtdG9wKVwiLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLnBhbGV0dGUucHJpbWFyeS5kYXJrLFxuICAgIH0sXG4gICAgYmlnQmFyOiB7XG4gICAgICAgIHBhZGRpbmc6MCxcbiAgICAgICAgcGFkZGluZ1RvcDogXCJlbnYoc2FmZS1hcmVhLWluc2V0LXRvcClcIixcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGVtZS5wYWxldHRlLnByaW1hcnkuZGFyayxcbiAgICB9LFxuICAgIHRpdGxlQmFyOiB7XG4gICAgICAgIGhlaWdodDogMzYsXG4gICAgICAgIG1pbkhlaWdodDogMzYsXG4gICAgfSxcbiAgICB0YWJCYXI6IHtcbiAgICAgICAgaGVpZ2h0OiA0OCxcbiAgICAgICAgbWluSGVpZ2h0OiA0OCxcbiAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgIGZsZXhHcm93OiAxLFxuICAgICAgICBmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLFxuICAgIH0sXG4gICAgdGFiczoge1xuICAgICAgICBjb2xvcjogdGhlbWUucGFsZXR0ZS5wcmltYXJ5LmNvbnRyYXN0VGV4dCxcbiAgICB9XG5cbn0pO1xuXG5mdW5jdGlvbiBUcmFuc2l0aW9uKHByb3BzKSB7XG4gICAgcmV0dXJuIDxTbGlkZSBkaXJlY3Rpb249XCJ1cFwiIHsuLi5wcm9wc30gLz47XG59XG5cbmNsYXNzIFNvZmFEaWFsb2dUaXRsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCB7IGNsYXNzZXMsIHRpdGxlLCB0YWJWYWx1ZSwgdGFicyB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8RGlhbG9nVGl0bGUgY2xhc3NOYW1lPXt0aGlzLnByb3BzLnRhYnMgPyBjbGFzc2VzLmJpZ0JhcjogY2xhc3Nlcy5zbWFsbEJhcn0+XG4gICAgICAgICAgICAgICAgeyB0aXRsZSA/XG4gICAgICAgICAgICAgICAgPFRvb2xiYXIgZWxldmF0aW9uPXsxfSBjbGFzc05hbWU9e2NsYXNzZXMudGl0bGVCYXJ9PlxuICAgICAgICAgICAgICAgICAgICA8VHlwb2dyYXBoeSB2YXJpYW50PVwic3VidGl0bGUxXCIgY2xhc3NOYW1lPXtjbGFzc2VzLmRpYWxvZ1RpdGxlVGV4dH0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dGl0bGV9XG4gICAgICAgICAgICAgICAgICAgIDwvVHlwb2dyYXBoeT5cbiAgICAgICAgICAgICAgICA8L1Rvb2xiYXI+XG4gICAgICAgICAgICAgICAgOiBudWxsIH1cbiAgICAgICAgICAgICAgICB7IHRhYnMgP1xuICAgICAgICAgICAgICAgIDxUb29sYmFyIGVsZXZhdGlvbj17MX0gY2xhc3NOYW1lPXtjbGFzc2VzLnRhYkJhcn0gPlxuICAgICAgICAgICAgICAgICAgICA8VGFicyBjZW50ZXJlZCBjbGFzc05hbWU9e2NsYXNzZXMudGFic30gdmFsdWU9e3RhYlZhbHVlfSBvbkNoYW5nZT17dGhpcy5wcm9wcy50YWJDaGFuZ2V9PlxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnRhYnMubWFwKChuYW1lKSA9PiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGFiIGtleT17bmFtZX0gbGFiZWw9e25hbWV9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8L1RhYnM+XG4gICAgICAgICAgICAgICAgPC9Ub29sYmFyPlxuICAgICAgICAgICAgICAgIDogbnVsbCB9XG4gICAgICAgICAgICA8L0RpYWxvZ1RpdGxlPlxuICAgICAgICApXG4gICAgfVxuXG59XG5cblNvZmFEaWFsb2dUaXRsZS5kZWZhdWx0UHJvcHMgPSB7XG4gICAgdGFiczogJycsXG59XG5cblNvZmFEaWFsb2dUaXRsZS5wcm9wVHlwZXMgPSB7XG4gICAgY2xhc3NlczogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcyhzdHlsZXMpKFNvZmFEaWFsb2dUaXRsZSk7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFPQTtBQUNBO0FBREE7QUEvQkE7QUFBQTtBQUNBO0FBb0NBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFDQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBTUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBREE7QUFRQTs7OztBQTFCQTtBQUNBO0FBNkJBO0FBQ0E7QUFEQTtBQUlBO0FBQ0E7QUFEQTtBQUlBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/sofaDialogTitle.js\n");

/***/ })

}]);