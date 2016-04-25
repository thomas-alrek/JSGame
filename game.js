var engine = new Engine("screen");
engine.debug = true;

var background = new GameObject();
background.width = engine.width;
background.height = engine.height;
background.render = function(engine){
	engine.ctx.fillRect(background.x, background.y, background.width, background.height);
}

var ps1Target = {
    x: 0,
    y: 0
}

var ps2Target = {
    x: 0,
    y: 0
}

var ps3Target = {
    x: 0,
    y: 0
}

var backgroundLayer = new Layer(0,0,engine.width,engine.height);
backgroundLayer.add("background", background);

var particle1 = new Particle(0, 0, 5, "#f00", "#f22", 20)
var particle2 = new Particle(0, 0, 5, "#0f0", "#2f2", 20)
var particle3 = new Particle(0, 0, 5, "#00f", "#22f", 20)

var FPS = new Text("0 FPS", 0, 0);

FPS.color = "yellow";
FPS.font = "Courier";
FPS.size = 30;

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
engine.addObject("PS1", ps1);
engine.addObject("PS2", ps2);
engine.addObject("PS3", ps3);
engine.addObject("FPS", FPS);

setInterval(function(){
	ps1Target.x = Math.random() * (engine.width - ps1.width);
	ps1Target.y = Math.random() * (engine.height - ps1.height);
	ps2Target.x = Math.random() * (engine.width - ps2.width);
	ps2Target.y = Math.random() * (engine.height - ps2.height);
	ps3Target.x = Math.random() * (engine.width - ps3.width);
	ps3Target.y = Math.random() * (engine.height - ps3.height);
}, 500);

setInterval(function(){
	ps1.x += (ps1Target.x - ps1.x) * 0.01;
	ps1.y += (ps1Target.y - ps1.y) * 0.01;
	ps2.x += (ps2Target.x - ps2.x) * 0.01;
	ps2.y += (ps2Target.y - ps2.y) * 0.01;
	ps3.x += (ps3Target.x - ps3.x) * 0.01;
	ps3.y += (ps3Target.y - ps3.y) * 0.01;
}, 0);

setInterval(function(){
	FPS.string = Math.floor(engine.fps()) + " FPS";
}, 0);