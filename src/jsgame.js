"use strict";

global.Constructor = require("./lib/Class/Constructor.js");
global.JSGameEngine = require("./lib/Class/JSGameEngine");
global.Math = require("./lib/Util/Math.js");
global.Component = require("./lib/Class/Component.js");
global.Time = require("./lib/Util/Time.js");
global.Physics2D = require("./lib/Components/Physics2D.js");
global.Vector2 = require("./lib/Components/Vector2.js");
global.Transform = require("./lib/Components/Transform.js");
global.Shadow = require("./lib/Components/Shadow.js");
global.Input = require("./lib/Components/Input.js");
global.GameObject = require("./lib/Class/GameObject.js");
global.Color = require("./lib/Components/Color.js");
global.Text = require("./lib/GameObjects/Text.js");
global.Sprite = require("./lib/GameObjects/Sprite.js");
global.Particle = require("./lib/GameObjects/Particle.js");
global.ParticleSystem = require("./lib/GameObjects/ParticleSystem.js");
global.AudioClip = require("./lib/GameObjects/AudioClip.js");
global.Background = require("./lib/GameObjects/Background.js");

/**
 * @file An Object that can override every public property of a GameObject or Component
 * @author Thomas Alrek
 * @namespace
 * @name options
 */