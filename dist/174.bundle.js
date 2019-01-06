(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[174],{

/***/ "./src/camera/cameraGrid.js":
/*!**********************************!*\
  !*** ./src/camera/cameraGrid.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return CameraGrid; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/styles */ \"./node_modules/@material-ui/styles/index.es.js\");\n/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Button */ \"./node_modules/@material-ui/core/Button/index.js\");\n/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/DialogActions */ \"./node_modules/@material-ui/core/DialogActions/index.js\");\n/* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/DialogContent */ \"./node_modules/@material-ui/core/DialogContent/index.js\");\n/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _material_ui_core_DialogContentText__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/DialogContentText */ \"./node_modules/@material-ui/core/DialogContentText/index.js\");\n/* harmony import */ var _material_ui_core_DialogContentText__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogContentText__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Divider */ \"./node_modules/@material-ui/core/Divider/index.js\");\n/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _securitycamera__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./securitycamera */ \"./src/camera/securitycamera.js\");\n/* harmony import */ var _cameraRecordingList__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./cameraRecordingList */ \"./src/camera/cameraRecordingList.js\");\n/* harmony import */ var _sofaDialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../sofaDialog */ \"./src/sofaDialog.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\n\n\n\n\n\n\n\n\nvar useStyles = Object(_material_ui_styles__WEBPACK_IMPORTED_MODULE_1__[\"makeStyles\"])(function (theme) {\n  console.log(theme);\n  return {\n    lGrid: {\n      display: \"flex\",\n      flexWrap: \"wrap\",\n      padding: 0,\n      flex: \"auto\",\n      flexGrow: 0,\n      margin: \"0 0 auto 0\"\n    },\n    dialogTitle: {\n      display: \"flex\",\n      alignItems: \"center\",\n      justifyContent: \"center\",\n      flexGrow: 1,\n      color: theme.palette.primary.contrastText\n    },\n    dialogActions: {\n      paddingBottom: \"env(safe-area-inset-bottom)\"\n    },\n    gridPlaceholder: {\n      height: 2,\n      minWidth: 320,\n      flexGrow: 1\n    },\n    dialogContent: {\n      height: \"100%\",\n      padding: 8\n    },\n    dialogMaxWidth: {\n      height: \"100%\",\n      padding: 0\n    },\n    cameraSelect: {\n      margin: 4,\n      padding: 0,\n      minWidth: 320\n    }\n  };\n});\nfunction CameraGrid(props) {\n  var classes = useStyles();\n\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(0),\n      _useState2 = _slicedToArray(_useState, 2),\n      frontTab = _useState2[0],\n      setFrontTab = _useState2[1];\n\n  function handleTab(event, tabno) {\n    setFrontTab(tabno);\n  }\n\n  ;\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_sofaDialog__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n    title: props.name,\n    open: props.open,\n    close: close,\n    tabChange: handleTab,\n    tabValue: frontTab,\n    tabs: ['Live', 'Recorded']\n  }, frontTab == 0 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_4___default.a, {\n    className: classes.dialogMaxWidth\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: classes.lGrid\n  }, props.cameras.map(function (name) {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Card, {\n      key: name,\n      className: classes.cameraSelect\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_securitycamera__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n      name: name,\n      cameraSource: \"dlink\"\n    }));\n  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: classes.gridPlaceholder\n  }))) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_cameraRecordingList__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n    cameras: props.cameras\n  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_6___default.a, null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_3___default.a, {\n    className: classes.dialogActions\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    onClick: function onClick(e) {\n      return props.close(e);\n    },\n    color: \"primary\",\n    autoFocus: true\n  }, \"OK\")));\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY2FtZXJhL2NhbWVyYUdyaWQuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY2FtZXJhL2NhbWVyYUdyaWQuanM/NTZhYiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IG1ha2VTdHlsZXMgfSBmcm9tICdAbWF0ZXJpYWwtdWkvc3R5bGVzJztcblxuaW1wb3J0IEJ1dHRvbiBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9CdXR0b24nO1xuaW1wb3J0IERpYWxvZ0FjdGlvbnMgZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvRGlhbG9nQWN0aW9ucyc7XG5pbXBvcnQgRGlhbG9nQ29udGVudCBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9EaWFsb2dDb250ZW50JztcbmltcG9ydCBEaWFsb2dDb250ZW50VGV4dCBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9EaWFsb2dDb250ZW50VGV4dCc7XG5pbXBvcnQgRGl2aWRlciBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9EaXZpZGVyJztcblxuaW1wb3J0IFNlY3VyaXR5Q2FtZXJhIGZyb20gJy4vc2VjdXJpdHljYW1lcmEnO1xuaW1wb3J0IENhbWVyYVJlY29yZGluZ0xpc3QgZnJvbSAnLi9jYW1lcmFSZWNvcmRpbmdMaXN0JztcbmltcG9ydCBTb2ZhRGlhbG9nIGZyb20gJy4uL3NvZmFEaWFsb2cnO1xuXG5cbmNvbnN0IHVzZVN0eWxlcyA9IG1ha2VTdHlsZXModGhlbWUgPT4geyAgXG4gICAgY29uc29sZS5sb2codGhlbWUpXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbEdyaWQ6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgZmxleFdyYXA6IFwid3JhcFwiLFxuICAgICAgICAgICAgcGFkZGluZzogMCxcbiAgICAgICAgICAgIGZsZXg6IFwiYXV0b1wiLFxuICAgICAgICAgICAgZmxleEdyb3c6IDAsXG4gICAgICAgICAgICBtYXJnaW46IFwiMCAwIGF1dG8gMFwiLFxuICAgICAgICB9LFxuICAgICAgICBkaWFsb2dUaXRsZToge1xuICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICBmbGV4R3JvdzogMSxcbiAgICAgICAgICAgIGNvbG9yOiB0aGVtZS5wYWxldHRlLnByaW1hcnkuY29udHJhc3RUZXh0LFxuICAgICAgICB9LFxuICAgICAgICBkaWFsb2dBY3Rpb25zOiB7XG4gICAgICAgICAgICBwYWRkaW5nQm90dG9tOiBcImVudihzYWZlLWFyZWEtaW5zZXQtYm90dG9tKVwiLFxuICAgICAgICB9LFxuICAgICAgICBncmlkUGxhY2Vob2xkZXI6IHtcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIG1pbldpZHRoOiAzMjAsXG4gICAgICAgICAgICBmbGV4R3JvdzogMSxcbiAgICAgICAgfSxcbiAgICAgICAgZGlhbG9nQ29udGVudDoge1xuICAgICAgICAgICAgaGVpZ2h0OiBcIjEwMCVcIixcbiAgICAgICAgICAgIHBhZGRpbmc6IDgsXG4gICAgICAgIH0sXG4gICAgICAgIGRpYWxvZ01heFdpZHRoOiB7XG4gICAgICAgICAgICBoZWlnaHQ6IFwiMTAwJVwiLFxuICAgICAgICAgICAgcGFkZGluZzogIDAsXG4gICAgICAgIH0sXG4gICAgICAgIGNhbWVyYVNlbGVjdDoge1xuICAgICAgICAgICAgbWFyZ2luOiA0LFxuICAgICAgICAgICAgcGFkZGluZzogMCxcbiAgICAgICAgICAgIG1pbldpZHRoOiAzMjAsXG4gICAgICAgIH0sXG4gICAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENhbWVyYUdyaWQocHJvcHMpIHtcblxuICAgIGNvbnN0IGNsYXNzZXMgPSB1c2VTdHlsZXMoKTtcbiAgICBjb25zdCBbZnJvbnRUYWIsIHNldEZyb250VGFiXSA9IHVzZVN0YXRlKDApO1xuXG4gICAgZnVuY3Rpb24gaGFuZGxlVGFiKGV2ZW50LCB0YWJubykge1xuICAgICAgICBzZXRGcm9udFRhYih0YWJubylcbiAgICB9OyAgIFxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPFNvZmFEaWFsb2cgdGl0bGU9e3Byb3BzLm5hbWV9IG9wZW49e3Byb3BzLm9wZW59IGNsb3NlPXtjbG9zZX0gdGFiQ2hhbmdlPXtoYW5kbGVUYWJ9IHRhYlZhbHVlPXtmcm9udFRhYn1cbiAgICAgICAgICAgICAgICAgICAgdGFicz17IFsnTGl2ZScsJ1JlY29yZGVkJ119ID5cbiAgICAgICAgICAgIHsgZnJvbnRUYWI9PTAgP1xuICAgICAgICAgICAgICAgIDxEaWFsb2dDb250ZW50IGNsYXNzTmFtZT17Y2xhc3Nlcy5kaWFsb2dNYXhXaWR0aH0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzLmxHcmlkfT5cbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwcm9wcy5jYW1lcmFzLm1hcCgobmFtZSkgPT4gXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q2FyZCBrZXk9e25hbWV9IGNsYXNzTmFtZT17Y2xhc3Nlcy5jYW1lcmFTZWxlY3R9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTZWN1cml0eUNhbWVyYSBuYW1lPXsgbmFtZSB9IGNhbWVyYVNvdXJjZT17XCJkbGlua1wifT48L1NlY3VyaXR5Q2FtZXJhPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9DYXJkPlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuZ3JpZFBsYWNlaG9sZGVyfT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9EaWFsb2dDb250ZW50PlxuICAgICAgICAgICAgOlxuICAgICAgICAgICAgICAgIDxDYW1lcmFSZWNvcmRpbmdMaXN0IGNhbWVyYXM9e3Byb3BzLmNhbWVyYXN9IC8+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA8RGl2aWRlciAvPlxuICAgICAgICAgICAgPERpYWxvZ0FjdGlvbnMgY2xhc3NOYW1lPXtjbGFzc2VzLmRpYWxvZ0FjdGlvbnN9ID5cbiAgICAgICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9eyhlKSA9PiBwcm9wcy5jbG9zZShlKX0gY29sb3I9XCJwcmltYXJ5XCIgYXV0b0ZvY3VzPk9LPC9CdXR0b24+XG4gICAgICAgICAgICA8L0RpYWxvZ0FjdGlvbnM+XG4gICAgICAgIDwvU29mYURpYWxvZz5cbiAgICApXG59XG5cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBT0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBaENBO0FBc0NBO0FBRUE7QUFFQTtBQUNBO0FBSEE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFBQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUZBO0FBS0E7QUFBQTtBQUlBO0FBQUE7QUFHQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/camera/cameraGrid.js\n");

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