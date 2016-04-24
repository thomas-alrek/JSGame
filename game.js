var engine = new Engine("screen");

var background = new GameObject();

background.x = 0;
background.y = 0;
background.width = engine.width;
background.height = engine.height;
background.render = function(engine){
	engine.ctx.fillRect(background.x, background.y, background.width, background.height);
}

var backgroundLayer = new Layer();

var fpsMeter0 = new Text(engine.fps() + " FPS", 0, 100);
var fpsMeter1 = new Text("Yolo" + " FPS", 0, 120);
var fpsMeter2 = new Text("Nope" + " FPS", 0, 140);
fpsMeter0.color = "#f00";
fpsMeter1.color = "#0f0";
fpsMeter2.color = "#00f";

backgroundLayer.add("background", background);
backgroundLayer.add("fpsMeter0", fpsMeter0);
backgroundLayer.add("fpsMeter1", fpsMeter1);
backgroundLayer.add("fpsMeter2", fpsMeter2);

engine.addObject("background", fpsMeter0);

setInterval(function(){
	//fpsMeter.y++;
	fpsMeter0.string = engine.fps() + " FPS";
	fpsMeter0.x = engine.width - fpsMeter0.width;
	fpsMeter1.string = engine.fps() + " FPS";
	fpsMeter1.x = engine.width - fpsMeter1.width;
	fpsMeter2.string = engine.fps() + " FPS";
	fpsMeter2.x = engine.width - fpsMeter1.width;
	fpsMeter0.x = engine.width - fpsMeter0.width - 100;
	fpsMeter1.x = engine.width - fpsMeter1.width - 100;
	fpsMeter2.x = engine.width - fpsMeter2.width - 100;
},10);