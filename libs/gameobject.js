function GameObject(){
	//var gameObject = this;
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
	this.visible = true;
	this.render = function(engine){};
	this.tick = function(engine){};
	this.alpha = 1.0;
}

Engine.prototype.addObject = function(id, obj){
	if(typeof self.objects[id] !== 'undefined'){
		console.log(self.objects[id]);
		throw "GameObject with id '" + id + "' already exist";
	}

	if(typeof obj === 'undefined'){
		var obj = new GameObject();
	}

	self.objects[id] = obj;
	self.objects[id].tick(self);
	return true;
}

Engine.prototype.removeObject = function(id){
	if(typeof self.objects[id] !== 'undefined'){
		delete self.objects[id];
		return true;
	}
	throw "GameObject with id '" + id + "' not found";
}