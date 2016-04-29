"use strict";

function Vector2(options){
    this.x = 0;
    this.y = 0;
    this.__construct(options);
    return this;
}

Vector2.prototype = new JSGamePrimitive();