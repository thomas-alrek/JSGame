"use strict";

function Text(options){
    var self = this;
    this.__extend(GameObject, this, options);
    this.addComponent(new Color({parent: this}), "color");
    this.color = this.components.color;
    var self = this;
    this.text = "";
    this.font = "Helvetica";
    this.size = 10;
    this.bold = false;
    this.italic = false;
    this.underline = false;
    this.onUpdate = function(JSGameEngine){}
    this.onFixedUpdate = function(JSGameEngine){};
    this.__update = function(JSGameEngine){
        var ctx = JSGameEngine.ctx;
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
        ctx.font = self.size + "px " + bold + italic + underline + self.font;
        ctx.fillText(self.text, self.transform.position.x, self.transform.position.y);
        self.onUpdate(JSGameEngine);
    };
    this.__init = function(JSGameEngine){
        
    };
    this.__fixedUpdate = function(JSGameEngine){
        self.onFixedUpdate(JSGameEngine);
    }
    this.__construct(this, options);
}

Text.prototype = new GameObject();
Text.prototype.constructor = Text;