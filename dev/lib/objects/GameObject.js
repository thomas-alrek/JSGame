function GameObject(options){
	
	var _this = this;	//reference variable

	/* options */
	this.alpha = 1.0;
	this.children = {};
	this.height = 0;
	this.position = {
		x: 0,
		y: 0
	}
	this.shadow = {
		enabled: false,
		color: "#000",
		x: 0,
		y: 0,
		blur: 0
	}
	this.render = true;
	this.rotation = 0.0;
	this._lastRotation = this.rotation;
	this.visible = true;
	this.width = 0;

	this._render = _render;
	this._tick = _tick;

	this._loadOptions(options); //Overwrite default options from options object

	function _tick(jsGame){
		this._lastRotation = this.rotation;
		return;
	}

	function _render(jsGame){
		return;
	}

	return this;
}