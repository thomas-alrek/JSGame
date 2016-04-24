function Particle(x, y, size, color, glow, spread){
	var particle = this;
	this.size = size || 2;
	this.width = size * 2;
	this.height = size * 2;
	this.color = color || "#fff";
	this.x = x || 0;
	this.y = y || 0;
	this.spread = spread || 10;
	this.glow = glow || "#0f0";

	this.tick = function(engine){
		particle.width = particle.size * 2;
		particle.height = particle.size * 2;
	}

	this.render = function(engine){
		var radius = particle.size;
		engine.ctx.shadowColor = particle.glow;
		engine.ctx.shadowOffsetX = 0;
		engine.ctx.shadowOffsetY = 0;
		engine.ctx.shadowBlur = particle.spread;
		engine.ctx.beginPath();
		engine.ctx.arc(particle.x + particle.size, particle.y + particle.size, radius, 0, 2 * Math.PI, false);
		engine.ctx.fillStyle = particle.color;
		engine.ctx.fill();
	}
}

Particle.prototype = new GameObject();