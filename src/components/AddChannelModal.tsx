import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Hash, Volume2, Video, Lock, Play } from 'lucide-react';
import type { Channel, ChannelType } from '../types';

interface Props {
  categoryId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const AddChannelModal: React.FC<Props> = ({ categoryId, isOpen, onClose }) => {
  const { currentServer, addChannel } = useStore();
  const [name, setName] = useState('');
  const [type, setType] = useState<ChannelType>('river');
  const [isPrivate, setIsPrivate] = useState(false);
  const [topic, setTopic] = useState('');
  const [slowMode, setSlowMode] = useState(0);
  const [userLimit, setUserLimit] = useState<number | undefined>(undefined);

  if (!isOpen || !currentServer) return null;

  const channelTypes: { id: ChannelType; label: string; icon: typeof Hash }[] = [
    { id: 'river', label: 'Text Channel', icon: Hash },
    { id: 'hop', label: 'Voice Channel', icon: Volume2 },
    { id: 'leap', label: 'Video Channel', icon: Video },
    { id: 'stream', label: 'Stream Channel', icon: Play },
    { id: 'burrow', label: 'Private Thread', icon: Lock }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return;

    const newChannel: Channel = {
      id: Math.random().toString(36).substring(2),
      name: name.toLowerCase().replace(/\s+/g, '-'),
      type,
      serverId: currentServer.id,
      categoryId,
      isPrivate,
      topic: topic.trim(),
      slowMode,
      userLimit: (type === 'hop' || type === 'leap') ? userLimit : undefined
    };

    addChannel(newChannel);
    handleClose();
  };

  const handleClose = () => {
    setName('');
    setType('river');
    setIsPrivate(false);
    setTopic('');
    setSlowMode(0);
    setUserLimit(undefined);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="bg-[#36393f] rounded-lg shadow-xl p-4 w-[440px]" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-200">
            Create Channel
          </h3>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Channel Type */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                CHANNEL TYPE
              </label>
              <div className="grid grid-cols-2 gap-2">
                {channelTypes.map(channelType => {
                  const Icon = channelType.icon;
                  return (
                    <button
                      key={channelType.id}
                      type="button"
                      onClick={() => setType(channelType.id)}
                      className={`flex items-center gap-2 p-2 rounded ${
                        type === channelType.id
                          ? 'bg-[#5865F2] text-white'
                          : 'bg-[#202225] text-gray-300 hover:bg-[#36393f]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{channelType.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Channel Name */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                CHANNEL NAME
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  {type === 'hop' ? (
                    <Volume2 className="w-4 h-4 text-gray-400" />
                  ) : type === 'leap' ? (
                    <Video className="w-4 h-4 text-gray-400" />
                  ) : type === 'burrow' ? (
                    <Lock className="w-4 h-4 text-gray-400" />
                  ) : type === 'stream' ? (
                    <Play className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Hash className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#202225] text-gray-200 rounded px-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#5865F2]"
                  placeholder="new-channel"
                  maxLength={32}
                  required
                  autoFocus
                />
              </div>
            </div>

            {/* Channel Topic (optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                CHANNEL TOPIC (OPTIONAL)
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-[#202225] text-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5865F2]"
                placeholder="Set a topic for this channel"
                maxLength={1024}
              />
            </div>

            {/* Private Channel Toggle */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                className="w-4 h-4 rounded text-[#5865F2] focus:ring-[#5865F2] focus:ring-offset-0 bg-[#202225] border-gray-600"
              />
              <span className="text-gray-200 text-sm flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Private Channel
              </span>
            </label>

            {/* Voice/Video Settings */}
            {(type === 'hop' || type === 'leap') && (
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  USER LIMIT
                </label>
                <input
                  type="number"
                  value={userLimit || ''}
                  onChange={(e) => setUserLimit(e.target.value ? Number(e.target.value) : undefined)}
                  min="0"
                  max="99"
                  className="w-full bg-[#202225] text-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5865F2]"
                  placeholder="No limit"
                />
                <p className="text-xs text-gray-400 mt-1">
                  0 or empty for unlimited users
                </p>
              </div>
            )}

            {/* Slow Mode (Text Channels) */}
            {type === 'river' && (
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  SLOW MODE
                </label>
                <select
                  value={slowMode}
                  onChange={(e) => setSlowMode(Number(e.target.value))}
                  className="w-full bg-[#202225] text-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5865F2]"
                >
                  <option value="0">Off</option>
                  <option value="5">5 seconds</option>
                  <option value="10">10 seconds</option>
                  <option value="30">30 seconds</option>
                  <option value="60">1 minute</option>
                  <option value="300">5 minutes</option>
                  <option value="3600">1 hour</option>
                </select>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-200 hover:underline focus:outline-none focus:ring-2 focus:ring-[#5865F2] rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#5865F2] text-white px-4 py-2 rounded hover:bg-[#4752C4] focus:outline-none focus:ring-2 focus:ring-[#5865F2] focus:ring-offset-2 focus:ring-offset-[#36393f] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!name.trim()}
            >
              Create Channel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};