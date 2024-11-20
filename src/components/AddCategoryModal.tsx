import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Lock } from 'lucide-react';
import type { Category } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AddCategoryModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { currentServer, addCategory } = useStore();
  const [name, setName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  if (!isOpen || !currentServer) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return;

    const newCategory: Category = {
      id: Math.random().toString(36).substring(2),
      name: name.toUpperCase(),
      serverId: currentServer.id,
      isPrivate,
      channels: []
    };

    addCategory(newCategory);
    setName('');
    setIsPrivate(false);
    onClose();
  };

  const handleClose = () => {
    setName('');
    setIsPrivate(false);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="bg-[#36393f] rounded-lg shadow-xl p-4 w-[440px]" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-200">
            Create Category
          </h3>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                CATEGORY NAME
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#202225] text-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5865F2]"
                placeholder="New Category"
                maxLength={32}
                required
                autoFocus
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                className="w-4 h-4 rounded text-[#5865F2] focus:ring-[#5865F2] focus:ring-offset-0 bg-[#202225] border-gray-600"
              />
              <span className="text-gray-200 text-sm flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Private Category
              </span>
            </label>

            {isPrivate && (
              <p className="text-xs text-gray-400">
                Only selected members will be able to view this category and its channels
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-200 hover:underline focus:outline-none focus:ring-2 focus:ring-[#5865F2] rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#5865F2] text-white px-4 py-2 rounded hover:bg-[#4752C4] focus:outline-none focus:ring-2 focus:ring-[#5865F2] focus:ring-offset-2 focus:ring-offset-[#36393f] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!name.trim()}
            >
              Create Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};