import React, { useState } from 'react';
import { 
  FaBars, FaHome, FaUsers, FaUserShield, FaCloudSun, FaSeedling, 
  FaFlask, FaBug, FaDollarSign, FaNewspaper, FaMapMarkerAlt, 
  FaCalendarAlt, FaChartLine, FaEnvelopeOpenText, FaBell, 
  FaCog, FaUser, FaSignOutAlt, FaSearch, FaCommentAlt, FaSun, FaMoon 
} from 'react-icons/fa';

export default function AdminLayout({ children, activeTab, setActiveTab, setScreen }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const menuItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: <FaHome /> },
    { id: 'Farmers', label: 'Farmers Management', icon: <FaUsers /> },
    { id: 'Admins', label: 'Admin Users', icon: <FaUserShield /> },
    { id: 'Weather', label: 'Weather Management', icon: <FaCloudSun /> },
    { id: 'Crops', label: 'Crop Recommendations', icon: <FaSeedling /> },
    { id: 'Fertilizers', label: 'Fertilizer Management', icon: <FaFlask /> },
    { id: 'Pests', label: 'Pest & Disease Library', icon: <FaBug /> },
    { id: 'Markets', label: 'Market Prices', icon: <FaDollarSign /> },
    { id: 'News', label: 'News & Announcements', icon: <FaNewspaper /> },
    { id: 'Locations', label: 'Farm Locations', icon: <FaMapMarkerAlt /> },
    { id: 'Calendar', label: 'Planting Calendar', icon: <FaCalendarAlt /> },
    { id: 'Reports', label: 'Reports & Analytics', icon: <FaChartLine /> },
    { id: 'Feedback', label: 'Feedback & Support', icon: <FaEnvelopeOpenText /> },
    { id: 'Notifications', label: 'Notifications', icon: <FaBell />, badge: 5 },
    { id: 'Settings', label: 'System Settings', icon: <FaCog /> },
    { id: 'Profile', label: 'Profile', icon: <FaUser /> },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-[#F9FAFB] text-slate-800'} flex antialiased font-sans transition-colors duration-200`}>
      
      {/* SIDEBAR BLOCK */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-slate-800 border-r border-slate-100 dark:border-slate-700 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col shadow-xl lg:shadow-none`}>
        <div className="h-20 flex items-center px-6 border-b border-slate-50 dark:border-slate-700 space-x-2">
          <span className="text-2xl">🌾</span>
          <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white">Crop<span className="text-[#15803D]">Nexa Admin</span></span>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all group ${
                activeTab === item.id 
                  ? 'bg-green-50 dark:bg-green-900/30 text-[#15803D] dark:text-green-400 border-l-4 border-[#15803D]' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3.5">
                <span className={`text-sm transition-transform group-hover:scale-110 ${activeTab === item.id ? 'text-[#15803D]' : 'text-slate-400'}`}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="bg-[#15803D] text-white text-[10px] px-2 py-0.5 rounded-full font-mono">{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-slate-700">
          <button onClick={() => setScreen('home')} className="w-full flex items-center space-x-3 px-4 py-3 text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors">
            <FaSignOutAlt className="text-sm" /> <span>Logout Terminal</span>
          </button>
        </div>
      </aside>

      {/* OVERLAY FOR MOBILE VIEW */}
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* RIGHT WORKSPACE INTERFACE */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        
        {/* TOP BAR CONTAINER */}
        <header className="h-20 bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 sticky top-0 z-20 flex items-center justify-between px-4 sm:px-8 shadow-sm">
          <div className="flex items-center space-x-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl">
              <FaBars className="text-lg" />
            </button>
            <div className="hidden sm:block">
              <h2 className="text-base font-black text-slate-900 dark:text-white">Good Morning Admin 👋</h2>
              <p className="text-[11px] text-slate-400 font-bold font-mono uppercase tracking-wider">July 6, 2026 • Live Network Cluster</p>
            </div>
          </div>

          {/* SEARCH COMPONENT INPUT */}
          <div className="flex-1 max-w-xs sm:max-w-md mx-4">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input 
                type="text" 
                placeholder="Search master data registers..." 
                className="w-full bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#15803D] dark:focus:border-green-500 focus:bg-white dark:focus:bg-slate-700 transition-all text-slate-800 dark:text-slate-100"
              />
            </div>
          </div>

          {/* TOPBAR INTERACTIVE ICONS */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl">
              {darkMode ? <FaSun className="text-sm text-yellow-400" /> : <FaMoon className="text-sm" />}
            </button>
            <button onClick={() => setActiveTab('Notifications')} className="p-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl relative">
              <FaBell className="text-sm" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button onClick={() => setActiveTab('Feedback')} className="p-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl">
              <FaCommentAlt className="text-sm" />
            </button>
            <div className="h-8 w-[1px] bg-slate-100 dark:bg-slate-700 mx-1 hidden sm:block" />
            <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setActiveTab('Profile')}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-green-700 to-emerald-900 text-white font-black text-xs flex items-center justify-center shadow-md shadow-green-900/10">AD</div>
              <span className="hidden xl:block text-xs font-bold text-slate-700 dark:text-slate-200 group-hover:text-[#15803D] transition-colors">Yusuf A.</span>
            </div>
          </div>
        </header>

        {/* CONTROLLER MAIN WINDOW WORKSPACE */}
        <main className="flex-1 p-4 sm:p-8 space-y-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {children}
        </main>

        {/* SYSTEM FOOTER */}
        <footer className="h-16 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 px-4 sm:px-8 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
          <div>&copy; 2026 CropNexa • Smart Agriculture Platform</div>
          <div>Version 1.0.0 (Enterprise)</div>
        </footer>

      </div>
    </div>
  );
}