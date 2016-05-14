/**
 * @file JSGame Input Component.
 * @author Thomas Alrek
 */

"use strict";

/**
 * @class Input
 * Creates a new instance of Input.
 * <p><i>Input is an instance of Component</i></p>
 *
 * @constructor
 * @param {options} options An object containing construct options
 */
function Input(options){
    var self = this;
    this.__extend(Component, this, options);
    this.__construct(this, options);
    this.onKeyDown = function(){};
    this.onKeyUp = function(){};
    this.keys = {};
    this.__init = function(JSGameEngine){
        document.addEventListener("keydown", function(e){
            self.keys[e.keyCode] = true;
            self.onKeyDown(e.keyCode);
        }, false);
        document.addEventListener("keyup", function(e){
            self.keys[e.keyCode] = false;
            self.onKeyUp(e.keyCode);
        }, false);
    }
}

Input.prototype = new Component();
Input.prototype.constructor = Input;
Input.prototype.keyShift = 16;
Input.prototype.keyA = 65;
Input.prototype.keyS = 83;
Input.prototype.keyW = 87;
Input.prototype.keyD = 68;

module.exports = Input;