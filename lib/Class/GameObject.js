"use strict";

function GameObject(options){
    this.components = {};
    this.width = 0;
    this.height = 0;
    this.visible = true;
    this.update = function(){};
    this.fixedUpdate = function(){};
    this.components.transform = new Transform({parent: this});
    this.transform = this.components.transform;
    this.parent = undefined;
    this.__construct(options);
    return this;
}

GameObject.prototype = new Constructor();