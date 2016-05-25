// 'use strict';
// (function(window){
//     var enoaclient = require('./lib/enoaclient');
//     if ( typeof module === 'object' && module && typeof module.exports === 'object' ) {
//         module.exports = enoaclient;
//     } else {
//         window.enoaclient = enoaclient;
//     }
// })( this );

var connector = require('./lib/connectors/http.js')
var client = require('./lib/enoaclient');
client.connector = connector;
module.exports = client;