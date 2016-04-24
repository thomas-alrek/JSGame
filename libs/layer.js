function Layer(x, y, width, height){
	var layer = this;
	this.objects = {};
	this.canvas = document.createElement("canvas");
	this.canvas.width = 100;
	this.canvas.height = 50;
	this.ctx = this.canvas.getContext("2d");
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.tick = function(engine){
		Object.keys(layer.objects).forEach(function(key){
			if(typeof layer.objects[key].tick === 'function'){
				layer.objects[key].tick(layer);
			}
		});
	}

	this.render = function(engine){
		Object.keys(layer.objects).forEach(function(key){
			if(typeof layer.objects[key].render === 'function' && layer.objects[key].visible){
				var _fillStyle = layer.ctx.fillStyle;
				var _strokeStyle = layer.ctx.strokeStyle;
				var _font = layer.ctx.font;

		    	layer.objects[key].render(layer);

		    	layer.ctx.fillStyle = _fillStyle;
		    	layer.ctx.strokeStyle = _strokeStyle;
		    	layer.ctx.font = _font;
			}
		});
		//console.log(layer.canvas);
		engine.ctx.drawImage(layer.canvas, layer.x, layer.y, layer.width, layer.height);
		//layer.visible = false;
	}
}

Layer.prototype = new GameObject();

Layer.prototype.add = function(id, obj){
	if(typeof this.objects[id] !== 'undefined'){
		throw "child with id '" + id + "' already exist in layer";
	}

	if(typeof obj === 'undefined'){
		var obj = new GameObject();
	}

	this.objects[id] = obj;
	return true;
}

Layer.prototype.remove = function(id){
	if(typeof layer.objects[id] !== 'undefined'){
		delete layer.objects[id];
		return true;
	}
	throw "child with id '" + id + "' not found in layer";
}