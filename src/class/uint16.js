import Uint8 from './uint8';

class Uint16 extends Uint8{
    constructor(val){
        super();
        this.size = Math.pow(2, 16);
        this.value = val ? this.clamp(val) : 0;
    }
}

export default Uint16;