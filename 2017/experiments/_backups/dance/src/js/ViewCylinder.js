// ViewCylinder.js

import alfrid, { GL } from 'alfrid';

class ViewCylinder extends alfrid.View {
	
	constructor() {
		super();
	}


	_init() {
		this.mesh;
	}


	render() {
		this.shader.bind();
		GL.draw(this.mesh);
	}


}

export default className;