(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[197],{

/***/ "./src/DataContext/withDevices.js":
/*!****************************************!*\
  !*** ./src/DataContext/withDevices.js ***!
  \****************************************/
/*! exports provided: withDevices */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"withDevices\", function() { return withDevices; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _DataContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DataContext */ \"./src/DataContext/DataContext.js\");\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\nfunction withDevices(Component) {\n  return function DataComponent(props) {\n    return react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](_DataContext__WEBPACK_IMPORTED_MODULE_1__[\"DataContext\"].Consumer, null, function (context) {\n      return react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](Component, _extends({}, props, context, {\n        deviceByEndpointId: context.deviceByEndpointId,\n        controllerProperties: context.controllerProperties,\n        virtualDevices: context.virtualDevices,\n        deviceByName: context.deviceByName,\n        devicesByCategory: context.devicesByCategory,\n        directives: context.directives,\n        sendAlexaCommand: context.sendAlexaCommand,\n        devices: context.devicesByCategory(props.Category),\n        setLayout: context.setLayout,\n        setLayoutCard: context.setLayoutCard,\n        setReturn: context.setReturn,\n        returnName: context.returnName,\n        returnProps: context.returnProps,\n        setBack: context.setBack,\n        backName: context.backName,\n        backProps: context.backProps\n      }));\n    });\n  };\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvRGF0YUNvbnRleHQvd2l0aERldmljZXMuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvRGF0YUNvbnRleHQvd2l0aERldmljZXMuanM/OTI5ZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IERhdGFDb250ZXh0IH0gZnJvbSBcIi4vRGF0YUNvbnRleHRcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHdpdGhEZXZpY2VzKENvbXBvbmVudCkge1xuICAgIHJldHVybiBmdW5jdGlvbiBEYXRhQ29tcG9uZW50KHByb3BzKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8RGF0YUNvbnRleHQuQ29uc3VtZXI+XG4gICAgICAgICAgICAgICAgeyBjb250ZXh0ID0+IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDb21wb25lbnQgey4uLnByb3BzfSB7Li4uY29udGV4dH0gZGV2aWNlQnlFbmRwb2ludElkPXtjb250ZXh0LmRldmljZUJ5RW5kcG9pbnRJZH0gY29udHJvbGxlclByb3BlcnRpZXM9e2NvbnRleHQuY29udHJvbGxlclByb3BlcnRpZXN9IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXJ0dWFsRGV2aWNlcz17Y29udGV4dC52aXJ0dWFsRGV2aWNlc30gZGV2aWNlQnlOYW1lPXtjb250ZXh0LmRldmljZUJ5TmFtZX0gZGV2aWNlc0J5Q2F0ZWdvcnk9e2NvbnRleHQuZGV2aWNlc0J5Q2F0ZWdvcnl9IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzPXtjb250ZXh0LmRpcmVjdGl2ZXN9IHNlbmRBbGV4YUNvbW1hbmQ9e2NvbnRleHQuc2VuZEFsZXhhQ29tbWFuZH0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldmljZXM9e2NvbnRleHQuZGV2aWNlc0J5Q2F0ZWdvcnkocHJvcHMuQ2F0ZWdvcnkpfSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TGF5b3V0PXtjb250ZXh0LnNldExheW91dH0gc2V0TGF5b3V0Q2FyZD17Y29udGV4dC5zZXRMYXlvdXRDYXJkfSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0UmV0dXJuPXtjb250ZXh0LnNldFJldHVybn0gcmV0dXJuTmFtZT17Y29udGV4dC5yZXR1cm5OYW1lfSByZXR1cm5Qcm9wcz17Y29udGV4dC5yZXR1cm5Qcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QmFjaz17Y29udGV4dC5zZXRCYWNrfSBiYWNrTmFtZT17Y29udGV4dC5iYWNrTmFtZX0gYmFja1Byb3BzPXtjb250ZXh0LmJhY2tQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvRGF0YUNvbnRleHQuQ29uc3VtZXI+XG4gICAgICAgICk7XG4gICAgfTtcbn0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQU5BO0FBREE7QUFZQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/DataContext/withDevices.js\n");

/***/ })

}]);