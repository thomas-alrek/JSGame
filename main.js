"use strict";

var game = new JSGameEngine({
    canvas: document.getElementById("screen")
});

game.addComponent(new Text({
    text: "Hello World!",
    color: new Color({
        r: 255,
        g: 255,
        b: 255
    }),
    transform: new Transform({
        position: new Vector2({
            x: 100,
            y: 100
        })
    })
}), "helloWorldText");