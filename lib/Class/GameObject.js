"use strict";

function GameObject(options){
    this.components = new Object();
    this.enabled = true;
    this.width = 0;
    this.height = 0;
    this.visible = true;
    this.__update = function(){};
    this.__fixedUpdate = function(){};
    this.__init = function(){};
    this.parent = undefined;
    this.addComponent(new Transform({parent: this}), "transform");
    this.transform = this.components.transform
    this.__construct(this, options);
}

GameObject.prototype = new Constructor();
GameObject.prototype.constructor = GameObject;

GameObject.prototype.toString = function(){
    return JSON.stringify(this);
}