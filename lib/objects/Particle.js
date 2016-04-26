function Particle(options){
	
	var _this = this;
	this.position = {
		x: 200,
		y: 200
	}
	this.speed = {
		x: 1, 
		y: 0
	};
	this.radius = 50;
	this.life = 10000;
	this.remainingLife = 0;
	this.r = 32;
	this.g = 255;
	this.b = 255;
	this.alpha = 1;
	this.glow = true;
	
	this._loadOptions(options); //Overwrite default options from options object
	
	this.remainingLife = this.life;
	
	this._tick = function(renderer){
		if(_this.remainingLife < 0 || _this.radius < 0){
			delete _this;
		}
		_this.remainingLife--;
		_this.radius--;
		_this.position.x += _this.speed.x;
		_this.position.y += _this.speed.y;
	}
	
	this._render = function(renderer){
	
		if(_this.alpha > 0 && _this.radius > 0){
			if(_this.glow){
				renderer.ctx.globalCompositeOperation = "lighter";
			}
				
			renderer.ctx.beginPath();
			_this.alpha = Math.round(_this.remainingLife / _this.life);
			var gradient = renderer.ctx.createRadialGradient(_this.position.x, _this.position.y, 0, _this.position.x, _this.position.y, _this.radius);
			gradient.addColorStop(0, "rgba(" + _this.r + ", " + _this.g + ", " + _this.b + ", " + _this.alpha + ")");
			gradient.addColorStop(0.5, "rgba(" + _this.r + ", " + _this.g + ", " + _this.b + ", " + _this.alpha + ")");
			gradient.addColorStop(1, "rgba(" + _this.r + ", " + _this.g + ", " + _this.b + ", 0)");
			renderer.ctx.fillStyle = gradient;
			renderer.ctx.arc(_this.position.x, _this.position.y, _this.radius, Math.PI * 2, false);
			renderer.ctx.fill();
		}
	}
}

Particle.prototype = new GameObject();