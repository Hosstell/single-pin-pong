import data from "./../data.js"
import {io} from "socket.io-client"

export default class SocketSystemInit {
  init() {
    data.socket = io.connect('http://localhost:3000/');
  }
}