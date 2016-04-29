"use strict";

Time = new Time();

var canvas = document.getElementById("screen");
var ctx = canvas.getContext("2d");

function render(delta){
    Time.update(delta);
    requestAnimationFrame(render);    
}

function fixedUpdate(){
    setTimeout(function(){
        Time.fixedUpdate(performance.now());
        fixedUpdate();
    }, Time.framerateToTime(50) * 1000);   
}

render();
fixedUpdate();