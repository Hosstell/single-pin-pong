import data from "../data.js";
import * as THREE from 'three';

export default class ThreejsSystemInitLights {
  init() {
    const ambientLight = new THREE.AmbientLight( 0x404040 );
    const directionalLight = new THREE.DirectionalLight( 0xC0C090 );

    data.threejs.scene.add(ambientLight)
    data.threejs.scene.add(directionalLight)
  }
}