(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[210],{

/***/ "./src/TvHero.js":
/*!***********************!*\
  !*** ./src/TvHero.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _DataContext_withData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DataContext/withData */ \"./src/DataContext/withData.js\");\n/* harmony import */ var _devices_Television__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./devices/Television */ \"./src/devices/Television.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n\n\nvar TvHero =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(TvHero, _React$Component);\n\n  function TvHero() {\n    _classCallCheck(this, TvHero);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(TvHero).apply(this, arguments));\n  }\n\n  _createClass(TvHero, [{\n    key: \"render\",\n    value: function render() {\n      var _this = this;\n\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, this.props.devices.map(function (device) {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_devices_Television__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n          wide: _this.props.wide,\n          key: device.endpointId,\n          name: device.friendlyName,\n          device: device,\n          deviceProperties: _this.props.deviceProperties[device.friendlyName],\n          sendAlexaCommand: _this.props.sendAlexaCommand\n        });\n      }));\n    }\n  }]);\n\n  return TvHero;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_DataContext_withData__WEBPACK_IMPORTED_MODULE_2__[\"withData\"])(TvHero));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvVHZIZXJvLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL1R2SGVyby5qcz81MjEzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyB3aXRoRGF0YSB9IGZyb20gJy4vRGF0YUNvbnRleHQvd2l0aERhdGEnO1xuXG5pbXBvcnQgVGVsZXZpc2lvbiBmcm9tICcuL2RldmljZXMvVGVsZXZpc2lvbic7XG5cbmNsYXNzIFR2SGVybyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuZGV2aWNlcy5tYXAoZGV2aWNlID0+IFxuICAgICAgICAgICAgICAgICAgICA8VGVsZXZpc2lvbiB3aWRlPXt0aGlzLnByb3BzLndpZGV9IGtleT17ZGV2aWNlLmVuZHBvaW50SWR9IG5hbWU9eyBkZXZpY2UuZnJpZW5kbHlOYW1lIH0gZGV2aWNlPXsgZGV2aWNlIH0gZGV2aWNlUHJvcGVydGllcz17IHRoaXMucHJvcHMuZGV2aWNlUHJvcGVydGllc1tkZXZpY2UuZnJpZW5kbHlOYW1lXSB9IHNlbmRBbGV4YUNvbW1hbmQ9e3RoaXMucHJvcHMuc2VuZEFsZXhhQ29tbWFuZH0gLz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhEYXRhKFR2SGVybyk7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQUtBOzs7O0FBWEE7QUFDQTtBQWFBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/TvHero.js\n");

/***/ })

}]);