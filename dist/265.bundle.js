(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[265],{

/***/ "./src/AutomationColumn.js":
/*!*********************************!*\
  !*** ./src/AutomationColumn.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/styles */ \"./node_modules/@material-ui/styles/index.es.js\");\n/* harmony import */ var _DataContext_withData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DataContext/withData */ \"./src/DataContext/withData.js\");\n/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-loadable */ \"./node_modules/react-loadable/lib/index.js\");\n/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_loadable__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Button */ \"./node_modules/@material-ui/core/Button/index.js\");\n/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Grid */ \"./node_modules/@material-ui/core/Grid/index.js\");\n/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Divider */ \"./node_modules/@material-ui/core/Divider/index.js\");\n/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Typography */ \"./node_modules/@material-ui/core/Typography/index.js\");\n/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/IconButton */ \"./node_modules/@material-ui/core/IconButton/index.js\");\n/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/ListItem */ \"./node_modules/@material-ui/core/ListItem/index.js\");\n/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/ListItemText */ \"./node_modules/@material-ui/core/ListItemText/index.js\");\n/* harmony import */ var _material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _automation_automationAction__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./automation/automationAction */ \"./src/automation/automationAction.js\");\n/* harmony import */ var _automation_automationCondition__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./automation/automationCondition */ \"./src/automation/automationCondition.js\");\n/* harmony import */ var _automation_automationTrigger__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./automation/automationTrigger */ \"./src/automation/automationTrigger.js\");\n/* harmony import */ var _automation_automationSchedule__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./automation/automationSchedule */ \"./src/automation/automationSchedule.js\");\n/* harmony import */ var _material_ui_icons_Add__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @material-ui/icons/Add */ \"./node_modules/@material-ui/icons/Add.js\");\n/* harmony import */ var _material_ui_icons_Add__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Add__WEBPACK_IMPORTED_MODULE_15__);\n/* harmony import */ var _material_ui_icons_Remove__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @material-ui/icons/Remove */ \"./node_modules/@material-ui/icons/Remove.js\");\n/* harmony import */ var _material_ui_icons_Remove__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Remove__WEBPACK_IMPORTED_MODULE_16__);\n/* harmony import */ var _material_ui_icons_UnfoldMore__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @material-ui/icons/UnfoldMore */ \"./node_modules/@material-ui/icons/UnfoldMore.js\");\n/* harmony import */ var _material_ui_icons_UnfoldMore__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_UnfoldMore__WEBPACK_IMPORTED_MODULE_17__);\n/* harmony import */ var _GridItem__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./GridItem */ \"./src/GridItem.js\");\n/* harmony import */ var _GridPage__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./GridPage */ \"./src/GridPage.js\");\n/* harmony import */ var _GridBreak__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./GridBreak */ \"./src/GridBreak.js\");\n/* harmony import */ var _PlaceholderCard__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./PlaceholderCard */ \"./src/PlaceholderCard.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar useStyles = Object(_material_ui_styles__WEBPACK_IMPORTED_MODULE_1__[\"makeStyles\"])({\n  dialogActions: {\n    paddingBottom: \"env(safe-area-inset-bottom)\"\n  },\n  listDialogContent: {\n    padding: 0\n  }\n});\n\nfunction cardLoading(props) {\n  if (props.error) {\n    console.log(props);\n    return null;\n  } else if (props.pastDelay) {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PlaceholderCard__WEBPACK_IMPORTED_MODULE_21__[\"default\"], null);\n  } else {\n    return null;\n  }\n}\n\nfunction AutomationColumn(props) {\n  var classes = useStyles();\n\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])([]),\n      _useState2 = _slicedToArray(_useState, 2),\n      actions = _useState2[0],\n      setActions = _useState2[1];\n\n  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false),\n      _useState4 = _slicedToArray(_useState3, 2),\n      edit = _useState4[0],\n      setEdit = _useState4[1];\n\n  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false),\n      _useState6 = _slicedToArray(_useState5, 2),\n      reorder = _useState6[0],\n      setReorder = _useState6[1];\n\n  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false),\n      _useState8 = _slicedToArray(_useState7, 2),\n      remove = _useState8[0],\n      setRemove = _useState8[1];\n\n  var _useState9 = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(null),\n      _useState10 = _slicedToArray(_useState9, 2),\n      module = _useState10[0],\n      setModule = _useState10[1];\n\n  var AutomationProperty = react_loadable__WEBPACK_IMPORTED_MODULE_3___default()({\n    loader: function loader() {\n      return __webpack_require__(\"./src/automation lazy recursive ^\\\\.\\\\/.*$\")(\"./\" + props.itemModule);\n    },\n    loading: cardLoading\n  });\n\n  function getControllerProperties(item) {\n    if (item.hasOwnProperty('propertyName')) {\n      return props.controllerProperties[item.controller][item.propertyName];\n    }\n\n    return {};\n  }\n\n  function getActionValues(controller, command) {\n    return props.directives[controller][command];\n  }\n\n  function getActionValue(controller, command) {\n    var payload = props.directives[controller][command];\n\n    for (var prop in payload) {\n      if (payload[prop].hasOwnProperty('value')) {\n        return prop;\n      }\n    }\n\n    return '';\n  }\n\n  function deleteItem(index) {\n    console.log('deleting item', index, 'from', props.name);\n    var newitems = props.items;\n    newitems.splice(index, 1);\n    props.save(props.itemtype, newitems);\n  }\n\n  function save(index, item) {\n    var newitems = props.items;\n    newitems[index] = item;\n    props.save(props.itemtype, newitems);\n  }\n\n  function moveUp(index) {\n    if (index - 1 >= 0) {\n      var newitems = props.items;\n      var element = newitems[index];\n      newitems.splice(index, 1);\n      newitems.splice(index - 1, 0, element);\n      props.save(props.itemtype, newitems);\n    }\n  }\n\n  function moveDown(index) {\n    if (index + 1 <= props.items.length) {\n      var newitems = props.items;\n      var element = newitems[index];\n      newitems.splice(index, 1);\n      newitems.splice(index + 1, 0, element);\n      props.save(props.itemtype, newitems);\n    }\n  }\n\n  function addItem() {\n    setRemove(false);\n    setReorder(false);\n    props.setReturn('AutomationLayout', {\n      'name': props.automationName,\n      'type': props.itemtype\n    });\n    props.setBack('AutomationLayout', {\n      'name': props.automationName\n    });\n    props.setLayoutCard(props.selector);\n  }\n\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_GridPage__WEBPACK_IMPORTED_MODULE_19__[\"default\"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_GridBreak__WEBPACK_IMPORTED_MODULE_20__[\"default\"], {\n    label: props.name,\n    size: \"h6\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_8___default.a, {\n    onClick: function onClick() {\n      return addItem();\n    },\n    className: classes.button\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Add__WEBPACK_IMPORTED_MODULE_15___default.a, {\n    fontSize: \"small\"\n  })), Object.keys(props.items).length > 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_8___default.a, {\n    onClick: function onClick() {\n      setRemove(!remove);\n      setReorder(false);\n    },\n    className: classes.button\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Remove__WEBPACK_IMPORTED_MODULE_16___default.a, {\n    fontSize: \"small\"\n  })), props.itemtype != 'trigger' && Object.keys(props.items).length > 1 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_8___default.a, {\n    onClick: function onClick() {\n      setRemove(false);\n      setReorder(!reorder);\n    },\n    className: classes.button\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_UnfoldMore__WEBPACK_IMPORTED_MODULE_17___default.a, {\n    fontSize: \"small\"\n  }))), Object.keys(props.items).length > 0 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, props.items.map(function (item, index) {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(AutomationProperty, {\n      key: props.itemtype + index,\n      moveUp: moveUp,\n      moveDown: moveDown,\n      save: save,\n      remove: remove,\n      reorder: reorder,\n      delete: deleteItem,\n      index: index,\n      item: item,\n      device: props.deviceByEndpointId(item.endpointId),\n      name: props.deviceByEndpointId(item.endpointId).friendlyName,\n      directives: props.directives,\n      controllerProperties: getControllerProperties(item),\n      wide: true\n    });\n  })) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_GridItem__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n    elevation: 0,\n    wide: true\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_9___default.a, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_10___default.a, {\n    primary: \"There are no \" + props.name + \" defined.\"\n  }))));\n}\n\n;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_DataContext_withData__WEBPACK_IMPORTED_MODULE_2__[\"withData\"])(AutomationColumn));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvQXV0b21hdGlvbkNvbHVtbi5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9BdXRvbWF0aW9uQ29sdW1uLmpzP2Q1OTEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBtYWtlU3R5bGVzIH0gZnJvbSAnQG1hdGVyaWFsLXVpL3N0eWxlcyc7XG5pbXBvcnQgeyB3aXRoRGF0YSB9IGZyb20gJy4vRGF0YUNvbnRleHQvd2l0aERhdGEnO1xuXG5pbXBvcnQgTG9hZGFibGUgZnJvbSAncmVhY3QtbG9hZGFibGUnO1xuaW1wb3J0IEJ1dHRvbiBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9CdXR0b24nO1xuaW1wb3J0IEdyaWQgZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvR3JpZCc7XG5pbXBvcnQgRGl2aWRlciBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9EaXZpZGVyJztcbmltcG9ydCBUeXBvZ3JhcGh5IGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL1R5cG9ncmFwaHknO1xuaW1wb3J0IEljb25CdXR0b24gZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvSWNvbkJ1dHRvbic7XG5pbXBvcnQgTGlzdEl0ZW0gZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvTGlzdEl0ZW0nO1xuaW1wb3J0IExpc3RJdGVtVGV4dCBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9MaXN0SXRlbVRleHQnO1xuXG5pbXBvcnQgQXV0b21hdGlvbkFjdGlvbiBmcm9tIFwiLi9hdXRvbWF0aW9uL2F1dG9tYXRpb25BY3Rpb25cIlxuaW1wb3J0IEF1dG9tYXRpb25Db25kaXRpb24gZnJvbSBcIi4vYXV0b21hdGlvbi9hdXRvbWF0aW9uQ29uZGl0aW9uXCJcbmltcG9ydCBBdXRvbWF0aW9uVHJpZ2dlciBmcm9tIFwiLi9hdXRvbWF0aW9uL2F1dG9tYXRpb25UcmlnZ2VyXCJcbmltcG9ydCBBdXRvbWF0aW9uU2NoZWR1bGUgZnJvbSBcIi4vYXV0b21hdGlvbi9hdXRvbWF0aW9uU2NoZWR1bGVcIlxuXG5pbXBvcnQgQWRkSWNvbiBmcm9tICdAbWF0ZXJpYWwtdWkvaWNvbnMvQWRkJztcbmltcG9ydCBSZW1vdmVJY29uIGZyb20gJ0BtYXRlcmlhbC11aS9pY29ucy9SZW1vdmUnO1xuaW1wb3J0IFVuZm9sZE1vcmVJY29uIGZyb20gJ0BtYXRlcmlhbC11aS9pY29ucy9VbmZvbGRNb3JlJztcblxuaW1wb3J0IEdyaWRJdGVtIGZyb20gJy4vR3JpZEl0ZW0nO1xuaW1wb3J0IEdyaWRQYWdlIGZyb20gJy4vR3JpZFBhZ2UnO1xuaW1wb3J0IEdyaWRCcmVhayBmcm9tICcuL0dyaWRCcmVhayc7XG5pbXBvcnQgUGxhY2Vob2xkZXJDYXJkIGZyb20gJy4vUGxhY2Vob2xkZXJDYXJkJztcblxuY29uc3QgdXNlU3R5bGVzID0gbWFrZVN0eWxlcyh7XG4gICAgXG4gICAgZGlhbG9nQWN0aW9uczoge1xuICAgICAgICBwYWRkaW5nQm90dG9tOiBcImVudihzYWZlLWFyZWEtaW5zZXQtYm90dG9tKVwiLFxuICAgIH0sXG4gICAgbGlzdERpYWxvZ0NvbnRlbnQ6IHtcbiAgICAgICAgcGFkZGluZzogMCxcbiAgICB9XG5cbn0pO1xuXG5mdW5jdGlvbiBjYXJkTG9hZGluZyhwcm9wcykge1xuICAgIFxuICAgIGlmIChwcm9wcy5lcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhwcm9wcylcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIGlmIChwcm9wcy5wYXN0RGVsYXkpIHtcbiAgICAgICAgcmV0dXJuIDxQbGFjZWhvbGRlckNhcmQgLz47XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBBdXRvbWF0aW9uQ29sdW1uKHByb3BzKSB7XG5cbiAgICBjb25zdCBjbGFzc2VzID0gdXNlU3R5bGVzKCk7XG4gICAgY29uc3QgW2FjdGlvbnMsIHNldEFjdGlvbnNdID0gdXNlU3RhdGUoW10pXG4gICAgY29uc3QgW2VkaXQsIHNldEVkaXRdID0gdXNlU3RhdGUoZmFsc2UpXG4gICAgY29uc3QgW3Jlb3JkZXIsIHNldFJlb3JkZXJdID0gdXNlU3RhdGUoZmFsc2UpXG4gICAgY29uc3QgW3JlbW92ZSwgc2V0UmVtb3ZlXSA9IHVzZVN0YXRlKGZhbHNlKVxuICAgIGNvbnN0IFttb2R1bGUsIHNldE1vZHVsZV0gPSB1c2VTdGF0ZShudWxsKVxuXG4gICAgY29uc3QgQXV0b21hdGlvblByb3BlcnR5ID0gTG9hZGFibGUoeyBsb2FkZXI6ICgpID0+IGltcG9ydCgnLi9hdXRvbWF0aW9uLycrcHJvcHMuaXRlbU1vZHVsZSksIGxvYWRpbmc6IGNhcmRMb2FkaW5nLH0pO1xuXG4gICAgZnVuY3Rpb24gZ2V0Q29udHJvbGxlclByb3BlcnRpZXMoaXRlbSkge1xuICAgICAgICBpZiAoaXRlbS5oYXNPd25Qcm9wZXJ0eSgncHJvcGVydHlOYW1lJykpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5jb250cm9sbGVyUHJvcGVydGllc1tpdGVtLmNvbnRyb2xsZXJdW2l0ZW0ucHJvcGVydHlOYW1lXVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7fVxuICAgIH0gICAgXG4gICAgXG4gICAgZnVuY3Rpb24gZ2V0QWN0aW9uVmFsdWVzKGNvbnRyb2xsZXIsIGNvbW1hbmQpIHtcblxuICAgICAgICByZXR1cm4gcHJvcHMuZGlyZWN0aXZlc1tjb250cm9sbGVyXVtjb21tYW5kXVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEFjdGlvblZhbHVlKGNvbnRyb2xsZXIsIGNvbW1hbmQpIHtcblxuICAgICAgICB2YXIgcGF5bG9hZD1wcm9wcy5kaXJlY3RpdmVzW2NvbnRyb2xsZXJdW2NvbW1hbmRdXG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gcGF5bG9hZCkge1xuICAgICAgICAgICAgaWYgKHBheWxvYWRbcHJvcF0uaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcFxuICAgICAgICAgICAgfVxuICAgICAgICB9IFxuICAgICAgICByZXR1cm4gJydcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gZGVsZXRlSXRlbShpbmRleCkge1xuICAgICAgICBjb25zb2xlLmxvZygnZGVsZXRpbmcgaXRlbScsaW5kZXgsJ2Zyb20nLHByb3BzLm5hbWUpXG4gICAgICAgIHZhciBuZXdpdGVtcz1wcm9wcy5pdGVtc1xuICAgICAgICBuZXdpdGVtcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBwcm9wcy5zYXZlKHByb3BzLml0ZW10eXBlLG5ld2l0ZW1zKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNhdmUoaW5kZXgsIGl0ZW0pIHtcbiAgICAgICAgdmFyIG5ld2l0ZW1zPXByb3BzLml0ZW1zXG4gICAgICAgIG5ld2l0ZW1zW2luZGV4XT1pdGVtXG4gICAgICAgIHByb3BzLnNhdmUocHJvcHMuaXRlbXR5cGUsIG5ld2l0ZW1zKVxuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBtb3ZlVXAoaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4LTE+PTApIHtcbiAgICAgICAgICAgIHZhciBuZXdpdGVtcz1wcm9wcy5pdGVtc1xuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXdpdGVtc1tpbmRleF07XG4gICAgICAgICAgICBuZXdpdGVtcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgbmV3aXRlbXMuc3BsaWNlKGluZGV4LTEsIDAsIGVsZW1lbnQpO1xuICAgICAgICAgICAgcHJvcHMuc2F2ZShwcm9wcy5pdGVtdHlwZSwgbmV3aXRlbXMpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb3ZlRG93bihpbmRleCkge1xuICAgICAgICBpZiAoaW5kZXgrMTw9cHJvcHMuaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB2YXIgbmV3aXRlbXM9cHJvcHMuaXRlbXNcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gbmV3aXRlbXNbaW5kZXhdO1xuICAgICAgICAgICAgbmV3aXRlbXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIG5ld2l0ZW1zLnNwbGljZShpbmRleCsxLCAwLCBlbGVtZW50KTtcbiAgICAgICAgICAgIHByb3BzLnNhdmUocHJvcHMuaXRlbXR5cGUsIG5ld2l0ZW1zKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkSXRlbSgpIHtcbiAgICAgICAgc2V0UmVtb3ZlKGZhbHNlKTsgXG4gICAgICAgIHNldFJlb3JkZXIoZmFsc2UpIFxuICAgICAgICBwcm9wcy5zZXRSZXR1cm4oJ0F1dG9tYXRpb25MYXlvdXQnLCB7J25hbWUnOiBwcm9wcy5hdXRvbWF0aW9uTmFtZSwgJ3R5cGUnOnByb3BzLml0ZW10eXBlIH0pXG4gICAgICAgIHByb3BzLnNldEJhY2soJ0F1dG9tYXRpb25MYXlvdXQnLCB7J25hbWUnOiBwcm9wcy5hdXRvbWF0aW9uTmFtZSB9IClcbiAgICAgICAgcHJvcHMuc2V0TGF5b3V0Q2FyZChwcm9wcy5zZWxlY3RvcilcbiAgICB9XG5cbiAgICByZXR1cm4gKCAgICBcbiAgICAgICAgPEdyaWRQYWdlPlxuICAgICAgICAgICAgPEdyaWRCcmVhayBsYWJlbD17cHJvcHMubmFtZX0gc2l6ZT1cImg2XCIgPlxuICAgICAgICAgICAgICAgIDxJY29uQnV0dG9uIG9uQ2xpY2s9eyAoKSA9PiBhZGRJdGVtKCkgfSBjbGFzc05hbWU9e2NsYXNzZXMuYnV0dG9uIH0+XG4gICAgICAgICAgICAgICAgICAgIDxBZGRJY29uIGZvbnRTaXplPVwic21hbGxcIiAvPlxuICAgICAgICAgICAgICAgIDwvSWNvbkJ1dHRvbj5cbiAgICAgICAgICAgICAgICB7IE9iamVjdC5rZXlzKHByb3BzLml0ZW1zKS5sZW5ndGg+MCAmJlxuICAgICAgICAgICAgICAgIDxJY29uQnV0dG9uIG9uQ2xpY2s9eyAoKSA9PiB7IHNldFJlbW92ZSghcmVtb3ZlKTsgc2V0UmVvcmRlcihmYWxzZSk7IH19IGNsYXNzTmFtZT17Y2xhc3Nlcy5idXR0b24gfT5cbiAgICAgICAgICAgICAgICAgICAgPFJlbW92ZUljb24gZm9udFNpemU9XCJzbWFsbFwiIC8+XG4gICAgICAgICAgICAgICAgPC9JY29uQnV0dG9uPlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB7IChwcm9wcy5pdGVtdHlwZSE9J3RyaWdnZXInICYmIE9iamVjdC5rZXlzKHByb3BzLml0ZW1zKS5sZW5ndGg+MSkgJiZcbiAgICAgICAgICAgICAgICA8SWNvbkJ1dHRvbiBvbkNsaWNrPXsgKCkgPT4geyBzZXRSZW1vdmUoZmFsc2UpOyBzZXRSZW9yZGVyKCFyZW9yZGVyKSB9fSBjbGFzc05hbWU9e2NsYXNzZXMuYnV0dG9uIH0+XG4gICAgICAgICAgICAgICAgICAgIDxVbmZvbGRNb3JlSWNvbiBmb250U2l6ZT1cInNtYWxsXCIgLz5cbiAgICAgICAgICAgICAgICA8L0ljb25CdXR0b24+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9HcmlkQnJlYWs+XG4gICAgICAgICAgICB7IE9iamVjdC5rZXlzKHByb3BzLml0ZW1zKS5sZW5ndGg+MCA/XG4gICAgICAgICAgICAgICAgPFJlYWN0LkZyYWdtZW50PlxuICAgICAgICAgICAgICAgICAgICB7IHByb3BzLml0ZW1zLm1hcCgoaXRlbSxpbmRleCkgPT4gXG4gICAgICAgICAgICAgICAgICAgICAgICA8QXV0b21hdGlvblByb3BlcnR5IGtleT17cHJvcHMuaXRlbXR5cGUraW5kZXh9IG1vdmVVcD17bW92ZVVwfSBtb3ZlRG93bj17bW92ZURvd259IHNhdmU9e3NhdmV9IHJlbW92ZT17cmVtb3ZlfSByZW9yZGVyPXtyZW9yZGVyfSBkZWxldGU9e2RlbGV0ZUl0ZW19IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleD17aW5kZXh9IGl0ZW09e2l0ZW19IGRldmljZT17IHByb3BzLmRldmljZUJ5RW5kcG9pbnRJZChpdGVtLmVuZHBvaW50SWQpIH0gbmFtZT17cHJvcHMuZGV2aWNlQnlFbmRwb2ludElkKGl0ZW0uZW5kcG9pbnRJZCkuZnJpZW5kbHlOYW1lfSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlcz17cHJvcHMuZGlyZWN0aXZlc30gY29udHJvbGxlclByb3BlcnRpZXM9eyBnZXRDb250cm9sbGVyUHJvcGVydGllcyhpdGVtKX0gd2lkZT17dHJ1ZX0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICAgICAgICAgICAgICA6XG4gICAgICAgICAgICAgICAgPEdyaWRJdGVtIGVsZXZhdGlvbj17MH0gd2lkZT17dHJ1ZX0+XG4gICAgICAgICAgICAgICAgICAgIDxMaXN0SXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMaXN0SXRlbVRleHQgcHJpbWFyeT17XCJUaGVyZSBhcmUgbm8gXCIrcHJvcHMubmFtZStcIiBkZWZpbmVkLlwifSAvPlxuICAgICAgICAgICAgICAgICAgICA8L0xpc3RJdGVtPlxuICAgICAgICAgICAgICAgIDwvR3JpZEl0ZW0+XG4gICAgICAgICAgICB9XG4gICAgICAgIDwvR3JpZFBhZ2U+XG4gICAgKVxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoRGF0YShBdXRvbWF0aW9uQ29sdW1uKTsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBREE7QUFMQTtBQUNBO0FBVUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUhBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBUUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBSUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQU1BO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUZBO0FBREE7QUFRQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBT0E7QUFDQTtBQURBO0FBRUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/AutomationColumn.js\n");

/***/ })

}]);