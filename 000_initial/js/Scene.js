"use strict";
const Scene = function(gl) {
  this.vsIdle = new Shader(gl, gl.VERTEX_SHADER, "idle_vs.essl");
  // this.vsTrafo = new Shader(gl, gl.VERTEX_SHADER, "trafo_vs.essl");
  this.fsSolid = new Shader(gl, gl.FRAGMENT_SHADER, "solid_fs.essl");
  // this.fsGarish = new Shader(gl, gl.FRAGMENT_SHADER, "garish_fs.essl");
  this.solidProgram = new Program(gl, this.vsIdle, this.fsSolid);
  // this.garishProgram = new Program(gl, this.vsTrafo, this.fsGarish);

  //this.triangleGeometry = new TriangleGeometry(gl);
  //this.quadGeometry = new QuadGeometry(gl);
  this.materials = [];
  this.material1 = new Material(gl, this.solidProgram);
  this.material1.colorTexture.set(new Texture2D(gl, 'media/YadonDh.png'));
  this.materials.push(this.material1);

  this.material2 = new Material(gl, this.solidProgram);
  this.material2.colorTexture.set(new Texture2D(gl, 'media/YadonEyeDh.png'));
  this.materials.push(this.material2);
  this.multiMesh = new MultiMesh(gl, 'media/Slowpoke.json', this.materials);
  this.gameObject = new GameObject(gl, this.multiMesh);

  // this.material = new Material(gl, this.solidProgram);
  // this.material.colorTexture.set(new Texture2D(gl, 'media/asteroid.png'));
  // this.material.texOffset.set(0.1, 0.4);
  //
  // this.mesh = new Mesh(this.quadGeometry, this.material);
  // this.gameObject = new GameObject(gl, this.mesh);

  this.camera = new PerspectiveCamera();

  // this.modelPosition = new Vec2();
  // this.modelMatrix = new Mat4();
  // this.modelMatrix.storage = new Float32Array([
  // 	1,0,0,0.1,
  // 	0,1,0,0.2,
  // 	0,0,1,0,
  // 	0,0,0,1,
  // ]);
  // this.texture2d = new Texture2D(gl, './media/boom.png');

  this.timeAtLastFrame = new Date().getTime();

  // this.offset = new Vec2(0,-0);

  this.hide = false;
  this.cnt = 0;


};

Scene.prototype.update = function(gl, keysPressed) {
  //jshint bitwise:false
  //jshint unused:false
  const timeAtThisFrame = new Date().getTime();
  const dt = (timeAtThisFrame - this.timeAtLastFrame) / 1000.0;
  this.timeAtLastFrame = timeAtThisFrame;

  this.camera.setAspectRatio(window.innerWidth / window.innerHeight);
  // this.camera.setAspectRatio(canvas.clientWidth / canvas.clientHeight);

  // clear the screen
  gl.clearColor(0.6, 1.0, 0.3, 1.0);
  gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  gl.enable(gl.BLEND);
  gl.enable(gl.DEPTH_TEST);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  this.camera.move(dt, keysPressed);

  //console.log(this.gameObject.modelMatrix);
  this.gameObject.updateModelTransformation();
  this.gameObject.modelMatrix.mul(this.camera.viewProjMatrix);
  //this.quadGeometry.draw();
  if(!this.hide) {
     this.gameObject.draw();
  }


  // let speed = 0.15;
  //
  // if(keysPressed.W) {
	//   this.step = new Vec2(0, speed);
	//   this.gameObject.position.add(this.step.times(dt));
  //   this.gameObject.updateModelTransformation();
  // }
  // if(keysPressed.A) {
	//   this.step = new Vec2(0-speed, 0);
	//   this.gameObject.position.add(this.step.times(dt));
  //   this.gameObject.updateModelTransformation();
  // }
  // if(keysPressed.S) {
	//   this.step = new Vec2(0, 0-speed);
	//   this.gameObject.position.add(this.step.times(dt));
  //   this.gameObject.updateModelTransformation();
  // }
  // if(keysPressed.D) {
	//   this.step = new Vec2(speed, 0);
	//   this.gameObject.position.add(this.step.times(dt));
  //   this.gameObject.updateModelTransformation();
  // }
  // if(keysPressed.H) {
  // 	if(this.hide) {
  // 		this.hide = false;
  // 	}
	//   this.hide = true;
  // }

  // if(this.cnt % 30 == 0) {
  //   //console.log(this.cnt, this.offset.x, this.offset.y);
  //   this.offset.add(new Vec2(0, 0.9804));
  // }
  // this.cnt++;
  // //this.solidProgram.commit();
  // this.garishProgram.commit();


  // gl.uniformMatrix4fv(
	// gl.getUniformLocation(
	// 	this.garishProgram.glProgram, "modelMatrix"),
	// 	false,
	// 	this.modelMatrix.storage
  // );

  // this.texture2d.commit(
  //   gl, gl.getUniformLocation(this.garishProgram.glProgram, "colorTexture"),
  //   2
  // );
  //console.log(this.offset.x, this.offset.y);
  // gl.uniform2fv(
  //   gl.getUniformLocation(this.garishProgram.glProgram, "offset"),
  //   this.offset.storage
  // )
  // if(keysPressed.U) {
  //   this.step = new Vec2(speed, 0);
  //   this.camera.position.add(this.step.times(dt));
  //   this.camera.updateViewProjMatrix();
  // }
};
