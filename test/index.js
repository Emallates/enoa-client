var client = require('../');
client.connector = require('../lib/connectors/http.js');

var v = new client({appId:"_appid", apiKey:"_apikey"});
v._sendRequest({
	method:"PUT",
	url:"http://localhost:3000/logs/12"
	, body:{
		name:"Nauman Ramzan", add:"Mandiala tegha"
	}
}, function(err, resp){
	console.log(err, resp);
});