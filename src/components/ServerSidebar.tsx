import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Plus, Compass } from 'lucide-react';
import { AddServerModal } from './AddServerModal';
import type { Server } from '../types';

export const ServerSidebar: React.FC = () => {
  const { servers, currentServer, setCurrentServer, activeTab, setActiveTab } = useStore();
  const [showAddServerModal, setShowAddServerModal] = useState(false);

  const handleHomeClick = () => {
    if (activeTab === 'home') {
      setActiveTab('servers'); // Toggle off
    } else {
      setActiveTab('home');
    }
  };

  const handleServerClick = (server: Server) => {
    if (currentServer?.id === server.id && activeTab === 'servers') {
      setActiveTab('home'); // Toggle off
    } else {
      setCurrentServer(server);
      setActiveTab('servers');
    }
  };

  return (
    <div className="w-[72px] bg-[#202225] h-screen flex flex-col items-center pt-3">
      {/* Home Button */}
      <button 
        onClick={handleHomeClick}
        className={`w-12 h-12 rounded-full flex items-center justify-center hover:rounded-[16px] transition-all duration-300 group relative mb-2 ${
          activeTab === 'home' ? 'bg-[#5865F2]' : 'bg-[#36393f]'
        }`}
      >
        <img 
          src="https://gcdnb.pbrd.co/images/ftjHeVLGHIjk.png?o=1" 
          alt="HØP"
          className="w-7 h-7"
        />
        <div className="pointer-events-none absolute left-[68px] opacity-0 group-hover:opacity-100 transition-all duration-200 z-[60]">
          <div className="bg-[#18191c] text-white text-sm px-2.5 py-1 rounded-md whitespace-nowrap">
            Home
          </div>
          <div className="absolute top-[50%] -left-[4px] -mt-[5px] border-y-[5px] border-y-transparent border-r-[5px] border-r-[#18191c]" />
        </div>
      </button>

      <div className="w-8 h-[2px] bg-[#36393f] rounded-full mx-auto mb-2" />

      {/* Server List */}
      <div className="flex-1 w-full overflow-y-auto px-2 space-y-2 scrollbar-none hover:scrollbar-thin hover:scrollbar-thumb-[#202225] hover:scrollbar-track-transparent">
        {servers.map(server => (
          <button
            key={server.id}
            onClick={() => handleServerClick(server)}
            className={`w-12 h-12 rounded-full flex items-center justify-center hover:rounded-[16px] transition-all duration-300 group relative overflow-hidden ${
              currentServer?.id === server.id && activeTab === 'servers'
                ? 'bg-[#5865F2]'
                : 'bg-[#36393f] hover:bg-[#5865F2]'
            }`}
          >
            {server.iconUrl ? (
              <img 
                src={server.iconUrl} 
                alt={server.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white text-lg font-semibold">
                {server.name.charAt(0).toUpperCase()}
              </span>
            )}
            <div className="pointer-events-none absolute left-[68px] opacity-0 group-hover:opacity-100 transition-all duration-200 z-[60]">
              <div className="bg-[#18191c] text-white text-sm px-2.5 py-1 rounded-md whitespace-nowrap">
                {server.name}
              </div>
              <div className="absolute top-[50%] -left-[4px] -mt-[5px] border-y-[5px] border-y-transparent border-r-[5px] border-r-[#18191c]" />
            </div>
          </button>
        ))}
      </div>

      {/* Add/Explore Server Buttons */}
      <div className="px-2 pb-3 space-y-2 mt-2">
        <button
          onClick={() => setShowAddServerModal(true)}
          className="w-12 h-12 rounded-full flex items-center justify-center bg-[#36393f] hover:bg-[#3ba55c] hover:rounded-[16px] transition-all duration-300 group relative"
        >
          <Plus className="w-6 h-6 text-[#3ba55c] group-hover:text-white transition-colors" />
          <div className="pointer-events-none absolute left-[68px] opacity-0 group-hover:opacity-100 transition-all duration-200 z-[60]">
            <div className="bg-[#18191c] text-white text-sm px-2.5 py-1 rounded-md whitespace-nowrap">
              Add a Server
            </div>
            <div className="absolute top-[50%] -left-[4px] -mt-[5px] border-y-[5px] border-y-transparent border-r-[5px] border-r-[#18191c]" />
          </div>
        </button>

        <button
          onClick={() => setShowAddServerModal(true)}
          className="w-12 h-12 rounded-full flex items-center justify-center bg-[#36393f] hover:bg-[#3ba55c] hover:rounded-[16px] transition-all duration-300 group relative"
        >
          <Compass className="w-6 h-6 text-[#3ba55c] group-hover:text-white transition-colors" />
          <div className="pointer-events-none absolute left-[68px] opacity-0 group-hover:opacity-100 transition-all duration-200 z-[60]">
            <div className="bg-[#18191c] text-white text-sm px-2.5 py-1 rounded-md whitespace-nowrap">
              Explore Servers
            </div>
            <div className="absolute top-[50%] -left-[4px] -mt-[5px] border-y-[5px] border-y-transparent border-r-[5px] border-r-[#18191c]" />
          </div>
        </button>
      </div>

      {/* Add Server Modal */}
      {showAddServerModal && (
        <AddServerModal
          isOpen={showAddServerModal}
          onClose={() => setShowAddServerModal(false)}
        />
      )}
    </div>
  );
};