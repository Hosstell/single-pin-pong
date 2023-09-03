import * as THREE from "three";

const data = {
  backendUrl: import.meta.env.VITE_BACKEND_HOST || window.location.href,
  socket: undefined,
  gameId: undefined,
  gameIdUrl: undefined,
  gyroscopeActions: [],
  accelerometerActions: [],
  physics: {
    gravity: new THREE.Vector3(0, -0.00009, 0),
    ballDirection: new THREE.Vector3(0, 0, 0)
  },
  threejs: {
    scene: undefined,
    camera: undefined,
    render: undefined,
    objects: {
      rocket: undefined,
      ball: undefined
    }
  }
}

export default data