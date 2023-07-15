'use strict';

import * as THREE from './modules/three.module.js';

Physijs.scripts.worker = '/js/physijs_worker.js';
Physijs.scripts.ammo = '/js/ammo.js';



import { TrackballControls } from "./modules/TrackballControls.js";

import { MTLLoader } from "./modules/MTLLoader.js";
import { VertexNormalsHelper } from "./modules/VertexNormalsHelper.js";
import { FaceNormalsHelper } from "./modules/FaceNormalsHelper.js";
import { OBJLoader } from "./modules/OBJLoader.js";
import { MtlObjBridge } from "./modules/MtlObjBridge.js";


const OBJLoader2Example = function ( elementToBindTo ) {

  this.renderer = null;
  this.canvas = elementToBindTo;
  this.aspectRatio = 1;
  this.recalcAspectRatio();

  this.scene = null;
  this.cameraDefaults = {
    posCamera: new THREE.Vector3( 0.0, 175.0, 500.0 ),
    posCameraTarget: new THREE.Vector3( 0, 0, 0 ),
    near: 0.1,
    far: 10000,
    fov: 45
  };
  this.camera = null;
  this.cameraTarget = this.cameraDefaults.posCameraTarget;

  this.controls = null;

};

OBJLoader2Example.prototype = {
  constructor: OBJLoader2Example,

  initGL: function () {

    this.renderer = new THREE.WebGLRenderer( {
      canvas: this.canvas,
      antialias: true,
      autoClear: true
    } );
    this.renderer.shadowMap.enabled = true;
    this.renderer.setClearColor( 0xa3a5e3 );

    this.scene = new THREE.Scene();
    // this.scene = new Physijs.Scene;

    this.camera = new THREE.PerspectiveCamera( this.cameraDefaults.fov, this.aspectRatio, this.cameraDefaults.near, this.cameraDefaults.far );
    this.camera.position.set(0, 0.18945660456909422, 0.3720044393765124)
    this.resetCamera();
    this.controls = new TrackballControls( this.camera, this.renderer.domElement );

    const ambientLight = new THREE.AmbientLight( 0x404040 );
    const directionalLight1 = new THREE.DirectionalLight( 0xC0C090 );
    const directionalLight2 = new THREE.DirectionalLight( 0xC0C090 );

    // directionalLight1.position.set( - 100, - 50, 100 );
    directionalLight2.position.set( 0, 20, 0 );

    // this.scene.add( directionalLight1 );
    this.scene.add( directionalLight2 );
    this.scene.add( ambientLight );

    const helper = new THREE.GridHelper( 1200, 60, 0xFF4444, 0x404040 );
    this.scene.add( helper );
    window.scene = this.scene

    this.sphereDirection = new THREE.Vector3(0, 0, 0)
  },

  initContent: function () {
    var mtlLoader = new MTLLoader();
    mtlLoader.load( './objects/rocket/rocket.mtl', (materials) => {
      materials.preload();

      var objLoader = new OBJLoader();
      objLoader.setMaterials( materials );
      objLoader.load( './objects/rocket/rocket.obj', object => {

        object.children[0].rotation.set(0, 0, -0.5)
        object.children[0].position.set(0, 0, 0)

        scene.add( object );
        this.objectLoading = true

        // let vertexHelper = new VertexNormalsHelper( object.children[0], 0.002, 0x00ff00, 1 );
        // scene.add(vertexHelper)
        // let faceHelper = new FaceNormalsHelper( object.children[0], 0.002, 0x00ff00, 1 );
        // scene.add(faceHelper)
      });
    })

    const geometry = new THREE.SphereGeometry( 0.01, 32, 32 );
    const material = new THREE.MeshBasicMaterial( {color: 0xffffff, vertexColors: true} );
    this.sphere = new THREE.Mesh( geometry, material );
    this.sphere.position.y = 0.1
    // this.sphere.position.z = 0.05
    this.scene.add( this.sphere );

    this.sphere.direction =  new THREE.Vector3( 0, 0, 0 )
    this.gravity =  new THREE.Vector3( 0, -0.0002, 0 )

    this.addLine()
  },

  addHelperOn(item) {
    const helper = new THREE.GridHelper( 1200, 60, 0xFF4444, 0x404040 );
    this.scene.add( item );
  },

  addLine() {
    let geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(0, 0, 0));
    geometry.vertices.push(new THREE.Vector3(1, 0, 0));
    geometry.verticesNeedUpdate = true
    let material = new THREE.LineBasicMaterial( { color: 0x0000ff, linewidth: 5 } );
    this.line = new THREE.Line(geometry, material);
    this.scene.add(this.line);
  },

  setLine(a, b) {
    this.line.geometry.verticesNeedUpdate = true
    this.line.geometry.vertices[0] = new THREE.Vector3(a.x, a.y, a.z)
    this.line.geometry.vertices[1] = new THREE.Vector3(b.x, b.y, b.z)
  },

  _reportProgress: function ( event ) {
    let output = '';
    if ( event.detail !== null && event.detail !== undefined && event.detail.text ) {
      output = event.detail.text;
    }

    document.getElementById( 'feedback' ).innerHTML = output;
  },

  resizeDisplayGL: function () {
    this.controls.handleResize();
    this.recalcAspectRatio();
    this.renderer.setSize( this.canvas.offsetWidth, this.canvas.offsetHeight, false );
    this.updateCamera();
  },

  recalcAspectRatio: function () {
    this.aspectRatio = ( this.canvas.offsetHeight === 0 ) ? 1 : this.canvas.offsetWidth / this.canvas.offsetHeight;
  },

  resetCamera: function () {
    // this.camera.position.copy( this.cameraDefaults.posCamera );
    this.cameraTarget.copy( this.cameraDefaults.posCameraTarget );

    this.updateCamera();
  },

  updateCamera: function () {
    this.camera.aspect = this.aspectRatio;
    this.camera.lookAt( this.cameraTarget );
    this.camera.updateProjectionMatrix();
  },

  beforeRender() {

  },

  render: function () {
    if ( ! this.renderer.autoClear ) this.renderer.clear();
    this.controls.update();
    this.renderer.render( this.scene, this.camera );
  },

  rotateObject({x, y, z}) {
    let obj = this.scene.children[5].children[0]
    let {cos, sin} = Math

    if (false) {
      let yaw = z
      let pitch = y
      let roll = x

      let cy = cos(yaw * 0.5);
      let sy = sin(yaw * 0.5);
      let cp = cos(pitch * 0.5);
      let sp = sin(pitch * 0.5);
      let cr = cos(roll * 0.5);
      let sr = sin(roll * 0.5);


      let qw = cr * cp * cy + sr * sp * sy;
      let qx = sr * cp * cy - cr * sp * sy;
      let qy = cr * sp * cy + sr * cp * sy;
      let qz = cr * cp * sy - sr * sp * cy;

      obj.quaternion.set(qx, qy, qz, qw).normalize()
    } else {
      // console.log(obj)
      obj.rotation.set(x, z, -y)
    }
  },

  getVertical(index) {
    let geometry = this.scene.children[5].children[0].geometry
    let points = geometry.attributes["position"].array
    let x = points[index]
    let y = points[index+1]
    let z = points[index+2]
    return new THREE.Vector3(x, y, z)
  },

  computeNormalByPoints(a, b, c) {
    let {sqrt, sqr} = Math

    let ax = b.x - a.x;
    let ay = b.y - a.y;
    let az = b.z - a.z;

    let bx = b.x - c.x;
    let by = b.y - c.y;
    let bz = b.z - c.z;

    let nx = ay * bz - az * by;
    let ny = az * bx - ax * bz;
    let nz = ax * by - ay * bx;

    return (new THREE.Vector3(nx, ny, nz)).normalize()
  },

  physicsStep() {
    const raycaster = new THREE.Raycaster();

    raycaster.set(
      this.sphere.position,
      new THREE.Vector3(0, -1, 0),
    )

    let rocketObj = this.scene.children[5].children[0]
    let intersects = raycaster.intersectObject(rocketObj, true)
    if (intersects.length) {

      let item = intersects[0]

      if (item.distance < 0.01) {

        let obj = item.object;
        let a = new THREE.Vector3()
        let b = new THREE.Vector3()
        let c = new THREE.Vector3()

        a.copy(item.point)
        b.copy(item.face.normal)
        b.transformDirection( obj.matrixWorld );
        c.copy(a).add(b);
        this.setLine(c, a)
        c.sub(a)

        this.sphereDirection.copy(c)
        this.sphereDirection.normalize()
        this.sphereDirection.multiplyScalar(0.005)
      }
    }

    this.sphereDirection.add(this.gravity)
    let newPosition = this.sphere.position.addVectors(this.sphere.position, this.sphereDirection)
    this.sphere.position.set(newPosition.x, newPosition.y, newPosition.z)
  }
};

const app = new OBJLoader2Example( document.getElementById( 'example' ) );
window.app = app

const resizeWindow = function () {
  app.resizeDisplayGL();
};

const render = function () {
  requestAnimationFrame( render );

  if (app.objectLoading) {
    app.physicsStep()
  }
  app.render();
};

window.addEventListener( 'resize', resizeWindow, false );

console.log( 'Starting initialisation phase...' );
app.initGL();
app.resizeDisplayGL();
app.initContent();

setListenHandler(app.rotateObject.bind(app))

render();
