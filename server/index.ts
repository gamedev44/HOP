import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { ExpressPeerServer } from 'peer';
import cors from 'cors';

const app = express();
const httpServer = createServer(app);

// Socket.IO setup
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// PeerJS server setup
const peerServer = ExpressPeerServer(httpServer, {
  path: '/peerjs',
  allow_discovery: true,
  proxied: true
});

app.use(cors());
app.use('/peerjs', peerServer);

// Socket.IO event handlers
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('user:online', ({ userId, username }) => {
    socket.data.userId = userId;
    socket.data.username = username;
    socket.join(`user:${userId}`);
    io.emit('user:status', { userId, status: 'online' });
  });

  socket.on('message:send', (message) => {
    io.to(`channel:${message.channelId}`).emit('message:receive', message);
  });

  socket.on('call:initiate', ({ targetUserId }) => {
    io.to(`user:${targetUserId}`).emit('call:incoming', {
      callerId: socket.id,
      callerName: socket.data.username
    });
  });

  socket.on('call:accept', ({ callId }) => {
    io.to(`call:${callId}`).emit('call:accepted');
  });

  socket.on('call:reject', ({ callId }) => {
    io.to(`call:${callId}`).emit('call:rejected');
  });

  socket.on('disconnect', () => {
    if (socket.data.userId) {
      io.emit('user:status', { userId: socket.data.userId, status: 'offline' });
    }
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});