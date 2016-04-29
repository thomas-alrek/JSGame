"use strict";

function Vector2(options){
    this.x = 0;
    this.y = 0;
    this.__construct(options);
    return this;
}

Vector2.prototype = new JSGamePrimitive();
Vector2.prototype.up = function(){
    return new Vector2({
        x: 0,
        y: -1
    });
}
Vector2.prototype.left = function(){
    return new Vector2({
        x: -1,
        y: 0
    });
}
Vector2.prototype.one = function(){
    return new Vector2({
        x: 1,
        y: 1
    });
}
Vector2.prototype.right = function(){
    return new Vector2({
        x: 1,
        y: 0
    });
}
Vector2.prototype.down = function(){
    return new Vector2({
        x: 0,
        y: 1
    });
}
Vector2.prototype.zero = function(){
    return new Vector2({
        x: 0,
        y: 0
    });
}
Vector2.prototype.add = function(vector){
    // stub
}
Vector2.prototype.multiply = function(vector){
    // stub    
}
Vector2.prototype.divide = function(vector){
    // stub
}
Vector2.prototype.substract = function(vector){
    // stub    
}