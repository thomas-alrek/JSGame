function Text(options){

	var _this = this;	//reference variable

	/* options */
	this.color = "#000";
	this.font = "Courier";
	this.fontsize = 20;
	this.height = this.size;
	this.string = "";
	this.style = "normal";
	this.weight = "normal";

	function _setStyle(renderer){
		renderer.ctx.font = _this.style + " " + _this.weight + " " + _this.fontsize + "px " + _this.font;
		renderer.ctx.fillStyle = _this.color;
	}

	this._tick = function(renderer){
		_setStyle(renderer);
		_this.width = renderer.ctx.measureText(_this.string).width;
		_this.height = _this.fontsize;
	}

	this._render = function(renderer){
		_setStyle(renderer);
		renderer.ctx.fillText(_this.string, _this.position.x, _this.position.y + _this.height);
	}

	this._loadOptions(options); //Overwrite default options from options object
}

Text.prototype = new GameObject();