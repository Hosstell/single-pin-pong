import data from "../data.js";
import * as THREE from 'three';

export default class ThreejsSystemInitLights {
  init() {
    const ambientLight = new THREE.AmbientLight( 0x404040 );
    data.threejs.scene.add(ambientLight)

    const directionalLight = new THREE.SpotLight( 0xffffff, 1);
    directionalLight.position.set(0, 1, 0)
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 4096;
    directionalLight.shadow.mapSize.height = 4096;
    data.threejs.scene.add(directionalLight)
  }
}