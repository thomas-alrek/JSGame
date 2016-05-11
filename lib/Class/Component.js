"use strict";

function Component(options){
    var self = this;
    this.parent = undefined;
    this.__construct(this, options);
    this.onUpdate = function(){}
    this.onFixedUpdate = function(){};
    this.__update = function(JSGameEngine){
        this.onUpdate(JSGameEngine);
    };
    this.__fixedUpdate = function(JSGameEngine){
        this.onFixedUpdate(JSGameEngine);
    };
}

Component.prototype.toString = function(){
    return JSON.stringify(this);
}

Component.prototype = new Constructor();
Component.prototype.constructor = Component;