const express = require("express")
const cookies = require('cookie-parser')
const cors = require('cors')
const http = require('http'); 
const socketIo = require('socket.io');

const app = express()
const server = http.createServer(app); // Update this line
const io = socketIo(server);



//GLOBAL VARIABLES
const PORT = 8000
const DB = "CommunicateSocket"

app.use( express.json() ,express.urlencoded({ extended: true }),cors({credentials:true, origin:"http://localhost:3000"}),cookies())

require('./config/configs.mongoose')(DB)
require('./routes/user.routes')(app)


// Socket.IO connection
io.on('connection', (socket) => {
    console.log('A user connected');

    // Example event listener
    socket.on('message', (data) => {
        console.log('Message received: ', data);
        io.emit('message', data); // Broadcast the message to all connected clients
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});









app.listen(PORT,()=>console.log(`>>>SERVER IS RUNNING ON PORT ${PORT}<<<`))