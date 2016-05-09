"use strict";

function AudioClip(options){
    var self = this;
    this.__extend(GameObject, this, options);
    this.file = "";
    this.volume = 1.0;
    this.__construct(this, options);
    this.audio = new Audio(this.file);
    this.play = function(){
        if(self.enabled){
            self.audio.play();
        }
    }
    this.pause = function(){
        if(self.enabled){
            self.audio.oause();
        }
    }
    this.time = 0;
    this.duration = 0;
    this.__init = function(){
        self.duration = self.audio.duration;
        self.audio.load();
        self.audio.fastSeek(0);
    }
    this.__update = function(JSGameEngine){
        if(self.audio.src !== self.file){
            self.audio.src = self.file;
        }
        self.time = self.audio.currentTime;
        self.duration = self.audio.duration;
        self.onFixedUpdate(JSGameEngine);
    }
    this.__fixedUpdate = function(JSGameEngine){
        self.onFixedUpdate(JSGameEngine);
    }
    delete this.transform;
    delete this.components;
    delete this.width;
    delete this.height;
    delete this.visible;
}

AudioClip.prototype = new GameObject();
AudioClip.prototype.constructor = AudioClip;