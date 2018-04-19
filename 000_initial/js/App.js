"use strict";
// App constructor
const App = function(canvas, overlay) {

	// set a pointer to our canvas
	this.canvas = canvas;
	this.overlay = overlay;

	// if no GL support, cry
	this.gl = canvas.getContext("experimental-webgl");
	if (this.gl === null) {
		console.log( ">>> Browser does not support WebGL <<<" );
		return;
	}
	this.gl.pendingResources = {};

	this.scene = new Scene(this.gl);
	this.resize();

	// create a simple scene
	this.keysPressed = {};
};

// match WebGL rendering resolution and viewport to the canvas size
App.prototype.resize = function(){
	this.canvas.width = this.canvas.clientWidth;
	this.canvas.height = this.canvas.clientHeight;
	this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
};

App.prototype.registerEventHandlers = function() {
	const theApp = this;
	document.onkeydown = function(event) {
		theApp.keysPressed[keyboardMap[event.keyCode]] = true;
	};
	document.onkeyup = function(event) {
		theApp.keysPressed[keyboardMap[event.keyCode]] = false;
	};
	this.canvas.onmousedown = function(event) {
		//jshint unused:false
		theApp.scene.camera.mouseDown(event);
	};
	this.canvas.onmousemove = function(event) {
		//jshint unused:false
		event.stopPropagation();
		theApp.scene.camera.mouseMove(event);
	};
	this.canvas.onmouseout = function(event) {
		//jshint unused:false
		theApp.scene.camera.mouseUp(event);
	};
	this.canvas.onmouseup = function(event) {
		// jshint unused:false
		theApp.scene.camera.mouseUp(event);
	};
	window.addEventListener('resize', function() {
		theApp.resize();
		//theApp.scene.resize(theApp.canvas);
	});
	window.requestAnimationFrame(function() {
		theApp.update();
	});
};

// animation frame update
App.prototype.update = function() {

	const pendingResourceNames = Object.keys(this.gl.pendingResources);
	if(pendingResourceNames.length === 0) {
		// animate and draw scene
		this.scene.update(this.gl, this.keysPressed);
		this.overlay.innerHTML = "Ready.";
	} else {
		this.overlay.innerHTML = "Loading: " + pendingResourceNames;
	}

	// refresh
	const theApp = this;
	window.requestAnimationFrame(function() {
		theApp.update();
	});
};

// entry point from HTML
window.addEventListener('load', function() {

	const canvas = document.getElementById("canvas");
	const overlay = document.getElementById("overlay");
	overlay.innerHTML = "WebGL";

	const app = new App(canvas, overlay);
	app.registerEventHandlers();
});
