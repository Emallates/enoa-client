var asyncDefault = !(navigator && /PhantomJS/i.test(navigator.userAgent));
function xhrConnector (configs){
	var _s = this;
	if (typeof XMLHttpRequest !== 'undefined') {
		_s.getXhr = function () { return new XMLHttpRequest(); };
	}

  _s.defHeaders = { "Content-Type":"application/json" }
  // else {TODO:- resolve }
}
xhrConnector.prototype.getRequestFun = function(){
  var _s = this;
	return function (params, callback) {
    var xhr = _s.getXhr();
    var timeoutId;
    var url = params.url;
    var headers = params.headers || {};
    for(var i in _s.defHeaders) if(headers[i] === void 0) headers[i] = _s.defHeaders[i];
    var async = params.async === false ? false : asyncDefault;

    xhr.open(params.method || 'GET', url, async);
    if (headers) {
      for (var key in headers) {
        if (headers[key] !== void 0) {
          xhr.setRequestHeader(key, headers[key]);
        }
      }
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        clearTimeout(timeoutId);
        var err = xhr.status ? void 0 : new TypeError(xhr.statusText || 'Request failed to complete.');
        callback(err, JSON.parse(xhr.responseText), xhr.status);
      }
    };

    xhr.send(JSON.stringify(params.body || {}));

    return function(){ xhr.abort(); };
  }
}

module.exports = xhrConnector;