import React, { useState } from 'react';
import { Send, Hash, Volume2, Video, Lock } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Settings } from './Settings';
import { ServerSettings } from './ServerSettings';
import { Friends } from './Friends';
import { DirectMessages } from './DirectMessages';

export const Chat: React.FC = () => {
  const { 
    messages, 
    currentUser, 
    connections = [], // Provide default empty array
    activeTab,
    currentServer,
    currentChannel
  } = useStore();
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (!message.trim() || !currentUser || !currentChannel) return;

    const newMessage = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      content: message,
      timestamp: Date.now(),
      channelId: currentChannel.id
    };

    // Only try to send to connections if they exist
    if (connections?.length > 0) {
      connections.forEach(({ connection }) => {
        connection.send(JSON.stringify({ type: 'message', data: newMessage }));
      });
    }

    useStore.getState().addMessage(newMessage);
    setMessage('');
  };

  // Show appropriate component based on active tab
  if (activeTab === 'settings') {
    return <Settings />;
  }

  if (activeTab === 'home') {
    return <DirectMessages />;
  }

  if (activeTab === 'friends') {
    return <Friends />;
  }

  if (currentServer && activeTab === 'server-settings') {
    return <ServerSettings isOpen={true} onClose={() => useStore.getState().setActiveTab('servers')} />;
  }

  const getChannelIcon = () => {
    if (!currentChannel) return Hash;
    switch (currentChannel.type) {
      case 'hop':
      case 'croak':
        return Volume2;
      case 'leap':
        return Video;
      case 'burrow':
        return Lock;
      default:
        return Hash;
    }
  };

  const ChannelIcon = getChannelIcon();

  const channelMessages = messages.filter(msg => msg.channelId === currentChannel?.id) || [];

  return (
    <div className="flex-1 flex flex-col bg-[#36393f]">
      {/* Channel Header */}
      <div className="h-12 border-b border-[#202225] flex items-center px-4">
        <div className="flex items-center gap-2">
          <ChannelIcon className="w-5 h-5 text-gray-400" />
          <h2 className="text-white font-medium">
            {currentChannel?.name || 'Welcome'}
          </h2>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {channelMessages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.senderId === currentUser?.id ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] ${msg.senderId === currentUser?.id ? 'bg-[#5865F2]' : 'bg-[#40444b]'} rounded-lg p-3`}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-300">{msg.senderName}</span>
                <span className="text-xs text-gray-400">
                  {new Date(msg.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
              <div className="text-white">{msg.content}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="h-20 px-4 flex items-center">
        <div className="flex-1 bg-[#40444b] rounded-lg flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 bg-transparent text-white px-4 py-3 focus:outline-none"
            placeholder={`Message ${currentChannel ? `#${currentChannel.name}` : 'here'}...`}
          />
          <button
            onClick={sendMessage}
            className="p-2 hover:bg-[#202225] rounded-lg mx-2"
          >
            <Send className="h-6 w-6 text-gray-300" />
          </button>
        </div>
      </div>
    </div>
  );
};