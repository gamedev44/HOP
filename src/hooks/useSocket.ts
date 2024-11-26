import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useStore } from '../store/useStore';

const SOCKET_URL = 'http://localhost:3001';

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const { currentUser, addMessage, updateUserStatus } = useStore();

  useEffect(() => {
    if (!currentUser) return;

    socketRef.current = io(SOCKET_URL, {
      auth: {
        userId: currentUser.id,
        username: currentUser.name
      }
    });

    const socket = socketRef.current;

    socket.on('connect', () => {
      console.log('Connected to socket server');
      socket.emit('user:online', {
        userId: currentUser.id,
        username: currentUser.name
      });
    });

    socket.on('message:receive', (message) => {
      addMessage(message);
    });

    socket.on('user:status', ({ userId, status }) => {
      updateUserStatus(userId, status);
    });

    return () => {
      if (socket) {
        socket.emit('user:offline', { userId: currentUser.id });
        socket.disconnect();
      }
    };
  }, [currentUser]);

  const sendMessage = (message: any) => {
    if (socketRef.current) {
      socketRef.current.emit('message:send', message);
    }
  };

  const initiateCall = (targetUserId: string) => {
    if (socketRef.current) {
      socketRef.current.emit('call:initiate', { targetUserId });
    }
  };

  const acceptCall = (callId: string) => {
    if (socketRef.current) {
      socketRef.current.emit('call:accept', { callId });
    }
  };

  const rejectCall = (callId: string) => {
    if (socketRef.current) {
      socketRef.current.emit('call:reject', { callId });
    }
  };

  return {
    socket: socketRef.current,
    sendMessage,
    initiateCall,
    acceptCall,
    rejectCall
  };
};