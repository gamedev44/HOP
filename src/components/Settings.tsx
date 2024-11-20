import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Save, Upload, Search } from 'lucide-react';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { Grid } from '@giphy/react-components';

const gf = new GiphyFetch('your_giphy_api_key'); // Replace with your Giphy API key

export const Settings: React.FC = () => {
  const { currentSettingsPage, currentUser } = useStore();
  const [isDark, setIsDark] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [fontSize, setFontSize] = useState('medium');
  const [showGiphySearch, setShowGiphySearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('online');
  const [language, setLanguage] = useState('english');
  const [keybinds, setKeybinds] = useState({
    mute: 'M',
    deafen: 'D',
    settings: 'S'
  });

  const handleSave = () => {
    alert('Settings saved!');
  };

  const handleGiphySelect = (gif: any) => {
    // Here you would update the user's profile picture with the selected GIF
    setShowGiphySearch(false);
  };

  const renderContent = () => {
    switch (currentSettingsPage) {
      case 'user':
        return (
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-24 h-24 bg-[#40444b] rounded-full overflow-hidden">
                <img 
                  src={currentUser?.avatarUrl || 'https://via.placeholder.com/96'} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => setShowGiphySearch(true)}
                  className="flex items-center gap-2 bg-[#5865F2] text-white px-3 py-1.5 rounded-md hover:bg-[#4752C4] transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Change Avatar
                </button>
                <p className="text-xs text-gray-400">Supports GIF avatars from Giphy</p>
              </div>
            </div>

            {showGiphySearch && (
              <div className="mt-4 space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search GIFs..."
                    className="flex-1 bg-[#40444b] text-gray-200 rounded-md px-3 py-2"
                  />
                  <button className="p-2 bg-[#40444b] rounded-md">
                    <Search className="w-5 h-5 text-gray-200" />
                  </button>
                </div>
                <div className="h-64 overflow-y-auto">
                  <Grid
                    onGifClick={handleGiphySelect}
                    fetchGifs={(offset: number) => gf.search(searchQuery || 'random', { offset, limit: 10 })}
                    width={400}
                    columns={3}
                    gutter={6}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Username</label>
              <input
                type="text"
                value={currentUser?.name}
                disabled
                className="w-full bg-[#40444b] text-gray-200 rounded-md px-3 py-2"
              />
              <p className="text-xs text-gray-400 mt-1">Contact support to change username</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Status</label>
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-[#40444b] text-gray-200 rounded-md px-3 py-2"
              >
                <option value="online">Online</option>
                <option value="idle">Idle</option>
                <option value="dnd">Do Not Disturb</option>
                <option value="invisible">Invisible</option>
              </select>
            </div>
          </div>
        );

      case 'app':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Language</label>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-[#40444b] text-gray-200 rounded-md px-3 py-2"
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
                <option value="japanese">Japanese</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Keybinds</label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-200">Mute</span>
                  <input
                    type="text"
                    value={keybinds.mute}
                    onChange={(e) => setKeybinds({ ...keybinds, mute: e.target.value })}
                    className="w-20 bg-[#40444b] text-gray-200 rounded-md px-3 py-1 text-center"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-200">Deafen</span>
                  <input
                    type="text"
                    value={keybinds.deafen}
                    onChange={(e) => setKeybinds({ ...keybinds, deafen: e.target.value })}
                    className="w-20 bg-[#40444b] text-gray-200 rounded-md px-3 py-1 text-center"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-200">Settings</span>
                  <input
                    type="text"
                    value={keybinds.settings}
                    onChange={(e) => setKeybinds({ ...keybinds, settings: e.target.value })}
                    className="w-20 bg-[#40444b] text-gray-200 rounded-md px-3 py-1 text-center"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Advanced Settings</label>
              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="text-[#5865F2]" />
                  <span className="text-gray-200">Hardware Acceleration</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="text-[#5865F2]" />
                  <span className="text-gray-200">Developer Mode</span>
                </label>
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Privacy Settings</label>
              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="text-[#5865F2]" />
                  <span className="text-gray-200">Show online status</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="text-[#5865F2]" />
                  <span className="text-gray-200">Allow friend requests</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="text-[#5865F2]" />
                  <span className="text-gray-200">Allow direct messages</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Data & Privacy</label>
              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="text-[#5865F2]" />
                  <span className="text-gray-200">Allow data collection</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="text-[#5865F2]" />
                  <span className="text-gray-200">Personalized content</span>
                </label>
              </div>
            </div>

            <div>
              <button className="text-red-400 hover:text-red-300 transition-colors">
                Request Account Data
              </button>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Desktop Notifications</label>
              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={notificationsEnabled}
                    onChange={(e) => setNotificationsEnabled(e.target.checked)}
                    className="text-[#5865F2]"
                  />
                  <span className="text-gray-200">Enable notifications</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="text-[#5865F2]" />
                  <span className="text-gray-200">Sound notifications</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="text-[#5865F2]" />
                  <span className="text-gray-200">Background notifications</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Notification Preferences</label>
              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="text-[#5865F2]" />
                  <span className="text-gray-200">Friend requests</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="text-[#5865F2]" />
                  <span className="text-gray-200">Direct messages</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="text-[#5865F2]" />
                  <span className="text-gray-200">Server notifications</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="text-[#5865F2]" />
                  <span className="text-gray-200">@mentions only</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Quiet Hours</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">From</label>
                  <input type="time" className="w-full bg-[#40444b] text-gray-200 rounded-md px-3 py-2" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">To</label>
                  <input type="time" className="w-full bg-[#40444b] text-gray-200 rounded-md px-3 py-2" />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex-1 bg-[#36393f] p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-200">
            {currentSettingsPage.charAt(0).toUpperCase() + currentSettingsPage.slice(1)} Settings
          </h2>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-[#5865F2] text-white px-4 py-2 rounded-md hover:bg-[#4752C4] transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};