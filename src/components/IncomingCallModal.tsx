import React from 'react';
import { Phone, Video, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onAccept: () => void;
  onReject: () => void;
  callerName: string;
  isVideo: boolean;
}

export const IncomingCallModal: React.FC<Props> = ({
  isOpen,
  onAccept,
  onReject,
  callerName,
  isVideo
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#36393f] rounded-lg p-6 w-80">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-[#5865F2] rounded-full flex items-center justify-center mx-auto mb-4">
            {isVideo ? (
              <Video className="w-8 h-8 text-white" />
            ) : (
              <Phone className="w-8 h-8 text-white" />
            )}
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Incoming {isVideo ? 'Video' : 'Voice'} Call
          </h3>
          <p className="text-gray-300">{callerName} is calling...</p>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={onReject}
            className="p-4 rounded-full bg-red-500 hover:bg-red-600"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={onAccept}
            className="p-4 rounded-full bg-green-500 hover:bg-green-600"
          >
            {isVideo ? (
              <Video className="w-6 h-6 text-white" />
            ) : (
              <Phone className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};