import React, { useState } from 'react';
import { 
  FaMapMarkerAlt, 
  FaHandshake, 
  FaComments, 
  FaSeedling, 
  FaPlus, 
  FaPaperPlane, 
  FaBars, 
  FaTimes, 
  FaSearch, 
  FaUser, 
  FaLock, 
  FaSave 
} from 'react-icons/fa';


// ==========================================
// SUB-COMPONENT: CROPS RECOMMENDATIONS
// ==========================================
function Crops() {
  const [soilType, setSoilType] = useState('Loamy');
  const [region, setRegion] = useState('Northern Savanna');
  const [moisture, setMoisture] = useState('Medium');
  
  // New State to hold recommendations after submission
  const [computedRecommendations, setComputedRecommendations] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmitQuiz = (e) => {
    e.preventDefault();
    
    // Matrix simulation matching user zone parameters
    let baseMatchModifier = region === 'Northern Savanna' ? 5 : -3;
    if (soilType === 'Loamy' && moisture === 'Medium') baseMatchModifier += 4;

    const calculatedMatrix = [
      { crop: 'Sorgo / Sorghum', match: `${Math.min(99, 90 + baseMatchModifier)}%`, cycle: '110 Days', spacing: '75x20 cm', watering: 'Moderate' },
      { crop: 'Cowpeas (Beans)', match: `${Math.min(99, 88 + baseMatchModifier)}%`, cycle: '85 Days', spacing: '60x30 cm', watering: 'Low' },
      { crop: 'Groundnuts', match: `${Math.min(99, 85 + baseMatchModifier)}%`, cycle: '120 Days', spacing: '45x15 cm', watering: 'Low' },
      { crop: 'Soybeans', match: `${Math.min(99, 81 + baseMatchModifier)}%`, cycle: '105 Days', spacing: '50x10 cm', watering: 'High' }
    ];

    setComputedRecommendations(calculatedMatrix);
    setHasSubmitted(true);
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-6 animate-fadeIn">
      <div>
        <h3 className="text-base font-black text-slate-800 uppercase tracking-wider">Crop Recommendation Engine</h3>
        <p className="text-xs text-slate-400">Configure your parameters below to compute live matrix alignments for your micro-zone.</p>
      </div>

      {/* FORM INTERACTION MATRIX */}
      <form onSubmit={handleSubmitQuiz} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Soil Type Classification</label>
            <select value={soilType} onChange={e => setSoilType(e.target.value)} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-emerald-700">
              <option value="Loamy">Loamy</option>
              <option value="Sandy">Sandy</option>
              <option value="Clay-Heavy">Clay-Heavy</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Geographic Aggregation Region (Your Zone)</label>
            <select value={region} onChange={e => setRegion(e.target.value)} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-emerald-700">
              <option value="Northern Savanna">Northern Savanna</option>
              <option value="Southern Rainforest">Southern Rainforest</option>
              <option value="Central Middle Belt">Central Middle Belt</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Moisture Index Target</label>
            <select value={moisture} onChange={e => setMoisture(e.target.value)} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-emerald-700">
              <option value="Low">Low (Arid)</option>
              <option value="Medium">Medium</option>
              <option value="High">High (Irrigated)</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm">
            Compute Matrix Alignment
          </button>
        </div>
      </form>

      {/* CONDITIONAL RENDERED RESULTS LAYER */}
      {hasSubmitted ? (
        <div className="space-y-3 pt-2 border-t border-slate-50">
          <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Computed Metrics for Zone: <span className="text-slate-700">{region}</span></h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {computedRecommendations.map((item, idx) => (
              <div key={idx} className="p-4 border border-slate-100 bg-slate-50/50 rounded-xl flex justify-between items-start animate-fadeIn">
                <div className="space-y-1">
                  <p className="text-xs font-black text-slate-800">{item.crop}</p>
                  <div className="text-[10px] text-slate-400 space-y-0.5 font-medium">
                    <p>Growth Cycle: {item.cycle}</p>
                    <p>Spatial Arrangement: {item.spacing}</p>
                    <p>Water Profile: {item.watering}</p>
                  </div>
                </div>
                <span className="bg-emerald-50 text-emerald-800 font-mono text-xs font-black px-2.5 py-1 rounded-lg border border-emerald-100">{item.match}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-6 border border-dashed border-slate-200 rounded-xl text-center text-xs text-slate-400 font-medium bg-slate-50/30">
          Select parameters above and run the execution engine to view local yield recommendations.
        </div>
      )}
    </div>
  );
}
function ProfileSettings({ profileData, onSaveProfile }) {
  const [form, setForm] = useState({
    fullName: profileData.fullName,
    email: profileData.email,
    phone: profileData.phone,
    address: profileData.address,
    avatarUrl: profileData.avatarUrl
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Process selected local picture asset files
  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const inlineUrl = URL.createObjectURL(file);
      setForm(prev => ({ ...prev, avatarUrl: inlineUrl }));
    }
  };

  const handleUpdateInfo = (e) => {
    e.preventDefault();
    onSaveProfile(form);
    alert('Enterprise profile properties saved successfully.');
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Validation Error: Target passwords mismatch.');
      return;
    }
    alert('Security node password successfully updated.');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
      {/* AVATAR INTERFACE BLOCK */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-green-700 to-emerald-950 text-white font-black text-2xl flex items-center justify-center shadow-md overflow-hidden relative group">
          {form.avatarUrl ? (
            <img src={form.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            form.fullName.charAt(0)
          )}
        </div>
        
        <div className="space-y-1 w-full">
          <label className="cursor-pointer inline-block bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors w-full max-w-[180px]">
            <span>Upload Image File</span>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageFileChange} 
            />
          </label>
          <p className="text-[9px] text-slate-400">Supports PNG, JPG assets</p>
        </div>

        <div className="w-full border-t border-slate-100 pt-3">
          <h3 className="font-black text-slate-800 text-sm tracking-tight">{form.fullName}</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Verified Node Operator</p>
        </div>
      </div>

      {/* TEXT PARAMETERS AND SETTINGS MATRICES */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
            <FaUser className="text-slate-400 text-xs" />
            <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Profile Information Matrix</h3>
          </div>
          <form onSubmit={handleUpdateInfo} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Legal Full Name</label>
              <input type="text" value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-700" required />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Primary Email Address</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-700" required />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Telecom Access Node</label>
              <input type="text" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-700" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Direct URL Link Route Override</label>
              <input type="text" value={form.avatarUrl} onChange={e => setForm({ ...form, avatarUrl: e.target.value })} placeholder="Or parse web image url links directly..." className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-700" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Physical Operational Base Address</label>
              <input type="text" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-700" />
            </div>
            <div className="sm:col-span-2 pt-2">
              <button type="submit" className="bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-emerald-800 transition-all flex items-center space-x-1.5">
                <FaSave className="text-[11px]" /> <span>Save Profile Properties</span>
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
            <FaLock className="text-slate-400 text-xs" />
            <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Credential Modification Gate</h3>
          </div>
          <form onSubmit={handleUpdatePassword} className="space-y-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Current Active Key</label>
              <input type="password" value={passwordForm.currentPassword} onChange={e => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-700" required />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Target Account Key Phrase</label>
                <input type="password" value={passwordForm.newPassword} onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-700" required />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Confirm Target Account Key Phrase</label>
                <input type="password" value={passwordForm.confirmPassword} onChange={e => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-700" required />
              </div>
            </div>
            <button type="submit" className="bg-slate-900 text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-black transition-all">
              Commit Credential Matrix Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}// ==========================================
// SUB-COMPONENT: FALLBACK TAB MODULE
// ==========================================
function FallbackTab({ tabName }) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-8 text-center space-y-3 shadow-sm min-h-[300px] flex flex-col items-center justify-center animate-fadeIn">
      <span className="text-4xl">🛠️</span>
      <div>
        <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">{tabName} Engine Stack</h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
          This feature module is running structural logic analytics. Live optimization feeds are connecting to database pipelines shortly.
        </p>
      </div>
    </div>
  );
}

// ==========================================
// MAIN COMPONENT: ENTERPRISE DASHBOARD
// ==========================================
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // USER PROFILE ROOT INFRASTRUCTURE
  const [profile, setProfile] = useState({
    fullName: 'Mustapha Gidado',
    email: 'm.gidado@cropnexa.internal',
    phone: '+234 803 123 4567',
    address: 'Potiskum Agro Hub, Section 4, Yobe State, Nigeria',
    avatarUrl: ''
  });

  // CORE APPLICATION INFRASTRUCTURE ARRAYS
  const [farms, setFarms] = useState([
    { id: 1, name: 'Potiskum North Array A', size: '5.2 Hectares', crop: 'Sorgo / Sorghum', region: 'Yobe Sector Alpha' },
    { id: 2, name: 'Fika Road Outskirts', size: '2.8 Hectares', crop: 'Cowpeas', region: 'Yobe Sector Beta' }
  ]);

  const [newFarm, setNewFarm] = useState({ name: '', size: '', crop: '', region: '' });

  const [chatRooms, setChatRooms] = useState({
    'General Agronomy': [
      { sender: 'Alhaji Bukar', text: 'Sorghum wholesale rates are climbing in Gombe local aggregators.', self: false, time: '10 mins ago' },
      { sender: 'Dr. Chidi', text: 'Ensure phosphate calibration is applied prior to early morning humidity spike.', self: false, time: '5 mins ago' }
    ],
    'Market Escrow Pipeline': [
      { sender: 'System Engine', text: 'Secured smart trading matrices initialized for Northern logistics routes.', self: false, time: '1 hour ago' }
    ],
    'Logistics Dispatch Hub': [
      { sender: 'Driver Node 09', text: 'Truck fully provisioned for the Damaturu bypass route.', self: false, time: '23 mins ago' }
    ]
  });

  const [activeChannel, setActiveChannel] = useState('General Agronomy');
  const [typedMessage, setTypedMessage] = useState('');

  // TRANSACTIONAL PARAMETERS & MARKET BOARD ARRAYS
  const [marketData] = useState([
    { id: 1, crop: 'White Sorghum Matrix', seller: 'Borno Grain Alliance', market: 'Maiduguri Hub C', price: 42000 },
    { id: 2, crop: 'Premium Cowpeas Bundle', seller: 'Yobe Tech Farm Co', market: 'Potiskum Central Index', price: 58000 },
    { id: 3, crop: 'Soybean High-Yield Extract', seller: 'Gombe Aggregate Spore', market: 'Gombe Inter-State Vault', price: 61000 }
  ]);

  const [tradeStep, setTradeStep] = useState('browse'); // States: browse, negotiate, escrow
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [orderQuantity, setOrderQuantity] = useState(1);

  // LOGICAL HANDLERS FOR FORMS & DISPATCH FEEDS
  const handleAddFarm = (e) => {
    e.preventDefault();
    if (!newFarm.name || !newFarm.size) return;
    setFarms([...farms, { id: Date.now(), ...newFarm }]);
    setNewFarm({ name: '', size: '', crop: '', region: '' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;
    const currentRoomMsg = chatRooms[activeChannel] || [];
    setChatRooms({
      ...chatRooms,
      [activeChannel]: [...currentRoomMsg, { sender: 'You', text: typedMessage, self: true, time: 'Now' }]
    });
    setTypedMessage('');
  };

  const menuItems = [
    { name: 'Dashboard', icon: '🏠' },
    { name: 'Weather Forecast', icon: '🌤' },
    { name: 'Crop Recommendations', icon: '🌱' },
    { name: 'Fertilizer Guide', icon: '🧪' },
    { name: 'Pest & Disease', icon: '🪲' },
    { name: 'Market Prices', icon: '💰' },
    { name: 'Farm Locations', icon: '📍' },
    { name: 'Notifications', icon: '💬', badge: 'Live' },
    { name: 'Profile', icon: '👤' }
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <div className="space-y-6 animate-fadeIn">
            {/* HERO HERO COMPONENT SECTION */}
            <div className="bg-gradient-to-br from-green-800 via-emerald-800 to-slate-900 rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden text-white border border-emerald-700/30">
              <div className="relative z-10 max-w-2xl space-y-4">
                <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider rounded-full text-green-300 border border-white/10">Active System Session</span>
                <h1 className="text-2xl sm:text-4xl font-black tracking-tight">Welcome, {profile.fullName.split(' ')[0]} 👋</h1>
                <p className="text-sm text-green-100/80 leading-relaxed">
                  Real-time analytics for your enterprise cultivation arrays. Review micro-nutrient calibrations and live market updates down below.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button onClick={() => setActiveTab('Crop Recommendations')} className="bg-yellow-400 text-slate-950 text-xs font-black px-4 py-2.5 rounded-xl hover:bg-yellow-300 transition-all shadow-sm">Launch Recommendations</button>
                  <button onClick={() => setActiveTab('Farm Locations')} className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-white/10 transition-all">Add Your Land</button>
                </div>
              </div>
            </div>

            {/* QUICK LINK CARD MODULES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Registered Land', value: `${farms.length} Plots`, desc: 'Active farming arrays', icon: <FaMapMarkerAlt className="text-emerald-600" />, color: 'bg-emerald-50' },
                { title: 'Market Listings', value: `${marketData.length} Open`, desc: 'B2B Procurement pipelines', icon: <FaHandshake className="text-blue-600" />, color: 'bg-blue-50' },
                { title: 'Peer Channels', value: `${Object.keys(chatRooms).length} Active`, desc: 'Live trader interactions', icon: <FaComments className="text-amber-600" />, color: 'bg-amber-50' },
                { title: 'Crop Recommendations', value: '94% Match', desc: 'Optimal yield matrix', icon: <FaSeedling className="text-purple-600" />, color: 'bg-purple-50' },
              ].map((card, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{card.title}</span>
                      <p className="text-xl font-black text-slate-800 tracking-tight mt-0.5">{card.value}</p>
                    </div>
                    <div className={`p-2 rounded-xl ${card.color}`}>{card.icon}</div>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium mt-3">{card.desc}</p>
                </div>
              ))}
            </div>

            {/* SUMMARY ACTION BRIDGES */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Active Land Footprint</h3>
                <div className="space-y-2">
                  {farms.map(f => (
                    <div key={f.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center text-xs">
                      <div>
                        <p className="font-bold text-slate-800">{f.name}</p>
                        <p className="text-[10px] text-slate-400">{f.region} • <span className="text-emerald-700 font-medium">{f.crop}</span></p>
                      </div>
                      <span className="font-mono bg-white px-2 py-1 rounded border text-slate-700 font-bold">{f.size}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-2">Instant Trade Initiation Bridge</h3>
                <p className="text-xs text-slate-500 mb-4">Select the Market Prices tab to select an index payload, choose a secure contract matrix volume, and process direct buy/sell arrangements instantly.</p>
                <button onClick={() => setActiveTab('Market Prices')} className="w-full bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl hover:bg-emerald-800 transition-colors">Launch Procurement Board</button>
              </div>
            </div>
          </div>
        );

      case 'Farm Locations':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
            {/* FARM REGISTRATION FORM */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-800">Register New Farm Plot</h3>
                <p className="text-xs text-slate-400">Map your custom acreage, spatial footprint parameters, and target crop setups.</p>
              </div>
              <form onSubmit={handleAddFarm} className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Plot Identification Label</label>
                  <input type="text" placeholder="e.g. Potiskum North Array C" value={newFarm.name} onChange={e => setNewFarm({...newFarm, name: e.target.value})} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-700" required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Size (Hectares/Acres)</label>
                    <input type="text" placeholder="e.g. 4.5 Hectares" value={newFarm.size} onChange={e => setNewFarm({...newFarm, size: e.target.value})} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-700" required />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Target Cultivation Crop</label>
                    <input type="text" placeholder="e.g. Soybeans" value={newFarm.crop} onChange={e => setNewFarm({...newFarm, crop: e.target.value})} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-700" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Regional Coordinate Area</label>
                  <input type="text" placeholder="e.g. Yobe North Outskirts" value={newFarm.region} onChange={e => setNewFarm({...newFarm, region: e.target.value})} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-700" />
                </div>
                <button type="submit" className="w-full bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl flex items-center justify-center space-x-1 hover:bg-emerald-800 transition-colors">
                  <FaPlus className="text-[10px]" /> <span>Commit Field Matrix</span>
                </button>
              </form>
            </div>

            {/* PLOT INVENTORY VIEWPORT */}
            <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-800">Your Declared Land Inventory</h3>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded border">{farms.length} Registers Active</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {farms.map(f => (
                  <div key={f.id} className="p-4 border border-slate-100 bg-slate-50/50 rounded-xl space-y-2 relative group hover:border-emerald-700/40 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-base">🗺️</span>
                        <h4 className="font-bold text-xs text-slate-800">{f.name}</h4>
                      </div>
                      <span className="text-[10px] font-mono bg-white font-bold text-emerald-800 px-2 py-0.5 rounded border">{f.size}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 space-y-0.5">
                      <p><span className="font-medium text-slate-400">Crop Profile:</span> {f.crop || 'Unassigned Matrix'}</p>
                      <p><span className="font-medium text-slate-400">Geographic Grid:</span> {f.region || 'Unknown Coordinates'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'Notifications':
        return (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm min-h-[480px] grid grid-cols-1 md:grid-cols-3 overflow-hidden animate-fadeIn">
            {/* CHANNELS PANEL */}
            <div className="border-r border-slate-100 p-4 bg-slate-50/50 space-y-3">
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Agronomic Channels</h3>
              <div className="space-y-1">
                {Object.keys(chatRooms).map(roomName => (
                  <button key={roomName} onClick={() => setActiveChannel(roomName)} className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${activeChannel === roomName ? 'bg-emerald-50 text-emerald-700' : 'text-slate-500 hover:bg-slate-100'}`}>
                    <span>💬</span>
                    <span className="truncate">{roomName}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* LIVE CONVERSATION TIMELINE */}
            <div className="md:col-span-2 flex flex-col justify-between h-[480px]">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
                <div>
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">#{activeChannel}</h4>
                  <p className="text-[10px] text-slate-400">P2P discussion room for verified users & trade aggregators</p>
                </div>
              </div>

              {/* BUBBLE FEED */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/30">
                {(chatRooms[activeChannel] || []).map((msg, i) => (
                  <div key={i} className={`flex flex-col max-w-[75%] ${msg.self ? 'ml-auto items-end' : 'mr-auto items-start'}`}>
                    <span className="text-[9px] font-bold text-slate-400 mb-0.5 px-1">{msg.sender}</span>
                    <div className={`p-3 rounded-2xl text-xs ${msg.self ? 'bg-slate-900 text-white rounded-tr-none' : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none shadow-sm'}`}>
                      <p>{msg.text}</p>
                    </div>
                    <span className="text-[9px] text-slate-300 mt-0.5 px-1 font-mono">{msg.time}</span>
                  </div>
                ))}
              </div>

              {/* CHAT INPUT MATRIX CONTAINER */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 bg-white flex items-center space-x-2">
                <input type="text" placeholder={`Transmit data chunk into #${activeChannel}...`} value={typedMessage} onChange={e => setTypedMessage(e.target.value)} className="flex-1 border border-slate-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-emerald-700 text-slate-800" />
                <button type="submit" className="bg-emerald-700 hover:bg-emerald-800 text-white p-2.5 rounded-xl transition-colors"><FaPaperPlane className="text-xs" /></button>
              </form>
            </div>
          </div>
        );

      case 'Market Prices':
        return (
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="text-base font-black text-slate-800 uppercase tracking-wider">Direct Buyer-Seller Settlement Board</h3>
                <p className="text-xs text-slate-400">Initiate trade escrow contracts directly matching regional agricultural commodities.</p>
              </div>
              <div className="flex items-center space-x-1.5 self-start">
                <span className={`w-2 h-2 rounded-full ${tradeStep !== 'browse' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-slate-500">Engine State: {tradeStep}</span>
              </div>
            </div>

            {tradeStep === 'browse' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold">
                      <th className="py-2 pr-3">Product Name</th>
                      <th className="py-2 px-3">Producer Entity</th>
                      <th className="py-2 px-3">Logistics Hub</th>
                      <th className="py-2 px-3">Price / Unit</th>
                      <th className="py-2 pl-3 text-right">Action Engine</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-slate-700 font-medium">
                    {marketData.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 pr-3 font-bold text-slate-900">{row.crop}</td>
                        <td className="py-3 px-3 text-slate-500">{row.seller}</td>
                        <td className="py-3 px-3 font-mono text-slate-400">{row.market}</td>
                        <td className="py-3 px-3 font-black text-slate-800 font-mono">₦{row.price.toLocaleString()}</td>
                        <td className="py-3 pl-3 text-right">
                          <button onClick={() => { setSelectedOffer(row); setTradeStep('negotiate'); }} className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-[11px] px-3 py-1.5 rounded-lg transition-colors inline-flex items-center space-x-1">
                            <FaHandshake /> <span>Initiate Buy Contract</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {tradeStep === 'negotiate' && selectedOffer && (
              <div className="p-4 border border-slate-100 rounded-xl bg-slate-50/50 space-y-4 max-w-xl mx-auto animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">Contract Blueprint Setup</h4>
                  <button onClick={() => setTradeStep('browse')} className="text-slate-400 text-xs hover:text-slate-600">Cancel</button>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block font-medium">Target Asset:</span>
                    <span className="font-bold text-slate-800">{selectedOffer.crop}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Counterparty Seller:</span>
                    <span className="font-bold text-slate-800">{selectedOffer.seller}</span>
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase">Volume Requirements (Bags of Produce)</label>
                  <input type="number" min="1" value={orderQuantity} onChange={e => setOrderQuantity(parseInt(e.target.value) || 1)} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-700 bg-white" />
                </div>

                <div className="p-3 bg-white border rounded-xl flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-500 font-bold">Total Estimated Escrow:</span>
                  <span className="font-black text-slate-900 text-sm">₦{(selectedOffer.price * orderQuantity).toLocaleString()}</span>
                </div>

                <button onClick={() => setTradeStep('escrow')} className="w-full bg-slate-900 hover:bg-black text-white font-bold text-xs py-2.5 rounded-xl transition-colors">
                  Deploy Secure Escrow Contract Matrix
                </button>
              </div>
            )}

            {tradeStep === 'escrow' && selectedOffer && (
              <div className="p-6 border border-emerald-100 rounded-xl bg-emerald-50/30 text-center max-w-md mx-auto space-y-4 animate-fadeIn">
                <span className="text-3xl block">🛡️</span>
                <div>
                  <h4 className="font-black text-sm text-emerald-950 uppercase tracking-wider">Escrow Transaction Seed Synchronized</h4>
                  <p className="text-xs text-emerald-800/80 mt-1">
                    A total value allocation of <strong>₦{(selectedOffer.price * orderQuantity).toLocaleString()}</strong> has been initiated between your buyer profile and <strong>{selectedOffer.seller}</strong>.
                  </p>
                </div>
                <div className="text-[10px] bg-white border border-emerald-100 rounded-xl p-3 text-left space-y-1 font-mono text-slate-500">
                  <p>• Transacting Hash: TX-M4Z-{Math.floor(Math.random() * 90000 + 10000)}</p>
                  <p>• Status: Awaiting Buyer Vault Proofing</p>
                  <p>• Allocation: {orderQuantity} Matrix Bags of {selectedOffer.crop}</p>
                </div>
                <div className="flex space-x-2 pt-2">
                  <button onClick={() => { alert('Escrow payment simulation committed.'); setTradeStep('browse'); }} className="flex-1 bg-emerald-700 text-white font-bold text-xs py-2 rounded-xl hover:bg-emerald-800 transition-colors">Release Funds</button>
                  <button onClick={() => setTradeStep('browse')} className="flex-1 bg-white border text-slate-600 font-bold text-xs py-2 rounded-xl hover:bg-slate-50 transition-colors">Exit Matrix</button>
                </div>
              </div>
            )}
          </div>
        );

      case 'Weather Forecast':
        return (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Advanced Weather Forecast Matrix</h3>
              <p className="text-xs text-gray-400">7-Day radar forecasting models mapped for Potiskum grid infrastructure.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-7 gap-3">
              {[
                { day: 'Mon', temp: '31°', icon: '☀️', pop: '4%' },
                { day: 'Tue', temp: '32°', icon: '☀️', pop: '2%' },
                { day: 'Wed', temp: '29°', icon: '⛅', pop: '15%' },
                { day: 'Thu', temp: '28°', icon: '🌧', pop: '78%' },
                { day: 'Fri', temp: '30°', icon: '⛈', pop: '60%' },
                { day: 'Sat', temp: '32°', icon: '🌤', pop: '10%' },
                { day: 'Sun', temp: '33°', icon: '☀️', pop: '0%' },
              ].map((f, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center space-y-1">
                  <span className="text-xs font-bold text-slate-500 block">{f.day}</span>
                  <span className="text-xl block py-1">{f.icon}</span>
                  <span className="text-sm font-black text-slate-800 block font-mono">{f.temp}</span>
                  <span className="text-[10px] font-bold text-blue-600 block">💧 {f.pop}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Crop Recommendations': 
        return <Crops />;
      case 'Fertilizer Guide':
      case 'Pest & Disease':
        return <FallbackTab tabName={activeTab} />;
      case 'Settings':
      case 'Profile':
        return <ProfileSettings profileData={profile} onSaveProfile={(data) => setProfile(prev => ({ ...prev, ...data }))} />;
      default:
        return <FallbackTab tabName={activeTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-800 antialiased font-sans">
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-100 fixed inset-y-0 left-0 z-30">
        <div className="h-20 flex items-center px-6 border-b border-slate-50 space-x-2">
          <span className="text-xl">🌾</span>
          <span className="font-black text-lg tracking-tight text-slate-900">Crop<span className="text-green-700">Nexa</span></span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {filteredMenuItems.map((item) => (
            <button key={item.name} onClick={() => setActiveTab(item.name)} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all group ${activeTab === item.name ? 'bg-green-50 text-green-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
              <div className="flex items-center space-x-2.5">
                <span className="text-sm group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
                <span>{item.name}</span>
              </div>
              {item.badge && <span className="bg-emerald-700 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">{item.badge}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* MOBILE SIDEBAR WRAPPER */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex animate-fadeIn">
          <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm" onClick={() => setIsMobileSidebarOpen(false)} />
          <aside className="relative flex flex-col w-64 max-w-xs bg-white h-full shadow-xl border-r border-gray-100 z-10 p-4 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b">
              <span className="font-black text-slate-900">CropNexa Menu</span>
              <button onClick={() => setIsMobileSidebarOpen(false)}><FaTimes /></button>
            </div>
            <div className="space-y-1">
              {filteredMenuItems.map((item) => (
                <button key={item.name} onClick={() => { setActiveTab(item.name); setIsMobileSidebarOpen(false); }} className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold block ${activeTab === item.name ? 'bg-green-50 text-green-700' : 'text-slate-500'}`}>
                  {item.icon} <span className="ml-2">{item.name}</span>
                </button>
              ))}
            </div>
          </aside>
        </div>
      )}

      {/* INTERFACE MATRIX */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-20">
          <div className="flex items-center space-x-4 flex-1">
            <button onClick={() => setIsMobileSidebarOpen(true)} className="lg:hidden text-slate-500 hover:bg-slate-50 p-2 rounded-xl"><FaBars /></button>
            <div className="relative max-w-xs w-full hidden sm:block">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input type="text" placeholder="Search system index..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full border border-slate-100 rounded-xl px-9 py-1.5 text-xs bg-slate-50 focus:outline-none focus:border-green-700 transition-colors" />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div onClick={() => setActiveTab('Profile')} className="flex items-center space-x-2.5 cursor-pointer group pl-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-green-700 to-emerald-950 text-white font-black text-xs flex items-center justify-center shadow-sm overflow-hidden">
                {profile.avatarUrl ? <img src={profile.avatarUrl} alt="Nav Avatar" className="w-full h-full object-cover" /> : profile.fullName.charAt(0)}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-black text-slate-900 group-hover:text-green-700 transition-colors">{profile.fullName}</p>
                <p className="text-[10px] text-slate-400 font-medium">Node Admin</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto space-y-6">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}