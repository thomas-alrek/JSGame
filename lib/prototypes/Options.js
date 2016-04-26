function _options(options){

	var _this = this;

	if(typeof options !== 'undefined'){

		if(typeof options === "object"){
			Object.keys(options).forEach(function(key){
				if(typeof _this[key] === "undefined"){
					throw ReferenceError("Unknown key '" + key + "'");
				}
				if(typeof _this[key] !== typeof options[key]){
					throw TypeError("Invalid type for key '" + key + "'");
				}
				_this[key] = options[key];
			});
		}else{
			throw TypeError("Expected Object, got " + typeof options + "");
		}
	}
}

JSGame.prototype._loadOptions = _options;
GameObject.prototype._loadOptions = _options;