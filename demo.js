/************************
 * JS Game              *
 * Demo by Thomas Alrek *
 ************************/

var game = new JSGame();
game.debug.color = "yellow";

document.getElementById("debug").addEventListener("click", function(){
	game.debug.enabled = !game.debug.enabled;
	if(game.debug.enabled){
		this.innerHTML = "Disable debugging";
	}else{
		this.innerHTML = "Enable debugging";
	}
});

document.getElementById("graphics").addEventListener("click", function(){
	game.antialiasing = !game.antialiasing;
	if(game.antialiasing){
		this.innerHTML = "High graphics";
	}else{
		this.innerHTML = "Low graphics";
	}
});

document.getElementById("spawn").addEventListener("click", function(){
	game.add(new ParticleSystem({
		count: Math.random() * 100 + 5,
		speed: {
			x: Math.random() * 5,
			y: Math.random() * 5
		},
		color: {
			r: Math.random() * 255,
			g: Math.random() * 255,
			b: Math.random() * 255,
		},
		glow: true,
		life: Math.random() * 100,
		radius: Math.random() * 50,
		position: {
			x: Math.random() * game.width,
			y: Math.random() * game.height
		},
	}));
});

document.getElementById("delete").addEventListener("click", function(){
	delete game.children[Object.keys(game.children)[Object.keys(game.children).length - 1]];
});

var particle = game.add(new ParticleSystem({
	count: 30,
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

var fx1 = game.add(new ParticleSystem({
	count: 100,
	speed: {
		x: 4,
		y: -8
	},
	color: {
		r: 255,
		g: 32,
		b: 64,
	},
	glow: true,
	life: 10,
	radius: 0,
	visible: false,
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
	color: "yellow",
	font: "QuirkyRobot",
	fontsize: 0,
	shadow: {
		enabled: true,
		blur: 5,
		color: "#000",
		x: -1,
		y: -1
	}
}));

var about = game.add(new Text({
	string: "Coded by Thomas Alrek",
	position: {
		x: -100,
		y: -100
	},
	weight: "bold",
	color: "red",
	font: "QuirkyRobot",
	fontsize: 50,
	visible: false,
	shadow: {
		enabled: true,
		blur: 10,
		color: "green",
		x: -1,
		y: -1
	}
}));

helloWorld.position.x =  game.width / 2 - helloWorld.width / 2;
helloWorld.position.y =  game.height / 2 - helloWorld.height / 2;

var alphaTarget = 0;
var particleTarget = 0;
var helloWorldTarget = 0;
var fx1Target = {
	x: -100,
	y: -100
}
var aboutTarget = {
	x: game.width + about.width + 100,
	y: game.height + about.height + 100
}
var aboutRotationTarget = 0;

var scaleParticle = setInterval(function(){
	particle.radius++;
	particle.position.x =  game.width / 2 - particle.width / 2;
	particle.position.y =  game.height / 2 - particle.height / 2;
	if(particle.radius > 50){
		particle.count = 50;
		clearInterval(scaleParticle);
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
		setTimeout(function(){
			clearInterval(rotation);
			var shrink = setInterval(function(){
				var speedX = 4;
				var speedY = 4;
				var shrinking = false;
				if(helloWorld.fontsize <= 30){
					particle.speed.x = speedX;
					particle.speed.y = speedY;
					particle.life = 100;
					particle.position.x =  game.width / 2 - particle.width / 2;
					particle.position.y =  game.height / 2 - particle.height / 2;
					setInterval(function(){
						particle.rotation += game.lerp(particle.rotation, particleTarget, game.deltaTime / 1000);
					}, 0);
					particleTarget += 360;
					setInterval(function(){
						particleTarget += 360;
					}, 1000);
					clearInterval(shrink);
					helloWorldTarget += 360;
					fx1.position.x = -100;
					fx1.position.y = -100;
					fx1.visible = true;
					fx1.radius = 20;
					about.visible = true;
					setInterval(function(){
						fx1.position.x += game.lerp(fx1.position.x, fx1Target.x, game.deltaTime / 1000);
						fx1.position.y += game.lerp(fx1.position.y, fx1Target.y, game.deltaTime / 1000);
						about.position.x += game.lerp(about.position.x, aboutTarget.x, game.deltaTime / 1000 / 10);
						about.position.y += game.lerp(about.position.y, aboutTarget.y, game.deltaTime / 1000 / 10);
						about.rotation += game.lerp(about.rotation, aboutRotationTarget, game.deltaTime / 1000);
						helloWorld.rotation += game.lerp(helloWorld.rotation, helloWorldTarget, game.deltaTime / 1000);
						helloWorld.alpha += game.lerp(helloWorld.alpha, alphaTarget, game.deltaTime / 1000);
						if(about.visible && about.x > game.width + about.width && about.y > game.height + about.height){
							about.visible = false;
						}
					}, 0);
					fx1Target.x = Math.random() * game.width;
					fx1Target.y = Math.random() * game.height;
					game.canvas.addEventListener('mousemove', function(e){
						fx1Target.x = e.clientX;
						fx1Target.y = e.clientY;
					});
					setInterval(function(){
						alphaTarget = !alphaTarget;
					}, 3000)
					setInterval(function(){
						helloWorldTarget += 360;
						aboutRotationTarget -= 180;
					}, 1500);
					setInterval(function(){
						helloWorld.position.x =  game.width / 2 - helloWorld.width / 2;
						helloWorld.position.y =  game.height / 2 - helloWorld.height / 2;
						particle.position.x =  game.width / 2 - particle.width / 2;
						particle.position.y =  game.height / 2 - particle.height / 2;
						if(shrinking && helloWorld.fontsize >= 30){
							helloWorld.fontsize--;
						}else{
							helloWorld.fontsize++;
						}
						if(helloWorld.fontsize <= 30){
							setTimeout(function(){
								shrinking = false;
							}, 100);
						}
						if(helloWorld.fontsize >= 160){
							setTimeout(function(){
								shrinking = true;
							}, 100);
						}
					});
				}
				helloWorld.rotation += 1;
				helloWorld.fontsize--;
				helloWorld.position.x =  game.width / 2 - helloWorld.width / 2;
				helloWorld.position.y =  game.height / 2 - helloWorld.height / 2;
			}, 10);
		}, 2000);
	}
}, 1)

//game.debug.enabled = true;

/*setInterval(function(){
	helloWorld.rotation += 0.1;
}, 0);*/