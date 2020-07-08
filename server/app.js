const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const users = {}

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

io.on("connection", (socket) => {
    socket.on('new-user', name => {
        users[socket.id] = name 
        socket.broadcast.emit('user-connected', name)
    })
    
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', {
          message: message, 
          name: users[socket.id]
        })
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })
});


server.listen(port, () => console.log(`Listening on port ${port}`));