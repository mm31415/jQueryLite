const UtilFunctions = require("./util_functions.js");

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
