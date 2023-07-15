import data from "../data.js";

export default class ThreejsSystemRocketMovement {
  constructor() {
    this.speed = {
      x: 0,
      y: 0,
      z: 0
    };
    this.position = {
      x: 0,
      y: 0,
      z: 0
    }
    this.lastTime = 0
    this.relaxCount = 0
  }

  run() {
    if (!data.threejs.objects.rocket) return;

    data.accelerometerActions.forEach(action => {
      const decCount = 10 ** 2
      const values = [
        Math.round(action.x * decCount)/decCount,
        Math.round(action.y * decCount)/decCount,
        Math.round(action.z * decCount)/decCount,
      ]
      const value = Math.sqrt(values.reduce((store, value) => store + value ** 2))

      if (0.95 < value < 1.05) {
        this.relaxCount += 1
      } else {
        this.relaxCount = 0
      }

      if (this.relaxCount > 20) {
        this.speed = {x: 0, y: 0, z: 0}
        this.relaxCount = 0
        // console.log("hello")
      }

      if (!this.lastTime) {
        this.lastTime = action.t
        return
      }

      var deltaTime = (action.t - this.lastTime) / 1000

      this.speed.x = this.speed.x + action.x * deltaTime
      this.speed.y = this.speed.y + action.y * deltaTime
      this.speed.z = this.speed.z + action.z * deltaTime

      const round = a => a > 0.002 ? a : 0
      this.speed.x = round(this.speed.x)
      this.speed.y = round(this.speed.y)
      this.speed.z = round(this.speed.z)

      console.log("----")
      console.log("Пройденное время:", deltaTime, "ms")
      console.log("Укорение:", action.z)
      console.log("Скорость:", this.speed.z)

      this.position.x = this.position.x + this.speed.x * deltaTime * 0.5
      this.position.y = this.position.y + this.speed.y * deltaTime * 0.5
      this.position.z = this.position.z + this.speed.z * deltaTime * 0.5

      console.log("Новая позиция:", this.position.z)
      // console.log(this.position.y, this.speed.y)

      // data.threejs.objects.rocket.children[0].position.x = this.position.x
      // data.threejs.objects.rocket.children[0].position.z = this.position.y
      data.threejs.objects.rocket.children[0].position.y = this.position.z

      this.lastTime = action.t
    })

    data.accelerometerActions = []
  }
}