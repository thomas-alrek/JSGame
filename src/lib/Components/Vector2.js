/**
 * @file JSGame Vector2 Component.
 * @package jsgame
 * @copyright (c) 2016, Thomas Alrek
 * @author Thomas Alrek <thomas@alrek.no>
 */

"use strict";

import Component from '../Class/Component';

/**
 * @class Vector2
 * Creates a new instance of Vector2.
 * <p><i>Vector2 is an instance of Component</i></p>
 *
 * @constructor
 * @param {options} options An object containing construct options
 * @property {number} x A number representing horizontal position within the game area
 * @property {number} y A number representing vertical position within the game area
 */
class Vector2 extends Component{
    constructor({x = 0, y = 0} = {}) {
        super();
        this.x = x;
        this.y = y;
    }

    /**
     * Returns a new Vector2 representing upwards movement
     *
     * @method
     * @name Vector2#up
     * @returns {Vector2}
     */
    up() {
        return new Vector2({
            x: 0,
            y: -1
        })
    }

    /**
     * Returns a new Vector2 representing movement to the left
     *
     * @method
     * @name Vector2#left
     * @returns {Vector2}
     */
    left() {
        return new Vector2({
            x: -1,
            y: 0
        });
    }

    /**
     * Returns a new Vector2 representing x and y incremented by 1
     *
     * @method
     * @name Vector2#one
     * @returns {Vector2}
     */
    one() {
        return new Vector2({
            x: 1,
            y: 1
        });
    }

    /**
     * Returns a new Vector2 representing movement to the right
     *
     * @method
     * @name Vector2#right
     * @returns {Vector2}
     */
    right() {
        return new Vector2({
            x: 1,
            y: 0
        });
    }

    /**
     * Returns a new Vector2 representing downwards movement
     *
     * @method
     * @name Vector2#down
     * @returns {Vector2}
     */
    down() {
        return new Vector2({
            x: 0,
            y: 1
        });
    }

    /**
     * Returns a new Vector2 representing zero movement
     *
     * @method
     * @name Vector2#zero
     * @returns {Vector2}
     */
    zero() {
        return new Vector2({
            x: 0,
            y: 0
        });
    }

    /**
     * Returns a new Vector2 with the values of this Vector2 added with another Vector2 or a number
     *
     * @method
     * @name Vector2#add
     * @prop {Vector2|number} vector The Vector2 or number to add with this Vector2
     * @returns {Vector2}
     * @throws {TypeError} If vector is not an instance of Vector2 or a number
     */
    add(vector) {
        const type = typeof vector;
        if(type === 'object') {
            if(!(vector instanceof Vector2)){
                throw new TypeError('Object not an instance of Vector2');
            }
            return new Vector2({
                x: this.x + vector.x,
                y: this.y + vector.y
            });
        } else if(type === 'number') {
            return new Vector2({
                x: this.x + vector,
                y: this.y + vector
            });
        }
        throw new TypeError('Argument not a object or a number');
    }

    /**
     * Returns a new Vector2 with the values of this Vector2 multiplied with another Vector2 or a number
     *
     * @method
     * @name Vector2#multiply
     * @prop {Vector2|number} vector The Vector2 or number to multiply with this Vector2
     * @returns {Vector2}
     * @throws {TypeError} If vector is not an instance of Vector2 or a number
     */
    multiply(vector) {
        const type = typeof vector;
        if(type === 'object') {
            if(!(vector instanceof Vector2)){
                throw new TypeError('Object not an instance of Vector2');
            }
            return new Vector2({
                x: this.x * vector.x,
                y: this.y * vector.y
            });
        } else if(type === 'number') {
            return new Vector2({
                x: this.x * vector,
                y: this.y * vector
            });
        }
        throw new TypeError('Argument not a object or a number');
    }

    /**
     * Returns a new Vector2 with the values of this Vector2 divided by another Vector2 or a number
     *
     * @method
     * @name Vector2#divide
     * @prop {Vector2|number} vector The Vector2 or number to divide this Vector2 by
     * @returns {Vector2}
     * @throws {TypeError} If vector is not an instance of Vector2 or a number
     */
    divide(vector) {
        const type = typeof vector;
        if(type === 'object') {
            if(!(vector instanceof Vector2)){
                throw new TypeError('Object not an instance of Vector2');
            }
            return new Vector2({
                x: this.x / vector.x,
                y: this.y / vector.y
            });
        } else if(type === 'number') {
            return new Vector2({
                x: this.x / vector,
                y: this.y / vector
            });
        }
        throw new TypeError('Argument not a object or a number');
    }

    /**
     * Returns a new Vector2 with the values of this Vector2 subtracted from another Vector2 or a number
     *
     * @method
     * @name Vector2#subtract
     * @prop {Vector2|number} vector The Vector2 or number to subtract from this Vector2
     * @returns {Vector2}
     * @throws {TypeError} If vector is not an instance of Vector2 or a number
     */
    subtract(vector) {
        const type = typeof vector;
        if(type === 'object') {
            if(!(vector instanceof Vector2)){
                throw new TypeError('Object not an instance of Vector2');
            }
            return new Vector2({
                x: this.x - vector.x,
                y: this.y - vector.y
            });
        } else if(type === 'number') {
            return new Vector2({
                x: this.x - vector,
                y: this.y - vector
            });
        }
        throw new TypeError('Argument not a object or a number');
    }

    /**
     * Compares another Vector2 with this Vector2
     *
     * @method
     * @name Vector2#equal
     * @prop {Vector2} vector The Vector2 to compare to this Vector2
     * @returns {boolean}
     * @throws {TypeError} If vector is not an instance of Vector2
     */
    equal(vector) {
        if(!(vector instanceof Vector2)){
            throw TypeError("Argument not an instance of Vector2");
        }

        return (this.x === vector.r && this.y === vector.y);
    }

    /**
     * Return a new Vector2 that is linear interpolated between two instances of Vector2 over a specified interval
     *
     * @method
     * @name Vector2#lerp
     * @param {Vector2} a The Vector2 instance to interpolate from
     * @param {Vector2} b The Vector2 instance to interpolate to
     * @param {number} t The interval to interpolate over
     * @returns {Vector2}
     * @throws TypeError If a or b is not an instance of Vector2, or t is not a number
     */
    lerp(a, b, t) {
        if(!(a instanceof Vector2) || !(b instanceof Vector2)){
            throw TypeError("Argument not an instance of Vector2");
        }
        if(typeof t !== 'number'){
            throw TypeError("Argument must be a number");
        }
        t = Math.ceil(t * 1000) / 1000;
        return (new Vector2(b).subtract(a)).multiply(t);
    }
}

export { Vector2 };