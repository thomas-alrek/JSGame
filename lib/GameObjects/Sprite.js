"use strict";

function Sprite(options){
    var self = this;
    this.__extend(GameObject, this, options);
    this.onUpdate = function(JSGameEngine){}
    this.onFixedUpdate = function(JSGameEngine){};
    this.__update = function(JSGameEngine){
        self.onUpdate(JSGameEngine);
    };
    this.__init = function(JSGameEngine){};
    this.__fixedUpdate = function(JSGameEngine){
        self.onFixedUpdate(JSGameEngine);
    }
    this.__construct(this, options);
}

Sprite.prototype = new GameObject();
Sprite.prototype.constructor = Sprite;