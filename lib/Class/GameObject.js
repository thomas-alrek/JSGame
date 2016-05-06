"use strict";

function GameObject(options){
    this.components = new Object();
    this.width = 0;
    this.height = 0;
    this.visible = true;
    this.update = function(){};
    this.fixedUpdate = function(){};
    this.components.transform = new Transform({parent: this});
    this.transform = this.components.transform;
    this.parent = undefined;
    this.__construct(options);
}

GameObject.prototype = new Constructor();

GameObject.prototype.toString = function(){
    return JSON.stringify(this);
}