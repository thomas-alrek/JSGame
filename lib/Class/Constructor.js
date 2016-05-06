"use strict";

function Constructor(){}

Constructor.prototype.__construct = function(options){
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

Constructor.prototype.createUUID = function (delim) {
    var delim = delim || "-";
    function rnd() {
        return (((1 + Math.random() * new Date().getTime()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (rnd() + rnd() + delim + rnd() + delim + rnd() + delim + rnd() + delim + rnd() + rnd() + rnd());
};

Constructor.prototype.add = function(obj, id){
    var id = id || this.createUUID();
    if(this.hasOwnProperty('components')){
        //GameObject
        if(!(obj instanceof Component)){
            throw TypeError("Object not an instance of Component");
        }
        if(typeof this.components[id] !== 'undefined'){
            throw Error("GameObject already has component with id " + id);
        }
        this.components[id] = obj;        
    }else{
        //JSGameEngine
        if(!(obj instanceof GameObject)){
            throw TypeError("Object not an instance of GameObject");
        }
        if(typeof this.objects[id] !== 'undefined'){
            throw Error("GameObject already has component with id " + id);
        }
        this.objects[id] = obj;
    }
}