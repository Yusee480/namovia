import React, { useState } from 'react';
import { FaSearch, FaArrowUp, FaArrowDown, FaBoxes, FaShoppingCart, FaChartLine, FaExclamationTriangle, FaPlusCircle } from 'react-icons/fa';

export default function Markets({ listings, setListings, trends, logSystemEvent }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  
  // Form input states for adding a listing directly to the ecosystem engine
  const [newCrop, setNewCrop] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newMarket, setNewMarket] = useState('');
  const [newTrend, setNewTrend] = useState('Steady Velocity');
  const [isUp, setIsUp] = useState(true);

  // Parse structural elements for metrics calculation
  const totalTrackedElements = listings.length;
  const topFocusIndicator = trends?.commodity || 'No Active Vector';

  const handleCreateListing = (e) => {
    e.preventDefault();
    if (!newCrop || !newPrice || !newMarket) return;

    const freshListing = {
      crop: newCrop,
      price: `₦${Number(newPrice.replace(/[^0-123456789]/g, '')).toLocaleString()}`,
      market: newMarket,
      date: new Date().toISOString().split('T')[0],
      trend: newTrend,
      up: isUp
    };

    setListings([freshListing, ...listings]);
    logSystemEvent('MARKET_INDEX_PUBLISH', `${newCrop} (${newMarket})`, 'SUCCESS');

    // Reset layout fields
    setNewCrop('');
    setNewPrice('');
    setNewMarket('');
  };

  const filteredCommodities = listings.filter(item => {
    const matchesSearch = item.crop.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.market.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Abstracting simple categorization rules from listing naming frameworks
    let itemCat = 'Grains';
    if (item.crop.toLowerCase().includes('beans') || item.crop.toLowerCase().includes('cowpea') || item.crop.toLowerCase().includes('soy')) {
      itemCat = 'Legumes';
    }
    
    const matchesCategory = filterCategory === 'All' || itemCat === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* MARKET METRIC BARS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 border border-slate-100 dark:border-slate-700 rounded-xl flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Tracked Comm.-Index Layers</p>
            <h4 className="text-xl font-black font-mono text-slate-900 dark:text-white mt-1">{totalTrackedElements} Nodes</h4>
          </div>
          <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/30 text-blue-600 rounded-lg flex items-center justify-center text-sm"><FaBoxes /></div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 border border-slate-100 dark:border-slate-700 rounded-xl flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Top Macro Focus Asset</p>
            <h4 className="text-sm font-black font-mono text-green-600 mt-1 truncate max-w-[180px]">{topFocusIndicator}</h4>
          </div>
          <div className="w-10 h-10 bg-green-50 dark:bg-green-950/30 text-green-600 rounded-lg flex items-center justify-center text-sm"><FaArrowUp /></div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 border border-slate-100 dark:border-slate-700 rounded-xl flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">System Liquidity Vector</p>
            <h4 className="text-xl font-black font-mono text-slate-900 dark:text-white mt-1">{trends?.status || 'Stable'}</h4>
          </div>
          <div className="w-10 h-10 bg-purple-50 dark:bg-purple-950/30 text-purple-600 rounded-lg flex items-center justify-center text-sm"><FaChartLine /></div>
        </div>
      </div>

      {/* ADMIN CONTROL PANEL: INSERT NEW MARKET ENTRY */}
      <div className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-1.5">
          <FaPlusCircle className="text-green-600" /> Push Live Index Amendment
        </h3>
        <form onSubmit={handleCreateListing} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          <input 
            type="text" 
            placeholder="Commodity (e.g. Rice Bag)" 
            value={newCrop} 
            onChange={(e) => setNewCrop(e.target.value)}
            className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none text-slate-900 dark:text-white"
          />
          <input 
            type="text" 
            placeholder="Price value (Raw Integer)" 
            value={newPrice} 
            onChange={(e) => setNewPrice(e.target.value)}
            className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none text-slate-900 dark:text-white"
          />
          <input 
            type="text" 
            placeholder="Geographic Trading Hub" 
            value={newMarket} 
            onChange={(e) => setNewMarket(e.target.value)}
            className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none text-slate-900 dark:text-white"
          />
          <select 
            value={newTrend} 
            onChange={(e) => setNewTrend(e.target.value)}
            className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-2 py-2 text-xs focus:outline-none text-slate-900 dark:text-white"
          >
            <option value="Bullish Demand">Bullish Demand</option>
            <option value="Steady Velocity">Steady Velocity</option>
            <option value="High Volume Volatility">High Volume Volatility</option>
            <option value="Price Retraction">Price Retraction</option>
          </select>
          <button type="submit" className="bg-slate-900 dark:bg-slate-700 text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-slate-800 transition-all">
            Inject Listing
          </button>
        </form>
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">Agro-Market Intelligence</h3>
            <p className="text-xs text-slate-400">Central platform operational state routing indicators across trading channels.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="bg-slate-100 dark:bg-slate-700 p-1 rounded-xl flex space-x-1">
              {['All', 'Grains', 'Legumes'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-all ${filterCategory === cat ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-xs' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input 
                type="text" 
                placeholder="Search matrix infrastructure..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-56 border border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* COMMODITY DATA TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                <th className="py-3 px-4">Commodity Layer</th>
                <th className="py-3 px-4">Benchmark Price</th>
                <th className="py-3 px-4">System Telemetry Trend</th>
                <th className="py-3 px-4">Geographic Trading Hub</th>
                <th className="py-3 px-4 text-right">Verification Log</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-700 text-slate-700 dark:text-slate-300 font-medium font-mono">
              {filteredCommodities.length > 0 ? (
                filteredCommodities.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="py-4 px-4 font-bold text-slate-900 dark:text-white font-sans">{item.crop}</td>
                    <td className="py-4 px-4 text-slate-900 dark:text-white font-bold">{item.price}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 font-bold ${item.up ? 'text-green-600' : 'text-red-500'}`}>
                        {item.up ? <FaArrowUp /> : <FaArrowDown />}
                        {item.trend}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-sans text-slate-500 dark:text-slate-400">{item.market}</td>
                    <td className="py-4 px-4 text-right font-sans text-slate-400 text-[10px]">{item.date || 'Live Trace'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-12 text-slate-400 italic">
                    <FaExclamationTriangle className="inline-block mb-1 text-slate-300 text-sm mr-1" />
                    No tracked asset channels match your current search constraints.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}