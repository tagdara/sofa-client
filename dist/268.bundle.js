(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[268],{

/***/ "./src/light/lightgrid.js":
/*!********************************!*\
  !*** ./src/light/lightgrid.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ \"./node_modules/@material-ui/core/styles/index.js\");\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/DialogActions */ \"./node_modules/@material-ui/core/DialogActions/index.js\");\n/* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/DialogContent */ \"./node_modules/@material-ui/core/DialogContent/index.js\");\n/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _material_ui_core_DialogContentText__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/DialogContentText */ \"./node_modules/@material-ui/core/DialogContentText/index.js\");\n/* harmony import */ var _material_ui_core_DialogContentText__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogContentText__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/icons/Close */ \"./node_modules/@material-ui/icons/Close.js\");\n/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Card */ \"./node_modules/@material-ui/core/Card/index.js\");\n/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/CardContent */ \"./node_modules/@material-ui/core/CardContent/index.js\");\n/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/CardActions */ \"./node_modules/@material-ui/core/CardActions/index.js\");\n/* harmony import */ var _material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _light__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./light */ \"./src/light/light.js\");\n/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/Avatar */ \"./node_modules/@material-ui/core/Avatar/index.js\");\n/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var _material_ui_icons_Warning__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/icons/Warning */ \"./node_modules/@material-ui/icons/Warning.js\");\n/* harmony import */ var _material_ui_icons_Warning__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Warning__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var _material_ui_icons_VerifiedUser__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/icons/VerifiedUser */ \"./node_modules/@material-ui/icons/VerifiedUser.js\");\n/* harmony import */ var _material_ui_icons_VerifiedUser__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_VerifiedUser__WEBPACK_IMPORTED_MODULE_13__);\n/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/core/Button */ \"./node_modules/@material-ui/core/Button/index.js\");\n/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_14__);\n/* harmony import */ var _grouplight__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./grouplight */ \"./src/light/grouplight.js\");\n/* harmony import */ var react_icons_md__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! react-icons/md */ \"./node_modules/react-icons/md/index.js\");\n/* harmony import */ var react_icons_md__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(react_icons_md__WEBPACK_IMPORTED_MODULE_16__);\n/* harmony import */ var _material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @material-ui/core/Tabs */ \"./node_modules/@material-ui/core/Tabs/index.js\");\n/* harmony import */ var _material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_17__);\n/* harmony import */ var _material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @material-ui/core/Tab */ \"./node_modules/@material-ui/core/Tab/index.js\");\n/* harmony import */ var _material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_18__);\n/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @material-ui/core/Divider */ \"./node_modules/@material-ui/core/Divider/index.js\");\n/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_19__);\n/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @material-ui/core/Paper */ \"./node_modules/@material-ui/core/Paper/index.js\");\n/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_20__);\n/* harmony import */ var _sofaDialog__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../sofaDialog */ \"./src/sofaDialog.js\");\n/* harmony import */ var _material_ui_core_GridList__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @material-ui/core/GridList */ \"./node_modules/@material-ui/core/GridList/index.js\");\n/* harmony import */ var _material_ui_core_GridList__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_GridList__WEBPACK_IMPORTED_MODULE_22__);\n/* harmony import */ var _material_ui_core_GridListTile__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @material-ui/core/GridListTile */ \"./node_modules/@material-ui/core/GridListTile/index.js\");\n/* harmony import */ var _material_ui_core_GridListTile__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_GridListTile__WEBPACK_IMPORTED_MODULE_23__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n //import LightbulbOutlineIcon from '@material-ui/icons/LightbulbOutline';\n\n\n\n\n\n\n\n\n\nvar styles = function styles(theme) {\n  return {\n    closed: {\n      backgroundColor: \"#6a6\"\n    },\n    open: {\n      backgroundColor: \"#e66\"\n    },\n    countLabel: {\n      padding: \"8 16\"\n    },\n    card: {\n      display: 'flex',\n      maxWidth: '480px',\n      margin: 8,\n      boxSizing: \"border-box\",\n      flexDirection: \"column\",\n      justifyContent: \"space-between\",\n      padding: 16,\n      width: '100%'\n    },\n    content: {\n      minWidth: 0,\n      padding: \"0 !important\",\n      flexGrow: 1,\n      display: \"flex\",\n      alignItems: \"center\"\n    },\n    camGridDialog: {\n      margin: \"0 auto\",\n      display: \"flex\",\n      alignItems: \"center\"\n    },\n    lGrid: {\n      display: \"flex\",\n      flexWrap: \"wrap\",\n      padding: 0,\n      flex: \"auto\",\n      flexGrow: 0,\n      margin: \"0 0 auto 0\"\n    },\n    paper: {\n      boxShadow: \"none\",\n      overflow: \"hidden\",\n      display: \"flex\",\n      alignItems: \"center\"\n    },\n    camGridToolbar: {\n      paddingTop: \"env(safe-area-inset-top)\"\n    },\n    gridTitle: {\n      color: theme.palette.primary.contrastText\n    },\n    menuIcon: {\n      color: theme.palette.primary.contrastText\n    },\n    tabRow: {\n      color: theme.palette.primary.contrastText\n    },\n    tabInfo: {\n      color: theme.palette.primary.contrastText,\n      backgroundColor: theme.palette.primary[500],\n      display: \"flex\",\n      justifyContent: \"space-around\",\n      alignItems: \"center\"\n    },\n    topBar: {\n      width: \"100%\"\n    },\n    tabTitle: {\n      backgroundColor: theme.palette.primary[500],\n      paddingTop: \"env(safe-area-inset-top)\",\n      padding: \"16px 24px 0px 24px\",\n      display: \"flex\",\n      alignItems: \"center\",\n      justifyContent: \"space-around\"\n    },\n    gridPlaceholder: {\n      height: 2,\n      minWidth: 320,\n      flexGrow: 1\n    },\n    fullDialog: {\n      boxSizing: \"border-box\"\n    },\n    xdialogContent: {\n      padding: 8,\n      display: \"flex\",\n      flexWrap: 'wrap',\n      justifyContent: 'space-around',\n      overflow: 'hidden',\n      flexDirection: \"row\"\n    },\n    dialogActions: {\n      paddingBottom: \"env(safe-area-inset-bottom)\"\n    },\n    gridList: {\n      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.\n      transform: 'translateZ(0)'\n    },\n    dialogContent: {\n      padding: 0,\n      width: '100%',\n      overflowX: \"hidden\",\n      height: \"100%\"\n    }\n  };\n};\n\nvar LightGrid =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(LightGrid, _React$Component);\n\n  function LightGrid(props) {\n    var _this;\n\n    _classCallCheck(this, LightGrid);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(LightGrid).call(this, props));\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"toggleFilter\", function (event) {\n      if (_this.state.filter == 'on') {\n        _this.setState({\n          filter: 'all'\n        });\n      } else {\n        _this.setState({\n          filter: 'on'\n        });\n      }\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"handleTab\", function (event, tabno) {\n      if (tabno == 0) {\n        _this.setState({\n          frontTab: tabno,\n          filter: 'on'\n        });\n      }\n\n      if (tabno == 1) {\n        _this.setState({\n          frontTab: tabno,\n          filter: 'all'\n        });\n      }\n    });\n\n    _this.state = {\n      filter: 'on',\n      frontTab: 0\n    };\n    _this.avgState = _this.avgState.bind(_assertThisInitialized(_assertThisInitialized(_this)));\n    return _this;\n  }\n\n  _createClass(LightGrid, [{\n    key: \"avgState\",\n    value: function avgState(prop) {\n      if (prop == 'on') {\n        for (var dev in this.props.deviceProperties) {\n          if (this.props.deviceProperties[dev].hasOwnProperty('powerState')) {\n            if (this.props.deviceProperties[dev].powerState == 'ON') {\n              return true;\n            }\n          }\n        }\n\n        return false;\n      } else if (prop == 'brightness') {\n        var brightnessCount = 0;\n        var totalbrightness = 0;\n\n        for (var dev in this.props.deviceProperties) {\n          if (this.props.deviceProperties[dev].hasOwnProperty('brightness')) {\n            brightnessCount = brightnessCount + 1;\n\n            if (this.props.deviceProperties[dev].powerState == 'ON') {\n              totalbrightness = totalbrightness + this.props.deviceProperties[dev].brightness;\n            }\n          }\n        }\n\n        if (brightnessCount == 0) {\n          return 0;\n        }\n\n        var avgb = totalbrightness / brightnessCount;\n        return avgb;\n      } else if (prop == 'temperature') {\n        var temperatureCount = 0;\n        var totaltemperature = 0;\n\n        for (var dev in this.props.deviceProperties) {\n          if (this.props.deviceProperties[dev].hasOwnProperty('colorTemperatureInKelvin')) {\n            temperatureCount = temperatureCount + 1;\n\n            if (this.props.deviceProperties[dev].powerState == 'ON') {\n              totaltemperature = totaltemperature + this.props.deviceProperties[dev].colorTemperatureInKelvin;\n            }\n          }\n        }\n\n        if (temperatureCount == 0) {\n          return 0;\n        }\n\n        var avgb = totaltemperature / temperatureCount;\n        return avgb;\n      } else {\n        return 0;\n      }\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this2 = this;\n\n      var _this$props = this.props,\n          classes = _this$props.classes,\n          theme = _this$props.theme;\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_sofaDialog__WEBPACK_IMPORTED_MODULE_21__[\"default\"], {\n        title: this.props.lightCount('on') > 0 ? this.props.lightCount('on') + \" lights are on\" : \"All lights off\",\n        maxWidth: \"md\",\n        open: this.props.showGrid,\n        close: this.props.closeGrid,\n        tabValue: this.state.frontTab,\n        tabChange: this.handleTab,\n        tabs: [\"On\", \"All\"]\n      }, this.props.name == 'all' ? null : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_7___default.a, {\n        className: classes.card\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_8___default.a, {\n        className: classes.content\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grouplight__WEBPACK_IMPORTED_MODULE_15__[\"default\"], {\n        sendAlexaCommand: this.props.sendAlexaCommand,\n        key: this.props.name,\n        name: this.props.name,\n        deviceProperties: this.props.deviceProperties,\n        devices: this.props.devices,\n        avgState: this.avgState\n      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_19___default.a, null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_4___default.a, {\n        className: classes.dialogContent\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_GridList__WEBPACK_IMPORTED_MODULE_22___default.a, {\n        cols: 2,\n        cellHeight: 10,\n        spacing: 1,\n        className: classes.gridList\n      }, this.props.name == 'all' ? null : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(GridTile, {\n        cols: 2\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grouplight__WEBPACK_IMPORTED_MODULE_15__[\"default\"], {\n        sendAlexaCommand: this.props.sendAlexaCommand,\n        key: this.props.name,\n        name: this.props.name,\n        deviceProperties: this.props.deviceProperties,\n        devices: this.props.devices,\n        avgState: this.avgState\n      })), this.props.devices.map(function (device) {\n        return _this2.state.filter == 'all' || String(_this2.props.deviceProperties[device.friendlyName].powerState).toLowerCase() == _this2.state.filter.toLowerCase() ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_light__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n          sendAlexaCommand: _this2.props.sendAlexaCommand,\n          key: device.endpointId,\n          name: device.friendlyName,\n          filter: _this2.props.filter,\n          device: device,\n          deviceProperties: _this2.props.deviceProperties[device.friendlyName]\n        }) : null;\n      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_19___default.a, null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_3___default.a, {\n        className: classes.dialogActions\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_14___default.a, {\n        onClick: function onClick(e) {\n          return _this2.props.closeGrid(e);\n        },\n        color: \"primary\",\n        autoFocus: true\n      }, \"OK\")));\n    }\n  }]);\n\n  return LightGrid;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\n;\nLightGrid.propTypes = {\n  classes: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__[\"withStyles\"])(styles)(LightGrid));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbGlnaHQvbGlnaHRncmlkLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2xpZ2h0L2xpZ2h0Z3JpZC5qcz81ODdjIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgd2l0aFN0eWxlcyB9IGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL3N0eWxlcyc7XG5pbXBvcnQgRGlhbG9nQWN0aW9ucyBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9EaWFsb2dBY3Rpb25zJztcbmltcG9ydCBEaWFsb2dDb250ZW50IGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL0RpYWxvZ0NvbnRlbnQnO1xuaW1wb3J0IERpYWxvZ0NvbnRlbnRUZXh0IGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL0RpYWxvZ0NvbnRlbnRUZXh0JztcbmltcG9ydCBDbG9zZUljb24gZnJvbSAnQG1hdGVyaWFsLXVpL2ljb25zL0Nsb3NlJztcbmltcG9ydCBDYXJkIGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL0NhcmQnO1xuaW1wb3J0IENhcmRDb250ZW50IGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL0NhcmRDb250ZW50JztcbmltcG9ydCBDYXJkQWN0aW9ucyBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9DYXJkQWN0aW9ucyc7XG5pbXBvcnQgTGlnaHQgZnJvbSAnLi9saWdodCc7XG5pbXBvcnQgQXZhdGFyIGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL0F2YXRhcic7XG5pbXBvcnQgV2FybmluZ0ljb24gZnJvbSAnQG1hdGVyaWFsLXVpL2ljb25zL1dhcm5pbmcnO1xuaW1wb3J0IFZlcmlmaWVkVXNlckljb24gZnJvbSAnQG1hdGVyaWFsLXVpL2ljb25zL1ZlcmlmaWVkVXNlcic7XG5pbXBvcnQgQnV0dG9uIGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL0J1dHRvbic7XG5pbXBvcnQgR3JvdXBMaWdodCBmcm9tICcuL2dyb3VwbGlnaHQnXG5pbXBvcnQgeyBNZExpZ2h0YnVsYk91dGxpbmUgYXMgTGlnaHRidWxiT3V0bGluZUljb259IGZyb20gXCJyZWFjdC1pY29ucy9tZFwiO1xuLy9pbXBvcnQgTGlnaHRidWxiT3V0bGluZUljb24gZnJvbSAnQG1hdGVyaWFsLXVpL2ljb25zL0xpZ2h0YnVsYk91dGxpbmUnO1xuaW1wb3J0IFRhYnMgZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvVGFicyc7XG5pbXBvcnQgVGFiIGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL1RhYic7XG5pbXBvcnQgRGl2aWRlciBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9EaXZpZGVyJztcbmltcG9ydCBQYXBlciBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9QYXBlcic7XG5pbXBvcnQgU29mYURpYWxvZyBmcm9tICcuLi9zb2ZhRGlhbG9nJ1xuaW1wb3J0IEdyaWRMaXN0IGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL0dyaWRMaXN0JztcbmltcG9ydCBHcmlkTGlzdFRpbGUgZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvR3JpZExpc3RUaWxlJztcblxuY29uc3Qgc3R5bGVzID0gdGhlbWUgPT4gKHtcbiAgICBcbiAgICBjbG9zZWQ6IHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiM2YTZcIixcbiAgICB9LFxuICAgIG9wZW46IHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiNlNjZcIixcbiAgICB9LFxuICAgIGNvdW50TGFiZWw6IHtcbiAgICAgICAgcGFkZGluZzogXCI4IDE2XCIsXG4gICAgfSxcbiAgICBjYXJkOiB7XG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgbWF4V2lkdGg6ICc0ODBweCcsXG4gICAgICAgIG1hcmdpbjogOCxcbiAgICAgICAgYm94U2l6aW5nOiBcImJvcmRlci1ib3hcIixcbiAgICAgICAgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIixcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6IFwic3BhY2UtYmV0d2VlblwiLFxuICAgICAgICBwYWRkaW5nOiAxNixcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICB9LCAgICBcbiAgICBjb250ZW50OiB7XG4gICAgICAgIG1pbldpZHRoOiAwLFxuICAgICAgICBwYWRkaW5nOiBcIjAgIWltcG9ydGFudFwiLFxuICAgICAgICBmbGV4R3JvdzoxLFxuICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIlxuICAgIH0sXG4gICAgY2FtR3JpZERpYWxvZzoge1xuICAgICAgICBtYXJnaW46IFwiMCBhdXRvXCIsXG4gICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgIH0sXG4gICAgbEdyaWQ6IHtcbiAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgIGZsZXhXcmFwOiBcIndyYXBcIixcblxuICAgICAgICBwYWRkaW5nOiAwLFxuICAgICAgICBmbGV4OiBcImF1dG9cIixcbiAgICAgICAgZmxleEdyb3c6IDAsXG4gICAgICAgIG1hcmdpbjogXCIwIDAgYXV0byAwXCIsXG4gICAgfSxcbiAgICBwYXBlcjoge1xuICAgICAgICBib3hTaGFkb3c6IFwibm9uZVwiLFxuICAgICAgICBvdmVyZmxvdzogXCJoaWRkZW5cIixcbiAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG5cbiAgICB9LFxuICAgIGNhbUdyaWRUb29sYmFyOiB7XG4gICAgICAgIHBhZGRpbmdUb3A6IFwiZW52KHNhZmUtYXJlYS1pbnNldC10b3ApXCIsXG4gICAgfSxcbiAgICBncmlkVGl0bGU6IHtcbiAgICAgICAgY29sb3I6IHRoZW1lLnBhbGV0dGUucHJpbWFyeS5jb250cmFzdFRleHQsXG4gICAgfSxcbiAgICBtZW51SWNvbjoge1xuICAgICAgICBjb2xvcjogdGhlbWUucGFsZXR0ZS5wcmltYXJ5LmNvbnRyYXN0VGV4dCxcbiAgICB9LFxuICAgIHRhYlJvdzoge1xuICAgICAgICBjb2xvcjogdGhlbWUucGFsZXR0ZS5wcmltYXJ5LmNvbnRyYXN0VGV4dCxcblxuICAgIH0sXG4gICAgdGFiSW5mbzoge1xuICAgICAgICBjb2xvcjogdGhlbWUucGFsZXR0ZS5wcmltYXJ5LmNvbnRyYXN0VGV4dCxcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGVtZS5wYWxldHRlLnByaW1hcnlbNTAwXSxcbiAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgIGp1c3RpZnlDb250ZW50OiBcInNwYWNlLWFyb3VuZFwiLFxuICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgIH0sXG5cbiAgICB0b3BCYXI6IHtcbiAgICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgIH0sXG4gICAgdGFiVGl0bGU6IHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGVtZS5wYWxldHRlLnByaW1hcnlbNTAwXSxcbiAgICAgICAgcGFkZGluZ1RvcDogXCJlbnYoc2FmZS1hcmVhLWluc2V0LXRvcClcIixcbiAgICAgICAgcGFkZGluZzogXCIxNnB4IDI0cHggMHB4IDI0cHhcIixcbiAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgICAgIGp1c3RpZnlDb250ZW50OiBcInNwYWNlLWFyb3VuZFwiLFxuICAgIH0sXG4gICAgZ3JpZFBsYWNlaG9sZGVyOiB7XG4gICAgICAgIGhlaWdodDogMixcbiAgICAgICAgbWluV2lkdGg6IDMyMCxcbiAgICAgICAgZmxleEdyb3c6IDEsXG4gICAgfSxcbiAgICBmdWxsRGlhbG9nOiB7XG4gICAgICAgIGJveFNpemluZzogXCJib3JkZXItYm94XCIsXG4gICAgfSxcbiAgICB4ZGlhbG9nQ29udGVudDoge1xuICAgICAgICBwYWRkaW5nOiA4LFxuICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgZmxleFdyYXA6ICd3cmFwJyxcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1hcm91bmQnLFxuICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgIGZsZXhEaXJlY3Rpb246IFwicm93XCIsXG4gICAgfSxcbiAgICBkaWFsb2dBY3Rpb25zOiB7XG4gICAgICAgIHBhZGRpbmdCb3R0b206IFwiZW52KHNhZmUtYXJlYS1pbnNldC1ib3R0b20pXCIsICAgIFxuICAgIH0sXG4gICAgZ3JpZExpc3Q6IHtcbiAgICAgICAgLy8gUHJvbW90ZSB0aGUgbGlzdCBpbnRvIGhpcyBvd24gbGF5ZXIgb24gQ2hyb21lLiBUaGlzIGNvc3QgbWVtb3J5IGJ1dCBoZWxwcyBrZWVwaW5nIGhpZ2ggRlBTLlxuICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVaKDApJyxcbiAgICB9LFxuICAgIGRpYWxvZ0NvbnRlbnQ6IHtcbiAgICAgICAgcGFkZGluZzogMCxcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgb3ZlcmZsb3dYOiBcImhpZGRlblwiLFxuICAgICAgICBoZWlnaHQgOiBcIjEwMCVcIiwgXG4gICAgfVxuICAgIFxufSk7XG5cblxuY2xhc3MgTGlnaHRHcmlkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgZmlsdGVyOiAnb24nLFxuICAgICAgICAgICAgZnJvbnRUYWI6IDAsXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuYXZnU3RhdGUgPSB0aGlzLmF2Z1N0YXRlLmJpbmQodGhpcyk7XG5cbiAgICB9XG5cbiAgICBhdmdTdGF0ZShwcm9wKSB7XG4gICAgICAgIFxuICAgICAgICBpZiAocHJvcD09J29uJykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKHZhciBkZXYgaW4gdGhpcy5wcm9wcy5kZXZpY2VQcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuZGV2aWNlUHJvcGVydGllc1tkZXZdLmhhc093blByb3BlcnR5KCdwb3dlclN0YXRlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuZGV2aWNlUHJvcGVydGllc1tkZXZdLnBvd2VyU3RhdGU9PSdPTicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgXG4gICAgICAgIH0gZWxzZSBpZiAocHJvcD09J2JyaWdodG5lc3MnKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBicmlnaHRuZXNzQ291bnQ9MDtcbiAgICAgICAgICAgIHZhciB0b3RhbGJyaWdodG5lc3M9MDtcbiAgICAgICAgICAgIGZvciAodmFyIGRldiBpbiB0aGlzLnByb3BzLmRldmljZVByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5kZXZpY2VQcm9wZXJ0aWVzW2Rldl0uaGFzT3duUHJvcGVydHkoJ2JyaWdodG5lc3MnKSkge1xuICAgICAgICAgICAgICAgICAgICBicmlnaHRuZXNzQ291bnQ9YnJpZ2h0bmVzc0NvdW50KzE7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmRldmljZVByb3BlcnRpZXNbZGV2XS5wb3dlclN0YXRlPT0nT04nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b3RhbGJyaWdodG5lc3M9dG90YWxicmlnaHRuZXNzK3RoaXMucHJvcHMuZGV2aWNlUHJvcGVydGllc1tkZXZdLmJyaWdodG5lc3M7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKGJyaWdodG5lc3NDb3VudD09MCkgeyByZXR1cm4gMCB9XG5cbiAgICAgICAgICAgIHZhciBhdmdiPXRvdGFsYnJpZ2h0bmVzcy9icmlnaHRuZXNzQ291bnRcbiAgICAgICAgICAgIHJldHVybiBhdmdiO1xuICAgICAgICBcbiAgICAgICAgfSBlbHNlIGlmIChwcm9wPT0ndGVtcGVyYXR1cmUnKSB7XG4gICAgICAgICAgICB2YXIgdGVtcGVyYXR1cmVDb3VudD0wO1xuICAgICAgICAgICAgdmFyIHRvdGFsdGVtcGVyYXR1cmU9MDtcbiAgICAgICAgICAgIGZvciAodmFyIGRldiBpbiB0aGlzLnByb3BzLmRldmljZVByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5kZXZpY2VQcm9wZXJ0aWVzW2Rldl0uaGFzT3duUHJvcGVydHkoJ2NvbG9yVGVtcGVyYXR1cmVJbktlbHZpbicpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBlcmF0dXJlQ291bnQ9dGVtcGVyYXR1cmVDb3VudCsxO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5kZXZpY2VQcm9wZXJ0aWVzW2Rldl0ucG93ZXJTdGF0ZT09J09OJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG90YWx0ZW1wZXJhdHVyZT10b3RhbHRlbXBlcmF0dXJlK3RoaXMucHJvcHMuZGV2aWNlUHJvcGVydGllc1tkZXZdLmNvbG9yVGVtcGVyYXR1cmVJbktlbHZpbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHRlbXBlcmF0dXJlQ291bnQ9PTApIHsgcmV0dXJuIDAgfVxuXG4gICAgICAgICAgICB2YXIgYXZnYj10b3RhbHRlbXBlcmF0dXJlL3RlbXBlcmF0dXJlQ291bnRcbiAgICAgICAgICAgIHJldHVybiBhdmdiO1xuICAgICAgICBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbiAgICBcbiAgICB0b2dnbGVGaWx0ZXIgPSBldmVudCA9PiB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZpbHRlcj09J29uJykge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGZpbHRlcjonYWxsJ30pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZmlsdGVyOidvbid9KSBcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBcbiAgICBoYW5kbGVUYWIgPSAoZXZlbnQsIHRhYm5vKSA9PiB7XG4gICAgICAgIGlmICh0YWJubz09MCkgeyB0aGlzLnNldFN0YXRlKHtmcm9udFRhYjogdGFibm8sIGZpbHRlcjogJ29uJ30pfVxuICAgICAgICBpZiAodGFibm89PTEpIHsgdGhpcy5zZXRTdGF0ZSh7ZnJvbnRUYWI6IHRhYm5vLCBmaWx0ZXI6ICdhbGwnfSl9XG4gICAgfTsgICAgXG4gICAgXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgeyBjbGFzc2VzLCB0aGVtZSB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8U29mYURpYWxvZyB0aXRsZT17IHRoaXMucHJvcHMubGlnaHRDb3VudCgnb24nKT4wID8gdGhpcy5wcm9wcy5saWdodENvdW50KCdvbicpK1wiIGxpZ2h0cyBhcmUgb25cIiA6IFwiQWxsIGxpZ2h0cyBvZmZcIn0gXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aD0nbWQnIG9wZW49e3RoaXMucHJvcHMuc2hvd0dyaWR9IGNsb3NlPXt0aGlzLnByb3BzLmNsb3NlR3JpZH0gXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJWYWx1ZT17dGhpcy5zdGF0ZS5mcm9udFRhYn0gdGFiQ2hhbmdlPXt0aGlzLmhhbmRsZVRhYn0gdGFicz17IFtcIk9uXCIsXCJBbGxcIl0gfSA+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLm5hbWU9PSdhbGwnID9cbiAgICAgICAgICAgICAgICAgICAgbnVsbFxuICAgICAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICAgICAgPENhcmQgY2xhc3NOYW1lPXtjbGFzc2VzLmNhcmR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPENhcmRDb250ZW50IGNsYXNzTmFtZT17Y2xhc3Nlcy5jb250ZW50fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8R3JvdXBMaWdodCBzZW5kQWxleGFDb21tYW5kPXt0aGlzLnByb3BzLnNlbmRBbGV4YUNvbW1hbmR9IGtleT17IHRoaXMucHJvcHMubmFtZSB9IG5hbWU9eyB0aGlzLnByb3BzLm5hbWUgfSBkZXZpY2VQcm9wZXJ0aWVzPXsgdGhpcy5wcm9wcy5kZXZpY2VQcm9wZXJ0aWVzIH0gZGV2aWNlcz17IHRoaXMucHJvcHMuZGV2aWNlcyB9IGF2Z1N0YXRlPXsgdGhpcy5hdmdTdGF0ZSB9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0NhcmRDb250ZW50PlxuICAgICAgICAgICAgICAgICAgICA8L0NhcmQ+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDxEaXZpZGVyIC8+XG4gICAgICAgICAgICAgICAgPERpYWxvZ0NvbnRlbnQgY2xhc3NOYW1lPXtjbGFzc2VzLmRpYWxvZ0NvbnRlbnQgfT5cbiAgICAgICAgICAgICAgICAgICAgPEdyaWRMaXN0IGNvbHM9ezJ9IGNlbGxIZWlnaHQ9ezEwfSBzcGFjaW5nPXsxfSBjbGFzc05hbWU9e2NsYXNzZXMuZ3JpZExpc3R9PlxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLm5hbWU9PSdhbGwnID8gbnVsbCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEdyaWRUaWxlIGNvbHM9ezJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8R3JvdXBMaWdodCBzZW5kQWxleGFDb21tYW5kPXt0aGlzLnByb3BzLnNlbmRBbGV4YUNvbW1hbmR9IGtleT17IHRoaXMucHJvcHMubmFtZSB9IG5hbWU9eyB0aGlzLnByb3BzLm5hbWUgfSBkZXZpY2VQcm9wZXJ0aWVzPXsgdGhpcy5wcm9wcy5kZXZpY2VQcm9wZXJ0aWVzIH0gZGV2aWNlcz17IHRoaXMucHJvcHMuZGV2aWNlcyB9IGF2Z1N0YXRlPXsgdGhpcy5hdmdTdGF0ZSB9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9HcmlkVGlsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmRldmljZXMubWFwKChkZXZpY2UpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5maWx0ZXI9PSdhbGwnIHx8IFN0cmluZyh0aGlzLnByb3BzLmRldmljZVByb3BlcnRpZXNbZGV2aWNlLmZyaWVuZGx5TmFtZV0ucG93ZXJTdGF0ZSkudG9Mb3dlckNhc2UoKT09dGhpcy5zdGF0ZS5maWx0ZXIudG9Mb3dlckNhc2UoKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMaWdodCBzZW5kQWxleGFDb21tYW5kPXt0aGlzLnByb3BzLnNlbmRBbGV4YUNvbW1hbmR9IGtleT17IGRldmljZS5lbmRwb2ludElkIH0gbmFtZT17IGRldmljZS5mcmllbmRseU5hbWUgfSBmaWx0ZXI9eyB0aGlzLnByb3BzLmZpbHRlcn0gZGV2aWNlPXsgZGV2aWNlIH0gZGV2aWNlUHJvcGVydGllcz17IHRoaXMucHJvcHMuZGV2aWNlUHJvcGVydGllc1tkZXZpY2UuZnJpZW5kbHlOYW1lXSB9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8L0dyaWRMaXN0PlxuICAgICAgICAgICAgICAgIDwvRGlhbG9nQ29udGVudD5cbiAgICAgICAgICAgICAgICA8RGl2aWRlciAvPlxuICAgICAgICAgICAgICAgIDxEaWFsb2dBY3Rpb25zIGNsYXNzTmFtZT17Y2xhc3Nlcy5kaWFsb2dBY3Rpb25zfSA+XG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17KGUpID0+IHRoaXMucHJvcHMuY2xvc2VHcmlkKGUpfSBjb2xvcj1cInByaW1hcnlcIiBhdXRvRm9jdXM+T0s8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L0RpYWxvZ0FjdGlvbnM+XG4gICAgICAgICAgICA8L1NvZmFEaWFsb2c+XG4gICAgICAgIClcbiAgICB9XG59O1xuXG5MaWdodEdyaWQucHJvcFR5cGVzID0ge1xuICAgIGNsYXNzZXM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZXMoc3R5bGVzKShMaWdodEdyaWQpO1xuXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQURBO0FBR0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBT0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQURBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFRQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQXhHQTtBQUFBO0FBQ0E7QUFpSEE7Ozs7O0FBRUE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFGQTtBQW9FQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBMUVBO0FBNkVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQTdFQTtBQUNBO0FBQ0E7QUFGQTtBQUtBO0FBUkE7QUFVQTtBQUNBOzs7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTs7O0FBZ0JBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFBQTtBQUlBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFGQTtBQU1BO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFGQTtBQVFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQTs7OztBQTFIQTtBQUNBO0FBMEhBO0FBRUE7QUFDQTtBQURBO0FBSUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/light/lightgrid.js\n");

/***/ })

}]);