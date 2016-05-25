function jQueryConnector(configs){this.configs = configs;}
jQueryConnector.prototype.getRequestFun = function(params, cb) {
	return function(params, cb) {
		var ajax = {
			url: params.url,
			data: params.body,
			type: params.method,
			dataType: 'text',
			headers: params.headers,
			done: cb
		};

		var jqXHR = jQuery.ajax(ajax)
		.done(function (data, textStatus, jqXHR) {
			cb(null, data, jqXHR.statusCode(), {
				'content-type': jqXHR.getResponseHeader('content-type')
			});
		})
		.fail(function (jqXHR, textStatus, err) { cb(err && err.message); });

		return function () {
			jqXHR.abort();
		};
	}
}

module.exports = jQueryConnector;