import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FaUsers, FaMapMarkerAlt, FaCloudSun, FaUserShield, FaPlus, FaCloudDownloadAlt, FaTrash, FaSearch, FaUserCheck, FaMap, FaToggleOn, FaToggleOff, FaTimes, FaCheckCircle, FaBullhorn } from 'react-icons/fa';
import { useLocalStorage } from './useLocalStorage';
import News from './News';
import Profile from './Profile'; 
import ReportS from './Reports';
import MarketS from './Markets';
import Fertilizers from './Fertilizers'; 
import Farmers from './Farmers';

const monthlyData = [
  { name: 'Jan', Users: 400, Customers: 180, Searches: 1200 },
  { name: 'Feb', Users: 500, Customers: 240, Searches: 1400 },
  { name: 'Mar', Users: 750, Customers: 390, Searches: 1900 },
  { name: 'Apr', Users: 1100, Customers: 510, Searches: 2400 },
  { name: 'May', Users: 1400, Customers: 680, Searches: 3100 },
  { name: 'Jun', Users: 1842, Customers: 920, Searches: 4200 },
];

const cropDistribution = [
  { name: 'Hybrid White Maize', value: 45 },
  { name: 'Sorghum Grain', value: 25 },
  { name: 'Soybeans Grade A', value: 20 },
  { name: 'Cowpea Beans', value: 10 },
];

const COLORS = ['#15803D', '#FACC15', '#2563EB', '#7C3AED'];

export default function AdminDashboard({ setActiveTab }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [systemAlert, setSystemAlert] = useState(null);
  const [broadcastMessage, setBroadcastMessage] = useState('');
  
  // New user form state fields
  const [newUser, setNewUser] = useState({ name: '', email: '', location: '' });

  // Live client registry matrix source of truth
  const [users, setUsers] = useLocalStorage('allFarmersData', []);
  
  // Compute stats dynamically based on actual state values
  const totalFarmersCount = users.length;
  const activeAdminsCount = 12;

  const triggerAlert = (message) => {
    setSystemAlert(message);
    setTimeout(() => setSystemAlert(null), 4000);
  };

  // Safe wrapper for parent tab updates
  const handleTabChange = (tabName) => {
    if (typeof setActiveTab === 'function') {
      setActiveTab(tabName);
    } else {
      triggerAlert(`Navigation request to ${tabName} failed: Tab handler unavailable.`);
    }
  };

  // Toggle state handle
  const handleToggleStatus = (id) => {
    const targetUser = users.find(user => user.id === id);
    if (!targetUser) return;

    const nextStatus = targetUser.status === 'Active' ? 'Suspended' : 'Active';
    
    setUsers(prevUsers => 
      prevUsers.map(user => user.id === id ? { ...user, status: nextStatus } : user)
    );
    
    triggerAlert(`Node ${id} privileges changed to ${nextStatus}`);
  };

  const handlePublishNews = (e) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;

    const newNotification = {
      id: Date.now(),
      message: broadcastMessage,
      date: new Date().toLocaleDateString()
    };

    localStorage.setItem('adminNotifications', JSON.stringify(newNotification));
    triggerAlert("An tura sanarwar zuwa ga manoma! (Broadcast dispatched successfully)");
    setBroadcastMessage('');
  };

  // Remove operator handle
  const handleDeleteUser = (id) => {
    if (window.confirm(`Are you sure you want to completely drop node ${id} from the database?`)) {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      triggerAlert(`Node ${id} purged successfully from records.`);
    }
  };

  // Form registration processor
  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.location) return;

    const generatedId = `NX-${Math.floor(1000 + Math.random() * 9000)}`;
    const createdNode = {
      id: generatedId,
      name: newUser.name,
      email: newUser.email,
      location: newUser.location,
      status: 'Active',
      joined: new Date().toISOString().split('T')[0]
    };

    setUsers(prevUsers => [createdNode, ...prevUsers]);
    setIsModalOpen(false);
    setNewUser({ name: '', email: '', location: '' });
    triggerAlert(`Registered node system access token: ${generatedId}`);
  };

  const approveUser = (id) => {
    localStorage.setItem(`msg_${id}`, "Your account has been verified by Admin.");
    triggerAlert(`Verification credentials sent to operator node: ${id}`);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fadeIn relative w-full">
      
      {/* GLOBAL DISPATCH NOTIFICATION TOAST */}
      {systemAlert && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs font-mono px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 border border-slate-700 animate-slideUp">
          <FaCheckCircle className="text-emerald-500" />
          <span>{systemAlert}</span>
        </div>
      )}
      

      {/* COMMAND CONTROL MATRIX */}
      <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Command Action Matrix</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <button onClick={() => setIsModalOpen(true)} className="flex items-center justify-center space-x-2 p-3 bg-[#15803D] hover:bg-green-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm"><FaPlus /> <span>Add Farmer</span></button>
          <button onClick={() => handleTabChange('Crops')} className="flex items-center justify-center space-x-2 p-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-white rounded-xl text-xs font-bold transition-all"><FaPlus /> <span>Add Crop</span></button>
          <button onClick={() => handleTabChange('Fertilizers')} className="flex items-center justify-center space-x-2 p-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-white rounded-xl text-xs font-bold transition-all"><FaPlus /> <span>Add Nutrient</span></button>
          <button onClick={() => setActiveTab('News')} className="flex items-center justify-center space-x-2 p-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-white rounded-xl text-xs font-bold transition-all"><FaPlus /> <span>Publish News</span></button>
          <button onClick={() => setActiveTab('Reports')} className="flex items-center justify-center space-x-2 p-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-all shadow-sm"><FaCloudDownloadAlt /> <span>Get Report</span></button>
          <button onClick={() => triggerAlert('System snapshot database hot-backup initiated.')} className="flex items-center justify-center space-x-2 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm">⚙️ <span>Backup DB</span></button>
        </div>
      </div>

      {/* REACTIVE METRICS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { title: 'Total Farmers', count: totalFarmersCount.toString(), delta: '+12.4%', icon: <FaUsers />, bg: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600' },
          { title: 'Registered Farms', count: '4,109 Hectares', delta: '+8.2%', icon: <FaMapMarkerAlt />, bg: 'bg-blue-50 dark:bg-blue-950/30 text-blue-600' },
          { title: 'Weather Requests', count: '14,842', delta: '+24.1%', icon: <FaCloudSun />, bg: 'bg-amber-50 dark:bg-amber-950/30 text-amber-600' },
          { title: 'Active System Admins', count: `${activeAdminsCount} Nodes`, delta: 'Stable', icon: <FaUserShield />, bg: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group duration-300 transform hover:-translate-y-1 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.title}</span>
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center text-base transition-transform group-hover:rotate-12`}>
                {stat.icon}
              </div>
            </div>
            <p className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-mono">{stat.count}</p>
            <div className="flex items-center space-x-1.5 mt-1.5">
              <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${stat.delta.startsWith('+') ? 'bg-green-50 dark:bg-green-950/30 text-green-600' : 'text-slate-400 bg-slate-50 dark:bg-slate-800'}`}>{stat.delta}</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Live System Telemetry</span>
            </div>
          </div>
        ))}
      </div>

      {/* ANALYTICS SECTION — USER & CUSTOMER SPACING MATRIX */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Metric Segment 1: User vs Customer Comparative Area Chart */}
        <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm lg:col-span-2 space-y-4 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">User vs Customer Telemetry</h3>
              <p className="text-[11px] text-slate-400">Tracking the margin separation spacing between active system users and paying commercial customers.</p>
            </div>
            <div className="flex items-center space-x-3 text-[10px] font-bold font-mono">
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-[#15803D]" />
                <span className="text-slate-600 dark:text-slate-300">Total Users</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span className="text-slate-600 dark:text-slate-300">Paying Customers</span>
              </div>
            </div>
          </div>

          <div className="h-72 w-full relative text-[10px] font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#15803D" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#15803D" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="customerGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" className="dark:stroke-slate-800" />
                <XAxis dataKey="name" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip />
                <Area type="monotone" dataKey="Users" stroke="#15803D" strokeWidth={2.5} fill="url(#userGrad)" name="Total Users" />
                <Area type="monotone" dataKey="Customers" stroke="#2563EB" strokeWidth={2.5} fill="url(#customerGrad)" name="Paying Customers" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Metric Segment 2: Crop Yield Distribution Profile */}
        <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between min-w-0">
          <div>
            <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">Crop Allocation Share</h3>
            <p className="text-[11px] text-slate-400">Distribution percentages of top crops deployed under premium custom recommendations.</p>
          </div>

          <div className="h-44 w-full my-2 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={cropDistribution} cx="50%" cy="50%" innerRadius={55} outerRadius={75} paddingAngle={4} dataKey="value">
                  {cropDistribution.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-500">
            {cropDistribution.map((crop, idx) => (
              <div key={idx} className="flex items-center space-x-1.5 truncate">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx] }} />
                <span className="truncate">{crop.name} ({crop.value}%)</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* REGIONAL BROADCAST & DISPATCH PANEL */}
      <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm max-w-4xl">
        <div className="flex items-center space-x-2 mb-2">
          <FaBullhorn className="text-emerald-600 dark:text-emerald-400 text-sm" />
          <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">Emergency Regional Network News Wire</h3>
        </div>
        <p className="text-xs text-slate-400 mb-4">Broadcast operational system directives, dynamic weather warnings, or fertilizer grid adjustments instantly.</p>
        <form onSubmit={handlePublishNews} className="space-y-3">
          <textarea 
            rows="3" 
            value={broadcastMessage}
            onChange={(e) => setBroadcastMessage(e.target.value)}
            placeholder="Rubuta sanarwa a nan... (Type your ecosystem announcement wire payload here)" 
            className="w-full text-xs p-3 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 rounded-xl focus:outline-none focus:border-[#15803D] dark:text-slate-100"
            required
          />
          <div className="flex justify-end">
            <button type="submit" className="px-5 py-2.5 bg-slate-900 dark:bg-slate-100 hover:bg-black dark:hover:bg-white text-white dark:text-slate-900 font-bold text-xs rounded-xl transition-all shadow-sm">
              Publish Broadcast Wire
            </button>
          </div>
        </form>
      </div>

      {/* LIVE INTERACTIVE REGISTRY PANEL */}
      <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center space-x-2">
              <FaUserCheck className="text-[#15803D]" /> <span>User Node Administration</span>
            </h3>
            <p className="text-xs text-slate-400">Direct interface to monitor, toggle access status, verify accounts, or delete public database users.</p>
          </div>
          
          <div className="relative">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Filter by name or locale..." className="pl-9 pr-4 py-2 text-xs w-full sm:w-64 bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#15803D]" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/40 text-[10px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800">
                <th className="p-4 pl-6">Node ID</th>
                <th className="p-4">Farmer Operator</th>
                <th className="p-4">Regional Zone</th>
                <th className="p-4">Deployment Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Change State</th>
                <th className="p-4 text-center">Verification</th>
                <th className="p-4 text-right pr-6">Override</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/60 text-xs font-medium text-slate-700 dark:text-slate-300">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors">
                    <td className="p-4 pl-6 font-mono font-bold text-slate-400">{user.id}</td>
                    <td className="p-4">
                      <div className="font-bold text-slate-900 dark:text-white">{user.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{user.email}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-1.5">
                        <FaMap className="text-slate-400 text-[10px]" /> <span>{user.location}</span>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-[11px] text-slate-500">{user.joined}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${user.status === 'Active' ? 'bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-400' : 'bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400'}`}>{user.status}</span>
                    </td>
                    <td className="p-4 text-center">
                      <button onClick={() => handleToggleStatus(user.id)} className={`text-lg transition-transform active:scale-95 mx-auto block ${user.status === 'Active' ? 'text-green-600' : 'text-slate-400'}`}>
                        {user.status === 'Active' ? <FaToggleOn /> : <FaToggleOff />}
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      <button onClick={() => approveUser(user.id)} className="px-2.5 py-1 text-[10px] bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 dark:bg-slate-800 dark:hover:bg-emerald-950/40 dark:text-slate-300 rounded-lg font-bold transition-colors">
                        Verify Operator
                      </button>
                    </td>
                    <td className="p-4 text-right pr-6">
                      <button onClick={() => handleDeleteUser(user.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-all inline-flex items-center">
                        <FaTrash className="text-xs" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-slate-400 font-medium">No registry keys matched your configuration parameters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DYNAMIC REGISTRATION SYSTEM MODAL POPUP */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white dark:bg-slate-950 rounded-2xl max-w-md w-full border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden p-6 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><FaTimes /></button>
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white mb-1">Provision New Farmer Token</h3>
            <p className="text-xs text-slate-400 mb-4">Input operator credentials to assign platform workspace authority.</p>
            
            <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-500 dark:text-slate-400 mb-1">Full Operator Name</label>
                <input type="text" required value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})} placeholder="e.g. Adamu Haruna" className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#15803D]" />
              </div>
              <div>
                <label className="block font-bold text-slate-500 dark:text-slate-400 mb-1">Secure Contact Email</label>
                <input type="email" required value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} placeholder="name@domain.com" className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#15803D]" />
              </div>
              <div>
                <label className="block font-bold text-slate-500 dark:text-slate-400 mb-1">Regional Deployment Hub</label>
                <input type="text" required value={newUser.location} onChange={(e) => setNewUser({...newUser, location: e.target.value})} placeholder="e.g. Potiskum, Yobe" className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#15803D]" />
              </div>
              <div className="pt-2 flex items-center justify-end space-x-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2.5 rounded-xl font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-white">Cancel</button>
                <button type="submit" className="px-4 py-2.5 rounded-xl font-bold bg-[#15803D] hover:bg-green-800 text-white shadow-md">Commit Entry</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
  
}