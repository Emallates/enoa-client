var normalize= require('../utils/normalize')

module.exports = function create(values, callback) {
	callback = normalize.callback(callback, this.configs);
	if(!values) return callback('Values are missing');
	createObject.call(this, values, callback);
};

function createObject(obj, callback){
	/*Client level validation*/
	obj.clientid = 123;

	/*Forword this call to adapter*/
	this.adapter.create(obj, callback);
	// return callback(null, obj);
}