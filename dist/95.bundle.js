(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[95],{

/***/ "./js/area/area.js":
/*!*************************!*\
  !*** ./js/area/area.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ \"./node_modules/@material-ui/core/styles/index.js\");\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Typography */ \"./node_modules/@material-ui/core/Typography/index.js\");\n/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/ListItem */ \"./node_modules/@material-ui/core/ListItem/index.js\");\n/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/ListItemText */ \"./node_modules/@material-ui/core/ListItemText/index.js\");\n/* harmony import */ var _material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _sofaSlider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../sofaSlider */ \"./js/sofaSlider.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\n\n\nvar styles = function styles(theme) {\n  return {\n    halves: {\n      flexGrow: 1,\n      flexBasis: 0,\n      boxSizing: \"border-box\"\n    },\n    areaListItem: {\n      display: \"flex\",\n      height: 64,\n      padding: \"0 4\",\n      alignItems: \"center\"\n    }\n  };\n};\n\nvar Area =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(Area, _React$Component);\n\n  function Area(props) {\n    var _this;\n\n    _classCallCheck(this, Area);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(Area).call(this, props));\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"handlePreLevelChange\", function (event, level) {\n      console.log(level);\n\n      _this.setState({\n        level: level,\n        delaySet: true\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"runScene\", function (sceneName) {\n      _this.props.sendAlexaCommand(sceneName, \"logic:scene:\" + sceneName, \"SceneController\", \"Activate\");\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"endSliderDelay\", function () {\n      _this.setState({\n        delaySet: false\n      }, function () {\n        return Area.computeLevels(_this.props.sceneData, _this.props.deviceProperties, _this.state);\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"delaySliderUpdates\", function () {\n      _this.setState({\n        delaySet: true\n      }, function () {\n        return setTimeout(function () {\n          return endSliderDelay();\n        }, 1000);\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"runShortcut\", function (level) {\n      if (_this.props.shortcuts.hasOwnProperty(level.toString())) {\n        var sceneName = _this.props.shortcuts[level];\n\n        _this.runScene(sceneName);\n      } else {\n        console.log('No scene shortcut for area level', level);\n      }\n    });\n\n    _this.state = {\n      level: 0,\n      delaySet: false\n    };\n    return _this;\n  }\n\n  _createClass(Area, [{\n    key: \"render\",\n    value: function render() {\n      var _this2 = this;\n\n      var classes = this.props.classes;\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_4___default.a, {\n        className: classes.areaListItem\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default.a, {\n        variant: \"subtitle1\",\n        className: classes.halves,\n        onClick: function onClick() {\n          return _this2.props.selectArea(_this2.props.name);\n        }\n      }, this.props.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_sofaSlider__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n        half: true,\n        value: this.state.level,\n        step: 1,\n        min: 0,\n        max: 3,\n        preChange: this.handlePreLevelChange,\n        change: this.runShortcut\n      }));\n    }\n  }], [{\n    key: \"getDerivedStateFromProps\",\n    value: function getDerivedStateFromProps(nextProps, prevState) {\n      var data = nextProps.deviceProperties;\n      var changes = {};\n\n      if (nextProps.hasOwnProperty('deviceProperties')) {\n        changes.devices = nextProps.devices;\n        changes.deviceProperties = nextProps.deviceProperties;\n\n        if (prevState.hasOwnProperty('delaySet')) {\n          if (!prevState.delaySet) {\n            changes.level = Area.computeLevels(nextProps.sceneData, data, nextProps, prevState);\n          }\n        } else {\n          changes.level = Area.computeLevels(nextProps.sceneData, data, nextProps, prevState);\n        }\n      }\n\n      return changes;\n    }\n  }, {\n    key: \"computeLevels\",\n    value: function computeLevels(sceneData, deviceProperties, nextProps, prevState) {\n      var highscore = 0;\n      var currentlevel = 0;\n      var scores = {};\n      var devices = nextProps.devices;\n\n      for (var i = 0; i < 4; i++) {\n        var level = i.toString();\n\n        if (nextProps.shortcuts.hasOwnProperty(level)) {\n          var sceneName = nextProps.shortcuts[level];\n          var scene = nextProps.sceneData[sceneName];\n          var levscore = 0;\n\n          for (var light in scene) {\n            // This is a hack to switch from endpointId to friendlyname\n            for (var j = 0; j < devices.length; j++) {\n              if (devices[j].endpointId == light) {\n                var lightname = devices[j].friendlyName;\n\n                if (deviceProperties[lightname]['powerState'] == 'ON') {\n                  var bri = deviceProperties[lightname]['brightness'];\n                } else {\n                  var bri = 0;\n                }\n\n                levscore += 50 - Math.abs(bri - scene[light]['brightness']);\n                break;\n              }\n            }\n          }\n\n          scores[level] = levscore;\n\n          if (levscore > highscore) {\n            currentlevel = i;\n            highscore = levscore;\n          }\n        }\n      }\n\n      return currentlevel;\n    }\n  }]);\n\n  return Area;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\nArea.propTypes = {\n  classes: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__[\"withStyles\"])(styles)(Area));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9hcmVhL2FyZWEuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9hcmVhL2FyZWEuanM/ZTFmZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgd2l0aFN0eWxlcyB9IGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL3N0eWxlcyc7XG5cbmltcG9ydCBUeXBvZ3JhcGh5IGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL1R5cG9ncmFwaHknO1xuaW1wb3J0IExpc3RJdGVtIGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL0xpc3RJdGVtJztcbmltcG9ydCBMaXN0SXRlbVRleHQgZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvTGlzdEl0ZW1UZXh0JztcblxuaW1wb3J0IFNvZmFTbGlkZXIgZnJvbSAnLi4vc29mYVNsaWRlcic7XG5cbmNvbnN0IHN0eWxlcyAgPSB0aGVtZSA9PiAgKHtcbiAgICBcbiAgICBoYWx2ZXM6IHtcbiAgICAgICAgZmxleEdyb3c6IDEsXG4gICAgICAgIGZsZXhCYXNpczogMCxcbiAgICAgICAgYm94U2l6aW5nOiBcImJvcmRlci1ib3hcIixcbiAgICB9LFxuICAgIGFyZWFMaXN0SXRlbToge1xuICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgaGVpZ2h0OiA2NCxcbiAgICAgICAgcGFkZGluZzogXCIwIDRcIixcbiAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICB9LFxufSk7XG5cblxuY2xhc3MgQXJlYSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGxldmVsOiAwLFxuICAgICAgICAgICAgZGVsYXlTZXQ6IGZhbHNlLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBcbiAgICBcbiAgICBzdGF0aWMgZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzKG5leHRQcm9wcywgcHJldlN0YXRlKSB7XG5cbiAgICAgICAgdmFyIGRhdGE9bmV4dFByb3BzLmRldmljZVByb3BlcnRpZXNcbiAgICAgICAgdmFyIGNoYW5nZXM9e31cbiAgICAgICAgXG4gICAgICAgIGlmIChuZXh0UHJvcHMuaGFzT3duUHJvcGVydHkoJ2RldmljZVByb3BlcnRpZXMnKSkge1xuICAgICAgICAgICAgY2hhbmdlcy5kZXZpY2VzPW5leHRQcm9wcy5kZXZpY2VzXG4gICAgICAgICAgICBjaGFuZ2VzLmRldmljZVByb3BlcnRpZXM9bmV4dFByb3BzLmRldmljZVByb3BlcnRpZXNcbiAgICAgICAgICAgIGlmIChwcmV2U3RhdGUuaGFzT3duUHJvcGVydHkoJ2RlbGF5U2V0JykpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXByZXZTdGF0ZS5kZWxheVNldCkge1xuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VzLmxldmVsPUFyZWEuY29tcHV0ZUxldmVscyhuZXh0UHJvcHMuc2NlbmVEYXRhLCBkYXRhLCBuZXh0UHJvcHMsIHByZXZTdGF0ZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNoYW5nZXMubGV2ZWw9QXJlYS5jb21wdXRlTGV2ZWxzKG5leHRQcm9wcy5zY2VuZURhdGEsIGRhdGEsIG5leHRQcm9wcywgcHJldlN0YXRlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjaGFuZ2VzXG4gICAgfVxuICAgIFxuICAgIFxuICAgIHN0YXRpYyBjb21wdXRlTGV2ZWxzKHNjZW5lRGF0YSwgZGV2aWNlUHJvcGVydGllcywgbmV4dFByb3BzLCBwcmV2U3RhdGUpIHtcblxuICAgICAgICB2YXIgaGlnaHNjb3JlPTBcbiAgICAgICAgdmFyIGN1cnJlbnRsZXZlbD0wXG4gICAgICAgIHZhciBzY29yZXM9e31cbiAgICAgICAgdmFyIGRldmljZXM9bmV4dFByb3BzLmRldmljZXNcbiAgICAgICAgXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbGV2ZWw9aS50b1N0cmluZygpXG4gICAgICAgICAgICBpZiAobmV4dFByb3BzLnNob3J0Y3V0cy5oYXNPd25Qcm9wZXJ0eShsZXZlbCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2NlbmVOYW1lPW5leHRQcm9wcy5zaG9ydGN1dHNbbGV2ZWxdXG4gICAgICAgICAgICAgICAgdmFyIHNjZW5lPW5leHRQcm9wcy5zY2VuZURhdGFbc2NlbmVOYW1lXVxuXG4gICAgICAgICAgICAgICAgdmFyIGxldnNjb3JlPTBcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBsaWdodCBpbiBzY2VuZSkgeyAgICBcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBpcyBhIGhhY2sgdG8gc3dpdGNoIGZyb20gZW5kcG9pbnRJZCB0byBmcmllbmRseW5hbWVcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkZXZpY2VzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGV2aWNlc1tqXS5lbmRwb2ludElkPT1saWdodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsaWdodG5hbWU9ZGV2aWNlc1tqXS5mcmllbmRseU5hbWVcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZXZpY2VQcm9wZXJ0aWVzW2xpZ2h0bmFtZV1bJ3Bvd2VyU3RhdGUnXT09J09OJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYnJpPWRldmljZVByb3BlcnRpZXNbbGlnaHRuYW1lXVsnYnJpZ2h0bmVzcyddXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJyaT0wXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldnNjb3JlKz0oNTAtTWF0aC5hYnMoYnJpLXNjZW5lW2xpZ2h0XVsnYnJpZ2h0bmVzcyddKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2NvcmVzW2xldmVsXT1sZXZzY29yZVxuICAgICAgICAgICAgICAgIGlmIChsZXZzY29yZT5oaWdoc2NvcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudGxldmVsPWlcbiAgICAgICAgICAgICAgICAgICAgaGlnaHNjb3JlPWxldnNjb3JlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjdXJyZW50bGV2ZWxcbiAgICB9XG5cbiAgICBoYW5kbGVQcmVMZXZlbENoYW5nZSA9IChldmVudCwgbGV2ZWwpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cobGV2ZWwpXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBsZXZlbDogbGV2ZWwsIGRlbGF5U2V0OiB0cnVlfSk7XG4gICAgfTsgXG5cbiAgICBydW5TY2VuZSA9IHNjZW5lTmFtZSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMuc2VuZEFsZXhhQ29tbWFuZChzY2VuZU5hbWUsIFwibG9naWM6c2NlbmU6XCIrc2NlbmVOYW1lLCBcIlNjZW5lQ29udHJvbGxlclwiLCBcIkFjdGl2YXRlXCIpXG4gICAgfVxuICAgIFxuICAgIGVuZFNsaWRlckRlbGF5ID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgZGVsYXlTZXQ6IGZhbHNlfSxcbiAgICAgICAgICAgICAgICAoKSA9PiAgQXJlYS5jb21wdXRlTGV2ZWxzKHRoaXMucHJvcHMuc2NlbmVEYXRhLHRoaXMucHJvcHMuZGV2aWNlUHJvcGVydGllcywgdGhpcy5zdGF0ZSlcbiAgICAgICAgKTtcbiAgICB9XG4gICAgXG4gICAgZGVsYXlTbGlkZXJVcGRhdGVzID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgZGVsYXlTZXQ6IHRydWV9LFxuICAgICAgICAgICAgKCkgPT4gIHNldFRpbWVvdXQoKCkgPT4gZW5kU2xpZGVyRGVsYXkoKSwgMTAwMClcbiAgICAgICAgKVxuICAgIH1cblxuICAgIHJ1blNob3J0Y3V0ID0gKGxldmVsKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNob3J0Y3V0cy5oYXNPd25Qcm9wZXJ0eShsZXZlbC50b1N0cmluZygpKSkge1xuICAgICAgICAgICAgdmFyIHNjZW5lTmFtZT10aGlzLnByb3BzLnNob3J0Y3V0c1tsZXZlbF1cbiAgICAgICAgICAgIHRoaXMucnVuU2NlbmUoc2NlbmVOYW1lKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ05vIHNjZW5lIHNob3J0Y3V0IGZvciBhcmVhIGxldmVsJywgbGV2ZWwpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCB7IGNsYXNzZXMgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxMaXN0SXRlbSBjbGFzc05hbWU9e2NsYXNzZXMuYXJlYUxpc3RJdGVtfT5cbiAgICAgICAgICAgICAgICA8VHlwb2dyYXBoeSB2YXJpYW50PVwic3VidGl0bGUxXCIgY2xhc3NOYW1lPXtjbGFzc2VzLmhhbHZlc30gb25DbGljaz17ICgpID0+IHRoaXMucHJvcHMuc2VsZWN0QXJlYSh0aGlzLnByb3BzLm5hbWUpfT57dGhpcy5wcm9wcy5uYW1lfTwvVHlwb2dyYXBoeT5cbiAgICAgICAgICAgICAgICA8U29mYVNsaWRlciBoYWxmPXt0cnVlfSB2YWx1ZT17dGhpcy5zdGF0ZS5sZXZlbH0gc3RlcD17MX0gbWluPXswfSBtYXg9ezN9IFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJlQ2hhbmdlPXt0aGlzLmhhbmRsZVByZUxldmVsQ2hhbmdlfSBjaGFuZ2U9e3RoaXMucnVuU2hvcnRjdXR9IC8+XG4gICAgICAgICAgICA8L0xpc3RJdGVtPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuQXJlYS5wcm9wVHlwZXMgPSB7XG4gIGNsYXNzZXM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZXMoc3R5bGVzKShBcmVhKTtcblxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBUEE7QUFBQTtBQUNBO0FBZUE7Ozs7O0FBRUE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFGQTtBQXdFQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBM0VBO0FBNkVBO0FBQ0E7QUFDQTtBQS9FQTtBQWlGQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQXJGQTtBQXVGQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUEzRkE7QUE2RkE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBakdBO0FBQ0E7QUFDQTtBQUZBO0FBSEE7QUFPQTtBQUNBOzs7QUE2RkE7QUFBQTtBQUNBO0FBREE7QUFJQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQURBO0FBSUE7OztBQXRHQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTs7O0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7Ozs7QUF2RUE7QUFDQTtBQW9IQTtBQUNBO0FBREE7QUFJQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./js/area/area.js\n");

/***/ }),

/***/ "./js/sofaSlider.js":
/*!**************************!*\
  !*** ./js/sofaSlider.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nSyntaxError: /opt/s/fullstack_template/static/js/sofaSlider.js: Unexpected token, expected \\\"}\\\" (111:43)\\n\\n\\u001b[0m \\u001b[90m 109 | \\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 110 | \\u001b[39m        \\u001b[36mreturn\\u001b[39m (\\u001b[0m\\n\\u001b[0m\\u001b[31m\\u001b[1m>\\u001b[22m\\u001b[39m\\u001b[90m 111 | \\u001b[39m                    \\u001b[33m<\\u001b[39m\\u001b[33mdiv\\u001b[39m style\\u001b[33m=\\u001b[39m{ \\u001b[32m\\\"minWidth\\\"\\u001b[39m\\u001b[33m:\\u001b[39m minWidth} className\\u001b[33m=\\u001b[39m{ padLeft \\u001b[33m?\\u001b[39m classes\\u001b[33m.\\u001b[39mstack\\u001b[33m+\\u001b[39m\\u001b[32m\\\" \\\"\\u001b[39m\\u001b[33m+\\u001b[39mclasses\\u001b[33m.\\u001b[39mpadLeft\\u001b[33m:\\u001b[39m ( half \\u001b[33m?\\u001b[39m classes\\u001b[33m.\\u001b[39mhalf \\u001b[33m:\\u001b[39m classes\\u001b[33m.\\u001b[39mstack) } \\u001b[33m>\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m     | \\u001b[39m                                           \\u001b[31m\\u001b[1m^\\u001b[22m\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 112 | \\u001b[39m                    { name \\u001b[33m?\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 113 | \\u001b[39m                        \\u001b[33m<\\u001b[39m\\u001b[33mTypography\\u001b[39m variant\\u001b[33m=\\u001b[39m\\u001b[32m\\\"subtitle1\\\"\\u001b[39m className\\u001b[33m=\\u001b[39m{classes\\u001b[33m.\\u001b[39mstackLabel} \\u001b[33m>\\u001b[39m{\\u001b[36mthis\\u001b[39m\\u001b[33m.\\u001b[39mprops\\u001b[33m.\\u001b[39mname}\\u001b[33m<\\u001b[39m\\u001b[33m/\\u001b[39m\\u001b[33mTypography\\u001b[39m\\u001b[33m>\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 114 | \\u001b[39m                    \\u001b[33m:\\u001b[39m \\u001b[36mnull\\u001b[39m }\\u001b[0m\\n    at _class.raise (/opt/s/fullstack_template/static/node_modules/@babel/parser/lib/index.js:4021:15)\\n    at _class.unexpected (/opt/s/fullstack_template/static/node_modules/@babel/parser/lib/index.js:5330:16)\\n    at _class.expect (/opt/s/fullstack_template/static/node_modules/@babel/parser/lib/index.js:5318:28)\\n    at _class.jsxParseExpressionContainer (/opt/s/fullstack_template/static/node_modules/@babel/parser/lib/index.js:3579:12)\\n    at _class.jsxParseAttributeValue (/opt/s/fullstack_template/static/node_modules/@babel/parser/lib/index.js:3538:23)\\n    at _class.jsxParseAttribute (/opt/s/fullstack_template/static/node_modules/@babel/parser/lib/index.js:3594:46)\\n    at _class.jsxParseOpeningElementAfterName (/opt/s/fullstack_template/static/node_modules/@babel/parser/lib/index.js:3614:30)\\n    at _class.jsxParseOpeningElementAt (/opt/s/fullstack_template/static/node_modules/@babel/parser/lib/index.js:3607:19)\\n    at _class.jsxParseElementAt (/opt/s/fullstack_template/static/node_modules/@babel/parser/lib/index.js:3639:33)\\n    at _class.jsxParseElement (/opt/s/fullstack_template/static/node_modules/@babel/parser/lib/index.js:3708:19)\\n    at _class.parseExprAtom (/opt/s/fullstack_template/static/node_modules/@babel/parser/lib/index.js:3715:21)\\n    at _class.parseExprSubscripts (/opt/s/fullstack_template/static/node_modules/@babel/parser/lib/index.js:6006:21)\\n    at _class.parseMaybeUnary (/opt/s/fullstack_template/static/node_modules/@babel/parser/lib/index.js:5985:21)\\n    at _class.parseExprOps (/opt/s/fullstack_template/static/node_modules/@babel/parser/lib/index.js:5894:21)\\n    at _class.parseMaybeConditional (/opt/s/fullstack_template/static/node_modules/@babel/parser/lib/index.js:5866:21)\\n    at _class.parseMaybeAssign (/opt/s/fullstack_template/static/node_modules/@babel/parser/lib/index.js:5813:21)\\n    at _class.parseParenAndDistinguishExpression (/opt/s/fullstack_template/static/node_modules/@babel/parser/lib/index.js:6572:28)\\n    at _class.parseExprAtom (/opt/s/fullstack_template/static/node_modules/@babel/parser/lib/index.js:6374:21)\\n    at _class.parseExprAtom (/opt/s/fullstack_template/static/node_modules/@babel/parser/lib/index.js:3717:52)\\n    at _class.parseExprSubscripts (/opt/s/fullstack_template/static/node_modules/@babel/parser/lib/index.js:6006:21)\\n    at _class.parseMaybeUnary (/opt/s/fullstack_template/static/node_modules/@babel/parser/lib/index.js:5985:21)\\n    at _class.parseExprOps (/opt/s/fullstack_template/static/node_modules/@babel/parser/lib/index.js:5894:21)\\n    at _class.parseMaybeConditional (/opt/s/fullstack_template/static/node_modules/@babel/parser/lib/index.js:5866:21)\\n    at _class.parseMaybeAssign (/opt/s/fullstack_template/static/node_modules/@babel/parser/lib/index.js:5813:21)\\n    at _class.parseExpression (/opt/s/fullstack_template/static/node_modules/@babel/parser/lib/index.js:5766:21)\\n    at _class.parseReturnStatement (/opt/s/fullstack_template/static/node_modules/@babel/parser/lib/index.js:7607:28)\\n    at _class.parseStatementContent (/opt/s/fullstack_template/static/node_modules/@babel/parser/lib/index.js:7287:21)\\n    at _class.parseStatement (/opt/s/fullstack_template/static/node_modules/@babel/parser/lib/index.js:7253:17)\\n    at _class.parseBlockOrModuleBlockBody (/opt/s/fullstack_template/static/node_modules/@babel/parser/lib/index.js:7805:23)\\n    at _class.parseBlockBody (/opt/s/fullstack_template/static/node_modules/@babel/parser/lib/index.js:7792:10)\\n    at _class.parseBlock (/opt/s/fullstack_template/static/node_modules/@babel/parser/lib/index.js:7781:10)\\n    at _class.parseFunctionBody (/opt/s/fullstack_template/static/node_modules/@babel/parser/lib/index.js:7026:24)\\n    at _class.parseFunctionBodyAndFinish (/opt/s/fullstack_template/static/node_modules/@babel/parser/lib/index.js:7008:10)\\n    at _class.parseMethod (/opt/s/fullstack_template/static/node_modules/@babel/parser/lib/index.js:6950:10)\\n    at _class.pushClassMethod (/opt/s/fullstack_template/static/node_modules/@babel/parser/lib/index.js:8184:30)\\n    at _class.parseClassMemberWithIsStatic (/opt/s/fullstack_template/static/node_modules/@babel/parser/lib/index.js:8109:12)\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zb2ZhU2xpZGVyLmpzLmpzIiwic291cmNlcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./js/sofaSlider.js\n");

/***/ })

}]);