"use strict";

Time = new Time();

var canvas = document.getElementById("screen");
var ctx = canvas.getContext("2d");

function render(delta){
    Time.tick(delta);
    requestAnimationFrame(render);    
}

render();