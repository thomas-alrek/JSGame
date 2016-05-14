/**
 * @file JSGame Transform Component.
 * @author Thomas Alrek
 */

"use strict";

/**
 * @class Transform
 * Creates a new instance of Transform.
 * <p><i>Transform is an instance of Component</i></p>
 *
 * @constructor
 * @param {options} options An object containing construct options
 * @property {number} rotation A number representing the Transforms rotation in degrees
 * @property {Vector2} position A Vector2 instance, representing the Transforms position
 */
function Transform(options){
    this.rotation = 0;
    this.__extend(Component, this, options);
    this.position = new Vector2({parent: this});
    this.__construct(this, options);
    this.rotation = this.rotation % 360;
}

Transform.prototype = new Component();
Transform.prototype.constructor = Transform;

/**
 * Translates this Transforms properties to another by adding them together Transform or Vector2
 * 
 * @method
 * @name Transform#translate
 * @prop {Transform|Vector2} vector The Transform or Vector2 to Translate with
 * @throws {TypeError} If vector is not an instance of Transform or Vector2
 */
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

/**
 * Returns a new Transform that is this Transforms added together with another Transform
 * 
 * @method
 * @name Transform#add
 * @prop {Transform} transform The Transform to add with this Transform
 * @returns {Transform}
 * @throws {TypeError} If transform is not an instance of Transform
 */
Transform.prototype.add = function(transform){
    if(!(transform instanceof Transform)){
        throw TypeError("Object not an instance of Transform");
    }
    return new Transform({
        position: this.position.add(transform.position),
        rotation: this.rotation + transform.rotation
    });
}

/**
 * Returns a new Transform that is this Transforms multiplied with with another Transform
 * 
 * @method
 * @name Transform#multiply
 * @prop {Transform} transform The Transform to multiply with this Transform
 * @returns {Transform}
 * @throws {TypeError} If transform is not an instance of Transform
 */
Transform.prototype.multiply = function(transform){
    if(!(transform instanceof Transform)){
        throw TypeError("Object not an instance of Transform");
    }
    return new Transform({
        position: this.position.multiply(transform.position),
        rotation: this.rotation * transform.rotation
    });
}

/**
 * Returns a new Transform that is this Transforms divided by another Transform
 * 
 * @method
 * @name Transform#divide
 * @prop {Transform} transform The Transform to divide by this Transform
 * @returns {Transform}
 * @throws {TypeError} If transform is not an instance of Transform
 */
Transform.prototype.divide = function(transform){
    if(!(transform instanceof Transform)){
        throw TypeError("Object not an instance of Transform");
    }
    return new Transform({
        position: this.position.divide(transform.position),
        rotation: this.rotation / transform.rotation
    });
}

/**
 * Returns a new Transform that is this Transforms subtracted from another Transform
 * 
 * @method
 * @name Transform#subtract
 * @prop {Transform} transform The Transform to subtract from this Transform
 * @returns {Transform}
 * @throws {TypeError} If transform is not an instance of Transform
 */
Transform.prototype.subtract = function(transform){
    if(!(transform instanceof Transform)){
        throw TypeError("Object not an instance of Transform");
    }
    return new Transform({
        position: this.position.subtract(transform.position),
        rotation: this.rotation - transform.rotation
    });
}

/**
 * Comapres this Transform with another Transform
 * 
 * @method
 * @name Transform#equal
 * @prop {Transform} transform The Transform to compare
 * @returns {boolean}
 * @throws {TypeError} If transform is not an instance of Transform
 */
Transform.prototype.equal = function(transform){
    if(!(transform instanceof Transform)){
        throw TypeError("Argument not an instance of Transform");
    }
    if(this.position.equal(transform.position) && this.rotation === transform.rotation){
        return true;
    }
    return false;
}

/**
 * Return a new Transform that is linear interpolated between two instances of Transform over a specified interval
 * 
 * @method
 * @name Transform#lerp
 * @param {Transform} a The Transform instance to interpolate from
 * @param {Transform} b The Transform instance to interpolate to
 * @param {number} t The interval to interpolate over
 * @returns {Transform}
 * @throws TypeError If a or b is not an instance of Transform, or t is not a number
 */
Transform.prototype.lerp = function(a, b, t){
    if(!(a instanceof Transform) || !(b instanceof Transform)){
        throw TypeError("Argument not an instance of Transform");
    }
    if(typeof t !== 'number'){
        throw TypeError("Argument must be a number");
    }
    return (new Transform(b).subtract(a)).multiply(t);
}

module.exports = Transform;