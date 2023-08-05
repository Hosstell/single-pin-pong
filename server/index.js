const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {cors: {origin: "*"}});


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

app.get('/ip', (req, res) => {
  res.send(getLocalIP())
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