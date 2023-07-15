const rocketDuel = require('./rocket_duel/index')

function addLogic(io) {
  io.sockets.on('connection', function (socket) {
    console.log('Присоединился новый пользователь:', socket.id)

    socket.on('disconnect', function () {
      console.log('Пользователь отключился:', socket.id)
    })

    // Rocket Duel
    addRocketDuel(io, socket)
  });
}

function addRocketDuel(io, socket) {
  socket.on('createRocketDuelGame', () => {
    console.log("Получен запрос createRocketDuelGame")
    socket.emit('createRocketDuelGame', rocketDuel.createGameRocketDuel())
    console.log("Отправлены данные на запрос createRocketDuelGame")
  })
}


module.exports.addLogic = addLogic
