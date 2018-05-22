const stringToHtml = (string) => {
  if (string.includes("<")) {
    const stringArgArr = string.split(">")
    return document.createElement(stringArgArr[0].slice(1))
  } else {
    return false;
  }
};

module.exports = stringToHtml;
