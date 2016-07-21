'use strict';
(function($){
	var enoaclient = require('../lib/enoaclient');
	var jQueryConnector = require('../lib/connectors/jquery.js');
	enoaclient.connector = jQueryConnector;
	$.enoaclient = enoaclient;
})(jQuery || window || {});