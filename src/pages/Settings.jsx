import React, { useState } from 'react';
import { FaSave, FaSlidersH } from 'react-icons/fa';

export default function Settings({ logSystemEvent }) {
  const [gatewayUri, setGatewayUri] = useState('https://api.sms-relay.cropnexa.internal/v1');
  const [radiusThreshold, setRadiusThreshold] = useState(25);

  const handleSaveConfig = (e) => {
    e.preventDefault();
    logSystemEvent('SYSTEM_CONFIG_MUTATION', `Gateway URI -> ${gatewayUri} | Radius -> ${radiusThreshold}km`, 'SUCCESS');
    alert('System operational parameters updated and logged.');
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-6 animate-fadeIn">
      <div>
        <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <FaSlidersH className="text-green-700 text-sm" /> Global Environment Overrides
        </h3>
        <p className="text-xs text-slate-400">Mutate macro-system variables and spatial routing distances for real-time mesh networks.</p>
      </div>

      <form onSubmit={handleSaveConfig} className="space-y-6 text-xs">
        {/* API GATEWAY NODE INPUT */}
        <div>
          <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 block mb-1">
            SMS Network Gateway Node URI
          </label>
          <input 
            type="text" 
            value={gatewayUri} 
            onChange={(e) => setGatewayUri(e.target.value)} 
            className="w-full bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 focus:border-green-700 focus:outline-none rounded-xl px-4 py-3 font-mono text-slate-800 dark:text-white transition-all" 
          />
        </div>

        {/* SPATIAL RADIAL COMPONENT SLIDER */}
        <div className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-xl border border-slate-100 dark:border-slate-700/50 space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 block">
                Broadcast Spatial Radius Limit
              </label>
              <span className="text-[11px] text-slate-400 font-sans block mt-0.5">
                Defines the cell tower propagation zone for climate warnings.
              </span>
            </div>
            <span className="font-mono font-black text-sm text-green-700 dark:text-green-400 bg-white dark:bg-slate-800 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-xs">
              {radiusThreshold} km
            </span>
          </div>
          <input 
            type="range" 
            min="5" 
            max="100" 
            step="5" 
            value={radiusThreshold} 
            onChange={(e) => setRadiusThreshold(Number(e.target.value))} 
            className="w-full accent-green-700 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer" 
          />
        </div>

        {/* FORM COMMIT ACTIONS */}
        <button 
          type="submit" 
          className="px-5 py-3 bg-green-700 hover:bg-green-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center space-x-2"
        >
          <FaSave /> <span>Commit System Changes</span>
        </button>
      </form>
    </div>
  );
}