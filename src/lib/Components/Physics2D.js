/**
 * @file JSGame Physics2D Component.
 * @package jsgame
 * @copyright (c) 2016, Thomas Alrek
 * @author Thomas Alrek <thomas@alrek.no>
 */

"use strict";

/**
 * @class Physics2D
 * Creates a new instance of Physics2D.
 * <p><i>Input is an instance of Component</i></p>
 *
 * @constructor
 * @param {options} options An object containing construct options
 */
function Physics2D(options){
    var self = this;
    this.__extend(Component, this, options);
    this.gravity = new Vector2({x: 0, y: 0.981});
    this.velocity = new Vector2({parent: this});
    this.update = function(JSGameEngine){
        return;
    }
    this.fixedUpdate = function(JSGameEngine){
    }
    this.addForce = function(force){
        if(!(force instanceof Vector2)){
            throw TypeError("Force must be an instance of Vector2");
        }
        self.velocity= self.velocity.add(force);
        return self.velocity;
    }
    this.__fixedUpdate = function(JSGameEngine){
        self.addForce(self.gravity);
        this.parent.transform.position = this.parent.transform.position.add(this.velocity);
        this.fixedUpdate(JSGameEngine);
    }
    this.__update = function(JSGameEngine){
        tihs.update(JSGameEngine);
    }
    this.__construct(this, options);
}

Physics2D.prototype = new Component();
Physics2D.prototype.constructor = Physics2D;

module.exports = Physics2D;