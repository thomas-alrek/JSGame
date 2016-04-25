var engine = new Engine("screen");
engine.debug = true;

var background = new GameObject();
background.width = engine.width;
background.height = engine.height;
background.render = function(engine){
	engine.ctx.fillRect(background.x, background.y, background.width, background.height);
}

var target = {
    x: 0,
    y: 0
}

var ballTarget = {
    x: 0,
    y: 0
}

var backgroundLayer = new Layer(0,0,engine.width,engine.height);
var foregroundLayer = new Layer(0,0, 640, 480);

var ball = new Particle(0, 0, 50, "#fff", "#fff", 20);

backgroundLayer.add("background", background);
foregroundLayer.clearOnRender = false;

var particle1 = new Particle(0, 0, 5, "#f00", "#f22", 20)
var particle2 = new Particle(0, 0, 5, "#0f0", "#2f2", 20)
var particle3 = new Particle(0, 0, 5, "#00f", "#22f", 20)

var FPS = new Text("0 FPS", 0, 0);

FPS.color = "yellow";
FPS.font = "Courier";
FPS.size = 30;

foregroundLayer.add("particle1", particle1);
foregroundLayer.add("particle2", particle2);
foregroundLayer.add("particle3", particle3);

var ps1 = new ParticleSystem();
ps1.x = 100;
ps1.y = 400;
ps1.speed.y = -3;
ps1.color.r = 32;

var ps2 = new ParticleSystem();
ps2.x = 200;
ps2.y = 400;
ps2.speed.y = -3;
ps2.color.g = 32;

var ps3 = new ParticleSystem();
ps3.x = 300;
ps3.y = 400;
ps3.speed.y = -3;
ps3.color.b = 32;

engine.addObject("background", backgroundLayer);
//engine.addObject("foreground", foregroundLayer);
//engine.addObject("ball", ball);
engine.addObject("PS1", ps1);
engine.addObject("PS2", ps2);
engine.addObject("PS3", ps3);
engine.addObject("FPS", FPS);

setInterval(function(){
	//backgroundLayer.visible = !backgroundLayer.visible;
	particle1.x = Math.floor(Math.random() * particle1.parrent.width - particle1.width);
	particle2.x = Math.floor(Math.random() * particle2.parrent.width - particle2.width);
	particle3.x = Math.floor(Math.random() * particle3.parrent.width - particle3.width);
	particle1.y = Math.floor(Math.random() * particle1.parrent.height - particle1.height);
	particle2.y = Math.floor(Math.random() * particle2.parrent.height - particle2.height);
	particle3.y = Math.floor(Math.random() * particle3.parrent.height - particle3.height);
}, 0);

setInterval(function(){
	target.x = Math.random() * (engine.width - foregroundLayer.width);
	target.y = Math.random() * (engine.height - foregroundLayer.height);
}, 2500);

setInterval(function(){
	ballTarget.x = Math.random() * (engine.width - ball.width);
	ballTarget.y = Math.random() * (engine.height - ball.height);
}, 1000);

setInterval(function(){
	ball.x += (ballTarget.x - ball.x) * 0.1;
	ball.y += (ballTarget.y - ball.y) * 0.1;
}, 0);

setInterval(function(){
	foregroundLayer.x += (target.x - foregroundLayer.x) * 0.01;
	foregroundLayer.y += (target.y - foregroundLayer.y) * 0.01;
}, 0);

setInterval(function(){
	FPS.string = Math.floor(engine.fps()) + " FPS";
}, 0);