/**
 * @file JSGame Input Component.
 * @package jsgame
 * @copyright (c) 2016, Thomas Alrek
 * @author Thomas Alrek <thomas@alrek.no>
 */

"use strict";

/**
 * @class Input
 * Creates a new instance of Input.
 * <p><i>Input is an instance of Component</i></p>
 *
 * @constructor
 * @param {options} options An object containing construct options
 */
function Input(options){
    var self = this;
    this.__extend(Component, this, options);
    this.__construct(this, options);
    this.onKeyDown = function(){};
    this.onKeyUp = function(){};
    this.keys = {};
    this.touches = [];

    function keydownHandler(e){
        self.keys[e.keyCode] = true;
        self.onKeyDown(e.keyCode);
    };

    function keyupHandler(e){
        self.keys[e.keyCode] = false;
        self.onKeyUp(e.keyCode);
    };

    /* stubs */
    function touchstartHandler(){};
    function touchendHandler(){};
    function touchcancelHandler(){};
    function touchmoveHandler(){};
    function mousedownHandler(){};
    function mouseupHandler(){};
    function mouseoverHandler(){};
    function mouseoutHandler(){};
    function mousemoveHandler(){};
    function clickHandler(){};
    function contextmenuHandler(){};
    function dblclickHandler(){};

    this.__init = function(JSGameEngine){
        JSGameEngine.canvas.addEventListener("touchstart", touchstartHandler, false);
        JSGameEngine.canvas.addEventListener("touchend", touchendHandler, false);
        JSGameEngine.canvas.addEventListener("touchcancel", touchcancelHandler, false);
        JSGameEngine.canvas.addEventListener("touchmove", touchmoveHandler, false);
        JSGameEngine.canvas.addEventListener("mousedown", mousedownHandler, false);
        JSGameEngine.canvas.addEventListener("mouseup", mouseupHandler, false);
        JSGameEngine.canvas.addEventListener("mouseover", mouseoverHandler, false);
        JSGameEngine.canvas.addEventListener("mouseout", mouseoutHandler, false);
        JSGameEngine.canvas.addEventListener("mousemove", mousemoveHandler, false);
        JSGameEngine.canvas.addEventListener("click", clickHandler, false);
        JSGameEngine.canvas.addEventListener("contextmenu", contextmenuHandler, false);
        JSGameEngine.canvas.addEventListener("dblclick", dblclickHandler, false);
        document.addEventListener("keydown", keydownHandler, false);
        document.addEventListener("keyup", keyupHandler, false);
    }
}

Input.prototype = new Component();
Input.prototype.constructor = Input;

/* key definitions */
Input.prototype.Enter =     13;
Input.prototype.Shift =     16;
Input.prototype.Ctrl =      17;
Input.prototype.Esc =       27;
Input.prototype.Space =     32;
Input.prototype.Left =      37;
Input.prototype.Up =        38;
Input.prototype.Right =     39;
Input.prototype.Down =      40;
Input.prototype.A =         65;
Input.prototype.B =         66;
Input.prototype.C =         67;
Input.prototype.D =         68;
Input.prototype.E =         69;
Input.prototype.F =         70;
Input.prototype.G =         71;
Input.prototype.H =         72;
Input.prototype.I =         73;
Input.prototype.J =         74;
Input.prototype.K =         75;
Input.prototype.L =         76;
Input.prototype.M =         77;
Input.prototype.N =         78;
Input.prototype.O =         79;
Input.prototype.P =         80;
Input.prototype.Q =         81;
Input.prototype.R =         82;
Input.prototype.S =         83;
Input.prototype.T =         84;
Input.prototype.U =         85;
Input.prototype.V =         86;
Input.prototype.W =         87;
Input.prototype.X =         88;
Input.prototype.Y =         89;
Input.prototype.Z =         90;

module.exports = Input;