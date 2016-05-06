"use strict";

function Physics2D(options){
    var self = this;
    this.gravity = new Vector2({y: 9.81, parent: this});
    this.velocity = new Vector2({parent: this});
    this.fixedUpdate = function(timestamp){
        return self.addForce(self.gravity.multiply(timestamp * 10));
    }
    this.addForce = function(force){
        if(!(force instanceof Vector2)){
            throw TypeError("Force must be an instance of Vector2");
        }
        self.velocity.add(force);
        return self.velocity;
    }
    this.__construct(options);
}

Physics2D.prototype = new Component();