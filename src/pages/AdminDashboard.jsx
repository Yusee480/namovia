import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';
import { FaUsers, FaMapMarkerAlt, FaCloudSun, FaSeedling, FaFlask, FaDollarSign, FaNewspaper, FaUserShield, FaPlus, FaCloudDownloadAlt } from 'react-icons/fa';

const monthlyData = [
  { name: 'Jan', Users: 400, Regs: 240, Searches: 1200 },
  { name: 'Feb', Users: 500, Regs: 320, Searches: 1400 },
  { name: 'Mar', Users: 750, Regs: 480, Searches: 1900 },
  { name: 'Apr', Users: 1100, Regs: 640, Searches: 2400 },
  { name: 'May', Users: 1400, Regs: 890, Searches: 3100 },
  { name: 'Jun', Users: 1840, Regs: 1210, Searches: 4200 },
];

const cropDistribution = [
  { name: 'Hybrid White Maize', value: 45 },
  { name: 'Sorghum Grain', value: 25 },
  { name: 'Soybeans Grade A', value: 20 },
  { name: 'Cowpea Beans', value: 10 },
];
const COLORS = ['#15803D', '#FACC15', '#2563EB', '#7C3AED'];

export default function AdminDashboard({ setActiveTab }) {
  
  const stats = [
    { title: 'Total Farmers', count: '1,842', delta: '+12.4%', icon: <FaUsers />, color: 'from-emerald-500 to-green-700', bg: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600' },
    { title: 'Registered Farms', count: '4,109 Hectares', delta: '+8.2%', icon: <FaMapMarkerAlt />, color: 'from-blue-500 to-blue-700', bg: 'bg-blue-50 dark:bg-blue-950/30 text-blue-600' },
    { title: 'Weather Requests', count: '14,842', delta: '+24.1%', icon: <FaCloudSun />, color: 'from-amber-500 to-orange-600', bg: 'bg-amber-50 dark:bg-amber-950/30 text-amber-600' },
    { title: 'Crops Suggested', count: '3,120 Cycles', delta: '+15.3%', icon: <FaSeedling />, color: 'from-teal-500 to-teal-700', bg: 'bg-teal-50 dark:bg-teal-950/30 text-teal-600' },
    { title: 'Fertilizer Guides', count: '2,891 Specs', delta: '+4.9%', icon: <FaFlask />, color: 'from-purple-500 to-purple-700', bg: 'bg-purple-50 dark:bg-purple-950/30 text-purple-600' },
    { title: 'Market Listings', count: '782 Pools', delta: '+19.2%', icon: <FaDollarSign />, color: 'from-rose-500 to-rose-700', bg: 'bg-rose-50 dark:bg-rose-950/30 text-rose-600' },
    { title: 'Published News', count: '146 Bulletins', delta: '+2.1%', icon: <FaNewspaper />, color: 'from-cyan-500 to-cyan-700', bg: 'bg-cyan-50 dark:bg-cyan-950/30 text-cyan-600' },
    { title: 'Active System Admins', count: '12 Nodes', delta: 'Stable', icon: <FaUserShield />, color: 'from-slate-600 to-slate-800', bg: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* QUICK ACTIONS ROW */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Command Action Matrix</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <button onClick={() => setActiveTab('Farmers')} className="flex items-center justify-center space-x-2 p-3 bg-[#15803D] hover:bg-green-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm"><FaPlus /> <span>Add Farmer</span></button>
          <button onClick={() => setActiveTab('Crops')} className="flex items-center justify-center space-x-2 p-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white rounded-xl text-xs font-bold transition-all"><FaPlus /> <span>Add Crop</span></button>
          <button onClick={() => setActiveTab('Fertilizers')} className="flex items-center justify-center space-x-2 p-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white rounded-xl text-xs font-bold transition-all"><FaPlus /> <span>Add Nutrient</span></button>
          <button onClick={() => setActiveTab('News')} className="flex items-center justify-center space-x-2 p-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white rounded-xl text-xs font-bold transition-all"><FaPlus /> <span>Publish News</span></button>
          <button onClick={() => setActiveTab('Reports')} className="flex items-center justify-center space-x-2 p-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-all shadow-sm"><FaCloudDownloadAlt /> <span>Get Report</span></button>
          <button onClick={() => setActiveTab('Settings')} className="flex items-center justify-center space-x-2 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm">⚙️ <span>Backup DB</span></button>
        </div>
      </div>

      {/* METRIC CARD PANEL GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all group duration-300 transform hover:-translate-y-1 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.title}</span>
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center text-base transition-transform group-hover:rotate-12`}>
                {stat.icon}
              </div>
            </div>
            <p className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-mono">{stat.count}</p>
            <div className="flex items-center space-x-1.5 mt-1.5">
              <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${stat.delta.startsWith('+') ? 'bg-green-50 dark:bg-green-950/30 text-green-600' : 'text-slate-400 bg-slate-50 dark:bg-slate-700'}`}>{stat.delta}</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">MoM Activity</span>
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS GRAPH COMPONENT SEGMENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Telemetry Volumetric Analysis</h3>
              <p className="text-xs text-slate-400">Tracking core system request growth across key operational indexes.</p>
            </div>
          </div>
          <div className="h-72 text-xs font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#15803D" stopOpacity={0.2}/><stop offset="95%" stopColor="#15803D" stopOpacity={0}/></linearGradient>
                  <linearGradient id="colorSearches" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2563EB" stopOpacity={0.2}/><stop offset="95%" stopColor="#2563EB" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" className="dark:stroke-slate-700" />
                <XAxis dataKey="name" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="Users" stroke="#15803D" strokeWidth={2} fillOpacity={1} fill="url(#colorUsers)" />
                <Area type="monotone" dataKey="Searches" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#colorSearches)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-4">
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Popular Sown Crops</h3>
            <p className="text-xs text-slate-400">Current regional metric categorization layout.</p>
          </div>
          <div className="h-56 flex items-center justify-center text-xs font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={cropDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {cropDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-slate-500 dark:text-slate-400">
            {cropDistribution.map((c, i) => (
              <div key={i} className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span className="truncate">{c.name} ({c.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SYSTEM LOG TIMELINE RECORDINGS */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-4">
        <div>
          <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">System Audit Timeline</h3>
          <p className="text-xs text-slate-400">Real-time processing stack events.</p>
        </div>
        <div className="space-y-4">
          {[
            { msg: 'New Farmer Registered: Adamu Haruna matching Potiskum Node-4 entry parameters.', time: '3 mins ago', tag: 'REGISTRY', color: 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400' },
            { msg: 'Global Weather Radar Sync executed. 14,842 localization nodes updated.', time: '14 mins ago', tag: 'RADAR_API', color: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400' },
            { msg: 'Crop Recommendation Model matrix recalculation completed successfully.', time: '42 mins ago', tag: 'AI_ENGINE', color: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-400' },
            { msg: 'Market Price Index update triggered for Potiskum Central Grain Exchange.', time: '1 hour ago', tag: 'FINANCE', color: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400' },
          ].map((log, i) => (
            <div key={i} className="flex items-start space-x-3 text-xs border-b border-slate-50 dark:border-slate-700 pb-3 last:border-0 last:pb-0">
              <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-black tracking-wider ${log.color}`}>{log.tag}</span>
              <div className="flex-1">
                <p className="text-slate-700 dark:text-slate-300 font-medium">{log.msg}</p>
                <span className="text-[10px] text-slate-400 font-mono font-bold">{log.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}