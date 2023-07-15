socket = io.connect('http://192.168.1.104:3000/')

socket.emit('login', {
  field: 'Проверечные данные'
})

function setListenHandler(callback) {
  socket.on('rotate', (data) => {
    callback(data)
  })
}


