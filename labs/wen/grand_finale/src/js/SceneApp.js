// SceneApp.js

var GL = bongiovi.GL, gl;
var ViewBallon = require("./ViewBallon");

function SceneApp() {
	gl = GL.gl;
	bongiovi.Scene.call(this);

	this.camera.lockRotation(false);
	this.sceneRotation.lock(true);

	window.addEventListener("resize", this.resize.bind(this));
}


var p = SceneApp.prototype = new bongiovi.Scene();

p._initTextures = function() {
	console.log('Init Textures');
};

p._initViews = function() {
	console.log('Init Views');
	this._vAxis     = new bongiovi.ViewAxis();
	this._vDotPlane = new bongiovi.ViewDotPlane();
	this._vBallon   = new ViewBallon();
};

p.render = function() {
	this._vAxis.render();
	this._vDotPlane.render();


	this._vBallon.render();
};

p.resize = function() {
	GL.setSize(window.innerWidth, window.innerHeight);
	this.camera.resize(GL.aspectRatio);
};

module.exports = SceneApp;