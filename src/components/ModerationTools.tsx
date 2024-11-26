import React from 'react';
import { Shield, AlertTriangle, UserX, Ban } from 'lucide-react';
import { useStore } from '../store/useStore';

export const ModerationTools: React.FC = () => {
  const { currentServer } = useStore();

  const handleBanUser = (userId: string) => {
    // Implement ban logic
  };

  const handleKickUser = (userId: string) => {
    // Implement kick logic
  };

  const handleMuteUser = (userId: string, duration: number) => {
    // Implement mute logic
  };

  const handleDeleteMessage = (messageId: string) => {
    // Implement message deletion
  };

  return (
    <div className="w-60 bg-[#2f3136] p-4">
      <h3 className="text-gray-400 uppercase text-xs font-semibold mb-4">
        Moderation Tools
      </h3>

      <div className="space-y-4">
        <div>
          <h4 className="text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Quick Actions
          </h4>
          <div className="space-y-2">
            <button className="w-full text-left text-gray-300 hover:bg-[#36393f] p-2 rounded flex items-center gap-2">
              <UserX className="w-4 h-4" />
              Kick User
            </button>
            <button className="w-full text-left text-gray-300 hover:bg-[#36393f] p-2 rounded flex items-center gap-2">
              <Ban className="w-4 h-4" />
              Ban User
            </button>
            <button className="w-full text-left text-gray-300 hover:bg-[#36393f] p-2 rounded flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Report Raid
            </button>
          </div>
        </div>

        <div>
          <h4 className="text-gray-300 text-sm font-medium mb-2">
            Server Settings
          </h4>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="form-checkbox text-[#5865F2]"
              />
              <span className="text-sm text-gray-300">Slow Mode</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="form-checkbox text-[#5865F2]"
              />
              <span className="text-sm text-gray-300">Members-only Mode</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="form-checkbox text-[#5865F2]"
              />
              <span className="text-sm text-gray-300">Anti-spam</span>
            </label>
          </div>
        </div>

        <div>
          <h4 className="text-gray-300 text-sm font-medium mb-2">
            Verification Level
          </h4>
          <select className="w-full bg-[#40444b] text-gray-300 rounded px-2 py-1">
            <option value="none">None</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="highest">Highest</option>
          </select>
        </div>
      </div>
    </div>
  );
};