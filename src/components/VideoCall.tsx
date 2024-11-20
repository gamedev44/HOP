import React, { useEffect, useRef } from 'react';
import P5 from 'react-p5';
import p5Types from 'p5';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  peerId?: string;
}

export const VideoCall: React.FC<Props> = ({ isOpen, onClose, peerId }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (isOpen) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error('Error accessing media devices:', err);
        });
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [isOpen]);

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(640, 480).parent(canvasParentRef);
    p5.noStroke();
  };

  const draw = (p5: p5Types) => {
    p5.background(36, 39, 63);
    
    // Draw video feed
    if (videoRef.current) {
      p5.image(p5.createVideo([videoRef.current.srcObject as any]), 0, 0);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#36393f] rounded-lg shadow-xl p-4 w-[800px]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">
            {peerId ? 'Call with ' + peerId : 'Video Call'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover"
          />
          <P5 setup={setup} draw={draw} />
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <button className="p-3 rounded-full bg-red-500 hover:bg-red-600 text-white">
            End Call
          </button>
          <button className="p-3 rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white">
            Toggle Camera
          </button>
          <button className="p-3 rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white">
            Toggle Mic
          </button>
        </div>
      </div>
    </div>
  );
};