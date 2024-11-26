import React, { useEffect, useRef } from 'react';
import { Phone, Video, Mic, MicOff, VideoOff, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  stream?: MediaStream;
  remoteStream?: MediaStream;
  isVideo: boolean;
  isMuted: boolean;
  isVideoEnabled: boolean;
  onToggleMute: () => void;
  onToggleVideo: () => void;
  peerName: string;
}

export const CallOverlay: React.FC<Props> = ({
  isOpen,
  onClose,
  stream,
  remoteStream,
  isVideo,
  isMuted,
  isVideoEnabled,
  onToggleMute,
  onToggleVideo,
  peerName
}) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (localVideoRef.current && stream) {
      localVideoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="relative w-full max-w-4xl">
        {/* Main Video */}
        <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
          {isVideo ? (
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-24 h-24 bg-[#5865F2] rounded-full flex items-center justify-center">
                <span className="text-4xl text-white font-semibold">
                  {peerName[0].toUpperCase()}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Local Video (Picture-in-Picture) */}
        {isVideo && (
          <div className="absolute bottom-4 right-4 w-48 aspect-video bg-gray-800 rounded-lg overflow-hidden">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
          <button
            onClick={onToggleMute}
            className={`p-4 rounded-full ${
              isMuted ? 'bg-red-500' : 'bg-[#5865F2]'
            }`}
          >
            {isMuted ? (
              <MicOff className="w-6 h-6 text-white" />
            ) : (
              <Mic className="w-6 h-6 text-white" />
            )}
          </button>

          <button
            onClick={onClose}
            className="p-4 rounded-full bg-red-500"
          >
            <Phone className="w-6 h-6 text-white" />
          </button>

          {isVideo && (
            <button
              onClick={onToggleVideo}
              className={`p-4 rounded-full ${
                isVideoEnabled ? 'bg-[#5865F2]' : 'bg-red-500'
              }`}
            >
              {isVideoEnabled ? (
                <Video className="w-6 h-6 text-white" />
              ) : (
                <VideoOff className="w-6 h-6 text-white" />
              )}
            </button>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};