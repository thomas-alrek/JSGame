"use strict";

Time = new Time();

var canvas = document.getElementById("screen");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var a = new GameObject();
var b = new GameObject();
a.physics = new Physics2D();
var target = new Vector2();

canvas.addEventListener("mousemove", function(e){
    b.transform.position.x = e.pageX;
    b.transform.position.y = e.pageY;
});

var timeText = "";
var ticking = false;
var millis = 0;
var seconds = 0;
var minutes = 0;

var bg = new Color();
var targetColor = new Color({r: 0, g: 128, b: 255});

ctx.strokeStyle = "#f00";
ctx.fillStyle = "yellow";
ctx.font = "20px Arial";

function render(delta){
    Time.update(delta);
    requestAnimationFrame(render);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    a.transform.position = a.transform.position.add(new Vector2().lerp(a.transform.position, b.transform.position, Time.smoothDeltaTime * 1));
    ctx.strokeRect(Math.round(a.transform.position.x) + 0.5, Math.round(a.transform.position.y) + 0.5, 100, 100);
    ctx.fillText((1.0 / Time.deltaTime).toFixed(1) + " FPS", 5, 20);
    ctx.fillText(timeText, 5, 50);
    ctx.restore();
    var boxCol =  new Color();
    boxCol.alpha = 0.5;
    ctx.save();
    ctx.shadowColor = "black";
    ctx.shadowBlur = 10;
    ctx.fillStyle = boxCol.toString();
    ctx.fillRect(100, 100, 100, 100);
    ctx.restore();
    bg = bg.add(new Color().lerp(bg, targetColor, Time.deltaTime * 10)).clamp();
    document.body.style.backgroundColor = bg.toString();
    //document.getElementById("tree").innerHTML = ObjectTree(a).toString();
}

function fixedUpdate(){
    setTimeout(function(){
        Time.fixedUpdate(performance.now());
        targetColor = new Color({
            r: document.getElementById("r").value,
            g: document.getElementById("g").value,
            b: document.getElementById("b").value        
        });
        fixedUpdate();
    }, Time.framerateToTime(50) * 1000);  
}

render();
fixedUpdate();