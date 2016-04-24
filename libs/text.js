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
		var font = engine.ctx.font;
		var fillStyle = engine.ctx.fillStyle;
		engine.ctx.font = text.size + "px " + text.font;
		engine.ctx.fillStyle = text.color;
		text.width = engine.ctx.measureText(text.string).width;
		text.height = text.size;
		engine.ctx.font = font;
		engine.ctx.fillStyle = fillStyle;
	}

	this.render = function(engine){
		engine.ctx.font = text.size + "px " + text.font;
		engine.ctx.fillStyle = text.color;
		engine.ctx.fillText(text.string, text.x, text.y + text.height);
	}
}

Text.prototype = new GameObject();