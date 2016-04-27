function ParticleSystem(options){
	
	var _this = this;
	
	var particles = [];
	this.count = 50;
	this.speed = {
		x: 0,
		y: 0
	}
	this.color = {
		r: 255,
		g: 255,
		b: 255,
	}
	this.glow = true;
	this.life = 10;
	this.radius = 10;
	this.radial = true;

	var _speed = {
		x: this.speed.x,
		y: this.speed.y
	}
	
	function _addParticle(index){
		
		var particle = new Particle({
			speed: {
				x: _speed.x + Math.random() * _speed.x, 
				y: _speed.y + Math.random() * _speed.y
			},
			position: {
				x: _this.position.x + _this.radius, 
				y: _this.position.y + _this.radius
			},
			radius: _this.radius + Math.random() * _this.radius,
			life: _this.life + Math.random() * _this.life,
			r: Math.round(Math.random() * _this.color.r),
			g: Math.round(Math.random() * _this.color.g),
			b: Math.round(Math.random() * _this.color.b),
			alpha: 1
		});
		if(typeof index !== 'undefined'){
			particles[index] = particle;
		}else{
			particles.push(particle);
		}
	}
	
	for(var i = 0; i < this.count; i++){
		_addParticle();
	}

	this._tick = function(renderer){

		if(_this.radial){
			_speed.x = (Math.random() * (_this.speed.x * 2)) - _this.speed.x;
			_speed.y = (Math.random() * (_this.speed.y * 2)) - _this.speed.y;
		}else{
			_speed.x = _this.speed.x;
			_speed.y = _this.speed.y;
		}
		
		if(particles.length < _this.count){
			for(var i = 0; i < _this.count - particles.length; i++){
				_addParticle();
			}
		}
		if(particles.length > _this.count){
			for(var i = 0; i < particles.length - _this.count; i++){
				particles.pop();
			}
		}
		_this.width = _this.radius * 2;
		_this.height = _this.radius * 2;
	}

	this._render = function(renderer){
		
		if(_this.glow){
			renderer.ctx.globalCompositeOperation = "lighter";
		}
		
		for(var i = 0; i < particles.length; i++){
			var p = particles[i];
			renderer.ctx.beginPath();
			p.alpha = Math.round(p.remainingLife / p.life * _this.count) / _this.count;
			if(typeof p.alpha !== 'number' || isNaN(p.alpha)){
				_addParticle(i);
				continue;
			}
			var gradient = renderer.ctx.createRadialGradient(p.position.x, p.position.y, 0, p.position.x, p.position.y, p.radius);
			gradient.addColorStop(0, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", " + p.alpha + ")");
			gradient.addColorStop(0.5, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", " + p.alpha + ")");
			if(_this.glow){
				gradient.addColorStop(1, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", " + 0 + ")");
			}else{
				gradient.addColorStop(1, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", " + p.alpha + ")");
			}				
			renderer.ctx.fillStyle = gradient;
			renderer.ctx.arc(p.position.x, p.position.y, p.radius, Math.PI * 2, false);
			renderer.ctx.fill();
			p.remainingLife--;
			p.radius--;
			p.position.x += p.speed.x;
			p.position.y += p.speed.y;

			if(p.remainingLife < 0 || p.radius < 0){
				_addParticle(i);
			}
		}
	}
	
	this._loadOptions(options); //Overwrite default options from options object
}

ParticleSystem.prototype = new GameObject();