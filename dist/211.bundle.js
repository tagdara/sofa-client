(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[211],{

/***/ "./src/region/regionBuild.js":
/*!***********************************!*\
  !*** ./src/region/regionBuild.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ \"./node_modules/@material-ui/core/styles/index.js\");\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Button */ \"./node_modules/@material-ui/core/Button/index.js\");\n/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Divider */ \"./node_modules/@material-ui/core/Divider/index.js\");\n/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Avatar */ \"./node_modules/@material-ui/core/Avatar/index.js\");\n/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Checkbox */ \"./node_modules/@material-ui/core/Checkbox/index.js\");\n/* harmony import */ var _material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/DialogActions */ \"./node_modules/@material-ui/core/DialogActions/index.js\");\n/* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/DialogContent */ \"./node_modules/@material-ui/core/DialogContent/index.js\");\n/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _material_ui_core_DialogContentText__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/DialogContentText */ \"./node_modules/@material-ui/core/DialogContentText/index.js\");\n/* harmony import */ var _material_ui_core_DialogContentText__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogContentText__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/IconButton */ \"./node_modules/@material-ui/core/IconButton/index.js\");\n/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _material_ui_icons_Tune__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/icons/Tune */ \"./node_modules/@material-ui/icons/Tune.js\");\n/* harmony import */ var _material_ui_icons_Tune__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Tune__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var _material_ui_icons_Edit__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/icons/Edit */ \"./node_modules/@material-ui/icons/Edit.js\");\n/* harmony import */ var _material_ui_icons_Edit__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Edit__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var _material_ui_icons_Place__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/icons/Place */ \"./node_modules/@material-ui/icons/Place.js\");\n/* harmony import */ var _material_ui_icons_Place__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Place__WEBPACK_IMPORTED_MODULE_13__);\n/* harmony import */ var _material_ui_icons_Check__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/icons/Check */ \"./node_modules/@material-ui/icons/Check.js\");\n/* harmony import */ var _material_ui_icons_Check__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Check__WEBPACK_IMPORTED_MODULE_14__);\n/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @material-ui/icons/Close */ \"./node_modules/@material-ui/icons/Close.js\");\n/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_15__);\n/* harmony import */ var _regionList__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./regionList */ \"./src/region/regionList.js\");\n/* harmony import */ var _areaSelect__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./areaSelect */ \"./src/region/areaSelect.js\");\n/* harmony import */ var _sofaDialog__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../sofaDialog */ \"./src/sofaDialog.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar styles = function styles(theme) {\n  return {\n    dialogActions: {\n      paddingBottom: \"env(safe-area-inset-bottom)\"\n    }\n  };\n};\n\nvar RegionSelect =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(RegionSelect, _React$Component);\n\n  function RegionSelect(props) {\n    var _this;\n\n    _classCallCheck(this, RegionSelect);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(RegionSelect).call(this, props));\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"handleSave\", function (e) {\n      _this.groupSaveChanges();\n\n      _this.props.close(e);\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"saveRegions\", function () {\n      fetch('/config/regions', {\n        method: 'post',\n        headers: {\n          'Accept': 'application/json, text/plain, */*',\n          'Content-Type': 'application/json'\n        },\n        body: JSON.stringify(_this.state.regions)\n      }).then(function (res) {\n        return console.log(res);\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"groupSaveChanges\", function () {\n      fetch('/config/regions', {\n        method: 'post',\n        headers: {\n          'Accept': 'application/json, text/plain, */*',\n          'Content-Type': 'application/json'\n        },\n        body: JSON.stringify(_this.state.regions)\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"updateList\", function (regionname, roomlist) {\n      var curmap = _this.state.regions;\n      curmap[regionname]['rooms'] = roomlist;\n\n      _this.setState({\n        regions: curmap\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"handleObjectBrowser\", function () {\n      _this.setState({\n        roomBrowser: true\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"handleCloseObjectBrowser\", function () {\n      _this.setState({\n        roomBrowser: false\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"handleCloseRoomBrowser\", function () {\n      _this.setState({\n        roomBrowser: false\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"handleClick\", function (name) {\n      if (!_this.state.adding) {\n        if (!_this.state.regions[name].hasOwnProperty('rooms')) {\n          var srooms = [];\n        } else {\n          var srooms = _this.state.regions[name]['rooms'];\n        }\n\n        _this.setState({\n          selectedRegion: name,\n          selectedRooms: srooms,\n          roomBrowser: true\n        });\n      }\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"handleRegionEdit\", function (region) {\n      console.log('hre', region);\n\n      _this.setState({\n        roomBrowser: true,\n        selectedRegion: region\n      });\n    });\n\n    _this.state = {\n      edit: false,\n      add: false,\n      selectedName: '',\n      selectedDevices: [],\n      areamap: {},\n      regions: {},\n      roomBrowser: false,\n      objectBrowser: false\n    };\n    return _this;\n  }\n\n  _createClass(RegionSelect, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      var _this2 = this;\n\n      fetch('/config/regions').then(function (result) {\n        return result.json();\n      }).then(function (result) {\n        return _this2.setState({\n          regions: result\n        });\n      });\n      fetch('/config/areamap').then(function (result) {\n        return result.json();\n      }).then(function (result) {\n        return _this2.setState({\n          areamap: result\n        });\n      });\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this3 = this;\n\n      var classes = this.props.classes;\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_sofaDialog__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n        open: this.props.open,\n        close: this.props.close,\n        title: \"Regions\"\n      }, this.state.roomBrowser ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_areaSelect__WEBPACK_IMPORTED_MODULE_17__[\"default\"], {\n        name: this.state.selectedRegion,\n        close: this.handleCloseRoomBrowser,\n        devices: this.props.devices,\n        propertiesFromDevices: this.props.propertiesFromDevices\n      }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_regionList__WEBPACK_IMPORTED_MODULE_16__[\"default\"], {\n        edit: this.state.edit,\n        add: this.state.add,\n        doneEditing: this.doneEditing,\n        handleRegionEdit: this.handleRegionEdit,\n        handleRegionSelect: this.props.handleRegionSelect\n      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_4___default.a, null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_7___default.a, {\n        className: classes.dialogActions\n      }, !this.state.edit && !this.state.add ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3___default.a, {\n        onClick: function onClick(e) {\n          return _this3.setState({\n            add: true\n          });\n        },\n        color: \"primary\",\n        autoFocus: true\n      }, \"ADD\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3___default.a, {\n        onClick: function onClick(e) {\n          return _this3.setState({\n            edit: true\n          });\n        },\n        color: \"primary\",\n        autoFocus: true\n      }, \"EDIT\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3___default.a, {\n        onClick: function onClick(e) {\n          return _this3.handleSave(e);\n        },\n        color: \"primary\",\n        autoFocus: true\n      }, \"OK\")) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3___default.a, {\n        onClick: function onClick(e) {\n          return _this3.setState({\n            add: false,\n            edit: false\n          });\n        },\n        color: \"primary\",\n        autoFocus: true\n      }, \"DONE\")));\n    }\n  }]);\n\n  return RegionSelect;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\nRegionSelect.propTypes = {\n  classes: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__[\"withStyles\"])(styles)(RegionSelect));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcmVnaW9uL3JlZ2lvbkJ1aWxkLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL3JlZ2lvbi9yZWdpb25CdWlsZC5qcz9kYmZlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyB3aXRoU3R5bGVzIH0gZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvc3R5bGVzJztcblxuaW1wb3J0IEJ1dHRvbiBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9CdXR0b24nO1xuaW1wb3J0IERpdmlkZXIgZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvRGl2aWRlcic7XG5pbXBvcnQgQXZhdGFyIGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL0F2YXRhcic7XG5pbXBvcnQgQ2hlY2tib3ggZnJvbSAgJ0BtYXRlcmlhbC11aS9jb3JlL0NoZWNrYm94JztcblxuaW1wb3J0IERpYWxvZ0FjdGlvbnMgZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvRGlhbG9nQWN0aW9ucyc7XG5pbXBvcnQgRGlhbG9nQ29udGVudCBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9EaWFsb2dDb250ZW50JztcbmltcG9ydCBEaWFsb2dDb250ZW50VGV4dCBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9EaWFsb2dDb250ZW50VGV4dCc7XG5pbXBvcnQgSWNvbkJ1dHRvbiBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9JY29uQnV0dG9uJztcbmltcG9ydCBUdW5lSWNvbiBmcm9tICdAbWF0ZXJpYWwtdWkvaWNvbnMvVHVuZSc7XG5pbXBvcnQgRWRpdEljb24gZnJvbSAnQG1hdGVyaWFsLXVpL2ljb25zL0VkaXQnO1xuaW1wb3J0IFBsYWNlSWNvbiBmcm9tICdAbWF0ZXJpYWwtdWkvaWNvbnMvUGxhY2UnO1xuaW1wb3J0IENoZWNrSWNvbiBmcm9tICdAbWF0ZXJpYWwtdWkvaWNvbnMvQ2hlY2snO1xuaW1wb3J0IENsb3NlSWNvbiBmcm9tICdAbWF0ZXJpYWwtdWkvaWNvbnMvQ2xvc2UnO1xuXG5pbXBvcnQgUmVnaW9uTGlzdCBmcm9tIFwiLi9yZWdpb25MaXN0XCJcbmltcG9ydCBBcmVhU2VsZWN0IGZyb20gXCIuL2FyZWFTZWxlY3RcIlxuaW1wb3J0IFNvZmFEaWFsb2cgZnJvbSBcIi4uL3NvZmFEaWFsb2dcIlxuXG5jb25zdCBzdHlsZXMgPSB0aGVtZSA9PiAoe1xuICAgICAgICBcbiAgICBkaWFsb2dBY3Rpb25zOiB7XG4gICAgICAgIHBhZGRpbmdCb3R0b206IFwiZW52KHNhZmUtYXJlYS1pbnNldC1ib3R0b20pXCIsXG4gICAgfSxcbn0pO1xuXG5jbGFzcyBSZWdpb25TZWxlY3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgZWRpdDogZmFsc2UsXG4gICAgICAgICAgICBhZGQ6IGZhbHNlLFxuICAgICAgICAgICAgc2VsZWN0ZWROYW1lOiAnJyxcbiAgICAgICAgICAgIHNlbGVjdGVkRGV2aWNlczogW10sXG4gICAgICAgICAgICBhcmVhbWFwOiB7fSxcbiAgICAgICAgICAgIHJlZ2lvbnM6IHt9LFxuICAgICAgICAgICAgcm9vbUJyb3dzZXI6IGZhbHNlLFxuICAgICAgICAgICAgb2JqZWN0QnJvd3NlcjogZmFsc2UsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBcbiAgICBoYW5kbGVTYXZlID0gKGUpID0+IHtcbiAgICAgICAgdGhpcy5ncm91cFNhdmVDaGFuZ2VzKClcbiAgICAgICAgdGhpcy5wcm9wcy5jbG9zZShlKVxuICAgIH1cbiAgICBcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgXHQgICAgZmV0Y2goJy9jb25maWcvcmVnaW9ucycpXG4gXHRcdCAgICAudGhlbihyZXN1bHQ9PnJlc3VsdC5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihyZXN1bHQ9PnRoaXMuc2V0U3RhdGUoe3JlZ2lvbnM6cmVzdWx0fSkpO1xuICBcdCAgICBmZXRjaCgnL2NvbmZpZy9hcmVhbWFwJylcbiBcdFx0ICAgIC50aGVuKHJlc3VsdD0+cmVzdWx0Lmpzb24oKSlcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdD0+dGhpcy5zZXRTdGF0ZSh7YXJlYW1hcDpyZXN1bHR9KSk7XG5cbiAgICB9XG5cbiAgICBzYXZlUmVnaW9ucyA9ICgpID0+IHtcbiAgICAgICAgZmV0Y2goJy9jb25maWcvcmVnaW9ucycsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyxcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0ZS5yZWdpb25zKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlcz0+Y29uc29sZS5sb2cocmVzKSlcbiAgICB9XG5cbiAgICBcbiAgICBncm91cFNhdmVDaGFuZ2VzID0gKCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgZmV0Y2goJy9jb25maWcvcmVnaW9ucycsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyxcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0ZS5yZWdpb25zKVxuICAgICAgICAgICAgfSlcblxuICAgIH1cbiAgICBcbiAgICB1cGRhdGVMaXN0ID0gKHJlZ2lvbm5hbWUsIHJvb21saXN0KSA9PiB7XG4gICAgICAgIHZhciBjdXJtYXA9dGhpcy5zdGF0ZS5yZWdpb25zXG4gICAgICAgIGN1cm1hcFtyZWdpb25uYW1lXVsncm9vbXMnXT1yb29tbGlzdFxuICAgICAgICB0aGlzLnNldFN0YXRlKHtyZWdpb25zOmN1cm1hcH0pXG4gICAgfVxuXG5cbiAgICBoYW5kbGVPYmplY3RCcm93c2VyID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgcm9vbUJyb3dzZXI6IHRydWUgfSk7XG4gICAgfTtcblxuICAgIGhhbmRsZUNsb3NlT2JqZWN0QnJvd3NlciA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHJvb21Ccm93c2VyOiBmYWxzZSB9KTtcbiAgICB9O1xuICAgIFxuICAgIGhhbmRsZUNsb3NlUm9vbUJyb3dzZXIgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyByb29tQnJvd3NlcjogZmFsc2UgfSk7XG4gICAgfTtcbiAgICBcbiAgICBoYW5kbGVDbGljayA9IChuYW1lKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5hZGRpbmcpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zdGF0ZS5yZWdpb25zW25hbWVdLmhhc093blByb3BlcnR5KCdyb29tcycpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNyb29tcz1bXVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgc3Jvb21zPXRoaXMuc3RhdGUucmVnaW9uc1tuYW1lXVsncm9vbXMnXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSggeyBzZWxlY3RlZFJlZ2lvbjogbmFtZSwgc2VsZWN0ZWRSb29tczpzcm9vbXMsIHJvb21Ccm93c2VyOiB0cnVlfSApXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgaGFuZGxlUmVnaW9uRWRpdCA9IChyZWdpb24pID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2hyZScscmVnaW9uKVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtyb29tQnJvd3Nlcjp0cnVlLCBzZWxlY3RlZFJlZ2lvbjogcmVnaW9ufSlcbiAgICB9XG5cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHsgY2xhc3NlcyAgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFNvZmFEaWFsb2cgb3Blbj17dGhpcy5wcm9wcy5vcGVufSBjbG9zZT17dGhpcy5wcm9wcy5jbG9zZX0gdGl0bGU9XCJSZWdpb25zXCIgPlxuICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5yb29tQnJvd3NlciA/XG4gICAgICAgICAgICAgICAgICAgIDxBcmVhU2VsZWN0IG5hbWU9e3RoaXMuc3RhdGUuc2VsZWN0ZWRSZWdpb259IGNsb3NlPXt0aGlzLmhhbmRsZUNsb3NlUm9vbUJyb3dzZXJ9IGRldmljZXM9e3RoaXMucHJvcHMuZGV2aWNlc30gcHJvcGVydGllc0Zyb21EZXZpY2VzPXt0aGlzLnByb3BzLnByb3BlcnRpZXNGcm9tRGV2aWNlc30gLz5cbiAgICAgICAgICAgICAgICA6IFxuICAgICAgICAgICAgICAgICAgICA8UmVnaW9uTGlzdCBlZGl0PXt0aGlzLnN0YXRlLmVkaXR9IGFkZD17dGhpcy5zdGF0ZS5hZGR9IGRvbmVFZGl0aW5nPXt0aGlzLmRvbmVFZGl0aW5nfSBoYW5kbGVSZWdpb25FZGl0PXt0aGlzLmhhbmRsZVJlZ2lvbkVkaXR9IGhhbmRsZVJlZ2lvblNlbGVjdD17dGhpcy5wcm9wcy5oYW5kbGVSZWdpb25TZWxlY3R9IC8+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDxEaXZpZGVyIC8+XG4gICAgICAgICAgICAgICAgPERpYWxvZ0FjdGlvbnMgY2xhc3NOYW1lPXtjbGFzc2VzLmRpYWxvZ0FjdGlvbnN9ID5cbiAgICAgICAgICAgICAgICAgICAgeyAhdGhpcy5zdGF0ZS5lZGl0ICYmICF0aGlzLnN0YXRlLmFkZCA/XG4gICAgICAgICAgICAgICAgICAgICAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXsoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7IGFkZDogdHJ1ZX0pIH0gY29sb3I9XCJwcmltYXJ5XCIgYXV0b0ZvY3VzPkFERDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17KGUpID0+IHRoaXMuc2V0U3RhdGUoeyBlZGl0OiB0cnVlfSkgfSBjb2xvcj1cInByaW1hcnlcIiBhdXRvRm9jdXM+RURJVDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17KGUpID0+IHRoaXMuaGFuZGxlU2F2ZShlKX0gY29sb3I9XCJwcmltYXJ5XCIgYXV0b0ZvY3VzPk9LPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICAgICAgICAgICAgICAgICA6IFxuICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXsoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7IGFkZDogZmFsc2UsIGVkaXQ6IGZhbHNlfSkgfSBjb2xvcj1cInByaW1hcnlcIiBhdXRvRm9jdXM+RE9ORTwvQnV0dG9uPiBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDwvRGlhbG9nQWN0aW9ucz5cbiAgICAgICAgICAgIDwvU29mYURpYWxvZz5cbiAgICAgICAgKVxuICAgIH1cblxufVxuXG5SZWdpb25TZWxlY3QucHJvcFR5cGVzID0ge1xuICAgIGNsYXNzZXM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZXMoc3R5bGVzKShSZWdpb25TZWxlY3QpO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQURBO0FBRkE7QUFBQTtBQUNBO0FBTUE7Ozs7O0FBRUE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFGQTtBQWlCQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBcEJBO0FBZ0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBTkE7QUFRQTtBQUFBO0FBQ0E7QUFDQTtBQTFDQTtBQThDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQU5BO0FBU0E7QUFDQTtBQXhEQTtBQTBEQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBOURBO0FBaUVBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFuRUE7QUFxRUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQXZFQTtBQXlFQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBM0VBO0FBNkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQXRGQTtBQXdGQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBeEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJBO0FBSEE7QUFhQTtBQUNBOzs7QUFPQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBRUE7OztBQWdFQTtBQUFBO0FBQ0E7QUFEQTtBQUlBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0E7Ozs7QUF4SEE7QUFDQTtBQTJIQTtBQUNBO0FBREE7QUFJQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/region/regionBuild.js\n");

/***/ })

}]);