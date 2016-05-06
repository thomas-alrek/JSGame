function Text(options){
    this.text = "";
    this.__construct(options);
}

Text.prototype = Object.create(GameObject.prototype);