"use strict";

function Transform(options){
    this.rotation = 0;
    this.position = new Vector2();
    this.__construct(options);
    return this;
}

Transform.prototype = new JSGamePrimitive();

Transform.prototype.translate = function(vector){
    if(!(vector instanceof Vector2)){
        throw TypeError("Vector must be an instance of Vector2");
    }
    this.position.x += vector.x;
    this.position.y += vector.y;
    return this.position;  
}