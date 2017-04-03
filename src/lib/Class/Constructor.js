/**
 * @file JSGame Constructor class.
 * @package jsgame
 * @copyright (c) 2016, Thomas Alrek
 * @author Thomas Alrek <thomas@alrek.no>
 */

"use strict";

/**
 * @class Constructor
 * Creates a new instance of Constructor.
 * <p><i>This class provides methods to extend and construct classes with inheritance. It should not be used directly, but as a prototype of a class that needs it's methods</i></p>
 *
 * @constructor
 * @param {bool} onlyConstruct If true, only the __extend and __construct methods will be exposed
 */
export class Constructor {
    constructor(onlyConstruct = false) {
        if (onlyConstruct) {
            delete this.__proto__.createUUID;
            delete this.__proto__.addComponent;
        }
    }

    /**
     * Extend a class with inheritance
     * <p><i>This function breaks the prototype chain, and adds all prototypes as a property of the class</i></p>
     *
     * @method
     * @name Constructor#__extend
     * @param {Class} from The base class to extend from
     * @param {Object} to The instance that should be extended
     * @param {options} options Options to pass on to the base class' constructor
     */
    __extend(from, to, options) {
        let proto = new from(options || undefined);
        Object.keys(proto).forEach(function(key){
            to[key] = proto[key];
        });
    }

    /**
     * Constructs the class with the parameters passed
     * <p><i>Properties that isn't defined in the class will be ignored</i></p>
     *
     * @method
     * @name Constructor#__construct
     * @param {Object} obj A reference to this class
     * @param {options} options Options to construct from
     * @throws {TypeError} If the passed parameters is not Objects.
     */
    __construct(obj, options) {
        if(typeof options === 'undefined') {
            return;
        }
        if(typeof options === 'object') {
            Object.keys(options).forEach(function(key){
                obj[key] = options[key];
            });
        } else {
            throw TypeError("Options must be an Object literal");
        }
    }

    /**
     * Creates an UUID
     *
     * @method
     * @name Constructor#createUUID
     * @param {string} [delim] Delimiter
     * @returns {string} UUID
     */
    createUUID(delim) {
        let delim = delim || "-";
        function rnd() {
            return (((1 + Math.random() * new Date().getTime()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (rnd() + rnd() + delim + rnd() + delim + rnd() + delim + rnd() + delim + rnd() + rnd() + rnd());
    }

    /**
     * Adds a Component or GameObject to the components property
     *
     * @method
     * @name Constructor#addComponent
     * @param {GameObject|Component} obj Object to add
     * @param {String} [id] The id used to reference this object. If non is specified, an UUID is assigned
     * @throws Error If id already exists in another Object
     * @throws TypeError if Object is not an instance of GameObject or Component
     */
    addComponent(obj, id) {
        let id = id || this.createUUID();
        obj.parent = this;
        if(this instanceof JSGameEngine){
            //JSGameEngine
            if(!(obj instanceof GameObject)) {
                throw TypeError("Object not an instance of GameObject");
            }
            if(typeof this.components[id] !== 'undefined') {
                throw Error("GameObject already has component with id " + id);
            }
            this.components[id] = obj;
            if(obj.__init) {
                obj.__init(this);
            }
        } else {
            if(!(obj instanceof Component)) {
                throw TypeError("Object not an instance of Component");
            }
            if(typeof this.components[id] !== 'undefined') {
                throw Error("GameObject already has component with id " + id);
            }
            this.components[id] = obj;
            if(obj.__init) {
                obj.__init(this.parent);
            }
        }
        return this.components[id];
    }
}