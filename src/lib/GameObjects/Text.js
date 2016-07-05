/**
 * @file JSGame Text GameObject.
 * @package jsgame
 * @copyright (c) 2016, Thomas Alrek
 * @author Thomas Alrek <thomas@alrek.no>
 */

"use strict";

/**
 * @class Text
 * Creates a new instance of Text.
 * <p><i>Text is an instance of GameObject</i></p>
 *
 * @constructor
 * @param {options} options An object containing construct options
 * @property {Color} color The Color of this Text
 * @property {String} text The text value of this Text
 * @property {String} font The name of this Text's font
 * @property {number} size The font size of this Text
 * @property {boolean} bold If true this Text will be rendered bold
 * @property {boolean} italic If true this Text will be rendered italic
 * @property {boolean} underline If true this Text will be rendered with an underline 
 */
function Text(options){
    var self = this;
    this.__extend(GameObject, this, options);
    this.color = new Color();
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