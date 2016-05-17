var normalize= require('../utils/normalize')

module.exports = function update(values, callback) {
	callback = normalize.callback(callback, this.configs);
	if(!values) return callback('Values are missing');
	updateObject.call(this, values, callback);
};

function updateObject(obj, callback){
	this.adapter.update(obj, callback);
}