var engine = new Engine("screen");

var background = new GameObject();
background.width = engine.width;
background.height = engine.height;
background.render = function(engine){
	engine.ctx.fillRect(background.x, background.y, background.width, background.height);
}

var backgroundLayer = new Layer(0,0,engine.width,engine.height);
var foregroundLayer = new Layer(0,0,engine.width,engine.height);

backgroundLayer.add("background", background);
foregroundLayer.clearOnRender = false;

var fpsMeter0 = new Text(engine.fps() + " FPS", 0, 100);
var fpsMeter1 = new Text("Yolo" + " FPS", 0, 120);
var fpsMeter2 = new Text("Nope" + " FPS", 0, 140);
fpsMeter0.color = "#f00";
fpsMeter1.color = "#0f0";
fpsMeter2.color = "#00f";
fpsMeter0.size = 40;
fpsMeter1.size = 20;
fpsMeter2.size = 60;

foregroundLayer.add("fpsMeter0", fpsMeter0);
foregroundLayer.add("fpsMeter1", fpsMeter1);
foregroundLayer.add("fpsMeter2", fpsMeter2);
foregroundLayer.add("fpsMeter3", fpsMeter0);
foregroundLayer.add("fpsMeter4", fpsMeter1);
foregroundLayer.add("fpsMeter5", fpsMeter2);
foregroundLayer.add("fpsMeter6", fpsMeter0);
foregroundLayer.add("fpsMeter7", fpsMeter1);
foregroundLayer.add("fpsMeter8", fpsMeter2);
foregroundLayer.add("fpsMeter9", fpsMeter0);
foregroundLayer.add("fpsMeter10", fpsMeter1);
foregroundLayer.add("fpsMeter11", fpsMeter2);

engine.addObject("background", backgroundLayer);
engine.addObject("foreground", foregroundLayer);

setInterval(function(){
	fpsMeter0.string = engine.fps() + " FPS";
	fpsMeter1.string = engine.fps() + " FPS";
	fpsMeter2.string = engine.fps() + " FPS";
},10);

setInterval(function(){
	//backgroundLayer.visible = !backgroundLayer.visible;
	fpsMeter0.x = Math.floor(Math.random() * fpsMeter0.parrent.width - fpsMeter0.width);
	fpsMeter1.x = Math.floor(Math.random() * fpsMeter1.parrent.width - fpsMeter1.width);
	fpsMeter2.x = Math.floor(Math.random() * fpsMeter2.parrent.width - fpsMeter2.width);
	fpsMeter0.y = Math.floor(Math.random() * fpsMeter0.parrent.height - fpsMeter0.height);
	fpsMeter1.y = Math.floor(Math.random() * fpsMeter1.parrent.height - fpsMeter1.height);
	fpsMeter2.y = Math.floor(Math.random() * fpsMeter2.parrent.height - fpsMeter2.height);
}, 0);