(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[211],{

/***/ "./src/area/areaDialog.js":
/*!********************************!*\
  !*** ./src/area/areaDialog.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ \"./node_modules/@material-ui/core/styles/index.js\");\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Button */ \"./node_modules/@material-ui/core/Button/index.js\");\n/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/DialogActions */ \"./node_modules/@material-ui/core/DialogActions/index.js\");\n/* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/DialogContent */ \"./node_modules/@material-ui/core/DialogContent/index.js\");\n/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _material_ui_core_DialogContentText__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/DialogContentText */ \"./node_modules/@material-ui/core/DialogContentText/index.js\");\n/* harmony import */ var _material_ui_core_DialogContentText__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogContentText__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/DialogTitle */ \"./node_modules/@material-ui/core/DialogTitle/index.js\");\n/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Divider */ \"./node_modules/@material-ui/core/Divider/index.js\");\n/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _material_ui_core_List__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/List */ \"./node_modules/@material-ui/core/List/index.js\");\n/* harmony import */ var _material_ui_core_List__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_List__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/icons/Close */ \"./node_modules/@material-ui/icons/Close.js\");\n/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _sofaDialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../sofaDialog */ \"./src/sofaDialog.js\");\n/* harmony import */ var _light_grouplight__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../light/grouplight */ \"./src/light/grouplight.js\");\n/* harmony import */ var _light_light__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../light/light */ \"./src/light/light.js\");\n/* harmony import */ var _sceneEditorArea__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../sceneEditorArea */ \"./src/sceneEditorArea.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar styles = function styles(theme) {\n  var _ref;\n\n  return _ref = {\n    root: {\n      flexGrow: 1\n    },\n    flex: {\n      flex: 1\n    },\n    nogrow: {\n      flex: 1\n    },\n    slider: {\n      flex: 1,\n      paddingLeft: 16,\n      paddingRight: 16\n    },\n    touchSized: {\n      height: 72\n    },\n    halves: {\n      width: '50%'\n    }\n  }, _defineProperty(_ref, \"flex\", {\n    flex: 1\n  }), _defineProperty(_ref, \"menuButton\", {\n    marginLeft: -12,\n    marginRight: 20\n  }), _defineProperty(_ref, \"paperItem\", {\n    display: \"flex\",\n    height: 40,\n    padding: \"16px\",\n    alignItems: \"center\"\n  }), _defineProperty(_ref, \"tabTitle\", {\n    padding: 0,\n    backgroundColor: theme.palette.primary.dark\n  }), _defineProperty(_ref, \"xtabTitle\", {\n    backgroundColor: theme.palette.primary.dark,\n    width: \"100%\",\n    padding: 0,\n    display: \"flex\",\n    alignItems: \"center\",\n    justifyContent: \"space-around\"\n  }), _defineProperty(_ref, \"xtabRow\", {\n    padding: 0,\n    width: \"100%\",\n    backgroundColor: theme.palette.primary.dark,\n    color: theme.palette.primary.contrastText,\n    display: \"flex\",\n    justifyContent: \"center\"\n  }), _defineProperty(_ref, \"tabInfo\", {\n    color: theme.palette.primary.contrastText,\n    backgroundColor: theme.palette.primary.dark,\n    display: \"flex\",\n    justifyContent: \"space-around\",\n    alignItems: \"center\"\n  }), _defineProperty(_ref, \"baseTitle\", {\n    minHeight: 48\n  }), _defineProperty(_ref, \"dialogTitle\", {\n    display: \"flex\",\n    alignItems: \"center\",\n    justifyContent: \"center\",\n    flexGrow: 1,\n    color: theme.palette.primary.contrastText\n  }), _defineProperty(_ref, \"dialogActions\", {\n    paddingBottom: \"env(safe-area-inset-bottom)\"\n  }), _defineProperty(_ref, \"dialogContent\", {\n    height: \"100%\",\n    padding: 0\n  }), _defineProperty(_ref, \"groupHead\", {\n    backgroundColor: theme.palette.primary[100],\n    padding: 0\n  }), _ref;\n};\n\nvar AreaDialog =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(AreaDialog, _React$Component);\n\n  function AreaDialog(props) {\n    var _this;\n\n    _classCallCheck(this, AreaDialog);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(AreaDialog).call(this, props));\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"state\", {\n      open: false\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"handlePreLevelChange\", function (event) {\n      _this.setState({\n        level: event\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"handleTab\", function (event, tabno) {\n      if (tabno == 0) {\n        _this.setState({\n          frontTab: tabno\n        });\n      }\n\n      if (tabno == 1) {\n        _this.setState({\n          frontTab: tabno\n        });\n      }\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"handleEdit\", function () {\n      _this.setState({\n        edit: true\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"editFinished\", function () {\n      _this.setState({\n        edit: false\n      });\n    });\n\n    _this.state = {\n      scenes: {},\n      shortcuts: {},\n      lights: {},\n      frontTab: 0,\n      computedLevel: 0,\n      level: 0,\n      brightness: 0,\n      powerState: false,\n      colorTemperatureInKelvin: 4000,\n      target: null,\n      open: false,\n      endpointIdCache: [],\n      lastmessage: '',\n      updates: {},\n      areaState: {},\n      edit: false,\n      delaySet: false\n    };\n    _this.avgState = _this.avgState.bind(_assertThisInitialized(_assertThisInitialized(_this)));\n    return _this;\n  }\n\n  _createClass(AreaDialog, [{\n    key: \"lightList\",\n    value: function lightList() {\n      var lights = [];\n\n      for (var dev in this.props.deviceProperties) {\n        if (this.props.deviceProperties[dev].hasOwnProperty('brightness')) {\n          lights.push(dev);\n        }\n      }\n\n      return lights;\n    }\n  }, {\n    key: \"avgState\",\n    value: function avgState(prop) {\n      if (prop == 'on') {\n        for (var dev in this.props.deviceProperties) {\n          if (this.props.deviceProperties[dev].hasOwnProperty('powerState')) {\n            if (this.props.deviceProperties[dev].powerState == 'ON') {\n              return true;\n            }\n          }\n        }\n\n        return false;\n      } else if (prop == 'brightness') {\n        var brightnessCount = 0;\n        var totalbrightness = 0;\n\n        for (var dev in this.props.deviceProperties) {\n          if (this.props.deviceProperties[dev].hasOwnProperty('brightness')) {\n            brightnessCount = brightnessCount + 1;\n\n            if (this.props.deviceProperties[dev].powerState == 'ON') {\n              totalbrightness = totalbrightness + this.props.deviceProperties[dev].brightness;\n            }\n          }\n        }\n\n        if (brightnessCount == 0) {\n          return 0;\n        }\n\n        var avgb = totalbrightness / brightnessCount;\n        return avgb;\n      } else if (prop == 'temperature') {\n        var temperatureCount = 0;\n        var totaltemperature = 0;\n\n        for (var dev in this.props.deviceProperties) {\n          if (this.props.deviceProperties[dev].hasOwnProperty('colorTemperatureInKelvin')) {\n            temperatureCount = temperatureCount + 1;\n\n            if (this.props.deviceProperties[dev].powerState == 'ON') {\n              totaltemperature = totaltemperature + this.props.deviceProperties[dev].colorTemperatureInKelvin;\n            }\n          }\n        }\n\n        if (temperatureCount == 0) {\n          return 0;\n        }\n\n        var avgb = totaltemperature / temperatureCount;\n        return avgb;\n      } else {\n        return 0;\n      }\n    }\n  }, {\n    key: \"anyOn\",\n    value: function anyOn() {\n      for (var dev in this.props.deviceProperties) {\n        if (this.props.deviceProperties[dev].hasOwnProperty('powerState')) {\n          if (this.props.deviceProperties[dev].powerState == 'ON') {\n            return true;\n          }\n        }\n      }\n\n      return false;\n    }\n  }, {\n    key: \"renderSwitch\",\n    value: function renderSwitch(device) {\n      if (device === {} || device == undefined) {\n        return null;\n      }\n\n      if (device.hasOwnProperty('displayCategories')) {\n        switch (device.displayCategories[0]) {\n          case 'LIGHT':\n            var capabilities = [];\n\n            for (var i = 0; i < device.capabilities.length; i++) {\n              capabilities.push(device.capabilities[i].interface);\n            }\n\n            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_light_light__WEBPACK_IMPORTED_MODULE_13__[\"default\"], {\n              sendAlexaCommand: this.props.sendAlexaCommand,\n              key: device.endpointId,\n              name: device.friendlyName,\n              device: device,\n              deviceProperties: this.props.deviceProperties[device.friendlyName]\n            });\n\n          default:\n            return null;\n        }\n      }\n    }\n  }, {\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      var _this2 = this;\n\n      fetch('/list/logic/area/' + this.props.name).then(function (result) {\n        return result.json();\n      }).then(function (result) {\n        return _this2.setState(result);\n      });\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this3 = this;\n\n      var classes = this.props.classes;\n      var devices = this.state.devices;\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_sofaDialog__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n        title: this.props.name,\n        open: this.props.open,\n        close: this.props.close,\n        tabChange: this.handleTab,\n        tabValue: this.state.frontTab,\n        tabs: ['Lights', 'Scenes']\n      }, this.props.name != 'All' && this.state.frontTab == 0 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_7___default.a, {\n        className: classes.groupHead\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_light_grouplight__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n        sendAlexaCommand: this.props.sendAlexaCommand,\n        key: this.props.name,\n        name: this.props.name,\n        deviceProperties: this.props.deviceProperties,\n        devices: this.props.devices,\n        avgState: this.avgState\n      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_8___default.a, null)) : null, this.state.frontTab == 0 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_5___default.a, {\n        className: classes.dialogContent\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_List__WEBPACK_IMPORTED_MODULE_9___default.a, {\n        className: classes.root\n      }, Object.keys(this.props.devices).sort().map(function (c) {\n        return _this3.renderSwitch(_this3.props.devices[c]);\n      }))) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_sceneEditorArea__WEBPACK_IMPORTED_MODULE_14__[\"default\"], {\n        sendAlexaCommand: this.props.sendAlexaCommand,\n        name: this.props.name,\n        computedLevel: this.state.level,\n        edit: this.state.edit,\n        editFinished: this.editFinished,\n        lightList: this.lightList(),\n        area: this.props.name\n      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_8___default.a, null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_4___default.a, {\n        className: classes.dialogActions\n      }, this.state.edit ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3___default.a, {\n        onClick: this.editFinished,\n        color: \"primary\",\n        autoFocus: true\n      }, \"Cancel\") : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3___default.a, {\n        onClick: this.handleEdit,\n        color: \"primary\"\n      }, \"Edit\"), this.state.edit ? null : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3___default.a, {\n        onClick: this.props.close,\n        color: \"primary\",\n        autoFocus: true\n      }, \"OK\")));\n    }\n  }], [{\n    key: \"getDerivedStateFromProps\",\n    value: function getDerivedStateFromProps(nextProps, prevState) {\n      var data = nextProps.deviceProperties;\n      var changes = {};\n\n      if (nextProps.hasOwnProperty('deviceProperties')) {\n        changes.devices = nextProps.devices;\n        changes.deviceProperties = nextProps.deviceProperties;\n\n        if (prevState.hasOwnProperty('delaySet')) {\n          if (!prevState.delaySet) {\n            changes.level = AreaDialog.computeLevels(nextProps, nextProps.sceneData, data, prevState);\n          }\n        }\n      }\n\n      return changes;\n    }\n  }, {\n    key: \"computeLevels\",\n    value: function computeLevels(nextProps, sceneData, deviceProperties, prevState) {\n      var highscore = 0;\n      var currentlevel = 0;\n      var scores = {};\n\n      for (var i = 0; i < 4; i++) {\n        var level = i.toString();\n\n        if (nextProps.shortcuts.hasOwnProperty(level)) {\n          var sceneName = nextProps.shortcuts[level];\n          var scene = nextProps.sceneData[sceneName];\n          var levscore = 0;\n\n          for (var light in scene) {\n            var lightname = AreaDialog.nameByEndpointId(light, nextProps.devices);\n\n            if (deviceProperties.hasOwnProperty(lightname)) {\n              if (deviceProperties[lightname]['powerState'] == 'ON') {\n                var bri = deviceProperties[lightname]['brightness'];\n              } else {\n                var bri = 0;\n              }\n\n              levscore += 50 - Math.abs(bri - scene[light]['brightness']);\n            }\n          }\n\n          scores[level] = levscore;\n\n          if (levscore > highscore) {\n            currentlevel = i;\n            highscore = levscore;\n          }\n        }\n      }\n\n      return currentlevel;\n    }\n  }]);\n\n  return AreaDialog;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\n_defineProperty(AreaDialog, \"nameByEndpointId\", function (endpointId, devices) {\n  var fn = [];\n\n  for (var i = 0; i < devices.length; i++) {\n    if (devices[i]['endpointId'] == endpointId) {\n      return devices[i].friendlyName;\n    }\n  }\n});\n\nAreaDialog.propTypes = {\n  classes: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__[\"withStyles\"])(styles)(AreaDialog));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXJlYS9hcmVhRGlhbG9nLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2FyZWEvYXJlYURpYWxvZy5qcz9lNmJiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyB3aXRoU3R5bGVzIH0gZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvc3R5bGVzJztcblxuaW1wb3J0IEJ1dHRvbiBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9CdXR0b24nO1xuaW1wb3J0IERpYWxvZ0FjdGlvbnMgZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvRGlhbG9nQWN0aW9ucyc7XG5pbXBvcnQgRGlhbG9nQ29udGVudCBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9EaWFsb2dDb250ZW50JztcbmltcG9ydCBEaWFsb2dDb250ZW50VGV4dCBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9EaWFsb2dDb250ZW50VGV4dCc7XG5pbXBvcnQgRGlhbG9nVGl0bGUgZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvRGlhbG9nVGl0bGUnO1xuaW1wb3J0IERpdmlkZXIgZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvRGl2aWRlcic7XG5pbXBvcnQgTGlzdCBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9MaXN0JztcblxuaW1wb3J0IENsb3NlSWNvbiBmcm9tICdAbWF0ZXJpYWwtdWkvaWNvbnMvQ2xvc2UnO1xuXG5pbXBvcnQgU29mYURpYWxvZyBmcm9tICcuLi9zb2ZhRGlhbG9nJ1xuaW1wb3J0IEdyb3VwTGlnaHQgZnJvbSAnLi4vbGlnaHQvZ3JvdXBsaWdodCdcbmltcG9ydCBMaWdodCBmcm9tICcuLi9saWdodC9saWdodCdcbmltcG9ydCBTY2VuZUVkaXRvckFyZWEgZnJvbSAnLi4vc2NlbmVFZGl0b3JBcmVhJ1xuXG5jb25zdCBzdHlsZXMgID0gdGhlbWUgPT4gICh7XG4gICAgXG4gICAgcm9vdDoge1xuICAgICAgICBmbGV4R3JvdzogMSxcbiAgICB9LFxuICAgIGZsZXg6IHtcbiAgICAgICAgZmxleDogMSxcbiAgICB9LFxuICAgIG5vZ3Jvdzoge1xuICAgICAgICBmbGV4OiAxLFxuICAgIH0sXG4gICAgc2xpZGVyOiB7XG4gICAgICAgIGZsZXg6IDEsXG4gICAgICAgIHBhZGRpbmdMZWZ0OiAxNixcbiAgICAgICAgcGFkZGluZ1JpZ2h0OiAxNixcbiAgICAgICAgXG4gICAgfSxcbiAgICB0b3VjaFNpemVkOiB7XG4gICAgICAgIGhlaWdodDogNzIsXG4gICAgfSxcbiAgICBoYWx2ZXM6IHtcbiAgICAgICAgd2lkdGg6ICc1MCUnLFxuICAgIH0sXG4gICAgZmxleDoge1xuICAgICAgICBmbGV4OiAxLFxuICAgIH0sXG4gICAgbWVudUJ1dHRvbjoge1xuICAgICAgICBtYXJnaW5MZWZ0OiAtMTIsXG4gICAgICAgIG1hcmdpblJpZ2h0OiAyMCxcbiAgICB9LFxuICAgIHBhcGVySXRlbToge1xuICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgaGVpZ2h0OiA0MCxcbiAgICAgICAgcGFkZGluZzogXCIxNnB4XCIsXG4gICAgICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgfSxcbiAgICB0YWJUaXRsZToge1xuICAgICAgICBwYWRkaW5nOiAwLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLnBhbGV0dGUucHJpbWFyeS5kYXJrLFxuICAgIH0sXG4gICAgeHRhYlRpdGxlOiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhlbWUucGFsZXR0ZS5wcmltYXJ5LmRhcmssXG4gICAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgICAgcGFkZGluZzogMCxcbiAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgICAgIGp1c3RpZnlDb250ZW50OiBcInNwYWNlLWFyb3VuZFwiLFxuICAgIH0sXG4gICAgeHRhYlJvdzoge1xuICAgICAgICBwYWRkaW5nOjAsXG4gICAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGVtZS5wYWxldHRlLnByaW1hcnkuZGFyayxcbiAgICAgICAgY29sb3I6IHRoZW1lLnBhbGV0dGUucHJpbWFyeS5jb250cmFzdFRleHQsXG4gICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICBqdXN0aWZ5Q29udGVudDogXCJjZW50ZXJcIixcbiAgICB9LFxuICAgIHRhYkluZm86IHtcbiAgICAgICAgY29sb3I6IHRoZW1lLnBhbGV0dGUucHJpbWFyeS5jb250cmFzdFRleHQsXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhlbWUucGFsZXR0ZS5wcmltYXJ5LmRhcmssXG4gICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICBqdXN0aWZ5Q29udGVudDogXCJzcGFjZS1hcm91bmRcIixcbiAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICB9LFxuICAgIGJhc2VUaXRsZToge1xuICAgICAgICBtaW5IZWlnaHQ6IDQ4LFxuICAgIH0sXG4gICAgZGlhbG9nVGl0bGU6IHtcbiAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgICAgIGp1c3RpZnlDb250ZW50OiBcImNlbnRlclwiLFxuICAgICAgICBmbGV4R3JvdzogMSxcbiAgICAgICAgY29sb3I6IHRoZW1lLnBhbGV0dGUucHJpbWFyeS5jb250cmFzdFRleHQsXG4gICAgfSxcbiAgICBkaWFsb2dBY3Rpb25zOiB7XG4gICAgICAgIHBhZGRpbmdCb3R0b206IFwiZW52KHNhZmUtYXJlYS1pbnNldC1ib3R0b20pXCIsXG4gICAgfSxcbiAgICBkaWFsb2dDb250ZW50OiB7XG4gICAgICAgIGhlaWdodDogXCIxMDAlXCIsXG4gICAgICAgIHBhZGRpbmc6IDAsXG4gICAgfSxcbiAgICBncm91cEhlYWQ6IHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGVtZS5wYWxldHRlLnByaW1hcnlbMTAwXSxcbiAgICAgICAgcGFkZGluZzogMCxcbiAgICB9XG59KTtcblxuXG5jbGFzcyBBcmVhRGlhbG9nIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2NlbmVzOiB7fSxcbiAgICAgICAgICAgIHNob3J0Y3V0czoge30sXG4gICAgICAgICAgICBsaWdodHM6IHt9LFxuICAgICAgICAgICAgZnJvbnRUYWI6IDAsXG4gICAgICAgICAgICBjb21wdXRlZExldmVsOiAwLFxuICAgICAgICAgICAgbGV2ZWw6IDAsXG4gICAgICAgICAgICBicmlnaHRuZXNzOiAwLFxuICAgICAgICAgICAgcG93ZXJTdGF0ZTogZmFsc2UsXG4gICAgICAgICAgICBjb2xvclRlbXBlcmF0dXJlSW5LZWx2aW46IDQwMDAsXG4gICAgICAgICAgICB0YXJnZXQ6IG51bGwsXG4gICAgICAgICAgICBvcGVuOiBmYWxzZSxcbiAgICAgICAgICAgIGVuZHBvaW50SWRDYWNoZTogW10sXG4gICAgICAgICAgICBsYXN0bWVzc2FnZTogJycsXG4gICAgICAgICAgICB1cGRhdGVzOiB7fSxcbiAgICAgICAgICAgIGFyZWFTdGF0ZToge30sXG4gICAgICAgICAgICBlZGl0OiBmYWxzZSxcbiAgICAgICAgICAgIGRlbGF5U2V0OiBmYWxzZSxcblxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmF2Z1N0YXRlID0gdGhpcy5hdmdTdGF0ZS5iaW5kKHRoaXMpO1xuXG4gICAgfVxuICAgIFxuICAgIHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMobmV4dFByb3BzLCBwcmV2U3RhdGUpIHtcblxuICAgICAgICB2YXIgZGF0YT1uZXh0UHJvcHMuZGV2aWNlUHJvcGVydGllc1xuICAgICAgICB2YXIgY2hhbmdlcz17fVxuXG4gICAgICAgIGlmIChuZXh0UHJvcHMuaGFzT3duUHJvcGVydHkoJ2RldmljZVByb3BlcnRpZXMnKSkge1xuICAgICAgICAgICAgY2hhbmdlcy5kZXZpY2VzPW5leHRQcm9wcy5kZXZpY2VzXG4gICAgICAgICAgICBjaGFuZ2VzLmRldmljZVByb3BlcnRpZXM9bmV4dFByb3BzLmRldmljZVByb3BlcnRpZXNcbiAgICAgICAgICAgIGlmIChwcmV2U3RhdGUuaGFzT3duUHJvcGVydHkoJ2RlbGF5U2V0JykpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXByZXZTdGF0ZS5kZWxheVNldCkge1xuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VzLmxldmVsPUFyZWFEaWFsb2cuY29tcHV0ZUxldmVscyhuZXh0UHJvcHMsIG5leHRQcm9wcy5zY2VuZURhdGEsIGRhdGEsIHByZXZTdGF0ZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2hhbmdlc1xuICAgIH1cbiAgICBcbiAgICBzdGF0aWMgbmFtZUJ5RW5kcG9pbnRJZCA9IChlbmRwb2ludElkLCBkZXZpY2VzKSA9PiB7XG4gICAgICAgIHZhciBmbj1bXVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRldmljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChkZXZpY2VzW2ldWydlbmRwb2ludElkJ109PWVuZHBvaW50SWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGV2aWNlc1tpXS5mcmllbmRseU5hbWVcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgc3RhdGljIGNvbXB1dGVMZXZlbHMobmV4dFByb3BzLCBzY2VuZURhdGEsIGRldmljZVByb3BlcnRpZXMsIHByZXZTdGF0ZSkge1xuXG4gICAgICAgIHZhciBoaWdoc2NvcmU9MFxuICAgICAgICB2YXIgY3VycmVudGxldmVsPTBcbiAgICAgICAgdmFyIHNjb3Jlcz17fVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbGV2ZWw9aS50b1N0cmluZygpXG4gICAgICAgICAgICBpZiAobmV4dFByb3BzLnNob3J0Y3V0cy5oYXNPd25Qcm9wZXJ0eShsZXZlbCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2NlbmVOYW1lPW5leHRQcm9wcy5zaG9ydGN1dHNbbGV2ZWxdXG4gICAgICAgICAgICAgICAgdmFyIHNjZW5lPW5leHRQcm9wcy5zY2VuZURhdGFbc2NlbmVOYW1lXVxuICAgICAgICAgICAgICAgIHZhciBsZXZzY29yZT0wXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbGlnaHQgaW4gc2NlbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpZ2h0bmFtZT1BcmVhRGlhbG9nLm5hbWVCeUVuZHBvaW50SWQobGlnaHQsbmV4dFByb3BzLmRldmljZXMpXG4gICAgICAgICAgICAgICAgICAgIGlmIChkZXZpY2VQcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KGxpZ2h0bmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGV2aWNlUHJvcGVydGllc1tsaWdodG5hbWVdWydwb3dlclN0YXRlJ109PSdPTicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYnJpPWRldmljZVByb3BlcnRpZXNbbGlnaHRuYW1lXVsnYnJpZ2h0bmVzcyddXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBicmk9MFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV2c2NvcmUrPSg1MC1NYXRoLmFicyhicmktc2NlbmVbbGlnaHRdWydicmlnaHRuZXNzJ10pKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2NvcmVzW2xldmVsXT1sZXZzY29yZVxuICAgICAgICAgICAgICAgIGlmIChsZXZzY29yZT5oaWdoc2NvcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudGxldmVsPWlcbiAgICAgICAgICAgICAgICAgICAgaGlnaHNjb3JlPWxldnNjb3JlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGN1cnJlbnRsZXZlbFxuICAgIH0gICAgXG5cblxuICAgIGxpZ2h0TGlzdCgpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBsaWdodHM9W11cbiAgICAgICAgZm9yICh2YXIgZGV2IGluIHRoaXMucHJvcHMuZGV2aWNlUHJvcGVydGllcykge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuZGV2aWNlUHJvcGVydGllc1tkZXZdLmhhc093blByb3BlcnR5KCdicmlnaHRuZXNzJykpIHtcbiAgICAgICAgICAgICAgICBsaWdodHMucHVzaChkZXYpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxpZ2h0c1xuICAgIH1cblxuICAgIGF2Z1N0YXRlKHByb3ApIHtcbiAgICAgICAgXG4gICAgICAgIGlmIChwcm9wPT0nb24nKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBkZXYgaW4gdGhpcy5wcm9wcy5kZXZpY2VQcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuZGV2aWNlUHJvcGVydGllc1tkZXZdLmhhc093blByb3BlcnR5KCdwb3dlclN0YXRlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuZGV2aWNlUHJvcGVydGllc1tkZXZdLnBvd2VyU3RhdGU9PSdPTicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIFxuICAgICAgICB9IGVsc2UgaWYgKHByb3A9PSdicmlnaHRuZXNzJykge1xuICAgICAgICAgICAgdmFyIGJyaWdodG5lc3NDb3VudD0wO1xuICAgICAgICAgICAgdmFyIHRvdGFsYnJpZ2h0bmVzcz0wO1xuICAgICAgICAgICAgZm9yICh2YXIgZGV2IGluIHRoaXMucHJvcHMuZGV2aWNlUHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmRldmljZVByb3BlcnRpZXNbZGV2XS5oYXNPd25Qcm9wZXJ0eSgnYnJpZ2h0bmVzcycpKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyaWdodG5lc3NDb3VudD1icmlnaHRuZXNzQ291bnQrMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuZGV2aWNlUHJvcGVydGllc1tkZXZdLnBvd2VyU3RhdGU9PSdPTicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsYnJpZ2h0bmVzcz10b3RhbGJyaWdodG5lc3MrdGhpcy5wcm9wcy5kZXZpY2VQcm9wZXJ0aWVzW2Rldl0uYnJpZ2h0bmVzcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChicmlnaHRuZXNzQ291bnQ9PTApIHsgcmV0dXJuIDAgfVxuICAgICAgICAgICAgdmFyIGF2Z2I9dG90YWxicmlnaHRuZXNzL2JyaWdodG5lc3NDb3VudFxuICAgICAgICAgICAgcmV0dXJuIGF2Z2I7XG4gICAgICAgIFxuICAgICAgICB9IGVsc2UgaWYgKHByb3A9PSd0ZW1wZXJhdHVyZScpIHtcbiAgICAgICAgICAgIHZhciB0ZW1wZXJhdHVyZUNvdW50PTA7XG4gICAgICAgICAgICB2YXIgdG90YWx0ZW1wZXJhdHVyZT0wO1xuICAgICAgICAgICAgZm9yICh2YXIgZGV2IGluIHRoaXMucHJvcHMuZGV2aWNlUHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmRldmljZVByb3BlcnRpZXNbZGV2XS5oYXNPd25Qcm9wZXJ0eSgnY29sb3JUZW1wZXJhdHVyZUluS2VsdmluJykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGVyYXR1cmVDb3VudD10ZW1wZXJhdHVyZUNvdW50KzE7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmRldmljZVByb3BlcnRpZXNbZGV2XS5wb3dlclN0YXRlPT0nT04nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b3RhbHRlbXBlcmF0dXJlPXRvdGFsdGVtcGVyYXR1cmUrdGhpcy5wcm9wcy5kZXZpY2VQcm9wZXJ0aWVzW2Rldl0uY29sb3JUZW1wZXJhdHVyZUluS2VsdmluO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRlbXBlcmF0dXJlQ291bnQ9PTApIHsgcmV0dXJuIDAgfVxuICAgICAgICAgICAgdmFyIGF2Z2I9dG90YWx0ZW1wZXJhdHVyZS90ZW1wZXJhdHVyZUNvdW50XG4gICAgICAgICAgICByZXR1cm4gYXZnYjtcbiAgICAgICAgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgYW55T24oKSB7XG4gICAgICAgIGZvciAodmFyIGRldiBpbiB0aGlzLnByb3BzLmRldmljZVByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmRldmljZVByb3BlcnRpZXNbZGV2XS5oYXNPd25Qcm9wZXJ0eSgncG93ZXJTdGF0ZScpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuZGV2aWNlUHJvcGVydGllc1tkZXZdLnBvd2VyU3RhdGU9PSdPTicpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgcmVuZGVyU3dpdGNoKGRldmljZSkge1xuXG4gICAgICAgIGlmIChkZXZpY2U9PT17fSB8fCBkZXZpY2U9PXVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRldmljZS5oYXNPd25Qcm9wZXJ0eSgnZGlzcGxheUNhdGVnb3JpZXMnKSkge1xuICAgICAgICAgICAgc3dpdGNoKGRldmljZS5kaXNwbGF5Q2F0ZWdvcmllc1swXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0xJR0hUJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNhcGFiaWxpdGllcz1bXVxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRldmljZS5jYXBhYmlsaXRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcGFiaWxpdGllcy5wdXNoKGRldmljZS5jYXBhYmlsaXRpZXNbaV0uaW50ZXJmYWNlKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA8TGlnaHQgc2VuZEFsZXhhQ29tbWFuZD17dGhpcy5wcm9wcy5zZW5kQWxleGFDb21tYW5kfSBrZXk9eyBkZXZpY2UuZW5kcG9pbnRJZCB9IG5hbWU9eyBkZXZpY2UuZnJpZW5kbHlOYW1lIH0gZGV2aWNlPXsgZGV2aWNlIH0gZGV2aWNlUHJvcGVydGllcz17IHRoaXMucHJvcHMuZGV2aWNlUHJvcGVydGllc1tkZXZpY2UuZnJpZW5kbHlOYW1lXSB9IC8+XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgb3BlbjogZmFsc2UsXG4gICAgfTtcblxuICAgIGhhbmRsZVByZUxldmVsQ2hhbmdlID0gZXZlbnQgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgbGV2ZWw6IGV2ZW50IH0pO1xuICAgIH07IFxuXG5cbiAgICBoYW5kbGVUYWIgPSAoZXZlbnQsIHRhYm5vKSA9PiB7XG4gICAgICAgIGlmICh0YWJubz09MCkgeyB0aGlzLnNldFN0YXRlKHtmcm9udFRhYjogdGFibm99KX1cbiAgICAgICAgaWYgKHRhYm5vPT0xKSB7IHRoaXMuc2V0U3RhdGUoe2Zyb250VGFiOiB0YWJub30pfVxuICAgIH07ICAgXG4gICAgXG4gICAgaGFuZGxlRWRpdCA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZWRpdDp0cnVlfSlcbiAgICB9XG4gICAgXG4gICAgZWRpdEZpbmlzaGVkID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtlZGl0OmZhbHNlfSlcbiAgICB9XG4gICAgXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7ICAgIFxuICBcdCAgICBmZXRjaCgnL2xpc3QvbG9naWMvYXJlYS8nK3RoaXMucHJvcHMubmFtZSlcbiBcdFx0ICAgIC50aGVuKHJlc3VsdD0+cmVzdWx0Lmpzb24oKSlcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdD0+dGhpcy5zZXRTdGF0ZShyZXN1bHQpKVxuICAgIH1cbiAgICBcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgY2xhc3NlcyB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3QgeyBkZXZpY2VzIH0gPSB0aGlzLnN0YXRlOyAgXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFNvZmFEaWFsb2cgdGl0bGU9e3RoaXMucHJvcHMubmFtZX0gb3Blbj17dGhpcy5wcm9wcy5vcGVufSBjbG9zZT17dGhpcy5wcm9wcy5jbG9zZX0gdGFiQ2hhbmdlPXt0aGlzLmhhbmRsZVRhYn0gdGFiVmFsdWU9e3RoaXMuc3RhdGUuZnJvbnRUYWJ9XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJzPXsgWydMaWdodHMnLCdTY2VuZXMnXX0gPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMubmFtZSE9J0FsbCcgJiYgdGhpcy5zdGF0ZS5mcm9udFRhYj09MCA/XG4gICAgICAgICAgICAgICAgPERpYWxvZ1RpdGxlIGNsYXNzTmFtZT17Y2xhc3Nlcy5ncm91cEhlYWR9PlxuICAgICAgICAgICAgICAgICAgICA8R3JvdXBMaWdodCBzZW5kQWxleGFDb21tYW5kPXt0aGlzLnByb3BzLnNlbmRBbGV4YUNvbW1hbmR9IGtleT17IHRoaXMucHJvcHMubmFtZSB9IG5hbWU9eyB0aGlzLnByb3BzLm5hbWUgfSBkZXZpY2VQcm9wZXJ0aWVzPXsgdGhpcy5wcm9wcy5kZXZpY2VQcm9wZXJ0aWVzIH0gZGV2aWNlcz17IHRoaXMucHJvcHMuZGV2aWNlcyB9IGF2Z1N0YXRlPXsgdGhpcy5hdmdTdGF0ZSB9IC8+XG4gICAgICAgICAgICAgICAgICAgIDxEaXZpZGVyIC8+ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDwvRGlhbG9nVGl0bGU+XG4gICAgICAgICAgICAgICAgOiBudWxsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5mcm9udFRhYj09MCA/XG4gICAgICAgICAgICAgICAgPERpYWxvZ0NvbnRlbnQgY2xhc3NOYW1lPXtjbGFzc2VzLmRpYWxvZ0NvbnRlbnQgfT5cbiAgICAgICAgICAgICAgICAgICAgPExpc3QgY2xhc3NOYW1lPXtjbGFzc2VzLnJvb3R9PlxuICAgICAgICAgICAgICAgICAgICB7IE9iamVjdC5rZXlzKHRoaXMucHJvcHMuZGV2aWNlcykuc29ydCgpLm1hcChjID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclN3aXRjaCh0aGlzLnByb3BzLmRldmljZXNbY10pXG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC9MaXN0PlxuICAgICAgICAgICAgICAgIDwvRGlhbG9nQ29udGVudD5cbiAgICAgICAgICAgICAgICA6XG4gICAgICAgICAgICAgICAgPFNjZW5lRWRpdG9yQXJlYSBzZW5kQWxleGFDb21tYW5kPXt0aGlzLnByb3BzLnNlbmRBbGV4YUNvbW1hbmR9IG5hbWU9e3RoaXMucHJvcHMubmFtZX0gY29tcHV0ZWRMZXZlbD17dGhpcy5zdGF0ZS5sZXZlbH0gZWRpdD17dGhpcy5zdGF0ZS5lZGl0fSBlZGl0RmluaXNoZWQ9e3RoaXMuZWRpdEZpbmlzaGVkfSBsaWdodExpc3Q9e3RoaXMubGlnaHRMaXN0KCl9IGFyZWE9e3RoaXMucHJvcHMubmFtZX0gLz5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgPERpdmlkZXIgLz5cbiAgICAgICAgICAgICAgICA8RGlhbG9nQWN0aW9ucyBjbGFzc05hbWU9e2NsYXNzZXMuZGlhbG9nQWN0aW9uc30+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmVkaXQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXt0aGlzLmVkaXRGaW5pc2hlZH0gY29sb3I9XCJwcmltYXJ5XCIgYXV0b0ZvY3VzPkNhbmNlbDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA6XG4gICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMuaGFuZGxlRWRpdH0gY29sb3I9XCJwcmltYXJ5XCI+RWRpdDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmVkaXQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgbnVsbDpcbiAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17dGhpcy5wcm9wcy5jbG9zZX0gY29sb3I9XCJwcmltYXJ5XCIgYXV0b0ZvY3VzPk9LPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA8L0RpYWxvZ0FjdGlvbnM+XG4gICAgICAgICAgICA8L1NvZmFEaWFsb2c+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5BcmVhRGlhbG9nLnByb3BUeXBlcyA9IHtcbiAgY2xhc3NlczogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxufTtcblxuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHN0eWxlcykoQXJlYURpYWxvZyk7XG5cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFDQTtBQURBO0FBR0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQU1BO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFEQTtBQXBCQTtBQXdCQTtBQURBO0FBSUE7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU9BO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQTtBQURBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBUUE7QUFEQTtBQUlBO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7QUFGQTtBQWhGQTtBQUNBO0FBc0ZBOzs7OztBQUVBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBRkE7QUFxTEE7QUFEQTtBQUNBO0FBckxBO0FBeUxBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUEzTEE7QUE4TEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFqTUE7QUFtTUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQXJNQTtBQXVNQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBdE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWpCQTtBQW9CQTtBQXZCQTtBQXlCQTtBQUNBOzs7QUFnRUE7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTs7O0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7OztBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFDQTs7O0FBd0JBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUlBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFJQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFNQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBSUE7QUFBQTtBQUFBO0FBQUE7QUFLQTs7O0FBN05BO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQVdBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUF6RkE7QUFDQTtBQURBO0FBZ0RBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXNNQTtBQUNBO0FBREE7QUFLQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/area/areaDialog.js\n");

/***/ })

}]);