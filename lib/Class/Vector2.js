"use strict";

function Vector2(options){
    this.__extend(Component, this, options);
    this.x = 0;
    this.y = 0;
    this.__construct(this, options);
}

Vector2.prototype = new Component();
Vector2.prototype.constructor = Vector2;

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
    switch(typeof vector){
        case 'object':
            if(!(vector instanceof Vector2)){
                throw TypeError("Object not an instance of Vector2");
            }
            return new Vector2({
                x: this.x + vector.x,
                y: this.y + vector.y
            });
            break;
        case 'number':
            return new Vector2({
                x: this.x + vector,
                y: this.y + vector
            });
            break;
        default:
            throw TypeError("Argument not a object or a number");        
    }
}

Vector2.prototype.multiply = function(vector){
    switch(typeof vector){
        case 'object':
            if(!(vector instanceof Vector2)){
                throw TypeError("Object not an instance of Vector2");
            }
            return new Vector2({
                x: this.x * vector.x,
                y: this.y * vector.y
            });
            break;
        case 'number':
            return new Vector2({
                x: this.x * vector,
                y: this.y * vector
            });
            break;
        default:
            throw TypeError("Argument not a object or a number");        
    }
}

Vector2.prototype.divide = function(vector){
    switch(typeof vector){
        case 'object':
            if(!(vector instanceof Vector2)){
                throw TypeError("Object not an instance of Vector2");
            }
            return new Vector2({
                x: this.x / vector.x,
                y: this.y / vector.y
            });
            break;
        case 'number':
            return new Vector2({
                x: this.x / vector,
                y: this.y / vector
            });
            break;
        default:
            throw TypeError("Argument not a object or a number");        
    }
}

Vector2.prototype.subtract = function(vector){
    switch(typeof vector){
        case 'object':
            if(!(vector instanceof Vector2)){
                throw TypeError("Object not an instance of Vector2");
            }
            return new Vector2({
                x: this.x - vector.x,
                y: this.y - vector.y
            });
            break;
        case 'number':
            return new Vector2({
                x: this.x - vector,
                y: this.y - vector
            });
            break;
        default:
            throw TypeError("Argument not a object or a number");        
    }
}

Vector2.prototype.equal = function(vector){
    if(!(vector instanceof Vector2)){
        throw TypeError("Argument not an instance of Vector2");
    }
    if(this.x === vector.r && this.y === vector.y){
        return true;
    }
    return false;
}

Vector2.prototype.lerp = function(a, b, t){
    if(!(a instanceof Vector2) || !(b instanceof Vector2)){
        throw TypeError("Argument not an instance of Vector2");
    }
    if(typeof t !== 'number'){
        throw TypeError("Argument must be a number");
    }
    t = Math.ceil(t * 1000) / 1000;
    return (new Vector2(b).subtract(a)).multiply(t);
}