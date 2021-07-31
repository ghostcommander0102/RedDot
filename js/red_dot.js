"use strict";


// Get A WebGL context
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("red_dot");
const gl = canvas.getContext("webgl");
var width = gl.canvas.clientWidth;

this.onmousemove = function (event) {
  mouse[0] = event.clientX;
  mouse[1] = event.clientY;

  if (gl.canvas.clientWidth > gl.canvas.clientHeight)
    width = gl.canvas.clientWidth;
  else
    width = gl.canvas.clientHeight;

  mouse[0] /= width;

  mouse[1] = (width - (gl.canvas.clientHeight + gl.canvas.clientWidth - width - mouse[1]));
  mouse[1] /= width;
};
// compile shaders, link program, lookup location
const programInfo = twgl.createProgramInfo(gl, ["vs", "fs"]);

// calls gl.createBuffer, gl.bindBuffer, gl.bufferData for a quad
const bufferInfo = twgl.primitives.createXYQuadBufferInfo(gl);

const mouse = [0, 0];
var flag = 1;

window.onresize = function () {
  if (gl.canvas.clientWidth > gl.canvas.clientHeight)
    width = gl.canvas.clientWidth;
  else
    width = gl.canvas.clientHeight;
};


canvas.addEventListener('mousemove', (event) => {
});

canvas.addEventListener('mouseout', (event) => {
});

canvas.addEventListener('touchmove', (event) => {
});

canvas.addEventListener('touchend', (event) => {
});

var nMouse = [0, 0];
var oMouse = [0, 0];

requestAnimationFrame(render);

function render() {

  twgl.resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, width, width);

  gl.clearColor(255, 255, 255, 255);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.useProgram(programInfo.program);

  // calls gl.bindBuffer, gl.enableVertexAttribArray, gl.vertexAttribPointer
  twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);

  const mat = m3.scaling(-1, 1);

  twgl.setUniforms(programInfo, {
    u_matrix: mat,
    u_mouse: mouse,
    u_res: [gl.canvas.clientWidth, gl.canvas.clientHeight],
  });

  // calls gl.drawArrays or gl.drawElements
  twgl.drawBufferInfo(gl, bufferInfo);

  requestAnimationFrame(render);
}
