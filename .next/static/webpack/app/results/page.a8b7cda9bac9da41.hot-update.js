"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/results/page",{

/***/ "(app-pages-browser)/./src/components/layout/HistorySidebar.tsx":
/*!**************************************************!*\
  !*** ./src/components/layout/HistorySidebar.tsx ***!
  \**************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ HistorySidebar)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/dist/api/navigation.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _lib_history__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/history */ \"(app-pages-browser)/./src/lib/history.ts\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nconst SIDEBAR_STATE_KEY = 'sidebar_state';\nfunction HistorySidebar() {\n    _s();\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_1__.useRouter)();\n    const [isOpen, setIsOpen] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);\n    const [histories, setHistories] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]);\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)({\n        \"HistorySidebar.useEffect\": ()=>{\n            // Get initial sidebar state from localStorage\n            const savedState = localStorage.getItem(SIDEBAR_STATE_KEY);\n            if (savedState !== null) {\n                setIsOpen(savedState === 'true');\n            }\n            // Initial history load\n            setHistories((0,_lib_history__WEBPACK_IMPORTED_MODULE_3__.getHistory)());\n            // Set up event listener for storage changes\n            const handleStorageChange = {\n                \"HistorySidebar.useEffect.handleStorageChange\": (e)=>{\n                    if (e.key === SIDEBAR_STATE_KEY) {\n                        setIsOpen(e.newValue === 'true');\n                    } else {\n                        setHistories((0,_lib_history__WEBPACK_IMPORTED_MODULE_3__.getHistory)());\n                    }\n                }\n            }[\"HistorySidebar.useEffect.handleStorageChange\"];\n            window.addEventListener('storage', handleStorageChange);\n            window.addEventListener('focus', {\n                \"HistorySidebar.useEffect\": ()=>setHistories((0,_lib_history__WEBPACK_IMPORTED_MODULE_3__.getHistory)())\n            }[\"HistorySidebar.useEffect\"]);\n            return ({\n                \"HistorySidebar.useEffect\": ()=>{\n                    window.removeEventListener('storage', handleStorageChange);\n                    window.removeEventListener('focus', {\n                        \"HistorySidebar.useEffect\": ()=>setHistories((0,_lib_history__WEBPACK_IMPORTED_MODULE_3__.getHistory)())\n                    }[\"HistorySidebar.useEffect\"]);\n                }\n            })[\"HistorySidebar.useEffect\"];\n        }\n    }[\"HistorySidebar.useEffect\"], []);\n    const handleToggle = ()=>{\n        const newState = !isOpen;\n        setIsOpen(newState);\n        localStorage.setItem(SIDEBAR_STATE_KEY, String(newState));\n    };\n    const handleHistoryClick = (query)=>{\n        router.push(\"/results?q=\".concat(encodeURIComponent(query)));\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"fixed left-0 top-[60px] h-[calc(100vh-60px)] bg-[#1C1C1F] border-r border-[#2C2C30] transition-all duration-300 \".concat(isOpen ? 'w-72' : 'w-0'),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                onClick: handleToggle,\n                className: \"absolute -right-10 top-4 bg-[#2C2C30] w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#3C3C40] transition-colors\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"svg\", {\n                    className: \"w-4 h-4 text-gray-400 transition-transform duration-200 \".concat(isOpen ? 'rotate-180' : ''),\n                    fill: \"none\",\n                    stroke: \"currentColor\",\n                    viewBox: \"0 0 24 24\",\n                    xmlns: \"http://www.w3.org/2000/svg\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"path\", {\n                        strokeLinecap: \"round\",\n                        strokeLinejoin: \"round\",\n                        strokeWidth: 2,\n                        d: \"M9 5l7 7-7 7\"\n                    }, void 0, false, {\n                        fileName: \"/Users/claraeverett/Desktop/perplexity/src/components/layout/HistorySidebar.tsx\",\n                        lineNumber: 65,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/Users/claraeverett/Desktop/perplexity/src/components/layout/HistorySidebar.tsx\",\n                    lineNumber: 58,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/claraeverett/Desktop/perplexity/src/components/layout/HistorySidebar.tsx\",\n                lineNumber: 54,\n                columnNumber: 7\n            }, this),\n            isOpen && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"p-4\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                        className: \"text-white text-lg font-medium mb-4\",\n                        children: \"History\"\n                    }, void 0, false, {\n                        fileName: \"/Users/claraeverett/Desktop/perplexity/src/components/layout/HistorySidebar.tsx\",\n                        lineNumber: 76,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"space-y-3\",\n                        children: histories.length > 0 ? histories.map((history)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                onClick: ()=>handleHistoryClick(history.query),\n                                className: \"w-full text-left group\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"p-3 rounded-lg bg-[#2C2C30] hover:bg-[#3C3C40] transition-colors\",\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                            className: \"text-white text-sm line-clamp-2\",\n                                            children: history.query\n                                        }, void 0, false, {\n                                            fileName: \"/Users/claraeverett/Desktop/perplexity/src/components/layout/HistorySidebar.tsx\",\n                                            lineNumber: 86,\n                                            columnNumber: 21\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                            className: \"text-gray-400 text-xs mt-1\",\n                                            children: (0,_lib_history__WEBPACK_IMPORTED_MODULE_3__.formatTimestamp)(history.timestamp)\n                                        }, void 0, false, {\n                                            fileName: \"/Users/claraeverett/Desktop/perplexity/src/components/layout/HistorySidebar.tsx\",\n                                            lineNumber: 87,\n                                            columnNumber: 21\n                                        }, this)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"/Users/claraeverett/Desktop/perplexity/src/components/layout/HistorySidebar.tsx\",\n                                    lineNumber: 85,\n                                    columnNumber: 19\n                                }, this)\n                            }, history.id, false, {\n                                fileName: \"/Users/claraeverett/Desktop/perplexity/src/components/layout/HistorySidebar.tsx\",\n                                lineNumber: 80,\n                                columnNumber: 17\n                            }, this)) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"text-gray-400 text-sm text-center p-4\",\n                            children: \"No search history yet\"\n                        }, void 0, false, {\n                            fileName: \"/Users/claraeverett/Desktop/perplexity/src/components/layout/HistorySidebar.tsx\",\n                            lineNumber: 92,\n                            columnNumber: 15\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/Users/claraeverett/Desktop/perplexity/src/components/layout/HistorySidebar.tsx\",\n                        lineNumber: 77,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/claraeverett/Desktop/perplexity/src/components/layout/HistorySidebar.tsx\",\n                lineNumber: 75,\n                columnNumber: 9\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/claraeverett/Desktop/perplexity/src/components/layout/HistorySidebar.tsx\",\n        lineNumber: 53,\n        columnNumber: 5\n    }, this);\n}\n_s(HistorySidebar, \"KrGzMlLuzrwjN/2URgCBS6jKv20=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_1__.useRouter\n    ];\n});\n_c = HistorySidebar;\nvar _c;\n$RefreshReg$(_c, \"HistorySidebar\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL2xheW91dC9IaXN0b3J5U2lkZWJhci50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFNEM7QUFDQTtBQUNrQztBQUU5RSxNQUFNSyxvQkFBb0I7QUFFWCxTQUFTQzs7SUFDdEIsTUFBTUMsU0FBU1AsMERBQVNBO0lBQ3hCLE1BQU0sQ0FBQ1EsUUFBUUMsVUFBVSxHQUFHUiwrQ0FBUUEsQ0FBQztJQUNyQyxNQUFNLENBQUNTLFdBQVdDLGFBQWEsR0FBR1YsK0NBQVFBLENBQWdCLEVBQUU7SUFFNURDLGdEQUFTQTtvQ0FBQztZQUNSLDhDQUE4QztZQUM5QyxNQUFNVSxhQUFhQyxhQUFhQyxPQUFPLENBQUNUO1lBQ3hDLElBQUlPLGVBQWUsTUFBTTtnQkFDdkJILFVBQVVHLGVBQWU7WUFDM0I7WUFFQSx1QkFBdUI7WUFDdkJELGFBQWFSLHdEQUFVQTtZQUV2Qiw0Q0FBNEM7WUFDNUMsTUFBTVk7Z0VBQXNCLENBQUNDO29CQUMzQixJQUFJQSxFQUFFQyxHQUFHLEtBQUtaLG1CQUFtQjt3QkFDL0JJLFVBQVVPLEVBQUVFLFFBQVEsS0FBSztvQkFDM0IsT0FBTzt3QkFDTFAsYUFBYVIsd0RBQVVBO29CQUN6QjtnQkFDRjs7WUFFQWdCLE9BQU9DLGdCQUFnQixDQUFDLFdBQVdMO1lBQ25DSSxPQUFPQyxnQkFBZ0IsQ0FBQzs0Q0FBUyxJQUFNVCxhQUFhUix3REFBVUE7O1lBRTlEOzRDQUFPO29CQUNMZ0IsT0FBT0UsbUJBQW1CLENBQUMsV0FBV047b0JBQ3RDSSxPQUFPRSxtQkFBbUIsQ0FBQztvREFBUyxJQUFNVixhQUFhUix3REFBVUE7O2dCQUNuRTs7UUFDRjttQ0FBRyxFQUFFO0lBRUwsTUFBTW1CLGVBQWU7UUFDbkIsTUFBTUMsV0FBVyxDQUFDZjtRQUNsQkMsVUFBVWM7UUFDVlYsYUFBYVcsT0FBTyxDQUFDbkIsbUJBQW1Cb0IsT0FBT0Y7SUFDakQ7SUFFQSxNQUFNRyxxQkFBcUIsQ0FBQ0M7UUFDMUJwQixPQUFPcUIsSUFBSSxDQUFDLGNBQXdDLE9BQTFCQyxtQkFBbUJGO0lBQy9DO0lBRUEscUJBQ0UsOERBQUNHO1FBQUlDLFdBQVcsbUhBQTJJLE9BQXhCdkIsU0FBUyxTQUFTOzswQkFDbkosOERBQUN3QjtnQkFDQ0MsU0FBU1g7Z0JBQ1RTLFdBQVU7MEJBRVYsNEVBQUNHO29CQUNDSCxXQUFXLDJEQUFzRixPQUEzQnZCLFNBQVMsZUFBZTtvQkFDOUYyQixNQUFLO29CQUNMQyxRQUFPO29CQUNQQyxTQUFRO29CQUNSQyxPQUFNOzhCQUVOLDRFQUFDQzt3QkFDQ0MsZUFBYzt3QkFDZEMsZ0JBQWU7d0JBQ2ZDLGFBQWE7d0JBQ2JDLEdBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7WUFLUG5DLHdCQUNDLDhEQUFDc0I7Z0JBQUlDLFdBQVU7O2tDQUNiLDhEQUFDYTt3QkFBR2IsV0FBVTtrQ0FBc0M7Ozs7OztrQ0FDcEQsOERBQUNEO3dCQUFJQyxXQUFVO2tDQUNackIsVUFBVW1DLE1BQU0sR0FBRyxJQUNsQm5DLFVBQVVvQyxHQUFHLENBQUMsQ0FBQ0Msd0JBQ2IsOERBQUNmO2dDQUVDQyxTQUFTLElBQU1QLG1CQUFtQnFCLFFBQVFwQixLQUFLO2dDQUMvQ0ksV0FBVTswQ0FFViw0RUFBQ0Q7b0NBQUlDLFdBQVU7O3NEQUNiLDhEQUFDaUI7NENBQUVqQixXQUFVO3NEQUFtQ2dCLFFBQVFwQixLQUFLOzs7Ozs7c0RBQzdELDhEQUFDcUI7NENBQUVqQixXQUFVO3NEQUE4QjNCLDZEQUFlQSxDQUFDMkMsUUFBUUUsU0FBUzs7Ozs7Ozs7Ozs7OytCQU56RUYsUUFBUUcsRUFBRTs7OztzREFXbkIsOERBQUNwQjs0QkFBSUMsV0FBVTtzQ0FBd0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBU3JFO0dBNUZ3QnpCOztRQUNQTixzREFBU0E7OztLQURGTSIsInNvdXJjZXMiOlsiL1VzZXJzL2NsYXJhZXZlcmV0dC9EZXNrdG9wL3BlcnBsZXhpdHkvc3JjL2NvbXBvbmVudHMvbGF5b3V0L0hpc3RvcnlTaWRlYmFyLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCc7XG5cbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvbmF2aWdhdGlvbic7XG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZ2V0SGlzdG9yeSwgZm9ybWF0VGltZXN0YW1wLCB0eXBlIENoYXRIaXN0b3J5IH0gZnJvbSAnQC9saWIvaGlzdG9yeSc7XG5cbmNvbnN0IFNJREVCQVJfU1RBVEVfS0VZID0gJ3NpZGViYXJfc3RhdGUnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIaXN0b3J5U2lkZWJhcigpIHtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG4gIGNvbnN0IFtpc09wZW4sIHNldElzT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtoaXN0b3JpZXMsIHNldEhpc3Rvcmllc10gPSB1c2VTdGF0ZTxDaGF0SGlzdG9yeVtdPihbXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAvLyBHZXQgaW5pdGlhbCBzaWRlYmFyIHN0YXRlIGZyb20gbG9jYWxTdG9yYWdlXG4gICAgY29uc3Qgc2F2ZWRTdGF0ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFNJREVCQVJfU1RBVEVfS0VZKTtcbiAgICBpZiAoc2F2ZWRTdGF0ZSAhPT0gbnVsbCkge1xuICAgICAgc2V0SXNPcGVuKHNhdmVkU3RhdGUgPT09ICd0cnVlJyk7XG4gICAgfVxuXG4gICAgLy8gSW5pdGlhbCBoaXN0b3J5IGxvYWRcbiAgICBzZXRIaXN0b3JpZXMoZ2V0SGlzdG9yeSgpKTtcblxuICAgIC8vIFNldCB1cCBldmVudCBsaXN0ZW5lciBmb3Igc3RvcmFnZSBjaGFuZ2VzXG4gICAgY29uc3QgaGFuZGxlU3RvcmFnZUNoYW5nZSA9IChlOiBTdG9yYWdlRXZlbnQpID0+IHtcbiAgICAgIGlmIChlLmtleSA9PT0gU0lERUJBUl9TVEFURV9LRVkpIHtcbiAgICAgICAgc2V0SXNPcGVuKGUubmV3VmFsdWUgPT09ICd0cnVlJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRIaXN0b3JpZXMoZ2V0SGlzdG9yeSgpKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3N0b3JhZ2UnLCBoYW5kbGVTdG9yYWdlQ2hhbmdlKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCAoKSA9PiBzZXRIaXN0b3JpZXMoZ2V0SGlzdG9yeSgpKSk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3N0b3JhZ2UnLCBoYW5kbGVTdG9yYWdlQ2hhbmdlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsICgpID0+IHNldEhpc3RvcmllcyhnZXRIaXN0b3J5KCkpKTtcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgY29uc3QgaGFuZGxlVG9nZ2xlID0gKCkgPT4ge1xuICAgIGNvbnN0IG5ld1N0YXRlID0gIWlzT3BlbjtcbiAgICBzZXRJc09wZW4obmV3U3RhdGUpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNJREVCQVJfU1RBVEVfS0VZLCBTdHJpbmcobmV3U3RhdGUpKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVIaXN0b3J5Q2xpY2sgPSAocXVlcnk6IHN0cmluZykgPT4ge1xuICAgIHJvdXRlci5wdXNoKGAvcmVzdWx0cz9xPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5KX1gKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtgZml4ZWQgbGVmdC0wIHRvcC1bNjBweF0gaC1bY2FsYygxMDB2aC02MHB4KV0gYmctWyMxQzFDMUZdIGJvcmRlci1yIGJvcmRlci1bIzJDMkMzMF0gdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwICR7aXNPcGVuID8gJ3ctNzInIDogJ3ctMCd9YH0+XG4gICAgICA8YnV0dG9uIFxuICAgICAgICBvbkNsaWNrPXtoYW5kbGVUb2dnbGV9XG4gICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIC1yaWdodC0xMCB0b3AtNCBiZy1bIzJDMkMzMF0gdy04IGgtOCByb3VuZGVkLWZ1bGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgaG92ZXI6YmctWyMzQzNDNDBdIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgID5cbiAgICAgICAgPHN2Z1xuICAgICAgICAgIGNsYXNzTmFtZT17YHctNCBoLTQgdGV4dC1ncmF5LTQwMCB0cmFuc2l0aW9uLXRyYW5zZm9ybSBkdXJhdGlvbi0yMDAgJHtpc09wZW4gPyAncm90YXRlLTE4MCcgOiAnJ31gfVxuICAgICAgICAgIGZpbGw9XCJub25lXCJcbiAgICAgICAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIlxuICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMjQgMjRcIlxuICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgICAgICA+XG4gICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXG4gICAgICAgICAgICBzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcbiAgICAgICAgICAgIHN0cm9rZVdpZHRoPXsyfVxuICAgICAgICAgICAgZD1cIk05IDVsNyA3LTcgN1wiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIFxuICAgICAge2lzT3BlbiAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00XCI+XG4gICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtd2hpdGUgdGV4dC1sZyBmb250LW1lZGl1bSBtYi00XCI+SGlzdG9yeTwvaDI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTNcIj5cbiAgICAgICAgICAgIHtoaXN0b3JpZXMubGVuZ3RoID4gMCA/IChcbiAgICAgICAgICAgICAgaGlzdG9yaWVzLm1hcCgoaGlzdG9yeSkgPT4gKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGtleT17aGlzdG9yeS5pZH1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZUhpc3RvcnlDbGljayhoaXN0b3J5LnF1ZXJ5KX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCB0ZXh0LWxlZnQgZ3JvdXBcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQtbGcgYmctWyMyQzJDMzBdIGhvdmVyOmJnLVsjM0MzQzQwXSB0cmFuc2l0aW9uLWNvbG9yc1wiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlIHRleHQtc20gbGluZS1jbGFtcC0yXCI+e2hpc3RvcnkucXVlcnl9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwIHRleHQteHMgbXQtMVwiPntmb3JtYXRUaW1lc3RhbXAoaGlzdG9yeS50aW1lc3RhbXApfTwvcD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwIHRleHQtc20gdGV4dC1jZW50ZXIgcC00XCI+XG4gICAgICAgICAgICAgICAgTm8gc2VhcmNoIGhpc3RvcnkgeWV0XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sIm5hbWVzIjpbInVzZVJvdXRlciIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiZ2V0SGlzdG9yeSIsImZvcm1hdFRpbWVzdGFtcCIsIlNJREVCQVJfU1RBVEVfS0VZIiwiSGlzdG9yeVNpZGViYXIiLCJyb3V0ZXIiLCJpc09wZW4iLCJzZXRJc09wZW4iLCJoaXN0b3JpZXMiLCJzZXRIaXN0b3JpZXMiLCJzYXZlZFN0YXRlIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImhhbmRsZVN0b3JhZ2VDaGFuZ2UiLCJlIiwia2V5IiwibmV3VmFsdWUiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImhhbmRsZVRvZ2dsZSIsIm5ld1N0YXRlIiwic2V0SXRlbSIsIlN0cmluZyIsImhhbmRsZUhpc3RvcnlDbGljayIsInF1ZXJ5IiwicHVzaCIsImVuY29kZVVSSUNvbXBvbmVudCIsImRpdiIsImNsYXNzTmFtZSIsImJ1dHRvbiIsIm9uQ2xpY2siLCJzdmciLCJmaWxsIiwic3Ryb2tlIiwidmlld0JveCIsInhtbG5zIiwicGF0aCIsInN0cm9rZUxpbmVjYXAiLCJzdHJva2VMaW5lam9pbiIsInN0cm9rZVdpZHRoIiwiZCIsImgyIiwibGVuZ3RoIiwibWFwIiwiaGlzdG9yeSIsInAiLCJ0aW1lc3RhbXAiLCJpZCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/layout/HistorySidebar.tsx\n"));

/***/ })

});