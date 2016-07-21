'use strict';

var enoaclient = require('../lib/enoaclient');
var jQueryConnector = require('../lib/connectors/angular.js');
enoaclient.connector = jQueryConnector;


angular.module('enoa', [])
.factory('enoaclient', ['$injector', '$q', function($injector, $q){
	var factory = function (config) {
		config = config || {};
		// config.connectionClass = AngularConnector;
		config.$injector = $injector;
		config.toJson = angular.toJson;
		config.defer = function () {
			return $q.defer();
		};
		// config.serializer = config.serializer || 'angular';
		return new enoaclient(config);
	};

	return factory;
}])