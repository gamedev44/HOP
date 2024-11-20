import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Upload, Trash2, Save, Plus, Settings, Hash, Volume2, Video } from 'lucide-react';
import type { Category, Channel } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ServerSettings: React.FC<Props> = ({ isOpen, onClose }) => {
  const { currentServer, addCategory, addChannel } = useStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newChannelName, setNewChannelName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (!isOpen || !currentServer) return null;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'roles', label: 'Roles' },
    { id: 'emoji', label: 'Emoji' },
    { id: 'stickers', label: 'Stickers' },
    { id: 'soundboard', label: 'Soundboard' },
    { id: 'widget', label: 'Widget' },
    { id: 'template', label: 'Server Template' },
    { id: 'invite', label: 'Custom Invite Link' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'directory', label: 'App Directory' },
    { id: 'safety', label: 'Safety Setup' },
    { id: 'audit', label: 'Audit Log' },
    { id: 'bans', label: 'Bans' },
    { id: 'insights', label: 'Server Insights' },
    { id: 'discovery', label: 'Discovery' },
    { id: 'monetization', label: 'Enable Monetization' },
    { id: 'members', label: 'Members' },
    { id: 'invites', label: 'Invites' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Server Icon */}
            <div className="flex items-start gap-4">
              <div className="w-24 h-24 bg-[#40444b] rounded-full overflow-hidden">
                {currentServer.iconUrl ? (
                  <img
                    src={currentServer.iconUrl}
                    alt="Server icon"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-200">
                    {currentServer.name[0].toUpperCase()}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <button className="flex items-center gap-2 bg-[#5865F2] text-white px-3 py-1.5 rounded hover:bg-[#4752C4]">
                  <Upload className="w-4 h-4" />
                  Upload Image
                </button>
                <p className="text-xs text-gray-400">
                  We recommend an image of at least 512x512 for the server
                </p>
              </div>
            </div>

            {/* Server Name */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                SERVER NAME
              </label>
              <input
                type="text"
                value={currentServer.name}
                className="w-full bg-[#40444b] text-gray-200 rounded px-3 py-2"
              />
            </div>

            {/* Categories and Channels */}
            <div>
              <h3 className="text-sm font-medium text-gray-200 mb-4">
                CATEGORIES AND CHANNELS
              </h3>
              
              {currentServer.categories.map((category) => (
                <div key={category.id} className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-gray-200 font-medium">{category.name}</h4>
                    <button className="text-red-400 hover:text-red-300 text-sm">
                      Delete
                    </button>
                  </div>
                  
                  <div className="pl-4 space-y-2">
                    {currentServer.channels
                      .filter(channel => channel.categoryId === category.id)
                      .map(channel => (
                        <div key={channel.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-gray-300">
                            {channel.type === 'hop' ? (
                              <Volume2 className="w-4 h-4" />
                            ) : channel.type === 'leap' ? (
                              <Video className="w-4 h-4" />
                            ) : (
                              <Hash className="w-4 h-4" />
                            )}
                            {channel.name}
                          </div>
                          <button className="text-red-400 hover:text-red-300 text-sm">
                            Delete
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              ))}

              {/* Add Category */}
              <div className="mt-4">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="flex items-center gap-2 text-[#5865F2] hover:text-[#4752C4]"
                >
                  <Plus className="w-4 h-4" />
                  Add Category
                </button>
              </div>
            </div>

            {/* Delete Server */}
            <div className="pt-6 border-t border-[#40444b]">
              <button className="flex items-center gap-2 text-red-400 hover:text-red-300">
                <Trash2 className="w-4 h-4" />
                Delete Server
              </button>
            </div>
          </div>
        );

      case 'roles':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-200">Roles</h3>
              <button className="flex items-center gap-2 bg-[#5865F2] text-white px-3 py-1.5 rounded hover:bg-[#4752C4]">
                <Plus className="w-4 h-4" />
                Create Role
              </button>
            </div>
            {/* Role list and management UI */}
          </div>
        );

      case 'emoji':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-200">Custom Emoji</h3>
              <button className="flex items-center gap-2 bg-[#5865F2] text-white px-3 py-1.5 rounded hover:bg-[#4752C4]">
                <Upload className="w-4 h-4" />
                Upload Emoji
              </button>
            </div>
            {/* Emoji grid and management UI */}
          </div>
        );

      // Add more cases for other tabs...

      default:
        return (
          <div className="flex items-center justify-center h-64 text-gray-400">
            This section is under construction
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#36393f] rounded-lg shadow-xl w-[800px] h-[600px] flex">
        {/* Settings Sidebar */}
        <div className="w-60 bg-[#2f3136] p-2 overflow-y-auto">
          <h2 className="px-3 py-2 text-gray-200 font-semibold uppercase text-xs">
            {currentServer.name}
          </h2>
          <div className="space-y-0.5">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-3 py-1.5 rounded text-sm ${
                  activeTab === tab.id
                    ? 'bg-[#5865F2] text-white'
                    : 'text-gray-300 hover:bg-[#36393f] hover:text-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-200">
              {tabs.find(tab => tab.id === activeTab)?.label}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};