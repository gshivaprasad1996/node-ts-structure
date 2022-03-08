import { CorsOptions } from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer();
const io = new Server();
const corsOpts: CorsOptions = {
    origin: 'http://localhost:3000',
};

io.attach(httpServer, {
    cors: corsOpts,
    path: '/connect-socket',
});

io.on('connection', (socket) => {
    console.log('socket connected..');
    socket.emit('fromServer', 'Hey i am from server...');
    socket.on('fromClient', (msg) => {
        console.log('Message from client', msg);
    });
});

httpServer.listen(4000);

//Sample Client code from react

// import { io } from "socket.io-client";

// export default async function SocketConnection() {
//   const socket = io("http://localhost:4000", {
//     path: "/connect-socket",
//   });

//   socket.on("connect", () => {
//     console.log(socket.connected);
//   });

//   socket.emit("fromClient", "I am from client");
//   socket.on("fromServer", (msg) => {
//     console.log("Message from server ", msg);
//   });
// }

// SocketConnection();
