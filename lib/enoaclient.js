'use strict';
var utils = require('./utils')
	, errors = require('./errors')
	, collectionBase = require('./collection')

module.exports = enoaClient;

function enoaClient(opts){
	var _s = this;
	if(!opts) throw new Error('Usage: enoaClient(options). Options are missing')
	for(var i in {appId:1, apiKey:1}) if(opts[i] === undefined) throw new errors.EnoaError('Usage: enoaClient(options). \'options.'+i+'\' is missing');
	if (!(_s instanceof enoaClient)) { return new enoaClient(opts); }
	opts = utils.clone(opts);
	var collections = utils.popAttr(opts, 'collections');
  opts.connector = opts.connector || enoaClient.connector;
  // opts.connector = new opts.connector(opts);
  
  this.configs = opts;
  // opts.connector.getRequestFun();
  // enoaClient.prototype._sendRequest = new transporter(opts);
  // if(!opts.connector) throw new errors.EnoaError('Invalid connector is defined in client.');
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
// enoaClient.prototype._sendRequest = function () {
// 	throw new Error("This method should owerwritten by client's connector.");
// }