function _add(obj, name){
	var _this = this;

	function UUID(){
		return '_xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		    return v.toString(16);
		});
	}

	/* add new child GameObject */
	if(typeof obj !== 'object'){
		throw TypeError("First argument must be an object");
	}

	//obj._tick(_this);


	//if(obj.isPrototypeOf(GameObject)){
		if(typeof name === 'undefined'){
			_this.children[UUID()] = obj;
		}else{
			if(typeof _this.children[name] !== 'undefined'){
				throw Error("'" + name + "' is already exists");
			}
			_this.children[name] = obj;
		}
	/*}else{
		throw TypeError("Object must be an instance of GameObject");
	}*/
}

GameObject.prototype.add = _add;
JSGame.prototype.add = _add;