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
            b: Math.round(Math.clamp(self.b, 0, 255)),
            alpha: Math.clamp(self.alpha, 0, 1)
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

Color.prototype.red = function(){
    return new Color({
        r: 255,
        g: 0,
        b: 0
    });
}

Color.prototype.green = function(){
    return new Color({
        r: 0,
        g: 255,
        b: 0
    });
}

Color.prototype.blue = function(){
    return new Color({
        r: 0,
        g: 0,
        b: 255
    });
}

Color.prototype.black = function(){
    return new Color({
        r: 0,
        g: 0,
        b: 0
    });
}

Color.prototype.white = function(){
    return new Color({
        r: 255,
        g: 255,
        b: 255
    });
}

Color.prototype.cyan = function(){
    return new Color({
        r: 0,
        g: 255,
        b: 255
    });
}

Color.prototype.magenta = function(){
    return new Color({
        r: 255,
        g: 0,
        b: 255
    });
}

Color.prototype.yellow = function(){
    return new Color({
        r: 255,
        g: 255,
        b: 0
    });
}

Color.prototype.grey = function(){
    return new Color({
        r: 128,
        g: 128,
        b: 128
    });
}

Color.prototype.add = function(color){
    switch(typeof color){
        case 'object':
            if(!(color instanceof Color)){
                throw TypeError("Object not an instance of Color");
            }
            return new Color({
                r: this.r + color.r,
                g: this.g + color.g,
                b: this.b + color.b
            });
            break;
        case 'number':
            return new Color({
                r: this.r + color,
                g: this.g + color,
                b: this.b + color
            });
            break;
        default:
            throw TypeError("Argument not a object or a number");        
    }
}

Color.prototype.multiply = function(color){
    switch(typeof color){
        case 'object':
            if(!(color instanceof Color)){
                throw TypeError("Object not an instance of Color");
            }
            return new Color({
                r: this.r * color.r,
                g: this.g * color.g,
                b: this.b * color.b
            });
            break;
        case 'number':
            return new Color({
                r: this.r * color,
                g: this.g * color,
                b: this.b * color
            });
            break;
        default:
            throw TypeError("Argument not a object or a number");        
    }
}

Color.prototype.divide = function(color){
    switch(typeof color){
        case 'object':
            if(!(color instanceof Color)){
                throw TypeError("Object not an instance of Color");
            }
            return new Color({
                r: this.r / color.r,
                g: this.g / color.g,
                b: this.b / color.b
            });
            break;
        case 'number':
            return new Color({
                r: this.r / color,
                g: this.g / color,
                b: this.b / color
            });
            break;
        default:
            throw TypeError("Argument not a object or a number");        
    }
}

Color.prototype.subtract = function(color){
    switch(typeof color){
        case 'object':
            if(!(color instanceof Color)){
                throw TypeError("Object not an instance of Color");
            }
            return new Color({
                r: this.r - color.r,
                g: this.g - color.g,
                b: this.b - color.b
            });
            break;
        case 'number':
            return new Color({
                r: this.r - color,
                g: this.g - color,
                b: this.b - color
            });
            break;
        default:
            throw TypeError("Argument not a object or a number");        
    }
}

Color.prototype.equal = function(color){
    if(!(color instanceof Color)){
        throw TypeError("Argument not an instance of Color");
    }
    if(this.r === color.r && this.g === color.g && this.b === color.b){
        return true;
    }
    return false;
}

Color.prototype.lerp = function(a, b, t){
    if(!(a instanceof Color) || !(b instanceof Color)){
        throw TypeError("Argument not an instance of Color");
    }
    if(typeof t !== 'number'){
        throw TypeError("Argument must be a number");
    }
    return (new Color(b).subtract(a)).multiply(t);
}