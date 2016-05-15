"use strict";

var game = new JSGameEngine({
    canvas: document.getElementById("screen")
});

var sprite = game.addComponent(new Sprite({
    image: "assets/sprite.png",
    size: new Vector2({
        x: 64,
        y: 96
    }),
    visible: false
}));

sprite.transform.position.y = game.height - sprite.height;
sprite.visible = true;

var fps = game.addComponent(new Text({
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
sprite.components.input.onUpdate = function(JSGameEngine){
    var speed = 5;
    for(var key in this.keys){
        key = parseInt(key);
        if(this.keys[key]){
            switch(key){
                case this.keyA:
                    if(this.parent.transform.position.x > this.parent.width){
                        this.parent.target.position.x -= speed;
                    }else{
                        this.parent.target.position.x = this.parent.transform.position.x;
                    }
                    this.parent.flipHorizontal = true;
                break;
                case this.keyD:
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
sprite.onUpdate = function(){
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

fps.onUpdate = function(){
    this.text = Time.fps + " fps";
}