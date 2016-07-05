/**
 * @file JSGame AudioClip GameObject.
 * @package jsgame
 * @copyright (c) 2016, Thomas Alrek
 * @author Thomas Alrek <thomas@alrek.no>
 */

"use strict";

/**
 * @class AudioClip
 * Creates a new instance of AudioClip.
 * <p><i>AudioClip is an instance of GameObject</i></p>
  *
 * @constructor
 * @param {options} options An object containing construct options
 * @property {string} file The url of the Audio file
 * @property {number} volume A number between 0 and 1 representing audio volume
 * @property {HTMLAudioElement} audio The audio DOM object
 * @property {number} time The current playback position of the audio
 * @property {number} duration The total playback length of the audio
 */
function AudioClip(options){
    var self = this;
    this.__extend(GameObject, this, options);
    this.file = "";
    this.volume = 1.0;
    this.__construct(this, options);
    this.audio = new Audio(this.file);
    
    /**
     * Starts playback
     * 
     * @method
     * @name AudioClip#play
     */
    this.play = function(){
        if(self.enabled){
            self.audio.play();
        }
    }
    
    /**
     * Pause or unpause playback
     * 
     * @method
     * @name AudioClip#pause
     */
    this.pause = function(){
        if(self.enabled){
            self.audio.pause();
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

module.exports = AudioClip;