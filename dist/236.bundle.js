(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[236],{

/***/ "./src/SofaAppContent.js.safe":
/*!************************************!*\
  !*** ./src/SofaAppContent.js.safe ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/styles */ \"./node_modules/@material-ui/styles/index.es.js\");\n/* harmony import */ var _DataContext_withLayout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DataContext/withLayout */ \"./src/DataContext/withLayout.js\");\n/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-loadable */ \"./node_modules/react-loadable/lib/index.js\");\n/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_loadable__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Grid */ \"./node_modules/@material-ui/core/Grid/index.js\");\n/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _ErrorCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ErrorCard */ \"./src/ErrorCard.js\");\n/* harmony import */ var _PlaceholderCard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./PlaceholderCard */ \"./src/PlaceholderCard.js\");\n/* harmony import */ var _SofaPage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SofaPage */ \"./src/SofaPage.js\");\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction _readOnlyError(name) { throw new Error(\"\\\"\" + name + \"\\\" is read-only\"); }\n\n\n\n\n\n\n\n\n\n\nvar useStyles = Object(_material_ui_styles__WEBPACK_IMPORTED_MODULE_1__[\"makeStyles\"])({\n  controlArea: {\n    margin: \"8 auto\",\n    maxWidth: 1440,\n    boxSizing: \"border-box\",\n    overflowY: \"auto\",\n    width: \"100%\"\n  },\n  mobileControlArea: {\n    margin: \"8 auto\",\n    maxWidth: 600,\n    width: \"100%\",\n    paddingTop: \"env(safe-area-inset-top)\",\n    boxSizing: \"border-box\",\n    overflowY: \"auto\",\n    minHeight: \"100%\",\n    alignContent: \"flex-start\"\n  },\n  gridColumn: {\n    overflowX: \"hidden\",\n    overflowY: \"hidden\",\n    alignContent: \"start\"\n  },\n  gridItem: {\n    overflowX: \"hidden\",\n    width: \"100%\"\n  }\n});\n\nfunction cardLoading(props) {\n  if (props.error) {\n    console.log(props);\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ErrorCard__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n      message: props.error.message\n    });\n  } else if (props.pastDelay) {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PlaceholderCard__WEBPACK_IMPORTED_MODULE_6__[\"default\"], null);\n  } else {\n    return null;\n  }\n}\n\nfunction SofaAppContent(props) {\n  var classes = useStyles();\n  var mobileBreakpoint = 800;\n  var isMobile = window.innerWidth <= mobileBreakpoint;\n\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])([]),\n      _useState2 = _slicedToArray(_useState, 2),\n      modules = _useState2[0],\n      setModules = _useState2[1];\n\n  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])({}),\n      _useState4 = _slicedToArray(_useState3, 2),\n      layout = _useState4[0],\n      setLayout = _useState4[1];\n\n  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(null),\n      _useState6 = _slicedToArray(_useState5, 2),\n      module = _useState6[0],\n      setModule = _useState6[1];\n\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(function () {\n    if (props.layout.hasOwnProperty('pages')) {\n      addLayoutModules(props.layout);\n    } else {\n      addModules([props.layoutName]);\n    }\n  });\n\n  function addModule(modulename) {\n    return react_loadable__WEBPACK_IMPORTED_MODULE_3___default()({\n      loader: function loader() {\n        return __webpack_require__(\"./src lazy recursive ^\\\\.\\\\/.*$\")(\"./\" + modulename);\n      },\n      // Here can be any component!\n      loading: cardLoading\n    });\n  }\n\n  function addModules(modulelist) {\n    var changes = false;\n    var newmodules = {};\n    modulelist.map(function (item) {\n      if (modules.hasOwnProperty(item)) {\n        newmodules[item] = modules[item];\n      } else {\n        newmodules[item] = addModule(item);\n        changes = true;\n      }\n    });\n\n    if (changes) {\n      console.log('setting', newmodules);\n      setModules(newmodules);\n    }\n  }\n\n  function addLayoutModules(layout) {\n    var newmodules = [];\n    Object.keys(props.layout.pages).map(function (page) {\n      return props.layout.pages[page].map(function (item) {\n        return newmodules.push(item['module']);\n      });\n    });\n    addModules(newmodules);\n  }\n\n  function renderModule(modulename, moduleprops) {\n    if (modules.hasOwnProperty(modulename)) {\n      console.log('moduleprops', modulename, moduleprops);\n      var Module = addModule(modulename);\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Module, moduleprops);\n    } else {\n      console.log('Did not find', modulename, 'in', modules);\n      return null;\n    }\n  }\n\n  function renderLayoutModule(item, page, index, ts) {\n    if (modules.hasOwnProperty(item['module'])) {\n      var Module = modules[item['module']];\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Module, _extends({\n        key: page + index\n      }, item['props']));\n    } else {\n      console.log('Did not find', item['module'], 'in', modules);\n      return null;\n    }\n  }\n\n  function setLayout(layoutname, page) {\n    //setLayout(layoutname)\n    if (page) {\n      props.setLayoutPage(page);\n    }\n\n    addLayoutModules(layoutname);\n  }\n\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {\n    container: true,\n    spacing: 8,\n    className: isMobile ? classes.mobileControlArea : classes.controlArea\n  }, props.layout.type == 'narrow' ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, Object.keys(props.layout.pages).map(function (page) {\n    return page == props.layoutPage || !isMobile ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SofaPage__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n      key: page,\n      name: page,\n      page: props.layout.pages[page]\n    }) : null;\n  })) : null, props.layout.type == 'single' ? renderModule(props.layoutName, props.layoutProps) : null);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react__WEBPACK_IMPORTED_MODULE_0__[\"memo\"])(Object(_DataContext_withLayout__WEBPACK_IMPORTED_MODULE_2__[\"withLayout\"])(SofaAppContent)));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvU29mYUFwcENvbnRlbnQuanMuc2FmZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9Tb2ZhQXBwQ29udGVudC5qcy5zYWZlPzU2ZTAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IG1lbW8gfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgbWFrZVN0eWxlcyB9IGZyb20gJ0BtYXRlcmlhbC11aS9zdHlsZXMnO1xuaW1wb3J0IHsgd2l0aExheW91dCB9IGZyb20gJy4vRGF0YUNvbnRleHQvd2l0aExheW91dCc7XG5cbmltcG9ydCBMb2FkYWJsZSBmcm9tICdyZWFjdC1sb2FkYWJsZSc7XG5pbXBvcnQgR3JpZCBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9HcmlkJztcbmltcG9ydCBFcnJvckNhcmQgZnJvbSAnLi9FcnJvckNhcmQnO1xuaW1wb3J0IFBsYWNlaG9sZGVyQ2FyZCBmcm9tICcuL1BsYWNlaG9sZGVyQ2FyZCc7XG5pbXBvcnQgU29mYVBhZ2UgZnJvbSAnLi9Tb2ZhUGFnZSc7XG5cbmNvbnN0IHVzZVN0eWxlcyA9IG1ha2VTdHlsZXMoe1xuICAgIFxuICAgIGNvbnRyb2xBcmVhOiB7XG4gICAgICAgIG1hcmdpbjogXCI4IGF1dG9cIixcbiAgICAgICAgbWF4V2lkdGg6IDE0NDAsXG4gICAgICAgIGJveFNpemluZzogXCJib3JkZXItYm94XCIsXG4gICAgICAgIG92ZXJmbG93WTogXCJhdXRvXCIsXG4gICAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICB9LFxuICAgIG1vYmlsZUNvbnRyb2xBcmVhOiB7XG4gICAgICAgIG1hcmdpbjogXCI4IGF1dG9cIixcbiAgICAgICAgbWF4V2lkdGg6IDYwMCxcbiAgICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgICAgICBwYWRkaW5nVG9wOiBcImVudihzYWZlLWFyZWEtaW5zZXQtdG9wKVwiLFxuICAgICAgICBib3hTaXppbmc6IFwiYm9yZGVyLWJveFwiLFxuICAgICAgICBvdmVyZmxvd1k6IFwiYXV0b1wiLFxuICAgICAgICBtaW5IZWlnaHQ6IFwiMTAwJVwiLFxuICAgICAgICBhbGlnbkNvbnRlbnQ6IFwiZmxleC1zdGFydFwiLFxuICAgIH0sXG4gICAgZ3JpZENvbHVtbjoge1xuICAgICAgICBvdmVyZmxvd1g6IFwiaGlkZGVuXCIsXG4gICAgICAgIG92ZXJmbG93WTogXCJoaWRkZW5cIixcbiAgICAgICAgYWxpZ25Db250ZW50OiBcInN0YXJ0XCIsXG4gICAgfSxcbiAgICBncmlkSXRlbToge1xuICAgICAgICBvdmVyZmxvd1g6IFwiaGlkZGVuXCIsXG4gICAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICB9ICAgIFxufSk7XG5cbmZ1bmN0aW9uIGNhcmRMb2FkaW5nKHByb3BzKSB7XG4gICAgXG4gICAgaWYgKHByb3BzLmVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHByb3BzKVxuICAgICAgICByZXR1cm4gPEVycm9yQ2FyZCBtZXNzYWdlPXtwcm9wcy5lcnJvci5tZXNzYWdlfSAvPjtcbiAgICB9IGVsc2UgaWYgKHByb3BzLnBhc3REZWxheSkge1xuICAgICAgICByZXR1cm4gPFBsYWNlaG9sZGVyQ2FyZCAvPjtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIFNvZmFBcHBDb250ZW50KHByb3BzKSB7XG4gICAgXG4gICAgY29uc3QgY2xhc3NlcyA9IHVzZVN0eWxlcygpO1xuICAgIGNvbnN0IG1vYmlsZUJyZWFrcG9pbnQgPSA4MDBcbiAgICBjb25zdCBpc01vYmlsZSA9IHdpbmRvdy5pbm5lcldpZHRoIDw9IG1vYmlsZUJyZWFrcG9pbnQ7XG4gICAgY29uc3QgW21vZHVsZXMsIHNldE1vZHVsZXNdID0gdXNlU3RhdGUoW10pO1xuICAgIGNvbnN0IFtsYXlvdXQsIHNldExheW91dF0gPSB1c2VTdGF0ZSh7fSk7XG4gICAgY29uc3QgW21vZHVsZSwgc2V0TW9kdWxlXSA9IHVzZVN0YXRlKG51bGwpO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKHByb3BzLmxheW91dC5oYXNPd25Qcm9wZXJ0eSgncGFnZXMnKSkge1xuICAgICAgICAgICAgYWRkTGF5b3V0TW9kdWxlcyhwcm9wcy5sYXlvdXQpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhZGRNb2R1bGVzKFtwcm9wcy5sYXlvdXROYW1lXSlcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIGZ1bmN0aW9uIGFkZE1vZHVsZShtb2R1bGVuYW1lKSB7XG5cbiAgICAgICAgcmV0dXJuIChMb2FkYWJsZSgge1xuICAgICAgICAgICAgbG9hZGVyOiAoKSA9PiBpbXBvcnQoJy4vJyttb2R1bGVuYW1lKSwgLy8gSGVyZSBjYW4gYmUgYW55IGNvbXBvbmVudCFcbiAgICAgICAgICAgIGxvYWRpbmc6IGNhcmRMb2FkaW5nLCB9KSlcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gYWRkTW9kdWxlcyhtb2R1bGVsaXN0KSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgY2hhbmdlcz1mYWxzZTtcbiAgICAgICAgdmFyIG5ld21vZHVsZXMgPSB7fVxuXG4gICAgICAgIG1vZHVsZWxpc3QubWFwKCBpdGVtID0+IHtcbiAgICAgICAgICAgIGlmIChtb2R1bGVzLmhhc093blByb3BlcnR5KGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgbmV3bW9kdWxlc1tpdGVtXT1tb2R1bGVzW2l0ZW1dXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld21vZHVsZXNbaXRlbV09YWRkTW9kdWxlKGl0ZW0pXG4gICAgICAgICAgICAgICAgY2hhbmdlcz10cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGlmIChjaGFuZ2VzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc2V0dGluZycsbmV3bW9kdWxlcylcbiAgICAgICAgICAgIHNldE1vZHVsZXMobmV3bW9kdWxlcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRMYXlvdXRNb2R1bGVzKGxheW91dCkge1xuICAgICAgICBcbiAgICAgICAgdmFyIG5ld21vZHVsZXMgPSBbXVxuICAgICAgICBPYmplY3Qua2V5cyhwcm9wcy5sYXlvdXQucGFnZXMpLm1hcChwYWdlID0+XG4gICAgICAgICAgICBwcm9wcy5sYXlvdXQucGFnZXNbcGFnZV0ubWFwKCBpdGVtID0+IFxuICAgICAgICAgICAgICAgIG5ld21vZHVsZXMucHVzaChpdGVtWydtb2R1bGUnXSlcbiAgICAgICAgICAgICkpO1xuICAgICAgICBhZGRNb2R1bGVzKG5ld21vZHVsZXMpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyTW9kdWxlKG1vZHVsZW5hbWUsIG1vZHVsZXByb3BzICkge1xuICAgICAgICBpZiAobW9kdWxlcy5oYXNPd25Qcm9wZXJ0eShtb2R1bGVuYW1lKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ21vZHVsZXByb3BzJyxtb2R1bGVuYW1lLCBtb2R1bGVwcm9wcylcbiAgICAgICAgICAgIGxldCBNb2R1bGUgPSBhZGRNb2R1bGUobW9kdWxlbmFtZSlcbiAgICAgICAgICAgIHJldHVybiA8TW9kdWxlIHsuLi5tb2R1bGVwcm9wc30gLz5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEaWQgbm90IGZpbmQnLG1vZHVsZW5hbWUsJ2luJyxtb2R1bGVzKVxuICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlckxheW91dE1vZHVsZSggaXRlbSwgcGFnZSwgaW5kZXgsdHMgKSB7XG5cbiAgICAgICAgaWYgKG1vZHVsZXMuaGFzT3duUHJvcGVydHkoaXRlbVsnbW9kdWxlJ10pKSB7XG4gICAgICAgICAgICBsZXQgTW9kdWxlID0gbW9kdWxlc1tpdGVtWydtb2R1bGUnXV1cbiAgICAgICAgICAgIHJldHVybiAoIDxNb2R1bGUga2V5PXsgcGFnZStpbmRleCB9IHsuLi5pdGVtWydwcm9wcyddfSAvPiApXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRGlkIG5vdCBmaW5kJyxpdGVtWydtb2R1bGUnXSwnaW4nLG1vZHVsZXMpXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIHNldExheW91dChsYXlvdXRuYW1lLCBwYWdlKSB7XG4gICAgICAgIC8vc2V0TGF5b3V0KGxheW91dG5hbWUpXG4gICAgICAgIGlmIChwYWdlKSB7XG4gICAgICAgICAgICBwcm9wcy5zZXRMYXlvdXRQYWdlKHBhZ2UpXG4gICAgICAgIH1cbiAgICAgICAgYWRkTGF5b3V0TW9kdWxlcyhsYXlvdXRuYW1lKVxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICAgIDxHcmlkIGNvbnRhaW5lciBzcGFjaW5nPXs4fSBjbGFzc05hbWU9eyBpc01vYmlsZSA/IGNsYXNzZXMubW9iaWxlQ29udHJvbEFyZWEgOiBjbGFzc2VzLmNvbnRyb2xBcmVhfSA+XG4gICAgICAgICAgICB7IHByb3BzLmxheW91dC50eXBlPT0nbmFycm93JyA/IFxuICAgICAgICAgICAgICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgICAgICAgICAgICAgICAgeyBPYmplY3Qua2V5cyhwcm9wcy5sYXlvdXQucGFnZXMpLm1hcCggcGFnZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHBhZ2U9PXByb3BzLmxheW91dFBhZ2UgfHwgIWlzTW9iaWxlICkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgPFNvZmFQYWdlIGtleT17cGFnZX0gbmFtZT17cGFnZX0gcGFnZT17cHJvcHMubGF5b3V0LnBhZ2VzW3BhZ2VdfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgOiBudWxsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgICAgICA6IG51bGwgfVxuICAgICAgICAgICAgeyBwcm9wcy5sYXlvdXQudHlwZT09J3NpbmdsZScgP1xuICAgICAgICAgICAgICAgIHJlbmRlck1vZHVsZShwcm9wcy5sYXlvdXROYW1lLCBwcm9wcy5sYXlvdXRQcm9wcylcbiAgICAgICAgICAgIDogbnVsbCB9XG4gICAgICAgIDwvR3JpZD5cbiAgICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBtZW1vKHdpdGhMYXlvdXQoU29mYUFwcENvbnRlbnQpKVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBRkE7QUF4QkE7QUFDQTtBQTZCQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFGQTtBQUdBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFEQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBUUE7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/SofaAppContent.js.safe\n");

/***/ })

}]);