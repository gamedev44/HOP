import React, { useState, useRef } from 'react';
import { Send, Hash, Volume2, Video, Lock, Smile, Paperclip } from 'lucide-react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { UploadButton } from '@uploadthing/react';
import { useStore } from '../store/useStore';
import { useSocket } from '../hooks/useSocket';
import { usePeer } from '../hooks/usePeer';
import { VideoCall } from './VideoCall';
import { IncomingCallModal } from './IncomingCallModal';
import type { Message } from '../types';

export const Chat: React.FC = () => {
  const {
    messages,
    currentUser,
    currentChannel,
    activeTab,
    users,
    addMessage,
    addReaction
  } = useStore();
  const { sendMessage } = useSocket();
  const { startCall, endCall } = usePeer();
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [isInCall, setIsInCall] = useState(false);
  const [incomingCall, setIncomingCall] = useState<any>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Get selected friend from URL or state
  const selectedFriendId = new URLSearchParams(window.location.search).get('dm');
  const selectedFriend = users.find(u => u.id === selectedFriendId);

  const handleSendMessage = () => {
    if (!message.trim() || !currentUser || (!currentChannel && !selectedFriend)) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      senderId: currentUser.id,
      senderName: currentUser.name,
      channelId: currentChannel?.id || `dm_${selectedFriend?.id}`,
      timestamp: Date.now()
    };

    sendMessage(newMessage);
    addMessage(newMessage);
    setMessage('');
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEmojiSelect = (emoji: any) => {
    setMessage(prev => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  const handleReaction = (messageId: string, emoji: string) => {
    addReaction(messageId, emoji, currentUser?.id || '');
  };

  const handleStartCall = async (isVideo: boolean) => {
    if (!currentChannel && !selectedFriend) return;

    try {
      const { stream, call } = await startCall(selectedFriend?.id || currentChannel?.id || '', isVideo);
      setIsInCall(true);
      // Handle call UI
    } catch (err) {
      console.error('Failed to start call:', err);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#36393f]">
      {/* Channel/DM Header */}
      <div className="h-12 border-b border-[#202225] flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {activeTab === 'home' && selectedFriend ? (
            <>
              <div className="w-6 h-6 bg-[#5865F2] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {selectedFriend.name[0].toUpperCase()}
                </span>
              </div>
              <h2 className="text-white font-medium">{selectedFriend.name}</h2>
            </>
          ) : (
            <>
              <Hash className="w-5 h-5 text-gray-400" />
              <h2 className="text-white font-medium">
                {currentChannel?.name || 'Welcome'}
              </h2>
            </>
          )}
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleStartCall(false)}
            className="p-2 hover:bg-[#202225] rounded-lg"
          >
            <Volume2 className="w-5 h-5 text-gray-300" />
          </button>
          <button
            onClick={() => handleStartCall(true)}
            className="p-2 hover:bg-[#202225] rounded-lg"
          >
            <Video className="w-5 h-5 text-gray-300" />
          </button>
        </div>
      </div>

      {/* Rest of the component remains unchanged */}
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="group">
            <div className={`flex ${msg.senderId === currentUser?.id ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] ${
                msg.senderId === currentUser?.id ? 'bg-[#5865F2]' : 'bg-[#40444b]'
              } rounded-lg p-3`}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-300">{msg.senderName}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div className="text-white">{msg.content}</div>
                {msg.attachments?.map((url, i) => (
                  <div key={i} className="mt-2">
                    <img src={url} alt="Attachment" className="max-w-full rounded" />
                  </div>
                ))}
                <div className="mt-2 flex gap-1">
                  {msg.reactions?.map((reaction, i) => (
                    <button
                      key={i}
                      onClick={() => handleReaction(msg.id, reaction.emoji)}
                      className={`px-2 py-1 rounded ${
                        reaction.users.includes(currentUser?.id || '')
                          ? 'bg-[#5865F2]'
                          : 'bg-[#2f3136]'
                      }`}
                    >
                      {reaction.emoji} {reaction.count}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      {/* Message Input */}
      <div className="h-20 px-4 flex items-center">
        <div className="flex-1 bg-[#40444b] rounded-lg flex items-center">
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 hover:bg-[#202225] rounded-lg mx-2"
          >
            <Smile className="w-6 h-6 text-gray-300" />
          </button>
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="p-2 hover:bg-[#202225] rounded-lg"
          >
            <Paperclip className="w-6 h-6 text-gray-300" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 bg-transparent text-white px-4 py-3 focus:outline-none"
            placeholder={`Message ${selectedFriend ? selectedFriend.name : currentChannel ? `#${currentChannel.name}` : 'here'}...`}
          />
          <button
            onClick={handleSendMessage}
            className="p-2 hover:bg-[#202225] rounded-lg mx-2"
          >
            <Send className="h-6 w-6 text-gray-300" />
          </button>
        </div>
      </div>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-24 left-4">
          <Picker
            data={data}
            onEmojiSelect={handleEmojiSelect}
            theme="dark"
          />
        </div>
      )}

      {/* Upload Dialog */}
      {showUpload && (
        <div className="absolute bottom-24 left-16 bg-[#2f3136] rounded-lg p-4 shadow-lg">
          <UploadButton
            endpoint="messageAttachment"
            onClientUploadComplete={(res) => {
              if (res?.[0]) {
                const newMessage: Message = {
                  id: Date.now().toString(),
                  content: '',
                  senderId: currentUser?.id || '',
                  senderName: currentUser?.name || '',
                  channelId: currentChannel?.id || `dm_${selectedFriend?.id}`,
                  timestamp: Date.now(),
                  attachments: [res[0].url]
                };
                sendMessage(newMessage);
                addMessage(newMessage);
              }
              setShowUpload(false);
            }}
            onUploadError={(error: Error) => {
              console.error('Upload error:', error);
              setShowUpload(false);
            }}
          />
        </div>
      )}

      {/* Video Call */}
      {isInCall && (
        <VideoCall
          isOpen={isInCall}
          onClose={() => {
            setIsInCall(false);
            endCall(currentChannel?.id || selectedFriend?.id || '');
          }}
          peerName={selectedFriend?.name || currentChannel?.name || ''}
        />
      )}

      {/* Incoming Call Modal */}
      {incomingCall && (
        <IncomingCallModal
          isOpen={true}
          onAccept={() => {
            setIsInCall(true);
            setIncomingCall(null);
          }}
          onReject={() => {
            setIncomingCall(null);
          }}
          callerName={incomingCall.callerName}
          isVideo={incomingCall.isVideo}
        />
      )}
    </div>
  );
};