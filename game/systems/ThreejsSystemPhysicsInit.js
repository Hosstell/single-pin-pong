import data from "../data.js";
import * as THREE from 'three';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default class ThreejsSystemPhysicsInit2 {
  constructor() {
    this.ball = null
    this.rocket = null
    this.gravity = null
  }

  async init() {
    while (!data.threejs.objects.ball || !data.threejs.objects.rocket) await sleep(20);

    this.ball = data.threejs.objects.ball
    this.rocket = data.threejs.objects.rocket
    this.gravity = data.physics.gravity
  }

  run() {
    if (!this.ball || !this.rocket) return;

    this.physicsStep()
    data.physics.ballDirection.add(this.gravity)
    this.ball.position.add(data.physics.ballDirection)
  }

  physicsStep() {
    const raycaster = new THREE.Raycaster();
    raycaster.set(
        data.threejs.objects.ball.position,
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
        c.sub(a)

        data.physics.ballDirection.copy(c)
        data.physics.ballDirection.normalize()
        data.physics.ballDirection.multiplyScalar(0.004)
      }
    }
  }
}