const DomNodeCollection = require("./dom_node_collection.js");
const UtilFunctions = require("./util_functions.js");

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
      debugger
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.response));
      } else {
        debugger
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

window.$l = $l;
