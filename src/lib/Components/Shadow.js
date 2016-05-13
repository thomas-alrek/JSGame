"use strict";

function Shadow(options){
    var self = this;
    this.__extend(Component, this, options);
    this.color = new Color();
    this.blur = 10;
    this.__update = function(JSGameEngine){
        var ctx = JSGameEngine.ctx;
        ctx.shadowBlur = self.blur;
        ctx.shadowColor = self.color.toString();
    }
    this.__construct(this, options);
}

Shadow.prototype = new Component();
Shadow.prototype.constructor = Shadow;

module.exports = Shadow;