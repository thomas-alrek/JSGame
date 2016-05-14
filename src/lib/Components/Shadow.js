/**
 * @file JSGame Shadow Component. Adds a shadow to the parent GameObject
 * @author Thomas Alrek
 */

"use strict";

/**
 * @class Shadow
 * Creates a new instance of Shadow.
 * <p><i>Shadow is an instance of Component</i></p>
 *
 * @constructor
 * @param {options} options An object containing construct options
 * @property {Color} color An instance of Color representing the Shadows color
 * @property {number} blur A number representing the Shadows blur radius
 * @property {GameObject} parent A reference to the Shadows parent
 */
function Shadow(options){
    var self = this;
    this.__extend(Component, this, options);
    this.color = new Color();
    this.blur = 10;
    this.__update = function(JSGameEngine){
        var ctx = JSGameEngine.ctx;
        ctx.shadowBlur = self.blur;
        ctx.shadowColor = self.color.toString();
    }
    this.__construct(this, options);
}

Shadow.prototype = new Component();
Shadow.prototype.constructor = Shadow;

module.exports = Shadow;