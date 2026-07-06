import React, { useState } from 'react';
import Home from './pages/Home.jsx';
import Auth from './pages/Auth.jsx';
import Dashboard from './pages/Dashboard.jsx'; 

export default function App() {
  // Navigation states can be: 'home', 'login', 'register', or 'dashboard'
  const [screen, setScreen] = useState('home');

  if (screen === 'login' || screen === 'register') {
    // If successful inside Auth, we transition to 'dashboard' instead of resetting
    return <Auth initialMode={screen} setScreen={setScreen} />;
  }

  if (screen === 'dashboard') {
    return <Dashboard setScreen={setScreen} />;
  }

  return <Home setScreen={setScreen} />;
}