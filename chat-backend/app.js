import { Server } from "socket.io";
import { createServer } from 'http';

const httpServer = createServer();

const wsServer = new Server(httpServer, {
    cors: {
        origin: "*",
    }
})

wsServer.on('connection', (socket) => {
    console.log('New frontend connected')
    socket.on("chat-message", message => {
        socket.broadcast.emit("chat-message", message)
    })
})

httpServer.listen(5000)



















// import { Server } from "socket.io";
// import {createServer} from "http";

// const httpServer = createServer();

// const wsServer = new Server(httpServer, {
//     cors: {
//         origin: "*"
//     }
// });

// wsServer.on("connection", (socket)=> {
//     // console.log("New frontend connected.")
//     socket.on("chat-message", message => {
//         socket.broadcast.emit("chat-message", message);
//     })
// })

// httpServer.listen(5000);