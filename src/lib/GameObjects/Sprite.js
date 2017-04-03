/**
 * @file JSGame Sprite GameObject.
 * @package jsgame
 * @copyright (c) 2016, Thomas Alrek
 * @author Thomas Alrek <thomas@alrek.no>
 */

"use strict";

import GameObject from '../Class/GameObject';
import { Vector2 } from '../Components/Vector2';
import Time from '../Util/Time';
import { invert } from '../Util/Math';

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
class Sprite extends GameObject {
    constructor(options) {
        super(options);
        this.image = '';
        this.flipHorizontal = false;
        this.flipVertical = false;
        this.index = 0;
        this.size = new Vector2();
        this.velocity = new Vector2();
        this.sprites = [];
        this.srcImage = new Image();
        this.srcImage.setAttribute('crossOrigin','anonymous');
        this.loadedStatus = false;
    }

    get lastPosition() {
        return this.transform.position;
    }

    set lastPosition(position) {
        this.transform.position = position;
    }

    get loadedStatus() {
        return this.loaded;
    }

    set loadedStatus(value) {
        this.loaded = value;
    }

    createSprites() {
        const preCalc = (offsetX, offsetY, ctx, canvas, xScale, yScale) =>  {
            ctx.save();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.scale(xScale, yScale);
            ctx.drawImage(this.srcImage, offsetX, offsetY, this.size.x, this.size.y, 0, 0, canvas.width * xScale, canvas.height * yScale);
            const img = new Image();
            img.setAttribute('crossOrigin','anonymous');
            img.src = canvas.toDataURL();
            ctx.restore();
            return img;
        };
        let index = 0;
        const canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        const ctx = canvas.getContext('2d');
        for(let x = 0; x < this.srcImage.width; x += this.size.x){
            for(let y = 0; y < this.srcImage.height; y += this.size.y){
                ctx.save();
                this.sprites[index] = [];
                this.sprites[index].push(preCalc(x, y, ctx, canvas, 1, 1));
                this.sprites[index].push(preCalc(x, y, ctx, canvas, -1, 1));
                this.sprites[index].push(preCalc(x, y, ctx, canvas, 1, -1));
                this.sprites[index].push(preCalc(x, y, ctx, canvas, -1, -1));
                ctx.restore();
                index++;
            }
        }
        console.log(`${index} sprites generated`);
    }

    __update(JSGameEngine) {
        const loaded = this.loadedStatus;
        if(loaded) {
            if(this.index > this.sprites.length - 1){
                this.index = 0;
            }
            if(this.index < 0){
                this.index = this.sprites.length - 1;
            }
            let flipIndex = 0;
            if(this.flipHorizontal && this.flipVertical){
                flipIndex = 3;
            } else {
                if(this.flipHorizontal){
                    flipIndex = 1;
                }
                if(this.flipVertical){
                    flipIndex = 2;
                }
            }
            if(this.sprites.length > 0){
                JSGameEngine.ctx.drawImage(
                    this.sprites[this.index][flipIndex],
                    this.transform.position.x,
                    this.transform.position.y
                );
            }
        }
        let velocityX = (this.transform.position.x - this.lastPosition.x) / Time.deltaTime;
        if(velocityX < 0){
            velocityX = invert(velocityX);
        }
        this.velocity.x = Math.round(velocityX);
        let velocityY = (this.transform.position.y - this.lastPosition.y) / Time.deltaTime;
        if(velocityY < 0){
            velocityY = invert(velocityY);
        }
        this.velocity.y = Math.round(velocityY);
        this.lastPosition = this.transform.position;
        this.onUpdate(JSGameEngine);
    }

    __init(JSGameEngine) {
        this.srcImage.onload = () => {
            if(this.size.x === 0 && this.size.y === 0){
                this.size.x = this.srcImage.width;
                this.size.y = this.srcImage.height;
            }
            this.width = this.size.x;
            this.height = this.size.y;
            this.createSprites();
            this.loadedStatus = true;
        };
        this.srcImage.src = this.image;
    }
}

export { Sprite };