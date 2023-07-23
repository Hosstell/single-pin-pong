import * as THREE from 'three'
import data from "../data";
import {OrbitControls} from "three/addons/controls/OrbitControls";

export default class ThreejsSystemOrbitControls {
  init() {
    const controls = new OrbitControls(data.threejs.camera, data.threejs.render.domElement );
    controls.target.set( 0, 0, 0 );
    controls.update();
  }
}