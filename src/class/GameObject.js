import Transform from './Transform';

class GameObject{
	constructor(name, components){
		this.components = {};
		this.tag = "";
		this.layer = 0;
		this.name = "GameObject";
		this.addComponent(new Transform());
		if(typeof name === 'string'){
			this.name = name;
		}
		if(typeof components === 'array'){
			for(let i = 0; i < components.length; i++){
				this.addComponent(components[i]);
			}
		}
	}

	addComponent(component){
		let propName = component.constructor.name;
		propName = propName.charAt(0).toLowerCase() + propName.slice(1);
		component.gameObject = this;
		this.components[propName] = component;
	}

	get transform(){
		return this.components.transform;
	}

}

export default GameObject;