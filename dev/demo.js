var game = new JSGame();

var helloWorld = new Text({
	string: "Hello World!",
	position: {
		x: 200,
		y: 200
	},
	fontsize: 60,
	shadow: {
		enabled: true,
		blur: 10,
		color: "#666",
		x: 3,
		y: 3
	}
});

game.add(helloWorld, "helloWorld");
game.debug.enabled = true;

setInterval(function(){
	helloWorld.rotation += 1;
}, 1);