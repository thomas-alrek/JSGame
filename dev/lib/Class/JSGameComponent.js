"use strict";

function JSGameComponent(){}

JSGameComponent.prototype.__construct = function(options){
    var self = this;
    if(typeof options === 'undefined'){
        return;
    }
    if(typeof options === 'object'){
        Object.keys(options).forEach(function(key){
            self[key] = options[key];
        });
    }else{
        throw TypeError("Options must be an Object literal");
    }
}

JSGameComponent.prototype.toString = function(){
    return JSON.stringify(this);
}