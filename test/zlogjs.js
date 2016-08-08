var exec = require('easy-mocha')
var client = require('../')
var zlogjsAdapter = require('zlogjs-adapter');
var HttpConnector = require('../lib/connectors/http.js');

var _cnf = {
	port:'9000',
	mode:"central",
	host:'localhost', 
	appId:'your-appid',
	apiKey:'your-apiKey',
	adapter:zlogjsAdapter
}
var defConf = { appId:'appId', apiKey:'apiKey', collections:{zlog:_cnf}};
function getClient(){ return client(defConf); }


var tests = {
	ttl:"Enoa-client Server side tests Zglog",
	cases:[
	{ttl:'Create client without adapter', opr:'equal', create:getClient, rslt:1, cmp:function(clientObj, model){ return clientObj instanceof client; }},
	{ttl:'Validate default configs',      opr:'equal', create:getClient, rslt:1, cmp:function(clientObj, model){ return clientObj.configs.appId == defConf.appId && clientObj.configs.apiKey == defConf.apiKey ; }},
	{ttl:'Validate connector',            opr:'equal', create:getClient, rslt:1, cmp:function(clientObj, model){ return clientObj.configs.connector instanceof HttpConnector; }},
	{ttl:'Validate zlog instance',        opr:'equal', create:getClient, rslt:1, cmp:function(clientObj, model){ return clientObj.zlog != undefined; }},
	{ttl:'Validate zlog configs',         opr:'equal', create:getClient, rslt:1, cmp:function(clientObj, model){ return clientObj.zlog.adapter.configs.appId == _cnf.appId && clientObj.zlog.adapter.configs.apiKey == _cnf.apiKey; }},
	]
}

exec(tests)