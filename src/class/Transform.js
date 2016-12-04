const Component = require('./Component');
const Vector2 = require('./Vector2');

class Transform extends Component{
	constructor(){
		super();	
		this.rotation = 0;
		this.position = new Vector2();
		this.transform = this;
	}
}

module.exports = Transform;