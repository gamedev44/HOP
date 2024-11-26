import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Login';
import { Chat } from './components/Chat';
import { ServerSidebar } from './components/ServerSidebar';
import { NavSidebar } from './components/NavSidebar';
import { UserList } from './components/UserList';
import { DirectMessages } from './components/DirectMessages';
import { useStore } from './store/useStore';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  const { isAuthenticated, activeTab } = useStore();

  return (
    <Routes>
      <Route path="/login" element={
        isAuthenticated ? <Navigate to="/chat" /> : <Login />
      } />
      <Route path="/chat" element={
        <PrivateRoute>
          <div className="flex h-screen bg-[#202225]">
            <ServerSidebar />
            {activeTab === 'home' && (
              <>
                <DirectMessages />
                <div className="flex-1 flex">
                  <Chat />
                  <UserList />
                </div>
              </>
            )}
            {activeTab === 'servers' && (
              <>
                <NavSidebar />
                <div className="flex-1 flex">
                  <Chat />
                  <UserList />
                </div>
              </>
            )}
          </div>
        </PrivateRoute>
      } />
      <Route path="/" element={<Navigate to={isAuthenticated ? "/chat" : "/login"} />} />
    </Routes>
  );
}

export default App;