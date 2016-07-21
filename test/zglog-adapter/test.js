var client = require("../../")
var adap = require("zlogjs-adapter")

// client.connector = require('../lib/connectors/http.js');

var conf = {
   appId:'app_id', apiKey:'apiKey'  
   , collections:{      
       zlog:{
           appId:'_id', apiKey:'_key',
           adapter:require('zlogjs-adapter'), 
           host:'localhost', port:'9000' ,
           mode:"central"
       }
   }
};
// client = new client({appId:"_appid", apiKey:"_apikey", collections:{zj:{adapter:adap, host:'192.168.0.5'}}});
var client1 = new client(conf);
var client2 = new client(conf);
console.log(client1);
console.log(client2);


// client.zj.find({}, function(err, resp){
// 	console.log('err', err, 'resp', resp);
// })