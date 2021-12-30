import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  const { id } = socket;
  console.log('🎉 a user connected:', id);
  socket.on('disconnect', () => {
    console.log('🚀 user disconnected:', id);
  });
});

server.listen(port, () => {
  console.log(`✅ Listening on http://localhost:${port}`);
});
