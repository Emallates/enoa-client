'use strict';
var _ = module.exports;

_.type = function toString(val){ return Object.prototype.toString.call(val).replace(/\[object |\]/g, ''); }
Array('Object', 'Array', 'Function', 'String', 'Undefined', 'Null').forEach(function(type){
	_['is'+type] = function (val) { return _.type(val) == type; }
})
// _.isObject = function isObject(obj){ return _.type(obj) == "Object"; }
_.toString = function toString(val){ return Object.prototype.toString.call(val); }
_.getName = function getName(opts, def){ def = def || "unknown"; return opts.identity || opts.name || opts.id || def; }
_.popAttr = function popAttr(obj, attr){ var val = obj[attr]; delete obj[attr]; return val;}
_.extend = require('extend') || function popAttr(dest, src){ for(var i in src) if(typeof dest[i] === undefined) dest[i] = src[i]; }
_.clone =  require('clone') || function popAttr(obj, deep){ if(!deep) return JSON.parse(JSON.stringify(obj)); return _.extend({}, obj); }