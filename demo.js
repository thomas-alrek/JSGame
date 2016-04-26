/************************
 * JS Game              *
 * Demo by Thomas Alrek *
 ************************/

var game = new JSGame();

var particle = game.add(new ParticleSystem({
	count: 300,
	speed: {
		x: 0,
		y: 0
	},
	color: {
		r: 32,
		g: 255,
		b: 255,
	},
	glow: true,
	life: 100,
	radius: 1,
	position: {
		x: game.width / 2,
		y: game.height / 2
	},
}));

particle.position.x =  game.width / 2 - particle.width / 2;
particle.position.y =  game.height / 2 - particle.height / 2;

var helloWorld = game.add(new Text({
	string: "JS Game",
	position: {
		x: game.width / 2,
		y: game.height / 2
	},
	weight: "bold",
	color: "yellow",
	fontsize: 0,
	shadow: {
		enabled: true,
		blur: 5,
		color: "#000",
		x: -1,
		y: -1
	}
}));

helloWorld.position.x =  game.width / 2 - helloWorld.width / 2;
helloWorld.position.y =  game.height / 2 - helloWorld.height / 2;
particle.position.x =  game.width / 2 - particle.width / 2;
particle.position.y =  game.height / 2 - particle.height / 2;

var scaleParticle = setInterval(function(){
	particle.radius++;
	particle.position.x =  game.width / 2 - particle.width / 2;
	particle.position.y =  game.height / 2 - particle.height / 2;
	if(particle.radius > 50){
		clearInterval(scaleParticle);
		particle.speed.x = 0.5;
		particle.speed.y = -4;
		particle.life = 100;
		setInterval(function(){
			particle.rotation -= 0.2;
		}, 0);
		setInterval(function(){
			particle.speed.x = (Math.random() * 8) - 4;
			particle.speed.y = (Math.random() * 8) - 4;
		}, 10);
	}
}, 0)

var scaleText = setInterval(function(){
	helloWorld.fontsize++;
	helloWorld.position.x =  game.width / 2 - helloWorld.width / 2;
	helloWorld.position.y =  game.height / 2 - helloWorld.height / 2;
	if(helloWorld.fontsize > 140){
		clearInterval(scaleText);
		var rotation = setInterval(function(){
			helloWorld.rotation += 0.8;
		}, 0);
		setInterval(function(){
			if(helloWorld.fontsize < 1){
				clearInterval(rotation);
				helloWorld.string = "Hello World!";
				helloWorld.color = "red";
				setInterval(function(){
					if(helloWorld.fontsize > 140){
						helloWorld.rotation = 0;
						return;
					}
					helloWorld.fontsize++;
					helloWorld.position.x =  game.width / 2 - helloWorld.width / 2;
					helloWorld.position.y =  game.height / 2 - helloWorld.height / 2;
				})
			}else{
				helloWorld.fontsize--;
				helloWorld.position.x =  game.width / 2 - helloWorld.width / 2;
				helloWorld.position.y =  game.height / 2 - helloWorld.height / 2;				
			}
		}, 1)
		/*
		setInterval(function(){
			for(var i = 0; i < 10; i++){
				game.add(new Particle({
					position: {
						x: Math.random() * game.width,
						y: Math.random() * game.height
					}
				}));
			}
		}, 1000)*/
	}
}, 1)

setTimeout(function(){
	game.debug.enabled = true;
}, 20000);

//game.debug.enabled = true;

/*setInterval(function(){
	helloWorld.rotation += 0.1;
}, 0);*/