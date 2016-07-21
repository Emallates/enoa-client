// enoa.vanilla.js
'use strict';
(function(doc){
	var enoaclient = require('../lib/enoaclient');
	var xhrConnector = require('../lib/connectors/xhr.js');
	enoaclient.connector = xhrConnector;
	doc.enoaclient = enoaclient;
})(window || this);