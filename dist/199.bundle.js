(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[199],{

/***/ "./src/devices/mode.js":
/*!*****************************!*\
  !*** ./src/devices/mode.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Mode; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _ToggleAvatar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ToggleAvatar */ \"./src/ToggleAvatar.js\");\n/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/ListItem */ \"./node_modules/@material-ui/core/ListItem/index.js\");\n/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/ListItemText */ \"./node_modules/@material-ui/core/ListItemText/index.js\");\n/* harmony import */ var _material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _material_ui_core_ListItemSecondaryAction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/ListItemSecondaryAction */ \"./node_modules/@material-ui/core/ListItemSecondaryAction/index.js\");\n/* harmony import */ var _material_ui_core_ListItemSecondaryAction__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_ListItemSecondaryAction__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _material_ui_core_Switch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Switch */ \"./node_modules/@material-ui/core/Switch/index.js\");\n/* harmony import */ var _material_ui_core_Switch__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Switch__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _material_ui_icons_DesktopWindows__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/icons/DesktopWindows */ \"./node_modules/@material-ui/icons/DesktopWindows.js\");\n/* harmony import */ var _material_ui_icons_DesktopWindows__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_DesktopWindows__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _material_ui_icons_Tune__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/icons/Tune */ \"./node_modules/@material-ui/icons/Tune.js\");\n/* harmony import */ var _material_ui_icons_Tune__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Tune__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _GridItem__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../GridItem */ \"./src/GridItem.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\n\n\n\n\n\n\n\nfunction Mode(props) {\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(props.deviceProperties.powerState),\n      _useState2 = _slicedToArray(_useState, 2),\n      powerState = _useState2[0],\n      setPowerState = _useState2[1];\n\n  function handlePowerChange(event) {\n    setPowerState(event.target.checked);\n\n    if (event.target.checked) {\n      props.sendAlexaCommand(props.name, 'logic:mode:' + props.name, 'PowerController', 'TurnOn');\n    } else {\n      props.sendAlexaCommand(props.name, 'logic:mode:' + props.name, 'PowerController', 'TurnOff');\n    }\n  }\n\n  ;\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_GridItem__WEBPACK_IMPORTED_MODULE_8__[\"default\"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_2___default.a, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ToggleAvatar__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n    avatarState: props.deviceProperties.powerState == 'ON' ? 'on' : 'off'\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Tune__WEBPACK_IMPORTED_MODULE_7___default.a, null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_3___default.a, {\n    primary: props.name\n  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemSecondaryAction__WEBPACK_IMPORTED_MODULE_4___default.a, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Switch__WEBPACK_IMPORTED_MODULE_5___default.a, {\n    color: \"primary\",\n    checked: props.deviceProperties.powerState == 'ON',\n    onChange: handlePowerChange\n  }))));\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZGV2aWNlcy9tb2RlLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2RldmljZXMvbW9kZS5qcz84MWEyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgVG9nZ2xlQXZhdGFyIGZyb20gJy4uL1RvZ2dsZUF2YXRhcic7XG5pbXBvcnQgTGlzdEl0ZW0gZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvTGlzdEl0ZW0nO1xuaW1wb3J0IExpc3RJdGVtVGV4dCBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9MaXN0SXRlbVRleHQnO1xuaW1wb3J0IExpc3RJdGVtU2Vjb25kYXJ5QWN0aW9uIGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL0xpc3RJdGVtU2Vjb25kYXJ5QWN0aW9uJztcbmltcG9ydCBTd2l0Y2ggZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvU3dpdGNoJztcbmltcG9ydCBEZXNrdG9wV2luZG93c0ljb24gZnJvbSAnQG1hdGVyaWFsLXVpL2ljb25zL0Rlc2t0b3BXaW5kb3dzJztcbmltcG9ydCBUdW5lSWNvbiBmcm9tICdAbWF0ZXJpYWwtdWkvaWNvbnMvVHVuZSc7XG5pbXBvcnQgR3JpZEl0ZW0gZnJvbSAnLi4vR3JpZEl0ZW0nO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1vZGUocHJvcHMpIHtcblxuICAgIGNvbnN0IFtwb3dlclN0YXRlLCBzZXRQb3dlclN0YXRlXSA9IHVzZVN0YXRlKHByb3BzLmRldmljZVByb3BlcnRpZXMucG93ZXJTdGF0ZSk7XG4gICAgXG4gICAgZnVuY3Rpb24gaGFuZGxlUG93ZXJDaGFuZ2UoZXZlbnQpIHtcbiAgICAgICAgc2V0UG93ZXJTdGF0ZShldmVudC50YXJnZXQuY2hlY2tlZCk7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQuY2hlY2tlZCkge1xuICAgICAgICAgICAgcHJvcHMuc2VuZEFsZXhhQ29tbWFuZChwcm9wcy5uYW1lLCAnbG9naWM6bW9kZTonK3Byb3BzLm5hbWUsICdQb3dlckNvbnRyb2xsZXInLCAnVHVybk9uJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb3BzLnNlbmRBbGV4YUNvbW1hbmQocHJvcHMubmFtZSwgJ2xvZ2ljOm1vZGU6Jytwcm9wcy5uYW1lLCAnUG93ZXJDb250cm9sbGVyJywgJ1R1cm5PZmYnKVxuICAgICAgICB9XG4gICAgfTsgXG4gICAgXG4gICAgcmV0dXJuIChcbiAgICAgICAgPEdyaWRJdGVtPlxuICAgICAgICAgICAgPExpc3RJdGVtPlxuICAgICAgICAgICAgICAgIDxUb2dnbGVBdmF0YXIgYXZhdGFyU3RhdGU9e3Byb3BzLmRldmljZVByb3BlcnRpZXMucG93ZXJTdGF0ZT09J09OJyA/ICdvbicgOiAnb2ZmJ30+PFR1bmVJY29uIC8+PC9Ub2dnbGVBdmF0YXI+XG4gICAgICAgICAgICAgICAgPExpc3RJdGVtVGV4dCBwcmltYXJ5PXtwcm9wcy5uYW1lfS8+XG4gICAgICAgICAgICAgICAgPExpc3RJdGVtU2Vjb25kYXJ5QWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8U3dpdGNoIGNvbG9yPVwicHJpbWFyeVwiIGNoZWNrZWQ9e3Byb3BzLmRldmljZVByb3BlcnRpZXMucG93ZXJTdGF0ZT09J09OJ30gb25DaGFuZ2U9e2hhbmRsZVBvd2VyQ2hhbmdlfSAvPlxuICAgICAgICAgICAgICAgIDwvTGlzdEl0ZW1TZWNvbmRhcnlBY3Rpb24+XG4gICAgICAgICAgICA8L0xpc3RJdGVtPlxuICAgICAgICA8L0dyaWRJdGVtPlxuICAgICk7XG59XG5cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFFQTtBQUdBO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFLQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/devices/mode.js\n");

/***/ }),

/***/ "./src/modeList.js":
/*!*************************!*\
  !*** ./src/modeList.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ModeList; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _devices_mode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./devices/mode */ \"./src/devices/mode.js\");\n\n\nfunction ModeList(props) {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, props.devices.map(function (device) {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_devices_mode__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n      sendAlexaCommand: props.sendAlexaCommand,\n      key: device.endpointId,\n      name: device.friendlyName,\n      device: device,\n      deviceProperties: props.deviceProperties[device.friendlyName]\n    });\n  }));\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbW9kZUxpc3QuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbW9kZUxpc3QuanM/Y2E1MSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgTW9kZSBmcm9tICcuL2RldmljZXMvbW9kZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1vZGVMaXN0KHByb3BzKSB7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgICAgICB7IHByb3BzLmRldmljZXMubWFwKChkZXZpY2UpID0+XG4gICAgICAgICAgICAgICAgPE1vZGUgc2VuZEFsZXhhQ29tbWFuZD17cHJvcHMuc2VuZEFsZXhhQ29tbWFuZH0ga2V5PXsgZGV2aWNlLmVuZHBvaW50SWQgfSBuYW1lPXsgZGV2aWNlLmZyaWVuZGx5TmFtZSB9IGRldmljZT17IGRldmljZSB9IGRldmljZVByb3BlcnRpZXM9eyBwcm9wcy5kZXZpY2VQcm9wZXJ0aWVzW2RldmljZS5mcmllbmRseU5hbWVdIH0gIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgIClcbn1cbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQUtBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/modeList.js\n");

/***/ })

}]);