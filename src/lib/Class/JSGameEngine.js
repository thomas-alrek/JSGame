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