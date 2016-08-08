/**
 * Zlog Example.
 * @module enoa-client-examples
 * @see module:zlogJS
 */
var client = require("../../")
var adap = require("zlogjs-adapter")

var conf = {
   appId:'app_id', apiKey:'apiKey'  
   , collections:{      
       zlog:{
           appId:'_id', apiKey:'_key',
           adapter:adap, 
           host:'localhost', port:'9000' ,
           mode:"central"
       }
   }
};
var client1 = new client(conf);
var client2 = new client(conf);

console.log(client1);
console.log(client2);