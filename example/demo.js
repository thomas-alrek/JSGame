"use strict";

import {JSGameEngine} from "./lib/Class/JSGameEngine";
import {Sprite} from "./lib/GameObjects/Sprite.js";
import {Vector2} from "./lib/Components/Vector2.js";
import {ParticleSystem} from "./lib/GameObjects/ParticleSystem.js";
import {Text} from "./lib/GameObjects/Text.js";
import {Color} from "./lib/Components/Color.js";
import {Transform} from "./lib/Components/Transform.js";
import {Input} from "./lib/Components/Input.js";
import {Time} from "./lib/Util/Time.js";



const game = new JSGameEngine({
    canvas: document.getElementById("screen")
});

const sprite = game.addComponent(new Sprite({
    image: "assets/sprite.png",
    size: new Vector2({
        x: 100,
        y: 100
    }),
    visible: false
}));

const particles = game.addComponent(new ParticleSystem());
particles.transform.position.x = (game.width / 2) - particles.width / 2;
particles.transform.position.y = (game.height / 2) - particles.height / 2;

sprite.transform.position.y = game.height - sprite.height;
sprite.visible = true;

const fps = game.addComponent(new Text({
    size: 40,
    text: "0 fps",
    color: new Color().yellow()
}));

fps.transform.position.y = 50;
fps.transform.position.x = 10;

//we use a target instead of directly manipulating the transform, because then we can lerp the transform to the target for framerate independent movement
sprite.target = new Transform(sprite.transform);
sprite.addComponent(new Input(), "input");   //add input handler


//handle multiple inputs
sprite.components.input.onUpdate = (JSGameEngine) => {
    const speed = 5;
    for(let key in this.keys){
        key = parseInt(key);
        if(this.keys[key]){
            switch(key){
                case this.A:
                    if(this.parent.transform.position.x > this.parent.width){
                        this.parent.target.position.x -= speed;
                    }else{
                        this.parent.target.position.x = this.parent.transform.position.x;
                    }
                    this.parent.flipHorizontal = true;
                break;
                case this.D:
                    if(this.parent.transform.position.x < game.width - this.parent.width){
                        this.parent.target.position.x += speed;
                    }else{
                        this.parent.target.position.x = this.parent.transform.position.x;
                    }
                    this.parent.flipHorizontal = false;
                break;
            }
        }
    }   
}

//apply movement
sprite.onUpdate = () => {
    if(Time.frameCount % 4 == 0){
        this.index++;
    }
    if(this.transform.position.x < 0){
        this.transform.position.x = 0;
    }
    if(this.transform.position.x > game.width - this.width){
        this.transform.position.x = game.width - this.width;
    }
    if(this.transform.position.y < 0){
        this.transform.position.y = 0;
    }
    if(this.transform.position.y > game.height - this.height){
        this.transform.position.y = game.height - this.height;
    }
    this.transform.position = this.transform.position.add(this.transform.position.lerp(this.transform.position, this.target.position, Time.deltaTime));
}

fps.onUpdate = () => {
    this.text = `${Time.fps} fps`;
}
