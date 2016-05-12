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