"use strict";

function Component(options){
    this.parent = undefined;
    this.__construct(this, options);
}

Component.prototype.toString = function(){
    return JSON.stringify(this);
}

Component.prototype = new Constructor();
Component.prototype.constructor = Component;