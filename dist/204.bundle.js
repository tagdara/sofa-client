(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[204],{

/***/ "./src/automation/automationItem.old.js":
/*!**********************************************!*\
  !*** ./src/automation/automationItem.old.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return AutomationItem; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/styles */ \"./node_modules/@material-ui/styles/index.es.js\");\n/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Avatar */ \"./node_modules/@material-ui/core/Avatar/index.js\");\n/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/ListItem */ \"./node_modules/@material-ui/core/ListItem/index.js\");\n/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/ListItemText */ \"./node_modules/@material-ui/core/ListItemText/index.js\");\n/* harmony import */ var _material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _material_ui_icons_List__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/icons/List */ \"./node_modules/@material-ui/icons/List.js\");\n/* harmony import */ var _material_ui_icons_List__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_List__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/icons/Close */ \"./node_modules/@material-ui/icons/Close.js\");\n/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _GridItem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../GridItem */ \"./src/GridItem.js\");\n\n\n\n\n\n\n\n\n\nvar useStyles = Object(_material_ui_styles__WEBPACK_IMPORTED_MODULE_1__[\"makeStyles\"])({});\nfunction AutomationItem(props) {\n  var classes = useStyles();\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_GridItem__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n    wide: props.wide\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_3___default.a, null, props.edit ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    onClick: function onClick() {\n      return props.delete(props.name);\n    }\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_6___default.a, null)) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    onClick: function onClick() {\n      return props.run(props.name);\n    }\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_List__WEBPACK_IMPORTED_MODULE_5___default.a, null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_4___default.a, {\n    primary: props.name,\n    secondary: props.triggerCount + \" triggers / \" + props.conditionCount + \" conditions / \" + props.actionCount + ' actions',\n    onClick: function onClick() {\n      return props.select(props.name);\n    }\n  })));\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXV0b21hdGlvbi9hdXRvbWF0aW9uSXRlbS5vbGQuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXV0b21hdGlvbi9hdXRvbWF0aW9uSXRlbS5vbGQuanM/YWJlMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IG1ha2VTdHlsZXMgfSBmcm9tICdAbWF0ZXJpYWwtdWkvc3R5bGVzJztcblxuaW1wb3J0IEF2YXRhciBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9BdmF0YXInO1xuaW1wb3J0IExpc3RJdGVtIGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL0xpc3RJdGVtJztcbmltcG9ydCBMaXN0SXRlbVRleHQgZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvTGlzdEl0ZW1UZXh0JztcblxuaW1wb3J0IExpc3RJY29uIGZyb20gJ0BtYXRlcmlhbC11aS9pY29ucy9MaXN0JztcbmltcG9ydCBDbG9zZUljb24gZnJvbSAnQG1hdGVyaWFsLXVpL2ljb25zL0Nsb3NlJztcbmltcG9ydCBHcmlkSXRlbSBmcm9tICcuLi9HcmlkSXRlbSc7XG5cbmNvbnN0IHVzZVN0eWxlcyA9IG1ha2VTdHlsZXMoe1xuICAgICAgICBcblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEF1dG9tYXRpb25JdGVtKHByb3BzKSB7XG4gICAgXG4gICAgY29uc3QgY2xhc3NlcyA9IHVzZVN0eWxlcygpO1xuICAgIFxuICAgIHJldHVybiAoXG4gICAgICAgIDxHcmlkSXRlbSB3aWRlPXtwcm9wcy53aWRlfT5cbiAgICAgICAgPExpc3RJdGVtPlxuICAgICAgICB7IHByb3BzLmVkaXQgP1xuICAgICAgICAgICAgPEF2YXRhciBvbkNsaWNrPXsgKCkgPT4gcHJvcHMuZGVsZXRlKHByb3BzLm5hbWUpfT48Q2xvc2VJY29uIC8+PC9BdmF0YXI+XG4gICAgICAgIDpcbiAgICAgICAgICAgIDxBdmF0YXIgb25DbGljaz17ICgpID0+IHByb3BzLnJ1bihwcm9wcy5uYW1lKX0+PExpc3RJY29uIC8+PC9BdmF0YXI+XG4gICAgICAgIH1cbiAgICAgICAgICAgIDxMaXN0SXRlbVRleHQgcHJpbWFyeT17cHJvcHMubmFtZX0gc2Vjb25kYXJ5PXtwcm9wcy50cmlnZ2VyQ291bnQrXCIgdHJpZ2dlcnMgLyBcIitwcm9wcy5jb25kaXRpb25Db3VudCtcIiBjb25kaXRpb25zIC8gXCIrcHJvcHMuYWN0aW9uQ291bnQrJyBhY3Rpb25zJ30gIG9uQ2xpY2s9eygpID0+IHByb3BzLnNlbGVjdChwcm9wcy5uYW1lKX0vPlxuICAgICAgICA8L0xpc3RJdGVtPlxuICAgICAgICA8L0dyaWRJdGVtPlxuICAgIClcbn1cblxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBS0E7QUFFQTtBQUVBO0FBQ0E7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/automation/automationItem.old.js\n");

/***/ })

}]);