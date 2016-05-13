/**
 * @file JSGame GameObject class.
 * @author Thomas Alrek
 */

"use strict";

/**
 * Creates a new instance of GameObject.
 * <p><i>All GameObjects extends from this class</i></p>
 *
 * @constructor
 * @param {Object} options An object containing construct options
 * @property {Object<Component>} components An object containing attached components
 * @property {boolean} enabled Enables or disbles the GameObject
 * @property {number} height The height of the GameObject (optional)
 * @property {function} onFixedUpdate A callback function to be called after the fixedUpdate of GameObject
 * @property {function} onUpdate A callback function to called after rendering the GameObject
 * @property {Object} parent The GameOjects parent (optional)
 * @property {Transform} transform The GameObjects Transform
 * @property {boolean} visible Enables or disables rendering on the GameObject
 * @property {number} width The width of the GameObject (optional)
 */
function GameObject(options){
    var self = this;
    this.components = new Object();
    this.enabled = true;
    this.width = 0;
    this.height = 0;
    this.visible = true;
    this.onUpdate = function(){}
    this.onFixedUpdate = function(){};
    this.__update = function(JSGameEngine){
        this.onUpdate(JSGameEngine);
    };
    this.__fixedUpdate = function(JSGameEngine){
        this.onFixedUpdate(JSGameEngine);
    };
    this.__init = function(){};
    this.parent = undefined;
    this.transform = new Transform({parent: this});
    this.__construct(this, options);
}

GameObject.prototype = new Constructor();
GameObject.prototype.constructor = GameObject;

GameObject.prototype.toString = function(){
    return JSON.stringify(this);
}

module.exports = GameObject;

/**
 * Constructs the GameObject with the parameters called in the constructor options object
 * <p><i>This method is called automatically on construction, and should not be used directly</i></p>
 * 
 * @method
 * @name GameObject#__construct
 * @param {Object} obj A reference to this GameObject
 * @param {Object} options Options to construct from
 * @throws {TypeError} If the passed parameters is not Objects.
 */

/**
 * Instances of GameObject can use this method to extend GameObject
 * <p><i>This method should only be used in new classes that should extend GameObject</i></p>
 * 
 * @method
 * @name GameObject#__extend
 * @param {Class} from The base class to extend from
 * @param {Object} to The instance that should be extended
 * @param {Object} options Options to pass on to the base class' constructor
 */

/**
 * The GameObjects update method.
 * <p><i>This method only calls the GameObjects onUpdate callback. Classes that extends from GameObject will put their own rendering code here.</i></p>
 * 
 * @method
 * @name GameObject#__update
 * @param {JSGameEngine} JSGameEngine A reference to the JSGameEngine class, with access to the rendering context.
 */

/**
 * The GameObjects fixedUpdate method.
 * <p><i>This method only calls the GameObjects onFixedUpdate callback. Classes that extends from GameObject will put their own fixed update code here.</i></p>
 * 
 * @method
 * @name GameObject#__fixedUpdate
 * @param {JSGameEngine} JSGameEngine A reference to the JSGameEngine class, with access to the rendering context.
 */

/**
 * Serialize the GameObject as JSON
 * 
 * @method
 * @name GameObject#toString
 * @returns {JSON}
 */