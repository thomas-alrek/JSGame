/**
 * @file JSGame extended Math library
 * @author Thomas Alrek
 * @namespace
 * @name Math
 */

"use strict";

/**
 * Flips a number, given a value and a max value.
 * E.g Math.flip(10, 255) === 245
 *
 * @function
 * @static
 * @param {number} value The value to flip
 * @param {number} max The maximum value
 * @return {number}
 */
Math.flip = function(value, max){
    if(typeof value !== 'number' && typeof max !== 'number'){
        return NaN;
    }
    return Math.abs(max - parseInt(value));
}

/**
 * Generates a random number in range
 *
 * @function
 * @static
 * @param {number} min Minimum range value
 * @param {number} max Maximum range value
 * @param {boolean} integer Only return integer
 * @return {number}
 */
Math.randomRange = function(min, max, integer){
    if(typeof min !== 'number' && typeof max !== 'number'){
        return NaN;
    }
    if(integer === true){
        return Math.floor(Math.random() * (max - min) + min);        
    }
    return Math.random() * (max - min) + min;
}

/**
 * Inverts the sign of a number
 * E.g Math.invert(99.5) === -99.5;
 *
 * @function
 * @static
 * @param {number} num Number to invert
 * @return {number}
 */
Math.invert = function(num){
    return num * -1;
}

/**
 * Clamps a number into a range
 * If the input value is bigger than max, the number is truncated to max.
 * If the input value is smaller than min, the number is truncated to min.
 * 
 * E.g Math.clamp(370, 0, 360) === 360;
 *
 * @function
 * @static
 * @param {number} value Number to clamp in range
 * @param {number} min Minimum range value
 * @param {number} max Maximum range value
 * @return {number}
 */
Math.clamp = function(value, min, max){
    return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation (lerp) between two numbers over interval
 * E.g Math.lerp(2.5, 20, Time.deltaTime) === 0.28; (in this example, deltaTime === 0.016)
 *
 * @function
 * @static
 * @param {number} a Number to interpolate from
 * @param {number} b Number to interpolate to
 * @param {number} t Interval to interpolate over
 * @return {number}
 */
Math.lerp = function(a, b, t){
    return (b - a) * t;
}

module.exports = Math;