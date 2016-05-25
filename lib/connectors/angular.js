function AngularConnector(configs){
	var _s = this;
	_s.toJson = configs.toJson;
	configs.$injector.invoke(['$http', '$q', function($http, $q){
		_s.$q = $q;
		_s.$http = $http;
	}])
}

AngularConnector.prototype.getRequestFun = function(){
	var _s = this;
	return function requester(params, cb){
		var abort = _s.$q.defer();
		_s.$http({
			method: params.method,
			url: params.url,
			data: _s.toJson(params.body),
			cache: false,
			headers: params.headers,
			transformRequest: [],
			transformResponse: [],
			timeout: abort.promise
		}).then(function (response) {
			cb(null, response.data, response.status, response.headers());
		}, function (err) {
			if (err.status) {
				cb(null, err.data, err.status, err.headers());
			} else {
				cb(err);
			}
		});

		return function () {
			abort.resolve();
		};
	}
}

module.exports = AngularConnector;
