function Engine(container, options){
	self = this;

	this.canvas = document.getElementById(container);
	this.screen = this.canvas;
	this.ctx = this.canvas.getContext("2d");
	this.width = window.innerWidth;
	this.height = window.innerHeight;

	this.objects = {};

	this.antiAliasing = function(bool){
		if(typeof bool === 'undefined'){
			if(self.canvas.className.match(/(?:^|\s)low\-graphics(?!\S)/)){
				return false;
			}
			return true;
		}
		if(!bool){
			if(self.canvas.className.match(/(?:^|\s)low\-graphics(?!\S)/)){
				return;
			}
			self.canvas.className += " low-graphics";
		}else{
			self.canvas.className = self.canvas.className.replace(/(?:^|\s)low\-graphics(?!\S)/g, '');
		}
	}

	var fps = 0;
	var fpsFilter = 10;
	var frameTime = 0;
	var lastFrame = new Date;
	var currentFrame;

	setInterval(function(){
		fps = (1000 / frameTime).toFixed(1);
	}, 100);

	this.fps = function(){
		return fps;
	}

	if(typeof options !== 'undefined'){
		if(options.width){
			this.width = options.width;
		}

		if(options.height){
			this.height = options.height;
		}
	}

	this.canvas.width = this.width;
	this.canvas.height = this.height;

	window.addEventListener("resize", function(){
		self.width = window.innerWidth;
		self.height = window.innerHeight;
		self.canvas.width = self.width;
		self.canvas.height = self.height;
	})

	this.clear = function(){
		self.ctx.clearRect(0, 0, self.width, self.height);
	}

	this.render = function(){
		requestAnimationFrame(self.render);

		self.fpsMeter();
		self.clear();

		Object.keys(self.objects).forEach(function(key){
			if(typeof self.objects[key].tick === 'function'){
				self.objects[key].tick(self);
			}
			if(typeof self.objects[key].render === 'function' && self.objects[key].visible){
				var _fillStyle = self.ctx.fillStyle;
				var _strokeStyle = self.ctx.strokeStyle;
				var _font = self.ctx.font;
				var _globalAlpha = self.ctx.globalAlpha;

				self.ctx.globalAlpha = self.objects[key].alpha;
		    	self.objects[key].render(self);

		    	self.ctx.fillStyle = _fillStyle;
		    	self.ctx.strokeStyle = _strokeStyle;
		    	self.ctx.font = _font;
		    	self.ctx.globalAlpha = _globalAlpha;
			}
		});

	}

	this.fpsMeter = function(){
		var time = (currentFrame = new Date) - lastFrame;
		frameTime += (time - frameTime) / fpsFilter;
		lastFrame = currentFrame;
	}

	this.render();
}