const path= require('path');
const http= require('http')
const express = require('express')
const {Server} = require('socket.io')
const app = express()

const cors = require('cors')
const server=http.createServer(app)
app.use(cors())
//Set static folder
app.use(express.static(path.join(__dirname,'public')));
const io = new Server(server, {
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    }
});
io.on('connection',socket =>{
    socket.emit('message','Welcome to ChatCord!')
    io.emit('message','A user has joined the chat');

    //Runs when client disconnects
    socket.on('disconnect',()=>{
      io.emit('message','A user has left the chat')
    });

    //Broadcast when a user connects
   
})

const PORT = 3000 || process.env.PORT;
server.listen(PORT,()=>console.log(`Server running on ${PORT}`))