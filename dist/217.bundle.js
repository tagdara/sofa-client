(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[217],{

/***/ "./src/thermostat/thermostat.js":
/*!**************************************!*\
  !*** ./src/thermostat/thermostat.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Thermostat; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _ToggleAvatar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ToggleAvatar */ \"./src/ToggleAvatar.js\");\n/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/ListItem */ \"./node_modules/@material-ui/core/ListItem/index.js\");\n/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/ListItemText */ \"./node_modules/@material-ui/core/ListItemText/index.js\");\n/* harmony import */ var _material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _GridItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../GridItem */ \"./src/GridItem.js\");\n\n\n\n\n\nfunction Thermostat(props) {\n  function tempColor(temp) {\n    if (temp >= 74) {\n      return \"hot\";\n    }\n\n    if (temp < 70) {\n      return \"cool\";\n    }\n\n    return \"mid\";\n  }\n\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_GridItem__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n    wide: props.wide\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    onClick: props.onClick\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ToggleAvatar__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n    avatarState: tempColor(props.deviceProperties.temperature)\n  }, props.deviceProperties.temperature), props.deviceProperties.hasOwnProperty('targetSetpoint') ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_3___default.a, {\n    primary: props.name,\n    secondary: props.deviceProperties.thermostatMode == 'OFF' ? 'Off' : 'Heat set to ' + props.deviceProperties.targetSetpoint\n  }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_3___default.a, {\n    primary: props.name\n  })));\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdGhlcm1vc3RhdC90aGVybW9zdGF0LmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL3RoZXJtb3N0YXQvdGhlcm1vc3RhdC5qcz80NTJlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBUb2dnbGVBdmF0YXIgZnJvbSAnLi4vVG9nZ2xlQXZhdGFyJztcbmltcG9ydCBMaXN0SXRlbSBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9MaXN0SXRlbSc7XG5pbXBvcnQgTGlzdEl0ZW1UZXh0IGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL0xpc3RJdGVtVGV4dCc7XG5pbXBvcnQgR3JpZEl0ZW0gZnJvbSAnLi4vR3JpZEl0ZW0nXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFRoZXJtb3N0YXQocHJvcHMpIHsgXG4gICAgXG4gICAgZnVuY3Rpb24gdGVtcENvbG9yKHRlbXApIHtcbiAgICAgICAgaWYgKHRlbXA+PTc0KSB7IHJldHVybiBcImhvdFwiIH1cbiAgICAgICAgaWYgKHRlbXA8NzApIHsgcmV0dXJuIFwiY29vbFwiIH1cbiAgICAgICAgcmV0dXJuIFwibWlkXCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcblxuICAgICAgICA8R3JpZEl0ZW0gd2lkZT17cHJvcHMud2lkZX0gPlxuICAgICAgICAgICAgPExpc3RJdGVtIG9uQ2xpY2s9e3Byb3BzLm9uQ2xpY2t9PlxuICAgICAgICAgICAgICAgIDxUb2dnbGVBdmF0YXIgYXZhdGFyU3RhdGU9eyB0ZW1wQ29sb3IocHJvcHMuZGV2aWNlUHJvcGVydGllcy50ZW1wZXJhdHVyZSl9Pntwcm9wcy5kZXZpY2VQcm9wZXJ0aWVzLnRlbXBlcmF0dXJlfTwvVG9nZ2xlQXZhdGFyPlxuICAgICAgICAgICAgICAgIHsgcHJvcHMuZGV2aWNlUHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eSgndGFyZ2V0U2V0cG9pbnQnKSA/XG4gICAgICAgICAgICAgICAgICAgIDxMaXN0SXRlbVRleHQgcHJpbWFyeT17cHJvcHMubmFtZX0gc2Vjb25kYXJ5PXtwcm9wcy5kZXZpY2VQcm9wZXJ0aWVzLnRoZXJtb3N0YXRNb2RlPT0nT0ZGJyA/ICdPZmYnIDogJ0hlYXQgc2V0IHRvICcrcHJvcHMuZGV2aWNlUHJvcGVydGllcy50YXJnZXRTZXRwb2ludH0vPlxuICAgICAgICAgICAgICAgICAgICA6XG4gICAgICAgICAgICAgICAgICAgIDxMaXN0SXRlbVRleHQgcHJpbWFyeT17cHJvcHMubmFtZX0gLz5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgIDwvTGlzdEl0ZW0+XG4gICAgICAgPC9HcmlkSXRlbT5cbiAgICApO1xufVxuXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBS0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/thermostat/thermostat.js\n");

/***/ })

}]);