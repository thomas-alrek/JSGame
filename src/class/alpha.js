/**
 * A class representing an alpha value between 0 and 1
 */
class Alpha{
    /**
     * Retuns a new Alpha instance
     * @param {number} val
     */
    constructor(val){
        this._value = val ? this.clamp(val) : 1;
    }
    /**
     * Clamps a number between in the range 0 - 1
     * @param {number} val
     */
    clamp(val){
        val = val < 0 ? 0 : val;
        val = val > 1 ? 1 : val; 
        return val;
    }
    /**
     * Returns the clamped value
     */
    get value(){
        return this.clamp(this._value);
    }
    /**
     * Clamps the given value, and sets the value
     * @param {number} val
     */
    set value(val){
        this._value = this.clamp(val);
    }
}

export default Alpha;