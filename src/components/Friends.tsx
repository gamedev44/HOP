import React from 'react';
import { useStore } from '../store/useStore';
import { UserPlus, User, MessageSquare, Video, Phone } from 'lucide-react';

export const Friends: React.FC = () => {
  const { users, currentUser, friendsTab, setFriendsTab } = useStore();
  const [selectedFriend, setSelectedFriend] = React.useState<string | null>(null);

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'pending', label: 'Pending', count: 2 },
    { id: 'blocked', label: 'Blocked', count: 1 },
    { id: 'add', label: 'Add Friend' }
  ];

  // Filter out current user
  const friends = users.filter(user => user.id !== currentUser?.id);

  return (
    <div className="flex-1 flex">
      <div className="flex-1 bg-[#36393f]">
        {/* Tabs */}
        <div className="h-12 px-4 flex items-center border-b border-[#202225]">
          <div className="flex gap-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setFriendsTab(tab.id as any)}
                className={`relative px-3 py-1 rounded ${
                  friendsTab === tab.id
                    ? 'bg-[#5865F2] text-white'
                    : 'text-gray-300 hover:bg-[#40444b]'
                }`}
              >
                {tab.label}
                {tab.count && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Friend List */}
        <div className="p-4">
          {friendsTab === 'add' ? (
            <div className="text-center py-8">
              <h3 className="text-xl font-bold text-gray-200 mb-2">
                ADD FRIEND
              </h3>
              <p className="text-gray-400 mb-4">
                You can add friends with their HØP username.
              </p>
              <div className="max-w-xl mx-auto">
                <input
                  type="text"
                  placeholder="Enter a Username#0000"
                  className="w-full bg-[#40444b] text-gray-200 rounded px-3 py-2"
                />
                <button className="mt-4 bg-[#5865F2] text-white px-4 py-2 rounded hover:bg-[#4752C4]">
                  Send Friend Request
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {friends.map(friend => (
                <div
                  key={friend.id}
                  onClick={() => setSelectedFriend(friend.id)}
                  className={`flex items-center justify-between p-2 rounded ${
                    selectedFriend === friend.id
                      ? 'bg-[#40444b]'
                      : 'hover:bg-[#40444b]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {friend.avatarUrl ? (
                        <img
                          src={friend.avatarUrl}
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-[#5865F2] rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">
                            {friend.name[0].toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#36393f] ${
                          friend.isOnline ? 'bg-green-500' : 'bg-gray-500'
                        }`}
                      />
                    </div>
                    <div>
                      <div className="text-gray-200 font-medium">
                        {friend.name}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {friend.isOnline ? 'Online' : 'Offline'}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-full hover:bg-[#2f3136]">
                      <MessageSquare className="w-5 h-5 text-gray-300" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-[#2f3136]">
                      <Video className="w-5 h-5 text-gray-300" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-[#2f3136]">
                      <Phone className="w-5 h-5 text-gray-300" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Friend Profile */}
      {selectedFriend && (
        <div className="w-80 bg-[#2f3136] p-4">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4">
              {users.find(u => u.id === selectedFriend)?.avatarUrl ? (
                <img
                  src={users.find(u => u.id === selectedFriend)?.avatarUrl}
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
              {users.find(u => u.id === selectedFriend)?.name}
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