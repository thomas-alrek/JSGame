function Text(str, x, y){
	var text = this;
	this.string = str;
	this.size = 20;
	this.height = this.size;
	this.font = "Courier";
	this.color = "#000";
	this.x = x;
	this.y = y;

	this.tick = function(engine){
		text.width = engine.ctx.measureText(text.string).width;
		text.height = text.size;
	}

	this.render = function(engine){
		engine.ctx.font = text.size + "px " + text.font;
		engine.ctx.fillStyle = text.color;
		engine.ctx.fillText(text.string, text.x, text.y + text.height);
	}
}

Text.prototype = new GameObject();