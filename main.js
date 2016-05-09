"use strict";

var game = new JSGameEngine({
    canvas: document.getElementById("screen")
});

var particles = game.addComponent(new ParticleSystem({
    radius: 50,
    transform: new Transform({
        position: new Vector2({
            x: game.width / 2, 
            y: game.height / 2
        })
    })
}));

var particles = game.addComponent(new ParticleSystem({
    radius: 50,
    transform: new Transform({
        position: new Vector2({
            x: game.width / 2 / 2, 
            y: game.height / 2 / 2
        })
    })
}));

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

var target = new Color({
    r: Math.random() * 255,
    g: Math.random() * 255,
    b: Math.random() * 255
});

helloWorldText.target = new Transform();

setInterval(function(){
    target = new Color({
        r: Math.random() * 255,
        g: Math.random() * 255,
        b: Math.random() * 255
    });
    helloWorldText.target.position.x = Math.random() * game.width - helloWorldText.width / 2;
    helloWorldText.target.position.y = Math.random() * game.height - helloWorldText.height / 2;
}, 500);

helloWorldText.onUpdate = function(game){
    this.color = this.color.add(this.color.lerp(this.color, target, Time.deltaTime));
    this.text = "Hello World!!! " + Time.fps + " FPS";
    this.transform.position = this.transform.position.add(this.transform.position.lerp(this.transform.position, this.target.position, Time.deltaTime));
}

particles.onUpdate = function(){
    this.color = this.color.add(this.color.lerp(this.color, target, Time.deltaTime));
}