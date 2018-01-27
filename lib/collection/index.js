module.exports = collectionBase;
var utils = require('../utils')
	, errors = require('../errors')
	, transporter = require('../transporter')
function collectionBase(context, opts){
	if(!opts.adapter) throw new errors.EnoaError("collection.adapter is required");
	var adapter = utils.popAttr(opts, 'adapter');
	adapter = getAdapter(adapter);
	var connector = utils.popAttr(context.configs, 'connector');
	var allOpts = utils.clone(context.configs);
	context.configs.connector = connector;
	

	utils.extend(allOpts, opts);
	var collection = function(){
		this.connector = new connector(opts);
		this.adapter = new adapter(context, allOpts);
		this.transporter = new transporter(this, opts)
		this._sendRequest = function (reqOpts) {
			return this.transporter._jsonRequest(reqOpts)
		}
		if(this.adapter.extend != undefined) utils.extend(collection.prototype, this.adapter.extend() );
	}
	utils.extend(collection.prototype, require('../sql'));
	return collection;
}

function getAdapter(adapter) {
	try {
		switch (utils.type(adapter)) {
			case 'String': return require(adapter);
			case 'Function': return adapter;
			default: 
				throw new Error('Invalid Adapter' + adapter);
		}
	}catch(exp) {
		throw new Error('Invalid Adapter' + adapter);
	}
}