import data from "./../data.js"
import {io} from "socket.io-client"
import { v4 as uuidv4 } from 'uuid';

export default class SocketSystemInit {
  init() {
    data.gameId = localStorage.getItem("gameId") || uuidv4()
    localStorage.setItem("gameId", data.gameId)
    data.socket = io.connect(data.backendUrl, { query: `gameId=${data.gameId}` });
  }
}