const GameObject = function(gl, mesh) {
  this.mesh = mesh;
  this.gl = gl;

  this.position = new Vec3(0,0,0);
  this.orientation = 0;
  this.scale = new Vec3(0.5,0.5,0.5);

  this.modelMatrix = new Mat4();
};

GameObject.prototype.updateModelTransformation = function () {
  this.modelMatrix.set();
  this.modelMatrix.scale(this.scale);
  this.modelMatrix.rotate(this.orientation);
  this.modelMatrix.translate(this.position);
};

GameObject.prototype.draw = function () {
  //feladat: Material.modelMatrix uniform beállítása
  //this.mesh.material.modelMatrix.set(this.modelMatrix);
  for(let i = 0; i < this.mesh.meshes.length; i++) {
    this.mesh.meshes[i].material.modelMatrix.set(this.modelMatrix);
  }

  this.mesh.draw();
}
