import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', {
    path: '/connect-socket',
    transports: ['websocket'],
});
socket.emit('fromClient', 'hello form client');
socket.on('fromServer', (msg) => {
    console.log(msg);
});
