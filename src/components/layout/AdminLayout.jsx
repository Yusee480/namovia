import React, { useState, useEffect } from 'react';
import { 
  FaBars, FaTimes, FaSun, FaMoon, FaThLarge, 
  FaUsers, FaStore, FaSignOutAlt, FaUserCircle 
} from 'react-icons/fa';

export default function AdminLayout({ children, activeTab, setActiveTab, setScreen }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Initializing as false to prevent hydration mismatch
  const [darkMode, setDarkMode] = useState(false);

  // Sync state with localStorage only after component mounts
  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark';
    setDarkMode(isDark);
  }, []);

  // Use currentScreen || 'Home' to ensure it's never undefined/empty
 useEffect(() => {
  const screenName = activeTab || 'Home';
  document.title = `CropNexa | ${screenName.charAt(0).toUpperCase() + screenName.slice(1)}`;
}, [activeTab]);

  // Dark Mode Sync
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const navigationLinks = [
    { name: 'Dashboard', screenKey: 'Dashboard', icon: <FaThLarge /> },
    { name: 'Farmers Ledger', screenKey: 'Farmers', icon: <FaUsers /> },
    { name: 'Market Intel', screenKey: 'Markets', icon: <FaStore /> },
  ];

  const handleSignOut = () => {
    if (window.confirm('Terminate session state and sign out?')) {
      localStorage.removeItem('authToken');
      setScreen('login');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans flex transition-colors duration-200">
      
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 w-64 bg-white dark:bg-slate-800 border-r border-slate-100 dark:border-slate-700 z-50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-200 flex flex-col justify-between`}>
        <div>
          <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-green-700 rounded-lg flex items-center justify-center text-white font-black text-sm">C</div>
              <span className="font-black text-sm uppercase tracking-wider text-slate-900 dark:text-white">CropNexa</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} aria-label="Close Sidebar" className="text-slate-400 hover:text-slate-600 lg:hidden text-base">
              <FaTimes />
            </button>
          </div>

          <nav className="p-4 space-y-1">
           {navigationLinks.map((link) => (
  <button
    key={link.screenKey}
    onClick={() => setActiveTab(link.screenKey)}
    // Wannan className din shi zai sa button din ya zama kyakkyawa
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 
      ${activeTab === link.screenKey 
        ? 'bg-green-700 text-white shadow-lg' 
        : 'text-slate-600 hover:bg-slate-100'
      }`}
  >
    {/* Icon din link din */}
    <span className="text-lg">{link.icon}</span>
    
    {/* Rubutun link din */}
    <span>{link.name}</span>
  </button>
))}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-slate-700">
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-all"
          >
            <FaSignOutAlt className="text-sm" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between px-6 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} aria-label="Open Sidebar" className="text-slate-500 lg:hidden text-sm"><FaBars /></button>
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 hidden sm:block">
             
          </h2>
          <div className="flex items-center gap-4">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 bg-slate-50 dark:bg-slate-700 rounded-xl text-slate-500 transition-colors text-sm">
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-slate-100 dark:border-slate-700">
              <div className="text-right hidden sm:block">
                <p className="text-[11px] font-bold text-slate-900 dark:text-white leading-none">Yusuf A. Juma</p>
                <span className="text-[9px] text-slate-400 font-mono">System Root</span>
              </div>
              <FaUserCircle className="text-xl text-slate-400" />
            </div>
          </div>
        </header>
        <main className="p-6 overflow-y-auto flex-1">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}