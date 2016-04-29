"use strict";

function Physics2D(options){
    var self = this;
    this.velocity = new Vector2();
    this.addForce = function(force){
        if(!(force instanceof Vector2)){
            throw TypeError("Force must be an instance of Vector2");
        }
        self.velocity.x += force.x;
        self.velocity.y += force.y;
        return;
    }
    this.__construct(options);
    return this;
}

Physics2D.prototype = new JSGamePrimitive();