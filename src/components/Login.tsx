import React, { useState } from 'react';
import { DevLogin } from './DevLogin';
import { SocialLogin } from './SocialLogin';

export const Login: React.FC = () => {
  const [showDevLogin, setShowDevLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[#202225] flex items-center justify-center p-4">
      {showDevLogin ? (
        <div className="w-full max-w-md space-y-4">
          <DevLogin />
          <button
            onClick={() => setShowDevLogin(false)}
            className="w-full text-[#5865F2] hover:underline text-sm"
          >
            Use Social Login Instead
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md space-y-4">
          <SocialLogin />
          <button
            onClick={() => setShowDevLogin(true)}
            className="w-full text-[#5865F2] hover:underline text-sm"
          >
            Use Development Login
          </button>
        </div>
      )}
    </div>
  );
};