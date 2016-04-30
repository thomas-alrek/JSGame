"use strict";

function Color(options){
    var self = this;
    this.alpha = 1;
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.clamp = function(){
        return new Color({
            r: Math.round(Math.clamp(self.r, 0, 255)),
            g: Math.round(Math.clamp(self.g, 0, 255)),
            b: Math.round(Math.clamp(self.b, 0, 255))
        });
    }
    this.__construct(options);
    this.toString = function(){
        var stringColor = new Color(this).clamp();
        return "rgba(" + stringColor.r + "," + stringColor.g + "," + stringColor.b + "," + stringColor.alpha + ")";
    }
    return this;
}

Color.prototype = new JSGameComponent();

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

Color.prototype.add = function(color){
    if(typeof color === 'number'){
        return new Color({
            r: this.r + color,
            g: this.g + color,
            b: this.b + color
        });
    }
    if(color instanceof Color){
        return new Color({
            r: this.r + color.r,
            g: this.g + color.g,
            b: this.b + color.b
        });
    }
    throw TypeError("Color can't be added with " + typeof color);
}

Color.prototype.multiply = function(color){
    if(typeof color === 'number'){
        return new Color({
            r: this.r * color,
            g: this.g * color,
            b: this.b * color
        });
    }
    if(color instanceof Color){
        return new Color({
            r: this.r * color.r,
            g: this.g * color.g,
            b: this.b * color.b
        });
    }
    throw TypeError("Color can't be multiplied with " + typeof color);
}

Color.prototype.divide = function(color){
    if(typeof color === 'number'){
        if(color === 0){
            throw Error("Division by zero");
        }else{
            return new Color({
                r: this.r / color,
                g: this.g / color,
                b: this.b / color
            });
        }
    }
    if(color instanceof Color){
        if(color.r === 0 || color.g === 0 || color.b === 0){
            throw Error("Division by zero");
        }else{
            return new Color({
                r: this.r / color.r,
                g: this.g / color.g,
                b: this.b / color.b
            });
        }
    }
    if(!divideColor){
        throw TypeError("Color can't be divided with " + typeof color);
    }
}

Color.prototype.subtract = function(color){
    if(typeof color === 'number'){
        return new Color({
            r: this.r - color,
            g: this.g - color,
            b: this.b - color
        });
    }
    if(color instanceof Color){
        return new Color({
            r: this.r - color.r,
            g: this.g - color.g,
            b: this.b - color.b
        });
    }
    throw TypeError("Color can't be subtracted with " + typeof color);
}

Color.prototype.lerp = function(a, b, t){
    if(!(a instanceof Color) || !(b instanceof Color)){
        throw TypeError("Argument must be an instance of Color");
    }
    if(typeof t !== 'number'){
        throw TypeError("Argument must be a number");
    }
    return (new Color(b).subtract(a)).multiply(t);
}