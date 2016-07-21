'use strict';

var http = require('http');
var url = require('url');
function parse(obj){try{return JSON.parse(obj); }catch(e){ console.log('can not parse'); return obj; } }

function HttpConnector(configs) {
	this.configs = configs;
}
HttpConnector.prototype.getRequestFun = function(){
	var _s = this;
	return function request(params, cb) {
		var parts = url.parse(params.url);
		var opts = { headers:{ 'Content-Type': 'application/json' } };
		if(params.headers) for(var i in params.headers) opts.headers[i] = params.headers[i];
		opts.method = params.method || "GET";
		for(var i in {path:1, port:1, hostname:1, protocol:1}) if(parts[i] != undefined) opts[i] = parts[i];
		if(['http:', 'https:'].indexOf(opts.protocol) == -1)opts.protocol = 'http:';
		var RESULT = "";
		var req = http.request(opts, function(res){
			res.setEncoding('utf8');
			res.on('data', function (body){ if(body) RESULT+=body; });
			res.on('end', function (body){ if(body) RESULT+=body; return cb(null,parse(RESULT)); });
		});
		
		req.on('error', function(e) { return cb(e.message || e); });
		if(params.body) req.write(JSON.stringify(params.body));
		req.end();
	}
}

module.exports = HttpConnector;