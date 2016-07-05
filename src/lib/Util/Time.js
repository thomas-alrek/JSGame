/**
 * @file JSGame Time class.
 * @package jsgame
 * @copyright (c) 2016, Thomas Alrek
 * @author Thomas Alrek <thomas@alrek.no>
 */

"use strict";

/**
 * @class Time
 * Creates an instance of Time.
 * <p><i>
 * JSGame automatically creates a shared Time class that can be used globally,
 * so there generally is not needed to instantiate it manually.
 * </i></p>
 * @constructor
 * @param {Object} options An object containing construct options
 * @property {number} deltaTime The time elapsed since the last update (frame)
 * @property {number} fixedDeltaTime The time elapsed since the last fixedUpdate
 * @property {number} fixedTime The total elapsed fixedUpdate time
 * @property {number} fps The current framerate in frames per second
 * @property {number} frameCount The total amount of frames drawn
 * @property {number} lastFixedUpdateTime Timestamp since last fixedUpdate call
 * @property {number} lastUpdateTime Timestamp since last update call
 * @property {number} maximumDeltaTime The highest deltaTime that has occured
 * @property {number} maximumFixedDeltaTime The highest fixedDeltaTime that has occured
 * @property {number} smoothDeltaTime A rounded deltaTime
 * @property {number} smoothFixedDeltaTime A rounded fixedDeltaTime
 * @property {number} startupTime Timestamp of game startup
 * @property {number} time Timestamp of current game time
 */
function Time(options){
    /** @private */ this.__construct(options);
    this.startupTime = 0;
    this.frameCount = 0;
    this.deltaTime = 0;
    this.fixedDeltaTime = 0;
    this.smoothDeltaTime = 0;
    this.smoothFixedDeltaTime = 0;
    this.maximumDeltaTime = 0;
    this.maximumFixedDeltaTime = 0;
    this.time = this.startupTime;
    this.fixedTime = this.startupTime;
    this.lastUpdateTime = this.startupTime;
    this.lastFixedUpdateTime = this.startupTime;
    this.fps = 0;
    return this;
}

Time.prototype = new Constructor(true);

/**
 * Updates the interal framerate clock.
 * Automatically called every update (frame)
 * 
 * @param {number} timestamp A timestamp to update to
 */
Time.prototype.update = function(timestamp){
    var self = this;
    var timestamp = timestamp || 0;
    timestamp = timestamp / 1000;
    self.time = timestamp;
    if(self.startupTime === 0){
        self.startupTime = self.time;
        self.lastUpdateTime = self.startupTime;
    }
    self.deltaTime = (self.time - self.lastUpdateTime);
    if(self.deltaTime > self.maximumDeltaTime){
        self.maximumDeltaTime = self.deltaTime;
    }
    self.smoothDeltaTime = parseFloat(self.deltaTime.toFixed(2));
    self.lastUpdateTime = self.time;
    self.fps = (1.0 / self.deltaTime).toFixed(1);
    self.frameCount++;
}

/**
 * Updates the interal fixed clock.
 * Automatically called every fixedUpdate
 * 
 * @param {number} timestamp A timestamp to update to
 */
Time.prototype.fixedUpdate = function(timestamp){
    var self = this;
    var timestamp = timestamp || 0;
    timestamp = timestamp / 1000;
    self.fixedTime = timestamp;
    if(self.startupTime === 0){
        self.startupTime = self.fixedTime;
        self.lastFixedUpdateTime = self.startupTime;
    }
    self.fixedDeltaTime = (self.fixedTime - self.lastFixedUpdateTime);
    if(self.fixedDeltaTime > self.maximumFixedDeltaTime){
        self.maximumFixedDeltaTime = self.fixedDeltaTime;
    }
    self.smoothFixedDeltaTime = parseFloat(self.fixedDeltaTime.toFixed(2));
    self.lastFixedUpdateTime = self.fixedTime;
}

/**
 * Returns the given framerate as time
 *
 * @param {number} fps The framerate to convert, E.g 60
 * @return {number} time
 */
Time.prototype.framerateToTime = function(fps){
    return ((1 / fps));
}

module.exports = Time;