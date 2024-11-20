import React from 'react';
import { useStore } from '../store/useStore';
import { MessageSquare, Video, Phone, User } from 'lucide-react';

export const DirectMessages: React.FC = () => {
  const { users, currentUser } = useStore();
  const [selectedUser, setSelectedUser] = React.useState<string | null>(null);

  // Filter out current user and sort by online status
  const sortedUsers = users
    .filter(user => user.id !== currentUser?.id)
    .sort((a, b) => {
      if (a.isOnline === b.isOnline) return 0;
      return a.isOnline ? -1 : 1;
    });

  return (
    <div className="w-60 bg-[#2f3136] flex flex-col h-screen">
      {/* Search Bar */}
      <div className="p-2">
        <input
          type="text"
          placeholder="Find or start a conversation"
          className="w-full bg-[#202225] text-gray-200 rounded px-2 py-1 text-sm"
        />
      </div>

      {/* Message Requests */}
      <button className="flex items-center gap-2 px-2 py-1 mx-2 rounded hover:bg-[#36393f] text-gray-300">
        <MessageSquare className="w-4 h-4" />
        <span className="text-sm">Message Requests</span>
        <span className="ml-auto bg-red-500 text-white text-xs px-1 rounded">1</span>
      </button>

      <div className="border-t border-[#202225] my-2" />

      {/* Direct Messages */}
      <div className="flex-1 overflow-y-auto">
        <h3 className="px-4 text-xs font-semibold text-gray-400 mb-2">
          DIRECT MESSAGES
        </h3>
        <div className="space-y-0.5">
          {sortedUsers.map(user => (
            <button
              key={user.id}
              onClick={() => setSelectedUser(user.id)}
              className={`w-full flex items-center gap-3 px-2 py-1 mx-2 rounded ${
                selectedUser === user.id
                  ? 'bg-[#36393f] text-white'
                  : 'text-gray-300 hover:bg-[#36393f]'
              }`}
            >
              <div className="relative">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 bg-[#5865F2] rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">
                      {user.name[0].toUpperCase()}
                    </span>
                  </div>
                )}
                <div
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#2f3136] ${
                    user.isOnline ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                />
              </div>
              <span className="text-sm">{user.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected User Profile */}
      {selectedUser && (
        <div className="absolute top-0 right-0 w-80 bg-[#2f3136] h-screen p-4">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4">
              {users.find(u => u.id === selectedUser)?.avatarUrl ? (
                <img
                  src={users.find(u => u.id === selectedUser)?.avatarUrl}
                  alt=""
                  className="w-full h-full rounded-full"
                />
              ) : (
                <div className="w-full h-full bg-[#5865F2] rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
              )}
            </div>
            <h3 className="text-xl font-bold text-white mb-1">
              {users.find(u => u.id === selectedUser)?.name}
            </h3>
            <p className="text-gray-400 text-sm">Online</p>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button className="p-2 rounded-full bg-[#5865F2] text-white hover:bg-[#4752C4]">
              <MessageSquare className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full bg-[#5865F2] text-white hover:bg-[#4752C4]">
              <Video className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full bg-[#5865F2] text-white hover:bg-[#4752C4]">
              <Phone className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-6">
            <h4 className="text-xs font-semibold text-gray-400 mb-2">
              MUTUAL SERVERS
            </h4>
            <div className="space-y-2">
              {/* Add mutual servers here */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};