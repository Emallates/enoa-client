'use strict';
var utils = require('./utils');
var errors = require('./errors')
var collectionBase = require('./collection')

module.exports = enoaClient;

function enoaClient(opts){
	var _s = this;

	if(!opts) throw new Error('Usage: enoaClient(options). Options are missing')
	for(var i in {appId:1, apiKey:1}) if(opts[i] === undefined) throw new errors.EnoaError('Usage: enoaClient(options). \'options.'+i+'\' is missing');
	if (!(_s instanceof enoaClient)) { return new enoaClient(opts); }
	var collections = utils.popAttr(opts, 'collections');
  this.configs = opts;

  if(collections){ _s.loadCollection(collections); }
	return _s;
}

enoaClient.prototype.loadCollection = function(collections){
	var _s = this;
	for(var i in collections){
		if(!utils.isObject(collections[i])) throw new errors.EnoaError('Usage: Collection(s) must be Object/Array');
		var name = utils.getName(collections[i], i);
		if(_s[name]){ console.log(name+" skiped."); continue;}
		var newColl = collectionBase(_s, collections[i]);
		_s[name] = new newColl();
	}	
};
enoaClient.prototype._sendRequest = require('./_jsonRequest');