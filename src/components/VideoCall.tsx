import React, { useEffect, useRef, useState } from 'react';
import P5 from 'react-p5';
import p5Types from 'p5';
import { UploadButton } from '@uploadthing/react';
import { useStore } from '../store/useStore';
import { CallOverlay } from './CallOverlay';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  stream?: MediaStream;
  remoteStream?: MediaStream;
  peerName: string;
}

export const VideoCall: React.FC<Props> = ({
  isOpen,
  onClose,
  stream,
  remoteStream,
  peerName
}) => {
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    const canvas = p5.createCanvas(640, 480).parent(canvasParentRef);
    canvas.id('videoCanvas');
    p5.pixelDensity(1);
  };

  const draw = (p5: p5Types) => {
    p5.background(0);

    if (videoRef.current && videoRef.current.readyState >= 2) {
      const video = videoRef.current;
      p5.loadPixels();
      
      // Load background image if set
      if (backgroundImage) {
        p5.image(p5.loadImage(backgroundImage), 0, 0, p5.width, p5.height);
      }

      // Process video frame with chroma key effect
      const ctx = (canvasRef.current as HTMLCanvasElement).getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, p5.width, p5.height);
        const frame = ctx.getImageData(0, 0, p5.width, p5.height);
        const pixels = frame.data;

        for (let i = 0; i < pixels.length; i += 4) {
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];

          // Green screen effect (adjust threshold as needed)
          if (g > 100 && r < 100 && b < 100) {
            pixels[i + 3] = 0; // Make pixel transparent
          }
        }

        ctx.putImageData(frame, 0, 0);
        p5.image(canvasRef.current as HTMLCanvasElement, 0, 0);
      }
    }
  };

  return (
    <CallOverlay
      isOpen={isOpen}
      onClose={onClose}
      stream={stream}
      remoteStream={remoteStream}
      isVideo={true}
      isMuted={isMuted}
      isVideoEnabled={isVideoEnabled}
      onToggleMute={() => setIsMuted(!isMuted)}
      onToggleVideo={() => setIsVideoEnabled(!isVideoEnabled)}
      peerName={peerName}
    >
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-[#2f3136] rounded-lg p-4 shadow-lg">
          <h3 className="text-white text-sm font-medium mb-2">Background Settings</h3>
          <div className="space-y-2">
            <UploadButton
              endpoint="backgroundImage"
              onClientUploadComplete={(res) => {
                if (res?.[0]) {
                  setBackgroundImage(res[0].url);
                }
              }}
              onUploadError={(error: Error) => {
                console.error('Upload error:', error);
              }}
            />
            <input
              type="text"
              placeholder="Or enter image URL"
              className="w-full bg-[#40444b] text-white rounded px-3 py-2 text-sm"
              onChange={(e) => setBackgroundImage(e.target.value)}
            />
            <button
              onClick={() => setBackgroundImage('')}
              className="w-full bg-red-500 text-white rounded px-3 py-2 text-sm"
            >
              Remove Background
            </button>
          </div>
        </div>
      </div>

      <div className="hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
        />
        <canvas ref={canvasRef} width="640" height="480" />
      </div>

      <P5 setup={setup} draw={draw} />
    </CallOverlay>
  );
};