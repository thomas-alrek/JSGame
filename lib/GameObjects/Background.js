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
                ctx.fillRect(self.transform.position.x, self.transform.position.y, self.width, self.height);
            }
        }else{
            if(pattern === undefined){
                pattern = ctx.createPattern(image, 'repeat');
            }
            ctx.fillStyle = pattern;
            ctx.fillRect(self.transform.position.x, self.transform.position.y, self.width, self.height);
        }
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