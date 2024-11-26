import React from 'react';
import { useStore } from '../store/useStore';
import { MessageSquare, Video, Phone, Search, Settings, Users, Gift, Inbox, Help } from 'lucide-react';

export const DirectMessages: React.FC = () => {
  const { users, currentUser } = useStore();
  const [selectedUser, setSelectedUser] = React.useState<string | null>(null);

  // Filter out current user and sort by online status and recent messages
  const sortedUsers = users
    .filter(user => user.id !== currentUser?.id)
    .sort((a, b) => {
      if (a.isOnline === b.isOnline) {
        // Sort by last message time if available
        const aLastMessage = a.lastMessage?.timestamp || 0;
        const bLastMessage = b.lastMessage?.timestamp || 0;
        return bLastMessage - aLastMessage;
      }
      return a.isOnline ? -1 : 1;
    });

  return (
    <div className="w-60 bg-[#2f3136] flex flex-col h-screen">
      {/* Top Navigation */}
      <div className="h-12 border-b border-[#202225] flex items-center px-4">
        <input
          type="text"
          placeholder="Find or start a conversation"
          className="w-full bg-[#202225] text-gray-200 rounded px-2 py-1 text-sm"
        />
      </div>

      {/* Quick Actions */}
      <div className="p-2 space-y-0.5">
        <button className="w-full flex items-center gap-3 px-2 py-2 rounded hover:bg-[#36393f] text-gray-300">
          <Users className="w-4 h-4" />
          <span className="text-sm">Friends</span>
        </button>
        <button className="w-full flex items-center gap-3 px-2 py-2 rounded hover:bg-[#36393f] text-gray-300">
          <Inbox className="w-4 h-4" />
          <span className="text-sm">Inbox</span>
        </button>
        <button className="w-full flex items-center gap-3 px-2 py-2 rounded hover:bg-[#36393f] text-gray-300">
          <Gift className="w-4 h-4" />
          <span className="text-sm">Leap+</span>
        </button>
      </div>

      {/* Direct Messages */}
      <div className="flex-1 overflow-y-auto px-2 mt-4">
        <div className="flex items-center justify-between px-2 mb-2">
          <h3 className="text-xs font-semibold text-gray-400">DIRECT MESSAGES</h3>
          <button className="text-gray-400 hover:text-gray-200">
            <MessageSquare className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-0.5">
          {sortedUsers.map(user => (
            <button
              key={user.id}
              onClick={() => setSelectedUser(user.id)}
              className={`w-full flex items-center gap-3 px-2 py-2 rounded ${
                selectedUser === user.id
                  ? 'bg-[#36393f] text-white'
                  : 'text-gray-300 hover:bg-[#36393f]'
              }`}
            >
              <div className="relative flex-shrink-0">
                <div className="w-8 h-8 bg-[#5865F2] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.name[0].toUpperCase()}
                  </span>
                </div>
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#2f3136] ${
                  user.isOnline ? 'bg-green-500' : 'bg-gray-500'
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium truncate">
                    {user.name}
                  </span>
                  {user.lastMessage && (
                    <span className="text-xs text-gray-400">
                      {new Date(user.lastMessage.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  )}
                </div>
                {user.lastMessage && (
                  <p className="text-xs text-gray-400 truncate">
                    {user.lastMessage.content}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* User Profile */}
      <div className="mt-auto p-2 bg-[#292b2f]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-8 h-8 bg-[#5865F2] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {currentUser?.name[0].toUpperCase()}
                </span>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#292b2f] bg-green-500" />
            </div>
            <div className="text-sm">
              <div className="text-white font-medium">{currentUser?.name}</div>
              <div className="text-gray-400 text-xs">Online</div>
            </div>
          </div>
          <div className="flex gap-1">
            <button className="p-2 rounded hover:bg-[#36393f] text-gray-400 hover:text-white">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};