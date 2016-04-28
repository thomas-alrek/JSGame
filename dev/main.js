"use strict";

Object.prototype.__construct = function(options){
    var _this = this;
    if(typeof options === 'undefined'){
        return;
    }
    if(typeof options === 'object'){
        Object.keys(options).forEach(function(key){
            _this[key] = options[key];
        });
    }else{
        throw TypeError("Options must be an Object literal");
    }
}

function GameObject(options){
    this.width = 0;
    this.height = 0;
    this.visible = true;
    this.render = function(){};
    this.tick = function(){};
    this.transform = new Transform();
    this.__construct(options);
    return this;
}

function Color(options){
    this.alpha = 1;
    this.r = 255;
    this.g = 255;
    this.b = 255;
    this.__construct(options);
    return this;
}

function Transform(options){
    this.rotation = 0;
    this.position = new Vector2();
    this.__construct(options);
    return this;
}

function Vector2(options){
    this.x = 0;
    this.y = 0;
    this.__construct(options);
    return this;
}

function Physics2D(options){
    var _this = this;
    this.velocity = new Vector2();
    this.addForce = function(force){
        if(!(force instanceof Vector2)){
            throw TypeError("Force must be an instance of Vector2");
        }
        _this.velocity.x += force.x;
        _this.velocity.y += force.y;
        return;
    }
    this.__construct(options);
    return this;
}