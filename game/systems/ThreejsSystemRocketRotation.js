import data from "../data.js";

export default class ThreejsSystemRocketRotation {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
  }

  run() {
    if (!data.threejs.objects.rocket) return;

    data.gyroscopeActions.forEach(action => {
      this.x = action.x * Math.PI / 180
      this.y = action.z * Math.PI / 180
      this.z = action.y * -Math.PI / 180

      data.threejs.objects.rocket.children[0].rotateX(this.x)
      data.threejs.objects.rocket.children[0].rotateY(this.y)
      data.threejs.objects.rocket.children[0].rotateZ(this.z)
    })

    data.gyroscopeActions = []
  }
}