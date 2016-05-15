/**
 * @file JSGame Sprite GameObject.
 * @author Thomas Alrek
 */

"use strict";

/**
 * @class Sprite
 * Creates a new instance of Sprite.
 * <p><i>Sprite is an instance of GameObject</i></p>
 *
 * @constructor
 * @param {options} options An object containing construct options
 * @property {String} image The url of the image or spritesheet to load
 * @property {boolean} flipHorizontal If true, mirrors the Sprite in the horizontal axis
 * @property {boolean} flipVertical If true, mirrors the Sprite in the vertical axis
 * @property {number} index The current sprite to display. (If loaded from a spritesheet)
 * @property {Vector2} size The size of each sprite in the spritesheet. If undefined, the entire image is used as a single Sprite
 * @property {Image[]} sprites An array containing an array of all pre calculated sprites
 */
function Sprite(options){
    var self = this;
    this.__extend(GameObject, this, options);
    this.image = "";
    this.flipHorizontal = false;
    this.flipVertical = false;
    this.index = 0;
    this.size = new Vector2();
    this.__construct(this, options);
    this.velocity = new Vector2();
    var lastPosition = this.transform.position;
    this.sprites = [];
    var srcImage = new Image();
    var loaded = false;
    function createSprites(){ 
        function preCalc(offsetX, offsetY, ctx, canvas, xScale, yScale){
            ctx.save();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.scale(xScale, yScale);
            ctx.drawImage(srcImage, offsetX, offsetY, self.size.x, self.size.y, 0, 0, canvas.width * xScale, canvas.height * yScale);
            var img = new Image();
            img.src = canvas.toDataURL();
            ctx.restore();
            return img;
        }
        var index = 0;
        var canvas = document.createElement("canvas");
        canvas.width = self.width;
        canvas.height = self.height;
        var ctx = canvas.getContext('2d');
        for(var x = 0; x < srcImage.width; x += self.size.x){
            for(var y = 0; y < srcImage.height; y += self.size.y){
                ctx.save();
                self.sprites[index] = [];
                self.sprites[index].push(preCalc(x, y, ctx, canvas, 1, 1));
                self.sprites[index].push(preCalc(x, y, ctx, canvas, -1, 1));
                self.sprites[index].push(preCalc(x, y, ctx, canvas, 1, -1));
                self.sprites[index].push(preCalc(x, y, ctx, canvas, -1, -1));
                ctx.restore();
                index++;
            }
        }
        console.log(index + " sprites generated");
    };
    this.__update = function(JSGameEngine){
        if(loaded){
            if(self.index > self.sprites.length - 1){
                self.index = 0;
            }
            if(self.index < 0){
                self.index = self.sprites.length - 1;
            }
            var flipIndex = 0;
            if(self.flipHorizontal && self.flipVertical){
                flipIndex = 3;
            }else{
                if(self.flipHorizontal){
                    flipIndex = 1;
                }
                if(self.flipVertical){
                    flipIndex = 2;
                }
            }
            if(self.sprites.length > 0){
                JSGameEngine.ctx.drawImage(self.sprites[self.index][flipIndex], self.transform.position.x, self.transform.position.y);
            }
        }
        var velocityX = (this.transform.position.x - lastPosition.x) / Time.deltaTime;
        if(velocityX < 0){
            velocityX = Math.invert(velocityX);
        }
        this.velocity.x = Math.round(velocityX);
        var velocityY = (this.transform.position.y - lastPosition.y) / Time.deltaTime;
        if(velocityY < 0){
            velocityY = Math.invert(velocityY);
        }
        this.velocity.y = Math.round(velocityY);
        lastPosition = this.transform.position;
        self.onUpdate(JSGameEngine);
    };
    this.__init = function(JSGameEngine){
        srcImage.onload = function(){
            if(self.size.x === 0 && self.size.y === 0){
                self.size.x = srcImage.width;
                self.size.y = srcImage.height;
            }
            self.width = self.size.x;
            self.height = self.size.y;
            createSprites();
            loaded = true;
        }
        srcImage.src = self.image;
    };
}

Sprite.prototype = new GameObject();
Sprite.prototype.constructor = Sprite;

module.exports = Sprite;