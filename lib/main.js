const DomNodeCollection = require("./dom_node_collection.js");
const UtilFunctions = require("./util_functions.js");

const $l = (arg) => {
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

const runCallBackQueue = (queueArr) => {
  if (queueArr.length < 1) {
    return undefined;
  }
  queueArr.shift()();
  runCallBackQueue(queueArr);
};

window.$l = $l;
