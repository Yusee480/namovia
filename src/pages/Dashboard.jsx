import React, { useState } from 'react';

export default function Dashboard({ setScreen }) {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = [
    { name: 'Dashboard', icon: '🏠' },
    { name: 'Weather Forecast', icon: '🌤' },
    { name: 'Crop Recommendations', icon: '🌱' },
    { name: 'Fertilizer Guide', icon: '🧪' },
    { name: 'Pest & Disease', icon: '🪲' },
    { name: 'Market Prices', icon: '💰' },
    { name: 'Farm Locations', icon: '📍' },
    { name: 'Planting Calendar', icon: '📅' },
    { name: 'Notifications', icon: '🔔', badge: 3 },
    { name: 'Farm Analytics', icon: '📈' },
    { name: 'Profile', icon: '👤' },
    { name: 'Settings', icon: '⚙' },
  ];

  // ==========================================
  // 🎛️ RENDERING ENGINE FOR ACTIVE PAGES
  // ==========================================
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <>
            {/* WELCOME BANNER CARD */}
            <div className="bg-gradient-to-br from-[#15803D] via-[#166534] to-emerald-950 rounded-2xl p-6 sm:p-8 shadow-xl border border-white/10 relative overflow-hidden text-white">
              <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-10 translate-y-10">
                <span className="text-[200px]">🌾</span>
              </div>
              <div className="relative z-10 max-w-2xl space-y-4">
                <span className="inline-block px-3 py-1 bg-white/10 border border-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-wider rounded-full text-green-300">Operational Command Active</span>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">Welcome Back, Yusuf 👋</h1>
                <p className="text-sm sm:text-base text-green-100/90 leading-relaxed">
                  Monitor atmospheric configurations, analyze automated micro-nutrient guides, and handle predictive field mapping coordinates seamlessly via your central terminal infrastructure.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button onClick={() => setActiveTab('Weather Forecast')} className="bg-[#FACC15] text-gray-950 text-xs font-bold px-5 py-3 rounded-xl hover:bg-yellow-400 transition-colors shadow-md">View Weather Vectors</button>
                  <button onClick={() => setActiveTab('Farm Locations')} className="bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-bold px-5 py-3 rounded-xl transition-all">Add Farm Matrix</button>
                </div>
              </div>
            </div>

            {/* QUICK STATS BLOCKS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { title: 'Temperature', value: '31°C', sub: 'Atmospheric baseline', icon: '🌤', color: 'bg-orange-50 text-orange-700' },
                { title: 'Rain Probability', value: '4%', sub: 'Precipitation vector', icon: '🌧', color: 'bg-blue-50 text-blue-700' },
                { title: 'Humidity Rate', value: '64%', sub: 'Saturated soil index', icon: '💧', color: 'bg-teal-50 text-teal-700' },
                { title: 'Farm Productivity', value: '+18.4%', sub: 'Gross performance delta', icon: '📈', color: 'bg-emerald-50 text-emerald-700' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.title}</span>
                    <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center text-lg font-bold`}>{stat.icon}</div>
                  </div>
                  <p className="text-2xl font-black text-gray-900 tracking-tight font-mono">{stat.value}</p>
                  <p className="text-[11px] text-gray-400 font-medium mt-1">{stat.sub}</p>
                </div>
              ))}
            </div>

            {/* RECENT FEEDBACK HOOKS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-gray-900">Primary Recommendation Preview</h3>
                <p className="text-xs text-gray-500">Based on recent soil tests from Potiskum coordinates, the neural layout suggests initiating planting strategies immediately.</p>
                <div className="p-4 bg-green-50/50 rounded-xl flex items-center justify-between border border-green-100/50">
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Maize (White Hybrid)</h4>
                    <p className="text-[11px] text-gray-400">Confidence Match: 94%</p>
                  </div>
                  <button onClick={() => setActiveTab('Crop Recommendations')} className="text-xs font-bold text-[#15803D] hover:underline">Open Engine →</button>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-gray-900">Critical Weather Updates</h3>
                <div className="p-4 bg-amber-50/70 border border-amber-100 rounded-xl text-xs text-amber-800 leading-relaxed">
                  <strong>Thermal Alert:</strong> Localized heat cells expected to climb past 34°C by Wednesday. Consider adjustments to moisture intervals.
                </div>
              </div>
            </div>
          </>
        );

      case 'Weather Forecast':
        return (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Advanced Weather Forecast Matrix</h3>
              <p className="text-xs text-gray-400">7-Day radar forecasting models mapped for Potiskum grid infrastructure.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-orange-50/50 border border-orange-100 rounded-xl text-center">
                <span className="text-3xl block mb-2">☀️</span>
                <span className="text-xs text-gray-400 block uppercase font-bold">Highest Heat Cell</span>
                <span className="text-xl font-mono font-black text-gray-900">33°C (Sunday)</span>
              </div>
              <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl text-center">
                <span className="text-3xl block mb-2">🌧</span>
                <span className="text-xs text-gray-400 block uppercase font-bold">Precipitation Peak</span>
                <span className="text-xl font-mono font-black text-gray-900">78% (Thursday)</span>
              </div>
              <div className="p-4 bg-teal-50/50 border border-teal-100 rounded-xl text-center">
                <span className="text-3xl block mb-2">🌬</span>
                <span className="text-xs text-gray-400 block uppercase font-bold">Avg Wind Speed</span>
                <span className="text-xl font-mono font-black text-gray-900">14 km/h (NE)</span>
              </div>
            </div>
            <div className="border-t border-gray-50 pt-4">
              <div className="grid grid-cols-2 sm:grid-cols-7 gap-3">
                {[
                  { day: 'Monday', temp: '31°', icon: '☀️', pop: '4%', status: 'Clear Sky' },
                  { day: 'Tuesday', temp: '32°', icon: '☀️', pop: '2%', status: 'Clear Sky' },
                  { day: 'Wednesday', temp: '29°', icon: '⛅', pop: '15%', status: 'Partly Cloudy' },
                  { day: 'Thursday', temp: '28°', icon: '🌧', pop: '78%', status: 'Heavy Showers' },
                  { day: 'Friday', temp: '30°', icon: '⛈', pop: '60%', status: 'Thunderstorms' },
                  { day: 'Saturday', temp: '32°', icon: '🌤', pop: '10%', status: 'Mild Sun' },
                  { day: 'Sunday', temp: '33°', icon: '☀️', pop: '0%', status: 'Extreme Clear' },
                ].map((f, idx) => (
                  <div key={idx} className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center space-y-1 hover:border-green-600 transition-all">
                    <span className="text-xs font-bold text-gray-500 block">{f.day}</span>
                    <span className="text-2xl block py-1">{f.icon}</span>
                    <span className="text-base font-black text-gray-900 block font-mono">{f.temp}</span>
                    <span className="text-[11px] font-bold text-blue-600 block">💧 {f.pop}</span>
                    <span className="text-[9px] text-gray-400 block">{f.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'Crop Recommendations':
        return (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Predictive Machine Learning Crop Matches</h3>
              <p className="text-xs text-gray-400">Algorithmic sorting matching local soil chemistry parameters against weather cycles.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-green-100 bg-green-50/20 rounded-xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="px-3 py-1 bg-[#15803D] text-white text-[11px] font-bold rounded-full">Optimal Priority #1</span>
                  <span className="text-xs font-bold text-[#15803D]">94% System Confidence</span>
                </div>
                <h4 className="text-xl font-black text-gray-900">White Hybrid Maize (Zea mays)</h4>
                <p className="text-xs text-gray-600 leading-relaxed">Highly compatible with current nitrogen levels monitored within your local geographic perimeter. Calculated yield curves suggest extreme resilience against mid-season rain drops.</p>
                <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                  <div className="bg-white p-3 rounded-lg border border-gray-100">⚖️ <span className="text-gray-400">Expected Yield:</span> <strong className="block text-gray-800">4.5 Tons/Hectare</strong></div>
                  <div className="bg-white p-3 rounded-lg border border-gray-100">📅 <span className="text-gray-400">Growing Cycle:</span> <strong className="block text-gray-800">90-110 Days</strong></div>
                </div>
              </div>
              <div className="border border-gray-100 bg-gray-50/50 rounded-xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="px-3 py-1 bg-gray-200 text-gray-700 text-[11px] font-bold rounded-full">Secondary Alternative</span>
                  <span className="text-xs font-bold text-gray-400">81% System Confidence</span>
                </div>
                <h4 className="text-xl font-black text-gray-800">Sorghum (Sorghum bicolor)</h4>
                <p className="text-xs text-gray-600 leading-relaxed">High tolerance to thermal stress anomalies. Advised as a rotation fallback parameter if irrigation nodes run into unexpected operational friction.</p>
                <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                  <div className="bg-white p-3 rounded-lg border border-gray-100">⚖️ <span className="text-gray-400">Expected Yield:</span> <strong className="block text-gray-700">3.2 Tons/Hectare</strong></div>
                  <div className="bg-white p-3 rounded-lg border border-gray-100">📅 <span className="text-gray-400">Growing Cycle:</span> <strong className="block text-gray-800">115-130 Days</strong></div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Fertilizer Guide':
        return (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Nutrient Allocation Guide</h3>
              <p className="text-xs text-gray-400">Targeted NPK application rules formulated to match historical telemetry mapping.</p>
            </div>
            <div className="space-y-4">
              {[
                { name: 'NPK 15-15-15 Basal Mixture', dosage: '150kg / Hectare', method: 'Sub-surface Ring Placement', window: 'Apply 14 days post seedling emergence', purpose: 'Root structure development initialization' },
                { name: 'Urea Top Dressing', dosage: '100kg / Hectare', method: 'Side-dressing layout', window: 'Apply at 5-6 weeks during peak vegetative acceleration', purpose: 'Nitrogen stabilization booster' }
              ].map((f, i) => (
                <div key={i} className="p-5 border border-purple-100 bg-purple-50/10 rounded-xl grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <div className="md:col-span-1">
                    <span className="text-purple-700 font-bold text-sm block">🧪 {f.name}</span>
                    <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded mt-1 inline-block">Target Dosage</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-gray-400 block">Application Method</span>
                    <span className="font-bold text-gray-800">{f.method}</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-gray-400 block">Deployment Window</span>
                    <span className="font-bold text-gray-800">{f.window}</span>
                  </div>
                  <div className="text-xs md:text-right">
                    <span className="text-gray-400 block">Biological Purpose</span>
                    <span className="font-semibold text-purple-900">{f.purpose}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Pest & Disease':
        return (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Pest Vector & Pathogen Interception</h3>
              <p className="text-xs text-gray-400">Early anomaly detection and remediation guidelines for regional biological threats.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-red-100 bg-red-50/30 rounded-xl space-y-2">
                <div className="flex justify-between items-center"><span className="text-xs font-bold text-red-700 bg-white border border-red-200 px-2 py-0.5 rounded">High Regional Activity</span> <span className="text-xs font-mono text-gray-400">Risk Level: 84%</span></div>
                <h4 className="font-bold text-sm text-gray-900">Fall Armyworm (Spodoptera frugiperda)</h4>
                <p className="text-xs text-gray-600">Monitored in neighboring layout nodes. Execute early lifecycle checks on lower leaves every 48 hours.</p>
              </div>
              <div className="p-4 border border-yellow-100 bg-yellow-50/30 rounded-xl space-y-2">
                <div className="flex justify-between items-center"><span className="text-xs font-bold text-yellow-700 bg-white border border-yellow-200 px-2 py-0.5 rounded">Climatic Risk Warning</span> <span className="text-xs font-mono text-gray-400">Risk Level: 40%</span></div>
                <h4 className="font-bold text-sm text-gray-900">Maize Lethal Necrosis Disease</h4>
                <p className="text-xs text-gray-600">Correlated with elevated humidity markers. Keep drainage parameters optimized to prevent fungal instantiation vectors.</p>
              </div>
            </div>
          </div>
        );

      case 'Market Prices':
        return (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Live Commodities Market Board</h3>
              <p className="text-xs text-gray-400">Wholesale verification tracking across nearby physical markets and regional digital aggregators.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 uppercase tracking-wider font-bold">
                    <th className="py-3 pr-4">Commodity Product</th>
                    <th className="py-3 px-4">Market Location</th>
                    <th className="py-3 px-4">Current Index Price</th>
                    <th className="py-3 px-4">Daily Volatility</th>
                    <th className="py-3 pl-4 text-right">Status Terminal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-gray-700 font-medium">
                  {[
                    { crop: 'Maize (White Hybrid)', market: 'Potiskum Central Hub', price: '₦42,000 / Bag', delta: '+4.2%', up: true, status: 'Bullish Demand' },
                    { crop: 'Sorghum Grain', market: 'Yobe North Aggregator', price: '₦39,500 / Bag', delta: '+1.8%', up: true, status: 'Stable' },
                    { crop: 'Cowpea (Brown Beans)', market: 'Potiskum Central Hub', price: '₦68,000 / Bag', delta: '-0.4%', up: false, status: 'High Volume Oversupply' },
                    { crop: 'Soybeans Grade A', market: 'Regional Digital Terminal', price: '₦51,000 / Bag', delta: '+5.1%', up: true, status: 'Active Purchasing' },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 pr-4 font-bold text-gray-900">{row.crop}</td>
                      <td className="py-4 px-4 text-gray-500">{row.market}</td>
                      <td className="py-4 px-4 font-bold font-mono">{row.price}</td>
                      <td className={`py-4 px-4 font-bold font-mono ${row.up ? 'text-green-600' : 'text-red-500'}`}>{row.delta}</td>
                      <td className="py-4 pl-4 text-right"><span className={`text-[10px] font-bold px-2 py-0.5 rounded ${row.up ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{row.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'Farm Locations':
        return (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Spatial Telemetry Boundaries</h3>
                <p className="text-xs text-gray-400">Active geolocations synced directly to CropNexa environment micro-cells.</p>
              </div>
              <button className="px-4 py-2 bg-[#15803D] text-white font-bold text-xs rounded-xl hover:bg-green-800 transition-colors">➕ Provision New Hectare Block</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-100 rounded-xl space-y-3 bg-gray-50/50">
                <div className="flex justify-between items-center"><span className="text-xs font-bold font-mono text-gray-400">ZONE-4B-MAIN</span> <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" /></div>
                <h4 className="font-extrabold text-sm text-gray-900">Potiskum Core Layout</h4>
                <p className="text-xs text-gray-500">Coordinates: 11.7073° N, 11.0825° E • Area Block: 4.2 Hectares</p>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden"><div className="bg-[#15803D] w-full h-full" /></div>
              </div>
              <div className="p-4 border border-gray-100 rounded-xl space-y-3 bg-gray-50/50 opacity-60">
                <div className="flex justify-between items-center"><span className="text-xs font-bold font-mono text-gray-400">ZONE-4B-BACKUP</span> <span className="w-2.5 h-2.5 rounded-full bg-gray-400" /></div>
                <h4 className="font-extrabold text-sm text-gray-800">Yobe Peripheral Segment</h4>
                <p className="text-xs text-gray-500">Unassigned Telemetry Layer • Area Block: 2.0 Hectares</p>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden"><div className="bg-gray-400 w-0 h-full" /></div>
              </div>
            </div>
          </div>
        );

      case 'Planting Calendar':
        return (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Agronomic Scheduling Matrix</h3>
              <p className="text-xs text-gray-400">Optimal timeline milestones calculated from multi-layer historical tracking models.</p>
            </div>
            <div className="space-y-4">
              {[
                { phase: 'Phase 1: Soil Stratification & Basal Setup', date: 'July 10 - July 15', status: 'Pending Emergence', current: true },
                { phase: 'Phase 2: High-Precision Seed Placement Initiation', date: 'July 18 - July 22', status: 'Locked' },
                { phase: 'Phase 3: Initial Crop Hydration Audit Check', date: 'August 02', status: 'Locked' },
                { phase: 'Phase 4: First Vegetative NPK Side-Dressing', date: 'August 24', status: 'Locked' },
              ].map((c, idx) => (
                <div key={idx} className={`p-4 rounded-xl border flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-xs ${c.current ? 'bg-green-50/50 border-green-200 text-green-900' : 'bg-gray-50/50 border-gray-100 text-gray-600'}`}>
                  <div>
                    <span className="font-bold text-gray-900 block">{c.phase}</span>
                    <span className="text-[11px] text-gray-400 font-medium">Target Date window: {c.date}</span>
                  </div>
                  <div>
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase ${c.current ? 'bg-[#15803D] text-white' : 'bg-gray-200 text-gray-500'}`}>{c.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Notifications':
        return (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center border-b border-gray-50 pb-3">
              <div>
                <h3 className="text-lg font-bold text-gray-900">System Notification Terminal</h3>
                <p className="text-xs text-gray-400">Critical infrastructure broadcasts and weather metrics changes.</p>
              </div>
              <button className="text-xs font-bold text-[#15803D] hover:underline">Mark All Read</button>
            </div>
            <div className="space-y-3">
              {[
                { type: '🚨 WEATHER RADAR ALERT', msg: 'Severe weather anomaly tracking: Heavy precipitation vectors scheduled over Potiskum coordinates on Thursday afternoon.', time: '20 mins ago', critical: true },
                { type: '🧪 LAB DATA LINK MATCHED', msg: 'Your chemical soil report verification has been calculated. Recommendations engine updated with NPK parameters.', time: '2 hours ago' },
                { type: '💰 COMMODITIES VALUATION REPORT', msg: 'Maize index value climbed +4.2% in local markets. Optimal conditions for wholesale asset sales achieved.', time: '1 day ago' },
              ].map((n, idx) => (
                <div key={idx} className={`p-4 border rounded-xl text-xs space-y-1 ${n.critical ? 'bg-red-50/40 border-red-100' : 'bg-gray-50/50 border-gray-100'}`}>
                  <div className="flex justify-between items-center flex-wrap gap-2"><span className={`font-black text-[10px] ${n.critical ? 'text-red-700' : 'text-gray-500'}`}>{n.type}</span><span className="text-[10px] font-mono text-gray-400">{n.time}</span></div>
                  <p className="text-gray-700 leading-relaxed font-medium">{n.msg}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Farm Analytics':
        return (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Farm Analytics Data Modeling</h3>
              <p className="text-xs text-gray-400">Pure-CSS multi-layer chart engine measuring seasonal trends.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border border-gray-100 rounded-xl p-4 space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Historical Rainfall Aggregation Volume (mm)</h4>
                <div className="h-44 flex items-end justify-between pt-6 px-2 border-b border-gray-100">
                  {[{ h: 'h-[35%]', m: 'Jan' }, { h: 'h-[20%]', m: 'Feb' }, { h: 'h-[45%]', m: 'Mar' }, { h: 'h-[75%]', m: 'Apr' }, { h: 'h-[95%]', m: 'May' }, { h: 'h-[60%]', m: 'Jun' }].map((b, i) => (
                    <div key={i} className="w-8 flex flex-col items-center space-y-2 h-full justify-end group">
                      <div className={`w-full bg-gradient-to-t from-[#15803D] to-emerald-500 rounded-t ${b.h}`} />
                      <span className="text-[10px] font-bold text-gray-400">{b.m}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border border-gray-100 rounded-xl p-4 space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Yield Output Curves (Tons per Hectare)</h4>
                <div className="h-44 flex items-end justify-between pt-6 px-2 border-b border-gray-100">
                  {[{ h: 'h-[40%]', m: '2022' }, { h: 'h-[55%]', m: '2023' }, { h: 'h-[68%]', m: '2024' }, { h: 'h-[82%]', m: '2025' }, { h: 'h-[95%]', m: '2026' }].map((b, i) => (
                    <div key={i} className="w-10 flex flex-col items-center space-y-2 h-full justify-end group">
                      <div className={`w-full bg-gradient-to-t from-blue-700 to-sky-400 rounded-t ${b.h}`} />
                      <span className="text-[10px] font-bold text-gray-400">{b.m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'Profile':
        return (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Operator Identity Terminal</h3>
              <p className="text-xs text-gray-400">Manage identity validation layers and subscription tiers.</p>
            </div>
            <div className="flex items-center space-x-4 border-b border-gray-50 pb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-green-700 to-emerald-900 text-white font-black flex items-center justify-center text-xl shadow">YA</div>
              <div>
                <h4 className="text-base font-black text-gray-900">Yusuf Adamou</h4>
                <p className="text-xs text-gray-400">Enterprise Agronomic Operator • Potiskum Node</p>
                <span className="inline-block mt-1 text-[10px] font-bold bg-green-50 border border-green-200 text-[#15803D] px-2 py-0.5 rounded-full">✓ Identity Verified</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div><span className="text-gray-400 block">Registered Email Endpoint</span><span className="font-bold text-gray-800">yusuf@cropnexa.com</span></div>
              <div><span className="text-gray-400 block">Assigned Cellular Link</span><span className="font-bold text-gray-800">+234 803 000 0000</span></div>
            </div>
          </div>
        );

      case 'Settings':
        return (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Workspace Configurations</h3>
              <p className="text-xs text-gray-400">Manage system behaviors, telemetry frequencies, and alert thresholds.</p>
            </div>
            <div className="space-y-4 divide-y divide-gray-50 text-xs text-gray-700">
              <div className="flex justify-between items-center py-3">
                <div><span className="font-bold block text-gray-900">Real-Time Sync Infrastructure</span><span className="text-gray-400 text-[11px]">Keep radar components updating automatically every 5 mins.</span></div>
                <input type="checkbox" defaultChecked className="accent-[#15803D] rounded w-4 h-4" />
              </div>
              <div className="flex justify-between items-center py-3 pt-4">
                <div><span className="font-bold block text-gray-900">High-Risk SMS Alerts Relay</span><span className="text-gray-400 text-[11px]">Forward severe precipitation data directly to the cellular network line.</span></div>
                <input type="checkbox" defaultChecked className="accent-[#15803D] rounded w-4 h-4" />
              </div>
            </div>
          </div>
        );

      default:
        return <div className="text-center text-xs text-gray-400 py-12">Component workflow rendering failure.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex text-gray-800 antialiased font-sans">
      
      {/* FIXED DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-100 fixed inset-y-0 left-0 z-30">
        <div className="h-20 flex items-center px-6 border-b border-gray-50 space-x-2">
          <span className="text-2xl">🌾</span>
          <span className="font-extrabold text-xl tracking-tight text-gray-900">Crop<span className="text-[#15803D]">Nexa</span></span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                activeTab === item.name 
                  ? 'bg-green-50 text-[#15803D]' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-base transition-transform group-hover:scale-110 duration-200">{item.icon}</span>
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="bg-[#15803D] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{item.badge}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-50">
          <button onClick={() => { if(setScreen) setScreen('home'); }} className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors">
            <span>🚪</span> <span>Logout Terminal</span>
          </button>
        </div>
      </aside>

      {/* MOBILE SIDEBAR DRAWER */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsMobileSidebarOpen(false)} />
          <div className="relative w-64 max-w-sm bg-white h-full flex flex-col z-10">
            <div className="h-20 flex items-center px-6 justify-between border-b border-gray-50">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🌾</span>
                <span className="font-extrabold text-xl text-gray-900">Crop<span className="text-[#15803D]">Nexa</span></span>
              </div>
              <button onClick={() => setIsMobileSidebarOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => { setActiveTab(item.name); setIsMobileSidebarOpen(false); }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold ${
                    activeTab === item.name ? 'bg-green-50 text-[#15803D]' : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3"><span>{item.icon}</span> <span>{item.name}</span></div>
                  {item.badge && <span className="bg-[#15803D] text-white text-[10px] px-2 py-0.5 rounded-full">{item.badge}</span>}
                </button>
              ))}
            </nav>
            <div className="p-4 border-t border-gray-50">
              <button onClick={() => { if(setScreen) setScreen('home'); }} className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl">
                <span>🚪</span> <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN APP WORKSPACE */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        
        {/* TOP BAR BRAND CRADLE */}
        <header className="h-20 bg-white border-b border-gray-100 sticky top-0 z-20 flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsMobileSidebarOpen(true)} className="lg:hidden text-gray-600 hover:text-gray-900 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-gray-900">Good Morning, Yusuf 👋</h2>
              <p className="text-[10px] sm:text-xs text-gray-400 font-medium">Monday, July 6, 2026 • 📍 Potiskum, Yobe</p>
            </div>
          </div>

          <div className="flex-1 max-w-xs sm:max-w-md mx-2 sm:mx-8">
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">🔍</span>
              <input 
                type="text" 
                placeholder="Search metrics..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#15803D] focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <button onClick={() => setActiveTab('Notifications')} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl relative">
              <span>🔔</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => setActiveTab('Profile')}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-green-700 to-emerald-800 text-white font-bold flex items-center justify-center text-xs shadow-sm">YA</div>
            </div>
          </div>
        </header>

        {/* WORKSPACE CONTENT HUB */}
        <main className="flex-1 p-4 sm:p-8 space-y-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {renderTabContent()}
        </main>

        <footer className="h-16 bg-white border-t border-gray-100 px-4 sm:px-8 flex items-center justify-between text-[11px] font-semibold text-gray-400 mt-auto">
          <div>&copy; 2026 CropNexa Technologies Inc.</div>
          <div className="hidden sm:block text-gray-300">Smart Agriculture Management Layout Core v2.4.0</div>
        </footer>

      </div>

    </div>
  );
}