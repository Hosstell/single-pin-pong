import data from "../data";
import * as THREE from "three";

export default class ThreejsSystemResetBallWhenFall {
  run() {
    if (data.threejs.objects.ball && data.threejs.objects.ball.position.y < -0.34) {
      data.threejs.objects.ball.position.y = 0.1
      data.threejs.objects.ball.position.x = 0
      data.threejs.objects.ball.position.z = 0
      data.physics.ballDirection = new THREE.Vector3(0, 0, 0)
    }
  }
}