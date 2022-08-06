const express = require("express");
const { v4: uuidv4 } = require('uuid');

const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);



var roomId = uuidv4();

app.use(express.static("public"));

app.get("/", function(req, res){
  res.redirect("/"+roomId);
});

app.get("/"+roomId, function(req, res){
  res.sendFile(__dirname + "/college.html");
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message',msg);
  });
});


server.listen(3000, function(){
  console.log("listening on *:3000");
});
