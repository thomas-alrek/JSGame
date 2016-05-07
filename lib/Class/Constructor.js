"use strict";

function Constructor(onlyConstruct){
    if(onlyConstruct){
        delete this.createUUID;
        delete this.addComponent;
    }
}

Constructor.prototype.__extend = function(from, to, options){
    var proto = new from(options || undefined);
    Object.keys(proto).forEach(function(key){
        to[key] = proto[key];
    });
}

Constructor.prototype.__construct = function(obj, options){
    if(typeof options === 'undefined'){
        return;
    }
    if(typeof options === 'object'){
        Object.keys(options).forEach(function(key){
            obj[key] = options[key];
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

Constructor.prototype.addComponent = function(obj, id){
    var id = id || this.createUUID();
    if(typeof this.components !== 'undefined'){
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
        if(typeof this.gameObjects[id] !== 'undefined'){
            throw Error("GameObject already has component with id " + id);
        }
        this.gameObjects[id] = obj;
    }
    obj.parent = this;
}