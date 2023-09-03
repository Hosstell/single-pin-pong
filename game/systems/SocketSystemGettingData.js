import data from "./../data.js"

export default class SocketSystemGettingData {
  init() {
    data.socket.on("get_gyroscope_data", coords => {
      data.gyroscopeActions.push(coords)
    })
    data.socket.on("get_accelerometer_data", coords => {
      data.accelerometerActions.push(coords)
    })
    data.socket.on("reset_rocket_position", () => {
      if (data.threejs.objects.rocket) {
        data.threejs.objects.rocket.children[0].rotation.set(0,0,0)
      }
    })
  }
}