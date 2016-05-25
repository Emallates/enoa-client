var client = require("../../")
var adap = require("zglog-adapter")

// client.connector = require('../lib/connectors/http.js');
client = new client({appId:"_appid", apiKey:"_apikey", collections:{zj:{adapter:adap, host:'192.168.0.5'}}});

console.log(client);


client.zj.find({}, function(err, resp){
	console.log('err', err, 'resp', resp);
})