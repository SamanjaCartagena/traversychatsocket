const path= require('path');
const http= require('http')
const express = require('express')
const {Server} = require('socket.io')
const formatMessage = require('./utils/messages')
const {userJoin,getCurrentUser}= require('./utils/users');

const app = express()

const cors = require('cors')
const server=http.createServer(app)
app.use(cors())
//Set static folder
app.use(express.static(path.join(__dirname,'public')));

const botName ='ChatCord Bot'

const io = new Server(server, {
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    }
});
io.on('connection',socket =>{

    socket.on('joinRoom',({username, room})=>{
        const user = userJoin(socket.id,username,room);
        socket.join(user.room)
 socket.on('disconnect',()=>{
      io.emit('message','A user has left the chat')
    });

     socket.on('chatMessage',(msg) =>{
        io.emit('message',formatMessage('USER',msg))
     })

    })
    socket.emit('message',formatMessage(botName,'Welcome to ChatCord!'))
    io.emit('message','A user has joined the chat');

    //Runs when client disconnects
   
     
    
})

const PORT = 3000 || process.env.PORT;
server.listen(PORT,()=>console.log(`Server running on ${PORT}`))