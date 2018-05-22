const DomNodeCollection = require("./dom_node_collection.js");
const UtilFunctions = require("./util_functions.js");

const $l = (arg) => {
  const elArg = UtilFunctions.stringToHtml(arg);
  if (elArg instanceof HTMLElement) {
    htmlArr = [];
    htmlArr.push(elArg);
    return new DomNodeCollection(htmlArr);
  } else if (typeof arg === 'string') {
    nodeList = document.querySelectorAll(arg);
    nodeArr = Array.from(nodeList);
    return new DomNodeCollection(nodeArr);
  }
};

window.$l = $l;
