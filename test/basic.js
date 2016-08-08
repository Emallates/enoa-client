var HttpConnector = require('../lib/connectors/http.js');
var exec = require('easy-mocha')
var client = require('../')
var defConf = { appId:'client-appId', apiKey:'client-apiKey'};
/* Simple Example*/

var tests = {
	ttl:"Enoa-client Server side tests Basic",
	cases:[
		{ttl:'Create client without adapter', opr:'equal', create:function(){ return client(defConf); }, rslt:1, cmp:function(clientObj, model){ return clientObj instanceof client; }},
		{ttl:'Validate default configs', opr:'equal', create:function(){ return client(defConf); }, rslt:1, cmp:function(clientObj, model){ return clientObj.configs.appId == defConf.appId && clientObj.configs.apiKey == defConf.apiKey ; }},
		{ttl:'Validate connector', opr:'equal', create:function(){ return client(defConf); }, rslt:1, cmp:function(clientObj, model){ return clientObj.configs.connector instanceof HttpConnector; }},
	]
}

exec(tests)