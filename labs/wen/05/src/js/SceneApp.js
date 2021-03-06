// SceneApp.js

var GL = bongiovi.GL, gl;
var ViewNoise = require("./ViewNoise");
var ViewNormal = require("./ViewNormal");
var ViewBelt = require("./ViewBelt");
var ViewPlane = require('./ViewPlane');

function SceneApp() {
	gl = GL.gl;
	bongiovi.Scene.call(this);

	this.camera._rx.value = -.5;
	this.camera._ry.value = .3;

	this.sceneRotation.lock(true);
	this.camera.lockRotation(false);

	window.addEventListener("resize", this.resize.bind(this));
}


var p = SceneApp.prototype = new bongiovi.Scene();

p._initTextures = function() {
	console.log('Init Textures');

	var noiseSize = 256;
	this.fboNoise = new bongiovi.FrameBuffer(noiseSize, noiseSize);
	this.fboNormal = new bongiovi.FrameBuffer(noiseSize, noiseSize);
};

p._initViews = function() {
	console.log('Init Views');
	this._vAxis     = new bongiovi.ViewAxis();
	this._vDotPlane = new bongiovi.ViewDotPlane();
	this._vNoise    = new ViewNoise();
	this._vNormal   = new ViewNormal();
	this._vCopy     = new bongiovi.ViewCopy();
	this._vBelt 	= new ViewBelt();
	this._vPlane    = new ViewPlane();
};

p.render = function() {
	GL.clear(0, 0, 0, 0);

	GL.setMatrices(this.cameraOrtho);
	GL.rotate(this.rotationFront);

	GL.setViewport(0, 0, this.fboNoise.width, this.fboNoise.height);
	this.fboNoise.bind();
	GL.clear(0, 0, 0, 0);
	this._vNoise.render();
	this.fboNoise.unbind();

	this.fboNormal.bind();
	GL.clear(0, 0, 0, 0);
	this._vNormal.render(this.fboNoise.getTexture());
	this.fboNormal.unbind();
	GL.setViewport(0, 0, 256, 256);
	// this._vCopy.render(this.fboNoise.getTexture());
	GL.setViewport(0, 270, 256, 256);
	// this._vCopy.render(this.fboNormal.getTexture());


	GL.setViewport(0, 0, GL.width, GL.height);
	GL.setMatrices(this.camera);
	GL.rotate(this.sceneRotation.matrix);
	// this._vAxis.render();
	this._vDotPlane.render();

	var totalWidth = params.numBelts * params.beltWidth;

	for(var i=0; i<params.numBelts; i++) {
		var uvy = i/params.numBelts + .5/params.numBelts;
		var pos = [0, 0, params.beltWidth * i -totalWidth/2 + params.beltWidth*.5];
		this._vBelt.render(this.fboNoise.getTexture(), this.fboNormal.getTexture(), pos, uvy);	
	}

	var d = params.beltWidth * params.numBelts;
	// this._vPlane.render([params.beltLength, 0, d]);
	var c = 0;
	for(var j=-1; j<=1; j++) {
		for(var i=-1; i<=1; i++) {
			// console.log(i + j);
			var tx = params.beltLength * j;
			var tz = d * i;
			if( !(i == 0 && j == 0)) {
				c ++ ;
				this._vPlane.render([tx, 0, tz]);
			}
		}
	}

};

p.resize = function() {
	GL.setSize(window.innerWidth, window.innerHeight);
	this.camera.resize(GL.aspectRatio);
};

module.exports = SceneApp;