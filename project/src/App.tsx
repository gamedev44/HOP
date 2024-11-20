import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Login';
import { Chat } from './components/Chat';
import { ServerSidebar } from './components/ServerSidebar';
import { NavSidebar } from './components/NavSidebar';
import { UserList } from './components/UserList';
import { useStore } from './store/useStore';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <div className="flex h-screen bg-[#202225]">
                <ServerSidebar />
                <NavSidebar />
                <div className="flex-1 flex">
                  <Chat />
                  <UserList />
                </div>
              </div>
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;