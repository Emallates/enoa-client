var _ = require('./utils')
var errors = require('./errors')
module.exports = requestTransporter;

function requestTransporter(context, options) {

	this.context = context;

	this.opts = _.extend({
		useFallback:false,
		tries:0,
		maxTries:3,
		timeout:2000,
	}, (options||{}))
}

requestTransporter.prototype._jsonRequest = function(initOpts) {
	var tries = 0;
	var _reqOpts = {
		url:initOpts.url,
		body:initOpts.body,
		method:initOpts.method,
		params:initOpts.params,
		hearder:initOpts.hearder
	}

	return doRequest(this.context.connector.request, _reqOpts)

	
	function doRequest(requester, reqOpts, addOpts) {
		try{
			requester.call(this, reqOpts, callDone, addOpts)
		}catch(exp){
			return sendResp(exp);
		}
	}

	function callDone(err, resp) {
		if(err){
			//TODO:- this.opts.useFallback => tryFallback
			return sendResp(err);
		}
		return sendResp(null, resp);

	}

	function sendResp(err, resp) {
		return (initOpts.callback) ? initOpts.callback(err, resp) : err || resp;
	}

	function tryFallback(err) {
		var shouldRetry = Math.floor(err.status % 100) !== 4;
		if( shouldRetry && this.opts.useFallback && this.hasFallback ){
			tries += 1;
			var fallbackOpts = ( _.isFunction(this.context.adapter.getRetryOpts) )
				? this.context.adapter.getRetryOpts( _reqOpts, {tries:tries, timeout:(this.opts.timeout*tries)} )
				: _reqOpts;
			doRequest(this.context.adapter.fallback, fallbackOpts, callDone)
		}
	}
	// return initOpts.callback ? initOpts.callback(null, initOpts) : initOpts;
};