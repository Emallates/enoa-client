var request = require('request');
function nodeConnector (configs){}
nodeConnector.prototype.getRequestFun = function(){
	return function(obj, callback){
		var req = {
			form:obj.body,
			headers:obj.headers,
			url:(obj.url || obj.uri),
			method:obj.method && obj.method.toLowerCase()
		};
		return request(req, function(err, resp, body){ return callback(err, body && JSON.parse(body)); });
	};	
}


module.exports = nodeConnector;


