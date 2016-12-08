import Renderer from './modules/renderer';
import Snow from './modules/snow';

let canvas = document.getElementById('canvas');
let renderer = new Renderer(canvas);

for(let i = 0; i < 1000; i++){
    let entity = new Snow();
    entity.position.x = Math.random() * renderer.width;
    entity.position.y = Math.random() * renderer.height;
    entity.position.z = Math.random() * 1.5;
    renderer.addEntity(entity);
}

renderer.postRender = function(instance){
    for(let i = 0; i < instance.entities.length; i++){
        instance.entities[i].position.y += 0.1;
    }
}

window.renderer = renderer;