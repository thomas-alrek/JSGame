"use strict";

var game = new JSGameEngine({
    canvas: document.getElementById("screen")
});

var particles = game.addComponent(new ParticleSystem({
    transform: new Transform({
        position: new Vector2({
            x: game.width / 2 / 2, 
            y: game.height / 2 / 2
        })
    })
}));

particles.targetColor = new Color({
    r: Math.random() * 255,
    g: Math.random() * 255,
    b: Math.random() * 255
});

particles.target = new Transform();

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
var helloWorldTextRotation = 0;

setInterval(function(){
    particles.targetColor = new Color({
        r: Math.random() * 255,
        g: Math.random() * 255,
        b: Math.random() * 255
    });
    particles.target.position.x = Math.random() * game.width - particles.width / 2;
    particles.target.position.y = Math.random() * game.height - particles.height / 2;
    helloWorldText.target.position.x = Math.random() * game.width - helloWorldText.width / 2;
    helloWorldText.target.position.y = Math.random() * game.height - helloWorldText.height / 2;
}, 1500);

helloWorldText.onUpdate = function(game){
    this.color = this.color.add(this.color.lerp(this.color, particles.targetColor, Time.deltaTime));
    this.text = "Hello World!!! " + Time.fps + " FPS";
    //this.transform.position = this.transform.position.add(this.transform.position.lerp(this.transform.position, this.target.position, Time.deltaTime));
    this.transform.rotation += Math.lerp(this.transform.rotation, helloWorldTextRotation, Time.deltaTime);
}

particles.onUpdate = function(){
    this.color = this.color.add(this.color.lerp(this.color, this.targetColor, Time.deltaTime));
    this.transform.position = this.transform.position.add(this.transform.position.lerp(this.transform.position, this.target.position, Time.deltaTime));
    this.transform.rotation += Math.lerp(this.transform.rotation, 1080, Time.deltaTime / 10);
}

setInterval(function(){
    helloWorldTextRotation += 10;
}, 500);