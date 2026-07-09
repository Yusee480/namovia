import React, { useState, useEffect } from 'react';
import { FaEye, FaTrash, FaUserLock, FaCheckCircle, FaSearch, FaUserPlus, FaTimes, FaUsers, FaUserCheck, FaUserSlash } from 'react-icons/fa';

export default function Farmers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State synchronized with localStorage ledger structures
  const [farmers, setFarmers] = useState([]);

  // Seed local component nodes from global localStorage on mount
  useEffect(() => {
    const storedFarmers = localStorage.getItem('allFarmersData');
    if (storedFarmers) {
      try {
        const parsed = JSON.parse(storedFarmers);
        // Normalize structure if keys are packed differently by Auth pipelines
        const formatted = parsed.map((item, index) => {
          if (item.location && !item.lga) {
            const parts = item.location.split(', ');
            return {
              id: item.id || `NX-${Date.now()}-${index}`,
              name: item.name || item.fullName,
              email: item.email,
              phone: item.phone || 'N/A',
              state: parts[1] || 'Yobe',
              lga: parts[0] || 'Unknown',
              type: item.type || 'Commercial Grain',
              date: item.joined || item.date || new Date().toISOString().split('T')[0],
              status: item.status || 'Active'
            };
          }
          return {
            ...item,
            id: item.id || Date.now() + index,
            name: item.name || item.fullName,
            phone: item.phone || 'N/A',
            type: item.type || 'Commercial Grain',
            date: item.date || new Date().toISOString().split('T')[0],
            status: item.status || 'Active'
          };
        });
        setFarmers(formatted);
      } catch (e) {
        console.error("Error parsing structural cluster registers:", e);
      }
    } else {
      // Fallback base metrics seed if database ledger is blank
      const defaultMvp = [
        { id: 1, name: 'Adamu Haruna', email: 'haruna@potiskum.ng', phone: '+234 803 111 2222', state: 'Yobe', lga: 'Potiskum', type: 'Commercial Grain', date: '2026-07-02', status: 'Active' },
        { id: 2, name: 'Fatima Bukar', email: 'fatima@damaturu.ng', phone: '+234 806 333 4444', state: 'Yobe', lga: 'Damaturu', type: 'Legume Hybrid Rotation', date: '2026-06-28', status: 'Suspended' },
        { id: 3, name: 'Ibrahim Musa', email: 'musa@geidam.ng', phone: '+234 809 555 6666', state: 'Yobe', lga: 'Geidam', type: 'Irrigated Cash Crops', date: '2026-06-15', status: 'Active' },
      ];
      setFarmers(defaultMvp);
      localStorage.setItem('allFarmersData', JSON.stringify(defaultMvp));
    }
  }, []);

  // Form Registration State Engine
  const [newFarmer, setNewFarmer] = useState({
    name: '', email: '', phone: '', state: 'Yobe', lga: '', type: 'Commercial Grain'
  });

  // Dynamic Metrics Processing
  const totalFarmers = farmers.length;
  const activeFarmers = farmers.filter(f => f.status === 'Active').length;
  const suspendedFarmers = farmers.filter(f => f.status === 'Suspended').length;

  // Global persistence handler utility
  const updateGlobalRegistry = (updatedList) => {
    setFarmers(updatedList);
    localStorage.setItem('allFarmersData', JSON.stringify(updatedList));
  };

  const toggleStatus = (id) => {
    const updated = farmers.map(f => f.id === id ? { ...f, status: f.status === 'Active' ? 'Suspended' : 'Active' } : f);
    updateGlobalRegistry(updated);
  };

  const deleteFarmer = (id) => {
    if (window.confirm('Purge this record from system registers?')) {
      const updated = farmers.filter(f => f.id !== id);
      updateGlobalRegistry(updated);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!newFarmer.name || !newFarmer.lga) return alert('Please input mandatory fields.');
    
    const record = {
      id: `NX-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newFarmer.name,
      email: newFarmer.email.trim().toLowerCase(),
      phone: newFarmer.phone || 'N/A',
      state: newFarmer.state,
      lga: newFarmer.lga,
      location: `${newFarmer.lga}, ${newFarmer.state}`, // Backward compatibility match
      type: newFarmer.type,
      date: new Date().toISOString().split('T')[0],
      joined: new Date().toISOString().split('T')[0], // Sync key match with Auth layout
      status: 'Active',
      timestamp: new Date().toISOString()
    };

    const updatedList = [record, ...farmers];
    updateGlobalRegistry(updatedList);
    
    setIsModalOpen(false);
    setNewFarmer({ name: '', email: '', phone: '', state: 'Yobe', lga: '', type: 'Commercial Grain' });
  };

  // Dual-layer Pipeline Processing (Search + Status Tabs)
  const filteredFarmers = farmers.filter(f => {
    const matchesSearch = (f.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (f.lga || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (f.type || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || f.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* MVP METRIC SUB-SYSTEM LAYER */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 border border-slate-100 dark:border-slate-700 rounded-xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Total Operators</p>
            <h4 className="text-xl font-black font-mono text-slate-900 dark:text-white mt-1">{totalFarmers}</h4>
          </div>
          <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/30 text-blue-600 rounded-lg flex items-center justify-center text-sm"><FaUsers /></div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 border border-slate-100 dark:border-slate-700 rounded-xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Active Nodes</p>
            <h4 className="text-xl font-black font-mono text-green-600 mt-1">{activeFarmers}</h4>
          </div>
          <div className="w-10 h-10 bg-green-50 dark:bg-green-950/30 text-green-600 rounded-lg flex items-center justify-center text-sm"><FaUserCheck /></div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 border border-slate-100 dark:border-slate-700 rounded-xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Suspended Registries</p>
            <h4 className="text-xl font-black font-mono text-red-500 mt-1">{suspendedFarmers}</h4>
          </div>
          <div className="w-10 h-10 bg-red-50 dark:bg-red-950/30 text-red-500 rounded-lg flex items-center justify-center text-sm"><FaUserSlash /></div>
        </div>
      </div>

      {/* CORE CONTROL HUB */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">Farmers Identity Management</h3>
            <p className="text-xs text-slate-400">Verify, structure roles, restrict system entry nodes, or audit farmer profiles.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* TAB SELECTORS */}
            <div className="bg-slate-100 dark:bg-slate-700 p-1 rounded-xl flex space-x-1">
              {['All', 'Active', 'Suspended'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
                  className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-all ${statusFilter === tab ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-xs' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* SEARCH ROUTER */}
            <div className="relative">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input 
                type="text" 
                placeholder="Search registers..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-56 border border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-green-700 focus:border-green-700 text-slate-900 dark:text-white"
              />
            </div>

            {/* MODAL TRIGGER BUTTON */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-green-700 hover:bg-green-800 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <FaUserPlus /> Enlist Operator
            </button>
          </div>
        </div>

        {/* LEDGER DATA TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                <th className="py-3 px-4">Operator Name</th>
                <th className="py-3 px-4">Contact Routing</th>
                <th className="py-3 px-4">Geographic Node</th>
                <th className="py-3 px-4">Cultivation Strategy</th>
                <th className="py-3 px-4">Enlistment Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-700 text-slate-700 dark:text-slate-300 font-medium font-mono">
              {filteredFarmers.length > 0 ? (
                filteredFarmers.map((f) => (
                  <tr key={f.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="py-4 px-4 font-bold text-slate-900 dark:text-white font-sans">{f.name}</td>
                    <td className="py-4 px-4 space-y-0.5">
                      <span className="block text-slate-800 dark:text-slate-200">{f.email || 'N/A'}</span>
                      <span className="block text-[10px] text-slate-400">{f.phone || 'N/A'}</span>
                    </td>
                    <td className="py-4 px-4">{f.state} ({f.lga})</td>
                    <td className="py-4 px-4 font-sans text-xs text-slate-500 dark:text-slate-400">{f.type}</td>
                    <td className="py-4 px-4">{f.date}</td>
                    <td className="py-4 px-4">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${f.status === 'Active' ? 'bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-400' : 'bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-400'}`}>
                        {f.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right space-x-1.5 font-sans">
                      <button onClick={() => alert(`Reading dataset profile: ${f.name}\nLocation: ${f.lga}, ${f.state}\nStrategy: ${f.type}`)} className="p-2 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg text-slate-600 dark:text-slate-300 transition-colors inline-flex" title="View Grid"><FaEye /></button>
                      <button onClick={() => toggleStatus(f.id)} className={`p-2 rounded-lg text-white transition-colors inline-flex ${f.status === 'Active' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-green-600 hover:bg-green-700'}`} title="Toggle Status">{f.status === 'Active' ? <FaUserLock /> : <FaCheckCircle />}</button>
                      <button onClick={() => deleteFarmer(f.id)} className="p-2 bg-red-50 dark:bg-red-950 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg text-red-600 dark:text-red-400 transition-colors inline-flex" title="Purge Record"><FaTrash /></button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-slate-400 italic">
                    No matching farmer parameters registered in this sector cluster.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* REGISTRATION MODAL FORM INTERFACE */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-scaleUp">
            <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">Initialize New Operator Hub</h4>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-sm"><FaTimes /></button>
            </div>
            <form onSubmit={handleRegister} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wide text-[10px]">Operator Full Name *</label>
                <input required type="text" value={newFarmer.name} onChange={(e) => setNewFarmer({...newFarmer, name: e.target.value})} className="w-full border border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-700 rounded-lg p-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-green-700" placeholder="e.g. Adamu Haruna" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wide text-[10px]">Email Address</label>
                  <input type="email" value={newFarmer.email} onChange={(e) => setNewFarmer({...newFarmer, email: e.target.value})} className="w-full border border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-700 rounded-lg p-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-green-700" placeholder="name@domain.ng" />
                </div>
                <div>
                  <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wide text-[10px]">Phone Number</label>
                  <input type="text" value={newFarmer.phone} onChange={(e) => setNewFarmer({...newFarmer, phone: e.target.value})} className="w-full border border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-700 rounded-lg p-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-green-700" placeholder="+234..." />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wide text-[10px]">State Node</label>
                  <input disabled type="text" value={newFarmer.state} className="w-full border border-slate-200 dark:border-slate-600 bg-slate-100 dark:bg-slate-600 rounded-lg p-2.5 text-slate-400 dark:text-slate-300 font-mono cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wide text-[10px]">LGA Hub *</label>
                  <input required type="text" value={newFarmer.lga} onChange={(e) => setNewFarmer({...newFarmer, lga: e.target.value})} className="w-full border border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-700 rounded-lg p-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-green-700" placeholder="e.g. Potiskum" />
                </div>
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wide text-[10px]">Cultivation Strategy Array</label>
                <select value={newFarmer.type} onChange={(e) => setNewFarmer({...newFarmer, type: e.target.value})} className="w-full border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 rounded-lg p-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-green-700">
                  <option>Commercial Grain</option>
                  <option>Legume Hybrid Rotation</option>
                  <option>Irrigated Cash Crops</option>
                </select>
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-slate-200 dark:border-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl font-bold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-xl font-bold">Register Array</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}