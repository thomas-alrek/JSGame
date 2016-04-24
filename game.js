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

engine.addObject("background", backgroundLayer);
engine.addObject("foreground", foregroundLayer);
engine.addObject("ball", ball);
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