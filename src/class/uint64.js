import Uint8 from './uint8';

class Uint64 extends Uint8{
    constructor(val){
        super();
        this.size = Math.pow(2, 64);
        this.value = val ? this.clamp(val) : 0;
    }
}

export default Uint64;