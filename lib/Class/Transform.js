"use strict";

function Transform(options){
    this.rotation = 0;
    this.position = new Vector2({parent: this});
    this.__construct(options);
    this.rotation = this.rotation % 360;
}

Transform.prototype = new Component();

Transform.prototype.translate = function(vector){
    if(!(vector instanceof Vector2) && !(vector instanceof Transform)){
        throw TypeError("Vector must be an instance of Vector2 or Transform");
    }
    if(vector instanceof Vector2){
        this.position.x += vector.x;
        this.position.y += vector.y;
        return this.position;  
    }else{
        this.position.x += vector.position.x;
        this.position.y += vector.position.y;
        this.rotation = (this.rotation + vector.rotation) % 360;
    }
}

Transform.prototype.add = function(transform){
    if(!(transform instanceof Transform)){
        throw TypeError("Object not an instance of Transform");
    }
    return new Transform({
        position: this.position.add(transform.position),
        rotation: this.rotation + transform.rotation
    });
}

Transform.prototype.multiply = function(transform){
    if(!(transform instanceof Transform)){
        throw TypeError("Object not an instance of Transform");
    }
    return new Transform({
        position: this.position.multiply(transform.position),
        rotation: this.rotation * transform.rotation
    });
}

Transform.prototype.divide = function(transform){
    if(!(transform instanceof Transform)){
        throw TypeError("Object not an instance of Transform");
    }
    return new Transform({
        position: this.position.divide(transform.position),
        rotation: this.rotation / transform.rotation
    });
}

Transform.prototype.subtract = function(transform){
    if(!(transform instanceof Transform)){
        throw TypeError("Object not an instance of Transform");
    }
    return new Transform({
        position: this.position.subtract(transform.position),
        rotation: this.rotation - transform.rotation
    });
}

Transform.prototype.equal = function(transform){
    if(!(transform instanceof Transform)){
        throw TypeError("Argument not an instance of Transform");
    }
    if(this.position.equal(transform.position) && this.rotation === transform.rotation){
        return true;
    }
    return false;
}

Transform.prototype.lerp = function(a, b, t){
    if(!(a instanceof Transform) || !(b instanceof Transform)){
        throw TypeError("Argument not an instance of Transform");
    }
    if(typeof t !== 'number'){
        throw TypeError("Argument must be a number");
    }
    return (new Transform(b).subtract(a)).multiply(t);
}