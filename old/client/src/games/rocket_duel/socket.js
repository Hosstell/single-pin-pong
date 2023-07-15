import io from 'socket.io-client'

console.log(io)

const socket = io.connect('http://192.168.1.104:4000/')

socket.emit('createRocketDuelGame')
socket.on('createRocketDuelGame', (data) => {
  console.log(data)
})

export function setListenHandler(callback) {
  socket.on('rotate', (data) => {
    callback(data)
  })
}


