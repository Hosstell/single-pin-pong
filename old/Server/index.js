var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

var logic = require('./games/routing')

app.use(express.static(__dirname + '/node_modules'));
app.get('/', function(req, res, next) {
  res.send('Hello')
});


logic.addLogic(io)

let port = 4000
server.listen(port, () => {
  console.log('Server is running on port:', port)
});
