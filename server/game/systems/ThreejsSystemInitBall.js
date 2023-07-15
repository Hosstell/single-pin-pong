import data from "../data.js";

export default class ThreejsSystemInitBall {
  init() {
    const geometry = new THREE.SphereGeometry( 0.01, 32, 32 );
    const material = new THREE.MeshBasicMaterial( {color: 0xffffff, vertexColors: true} );
    var ball = new THREE.Mesh( geometry, material );
    ball.position.y = 0.1

    data.threejs.scene.add(ball);
    data.threejs.objects.ball = ball
    console.log("Ball object is added success!")
  }
}