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
