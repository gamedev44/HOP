import React from 'react';
import { useStore } from '../store/useStore';
import { 
  Rocket, 
  Users, 
  Settings, 
  BarChart, 
  Plus, 
  Bell, 
  Lock,
  Edit,
  Eye,
  Shield,
  AlertTriangle
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ServerDropdown: React.FC<Props> = ({ isOpen, onClose }) => {
  const { currentServer, addServerBoost } = useStore();

  if (!isOpen || !currentServer) return null;

  const handleServerBoost = () => {
    addServerBoost();
    onClose();
  };

  const handleInvitePeople = () => {
    const inviteLink = `${window.location.origin}/invite/${currentServer.id}`;
    navigator.clipboard.writeText(inviteLink);
    alert('Invite link copied to clipboard!');
    onClose();
  };

  const menuItems = [
    { 
      label: 'Server Boost', 
      icon: Rocket, 
      onClick: handleServerBoost,
      className: 'text-[#ff73fa]'
    },
    { 
      label: 'Invite People', 
      icon: Users, 
      onClick: handleInvitePeople,
      className: 'text-[#3ba55c]'
    },
    { type: 'separator' },
    { 
      label: 'Server Settings', 
      icon: Settings, 
      onClick: () => useStore.getState().setActiveTab('server-settings')
    },
    { 
      label: 'Server Insights', 
      icon: BarChart
    },
    { type: 'separator' },
    { 
      label: 'Create Channel', 
      icon: Plus
    },
    { 
      label: 'Create Category', 
      icon: Plus
    },
    { type: 'separator' },
    { 
      label: 'Notification Settings', 
      icon: Bell
    },
    { 
      label: 'Privacy Settings', 
      icon: Lock
    },
    { type: 'separator' },
    { 
      label: 'Edit Server Profile', 
      icon: Edit
    },
    { 
      label: 'Hide Muted Channels', 
      icon: Eye
    },
    { type: 'separator' },
    { 
      label: 'Security Actions', 
      icon: Shield,
      className: 'text-red-500'
    },
    { 
      label: 'Report Raid', 
      icon: AlertTriangle,
      className: 'text-red-500'
    }
  ];

  return (
    <div className="absolute top-full left-0 w-56 bg-[#18191c] rounded-lg shadow-xl z-50 py-2">
      {menuItems.map((item, index) => (
        item.type === 'separator' ? (
          <div key={index} className="my-1 border-t border-[#2f3136]" />
        ) : (
          <button
            key={index}
            onClick={item.onClick}
            className={`w-full flex items-center gap-3 px-3 py-2 hover:bg-[#4752C4] text-sm ${
              item.className || 'text-gray-300'
            }`}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        )
      ))}
    </div>
  );
};