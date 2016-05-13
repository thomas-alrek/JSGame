(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

global.Constructor = require("./lib/Class/Constructor.js");
global.JSGameEngine = require("./lib/Class/JSGameEngine");
global.Math = require("./lib/Util/Math.js");
global.Component = require("./lib/Class/Component.js");
global.Time = require("./lib/Util/Time.js");
global.Physics2D = require("./lib/Components/Physics2D.js");
global.Vector2 = require("./lib/Components/Vector2.js");
global.Transform = require("./lib/Components/Transform.js");
global.Shadow = require("./lib/Components/Shadow.js");
global.Input = require("./lib/Components/Input.js");
global.GameObject = require("./lib/Class/GameObject.js");
global.Color = require("./lib/Components/Color.js");
global.Text = require("./lib/GameObjects/Text.js");
global.Sprite = require("./lib/GameObjects/Sprite.js");
global.Particle = require("./lib/GameObjects/Particle.js");
global.ParticleSystem = require("./lib/GameObjects/ParticleSystem.js");
global.AudioClip = require("./lib/GameObjects/AudioClip.js");
global.Background = require("./lib/GameObjects/Background.js");
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./lib/Class/Component.js":2,"./lib/Class/Constructor.js":3,"./lib/Class/GameObject.js":4,"./lib/Class/JSGameEngine":5,"./lib/Components/Color.js":6,"./lib/Components/Input.js":7,"./lib/Components/Physics2D.js":8,"./lib/Components/Shadow.js":9,"./lib/Components/Transform.js":10,"./lib/Components/Vector2.js":11,"./lib/GameObjects/AudioClip.js":12,"./lib/GameObjects/Background.js":13,"./lib/GameObjects/Particle.js":14,"./lib/GameObjects/ParticleSystem.js":15,"./lib/GameObjects/Sprite.js":16,"./lib/GameObjects/Text.js":17,"./lib/Util/Math.js":18,"./lib/Util/Time.js":19}],2:[function(require,module,exports){
/**
 * @file JSGame Component class.
 * @author Thomas Alrek
 */

"use strict";

/**
 * Creates a new instance of Component.
 * <p><i>All Components extends from this class</i></p>
 *
 * @constructor
 * @param {Object} options An object containing construct options
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
},{}],3:[function(require,module,exports){
/**
 * @file JSGame Constructor class.
 * @author Thomas Alrek
 */

"use strict";

/**
 * Creates a new instance of Constructor.
 * <p><i>This class provides methods to extend and construct classes with inheritance. It should not be used directly, but as a prototype of a class that needs it's methods</i></p>
 *
 * @constructor
 * @param {bool} onlyConstruct If true, only the __extend and __construct methods will be exposed
 */
function Constructor(onlyConstruct){
    if(onlyConstruct){
        delete this.createUUID;
        delete this.addComponent;
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
 * @param {Object} options Options to pass on to the base class' constructor
 */
Constructor.prototype.__extend = function(from, to, options){
    var proto = new from(options || undefined);
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
 * @param {Object} options Options to construct from
 * @throws {TypeError} If the passed parameters is not Objects.
 */
Constructor.prototype.__construct = function(obj, options){
    if(typeof options === 'undefined'){
        return;
    }
    if(typeof options === 'object'){
        Object.keys(options).forEach(function(key){
            obj[key] = options[key];
        });
    }else{
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
Constructor.prototype.createUUID = function (delim) {
    var delim = delim || "-";
    function rnd() {
        return (((1 + Math.random() * new Date().getTime()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (rnd() + rnd() + delim + rnd() + delim + rnd() + delim + rnd() + delim + rnd() + rnd() + rnd());
};

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
Constructor.prototype.addComponent = function(obj, id){
    var id = id || this.createUUID();
    obj.parent = this;
    if(this instanceof JSGameEngine){
        //JSGameEngine
        if(!(obj instanceof GameObject)){
            throw TypeError("Object not an instance of GameObject");
        }
        if(typeof this.components[id] !== 'undefined'){
            throw Error("GameObject already has component with id " + id);
        }
        this.components[id] = obj;
        if(obj.__init){
            obj.__init(this);
        }
    }else{
        if(!(obj instanceof Component)){
            throw TypeError("Object not an instance of Component");
        }
        if(typeof this.components[id] !== 'undefined'){
            throw Error("GameObject already has component with id " + id);
        }
        this.components[id] = obj;  
        if(obj.__init){
            obj.__init(this.parent);
        }
    }   
    return this.components[id];
}

module.exports = Constructor;
},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
/**
 * @file JSGameEngine class.
 * @author Thomas Alrek
 */

"use strict";

/**
 * Creates a new instance of JSGameEngine.
 * <p><i>This is the "entrypoint" for all JSGame projects</i></p>
 *
 * @constructor
 * @param {Object} options An object containing construct options
 * @property {Object<GameObject>} components An object containing attached GameObjects
 * @property {HTMLCanvasElement} canvas The canvas to draw to. If no canvas is provided, a new canvas will automatically be inserted into the DOM
 * @property {number} width The width of the canvas (optional)
 * @property {number} height The height of the canvas (optional)
 * @property {Time} time The globally shared instance of Time
 * @property {CanvasRenderingContext2D} ctx The rendering context
 */
function JSGameEngine(options){
    var self = this;
    this.components = {};
    this.canvas = document.createElement("canvas");
    this.width = 0;
    this.height = 0;
    this.time = new Time();
    this.__construct(this, options);
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.width || window.innerWidth;
    this.canvas.height = this.height || window.innerHeight;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    
    Time = this.time;
    
    /**
     * Renders all enabled GameObjects in the components property.
     * <p><i>This method is called automatically every frame. It automatically calls each attached GameObjects __update method</i></p>
     * 
     * @method
     * @name JSGameEngine#update
     * @param {number} delta The timestamp at the start of the frame
     */
    this.update = function(delta){
        requestAnimationFrame(self.update);
        self.time.update(delta);
        var canvas = self.canvas;
        var ctx = self.ctx;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var Time = self.time;
        for(var index in self.components){
            var gameObject = self.components[index];
            for(var component in gameObject.components){
                if(!gameObject.components[component].parent){
                    gameObject.components[component].parent = gameObject;
                }
            }
            if(!gameObject.enabled){
                continue;
            }
            if(gameObject.visible){
                ctx.save();
                var rotation = gameObject.transform.rotation;
                var position = gameObject.transform.position;
                ctx.translate(position.x + gameObject.width / 2, position.y + gameObject.height / 2);
                ctx.rotate((rotation * Math.PI) / 180);
                ctx.translate(Math.invert(position.x + gameObject.width / 2), Math.invert(position.y + gameObject.height / 2));
                for(var childComponent in gameObject.components){
                    gameObject.components[childComponent].__update(self);
                }
                gameObject.__update(self);
                ctx.restore();
            }
        }
    }
    
    /**
     * Calls __fixedUpdate on each enabled GameObject in the components property.
     * <p><i>This method is called automatically every fixedUpdate tick which runs at a fixed rate of ~50 fps.</i></p>
     * <p><i>Fixed update should only be used for things that doesn't need to have an per frame accuracy</i></p>
     * 
     * @method
     * @name JSGameEngine#fixedUpdate
     * @param {number} delta The timestamp at the start of the frame
     */
    this.fixedUpdate = function(delta){
        self.time.fixedUpdate(delta);
        var Time = self.time;
        for(var index in self.components){
            var gameObject = self.components[index];
            for(var component in gameObject.components){
                if(!gameObject.components[component].parent){
                    gameObject.components[component].parent = gameObject;
                }
            }
            if(!gameObject.enabled){
                continue;
            }
            for(var childComponent in gameObject.components){
                gameObject.components[childComponent].__update(self);
            }
            gameObject.__fixedUpdate(self);
        }
        setTimeout(function(){
            self.fixedUpdate(performance.now);
        }, Time.framerateToTime(50) * 1000);
    }
    
    /* init */
    requestAnimationFrame(this.update);
    this.fixedUpdate(performance.now);
}

JSGameEngine.prototype = new Constructor();
JSGameEngine.prototype.constructor = JSGameEngine;

module.exports = JSGameEngine;

/**
 * Adds a GameObject as a component to JSGameEngine.components
 * <p><i>Use this method to add elements to your game.</i></p>
 * 
 * @method
 * @name JSGameEngine#addComponent
 * @param {Object} obj The GameObject to add.
 * @param {String} [id] An id to assign to the object. Must be unique. If none is specified, an UUID is generated
 * @throws {TypeError} If obj not is an instance of GameObject
 */
},{}],6:[function(require,module,exports){
"use strict";

function Color(options){
    var self = this;
    this.__extend(Component, this, options);
    this.alpha = 1;
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.clamp = function(){
        return new Color({
            r: Math.round(Math.clamp(self.r, 0, 255)),
            g: Math.round(Math.clamp(self.g, 0, 255)),
            b: Math.round(Math.clamp(self.b, 0, 255)),
            alpha: Math.clamp(self.alpha, 0, 1)
        });
    }
    this.__construct(this, options);
    this.toString = function(){
        var stringColor = new Color(this).clamp();
        return "rgba(" + stringColor.r + "," + stringColor.g + "," + stringColor.b + "," + stringColor.alpha + ")";
    }
}

Color.prototype = new Component();
Color.prototype.constructor = Color;

Color.prototype.invert = function(invertAlpha){
    var alpha = this.alpha;
    if(invertAlpha){
        alpha = Math.flip(this.alpha, 1);
    }
    return new Color({
        r: Math.flip(this.r, 255),
        g: Math.flip(this.g, 255),
        b: Math.flip(this.b, 255),
        alpha: alpha
    })
}

Color.prototype.red = function(){
    return new Color({
        r: 255,
        g: 0,
        b: 0
    });
}

Color.prototype.green = function(){
    return new Color({
        r: 0,
        g: 255,
        b: 0
    });
}

Color.prototype.blue = function(){
    return new Color({
        r: 0,
        g: 0,
        b: 255
    });
}

Color.prototype.black = function(){
    return new Color({
        r: 0,
        g: 0,
        b: 0
    });
}

Color.prototype.white = function(){
    return new Color({
        r: 255,
        g: 255,
        b: 255
    });
}

Color.prototype.cyan = function(){
    return new Color({
        r: 0,
        g: 255,
        b: 255
    });
}

Color.prototype.magenta = function(){
    return new Color({
        r: 255,
        g: 0,
        b: 255
    });
}

Color.prototype.yellow = function(){
    return new Color({
        r: 255,
        g: 255,
        b: 0
    });
}

Color.prototype.grey = function(){
    return new Color({
        r: 128,
        g: 128,
        b: 128
    });
}

Color.prototype.add = function(color){
    switch(typeof color){
        case 'object':
            if(!(color instanceof Color)){
                throw TypeError("Object not an instance of Color");
            }
            return new Color({
                r: this.r + color.r,
                g: this.g + color.g,
                b: this.b + color.b
            });
            break;
        case 'number':
            return new Color({
                r: this.r + color,
                g: this.g + color,
                b: this.b + color
            });
            break;
        default:
            throw TypeError("Argument not a object or a number");        
    }
}

Color.prototype.multiply = function(color){
    switch(typeof color){
        case 'object':
            if(!(color instanceof Color)){
                throw TypeError("Object not an instance of Color");
            }
            return new Color({
                r: this.r * color.r,
                g: this.g * color.g,
                b: this.b * color.b
            });
            break;
        case 'number':
            return new Color({
                r: this.r * color,
                g: this.g * color,
                b: this.b * color
            });
            break;
        default:
            throw TypeError("Argument not a object or a number");        
    }
}

Color.prototype.divide = function(color){
    switch(typeof color){
        case 'object':
            if(!(color instanceof Color)){
                throw TypeError("Object not an instance of Color");
            }
            return new Color({
                r: this.r / color.r,
                g: this.g / color.g,
                b: this.b / color.b
            });
            break;
        case 'number':
            return new Color({
                r: this.r / color,
                g: this.g / color,
                b: this.b / color
            });
            break;
        default:
            throw TypeError("Argument not a object or a number");        
    }
}

Color.prototype.subtract = function(color){
    switch(typeof color){
        case 'object':
            if(!(color instanceof Color)){
                throw TypeError("Object not an instance of Color");
            }
            return new Color({
                r: this.r - color.r,
                g: this.g - color.g,
                b: this.b - color.b
            });
            break;
        case 'number':
            return new Color({
                r: this.r - color,
                g: this.g - color,
                b: this.b - color
            });
            break;
        default:
            throw TypeError("Argument not a object or a number");        
    }
}

Color.prototype.equal = function(color){
    if(!(color instanceof Color)){
        throw TypeError("Argument not an instance of Color");
    }
    if(this.r === color.r && this.g === color.g && this.b === color.b){
        return true;
    }
    return false;
}

Color.prototype.lerp = function(a, b, t){
    if(!(a instanceof Color) || !(b instanceof Color)){
        throw TypeError("Argument not an instance of Color");
    }
    if(typeof t !== 'number'){
        throw TypeError("Argument must be a number");
    }
    return (new Color(b).subtract(a)).multiply(t);
}

module.exports = Color;
},{}],7:[function(require,module,exports){
"use strict";

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
},{}],8:[function(require,module,exports){
"use strict";

function Physics2D(options){
    var self = this;
    this.__extend(Component, this, options);
    this.gravity = new Vector2({y: 9.81, parent: this});
    this.velocity = new Vector2({parent: this});
    this.fixedUpdate = function(timestamp){
        return self.addForce(self.gravity.multiply(timestamp * 10));
    }
    this.addForce = function(force){
        if(!(force instanceof Vector2)){
            throw TypeError("Force must be an instance of Vector2");
        }
        self.velocity.add(force);
        return self.velocity;
    }
    this.__construct(this, options);
}

Physics2D.prototype = new Component();
Physics2D.prototype.constructor = Physics2D;

module.exports = Physics2D;
},{}],9:[function(require,module,exports){
"use strict";

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
},{}],10:[function(require,module,exports){
"use strict";

function Transform(options){
    this.rotation = 0;
    this.__extend(Component, this, options);
    this.position = new Vector2({parent: this});
    this.__construct(this, options);
    this.rotation = this.rotation % 360;
}

Transform.prototype = new Component();
Transform.prototype.constructor = Transform;

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

Transform.prototype.add = function(transform){
    if(!(transform instanceof Transform)){
        throw TypeError("Object not an instance of Transform");
    }
    return new Transform({
        position: this.position.add(transform.position),
        rotation: this.rotation + transform.rotation
    });
}

Transform.prototype.multiply = function(transform){
    if(!(transform instanceof Transform)){
        throw TypeError("Object not an instance of Transform");
    }
    return new Transform({
        position: this.position.multiply(transform.position),
        rotation: this.rotation * transform.rotation
    });
}

Transform.prototype.divide = function(transform){
    if(!(transform instanceof Transform)){
        throw TypeError("Object not an instance of Transform");
    }
    return new Transform({
        position: this.position.divide(transform.position),
        rotation: this.rotation / transform.rotation
    });
}

Transform.prototype.subtract = function(transform){
    if(!(transform instanceof Transform)){
        throw TypeError("Object not an instance of Transform");
    }
    return new Transform({
        position: this.position.subtract(transform.position),
        rotation: this.rotation - transform.rotation
    });
}

Transform.prototype.equal = function(transform){
    if(!(transform instanceof Transform)){
        throw TypeError("Argument not an instance of Transform");
    }
    if(this.position.equal(transform.position) && this.rotation === transform.rotation){
        return true;
    }
    return false;
}

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
},{}],11:[function(require,module,exports){
"use strict";

function Vector2(options){
    this.__extend(Component, this, options);
    this.x = 0;
    this.y = 0;
    this.__construct(this, options);
}

Vector2.prototype = new Component();
Vector2.prototype.constructor = Vector2;

Vector2.prototype.up = function(){
    return new Vector2({
        x: 0,
        y: -1
    });
}

Vector2.prototype.left = function(){
    return new Vector2({
        x: -1,
        y: 0
    });
}

Vector2.prototype.one = function(){
    return new Vector2({
        x: 1,
        y: 1
    });
}

Vector2.prototype.right = function(){
    return new Vector2({
        x: 1,
        y: 0
    });
}

Vector2.prototype.down = function(){
    return new Vector2({
        x: 0,
        y: 1
    });
}

Vector2.prototype.zero = function(){
    return new Vector2({
        x: 0,
        y: 0
    });
}

Vector2.prototype.add = function(vector){
    switch(typeof vector){
        case 'object':
            if(!(vector instanceof Vector2)){
                throw TypeError("Object not an instance of Vector2");
            }
            return new Vector2({
                x: this.x + vector.x,
                y: this.y + vector.y
            });
            break;
        case 'number':
            return new Vector2({
                x: this.x + vector,
                y: this.y + vector
            });
            break;
        default:
            throw TypeError("Argument not a object or a number");        
    }
}

Vector2.prototype.multiply = function(vector){
    switch(typeof vector){
        case 'object':
            if(!(vector instanceof Vector2)){
                throw TypeError("Object not an instance of Vector2");
            }
            return new Vector2({
                x: this.x * vector.x,
                y: this.y * vector.y
            });
            break;
        case 'number':
            return new Vector2({
                x: this.x * vector,
                y: this.y * vector
            });
            break;
        default:
            throw TypeError("Argument not a object or a number");        
    }
}

Vector2.prototype.divide = function(vector){
    switch(typeof vector){
        case 'object':
            if(!(vector instanceof Vector2)){
                throw TypeError("Object not an instance of Vector2");
            }
            return new Vector2({
                x: this.x / vector.x,
                y: this.y / vector.y
            });
            break;
        case 'number':
            return new Vector2({
                x: this.x / vector,
                y: this.y / vector
            });
            break;
        default:
            throw TypeError("Argument not a object or a number");        
    }
}

Vector2.prototype.subtract = function(vector){
    switch(typeof vector){
        case 'object':
            if(!(vector instanceof Vector2)){
                throw TypeError("Object not an instance of Vector2");
            }
            return new Vector2({
                x: this.x - vector.x,
                y: this.y - vector.y
            });
            break;
        case 'number':
            return new Vector2({
                x: this.x - vector,
                y: this.y - vector
            });
            break;
        default:
            throw TypeError("Argument not a object or a number");        
    }
}

Vector2.prototype.equal = function(vector){
    if(!(vector instanceof Vector2)){
        throw TypeError("Argument not an instance of Vector2");
    }
    if(this.x === vector.r && this.y === vector.y){
        return true;
    }
    return false;
}

Vector2.prototype.lerp = function(a, b, t){
    if(!(a instanceof Vector2) || !(b instanceof Vector2)){
        throw TypeError("Argument not an instance of Vector2");
    }
    if(typeof t !== 'number'){
        throw TypeError("Argument must be a number");
    }
    t = Math.ceil(t * 1000) / 1000;
    return (new Vector2(b).subtract(a)).multiply(t);
}

module.exports = Vector2;
},{}],12:[function(require,module,exports){
"use strict";

function AudioClip(options){
    var self = this;
    this.__extend(GameObject, this, options);
    this.file = "";
    this.volume = 1.0;
    this.__construct(this, options);
    this.audio = new Audio(this.file);
    this.play = function(){
        if(self.enabled){
            self.audio.play();
        }
    }
    this.pause = function(){
        if(self.enabled){
            self.audio.oause();
        }
    }
    this.time = 0;
    this.duration = 0;
    this.__init = function(){
        self.duration = self.audio.duration;
        self.audio.load();
        self.audio.fastSeek(0);
    }
    this.__update = function(JSGameEngine){
        if(self.audio.src !== self.file){
            self.audio.src = self.file;
        }
        self.time = self.audio.currentTime;
        self.duration = self.audio.duration;
        self.onFixedUpdate(JSGameEngine);
    }
    this.__fixedUpdate = function(JSGameEngine){
        self.onFixedUpdate(JSGameEngine);
    }
    delete this.transform;
    delete this.components;
    delete this.width;
    delete this.height;
    delete this.visible;
}

AudioClip.prototype = new GameObject();
AudioClip.prototype.constructor = AudioClip;

module.exports = AudioClip;
},{}],13:[function(require,module,exports){
"use strict";

function Background(options){
    var self = this;
    this.__extend(GameObject, this, options);
    this.color = new Color({
        r: 0,
        g: 0,
        b: 0,
        alpha: 0,
        parent: this
    });
    this.image = "";
    this.imageWidth = 0;
    this.imageHeight = 0;
    this.__construct(this, options);
    var image = document.createElement("img");
    var loaded = false;
    var pattern;
    this.__update = function(JSGameEngine){
        var ctx = JSGameEngine.ctx;
        if(self.image !== image.src){
            loaded = false;
            pattern = undefined;
            image.onload = function(){
                self.imageWidth = image.width;
                self.imageHeight = image.height;
                loaded = true;
            }
            image.src = self.image;
        }
        if(!loaded){
            if(self.color.alpha > 0){
                ctx.fillStyle = self.color.toString();
            }
        }else{
            if(pattern === undefined){
                pattern = ctx.createPattern(image, 'repeat');
            }
            ctx.fillStyle = pattern;
        }
        ctx.fillRect(Math.round(self.transform.position.x), Math.round(self.transform.position.y), Math.round(self.width), Math.round(self.height));
        self.onUpdate(JSGameEngine);
    };
    this.__init = function(JSGameEngine){
        image.onload = function(){
            self.imageWidth = image.width;
            self.imageHeight = image.height;
            loaded = true;
        }
        image.src = self.image;
        self.width = self.width || JSGameEngine.width;
        self.height = self.height || JSGameEngine.height;
    };
}

Background.prototype = new GameObject();
Background.prototype.constructor = Background;

module.exports = Background;
},{}],14:[function(require,module,exports){
"use strict";

function Particle(options){
    this.__extend(GameObject, this, options);
    this.speed = new Vector2();
    this.radius = 1;
    this.life = 1;
    this.remainingLife = 1;
    this.color = new Color({
        r: 255,
        g: 255,
        b: 255,
        alpha: 1
    });
    this.__construct(this, options);
    this.remainingLife = this.life;
}

Particle.prototype = new GameObject();
Particle.prototype.constructor = Particle;

module.exports = Particle;
},{}],15:[function(require,module,exports){
"use strict";

function ParticleSystem(options){
    var self = this;
    this.__extend(GameObject, this, options);
    this.count = 50;
    this.speed = new Vector2({
        x: 2,
        y: 2,
        parent: self
    });
	this.color = new Color({
		r: 255,
		g: 255,
		b: 255,
        parent: self
	});
	this.loop = false;
	this.blendMode = "lighter";
	this.glow = true;
	this.life = 100;
	this.radius = 10;
	this.radial = true;
    this.particles = [];
    var speed = new Vector2(this.speed);
    var width = this.width;
    var height = this.height;
    this.__construct(this, options);
	function addParticle(index){
        var particle = new Particle({
            transform: new Transform(self.transform),
            speed: new Vector2({
				x: speed.x + Math.random() * speed.x, 
				y: speed.y + Math.random() * speed.y
            }),
            radius: self.radius + Math.random() * self.radius,
            life: self.life + Math.random() * self.life,
            color: new Color({
                r: Math.round(Math.random() * self.color.r),
                g: Math.round(Math.random() * self.color.g),
                b: Math.round(Math.random() * self.color.b)
            }),
            parent: self
        });
		if(typeof index !== 'undefined'){
			self.particles[index] = particle;
		}else{
			self.particles.push(particle);
		}
	}
    this.__update = function(JSGameEngine){
		if(self.radial){
			speed.x = (Math.random() * (self.speed.x * 2)) - self.speed.x;
			speed.y = (Math.random() * (self.speed.y * 2)) - self.speed.y;
		}else{
			speed.x = self.speed.x;
			speed.y = self.speed.y;
		}
		if(self.particles.length < self.count){
			for(var i = 0; i < self.count - self.particles.length; i++){
				addParticle();
			}
		}
		if(self.particles.length > self.count){
			for(var i = 0; i < self.particles.length - self.count; i++){
				self.particles.pop();
			}
		}
		var ctx = JSGameEngine.ctx;
		if(self.blendMode){
			ctx.globalCompositeOperation = self.blendMode;
		}
		for(var i = 0; i < self.particles.length; i++){
			var p = self.particles[i];
			ctx.beginPath();
			p.color.alpha = Math.round(p.remainingLife / p.life * self.count) / self.count;
			if(typeof p.color.alpha !== 'number' || isNaN(p.color.alpha)){
				addParticle(i);
				continue;
			}
			var gradient = ctx.createRadialGradient(p.transform.position.x, p.transform.position.y, 0, p.transform.position.x, p.transform.position.y, p.radius);
			gradient.addColorStop(0, "rgba(" + p.color.r + ", " + p.color.g + ", " + p.color.b + ", " + p.color.alpha + ")");
			gradient.addColorStop(0.5, "rgba(" + p.color.r + ", " + p.color.g + ", " + p.color.b + ", " + p.color.alpha + ")");
			if(self.glow){
				gradient.addColorStop(1, "rgba(" + p.color.r + ", " + p.color.g + ", " + p.color.b + ", " + 0 + ")");
			}else{
				gradient.addColorStop(1, "rgba(" + p.color.r + ", " + p.color.g + ", " + p.color.b + ", " + p.color.alpha + ")");
			}				
			ctx.fillStyle = gradient;
			ctx.arc(Math.round(p.transform.position.x), Math.round(p.transform.position.y), Math.round(p.radius), Math.PI * 2, false);
			ctx.fill();
			p.remainingLife--;
			p.radius--;
			p.transform.position = p.transform.position.add(p.speed);

			if(p.remainingLife < 0 || p.radius < 0){
				if(self.loop){
					addParticle(i);
				}else{
					self.particles.splice(i, 1);
				}
			}
		}
        self.onUpdate(JSGameEngine);
    };
    this.__init = function(JSGameEngine){};
    this.__fixedUpdate = function(JSGameEngine){
        if(self.width !== width){
            self.radius = self.width / 2;
            width = self.width;
        }
        if(self.height !== height){
            self.radius = self.height / 2;
            height = self.height;
        }
		self.width = self.radius * 2;
		self.height = self.radius * 2;
        self.onFixedUpdate(JSGameEngine);
    }
}

ParticleSystem.prototype = new GameObject();
ParticleSystem.prototype.constructor = ParticleSystem;

module.exports = ParticleSystem;
},{}],16:[function(require,module,exports){
"use strict";

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
},{}],17:[function(require,module,exports){
"use strict";

function Text(options){
    var self = this;
    this.__extend(GameObject, this, options);
    this.color = new Color({parent: this});
    this.text = "";
    this.font = "Helvetica";
    this.size = 20;
    this.bold = false;
    this.italic = false;
    this.underline = false;
    this.__construct(this, options);
    function setStyle(ctx){
        var bold = "";
        var italic = "";
        var underline = "";
        if(self.bold){
            bold = "bold ";
        }
        if(self.italic){
            italic = "italic ";
        }
        if(self.underline){
            underline = "underline ";
        }
        ctx.fillStyle = self.color.toString();
        ctx.font = bold + italic + Math.round(self.size) + "px " + self.font;
    }
    this.__update = function(JSGameEngine){
        var ctx = JSGameEngine.ctx;
        setStyle(ctx);
        ctx.fillText(self.text, Math.round(self.transform.position.x), Math.round(self.transform.position.y));
        self.onUpdate(JSGameEngine);
    };
    this.__init = function(JSGameEngine){
        self.transform.parent = self;
        self.transform.position.parent = self.transform;
        self.color.parent = self;
    };
    this.__fixedUpdate = function(JSGameEngine){
        var ctx = JSGameEngine.ctx;
        setStyle(ctx);
        self.height = self.size;
        self.width = Math.round(ctx.measureText(self.text).width);
        self.onFixedUpdate(JSGameEngine);
    }
}

Text.prototype = new GameObject();
Text.prototype.constructor = Text;

module.exports = Text;
},{}],18:[function(require,module,exports){
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
},{}],19:[function(require,module,exports){
/**
 * @file JSGame Time class.
 * @author Thomas Alrek
 */

"use strict";

/**
 * Creates an instance of Time.
 * <p><i>
 * JSGame automatically creates a shared Time class that can be used globally,
 * so there generally is not needed to instantiate it manually.
 * </i></p>
 * @constructor
 * @param {Object} options An object containing construct options
 * @property {number} deltaTime The time elapsed since the last update (frame)
 * @property {number} fixedDeltaTime The time elapsed since the last fixedUpdate
 * @property {number} fixedTime The total elapsed fixedUpdate time
 * @property {number} fps The current framerate in frames per second
 * @property {number} frameCount The total amount of frames drawn
 * @property {number} lastFixedUpdateTime Timestamp since last fixedUpdate call
 * @property {number} lastUpdateTime Timestamp since last update call
 * @property {number} maximumDeltaTime The highest deltaTime that has occured
 * @property {number} maximumFixedDeltaTime The highest fixedDeltaTime that has occured
 * @property {number} smoothDeltaTime A rounded deltaTime
 * @property {number} smoothFixedDeltaTime A rounded fixedDeltaTime
 * @property {number} startupTime Timestamp of game startup
 * @property {number} time Timestamp of current game time
 */
function Time(options){
    /** @private */ this.__construct(options);
    this.startupTime = 0;
    this.frameCount = 0;
    this.deltaTime = 0;
    this.fixedDeltaTime = 0;
    this.smoothDeltaTime = 0;
    this.smoothFixedDeltaTime = 0;
    this.maximumDeltaTime = 0;
    this.maximumFixedDeltaTime = 0;
    this.time = this.startupTime;
    this.fixedTime = this.startupTime;
    this.lastUpdateTime = this.startupTime;
    this.lastFixedUpdateTime = this.startupTime;
    this.fps = 0;
    return this;
}

Time.prototype = new Constructor(true);

/**
 * Updates the interal framerate clock.
 * Automatically called every update (frame)
 * 
 * @param {number} timestamp A timestamp to update to
 */
Time.prototype.update = function(timestamp){
    var self = this;
    var timestamp = timestamp || 0;
    timestamp = timestamp / 1000;
    self.time = timestamp;
    if(self.startupTime === 0){
        self.startupTime = self.time;
        self.lastUpdateTime = self.startupTime;
    }
    self.deltaTime = (self.time - self.lastUpdateTime);
    if(self.deltaTime > self.maximumDeltaTime){
        self.maximumDeltaTime = self.deltaTime;
    }
    self.smoothDeltaTime = parseFloat(self.deltaTime.toFixed(2));
    self.lastUpdateTime = self.time;
    self.fps = (1.0 / self.deltaTime).toFixed(1);
    self.frameCount++;
}

/**
 * Updates the interal fixed clock.
 * Automatically called every fixedUpdate
 * 
 * @param {number} timestamp A timestamp to update to
 */
Time.prototype.fixedUpdate = function(timestamp){
    var self = this;
    var timestamp = timestamp || 0;
    timestamp = timestamp / 1000;
    self.fixedTime = timestamp;
    if(self.startupTime === 0){
        self.startupTime = self.fixedTime;
        self.lastFixedUpdateTime = self.startupTime;
    }
    self.fixedDeltaTime = (self.fixedTime - self.lastFixedUpdateTime);
    if(self.fixedDeltaTime > self.maximumFixedDeltaTime){
        self.maximumFixedDeltaTime = self.fixedDeltaTime;
    }
    self.smoothFixedDeltaTime = parseFloat(self.fixedDeltaTime.toFixed(2));
    self.lastFixedUpdateTime = self.fixedTime;
}

/**
 * Returns the given framerate as time
 *
 * @param {number} fps The framerate to convert, E.g 60
 * @return {number} time
 */
Time.prototype.framerateToTime = function(fps){
    return ((1 / fps));
}

module.exports = Time;
},{}]},{},[1]);
