import Uint8 from './uint8';
import Alpha from './alpha';

class Color{
    constructor(r, g, b, a){
        this.r = new Uint8(r);
        this.g = new Uint8(g);
        this.b = new Uint8(b);
        this.a = new Alpha(a);
    }
    toString(){
        return `rgba(${this.r.value},${this.g.value},${this.b.value},${this.a.value})`;
    }
}

export default Color;