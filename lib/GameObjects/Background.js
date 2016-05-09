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
    this.__update = function(JSGameEngine){
        var ctx = JSGameEngine.ctx;
        if(self.color.alpha > 0){
            ctx.fillStyle = self.color.toString();
            ctx.fillRect(self.transform.position.x, self.transform.position.y, self.width, self.height);
        }
        if(loaded){
            if(self.image !== "" && image.width && image.height){
                image.width = self.imageWidth;
                image.height = self.imageHeight;
                ctx.drawImage(image, self.transform.position.x, self.transform.position.y, self.imageWidth, self.imageHeight);
            }
        }
        self.onUpdate(JSGameEngine);
    };
    this.__init = function(JSGameEngine){
        image.onload = function(){
            self.imageWidth = image.width;
            self.imageHeight = image.height;
            loaded = true;
        }
        image.src = this.image;
        self.width = self.width || JSGameEngine.width;
        self.height = self.height || JSGameEngine.height;
    };
}

Background.prototype = new GameObject();
Background.prototype.constructor = Background;