'use strict';

import * as THREE from "../modules/three.module.js";
import {TrackballControls} from "../modules/TrackballControls.js";
import {MTLLoader} from "../modules/MTLLoader.js";
import {OBJLoader} from "../modules/OBJLoader.js";
import objectLoader from './objectLoader.js'

export class Game {
  constructor(htmlNode) {
    this.htmlNode = htmlNode

    this.renderer = undefined
    this.scene = undefined
    this.camera = undefined
    this.controls = undefined

    const ambientLight = new THREE.AmbientLight(0x404040)
    const directionalLight = new THREE.DirectionalLight(0xC0C090, 1, 100)
    directionalLight.position.set(1, 5, 0)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 4000; // default
    directionalLight.shadow.mapSize.height = 4000; // default
    directionalLight.shadow.camera.near = 1 // default
    directionalLight.shadow.camera.far = 10000; // default

    this.lights = [ambientLight, directionalLight]

    this.cameraSettings = {
      posCamera: new THREE.Vector3( 0.0, 0.18945660456909422, 0.3720044393765124),
      posCameraTarget: new THREE.Vector3( 0, 0, 0 ),
      near: 0.1,
      far: 10000,
      fov: 45,
      aspectRatio: 1
    }
    this.style = {
      background: 0xa3a5e3
    }

    this.physics = {
      gravity: new THREE.Vector3( 0, -0.0002, 0 )
    }

    this.rocket = undefined
    this.sphere = undefined
  }

  init() {
    this.renderer = new THREE.WebGLRenderer( {
      canvas: this.htmlNode,
      antialias: true,
      autoClear: true
    })
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer.setClearColor( this.style.background )

    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(
      this.cameraSettings.fov,
      this.cameraSettings.aspectRatio,
      this.cameraSettings.near,
      this.cameraSettings.far
    )
    this.camera.position.copy(this.cameraSettings.posCamera)
    this.camera.lookAt(this.cameraSettings.posCameraTarget)

    this.controls = new TrackballControls(this.camera, this.renderer.domElement)

    this.lights.forEach(light => this.scene.add(light))

    const helper = new THREE.GridHelper( 1200, 60, 0xFF4444, 0x404040 )
    this.scene.add(helper)
  }

  resizeDisplayGL() {
    console.log('resizeDisplayGL')
    this.controls.handleResize();
    this.recalcAspectRatio();
    this.renderer.setSize( this.htmlNode.offsetWidth, this.htmlNode.offsetHeight, false );
    this.updateCamera();
  }

  recalcAspectRatio() {
    this.cameraSettings.aspectRatio = ( this.htmlNode.offsetHeight === 0 ) ? 1 : this.htmlNode.offsetWidth / this.htmlNode.offsetHeight;
  }

  updateCamera() {
    this.camera.aspect = this.cameraSettings.aspectRatio;
    this.camera.lookAt( this.cameraSettings.posCameraTarget );
    this.camera.updateProjectionMatrix();
  }

  initContent() {
    // Ракетка

    let path = '/objects/rocket'
    let obj = `${path}/rocket.obj`
    let mtl = `${path}/rocket.mtl`
    objectLoader(obj, mtl)
      .then(object => {
        console.log('window.location.pathname', window.location.pathname)
        this.rocket = object
        this.rocket.receiveShadow = true
        this.rocket.children[0].receiveShadow = true
        this.rocket.rotation.z = -0.1
        this.scene.add( object );
        this.objectLoading = true
      })

    // var mtlLoader = new MTLLoader();
    // mtlLoader.load( './objects/rocket/rocket.mtl', (materials) => {
    //   materials.preload();
    //   var objLoader = new OBJLoader();
    //   objLoader.setMaterials( materials );
    //   objLoader.load( './game/objects/rocket/rocket.obj', object => {
    //     this.rocket = object
    //     console.
    //     this.scene.add( object );
    //     this.objectLoading = true
    //   });
    // })

    // Шарик
    const geometry = new THREE.SphereGeometry(0.01, 32, 32)
    const material = new THREE.MeshStandardMaterial({color: 0xffffff})
    this.sphere = new THREE.Mesh(geometry, material)
    this.sphere.position.y = 0.1
    this.sphere.castShadow = true
    this.sphere.receiveShadow = false;
    this.scene.add(this.sphere)
    this.sphere.direction =  new THREE.Vector3( 0, 0, 0 )
  }

  updateData() {
    if (this.rocket && this.sphere) {
      this.physicsStep()
    }
  }

  physicsStep() {
    const raycaster = new THREE.Raycaster();

    raycaster.set(
      this.sphere.position,
      new THREE.Vector3(0, -1, 0),
    )

    let intersects = raycaster.intersectObject(this.rocket, true)
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
        // this.setLine(c, a)
        c.sub(a)

        // c.multiplyScalar(this.sphere.direction.dot(c) * 2)
        // this.sphere.direction.sub(c)

        this.sphere.direction.copy(c)
        this.sphere.direction.normalize()
        this.sphere.direction.multiplyScalar(0.005)
      }
    }

    this.sphere.direction.add(this.physics.gravity)
    let newPosition = this.sphere.position.addVectors(this.sphere.position, this.sphere.direction)
    this.sphere.position.set(newPosition.x, newPosition.y, newPosition.z)
  }

  rotateObject({x, y, z}) {
    this.rocket.rotation.set(x, z, -y)
  }

  render() {
    if (!this.renderer.autoClear) this.renderer.clear();
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  loop() {
    this.updateData()
    this.render()
  }
}

