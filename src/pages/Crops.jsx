import React, { useState, useMemo } from 'react';
import { FaSearch, FaCalendarAlt, FaWater, FaChartLine, FaCheckCircle } from 'react-icons/fa';

export default function Crops() {
  const [filterType, setFilterType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const agronomicData = useMemo(() => [
    { name: 'Maize (White Hybrid)', type: 'Cereals', match: 94, cycle: '90-110 Days', moisture: 'Medium', yieldEst: '4.5 - 6.0 Tons/Ha', status: 'Optimal Match', notes: 'Excellent nitrogen retention observed in recent Potiskum grid telemetry tests.' },
    { name: 'Sorghum Grain', type: 'Cereals', match: 89, cycle: '110-130 Days', moisture: 'Low (Arid-Resistant)', yieldEst: '2.5 - 3.8 Tons/Ha', status: 'High Compatibility', notes: 'Strong adaptation vector mapped against regional heat indicators.' },
    { name: 'Cowpea (Brown Beans)', type: 'Legumes', match: 85, cycle: '60-75 Days', moisture: 'Low', yieldEst: '1.2 - 2.0 Tons/Ha', status: 'Nitrogen Fixing Node', notes: 'Recommended for companion configuration cycles to safely restore topsoil properties.' },
    { name: 'Soybeans Grade A', type: 'Legumes', match: 78, cycle: '100-120 Days', moisture: 'Medium-High', yieldEst: '2.0 - 3.2 Tons/Ha', status: 'Conditional Match', notes: 'Requires optimization of the moisture interval window to ensure proper pod development initialization.' },
    { name: 'Groundnuts (Peanuts)', type: 'Oilseeds', match: 82, cycle: '90-115 Days', moisture: 'Medium', yieldEst: '1.8 - 2.5 Tons/Ha', status: 'Stable Return Node', notes: 'Soil compaction indices across local farm matrix limits are within acceptable parameters.' }
  ], []);

  // Optimized filtering
  const filteredCrops = useMemo(() => {
    return agronomicData.filter(crop => {
      const matchesSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            crop.notes.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = filterType === 'All' || crop.type === filterType;
      return matchesSearch && matchesTab;
    });
  }, [agronomicData, filterType, searchQuery]);

  const tabItems = ['All', 'Cereals', 'Legumes', 'Oilseeds'];

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6 animate-fadeIn">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-base font-black text-slate-800 uppercase tracking-wider">Agronomic Recommendation Engine</h3>
          <p className="text-xs text-slate-400">Yield configuration profiles matched to telemetry data nodes.</p>
        </div>
        
        {/* INLINE SEARCH ENGINE */}
        <div className="relative max-w-xs w-full">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input 
            type="text" 
            placeholder="Search crop profiles..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            className="w-full border border-slate-200 rounded-xl px-9 py-2 text-xs bg-slate-50 focus:outline-none focus:border-emerald-700 focus:bg-white transition-all text-slate-800" 
          />
        </div>
      </div>

      {/* FILTER BUTTON TABS */}
      <div className="flex flex-wrap gap-1.5 border-b border-slate-100 pb-4">
        {tabItems.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterType(tab)}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterType === tab 
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/50' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 border border-transparent'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      
      {/* DYNAMIC GRID RENDERING */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCrops.length > 0 ? (
          filteredCrops.map((crop, idx) => (
            <CropCard key={idx} crop={crop} />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-400 text-xs font-medium">
            No agronomic profiles match your current matrix query parameters.
          </div>
        )}
      </div>
    </div>
  );
}

// Sub-component for cleaner mapping
const CropCard = ({ crop }) => (
  <div className="border border-gray-100 bg-gray-50/30 rounded-2xl p-5 space-y-4 hover:shadow-md hover:border-emerald-600/30 transition-all group duration-200 flex flex-col justify-between">
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-0.5">
          <span className="text-[10px] bg-slate-100 font-mono font-bold px-2 py-0.5 rounded text-slate-500 uppercase tracking-wider">{crop.type}</span>
          <h4 className="font-extrabold text-base text-gray-900 group-hover:text-emerald-700 transition-colors">{crop.name}</h4>
        </div>
        <div className="text-right">
          <span className="text-xl font-black text-emerald-700 font-mono">{crop.match}%</span>
          <p className="text-[9px] text-gray-400 uppercase font-bold tracking-wider">Confidence Matrix</p>
        </div>
      </div>
      
      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-800 h-full rounded-full" style={{ width: `${crop.match}%` }} />
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        {[ { icon: <FaCalendarAlt />, label: 'Growth Cycle', val: crop.cycle },
           { icon: <FaWater />, label: 'Moisture', val: crop.moisture },
           { icon: <FaChartLine />, label: 'Yield', val: crop.yieldEst } ].map((item, i) => (
          <div key={i} className="bg-white border border-gray-100 p-2 rounded-xl flex flex-col justify-between">
            <div className="text-slate-400 text-xs mx-auto mb-1">{item.icon}</div>
            <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-tight">{item.label}</span>
            <span className="text-[10px] font-mono font-bold text-slate-800 mt-0.5">{item.val}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="pt-3 mt-2 border-t border-gray-100 flex items-start space-x-2 text-xs">
      <FaCheckCircle className="text-emerald-600 mt-0.5 shrink-0" />
      <p className="text-gray-500 leading-normal"><strong className="text-gray-700 font-bold">{crop.status}:</strong> {crop.notes}</p>
    </div>
  </div>
);