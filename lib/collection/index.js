module.exports = collectionBase;
var utils = require('../utils');
var errors = require('../errors');
function collectionBase(context, opts){
	if(!opts.adapter) throw new errors.EnoaError("collection.adapter is required");
	var adapter = utils.popAttr(opts, 'adapter');
	var connector = utils.popAttr(context.configs, 'connector');
	var allOpts = utils.clone(context.configs);
	context.configs.connector = connector;
	

	utils.extend(allOpts, opts);
	var collection = function(){
		this.adapter = new adapter(context, allOpts);
		if(this.adapter.extend != undefined) utils.extend(collection.prototype, this.adapter.extend() );
	}
	utils.extend(collection.prototype, require('../sql'));
	return collection;
}