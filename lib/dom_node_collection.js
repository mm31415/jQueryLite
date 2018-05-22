const stringToHtml = require("./util_functions.js");

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


module.exports = DomNodeCollection;
