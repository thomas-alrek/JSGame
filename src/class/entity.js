import Vector3 from './vector3';

class Entity{
    constructor(){
        this.position = new Vector3();
    }
    render(renderer){
        return;
    }
}

export default Entity;