(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[72],{

/***/ "./src/light/light.js":
/*!****************************!*\
  !*** ./src/light/light.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ \"./node_modules/@material-ui/core/styles/index.js\");\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Avatar */ \"./node_modules/@material-ui/core/Avatar/index.js\");\n/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Card */ \"./node_modules/@material-ui/core/Card/index.js\");\n/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/CardContent */ \"./node_modules/@material-ui/core/CardContent/index.js\");\n/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _material_ui_core_GridListTile__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/GridListTile */ \"./node_modules/@material-ui/core/GridListTile/index.js\");\n/* harmony import */ var _material_ui_core_GridListTile__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_GridListTile__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _material_ui_core_Icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Icon */ \"./node_modules/@material-ui/core/Icon/index.js\");\n/* harmony import */ var _material_ui_core_Icon__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Icon__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _material_ui_core_List__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/List */ \"./node_modules/@material-ui/core/List/index.js\");\n/* harmony import */ var _material_ui_core_List__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_List__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/ListItem */ \"./node_modules/@material-ui/core/ListItem/index.js\");\n/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/ListItemIcon */ \"./node_modules/@material-ui/core/ListItemIcon/index.js\");\n/* harmony import */ var _material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/ListItemText */ \"./node_modules/@material-ui/core/ListItemText/index.js\");\n/* harmony import */ var _material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var _material_ui_core_ListItemSecondaryAction__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/ListItemSecondaryAction */ \"./node_modules/@material-ui/core/ListItemSecondaryAction/index.js\");\n/* harmony import */ var _material_ui_core_ListItemSecondaryAction__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_ListItemSecondaryAction__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/core/Paper */ \"./node_modules/@material-ui/core/Paper/index.js\");\n/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_13__);\n/* harmony import */ var _material_ui_core_Switch__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/core/Switch */ \"./node_modules/@material-ui/core/Switch/index.js\");\n/* harmony import */ var _material_ui_core_Switch__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Switch__WEBPACK_IMPORTED_MODULE_14__);\n/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @material-ui/core/Typography */ \"./node_modules/@material-ui/core/Typography/index.js\");\n/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_15__);\n/* harmony import */ var react_icons_md__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! react-icons/md */ \"./node_modules/react-icons/md/index.js\");\n/* harmony import */ var react_icons_md__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(react_icons_md__WEBPACK_IMPORTED_MODULE_16__);\n/* harmony import */ var _lightDialog__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./lightDialog */ \"./src/light/lightDialog.js\");\n/* harmony import */ var _sofaSlider__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../sofaSlider */ \"./src/sofaSlider.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n //import LightbulbOutlineIcon from '@material-ui/icons/LightbulbOutline';\n\n\n\n\nvar styles = function styles(theme) {\n  return {\n    litAvatar: {\n      color: theme.palette.primary.main\n    },\n    iconSize: {\n      height: 24,\n      width: 24\n    },\n    stack: {\n      height: 44,\n      display: \"flex\",\n      flexGrow: 1,\n      paddingLeft: 16,\n      justifyContent: \"space-between\",\n      flexWrap: \"wrap\"\n    },\n    stackLabel: {\n      alignSelf: \"center\"\n    },\n    xsliderPaper: {\n      display: \"flex\",\n      flexDirection: \"row\",\n      padding: \"16 0 16 16\",\n      alignItems: \"center\",\n      minWidth: 320\n    },\n    stackSlider: {\n      marginTop: 4,\n      marginLeft: 4,\n      marginRight: 6\n    },\n    tile: {\n      display: \"flex\",\n      flexGrow: 1,\n      height: 90,\n      paddingRight: 8\n    },\n    sliderPaper: {\n      display: \"flex\",\n      flexDirection: \"row\",\n      padding: \"16 8 16 16\",\n      alignItems: \"center\"\n    },\n    nostack: {\n      height: 44,\n      display: \"flex\",\n      flexGrow: 1,\n      justifyContent: \"space-between\",\n      alignItems: \"center\",\n      flexWrap: \"wrap\",\n      maxWidth: 480,\n      minWidth: 240,\n      boxSizing: \"border-box\",\n      marginRight: 8\n    },\n    lightSwitch: {\n      marginLeft: 8\n    }\n  };\n};\n\nvar Light =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(Light, _React$Component);\n\n  function Light(props) {\n    var _this;\n\n    _classCallCheck(this, Light);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(Light).call(this, props));\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"handlePowerChange\", function (event) {\n      if (event.target.checked) {\n        _this.setState({\n          powerState: 'ON',\n          target: _this.props.name\n        });\n\n        _this.props.sendAlexaCommand(_this.props.name, _this.props.device.endpointId, \"PowerController\", \"TurnOn\");\n      } else {\n        _this.setState({\n          powerState: 'OFF',\n          target: _this.props.name\n        });\n\n        _this.props.sendAlexaCommand(_this.props.name, _this.props.device.endpointId, \"PowerController\", \"TurnOff\");\n      }\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"handlePreBrightnessChange\", function (event) {\n      _this.setState({\n        brightness: event,\n        target: _this.props.device.name\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"handleBrightnessChange\", function (event) {\n      _this.props.sendAlexaCommand(_this.props.name, _this.props.device.endpointId, \"BrightnessController\", \"SetBrightness\", {\n        \"brightness\": event\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"handleClickOpen\", function () {\n      _this.setState({\n        open: true\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"handleClose\", function () {\n      _this.setState({\n        open: false\n      });\n    });\n\n    _this.state = {\n      open: false,\n      powerState: \"OFF\",\n      brightness: \"no\"\n    };\n    _this.handleClose = _this.handleClose.bind(_assertThisInitialized(_assertThisInitialized(_this)));\n    return _this;\n  }\n\n  _createClass(Light, [{\n    key: \"render\",\n    value: function render() {\n      var _this2 = this;\n\n      var classes = this.props.classes;\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_GridListTile__WEBPACK_IMPORTED_MODULE_6___default.a, {\n        className: classes.tile,\n        cols: 1,\n        rows: 1\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_13___default.a, {\n        className: classes.sliderPaper,\n        elevation: 0\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_10___default.a, {\n        className: this.state.powerState == \"ON\" ? classes.litAvatar : classes.avatar,\n        onClick: function onClick() {\n          return _this2.handleClickOpen();\n        }\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_md__WEBPACK_IMPORTED_MODULE_16__[\"MdLightbulbOutline\"], {\n        className: classes.iconSize\n      })), this.state.brightness == \"no\" ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_15___default.a, {\n        variant: \"subtitle1\",\n        className: classes.nostack,\n        gutterBottom: true\n      }, this.props.name) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_sofaSlider__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n        value: this.state.brightness,\n        preChange: this.handlePreBrightnessChange,\n        change: this.handleBrightnessChange,\n        disabled: this.state.powerState == 'OFF',\n        name: this.props.name,\n        padLeft: false,\n        minWidth: 240\n      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Switch__WEBPACK_IMPORTED_MODULE_14___default.a, {\n        color: \"primary\",\n        className: classes.lightSwitch,\n        checked: this.state.powerState == 'ON',\n        onChange: this.handlePowerChange\n      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_lightDialog__WEBPACK_IMPORTED_MODULE_17__[\"default\"], {\n        sendAlexaCommand: this.props.sendAlexaCommand,\n        open: this.state.open,\n        name: this.props.name,\n        handleClose: this.handleClose,\n        device: this.props.device,\n        deviceProperties: this.props.deviceProperties,\n        sendMessage: this.props.sendMessage\n      })));\n    }\n  }], [{\n    key: \"getDerivedStateFromProps\",\n    value: function getDerivedStateFromProps(nextProps, prevState) {\n      var data = nextProps.deviceProperties;\n      var changes = {};\n\n      if (data.hasOwnProperty('powerState')) {\n        changes.powerState = data.powerState;\n      }\n\n      if (data.hasOwnProperty('brightness')) {\n        changes.brightness = data.brightness;\n      }\n\n      return changes;\n    }\n  }]);\n\n  return Light;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\nLight.propTypes = {\n  classes: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__[\"withStyles\"])(styles)(Light));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbGlnaHQvbGlnaHQuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbGlnaHQvbGlnaHQuanM/ODBlNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgd2l0aFN0eWxlcyB9IGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL3N0eWxlcyc7XG5cbmltcG9ydCBBdmF0YXIgZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvQXZhdGFyJztcbmltcG9ydCBDYXJkIGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL0NhcmQnO1xuaW1wb3J0IENhcmRDb250ZW50IGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL0NhcmRDb250ZW50JztcbmltcG9ydCBHcmlkTGlzdFRpbGUgZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvR3JpZExpc3RUaWxlJztcbmltcG9ydCBJY29uIGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL0ljb24nO1xuaW1wb3J0IExpc3QgZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvTGlzdCc7XG5pbXBvcnQgTGlzdEl0ZW0gZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvTGlzdEl0ZW0nO1xuaW1wb3J0IExpc3RJdGVtSWNvbiBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9MaXN0SXRlbUljb24nO1xuaW1wb3J0IExpc3RJdGVtVGV4dCBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9MaXN0SXRlbVRleHQnO1xuaW1wb3J0IExpc3RJdGVtU2Vjb25kYXJ5QWN0aW9uIGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL0xpc3RJdGVtU2Vjb25kYXJ5QWN0aW9uJztcbmltcG9ydCBQYXBlciBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9QYXBlcic7XG5pbXBvcnQgU3dpdGNoIGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL1N3aXRjaCc7XG5pbXBvcnQgVHlwb2dyYXBoeSBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9UeXBvZ3JhcGh5JztcblxuaW1wb3J0IHsgTWRMaWdodGJ1bGJPdXRsaW5lIGFzIExpZ2h0YnVsYk91dGxpbmVJY29ufSBmcm9tIFwicmVhY3QtaWNvbnMvbWRcIjtcbi8vaW1wb3J0IExpZ2h0YnVsYk91dGxpbmVJY29uIGZyb20gJ0BtYXRlcmlhbC11aS9pY29ucy9MaWdodGJ1bGJPdXRsaW5lJztcblxuaW1wb3J0IExpZ2h0RGlhbG9nIGZyb20gJy4vbGlnaHREaWFsb2cnO1xuaW1wb3J0IFNvZmFTbGlkZXIgZnJvbSBcIi4uL3NvZmFTbGlkZXJcIlxuXG5jb25zdCBzdHlsZXMgPSB0aGVtZSA9PiAoe1xuIFxuICAgIGxpdEF2YXRhcjoge1xuICAgICAgICBjb2xvcjogdGhlbWUucGFsZXR0ZS5wcmltYXJ5Lm1haW4sXG4gICAgfSxcbiAgICBpY29uU2l6ZToge1xuICAgICAgICBoZWlnaHQ6IDI0LFxuICAgICAgICB3aWR0aDogMjQsXG4gICAgfSxcbiAgICBzdGFjazoge1xuICAgICAgICBoZWlnaHQ6IDQ0LFxuICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgZmxleEdyb3c6IDEsXG4gICAgICAgIHBhZGRpbmdMZWZ0OiAxNixcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6IFwic3BhY2UtYmV0d2VlblwiLFxuICAgICAgICBmbGV4V3JhcDogXCJ3cmFwXCIsXG4gICAgfSxcbiAgICBzdGFja0xhYmVsOiB7XG4gICAgICAgIGFsaWduU2VsZjogXCJjZW50ZXJcIixcbiAgICB9LFxuICAgIHhzbGlkZXJQYXBlcjoge1xuICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgZmxleERpcmVjdGlvbjogXCJyb3dcIixcbiAgICAgICAgcGFkZGluZzogXCIxNiAwIDE2IDE2XCIsXG4gICAgICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgICAgIG1pbldpZHRoOiAzMjAsXG4gICAgfSxcbiAgICBzdGFja1NsaWRlcjoge1xuICAgICAgICBtYXJnaW5Ub3A6IDQsXG4gICAgICAgIG1hcmdpbkxlZnQ6IDQsXG4gICAgICAgIG1hcmdpblJpZ2h0OiA2LFxuICAgIH0sXG4gICAgdGlsZToge1xuICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgZmxleEdyb3c6IDEsXG4gICAgICAgIGhlaWdodDogOTAsXG4gICAgICAgIHBhZGRpbmdSaWdodDogOCxcbiAgICB9LFxuICAgIHNsaWRlclBhcGVyOiB7XG4gICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICBmbGV4RGlyZWN0aW9uOiBcInJvd1wiLFxuICAgICAgICBwYWRkaW5nOiBcIjE2IDggMTYgMTZcIixcbiAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICB9LFxuICAgIG5vc3RhY2s6IHtcbiAgICAgICAgaGVpZ2h0OiA0NCxcbiAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgIGZsZXhHcm93OiAxLFxuICAgICAgICBqdXN0aWZ5Q29udGVudDogXCJzcGFjZS1iZXR3ZWVuXCIsXG4gICAgICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgICAgIGZsZXhXcmFwOiBcIndyYXBcIixcbiAgICAgICAgbWF4V2lkdGg6IDQ4MCxcbiAgICAgICAgbWluV2lkdGg6IDI0MCxcbiAgICAgICAgYm94U2l6aW5nOiBcImJvcmRlci1ib3hcIixcbiAgICAgICAgbWFyZ2luUmlnaHQ6IDgsXG4gICAgfSxcbiAgICBsaWdodFN3aXRjaDoge1xuICAgICAgICBtYXJnaW5MZWZ0OiA4LFxuICAgIH1cblxufSk7XG5cbmNsYXNzIExpZ2h0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIG9wZW46IGZhbHNlLFxuICAgICAgICAgICAgcG93ZXJTdGF0ZTogXCJPRkZcIixcbiAgICAgICAgICAgIGJyaWdodG5lc3M6IFwibm9cIixcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5oYW5kbGVDbG9zZSA9IHRoaXMuaGFuZGxlQ2xvc2UuYmluZCh0aGlzKTtcblxuICAgIH1cblxuICAgIHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMobmV4dFByb3BzLCBwcmV2U3RhdGUpIHtcblxuICAgICAgICB2YXIgZGF0YT1uZXh0UHJvcHMuZGV2aWNlUHJvcGVydGllc1xuICAgICAgICB2YXIgY2hhbmdlcz17fVxuICAgICAgICBcbiAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoJ3Bvd2VyU3RhdGUnKSkge1xuICAgICAgICAgICAgY2hhbmdlcy5wb3dlclN0YXRlPWRhdGEucG93ZXJTdGF0ZVxuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KCdicmlnaHRuZXNzJykpIHtcbiAgICAgICAgICAgIGNoYW5nZXMuYnJpZ2h0bmVzcz1kYXRhLmJyaWdodG5lc3NcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hhbmdlc1xuICAgIH1cblxuXG5cbiAgICBoYW5kbGVQb3dlckNoYW5nZSA9IGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgcG93ZXJTdGF0ZTogJ09OJywgdGFyZ2V0OiB0aGlzLnByb3BzLm5hbWV9KTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc2VuZEFsZXhhQ29tbWFuZCh0aGlzLnByb3BzLm5hbWUsIHRoaXMucHJvcHMuZGV2aWNlLmVuZHBvaW50SWQsIFwiUG93ZXJDb250cm9sbGVyXCIsIFwiVHVybk9uXCIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgcG93ZXJTdGF0ZTogJ09GRicsIHRhcmdldDogdGhpcy5wcm9wcy5uYW1lfSk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnNlbmRBbGV4YUNvbW1hbmQodGhpcy5wcm9wcy5uYW1lLCB0aGlzLnByb3BzLmRldmljZS5lbmRwb2ludElkLCBcIlBvd2VyQ29udHJvbGxlclwiLCBcIlR1cm5PZmZcIilcbiAgICAgICAgfVxuICAgIH07IFxuXG4gICAgaGFuZGxlUHJlQnJpZ2h0bmVzc0NoYW5nZSA9IGV2ZW50ID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGJyaWdodG5lc3M6IGV2ZW50LCB0YXJnZXQ6dGhpcy5wcm9wcy5kZXZpY2UubmFtZX0pO1xuICAgIH07IFxuXG4gICAgaGFuZGxlQnJpZ2h0bmVzc0NoYW5nZSA9IGV2ZW50ID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5zZW5kQWxleGFDb21tYW5kKHRoaXMucHJvcHMubmFtZSwgdGhpcy5wcm9wcy5kZXZpY2UuZW5kcG9pbnRJZCwgXCJCcmlnaHRuZXNzQ29udHJvbGxlclwiLCBcIlNldEJyaWdodG5lc3NcIiwgeyBcImJyaWdodG5lc3NcIiA6IGV2ZW50IH0gKVxuICAgIH07IFxuXG4gICAgaGFuZGxlQ2xpY2tPcGVuID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgb3BlbjogdHJ1ZSB9KTtcbiAgICB9OyAgXG4gICAgXG4gICAgaGFuZGxlQ2xvc2UgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBvcGVuOiBmYWxzZSB9KTtcbiAgICB9OyAgICBcbiAgICBcbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgY29uc3QgeyBjbGFzc2VzIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPEdyaWRMaXN0VGlsZSBjbGFzc05hbWU9e2NsYXNzZXMudGlsZX0gY29scz17MX0gcm93cz17MX0+XG4gICAgICAgICAgICAgICAgICAgIDxQYXBlciBjbGFzc05hbWU9e2NsYXNzZXMuc2xpZGVyUGFwZXJ9IGVsZXZhdGlvbj17MH0gPlxuICAgICAgICAgICAgICAgICAgICA8TGlzdEl0ZW1JY29uIGNsYXNzTmFtZT17dGhpcy5zdGF0ZS5wb3dlclN0YXRlPT1cIk9OXCIgPyBjbGFzc2VzLmxpdEF2YXRhcjogY2xhc3Nlcy5hdmF0YXJ9IG9uQ2xpY2s9eyAoKSA9PiB0aGlzLmhhbmRsZUNsaWNrT3BlbigpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMaWdodGJ1bGJPdXRsaW5lSWNvbiBjbGFzc05hbWU9e2NsYXNzZXMuaWNvblNpemV9IC8+XG4gICAgICAgICAgICAgICAgICAgIDwvTGlzdEl0ZW1JY29uPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5icmlnaHRuZXNzPT1cIm5vXCIgP1xuICAgICAgICAgICAgICAgICAgICAgICAgPFR5cG9ncmFwaHkgdmFyaWFudD1cInN1YnRpdGxlMVwiIGNsYXNzTmFtZT17Y2xhc3Nlcy5ub3N0YWNrfSBndXR0ZXJCb3R0b20+e3RoaXMucHJvcHMubmFtZX08L1R5cG9ncmFwaHk+XG4gICAgICAgICAgICAgICAgICAgICAgICA6XG4gICAgICAgICAgICAgICAgICAgICAgICA8U29mYVNsaWRlciB2YWx1ZT17dGhpcy5zdGF0ZS5icmlnaHRuZXNzfSBwcmVDaGFuZ2U9e3RoaXMuaGFuZGxlUHJlQnJpZ2h0bmVzc0NoYW5nZX0gY2hhbmdlPXt0aGlzLmhhbmRsZUJyaWdodG5lc3NDaGFuZ2V9IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuc3RhdGUucG93ZXJTdGF0ZT09J09GRid9IG5hbWU9e3RoaXMucHJvcHMubmFtZX0gcGFkTGVmdD17ZmFsc2V9IG1pbldpZHRoPXsyNDB9IC8+XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgPFN3aXRjaCBjb2xvcj1cInByaW1hcnlcIiBjbGFzc05hbWU9e2NsYXNzZXMubGlnaHRTd2l0Y2h9IGNoZWNrZWQ9e3RoaXMuc3RhdGUucG93ZXJTdGF0ZT09J09OJ30gb25DaGFuZ2U9e3RoaXMuaGFuZGxlUG93ZXJDaGFuZ2V9IC8+XG4gICAgICAgICAgICAgICAgICAgIDxMaWdodERpYWxvZyBzZW5kQWxleGFDb21tYW5kPXt0aGlzLnByb3BzLnNlbmRBbGV4YUNvbW1hbmR9IG9wZW49e3RoaXMuc3RhdGUub3Blbn0gbmFtZT17IHRoaXMucHJvcHMubmFtZSB9IGhhbmRsZUNsb3NlPXt0aGlzLmhhbmRsZUNsb3NlfSBkZXZpY2U9eyB0aGlzLnByb3BzLmRldmljZSB9IGRldmljZVByb3BlcnRpZXM9eyB0aGlzLnByb3BzLmRldmljZVByb3BlcnRpZXMgfSBzZW5kTWVzc2FnZT17dGhpcy5wcm9wcy5zZW5kTWVzc2FnZX0gLz5cbiAgICAgICAgICAgICAgICA8L1BhcGVyPlxuICAgICAgICAgICAgICAgIDwvR3JpZExpc3RUaWxlPlxuXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5MaWdodC5wcm9wVHlwZXMgPSB7XG4gICAgY2xhc3NlczogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcyhzdHlsZXMpKExpZ2h0KTtcblxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBUUE7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVZBO0FBWUE7QUFDQTtBQURBO0FBeERBO0FBQUE7QUFDQTtBQTZEQTs7Ozs7QUFFQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQUZBO0FBNkJBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFyQ0E7QUF1Q0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBekNBO0FBMkNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUE3Q0E7QUErQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQWpEQTtBQW1EQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBbERBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQVJBO0FBVUE7QUFDQTs7O0FBMkNBO0FBQUE7QUFDQTtBQURBO0FBSUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQTs7O0FBaEVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7Ozs7QUExQkE7QUFDQTtBQWdGQTtBQUNBO0FBREE7QUFJQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/light/light.js\n");

/***/ })

}]);