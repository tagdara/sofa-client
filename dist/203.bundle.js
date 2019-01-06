(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[203],{

/***/ "./src/automation/ScheduleItem.js":
/*!****************************************!*\
  !*** ./src/automation/ScheduleItem.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Avatar */ \"./node_modules/@material-ui/core/Avatar/index.js\");\n/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Button */ \"./node_modules/@material-ui/core/Button/index.js\");\n/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/ListItem */ \"./node_modules/@material-ui/core/ListItem/index.js\");\n/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/ListItemText */ \"./node_modules/@material-ui/core/ListItemText/index.js\");\n/* harmony import */ var _material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _material_ui_core_Switch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Switch */ \"./node_modules/@material-ui/core/Switch/index.js\");\n/* harmony import */ var _material_ui_core_Switch__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Switch__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _material_ui_icons_Schedule__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/icons/Schedule */ \"./node_modules/@material-ui/icons/Schedule.js\");\n/* harmony import */ var _material_ui_icons_Schedule__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Schedule__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/icons/Close */ \"./node_modules/@material-ui/icons/Close.js\");\n/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _GridItem__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../GridItem */ \"./src/GridItem.js\");\n\n\n\n\n\n\n\n\n\n\n\nfunction ScheduleItem(props) {\n  var monthLongNames = [\"January\", \"February\", \"March\", \"April\", \"May\", \"June\", \"July\", \"August\", \"September\", \"October\", \"November\", \"December\"];\n  var monthNames = [\"Jan\", \"Feb\", \"Mar\", \"Apr\", \"May\", \"Jun\", \"Jul\", \"Aug\", \"Sep\", \"Oct\", \"Nov\", \"Dec\"];\n\n  function dateOnly(full) {\n    var donly = full.replace('Z', '').split('T')[0];\n    var ymd = donly.split('-');\n    var monthname = monthNames[parseInt(ymd[1]) - 1];\n    return monthname + \" \" + ymd[2] + \", \" + ymd[0];\n  }\n\n  function timeOnly(full) {\n    if (full.includes('T')) {\n      var tonly = full.replace('Z', '').split('T')[1];\n    } else {\n      var tonly = full;\n    }\n\n    var hms = tonly.split(':');\n\n    if (parseInt(hms[0]) > 12) {\n      return parseInt(hms[0]) - 12 + \":\" + hms[1] + \"p\";\n    } else if (parseInt(hms[0]) > 1) {\n      return parseInt(hms[0]) + \":\" + hms[1] + \"a\";\n    } else {\n      return \"12:\" + hms[1] + \"a\";\n    }\n  }\n\n  function dateIfFuture(full) {\n    var date = new Date();\n    var mydate = new Date(full);\n\n    if (date < mydate) {\n      return \" starting \" + dateOnly(full);\n    }\n\n    return \"\";\n  }\n\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_GridItem__WEBPACK_IMPORTED_MODULE_8__[\"default\"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_3___default.a, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_1___default.a, {\n    onClick: function onClick() {\n      return props.select(props.name);\n    }\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Schedule__WEBPACK_IMPORTED_MODULE_6___default.a, null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_4___default.a, {\n    onClick: function onClick() {\n      return props.select(props.name);\n    },\n    primary: props.name,\n    secondary: \"Next: \" + dateOnly(props.next) + \" \" + timeOnly(props.next)\n  })));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react__WEBPACK_IMPORTED_MODULE_0__[\"memo\"])(ScheduleItem));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXV0b21hdGlvbi9TY2hlZHVsZUl0ZW0uanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXV0b21hdGlvbi9TY2hlZHVsZUl0ZW0uanM/YTNjMiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgbWVtbyB9ICBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgQXZhdGFyIGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL0F2YXRhcic7XG5pbXBvcnQgQnV0dG9uIGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL0J1dHRvbic7XG5pbXBvcnQgTGlzdEl0ZW0gZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvTGlzdEl0ZW0nO1xuaW1wb3J0IExpc3RJdGVtVGV4dCBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9MaXN0SXRlbVRleHQnO1xuaW1wb3J0IFN3aXRjaCBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9Td2l0Y2gnO1xuaW1wb3J0IFNjaGVkdWxlSWNvbiBmcm9tICdAbWF0ZXJpYWwtdWkvaWNvbnMvU2NoZWR1bGUnO1xuaW1wb3J0IENsb3NlSWNvbiBmcm9tICdAbWF0ZXJpYWwtdWkvaWNvbnMvQ2xvc2UnO1xuaW1wb3J0IEdyaWRJdGVtIGZyb20gJy4uL0dyaWRJdGVtJ1xuXG5mdW5jdGlvbiBTY2hlZHVsZUl0ZW0ocHJvcHMpIHtcblxuICAgIGNvbnN0IG1vbnRoTG9uZ05hbWVzID0gW1wiSmFudWFyeVwiLCBcIkZlYnJ1YXJ5XCIsIFwiTWFyY2hcIiwgXCJBcHJpbFwiLCBcIk1heVwiLCBcIkp1bmVcIiwgXCJKdWx5XCIsIFwiQXVndXN0XCIsIFwiU2VwdGVtYmVyXCIsIFwiT2N0b2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGVjZW1iZXJcIl07ICBcbiAgICBjb25zdCBtb250aE5hbWVzID0gW1wiSmFuXCIsIFwiRmViXCIsIFwiTWFyXCIsIFwiQXByXCIsIFwiTWF5XCIsIFwiSnVuXCIsIFwiSnVsXCIsIFwiQXVnXCIsIFwiU2VwXCIsIFwiT2N0XCIsIFwiTm92XCIsIFwiRGVjXCJdOyAgXG4gICBcbiAgICBmdW5jdGlvbiBkYXRlT25seShmdWxsKSB7XG4gICAgICAgIHZhciBkb25seT1mdWxsLnJlcGxhY2UoJ1onLCcnKS5zcGxpdCgnVCcpWzBdXG4gICAgICAgIHZhciB5bWQ9ZG9ubHkuc3BsaXQoJy0nKVxuICAgICAgICB2YXIgbW9udGhuYW1lPW1vbnRoTmFtZXNbcGFyc2VJbnQoeW1kWzFdKS0xXVxuICAgICAgICByZXR1cm4gbW9udGhuYW1lK1wiIFwiK3ltZFsyXStcIiwgXCIreW1kWzBdXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdGltZU9ubHkoZnVsbCkge1xuICAgICAgICBcbiAgICAgICAgaWYgKGZ1bGwuaW5jbHVkZXMoJ1QnKSkge1xuICAgICAgICAgICAgdmFyIHRvbmx5PWZ1bGwucmVwbGFjZSgnWicsJycpLnNwbGl0KCdUJylbMV1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciB0b25seT1mdWxsXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHZhciBobXM9dG9ubHkuc3BsaXQoJzonKVxuICAgICAgICBcbiAgICAgICAgaWYgKHBhcnNlSW50KGhtc1swXSk+MTIpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludChobXNbMF0pLTEyK1wiOlwiK2htc1sxXStcInBcIlxuICAgICAgICB9IGVsc2UgaWYgKHBhcnNlSW50KGhtc1swXSk+MSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGhtc1swXSkrXCI6XCIraG1zWzFdK1wiYVwiXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gXCIxMjpcIitobXNbMV0rXCJhXCJcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRhdGVJZkZ1dHVyZShmdWxsKSB7XG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgdmFyIG15ZGF0ZT1uZXcgRGF0ZShmdWxsKTtcbiAgICAgICAgaWYoZGF0ZSA8IG15ZGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiIHN0YXJ0aW5nIFwiK2RhdGVPbmx5KGZ1bGwpXG4gICAgICAgIH0gXG4gICAgICAgIHJldHVybiBcIlwiXG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPEdyaWRJdGVtPlxuICAgICAgICAgICAgPExpc3RJdGVtPlxuICAgICAgICAgICAgICAgIDxBdmF0YXIgb25DbGljaz17ICgpID0+IHByb3BzLnNlbGVjdChwcm9wcy5uYW1lKSB9PjxTY2hlZHVsZUljb24gLz48L0F2YXRhcj5cbiAgICAgICAgICAgICAgICA8TGlzdEl0ZW1UZXh0IG9uQ2xpY2s9eyAoKSA9PiBwcm9wcy5zZWxlY3QocHJvcHMubmFtZSkgfSBwcmltYXJ5PXtwcm9wcy5uYW1lfSBzZWNvbmRhcnk9e1wiTmV4dDogXCIrZGF0ZU9ubHkocHJvcHMubmV4dCkrXCIgXCIrdGltZU9ubHkocHJvcHMubmV4dCl9IC8+XG4gICAgICAgICAgICA8L0xpc3RJdGVtPlxuICAgICAgICA8L0dyaWRJdGVtPlxuICAgIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWVtbyhTY2hlZHVsZUl0ZW0pIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/automation/ScheduleItem.js\n");

/***/ })

}]);