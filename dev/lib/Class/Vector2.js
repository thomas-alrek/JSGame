"use strict";

function Vector2(options){
    this.x = 0;
    this.y = 0;
    this.__construct(options);
    return this;
}

Vector2.prototype = new JSGameComponent();

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
    if(typeof vector === 'number'){
        this.x += vector;
        this.y += vector;
        return this;
    }
    if(vector instanceof Vector2){
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }
    throw TypeError("Vector2 can't be added with " + typeof vector);
}

Vector2.prototype.multiply = function(vector){
    if(typeof vector === 'number'){
        this.x *= vector;
        this.y *= vector;
        return this;
    }
    if(vector instanceof Vector2){
        this.x *= vector.x;
        this.y *= vector.y;
        return this;
    }
    throw TypeError("Vector2 can't be multiplied with " + typeof vector);
}

Vector2.prototype.divide = function(vector){
    if(typeof vector === 'number'){
        this.x /= vector;
        this.y /= vector;
        if(isFinite(this.x) && isFinite(this.y)){
            return this;
        }
        throw Error("Division by zero");
    }
    if(vector instanceof Vector2){
        this.x /= vector.x;
        this.y /= vector.y;
        if(isFinite(this.x) && isFinite(this.y)){
            return this;
        }
        throw Error("Division by zero");
    }
    throw TypeError("Vector2 can't be divided with " + typeof vector);
}

Vector2.prototype.subtract = function(vector){
    if(typeof vector === 'number'){
        this.x -= vector;
        this.y -= vector;
        return this;
    }
    if(vector instanceof Vector2){
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }
    throw TypeError("Vector2 can't be subtracted with " + typeof vector);
}

Vector2.prototype.lerp = function(a, b, t){
    if(!(a instanceof Vector2) || !(b instanceof Vector2)){
        throw TypeError("Argument must be an instance of Vector2");
    }
    if(typeof t !== 'number'){
        throw TypeError("Argument must be a number");
    }
    t = Math.ceil(t * 1000) / 1000;
    return (new Vector2(b).subtract(a)).multiply(t);
}