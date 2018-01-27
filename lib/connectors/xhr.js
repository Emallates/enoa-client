'use strict';
var asyncDefault = !(navigator && /PhantomJS/i.test(navigator.userAgent));
function createXHR_Connector (configs){
  
  return new xhrConnector(configs);


  function xhrConnector(/*conf*/) {
    var _s = this;
    var support = {
      // hasXMLHttpRequest: 'XMLHttpRequest' in global,
      // hasXDomainRequest: 'XDomainRequest' in global
    };

    try{
      var test = new XMLHttpRequest();
      support.hasXMLHttpRequest = true;
      support.cors = 'withCredentials' in new XMLHttpRequest();
      support.timeout = 'timeout' in new XMLHttpRequest();

      _s.getXhr = function () { return new XMLHttpRequest(); };
    }catch(exp){
      support.XDomainRequest = true;
      _s.getXhr = function () { return new XDomainRequest(); };
    }

    _s.defHeaders = { "Content-Type":"application/json" }    
    

    _s.request = function(reqOpts, callback) {
      
      var xhr = _s.getXhr();
      var timeoutId;
      var url = reqOpts.url;
      var headers = reqOpts.headers || {};
      for(var i in _s.defHeaders) if(headers[i] === void 0) headers[i] = _s.defHeaders[i];
      var async = reqOpts.async === false ? false : asyncDefault;

      xhr.open(reqOpts.method || 'GET', url, async);
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

      if(reqOpts.body) xhr.send(JSON.stringify(reqOpts.body || {}));

      return function(){ xhr.abort(); }

    };

    _s.fallback = function (reqOpts, callback, meta) {
      
    }

  }


}


module.exports = createXHR_Connector;