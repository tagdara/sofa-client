(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[242],{

/***/ "./src/sofaCard.js.safe":
/*!******************************!*\
  !*** ./src/sofaCard.js.safe ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ \"./node_modules/@material-ui/core/styles/index.js\");\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Card */ \"./node_modules/@material-ui/core/Card/index.js\");\n/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/CardContent */ \"./node_modules/@material-ui/core/CardContent/index.js\");\n/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_4__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n\n\n\nvar styles = function styles(theme) {\n  return {\n    card: {\n      display: 'flex',\n      minHeight: 64,\n      maxWidth: '480px',\n      margin: 8,\n      boxSizing: \"border-box\",\n      flexDirection: \"column\",\n      justifyContent: \"space-between\",\n      padding: \"16\"\n    },\n    content: {\n      minWidth: 0,\n      padding: \"0 !important\",\n      flexGrow: 1,\n      display: \"flex\",\n      alignItems: \"center\",\n      flexDirection: \"column\"\n    }\n  };\n};\n\nvar SofaCard =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(SofaCard, _React$Component);\n\n  function SofaCard() {\n    _classCallCheck(this, SofaCard);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(SofaCard).apply(this, arguments));\n  }\n\n  _createClass(SofaCard, [{\n    key: \"render\",\n    value: function render() {\n      var classes = this.props.classes;\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_3___default.a, {\n        className: classes.card\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_4___default.a, {\n        className: classes.content\n      }, this.props.children));\n    }\n  }]);\n\n  return SofaCard;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\nSofaCard.propTypes = {\n  classes: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__[\"withStyles\"])(styles)(SofaCard));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc29mYUNhcmQuanMuc2FmZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9zb2ZhQ2FyZC5qcy5zYWZlPzY2ODAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IHdpdGhTdHlsZXMgfSBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9zdHlsZXMnO1xuaW1wb3J0IENhcmQgZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvQ2FyZCc7XG5pbXBvcnQgQ2FyZENvbnRlbnQgZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvQ2FyZENvbnRlbnQnO1xuXG5cbmNvbnN0IHN0eWxlcyA9IHRoZW1lID0+ICh7XG4gICAgICAgIFxuICAgIGNhcmQ6IHtcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICBtaW5IZWlnaHQ6IDY0LFxuICAgICAgICBtYXhXaWR0aDogJzQ4MHB4JyxcbiAgICAgICAgbWFyZ2luOiA4LFxuICAgICAgICBib3hTaXppbmc6IFwiYm9yZGVyLWJveFwiLFxuICAgICAgICBmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLFxuICAgICAgICBqdXN0aWZ5Q29udGVudDogXCJzcGFjZS1iZXR3ZWVuXCIsXG4gICAgICAgIHBhZGRpbmc6IFwiMTZcIixcbiAgICB9LFxuICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgbWluV2lkdGg6IDAsXG4gICAgICAgIHBhZGRpbmc6IFwiMCAhaW1wb3J0YW50XCIsXG4gICAgICAgIGZsZXhHcm93OjEsXG4gICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuXHRcdFx0XHRmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLFxuICAgIH0sXG59KTtcblxuXG5jbGFzcyBTb2ZhQ2FyZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgXG4gICAgcmVuZGVyKCkge1xuICAgIFxuICAgICAgICBjb25zdCB7IGNsYXNzZXMgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPENhcmQgY2xhc3NOYW1lPXtjbGFzc2VzLmNhcmR9PlxuICAgICAgICAgICAgICAgIDxDYXJkQ29udGVudCBjbGFzc05hbWU9e2NsYXNzZXMuY29udGVudH0gPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgICAgICA8L0NhcmRDb250ZW50PlxuICAgICAgICAgICAgPC9DYXJkPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuU29mYUNhcmQucHJvcFR5cGVzID0ge1xuICAgIGNsYXNzZXM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZXMoc3R5bGVzKShTb2ZhQ2FyZCk7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJBO0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQVpBO0FBQUE7QUFDQTtBQXNCQTs7Ozs7Ozs7Ozs7OztBQUVBO0FBQUE7QUFJQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBS0E7Ozs7QUFiQTtBQUNBO0FBZUE7QUFDQTtBQURBO0FBSUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/sofaCard.js.safe\n");

/***/ })

}]);