'use strict';
(function(window){
    var enoaclient = require('./lib/enoaclient');
    if ( typeof module === 'object' && module && typeof module.exports === 'object' ) {
        module.exports = enoaclient;
    } else {
        window.enoaclient = enoaclient;
    }
})( this );