import { useEffect, useRef } from 'react';
import Peer from 'peerjs';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from '../store/useStore';

export const usePeer = () => {
  const peerRef = useRef<Peer | null>(null);
  const { currentUser } = useStore();

  useEffect(() => {
    if (!currentUser) return;

    const peer = new Peer(currentUser.id, {
      host: window.location.hostname,
      port: Number(window.location.port) || 443,
      path: '/peerjs',
      secure: window.location.protocol === 'https:',
      config: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:global.stun.twilio.com:3478' }
        ]
      }
    });

    peer.on('open', (id) => {
      console.log('Connected to PeerJS server with ID:', id);
    });

    peer.on('call', (call) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          call.answer(stream);
          handleCall(call);
        })
        .catch((err) => {
          console.error('Failed to get local stream:', err);
        });
    });

    peerRef.current = peer;

    return () => {
      peer.destroy();
    };
  }, [currentUser]);

  const handleCall = (call: any) => {
    call.on('stream', (remoteStream: MediaStream) => {
      // Handle incoming stream
      const event = new CustomEvent('incomingStream', { detail: { stream: remoteStream } });
      window.dispatchEvent(event);
    });

    call.on('close', () => {
      // Handle call end
      const event = new CustomEvent('callEnded');
      window.dispatchEvent(event);
    });

    call.on('error', (err: Error) => {
      console.error('Call error:', err);
    });
  };

  const startCall = async (targetUserId: string, isVideo: boolean = true) => {
    if (!peerRef.current) throw new Error('Peer not initialized');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: isVideo,
        audio: true
      });

      const call = peerRef.current.call(targetUserId, stream);
      handleCall(call);

      return {
        callId: uuidv4(),
        stream,
        call
      };
    } catch (err) {
      console.error('Failed to start call:', err);
      throw err;
    }
  };

  const endCall = (callId: string) => {
    if (peerRef.current) {
      peerRef.current.connections[callId]?.forEach(conn => conn.close());
    }
  };

  return {
    peer: peerRef.current,
    startCall,
    endCall
  };
};