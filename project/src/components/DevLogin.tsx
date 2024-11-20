import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

const validCredentials = [
  { username: "Test", password: "1234" },
  { username: "Guest", password: "0000" },
  { username: "Dev", password: "dev123" }
];

export const DevLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const login = useStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (file) {
      try {
        const text = await file.text();
        if (text.includes('indie') || text.includes('pgdu') || text.includes('iceauth')) {
          const success = login('Guest', '0000'); // Use default guest credentials for file auth
          if (success) {
            navigate('/chat');
          }
          return;
        }
      } catch (err) {
        setError('Error reading file');
        return;
      }
    }

    const success = login(username, password);
    if (success) {
      navigate('/chat');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="w-full max-w-md bg-[#2f3136] p-8 rounded-lg shadow-xl">
      <div className="text-center mb-8">
        <img 
          src="https://gcdnb.pbrd.co/images/ftjHeVLGHIjk.png?o=1"
          alt="HØP"
          className="w-24 h-24 mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-white">PGD Login - HØP</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 bg-[#40444b] text-white rounded-md border-transparent focus:border-[#5865F2] focus:ring focus:ring-[#5865F2] focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-[#40444b] text-white rounded-md border-transparent focus:border-[#5865F2] focus:ring focus:ring-[#5865F2] focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Upload .txt file (optional)
          </label>
          <input
            type="file"
            accept=".txt"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full px-3 py-2 bg-[#40444b] text-white rounded-md border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#5865F2] file:text-white hover:file:bg-[#4752C4]"
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <button
          type="submit"
          className="w-full bg-[#5865F2] text-white rounded-md py-2 hover:bg-[#4752C4] transition-colors"
        >
          Login
        </button>
      </form>

      <div className="mt-4 space-y-2">
        <a
          href="https://herrell4.wixsite.com/iugaming/contactus"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-[#5865F2] hover:underline"
        >
          Forgot Password?
        </a>
        <a
          href="https://herrell4.wixsite.com/iugaming/pgd-portal"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-[#5865F2] hover:underline"
        >
          Create Account
        </a>
      </div>
    </div>
  );
};