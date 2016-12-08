class Uint8{
    constructor(val){
        this.size = Math.pow(2, 8);
        this._value = val ? this.clamp(val) : 0;
    }
    clamp(val){
        val = Math.round(val);
        if(val > (this.size - 1)){
            val = val % this.size;
        }
        if(val < 0){
            val = (val + (this.size - 1)) % this.size;;
        }
        return val;
    }
    get value(){
        return this.clamp(this._value);
    }
    set value(val){
        this._value = this.clamp(val);
    }
}

export default Uint8;