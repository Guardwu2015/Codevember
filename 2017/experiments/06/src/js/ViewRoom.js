// ViewRoom.js

import alfrid, { GL } from 'alfrid';
import Assets from './Assets';
import fs from 'shaders/room.frag';

class ViewRoom extends alfrid.View {
	
	constructor() {
		super(alfrid.ShaderLibs.skyboxVert, fs);
	}


	_init() {
		const s = 30;
		this.mesh = alfrid.Geom.sphere(10, 24, true);
		// this.texture = new alfrid.GLTexture(Assets.get('dungeon'));
		this.texture = Assets.get('dungeonLow');
	}


	render() {
		this.shader.bind();
		this.shader.uniform("texture", "uniform1i", 0);
		this.texture.bind(0);
		this.shader.uniform(params.hdr);
		GL.draw(this.mesh);
	}


}

export default ViewRoom;