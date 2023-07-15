import data from "../data.js";

export default class ThreejsSystemRunAnimation {
  run() {
    data.threejs.render.render(data.threejs.scene, data.threejs.camera);
  }
}