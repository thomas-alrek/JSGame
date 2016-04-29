"use strict";

function Time(options){
    var self = this;
    this.startupTime = 0;
    this.frameCount = 0;
    this.deltaTime = 0;
    this.time = this.startupTime;
    this.lastFrameTime = this.startupTime;
    this.__construct(options);
    this.tick = function(timestamp){
        var timestamp = timestamp || 0;
        timestamp = timestamp / 1000;
        if(self.startupTime === 0){
            self.startupTime = self.time;
            self.lastFrameTime = self.startupTime;
        }
        self.time = timestamp;
        self.deltaTime = (self.time - self.lastFrameTime);
        self.lastFrameTime = timestamp;
        self.frameCount++;
    }
    return this;
}

Time.prototype = new JSGamePrimitive();