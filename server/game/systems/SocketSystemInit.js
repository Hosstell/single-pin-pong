import data from "./../data.js"

export default class SocketSystemInit {
  init() {
    data.socket = io();
  }
}