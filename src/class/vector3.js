import Vector2 from './vector2';

class Vector3 extends Vector2{
    constructor(x, y, z){
        super(x, y);
        this.z = z | 1;
    }
}

export default Vector3;