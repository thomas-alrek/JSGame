var engine = new Engine("screen");
engine.debug = true;

var FPS = new Text("0 FPS", 0, 0);
FPS.color = "yellow";
FPS.font = "Courier";
FPS.size = 30;

var fire1 = new Flame();
engine.addObject("fire1", fire1);
engine.addObject("FPS", FPS);

fire1.x = engine.width / 2 - fire1.width;
fire1.y = engine.height / 2 - fire1.height;

setInterval(function(){
	FPS.string = Math.floor(engine.fps()) + " FPS";
}, 0);