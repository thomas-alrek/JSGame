function JSGameEngine(options){
    this.gameObjects = {};
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width || 0;
    this.height = this.canvas.height || 0;
    this.time = new Time();
    this.__construct(options);
}

JSGameEngine.prototype = new Constructor();