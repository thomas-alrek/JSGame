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
    this.onUpdate = function(JSGameEngine){}
    this.onFixedUpdate = function(JSGameEngine){};
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
        ctx.font = bold + italic + self.size + "px " + self.font;
    }
    this.__update = function(JSGameEngine){
        var ctx = JSGameEngine.ctx;
        setStyle(ctx);
        ctx.fillText(self.text, self.transform.position.x, self.transform.position.y);
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
        self.width = ctx.measureText(self.text).width;
        self.onFixedUpdate(JSGameEngine);
    }
    this.__construct(this, options);
}

Text.prototype = new GameObject();
Text.prototype.constructor = Text;