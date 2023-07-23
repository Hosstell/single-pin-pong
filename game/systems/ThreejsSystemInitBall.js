import data from "../data.js";
import * as THREE from 'three';

export default class ThreejsSystemInitBall {
  init() {
    const geometry = new THREE.SphereGeometry( 0.01, 32, 32 );
    const material = new THREE.MeshStandardMaterial( {color: 0xffffff} );
    var ball = new THREE.Mesh( geometry, material );
    ball.position.y = 0.1
    ball.castShadow = true;
    ball.receiveShadow = true;

    data.threejs.scene.add(ball);
    data.threejs.objects.ball = ball
    console.log("Ball object is added success!")
  }
}