import React, { useState } from 'react';
import { FaSearch, FaArrowUp, FaArrowDown, FaBoxes, FaShoppingCart, FaChartLine, FaExclamationTriangle } from 'react-icons/fa';

export default function Markets() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  // MVP Mock Data Matrix
  const [commodities] = useState([
    { id: 1, name: 'White Maize', category: 'Grains', price: '₦82,000', unit: 'per 100kg bag', change: '+4.2%', trend: 'up', location: 'Dawanau Market, Kano' },
    { id: 2, name: 'Sorghum (Chakalari)', category: 'Grains', price: '₦78,500', unit: 'per 100kg bag', change: '-1.8%', trend: 'down', location: 'Potiskum Market, Yobe' },
    { id: 3, name: 'Soybeans', category: 'Legumes', price: '₦115,000', unit: 'per 100kg bag', change: '+6.5%', trend: 'up', location: 'Gombe Market, Gombe' },
    { id: 4, name: 'Cowpea (Brown Beans)', category: 'Legumes', price: '₦140,000', unit: 'per 100kg bag', change: '-2.1%', trend: 'down', location: 'Bodija Market, Ibadan' },
    { id: 5, name: 'Paddy Rice', category: 'Grains', price: '₦68,000', unit: 'per 75kg bag', change: '+0.0%', trend: 'neutral', location: 'Argungu, Kebbi' },
  ]);

  const filteredCommodities = commodities.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* MARKET METRIC BARS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 border border-slate-100 dark:border-slate-700 rounded-xl flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Tracked Commodities</p>
            <h4 className="text-xl font-black font-mono text-slate-900 dark:text-white mt-1">{commodities.length} Nodes</h4>
          </div>
          <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/30 text-blue-600 rounded-lg flex items-center justify-center text-sm"><FaBoxes /></div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 border border-slate-100 dark:border-slate-700 rounded-xl flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Top Gainer Grains</p>
            <h4 className="text-xl font-black font-mono text-green-600 mt-1">Soybeans (+6.5%)</h4>
          </div>
          <div className="w-10 h-10 bg-green-50 dark:bg-green-950/30 text-green-600 rounded-lg flex items-center justify-center text-sm"><FaArrowUp /></div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 border border-slate-100 dark:border-slate-700 rounded-xl flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">System Liquidity Index</p>
            <h4 className="text-xl font-black font-mono text-slate-900 dark:text-white mt-1">Stable</h4>
          </div>
          <div className="w-10 h-10 bg-purple-50 dark:bg-purple-950/30 text-purple-600 rounded-lg flex items-center justify-center text-sm"><FaChartLine /></div>
        </div>
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">Agro-Market Intelligence</h3>
            <p className="text-xs text-slate-400">Real-time local wholesale commodity pricing indicators across key regional trade exchanges.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* CATEGORY TABS */}
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

            {/* BAR CONTROLLER */}
            <div className="relative">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input 
                type="text" 
                placeholder="Search market vectors..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-56 border border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-green-700 focus:border-green-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* COMMODITY GRID DATA TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                <th className="py-3 px-4">Commodity Layer</th>
                <th className="py-3 px-4">Market Classification</th>
                <th className="py-3 px-4">Benchmark Price</th>
                <th className="py-3 px-4">Delta Scale (24h)</th>
                <th className="py-3 px-4">Geographic Trading Hub</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-700 text-slate-700 dark:text-slate-300 font-medium font-mono">
              {filteredCommodities.length > 0 ? (
                filteredCommodities.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="py-4 px-4 font-bold text-slate-900 dark:text-white font-sans">{item.name}</td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-[10px] text-slate-600 dark:text-slate-400 font-sans font-bold uppercase">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-900 dark:text-white font-bold">
                      {item.price} <span className="text-[10px] text-slate-400 font-normal font-sans">{item.unit}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 font-bold ${item.trend === 'up' ? 'text-green-600' : item.trend === 'down' ? 'text-red-500' : 'text-slate-400'}`}>
                        {item.trend === 'up' && <FaArrowUp />}
                        {item.trend === 'down' && <FaArrowDown />}
                        {item.change}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-sans text-slate-500 dark:text-slate-400">{item.location}</td>
                    <td className="py-4 px-4 text-right font-sans">
                      <button onClick={() => alert(`Redirecting to order book routing for ${item.name}`)} className="bg-green-700 text-white font-bold text-[10px] uppercase px-3 py-1.5 rounded-lg hover:bg-green-800 transition-colors inline-flex items-center gap-1">
                        <FaShoppingCart className="text-[9px]" /> Trade
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-slate-400 italic">
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