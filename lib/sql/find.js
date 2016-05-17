var normalize= require('../utils/normalize')

module.exports = function find(values, callback) {
	callback = normalize.callback(callback, this.configs);
	if(!values) return callback('Values are missing');
	findObject.call(this, values, callback);
};

function findObject(obj, callback){
	this.adapter.find(obj, callback);
}