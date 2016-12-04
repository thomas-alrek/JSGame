class Vector2{
	constructor(x, y){
		this.x = 0;
		this.y = 0;
		this.x = (typeof x !== 'undefined') ? x : this.x;
		this.y = (typeof y !== 'undefined') ? y : this.y; 
	}
}

export default Vector2;