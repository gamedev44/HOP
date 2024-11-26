import React from 'react';
import { useStore } from '../store/useStore';
import type { User } from '../types';

export const UserList: React.FC = () => {
  const { users, activeTab } = useStore();
  const onlineUsers = users.filter(u => u.isOnline);
  const offlineUsers = users.filter(u => !u.isOnline);

  const getUserStatusColor = (user: User) => {
    if (!user.isOnline) return 'bg-gray-500';
    switch (user.status) {
      case 'online': return 'bg-green-500';
      case 'idle': return 'bg-yellow-500';
      case 'dnd': return 'bg-red-500';
      case 'invisible': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  if (activeTab === 'settings') {
    return (
      <div className="w-60 bg-[#2f3136] p-4">
        <h3 className="text-gray-400 uppercase text-xs font-semibold mb-4">Settings</h3>
        <div className="space-y-2">
          <button className="w-full text-left text-gray-300 hover:bg-[#36393f] p-2 rounded">
            User Profile
          </button>
          <button className="w-full text-left text-gray-300 hover:bg-[#36393f] p-2 rounded">
            Privacy & Safety
          </button>
          <button className="w-full text-left text-gray-300 hover:bg-[#36393f] p-2 rounded">
            Appearance
          </button>
          <button className="w-full text-left text-gray-300 hover:bg-[#36393f] p-2 rounded">
            Notifications
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-60 bg-[#2f3136] flex flex-col h-screen">
      <div className="p-4 flex-1 overflow-hidden">
        <div className="h-full flex flex-col overflow-hidden">
          {/* Online Users */}
          <h3 className="text-gray-400 uppercase text-xs font-semibold mb-2">
            Online — {onlineUsers.length}
          </h3>
          <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-[#202225] scrollbar-track-transparent mb-4">
            {onlineUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center space-x-3 p-2 rounded hover:bg-[#36393f] cursor-pointer"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-8 h-8 bg-[#5865F2] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user.name[0].toUpperCase()}
                    </span>
                  </div>
                  <div className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-[#2f3136] ${getUserStatusColor(user)}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium truncate">{user.name}</div>
                  <div className="text-gray-400 text-xs truncate">
                    {user.customStatus || (user.status === 'dnd' ? 'Do Not Disturb' : user.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Offline Users */}
          <h3 className="text-gray-400 uppercase text-xs font-semibold mb-2">
            Offline — {offlineUsers.length}
          </h3>
          <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-[#202225] scrollbar-track-transparent">
            {offlineUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center space-x-3 p-2 rounded hover:bg-[#36393f] cursor-pointer opacity-60"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-8 h-8 bg-[#36393f] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user.name[0].toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium truncate">{user.name}</div>
                  <div className="text-gray-400 text-xs truncate">Offline</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};