const UtilFunctions = require("./util_functions.js");

class DomNodeCollection {
  constructor(htmlElements) {
    this.elements = htmlElements;
  }
};

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


module.exports = DomNodeCollection;
