const express = require('express');
const app = express();
var cors = require('cors')
app.use(cors())

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {cors: {origin: "*"}});

const PORT = 3000

function getLocalIP() {
  const { networkInterfaces } = require('os');
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.netmask == '255.255.255.0') {
        return net.address
      }
    }
  }
}

app.use(express.static(__dirname + '/static'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/index.html');
});

app.get('/download-app', (req, res) => {

  res.send(process.env.ANDROID_APP_URL)
});

app.get('/host', (req, res) => {
  const host = `${getLocalIP()}:${PORT}`
  res.send(host)
});

const gameConnections = {

}

io.on('connection', (socket) => {

  if (socket.request._query['gameId']) {
    gameConnections[socket.request._query['gameId']] = socket
    console.log('Browser connected');
  } else {
    console.log('Smartphone connected');
  }

  socket.on("send_gyroscope_data", data => {
    const targetSocket = gameConnections[data.gameId]
    if (targetSocket) {
      targetSocket.emit("get_gyroscope_data", data.data)
    }
  })

  socket.on('reset_rocket_position', data => {
    const targetSocket = gameConnections[data.gameId]
    if (targetSocket) {
      targetSocket.emit("reset_rocket_position")
    }
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(PORT, '0.0.0.0',() => {
  console.log('listening on *:3000');
});