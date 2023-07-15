const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(__dirname + '/game'))
app.use(express.static(__dirname + '/'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/game/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  // socket.on("send_accelerometer_data", data => {
  //   io.emit("get_accelerometer_data", data)
  // })

  socket.on("send_gyroscope_data", data => {
    io.emit("get_gyroscope_data", data)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});