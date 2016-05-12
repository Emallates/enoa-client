var _u = module.exports;

_u.toString = function toString(val){ return Object.prototype.toString.call(val); }
_u.isObject = function isObject(obj){ return _u.toString(obj) === "[object Object]"; }
_u.getName = function getName(opts, def){ def = def || "unknown"; return opts.identity || opts.name || opts.id || def; }
_u.popAttr = function popAttr(obj, attr){ var val = obj[attr]; delete obj[attr]; return val;}
_u.clone = function popAttr(obj){ return JSON.parse(JSON.stringify(obj)); }
_u.extend = require('extend') || function popAttr(dest, src){ for(var i in src) if(typeof dest[i] === undefined) dest[i] = src[i]; }