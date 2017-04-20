import Component from './Component';
import Vector2 from './Vector2';

class Transform extends Component{
	constructor(){
		super();	
		this.rotation = 0;
		this.position = new Vector2();
		this.transform = this;
	}
}

export default Transform;