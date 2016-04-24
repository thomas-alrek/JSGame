function Engine(container, options){
	self = this;

	var paused = false;

	this.canvas = document.getElementById(container);
	this.screen = this.canvas;
	this.ctx = this.canvas.getContext("2d");
	this.width = window.innerWidth;
	this.height = window.innerHeight;

	this.objects = {};

	this.pause = function(){
		paused = !paused;
		if(!paused){
			self.render();
		}
	};

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
		if(!paused){
			requestAnimationFrame(self.render);
		}

		self.fpsMeter();
		self.clear();

		Object.keys(self.objects).forEach(function(key){
			if(typeof self.objects[key].tick === 'function'){
				self.objects[key].tick(self);
			}
			if(typeof self.objects[key].render === 'function' && self.objects[key].visible){
				self.ctx.save();

				self.ctx.globalAlpha = self.objects[key].alpha;

		    	self.objects[key].render(self);
		    	self.ctx.restore();
			}
		});

		if(self.debug){
			Object.keys(self.objects).forEach(function(key){
				if(self.objects[key].visible){
					self.ctx.save();

					self.ctx.strokeStyle = "#f00";
					self.ctx.strokeRect(self.objects[key].x, self.objects[key].y, self.objects[key].width, self.objects[key].height);
					self.ctx.fillStyle = self.ctx.strokeStyle;
					self.ctx.font = "20px Courier";

					var debugText = "[" + key + "]";

					if(self.objects[key].y - 20 - 10 > 0){
						self.ctx.fillText(debugText, self.objects[key].x, self.objects[key].y - 10);
					}else{
						if(self.objects[key].y + 20 > self.height){
							self.ctx.fillText(debugText, self.objects[key].x, self.height - 10);
						}else{
							self.ctx.fillText(debugText, self.objects[key].x, self.objects[key].y + self.objects[key].height + 20);
						}
					}

					self.ctx.restore();
				}
			});
		}

	}

	this.fpsMeter = function(){
		var time = (currentFrame = new Date) - lastFrame;
		frameTime += (time - frameTime) / fpsFilter;
		lastFrame = currentFrame;
	}

	this.render();
}