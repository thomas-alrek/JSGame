function ParticleSystem(){
	var particleSystem = this;
	var particles = [];
	this.x = 0;
	this.y = 0;
	this.count = 100;
	this.speed = {
		x: 0,
		y: 0
	}
	this.color = {
		r: 255,
		g: 255,
		b: 255,
	}
	this.life = 10;
	this.radius = 10;
	
	function particle(){
		this.speed = {
			x: particleSystem.speed.x + Math.random() * particleSystem.speed.x, 
			y: particleSystem.speed.y + Math.random() * particleSystem.speed.y
		};
		this.location = {
			x: particleSystem.x + particleSystem.radius, 
			y: particleSystem.y + particleSystem.radius
		};
		this.radius = particleSystem.radius + Math.random() * particleSystem.radius;
		this.life = particleSystem.life + Math.random() * particleSystem.life;
		this.remaining_life = this.life;
		this.r = Math.round(Math.random() * particleSystem.color.r);
		this.g = Math.round(Math.random() * particleSystem.color.g);
		this.b = Math.round(Math.random() * particleSystem.color.b);
	}
	
	for(var i = 0; i < this.count; i++){
		particles.push(new particle());
	}

	this.tick = function(engine){
		particleSystem.width = particleSystem.radius * 2;
		particleSystem.height = particleSystem.radius * 2;
	}

	this.render = function(engine){
		engine.ctx.globalCompositeOperation = "lighter";
		
		for(var i = 0; i < particles.length; i++){
			var p = particles[i];
			engine.ctx.beginPath();
			p.opacity = Math.round(p.remaining_life / p.life * particleSystem.count) / particleSystem.count;
			var gradient = engine.ctx.createRadialGradient(p.location.x, p.location.y, 0, p.location.x, p.location.y, p.radius);
			gradient.addColorStop(0, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", " + p.opacity + ")");
			gradient.addColorStop(0.5, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", " + p.opacity + ")");
			gradient.addColorStop(1, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", 0)");
			engine.ctx.fillStyle = gradient;
			engine.ctx.arc(p.location.x, p.location.y, p.radius, Math.PI * 2, false);
			engine.ctx.fill();
			p.remaining_life--;
			p.radius--;
			p.location.x += p.speed.x;
			p.location.y += p.speed.y;

			if(p.remaining_life < 0 || p.radius < 0){
				particles[i] = new particle();
			}
		}
	}
}

ParticleSystem.prototype = new GameObject();