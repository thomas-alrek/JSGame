JSGame.prototype.antialiasing = function(bool){
	
	var _this = this;

	/* Get or set antialiasing ("fast mode") */
	if(typeof bool === 'undefined'){
		if(_this.canvas.className.match(/(?:^|\s)low\-graphics(?!\S)/)){
			return false;
		}
		return true;
	}
	if(!bool){
		if(_this.canvas.className.match(/(?:^|\s)low\-graphics(?!\S)/)){
			return;
		}
		_this.canvas.className += " low-graphics";
	}else{
		_this.canvas.className = _this.canvas.className.replace(/(?:^|\s)low\-graphics(?!\S)/g, '');
	}
}