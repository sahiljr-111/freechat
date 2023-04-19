const express = require('express');
const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 5000;

http.listen(PORT, ()=>{
  console.log(`listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/components'));

app.get('/' ,(req,res)=>{
  res.sendFile(__dirname + '/index.html')
})


// socket
const users = {};
const io = require('socket.io')(http)
io.on('connection',(socket)=>{
  console.log("connected");
  socket.on('new-user-joined', name =>{
    users[socket.id] = name;
    console.log("new user joined = ", name)
    socket.broadcast.emit('user-joined',name)
  })
  socket.on('message',(msg)=>{
    socket.broadcast.emit('message', msg)
  })

})

