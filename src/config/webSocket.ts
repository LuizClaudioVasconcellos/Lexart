import { Server } from 'socket.io';
import http from 'http';

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

export const sendMessageToWebSocketClients = (message: string) => {
  io.emit('progress', message);
};

server.listen(3334, () => {
  console.log('WebSocket server is running on port 3334');
});
