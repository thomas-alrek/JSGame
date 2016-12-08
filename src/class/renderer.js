class Renderer{
    constructor(canvasElement){
        this.canvas = canvasElement;
        this.ctx = this.canvas.getContext('2d');
        this.entities = [];
        requestAnimationFrame(() => {
            this.render(this);
        });
        this.postRender = undefined;
        this.preRender = undefined;
    }
    get width(){
        return this.canvas.width;
    }
    set width(w){
        this.canvas.width = w;
    }
    get height(){
        return this.canvas.height;
    }
    set height(h){
        this.canvas.width = h;
    }
    render(self){
        if(typeof self.preRender === 'function'){
            self.preRender(self)
        };
        let canvas = self.canvas;
        let ctx = self.ctx;
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        self.drawEntities();
        requestAnimationFrame(() => {
            if(typeof self.postRender === 'function'){
                self.postRender(self)
            };
            self.render(self);
        });
    }
    addEntity(entity){
        this.entities.push(entity);
    }
    drawEntities(){
        let ctx = this.ctx;
        let entities = this.entities;
        for(let i = 0; i < entities.length; i++){
            let entity = entities[i];
            ctx.save();
            entity.render(this);
            ctx.restore();
        }
    }
}

export default Renderer;