function Flame(){
	var flame = this;
	
	var center = new ParticleSystem();
	center.x = this.width / 2 - center.radius / 2;
	center.y = this.height - center.radius * 2;
	center.speed.y = -3;
	center.color.r = 0;
	center.color.g = 255;
	center.color.b = 255;

	var yellow = new ParticleSystem();
	yellow.radius = 16;
	yellow.x = this.width / 2 - yellow.radius / 2;
	yellow.y = this.height - yellow.radius * 2;
	yellow.speed.y = -3;
	yellow.color.r = 255;
	yellow.color.g = 255;
	yellow.color.b = 32;
	yellow.alpha = 0.2;

	var red = new ParticleSystem();
	red.radius = 17;
	red.x = this.width / 2 - red.radius / 2;
	red.y = (this.height - red.radius * 2) - 10;
	red.speed.y = -3;
	red.color.b = 32;
	red.color.g = 32;
	red.alpha = 0.5;

	var smoke = new ParticleSystem();
	smoke.x = this.width / 2 - smoke.radius / 2;
	smoke.y = (this.height - smoke.radius * 2) - 50;
	smoke.life = 1000;
	smoke.alpha = 0.08;
	smoke.radius = 16;
	smoke.speed.y = -5;
	smoke.speed.x = 0.5;
	smoke.color.r = 0;
	smoke.color.g = 0;
	smoke.color.b = 0;
	
	flame.add("smoke", smoke);
	flame.add("red", red);
	flame.add("yellow", yellow);
	flame.add("center", center);

}

Flame.prototype = new Layer();