import data from "./../data.js"

export default class SocketSystemGettingData {
  init() {
    data.socket.on("get_gyroscope_data", coords => {
      data.gyroscopeActions.push(coords)
    })
    data.socket.on("get_accelerometer_data", coords => {
      data.accelerometerActions.push(coords)
    })
  }
}