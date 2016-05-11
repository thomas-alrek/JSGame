"use strict";

function Input(options){
    var self = this;
    this.__extend(Component, this, options);
    this.__construct(this, options);
}

Input.prototype = new Component();
Input.prototype.constructor = Input;