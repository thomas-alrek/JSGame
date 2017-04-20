class JSGame{
	constructor(width, height){
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.canvas.width = width;
		this.canvas.height = height;
		this.i = 0;
		document.addEventListener('DOMContentLoaded', () => {
			document.body.appendChild(this.canvas);
		}, false);
		this.render();
	}

	render(){
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.fillStyle = "rgb(0,0,0)";
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.fillStyle = "yellow";
		this.ctx.fillRect(this.i, 10, 10, 10);
		this.i += 0.1;
		requestAnimationFrame(this.render.bind(this));
	}
}

export default JSGame;