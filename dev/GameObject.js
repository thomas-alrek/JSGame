"use strict";

function GameObject(options){
    this.width = 0;
    this.height = 0;
    this.visible = true;
    this.update = function(){};
    this.fixedUpdate = function(){};
    this.transform = new Transform();
    this.__construct(options);
    return this;
}

GameObject.prototype = new JSGamePrimitive();