"use strict";
const Material = function (gl, program) {
  this.gl = gl;
    this.program = program;
  const theMaterial = this;
  Object.keys(program.uniforms).forEach(function(uniformName) {
    const uniform = program.uniforms[uniformName];
    const reflectionVariable = UniformReflectionFactories.makeVar(
      gl, uniform.type, uniform.arraySize, uniform.textureUnit);
    if(!Material[uniformName]) {
      Object.defineProperty(theMaterial, uniformName,
        {value : reflectionVariable});
    }
  });
  // Material.modelMatrix = new Mat4();
  //Object.defineProperty(Material, "modelMatrix", {value : new Mat4()});
  Material.animationPhase = new Vec2();
  Material.mysampler = new Sampler2D();

  // return new Proxy(this, {
  //   get : function(target, name) {
  //     if(!(name in target)) {
  //       console.error(
  //         "WARNING: Ignore attempt" +
  //         " to access material property '" +
  //         name + "'. Is '" + name +
  //         "' an unused uniform?"
  //       );
  //     }
  //   }
  // });
};

Material.prototype.commit = function () {
  const gl = this.gl;
  this.program.commit();
  const theMaterial = this;
  Object.keys(this.program.uniforms).forEach( function (uniformName) {
    const uniform = theMaterial.program.uniforms[uniformName];
    const reflectionVariable = Material[uniformName] || theMaterial[uniformName];
    reflectionVariable.commit(gl, uniform.location, uniform.textureUnit);
    theMaterial[uniformName].commit(gl, uniform.location);
  });
};
