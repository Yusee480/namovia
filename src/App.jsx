import React, { useState, useEffect } from 'react';
import Home from './pages/Home.jsx';
import Auth from './pages/Auth.jsx';
import MainContainerApp from './pages/MainContainerApp.jsx';
import Dashboard from './pages/Dashboard.jsx';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setUserRole(user.role);
        // Direct routing based on cached credential profile parameters
        setScreen(user.role === 'admin' ? 'admin' : 'user');
      } catch (error) {
        console.error("Failed to deserialize user identity node session", error);
        localStorage.removeItem('currentUser');
      }
    }
    setIsLoading(false);
  }, []);

  const handleAuthSuccess = (role) => {
    setUserRole(role);
    // Routing switch: Idan admin ne, kiran 'admin', idan user ne 'user'
    setScreen(role === 'admin' ? 'admin' : 'user');
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUserRole(null);
    setScreen('home');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center font-mono text-xs text-slate-400">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-green-700 animate-ping" />
          <span>Verifying secure route access policies...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 font-sans transition-colors duration-200">
      {/* LANDING & REGISTRATION MATRIX INTERFACES */}
      {screen === 'home' && <Home setScreen={setScreen} />}
      {screen === 'login' && <Auth initialMode="login" setScreen={setScreen} onSuccess={handleAuthSuccess} />}
      {screen === 'register' && <Auth initialMode="register" setScreen={setScreen} onSuccess={handleAuthSuccess} />}
      
      {/* CONTROL TERMINAL ENDPOINTS */}
      {screen === 'admin' && <MainContainerApp setScreen={setScreen} onLogout={handleLogout} />}
      {screen === 'user' && <Dashboard setScreen={setScreen} onLogout={handleLogout} />}
    </div>
  );
}