"use strict";

function Component(){
    this.parent = undefined;
}

Component.prototype.toString = function(){
    return JSON.stringify(this);
}

Component.prototype = new Constructor();