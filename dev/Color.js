"use strict";

function Color(options){
    this.alpha = 1;
    this.r = 255;
    this.g = 255;
    this.b = 255;
    this.__construct(options);
    return this;
}

Color.prototype = new JSGamePrimitive();

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