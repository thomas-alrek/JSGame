"use strict";

var game = new JSGameEngine({
    canvas: document.getElementById("screen")
});

var particles = game.addComponent(new ParticleSystem({
    radius: 16,
    count: 50,
    life: 50,
    radial: false,
    speed: new Vector2({
        x: 0.4,
        y: -2.5
    }),
    transform: new Transform({
        position: new Vector2({
            x: game.width / 2, 
            y: game.height / 2
        })
    })
}));

var instructions = game.addComponent(new Text({
  text: "Control me with WASD",
    color: new Color({
        r: 255,
        g: 0,
        b: 0
    }),
    transform: new Transform({
        position: new Vector2({
            x: particles.transform.position.x + particles.width + 40, 
            y: particles.transform.position.y - particles.height - 40
        })
    })
}));

particles.targetColor = new Color({
    r: Math.random() * 255,
    g: Math.random() * 255,
    b: Math.random() * 255
});

//we use a target instead of directly manipulating the transform, because then we can lerp the transform to the target for framerate independent movement
particles.target = new Transform(particles.transform);
particles.addComponent(new Input(), "input");   //add input handler

//handle multiple inputs
particles.components.input.onUpdate = function(JSGameEngine){
    var speed = 50;
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
                break;
                case this.keyW:
                    if(this.parent.transform.position.y > this.parent.height){
                        this.parent.target.position.y -= speed;
                    }else{
                        this.parent.target.position.y = this.parent.transform.position.y;
                    }
                break;
                case this.keyD:
                    if(this.parent.transform.position.x < game.width - this.parent.width){
                        this.parent.target.position.x += speed;
                    }else{
                        this.parent.target.position.x = this.parent.transform.position.x;
                    }
                break;
                case this.keyS:
                    if(this.parent.transform.position.y < game.height - this.parent.height){
                        this.parent.target.position.y += speed;
                    }else{
                        this.parent.target.position.y = this.parent.transform.position.y;
                    }
                break;
            }
        }
    }
}

//handle single input
/*
particles.components.input.onKeyDown = function(key){
     switch(key){
         case this.keyA:
            this.parent.transform.position.x -= 10;
         break;
         case this.keyW:
             this.parent.transform.position.y -= 10;
         break;
         case this.keyD:
             this.parent.transform.position.x += 10;
         break;
         case this.keyS:
            this.parent.transform.position.y += 10;
         break;
         default:
             console.log(key);
            return;
     }
}
*/

//apply movement
particles.onUpdate = function(){
    if(this.transform.position.x < this.width){
        this.transform.position.x = this.width;
    }
    if(this.transform.position.x > game.width - this.width){
        this.transform.position.x = game.width - this.width;
    }
    if(this.transform.position.y < this.height){
        this.transform.position.y = this.height;
    }
    if(this.transform.position.y > game.height - this.height){
        this.transform.position.y = game.height - this.height;
    }
    this.transform.position = this.transform.position.add(this.transform.position.lerp(this.transform.position, this.target.position, Time.deltaTime));
    instructions.transform.position.x = this.transform.position.x + this.width + 40;
    instructions.transform.position.y = this.transform.position.y - this.height - 40;
}

var helloWorldText = game.addComponent(new Text({
    size: 60,
    text: "Hello World!",
    color: new Color({
        r: 255,
        g: 255,
        b: 255
    }),
    bold: true,
    transform: new Transform({
        position: new Vector2({
            x: 100,
            y: 100
        })
    })
}));

helloWorldText.target = new Transform();
helloWorldText.addComponent(new Shadow());
var helloWorldTextRotation = 0;

setInterval(function(){
    particles.targetColor = new Color({
        r: Math.random() * 255,
        g: Math.random() * 255,
        b: Math.random() * 255
    });
    helloWorldText.target.position.x = Math.random() * game.width - helloWorldText.width / 2;
    helloWorldText.target.position.y = Math.random() * game.height - helloWorldText.height / 2;
}, 1500);

helloWorldText.onUpdate = function(game){
    this.color = this.color.add(this.color.lerp(this.color, particles.targetColor, Time.deltaTime));
    this.text = "Hello World!!! " + Time.fps + " FPS";
    this.transform.position = this.transform.position.add(this.transform.position.lerp(this.transform.position, this.target.position, Time.deltaTime));
    this.transform.rotation += Math.lerp(this.transform.rotation, helloWorldTextRotation, Time.deltaTime);
}

setInterval(function(){
    helloWorldTextRotation += 10;
}, 500);