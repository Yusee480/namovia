import React, { useState } from 'react';
import { FaCloudSun, FaExclamationTriangle, FaSyncAlt, FaThermometerHalf, FaTint, FaWind } from 'react-icons/fa';

export default function Weather({ bulletins, logSystemEvent }) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [metrics, setMetrics] = useState({
    temp: '34°C',
    humidity: '62%',
    wind: '18 km/h'
  });

  // Filter out any active weather notifications from our live global feed
  const activeWeatherAlerts = bulletins ? bulletins.filter(b => b.category === 'Weather') : [];

  // Simulates telemetry recalculations from satellite stream indices
  const handleSyncPipeline = () => {
    setIsSyncing(true);
    
    setTimeout(() => {
      const generatedMetrics = {
        temp: `${Math.floor(Math.random() * (38 - 30) + 30)}°C`,
        humidity: `${Math.floor(Math.random() * (75 - 55) + 55)}%`,
        wind: `${Math.floor(Math.random() * (24 - 12) + 12)} km/h`
      };
      
      setMetrics(generatedMetrics);
      setIsSyncing(false);
      
      // Dispatch pipeline sync message out to our central audit pipeline
      logSystemEvent(
        'WEATHER_ARRAY_SYNC', 
        `Potiskum Hub (${generatedMetrics.temp}, ${generatedMetrics.humidity} RH)`,
        'SUCCESS'
      );
      
      alert('Forcing pipeline re-sync... Satellite streaming arrays updated.');
    }, 800);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* METEOROLOGICAL CONTROL CONSOLE */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex justify-between items-center flex-wrap gap-4">
        <div>
          <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <FaCloudSun className="text-green-700" /> Meteorological Data Array
          </h3>
          <p className="text-xs text-slate-400">External multi-spectrum satellite pipelines configuration matrix.</p>
        </div>
        <button 
          onClick={handleSyncPipeline}
          disabled={isSyncing}
          className="px-4 py-2.5 bg-[#15803D] hover:bg-green-800 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center space-x-2 focus:outline-none"
        >
          <FaSyncAlt className={isSyncing ? 'animate-spin' : ''} /> 
          <span>{isSyncing ? 'Re-aligning Array...' : 'Force Pipeline Re-sync'}</span>
        </button>
      </div>

      {/* CORE STATUS INFRASTRUCTURE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Pipeline Status</span>
          <div className="flex items-center space-x-2">
            <span className={`w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0 ${isSyncing ? 'animate-ping' : 'animate-pulse'}`} />
            <h4 className="text-base font-black text-slate-900 dark:text-white truncate">NOAA / ECMWF Linked</h4>
          </div>
          <p className="text-xs text-slate-400 font-mono">Ping: 42ms • Integrity: 99.98%</p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">High-Search Coordinate Block</span>
          <h4 className="text-base font-black text-slate-900 dark:text-white font-mono truncate">Potiskum Grid (11.7° N)</h4>
          <p className="text-xs text-slate-400 font-mono">4,810 daily telemetry logs</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Active Atmospheric Flags</span>
          <div className={`flex items-center space-x-2 ${activeWeatherAlerts.length > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-amber-600 dark:text-amber-400'}`}>
            <FaExclamationTriangle className="flex-shrink-0" />
            <h4 className="text-base font-black truncate">{activeWeatherAlerts.length} Active Severe Flag{activeWeatherAlerts.length !== 1 ? 's' : ''}</h4>
          </div>
          <p className="text-xs text-slate-400 font-sans truncate">
            {activeWeatherAlerts.length > 0 ? activeWeatherAlerts[0].title : 'No immediate storm vector targets logged'}
          </p>
        </div>
      </div>

      {/* LIVE TELEMETRY DEVIATION PANEL */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
        <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-700 p-4 rounded-xl flex items-center justify-between">
          <div className="space-y-1 min-w-0">
            <span className="text-[10px] uppercase font-sans font-bold text-slate-400 tracking-wider block">Surface Temp</span>
            <span className="text-lg font-black text-slate-900 dark:text-white">{metrics.temp}</span>
          </div>
          <FaThermometerHalf className="text-orange-500 text-lg flex-shrink-0" />
        </div>
        <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-700 p-4 rounded-xl flex items-center justify-between">
          <div className="space-y-1 min-w-0">
            <span className="text-[10px] uppercase font-sans font-bold text-slate-400 tracking-wider block">Relative Humidity</span>
            <span className="text-lg font-black text-slate-900 dark:text-white">{metrics.humidity}</span>
          </div>
          <FaTint className="text-blue-500 text-lg flex-shrink-0" />
        </div>
        <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-700 p-4 rounded-xl flex items-center justify-between">
          <div className="space-y-1 min-w-0">
            <span className="text-[10px] uppercase font-sans font-bold text-slate-400 tracking-wider block">Wind Velocity</span>
            <span className="text-lg font-black text-slate-900 dark:text-white">{metrics.wind}</span>
          </div>
          <FaWind className="text-teal-500 text-lg flex-shrink-0" />
        </div>
      </div>

      {/* WARNING NOTIFICATION REGISTER */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-4">
        <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Broadcast Vector Terminal Alerts</h4>
        <div className="space-y-3">
          {activeWeatherAlerts.length > 0 ? (
            activeWeatherAlerts.map((alertItem) => (
              <div key={alertItem.id} className="p-4 bg-red-50/60 dark:bg-red-950/20 border border-red-100 dark:border-red-900/40 text-xs rounded-xl flex flex-col space-y-1">
                <span className="font-bold text-red-800 dark:text-red-400 uppercase font-mono tracking-wider flex items-center space-x-1.5">
                  <span>[REF-ID: {alertItem.id.toString().slice(-4)}] ATMOSPHERIC PRECIPITATION CELL</span>
                </span>
                <h5 className="font-sans font-bold text-slate-900 dark:text-white mt-1 text-sm">{alertItem.title}</h5>
                <p className="text-slate-600 dark:text-slate-300 font-medium font-sans">
                  {alertItem.content}
                </p>
                <span className="text-[10px] text-slate-400 font-mono pt-1">Logged: {alertItem.date}</span>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-slate-400 italic text-xs font-sans">
              No critical weather broadcast vectors detected on the network lines.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}