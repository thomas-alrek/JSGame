function JSGame(options){

	var _this = this;	//reference variable

	/* for calculating FPS */
	var _currentFrame;
	var _fps = 0;
	var _frameTime = 0;
	var _frameTime;
	var _lastFrame = new Date;

	this.children = {};

	/* options */
	this.autoResize = true;
	this.canvas = document.createElement("canvas");
	this.ctx = this.canvas.getContext("2d");
	this.debug = {
		enabled: false,
		font: "Arial",
		fontsize: 16,
		color: "#f00"
	};
	this.deltaTime = new Date(); //placeholder
	this.fps = 0;
	this.fpsAccuracy = 10;
	this.fpsSampleTime = 100;
	this.height = window.innerHeight;
	this.width = window.innerWidth;
	this.preserveContent = true;

	this._loadOptions(options); //Overwrite default options from options object

	try{
		typeof options.canvas;
	}catch(e){
		document.body.appendChild(_this.canvas);
	}

	/* -------- interval functions -------- */

	/* clears the canvas context */
	function _blank(){

		_this.ctx.clearRect(0, 0, _this.width, _this.height);
	}

	/* calculate JSGame instance FPS */
	function _getFps(){

		/* check fpsAccuracy valid range */
		if(_this.fpsAccuracy <= 0){
			throw RangeError("fpsAccuracy must be larger then 0");
		}

		var time = (_currentFrame = new Date) - _lastFrame;
		_this.deltaTime = time;
		_frameTime += (time - _frameTime) / _this.fpsAccuracy;
		_lastFrame = _currentFrame;
		var fps = 1000 / _frameTime;
	}

	/* initialize JSGame instance */
	function _init(){

		/* we take a fps sample every fpsSampleTime */
		setInterval(function(){
			_fps = Math.round(1000 / _frameTime);
			_this.fps = _fps;
		}, _this.fpsSampleTime);

		/* resize canvas to fit JSGame width and height */
		_this.canvas.width = _this.width;
		_this.canvas.height = _this.height;
		_this.ctx = _this.canvas.getContext("2d");

		_this.add(new Text({
			string: "0 fps",
			visible: false,
			font: _this.debug.font,
			fontsize: _this.debug.fontsize,
			color: _this.debug.color,
			render: false
		}), "___jsgame_fps_meter___");

		/* automatically resize canvas size on window resize */
		if(_this.autoResize){
			window.addEventListener("resize", function(){
				_this.width = window.innerWidth;
				_this.height = window.innerHeight;
				_this.canvas.width = _this.width;
				_this.canvas.height = _this.height;
			})
		}

		/* start rendering */
		requestAnimationFrame(_render);
	}
	
	/* should be moved to separate prototype */
	this.lerp = function (origin, target, delta){
         return (target - origin) * delta;
    }

	function _rotate(object, operation){
		if(object.rotation !== 0.0){
			_this.ctx.translate(object.position.x + object.width / 2, object.position.y + object.height / 2);
			var x = object.position.x;
			var y = object.position.y;
			_this.ctx.save();
			object.position.x = (object.width * -1) / 2;
			object.position.y = (object.height * -1) / 2;
			_this.ctx.rotate((object.rotation * Math.PI) / 180);
			operation();
			object.position.x = x;
			object.position.y = y;
			_this.ctx.restore();
		}else{
			operation();
		}
	}

	/* render pipeline */
	function _render(delta){
		
		requestAnimationFrame(_render);
		
		_getFps(); //calculate current fps and deltatime
		_blank();

		_this.ctx.save();

		Object.keys(_this.children).forEach(function(key){
					
			_this.children[key]._tick(_this);

			/* for performance */
			if(!_this.antialiasing()){
				_this.children[key].position.x = (_this.children[key].position.x | 0);
				_this.children[key].position.y = (_this.children[key].position.y | 0);
				_this.children[key].rotation = (_this.children[key].rotation | 0); 
			}

			_this.ctx.restore();
			
			if(_this.children[key].render){
				
				_this.ctx.save();
			
				/* doesn't work
				Object.keys(_this.children[key].children).forEach(function(_key){
					_this.ctx.save();
					_this.ctx.translate(_this.children[key].position.x, _this.children[key].position.y);
					_this.children[key].children[_key]._tick(_this);
					_this.children[key].children[_key]._render(_this);
					_this.ctx.restore();
				});*/

				if(_this.children[key].visible && _this.children[key].alpha > 0.0){

					if(_this.antialiasing()){
						_this.ctx.globalAlpha = _this.children[key].alpha;

						if(_this.children[key].shadow.enabled){
							_this.ctx.shadowColor = _this.children[key].shadow.color;
							_this.ctx.shadowOffsetX = _this.children[key].shadow.x;
							_this.ctx.shadowOffsetY = _this.children[key].shadow.y;
							_this.ctx.shadowBlur = _this.children[key].shadow.blur;
						}
					}
					
					/*
					if(_this.children[key].rotation > 360.0 || _this.children[key].rotation < -360.0){
						_this.children[key].rotation = 0;
					}*/

					// rotates object if rotation !== 0, else render as is
					_rotate(_this.children[key], function(){
						_this.children[key]._render(_this);
					})
				}
				
				if(_this.debug.enabled){
					_this.ctx.restore();
					_this.ctx.save();
					_this.ctx.strokeStyle = _this.debugColor;
					_rotate(_this.children[key], function(){
						_this.ctx.setLineDash([8]);
						_this.ctx.lineWidth = 2;
						_this.ctx.fillStyle = _this.debug.color;
						_this.ctx.strokeStyle = _this.debug.color;
						_this.ctx.strokeRect(_this.children[key].position.x, _this.children[key].position.y, _this.children[key].width , _this.children[key].height);						
						var fontsize = _this.debug.fontsize;
						var font = _this.debug.font;
						_this.ctx.font = fontsize + "px " + font;
						var debugText = "[" + key + "]";
						var debugTextWidth = _this.ctx.measureText(debugText).width;					
						_this.ctx.fillText(debugText, _this.children[key].position.x, _this.children[key].position.y - 10);
					});
				}
			}
			
			/* garbage collection */
			/*
			if(typeof _this.children[key].radius !== 'undefined'){
				if(_this.children[key].radius <= 0 || _this.children[key].alpha <= 0){
					delete _this.children[key];
				}
			}
			*/
		});

		_this.ctx.restore();

		if(_this.debug.enabled){
			_this.ctx.save();
			_this.children.___jsgame_fps_meter___.font = _this.debug.font;
			_this.children.___jsgame_fps_meter___.fontsize = _this.debug.fontsize;
			_this.children.___jsgame_fps_meter___.color = _this.debug.color;
			_this.children.___jsgame_fps_meter___._tick(_this);
			_this.children.___jsgame_fps_meter___.position.x = _this.width - _this.children.___jsgame_fps_meter___.width - _this.debug.fontsize / 2;
			_this.children.___jsgame_fps_meter___.position.y = _this.children.___jsgame_fps_meter___.height - _this.debug.fontsize + 5;
			_this.children.___jsgame_fps_meter___.string = _this.fps;
			_this.children.___jsgame_fps_meter___._render(_this);
			_this.ctx.restore();
		}
		
		//_this.deltaTime =  (1/_this.fps) * 1000;
	}

	_init(); //initialize instance
}