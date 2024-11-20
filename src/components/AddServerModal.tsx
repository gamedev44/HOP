import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Plus, Download, Compass, Link, Upload } from 'lucide-react';
import type { Server, ServerTier } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AddServerModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'main' | 'create' | 'join' | 'explore'>('main');
  const [serverName, setServerName] = useState('');
  const [serverIcon, setServerIcon] = useState<string | null>(null);
  const [inviteUrl, setInviteUrl] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<ServerTier>('lilypad');
  const { addServer, joinServer } = useStore();

  if (!isOpen) return null;

  const templates = [
    {
      id: 'lilypad',
      name: 'Lilypad',
      description: 'Basic server for friends',
      icon: '🌿'
    },
    {
      id: 'pond',
      name: 'Pond',
      description: 'Serverless Hosted Cloud App with Hop+',
      icon: '💧'
    },
    {
      id: 'lake',
      name: 'Lake',
      description: 'Serverless Hosted Cloud App with Leap+',
      icon: '🌊'
    },
    {
      id: 'lagoon',
      name: 'Lagoon',
      description: 'Large-scale server (300-5000 users)',
      icon: '🏊'
    },
    {
      id: 'swamp',
      name: 'Swamp',
      description: 'Community and family-friendly server',
      icon: '🌿'
    }
  ];

  const handleIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setServerIcon(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateServer = () => {
    if (!serverName.trim()) return;

    const newServer: Server = {
      id: Math.random().toString(36).substring(2),
      name: serverName,
      iconUrl: serverIcon || undefined,
      tier: selectedTemplate as ServerTier,
      ownerId: useStore.getState().currentUser?.id || '',
      categories: [
        {
          id: Math.random().toString(36).substring(2),
          name: 'TEXT CHANNELS',
          serverId: '',
          isPrivate: false,
          channels: []
        },
        {
          id: Math.random().toString(36).substring(2),
          name: 'VOICE CHANNELS',
          serverId: '',
          isPrivate: false,
          channels: []
        }
      ],
      channels: [
        {
          id: Math.random().toString(36).substring(2),
          name: 'general',
          type: 'river',
          serverId: '',
          categoryId: '',
          isPrivate: false,
          topic: 'General discussion'
        },
        {
          id: Math.random().toString(36).substring(2),
          name: 'voice',
          type: 'hop',
          serverId: '',
          categoryId: '',
          isPrivate: false
        }
      ],
      members: useStore.getState().users,
      roles: [],
      emojis: [],
      boosts: 0,
      features: []
    };

    addServer(newServer);
    handleClose();
  };

  const handleJoinServer = () => {
    if (!inviteUrl.trim()) return;
    
    const serverId = inviteUrl.split('/').pop();
    if (serverId) {
      joinServer(serverId);
      handleClose();
    }
  };

  const handleClose = () => {
    setStep('main');
    setServerName('');
    setServerIcon(null);
    setInviteUrl('');
    setSelectedTemplate('lilypad');
    onClose();
  };

  const renderStep = () => {
    switch (step) {
      case 'create':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-center text-white mb-2">
              Create Your Server
            </h3>
            <p className="text-gray-400 text-center text-sm">
              Your server is where you and your friends hang out. Make yours and start talking.
            </p>

            <div className="flex justify-center">
              <div className="relative group">
                <div className="w-24 h-24 bg-[#40444b] rounded-full overflow-hidden flex items-center justify-center cursor-pointer">
                  {serverIcon ? (
                    <img src={serverIcon} alt="Server icon" className="w-full h-full object-cover" />
                  ) : (
                    <Upload className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors" />
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleIconUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                SERVER NAME
              </label>
              <input
                type="text"
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
                className="w-full bg-[#40444b] text-white rounded px-3 py-2"
                placeholder="Enter server name"
                maxLength={100}
                required
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-200">
                CHOOSE A TEMPLATE
              </label>
              <div className="grid gap-2">
                {templates.map(template => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id as ServerTier)}
                    className={`flex items-center gap-3 p-3 rounded ${
                      selectedTemplate === template.id
                        ? 'bg-[#5865F2] text-white'
                        : 'bg-[#40444b] text-gray-300 hover:bg-[#36393f]'
                    }`}
                  >
                    <span className="text-2xl">{template.icon}</span>
                    <div className="text-left">
                      <div className="font-medium">{template.name}</div>
                      <div className="text-xs text-gray-400">{template.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'join':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-center text-white mb-2">
              Join a Server
            </h3>
            <p className="text-gray-400 text-center text-sm">
              Enter an invite link to join an existing server
            </p>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                INVITE LINK
              </label>
              <input
                type="text"
                value={inviteUrl}
                onChange={(e) => setInviteUrl(e.target.value)}
                className="w-full bg-[#40444b] text-white rounded px-3 py-2"
                placeholder="https://hop.chat/invite/..."
                required
              />
            </div>
          </div>
        );

      case 'explore':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-center text-white mb-2">
              Explore Public Servers
            </h3>
            <div className="grid gap-4">
              {/* This would be populated with featured/public servers */}
              <div className="text-center text-gray-400 py-8">
                No public servers available at the moment
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-center text-white mb-6">
              Create or Join a Server
            </h3>

            <button
              onClick={() => setStep('create')}
              className="w-full flex items-center gap-3 p-4 rounded bg-[#40444b] hover:bg-[#36393f] text-white"
            >
              <div className="w-8 h-8 bg-[#5865F2] rounded-full flex items-center justify-center">
                <Plus className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="font-medium">Create My Own</div>
                <div className="text-xs text-gray-400">Create a new server from scratch</div>
              </div>
            </button>

            <button
              onClick={() => setStep('join')}
              className="w-full flex items-center gap-3 p-4 rounded bg-[#40444b] hover:bg-[#36393f] text-white"
            >
              <div className="w-8 h-8 bg-[#3ba55c] rounded-full flex items-center justify-center">
                <Download className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="font-medium">Join a Server</div>
                <div className="text-xs text-gray-400">Enter an invite link to join</div>
              </div>
            </button>

            <button
              onClick={() => setStep('explore')}
              className="w-full flex items-center gap-3 p-4 rounded bg-[#40444b] hover:bg-[#36393f] text-white"
            >
              <div className="w-8 h-8 bg-[#9b59b6] rounded-full flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="font-medium">Explore Public Servers</div>
                <div className="text-xs text-gray-400">Browse featured communities</div>
              </div>
            </button>
          </div>
        );
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="bg-[#36393f] rounded-lg shadow-xl p-8 w-[480px]" onClick={e => e.stopPropagation()}>
        <div className="relative">
          {step !== 'main' && (
            <button
              onClick={() => setStep('main')}
              className="absolute -left-2 top-0 text-gray-400 hover:text-white"
            >
              ←
            </button>
          )}
          
          <button
            onClick={handleClose}
            className="absolute -right-2 top-0 text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="mt-6">
          {renderStep()}
        </div>

        {(step === 'create' || step === 'join') && (
          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={() => setStep('main')}
              className="px-4 py-2 text-gray-200 hover:underline"
            >
              Back
            </button>
            <button
              onClick={step === 'create' ? handleCreateServer : handleJoinServer}
              disabled={step === 'create' ? !serverName.trim() : !inviteUrl.trim()}
              className="bg-[#5865F2] text-white px-4 py-2 rounded hover:bg-[#4752C4] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === 'create' ? 'Create Server' : 'Join Server'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};