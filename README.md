# tomaTodo

Javascript library for streamlining interaction and manipulation of the DOM.

## $l Function

Returns an array existing DOM element(s), selected based off html tags or css selectors, wrapped in a DomNodeCollection object with added functionality such as:  

attr() - adds an attribute to element(s),  
append() - appends html to element,  
on()/off() - adds event listeners element(s)  

Returns an array of newly created html elements wrapped in a DomNodeCollection object with the added functionality mentioned above.  

Creates a callback queue that runs once the document has finished loading.

```javascript
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
```
## $l.ajax Function

Allows for a streamlined XMLHttpRequest(XHR) created from an options object it receives.  The request is asynchronous and returns a Promise.

```javascript
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
```
