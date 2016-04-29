"use strict";

function Transform(options){
    this.rotation = 0;
    this.position = new Vector2();
    this.__construct(options);
    return this;
}

Transform.prototype = new JSGamePrimitive();