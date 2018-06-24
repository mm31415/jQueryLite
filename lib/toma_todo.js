/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const UtilFunctions = __webpack_require__(/*! ./util_functions.js */ "./lib/util_functions.js");

function DomNodeCollection (htmlElements) {
  this.elements = htmlElements;
}

DomNodeCollection.prototype.html = function (innerHtml) {
  if (!innerHtml) {
    return this.elements[0].innerHTML;
  } else {
    this.elements.forEach((element) => {
      element.innerHTML = innerHtml;
    });
  }
};

DomNodeCollection.prototype.empty = function () {
  this.elements.forEach((element) => {
    element.innerHTML = "";
  });
};

DomNodeCollection.prototype.append = function (appendHtml) {
  if (appendHtml instanceof DomNodeCollection) {
    appendHtml.elements.forEach((el) => {
      this.elements.forEach((element) => {
        element.innerHTML = element.innerHTML.concat(el.outerHTML);
      });
      el.outerHTML = "";
    });
  } else {
    this.elements.forEach((element) => {
      element.innerHTML = element.innerHTML.concat(appendHtml);
    });
  }
};

DomNodeCollection.prototype.attr = function (attributeName, value) {
  if (value) {
    this.elements.forEach((element) => {
      element.setAttribute(attributeName, value);
    });
  } else {
    return this.elements[0].getAttribute(attributeName);
  }
};

DomNodeCollection.prototype.addClass = function (value) {
  this.elements.forEach((element) => {
    element.classList.add(value);
  });
};

DomNodeCollection.prototype.removeClass = function (value) {
  this.elements.forEach((element) => {
    if (value) {
      element.classList.remove(value);
    } else {
      UtilFunctions.removeAllClassNames(element);
    }
  });
};

DomNodeCollection.prototype.children = function () {
  const nodeArr = [];
  this.elements.forEach((element) => {
    Array.from(element.children).forEach((child) => {
      nodeArr.push(child);
    });
  });
  return new DomNodeCollection(nodeArr);
};

DomNodeCollection.prototype.parent = function () {
  const nodeArr = [];
  this.elements.forEach((element) => {
    nodeArr.push(element.parentElement);
  });
  return new DomNodeCollection(nodeArr);
};

DomNodeCollection.prototype.find = function (selector) {
  let nodeArr = [];
  this.elements.forEach((element) => {
    let tempArr = Array.from(element.querySelectorAll(selector));
    nodeArr = nodeArr.concat(tempArr);
  });
  return new DomNodeCollection(nodeArr);
};

DomNodeCollection.prototype.remove =  function () {
  this.elements.forEach((element) => {
    element.remove();
  });
};

DomNodeCollection.prototype.on = function (type, listener) {
  this.elements.forEach((element) => {
    element.listener = listener;
    element.addEventListener(type, listener);
  });
};

DomNodeCollection.prototype.off = function (type) {
  this.elements.forEach((element) => {
    element.removeEventListener(type, element.listener);
  });
};

module.exports = DomNodeCollection;


/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const DomNodeCollection = __webpack_require__(/*! ./dom_node_collection.js */ "./lib/dom_node_collection.js");
const UtilFunctions = __webpack_require__(/*! ./util_functions.js */ "./lib/util_functions.js");

const $l = function (arg) {
  if (typeof arg === "function") {
    const queueArr = [];
    queueArr.push(arg);
    if (document.readyState === 'complete') {
      runCallBackQueue(queueArr);
    }
  } else if (UtilFunctions.stringToHtml(arg) instanceof HTMLElement) {
    htmlArr = [];
    htmlArr.push(elArg);
    return new DomNodeCollection(htmlArr);
  } else if (typeof arg === 'string') {
    nodeList = document.querySelectorAll(arg);
    nodeArr = Array.from(nodeList);
    return new DomNodeCollection(nodeArr);
  }
};

$l.extend = function (...objects) {
  let mergedObj;
  mergedObj = Object.assign(...objects);
  return mergedObj;
};

$l.ajax = function (options) {
  const defaultRequest = {
    method: '',
    url: '',
    data: '',
    success: '',
    error: '',
    contentType: ''
  };
  const request = Object.assign({}, defaultRequest, options);
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(request.method, request.url);

    xhr.onload = function () {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject(JSON.parse(xhr.response).message);
      }
    };

    const optionalData = request.data;
    xhr.send(optionalData);
  });
};

const runCallBackQueue = (queueArr) => {
  if (queueArr.length < 1) {
    return undefined;
  }
  queueArr.shift()();
  runCallBackQueue(queueArr);
};


/***/ }),

/***/ "./lib/util_functions.js":
/*!*******************************!*\
  !*** ./lib/util_functions.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const stringToHtml = (string) => {
  if (string.includes("<")) {
    const stringArgArr = string.split(">")
    return document.createElement(stringArgArr[0].slice(1))
  } else {
    return false;
  }
};

const removeAllClassNames = (element) => {
  if (element.classList.length < 1) {
    return undefined
  } else {
    element.classList.remove(element.classList[0]);
    removeAllClassNames(element);
  }
};

module.exports = {
  stringToHtml: stringToHtml,
  removeAllClassNames: removeAllClassNames
};


/***/ })

/******/ });
//# sourceMappingURL=toma_todo.js.map