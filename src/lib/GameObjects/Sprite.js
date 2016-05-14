/**
 * @file JSGame Sprite GameObject.
 * @author Thomas Alrek
 */

"use strict";

/**
 * @class Sprite
 * Creates a new instance of Sprite.
 * <p><i>Sprite is an instance of GameObject</i></p>
 *
 * @constructor
 * @param {options} options An object containing construct options
 */
function Sprite(options){
    var self = this;
    this.__extend(GameObject, this, options);
    this.__construct(this, options);
    this.__update = function(JSGameEngine){
        self.onUpdate(JSGameEngine);
    };
    this.__init = function(JSGameEngine){};
    this.__fixedUpdate = function(JSGameEngine){
        self.onFixedUpdate(JSGameEngine);
    }
}

Sprite.prototype = new GameObject();
Sprite.prototype.constructor = Sprite;

module.exports = Sprite;