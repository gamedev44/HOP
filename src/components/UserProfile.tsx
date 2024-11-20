import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Circle, User, Settings, LogOut } from 'lucide-react';
import type { UserStatus } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfile: React.FC<Props> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [customStatus, setCustomStatus] = useState('');

  if (!isOpen || !user) return null;

  const statusOptions = [
    { id: 'online', label: 'Online', color: 'bg-green-500' },
    { id: 'idle', label: 'Idle', color: 'bg-yellow-500' },
    { id: 'dnd', label: 'Do Not Disturb', color: 'bg-red-500' },
    { id: 'invisible', label: 'Invisible', color: 'bg-gray-500' }
  ];

  const handleStatusChange = (newStatus: UserStatus) => {
    // Update status logic here
    setShowStatusMenu(false);
  };

  return (
    <div className="absolute bottom-16 left-2 w-80 bg-[#18191c] rounded-lg shadow-xl z-50">
      <div className="p-4 bg-[#2f3136] rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="relative">
            {user.imageUrl ? (
              <img
                src={user.imageUrl}
                alt={user.fullName || user.username || ''}
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <div className="w-12 h-12 bg-[#5865F2] rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
            )}
            <button
              onClick={() => setShowStatusMenu(!showStatusMenu)}
              className="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-[#18191c] bg-green-500 cursor-pointer"
            />
          </div>
          <div>
            <h3 className="font-semibold text-white">{user.fullName || user.username}</h3>
            <p className="text-sm text-gray-400">#{user.id.slice(0, 4)}</p>
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="mt-4">
          <input
            type="text"
            value={customStatus}
            onChange={(e) => setCustomStatus(e.target.value)}
            placeholder="Set a custom status"
            className="w-full bg-[#40444b] text-gray-200 rounded px-3 py-2 text-sm"
          />
        </form>
      </div>

      {showStatusMenu && (
        <div className="absolute bottom-full left-0 mb-2 w-48 bg-[#18191c] rounded-lg shadow-xl p-2">
          {statusOptions.map(option => (
            <button
              key={option.id}
              onClick={() => handleStatusChange(option.id as UserStatus)}
              className="w-full flex items-center gap-3 px-2 py-1.5 rounded hover:bg-[#36393f] text-sm text-gray-300"
            >
              <Circle className={`w-3 h-3 ${option.color}`} />
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}

      <div className="p-2 space-y-1">
        <button
          onClick={() => useStore.getState().setActiveTab('settings')}
          className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-[#36393f] text-sm text-gray-300"
        >
          <Settings className="w-4 h-4" />
          User Settings
        </button>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-[#36393f] text-sm text-red-400"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
      </div>
    </div>
  );
};