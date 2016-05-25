(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
// enoa.vanilla.js
'use strict';
(function(doc){
	var enoaclient = require('./lib/enoaclient');
	var xhrConnector = require('./lib/connectors/xhr.js');
	enoaclient.connector = xhrConnector;
	doc.enoaclient = enoaclient;
})(window || this);
},{"./lib/connectors/xhr.js":4,"./lib/enoaclient":5}],3:[function(require,module,exports){
module.exports = collectionBase;
var utils = require('../utils');
var errors = require('../errors');
function collectionBase(context, opts){
	if(!opts.adapter) throw new errors.EnoaError("collection.adapter is required");
	var adapter = utils.popAttr(opts, 'adapter');
	var allOpts = utils.clone(context.configs);
	utils.extend(allOpts, opts);
	var collection = function(){
		this.adapter = new adapter(context, allOpts);
		if(this.adapter.extend != undefined) utils.extend(collection.prototype, this.adapter.extend() );
	}
	utils.extend(collection.prototype, require('../sql'));
	return collection;
}
},{"../errors":6,"../sql":8,"../utils":9}],4:[function(require,module,exports){
var asyncDefault = !(navigator && /PhantomJS/i.test(navigator.userAgent));
function xhrConnector (configs){
	var _s = this;
	if (typeof XMLHttpRequest !== 'undefined') {
		_s.getXhr = function () { return new XMLHttpRequest(); };
	}

  _s.defHeaders = {
    // "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"
    "Content-Type":"application/json"
  }
  // else {TODO:- resolve }
}
xhrConnector.prototype.getRrequestFun = function(){
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
},{}],5:[function(require,module,exports){
'use strict';
var utils = require('./utils');
var errors = require('./errors')
var collectionBase = require('./collection')

module.exports = enoaClient;

function enoaClient(opts){
	var _s = this;

	if(!opts) throw new Error('Usage: enoaClient(options). Options are missing')
	for(var i in {appId:1, apiKey:1}) if(opts[i] === undefined) throw new errors.EnoaError('Usage: enoaClient(options). \'options.'+i+'\' is missing');
	if (!(_s instanceof enoaClient)) { return new enoaClient(opts); }
	var collections = utils.popAttr(opts, 'collections');
  this.configs = opts;
  opts.connector = opts.connector || enoaClient.connector;
  opts.connector = new opts.connector(opts);
  enoaClient.prototype._sendRequest = opts.connector.getRrequestFun();
  if(!opts.connector) throw new errors.EnoaError('Invalid connector is defined in client.');
  if(collections){ _s.loadCollection(collections); }

	return _s;
}

enoaClient.prototype.loadCollection = function(collections){
	var _s = this;
	for(var i in collections){
		if(!utils.isObject(collections[i])) throw new errors.EnoaError('Usage: Collection(s) must be Object/Array');
		var name = utils.getName(collections[i], i);
		if(_s[name]){ console.log(name+" skiped."); continue;}
		var newColl = collectionBase(_s, collections[i]);
		_s[name] = new newColl();
	}	
};
enoaClient.prototype._sendRequest = function () {
	throw new Error("This method should owerwritten by client itself.");
}
},{"./collection":3,"./errors":6,"./utils":9}],6:[function(require,module,exports){
var inherits = require('inherits');

function EnoaError(message, extraProperties) {
  var forEach = require('foreach');

  var error = this;

  // try to get a stacktrace
  if (typeof Error.captureStackTrace === 'function') {
    Error.captureStackTrace(this, this.constructor);
  } else {
    error.stack = (new Error()).stack || 'Cannot get a stacktrace, browser is too old';
  }

  this.name = this.constructor.name;
  this.message = message || 'Unknown error';

  if (extraProperties) {
    forEach(extraProperties, function addToErrorObject(value, key) {
      error[key] = value;
    });
  }
}

inherits(EnoaError, Error);

function createCustomError(name, message) {
  function EnoaCustomError() {
    var args = Array.prototype.slice.call(arguments, 0);

    // custom message not set, use default
    if (typeof args[0] !== 'string') {
      args.unshift(message);
    }

    EnoaError.apply(this, args);
    this.name = 'Enoa' + name + 'Error';
  }

  inherits(EnoaCustomError, EnoaError);

  return EnoaCustomError;
}

// late exports to let various fn defs and inherits take place
module.exports = {
  EnoaError: EnoaError,
  UnparsableJSON: createCustomError(
    'UnparsableJSON',
    'Could not parse the incoming response as JSON, see err.more for details'
  ),
  RequestTimeout: createCustomError(
    'RequestTimeout',
    'Request timedout before getting a response'
  ),
  Network: createCustomError(
    'Network',
    'Network issue, see err.more for details'
  ),
  JSONPScriptFail: createCustomError(
    'JSONPScriptFail',
    '<script> was loaded but did not call our provided callback'
  ),
  JSONPScriptError: createCustomError(
    'JSONPScriptError',
    '<script> unable to load due to an `error` event on it'
  ),
  Unknown: createCustomError(
    'Unknown',
    'Unknown error occured'
  )
};

},{"foreach":13,"inherits":14}],7:[function(require,module,exports){
var normalize= require('../utils/normalize')

module.exports = function create(values, callback) {
	callback = normalize.callback(callback, this.configs);
	if(!values) return callback('Values are missing');
	createObject.call(this, values, callback);
};

function createObject(obj, callback){
	/*Client level validation*/
	obj.clientid = 123;

	/*Forword this call to adapter*/
	this.adapter.create(obj, callback);
	// return callback(null, obj);
}
},{"../utils/normalize":10}],8:[function(require,module,exports){
module.exports = {
	create:require('./create')
};


},{"./create":7}],9:[function(require,module,exports){
var _u = module.exports;

_u.toString = function toString(val){ return Object.prototype.toString.call(val); }
_u.isObject = function isObject(obj){ return _u.toString(obj) === "[object Object]"; }
_u.getName = function getName(opts, def){ def = def || "unknown"; return opts.identity || opts.name || opts.id || def; }
_u.popAttr = function popAttr(obj, attr){ var val = obj[attr]; delete obj[attr]; return val;}
_u.clone = function popAttr(obj){ return JSON.parse(JSON.stringify(obj)); }
_u.extend = require('extend') || function popAttr(dest, src){ for(var i in src) if(typeof dest[i] === undefined) dest[i] = src[i]; }
},{"extend":12}],10:[function(require,module,exports){
var _cb = require('cb');
var normalize = {};
var toString = Object.prototype.toString;
function noop(){ console.log('noop called with ', arguments);};
normalize.callback = function callbackNormalize(cb, cnf) { cnf = cnf || {};
	cb = (toString.call(cb) === '[object Function]') ? cb : noop; cb = _cb(cb);
	if(cnf.timeout) cb = cb.timeout(cnf.timeout)
	return cb;
}



module.exports = normalize;
},{"cb":11}],11:[function(require,module,exports){
(function (process){
module.exports = function(callback) {

	var cb = function() {
		if (timedout || (once && count)) return;
		count += 1;
		tid && clearTimeout(tid);

		var args = Array.prototype.slice.call(arguments);
		process.nextTick(function() {
			if (!errback) return callback.apply(this, args);
			args[0] ? errback(args[0]) : callback.apply(this, args.slice(1));
		});

	}, count = 0, once = false, timedout = false, errback, tid;

	cb.timeout = function(ms) {
		tid && clearTimeout(tid);
		tid = setTimeout(function() {
			cb(new TimeoutError(ms));
			timedout = true;
		}, ms);
		return cb;
	};

	cb.error = function(func) { errback = func; return cb; };

	cb.once = function() { once = true; return cb; };

	return cb;

};

var TimeoutError = module.exports.TimeoutError = function TimeoutError(ms) {
	this.message = 'Specified timeout of ' + ms + 'ms was reached';
	Error.captureStackTrace(this, this.constructor);
};
TimeoutError.prototype = new Error;
TimeoutError.prototype.constructor = TimeoutError;
TimeoutError.prototype.name = 'TimeoutError';
}).call(this,require('_process'))
},{"_process":1}],12:[function(require,module,exports){
'use strict';

var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;

var isArray = function isArray(arr) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(arr);
	}

	return toStr.call(arr) === '[object Array]';
};

var isPlainObject = function isPlainObject(obj) {
	if (!obj || toStr.call(obj) !== '[object Object]') {
		return false;
	}

	var hasOwnConstructor = hasOwn.call(obj, 'constructor');
	var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) {/**/}

	return typeof key === 'undefined' || hasOwn.call(obj, key);
};

module.exports = function extend() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0],
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if (typeof target === 'boolean') {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	} else if ((typeof target !== 'object' && typeof target !== 'function') || target == null) {
		target = {};
	}

	for (; i < length; ++i) {
		options = arguments[i];
		// Only deal with non-null/undefined values
		if (options != null) {
			// Extend the base object
			for (name in options) {
				src = target[name];
				copy = options[name];

				// Prevent never-ending loop
				if (target !== copy) {
					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = extend(deep, clone, copy);

					// Don't bring in undefined values
					} else if (typeof copy !== 'undefined') {
						target[name] = copy;
					}
				}
			}
		}
	}

	// Return the modified object
	return target;
};


},{}],13:[function(require,module,exports){

var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

module.exports = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};


},{}],14:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}]},{},[2]);
