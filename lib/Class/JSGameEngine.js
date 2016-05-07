function JSGameEngine(options){
    var self = this;
    this.gameObjects = {};
    this.canvas = document.createElement("canvas");
    this.width = 0;
    this.height = 0;
    this.time = new Time();
    this.__construct(this, options);
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.width || window.innerWidth;
    this.canvas.height = this.height || window.innerHeight;
    
    this.render = function(delta){
        requestAnimationFrame(self.render);
        self.time.update(delta);
        var canvas = self.canvas;
        var ctx = self.ctx;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var Time = self.time;
        for(gameObject in self.gameObjects){
            var gO = self.gameObjects[gameObject];
            for(component in gO.components){
                if(!gO.components[component].parent){
                    gO.components[component].parent = gO;
                }
            }
            if(!gO.enabled){
                continue;
            }
            if(gO.visible){
                gO.__update(self);               
            }
        }
    }
    
    this.fixedUpdate = function(delta){
        self.time.fixedUpdate(delta);
        var Time = self.time;
        for(gameObject in self.gameObjects){
            var gO = self.gameObjects[gameObject];
            for(component in gO.components){
                if(!gO.components[component].parent){
                    gO.components[component].parent = gO;
                }
            }
            if(!gO.enabled){
                continue;
            }
            gO.__fixedUpdate(self);
        }
        setTimeout(function(){
            self.fixedUpdate(performance.now);
        }, Time.framerateToTime(50) * 1000);
    }
    
    /* init */
    requestAnimationFrame(this.render);
    this.fixedUpdate(performance.now);
}

JSGameEngine.prototype = new Constructor();
JSGameEngine.prototype.constructor = JSGameEngine;