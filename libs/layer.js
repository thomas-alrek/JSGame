function Layer(x, y, width, height){
	var layer = this;
	this.objects = {};
	this.canvas = document.createElement("canvas");
	this.ctx = this.canvas.getContext("2d");
	this.x = x || 0;
	this.y = y || 0;
	this.width = width || 128;
	this.height = height || 128;

	this.clearOnRender = true;

	this.canvas.width = this.width;
	this.canvas.height = this.height;

	this.tick = function(engine){
		Object.keys(layer.objects).forEach(function(key){
			if(typeof layer.objects[key].tick === 'function'){
				layer.objects[key].tick(layer);
			}
		});
	}

	this.render = function(engine){

		if(this.clearOnRender){
			this.ctx.clearRect(0, 0, this.width, this.height);
		}

		Object.keys(layer.objects).forEach(function(key){
			if(typeof layer.objects[key].render === 'function' && layer.objects[key].visible){
				layer.ctx.save();
		    	layer.objects[key].render(layer);
				layer.ctx.restore();
			}
		});

/*
		if(layer.debug){
			Object.keys(layer.objects).forEach(function(key){
				if(layer.objects[key].visible){
					var _fillStyle = layer.ctx.fillStyle;
					var _strokeStyle = layer.ctx.strokeStyle;
					var _font = layer.ctx.font;
					var _globalAlpha = layer.ctx.globalAlpha;

					layer.ctx.strokeStyle = "#f00";
					layer.ctx.strokeRect(layer.objects[key].x, layer.objects[key].y, layer.objects[key].width, layer.objects[key].height);

			    	layer.ctx.fillStyle = _fillStyle;
			    	layer.ctx.strokeStyle = _strokeStyle;
			    	layer.ctx.font = _font;
			    	layer.ctx.globalAlpha = _globalAlpha;
				}
			});
		};
*/

		engine.ctx.drawImage(this.canvas, this.x, this.y, this.width, this.height);
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

	obj.parrent = this;

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