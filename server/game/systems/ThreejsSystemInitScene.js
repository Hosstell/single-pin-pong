import data from "../data.js";

export default class ThreejsSystemInitScene {
  init() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    var render = new THREE.WebGLRenderer();
    render.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( render.domElement );
    camera.position.z = 0.3;

    data.threejs.scene = scene
    data.threejs.camera = camera
    data.threejs.render = render
  }
}