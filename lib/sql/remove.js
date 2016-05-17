var normalize= require('../utils/normalize')

module.exports = function remove(values, callback) {
	callback = normalize.callback(callback, this.configs);
	if(!values) return callback('Values are missing');
	removeObject.call(this, values, callback);
};

function removeObject(obj, callback){
	this.adapter.remove(obj, callback);
}