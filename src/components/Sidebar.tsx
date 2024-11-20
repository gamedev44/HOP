import React from 'react';
import { useStore } from '../store/useStore';
import { ServerNavigation } from './ServerNavigation';
import { MessageSquare, Users, Settings } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab } = useStore();

  return (
    <div className="w-60 flex flex-col bg-[#2f3136] h-screen">
      {activeTab === 'servers' ? (
        <ServerNavigation />
      ) : (
        <div className="flex-1 p-4">
          {activeTab === 'messages' && (
            <div className="space-y-2">
              <h2 className="text-gray-200 font-semibold mb-4">Direct Messages</h2>
              {/* DM list would go here */}
            </div>
          )}
          {activeTab === 'friends' && (
            <div className="space-y-2">
              <h2 className="text-gray-200 font-semibold mb-4">Friends</h2>
              {/* Friends list would go here */}
            </div>
          )}
        </div>
      )}

      <div className="mt-auto p-2 border-t border-[#202225]">
        <div className="flex justify-around">
          <button
            onClick={() => setActiveTab('messages')}
            className={`p-2 rounded-lg ${
              activeTab === 'messages' ? 'bg-[#36393f] text-white' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveTab('friends')}
            className={`p-2 rounded-lg ${
              activeTab === 'friends' ? 'bg-[#36393f] text-white' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Users className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`p-2 rounded-lg ${
              activeTab === 'settings' ? 'bg-[#36393f] text-white' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};