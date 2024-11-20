import React, { useState, useRef } from 'react';
import { useStore } from '../store/useStore';
import { Hash, Volume2, Lock, ChevronDown, Plus, Video } from 'lucide-react';
import { ServerDropdown } from './ServerDropdown';
import { AddChannelModal } from './AddChannelModal';
import { AddCategoryModal } from './AddCategoryModal';
import { useClickOutside } from '../hooks/useClickOutside';

export const NavSidebar: React.FC = () => {
  const { 
    activeTab,
    currentServer,
    setCurrentChannel
  } = useStore();
  
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [showServerDropdown, setShowServerDropdown] = useState(false);
  const [showAddChannelModal, setShowAddChannelModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    type: 'category' | 'channel';
    id?: string;
  } | null>(null);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  useClickOutside(contextMenuRef, () => setContextMenu(null));
  useClickOutside(sidebarRef, () => setShowServerDropdown(false));

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleContextMenu = (e: React.MouseEvent, type: 'category' | 'channel', id?: string) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      type,
      id
    });
  };

  const handleAddChannel = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setShowAddChannelModal(true);
    setContextMenu(null);
  };

  const handleAddCategory = () => {
    setShowAddCategoryModal(true);
    setContextMenu(null);
  };

  if (!currentServer || activeTab !== 'servers') return null;

  return (
    <div className="w-60 bg-[#2f3136] flex flex-col min-h-screen" ref={sidebarRef}>
      {/* Server Header */}
      <div className="relative">
        <div
          onClick={() => setShowServerDropdown(!showServerDropdown)}
          className="h-12 px-4 flex items-center justify-between border-b border-[#202225] hover:bg-[#34373c] cursor-pointer"
        >
          <h2 className="text-white font-semibold truncate">{currentServer.name}</h2>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
            showServerDropdown ? 'transform rotate-180' : ''
          }`} />
        </div>
        {showServerDropdown && (
          <ServerDropdown 
            isOpen={showServerDropdown} 
            onClose={() => setShowServerDropdown(false)} 
          />
        )}
      </div>

      {/* Channels */}
      <div 
        className="flex-1 overflow-y-auto pt-4 space-y-2"
        onContextMenu={(e) => handleContextMenu(e, 'category')}
      >
        {currentServer.categories.map(category => {
          const isExpanded = expandedCategories.includes(category.id);
          const channels = currentServer.channels.filter(ch => ch.categoryId === category.id);
          
          return (
            <div key={category.id} className="px-2">
              {/* Category Header */}
              <div className="flex items-center group">
                <div
                  onClick={() => toggleCategory(category.id)}
                  className="flex-1 flex items-center gap-1 text-xs font-semibold text-gray-400 hover:text-gray-300 uppercase px-1 mb-1 cursor-pointer"
                >
                  <ChevronDown className={`w-3 h-3 transform transition-transform ${
                    isExpanded ? '' : '-rotate-90'
                  }`} />
                  {category.name}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddChannel(category.id);
                  }}
                  className="w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-200"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              {/* Category Channels */}
              {isExpanded && (
                <div className="space-y-0.5">
                  {channels.map(channel => {
                    const Icon = channel.type === 'hop' ? Volume2 : 
                              channel.type === 'leap' ? Video :
                              channel.type === 'burrow' ? Lock : Hash;
                    
                    return (
                      <div
                        key={channel.id}
                        onClick={() => setCurrentChannel(channel)}
                        onContextMenu={(e) => handleContextMenu(e, 'channel', channel.id)}
                        className="w-full flex items-center gap-2 text-gray-400 hover:text-gray-200 hover:bg-[#34373c] px-2 py-1 rounded group cursor-pointer"
                      >
                        <Icon className="w-4 h-4 text-gray-400 group-hover:text-gray-300" />
                        <span className="truncate">{channel.name}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div
          ref={contextMenuRef}
          className="fixed bg-[#18191c] rounded-lg shadow-xl text-gray-200 z-50 py-1 w-48"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          {contextMenu.type === 'category' ? (
            <>
              <button
                onClick={handleAddCategory}
                className="w-full px-2 py-1 hover:bg-[#36393f] text-sm text-left"
              >
                Create Category
              </button>
              <button
                onClick={() => handleAddChannel(contextMenu.id || '')}
                className="w-full px-2 py-1 hover:bg-[#36393f] text-sm text-left"
              >
                Create Channel
              </button>
            </>
          ) : (
            <>
              <button
                className="w-full px-2 py-1 hover:bg-[#36393f] text-sm text-left"
              >
                Edit Channel
              </button>
              <button
                className="w-full px-2 py-1 hover:bg-[#36393f] text-sm text-left text-red-400"
              >
                Delete Channel
              </button>
            </>
          )}
        </div>
      )}

      {/* Modals */}
      {showAddChannelModal && (
        <AddChannelModal
          categoryId={selectedCategoryId}
          isOpen={showAddChannelModal}
          onClose={() => setShowAddChannelModal(false)}
        />
      )}
      
      {showAddCategoryModal && (
        <AddCategoryModal
          isOpen={showAddCategoryModal}
          onClose={() => setShowAddCategoryModal(false)}
        />
      )}
    </div>
  );
};