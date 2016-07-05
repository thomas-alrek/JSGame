/**
 * @file JSGame Component class.
 * @package jsgame
 * @copyright (c) 2016, Thomas Alrek
 * @author Thomas Alrek <thomas@alrek.no>
 */

"use strict";

/**
 * @class Component
 * Creates a new instance of Component.
 * <p><i>All Components extends from this class</i></p>
 *
 * @constructor
 * @param {options} options An object containing construct options
 * @property {Object} parent The GameOjects parent
 * @property {function} onFixedUpdate A callback function to be called after the fixedUpdate of GameObject
 * @property {function} onUpdate A callback function to called after rendering the GameObject
 */
function Component(options){
    var self = this;
    this.parent = undefined;
    this.__construct(this, options);
    this.onUpdate = function(){}
    this.onFixedUpdate = function(){};
    this.__update = function(JSGameEngine){
        this.onUpdate(JSGameEngine);
    };
    this.__fixedUpdate = function(JSGameEngine){
        this.onFixedUpdate(JSGameEngine);
    };
}

Component.prototype.toString = function(){
    return JSON.stringify(this);
}

Component.prototype = new Constructor();
Component.prototype.constructor = Component;

module.exports = Component;

/**
 * Constructs the Component with the parameters called in the constructor options object
 * <p><i>This method is called automatically on construction, and should not be used directly</i></p>
 * 
 * @method
 * @name Component#__construct
 * @param {Object} obj A reference to this Component
 * @param {Object} options Options to construct from
 * @throws {TypeError} If the passed parameters is not Objects.
 */

/**
 * Instances of Component can use this method to extend Component
 * <p><i>This method should only be used in new classes that should extend Component</i></p>
 * 
 * @method
 * @name Component#__extend
 * @param {Class} from The base class to extend from
 * @param {Object} to The instance that should be extended
 * @param {Object} options Options to pass on to the base class' constructor
 */

/**
 * The Component update method.
 * <p><i>This method only calls the Component onUpdate callback. Classes that extends from Component will put their own rendering code here.</i></p>
 * 
 * @method
 * @name Component#__update
 * @param {JSGameEngine} JSGameEngine A reference to the JSGameEngine class, with access to the rendering context.
 */

/**
 * The Component fixedUpdate method.
 * <p><i>This method only calls the Component onFixedUpdate callback. Classes that extends from Component will put their own fixed update code here.</i></p>
 * 
 * @method
 * @name Component#__fixedUpdate
 * @param {JSGameEngine} JSGameEngine A reference to the JSGameEngine class, with access to the rendering context.
 */

/**
 * Serialize the Component as JSON
 * 
 * @method
 * @name Component#toString
 * @returns {JSON}
 */