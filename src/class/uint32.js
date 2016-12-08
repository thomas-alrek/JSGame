import Uint8 from './uint8';

class Uint32 extends Uint8{
    constructor(val){
        super();
        this.size = Math.pow(2, 32);
        this.value = val ? this.clamp(val) : 0;
    }
}

export default Uint32;