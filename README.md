#Enoa Client

[![Version][version-svg]][package-url]
[![travis-svg]][travis-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]
[![Gitter][gitter-image]][gitter-url]
[![StackVverflow][stackoverflow-image]][stackoverflow-url]


[version-svg]: https://img.shields.io/npm/v/enoa-client.svg?style=flat-square
[travis-svg]: https://img.shields.io/travis/Emallates/enoa-client/master.svg?style=flat-square
[travis-url]: https://api.travis-ci.org/Emallates/enoa-client.svg?branch=master
[package-url]: https://npmjs.org/package/enoa-client
[license-image]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: LICENSE.txt
[downloads-image]: https://img.shields.io/npm/dm/enoa-client.svg?style=flat-square
[downloads-url]: http://npm-stat.com/charts.html?package=enoa-client
[gitter-image]: https://badges.gitter.im/Emallates/enoa-client.svg
[gitter-url]: https://gitter.im/Emallates/enoa-client?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge
[stackoverflow-image]: https://img.shields.io/badge/stackoverflow-enoaclient-blue.svg
[stackoverflow-url]: http://stackoverflow.com/questions/tagged/enoaclient 


## Overview

The enoa-client is a universal JavaScript client, which enables in combination with an ADAPTER, Client-Server Side communications. Recommended Use Cases are e.g the use of web services(fallback, retry, CDN, timeout strategies thus minimizing bottlenecks for High-Availablity on the client-side). The modular structure includes the options of server-sided(Node.JS) as well as browser-sided(Vanilla, jQuery, AngularJS) client implementations. Recommended adapters can be found at [Emallates](https://github.com/Emallates "Emallates").

Please feel free to use our adapter examples as the structure for your own customized adapters! Recommendations and improvement hints concerning the structure of the enoa-client and the adapters , therefore, are always very welcome!

#### Community Adapters

  - Server-side
  	* [NodeJS](https://www.npmjs.com/package/zlogjs-adapter "https://www.npmjs.com/package/zlogjs-adapter")
  - Client-side
	* [VanillaJS](https://cdn.jsdelivr.net/enoaclient.vanilla/0.0.8/enoaclient.vanilla.min.js "https://cdn.jsdelivr.net/enoaclient.vanilla/0.0.8/enoaclient.vanilla.min.js")
	* [jQueryJS ](https://cdn.jsdelivr.net/enoaclient.jquery/0.0.8/enoaclient.jquery.min.js "https://cdn.jsdelivr.net/enoaclient.jquery/0.0.8/enoaclient.jquery.min.js")
	* [AngularJS](https://cdn.jsdelivr.net/enoaclient.angualr/0.0.8/enoaclient.angualr.min.js "https://cdn.jsdelivr.net/enoaclient.angualr/0.0.8/enoaclient.angualr.min.js")

## Installation

Several installation options are available:
  
- [Download the latest release](https://github.com/Emallates/enoa-client/archive/master.zip).
- Install with [npm](https://www.npmjs.com/package/enoa-client) ``` npm install enoa-client ```
- Install with [bower](https://www.bower.io) ``` bower install enoa-client ```


#Usage

####Server side NodeJS ( example with ZLogJS-Adapter )
    var enoaClient = require('enoa-client');
    var zlogjsAdapter = require('zlogjs-adapter');
    var configs = {
	port:'9000',
	mode:"central",
	host:'localhost', 
	appId:'your-appid',
	apiKey:'your-apiKey',
	adapter:zlogjsAdapter
    }
    enoaClient = enoaClient({ appId:'appId', apiKey:'apiKey', collections:{zlog:configs}});



####VanilaJS

	<script type="text/javascript" src="path/to/enoaclient.vanilla.min.js"></script>
	<script type="text/javascript">
		var enoaClient = windos.enoaclient(options)
	</script>
####jQuery

	<script type="text/javascript" src="path/to/jquery.js"></script>
	<script type="text/javascript" src="path/to/enoaclient.jquery.min.js"></script>
	<script type="text/javascript">
		var enoaClient = jQuery.enoaClient(options);
	</script>

####AngularJS

This package will use [$http](https://docs.angularjs.org/api/ng/service/$http) for HTTP communication.

	<script type="text/javascript" src="path/to/angular.js"></script>
	<script type="text/javascript" src="path/to/enoaclient.angular.min.js"></script>
	<script type="text/javascript">
		var app = angular.module('app', ['enoa'])
		app.service('client', ['enoaclient', function(enoaclient){
			return enoaclient({appId:"_appId", apiKey:"_apiKey"})
		}]);
		app.controller('ctrl', ['client', '$scope', function(client, $scope){
			// Now you can use client service anywaher in your project
		}]);
	</script>

##CONTRIBUTION
Please read through our contributing [guidelines](https://github.com/Emallates/enoa-client/blob/master/CONTRIBUTING.md). Included are directions for opening issues, coding standards, and notes on development.

####Build from source
1. clone git repository ``` git clone https://github.com/Emallates/enoa-client.git ```
2. Run `npm install`
3. Run `npm run build`

####Tests
Coming soon

#Community
 - [Gitter](https://gitter.im/Emallates/enoa-client?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge "Live chat")
 - [StackOverflow](http://stackoverflow.com/questions/tagged/enoaclient "Ask Questions")
 - [Github](https://github.com/Emallates/enoa-client/issues "Open an issue")

#Copyright and license

Code and documentation copyright 2011-2016 Emallates, Inc. Code released under the MIT license. Docs released under Creative Commons.

