import React from 'react';
import { FaCloudSun, FaExclamationTriangle, FaSyncAlt } from 'react-icons/fa';

export default function Weather() {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex justify-between items-center flex-wrap gap-4">
        <div>
          <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">Meteorological Data Array</h3>
          <p className="text-xs text-slate-400">External multi-spectrum satellite pipelines configuration matrix.</p>
        </div>
        <button onClick={() => alert('Forcing pipeline re-sync... Completed.')} className="px-4 py-2.5 bg-[#15803D] text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-green-800 transition-all shadow-sm flex items-center space-x-2"><FaSyncAlt /> <span>Force Pipeline Re-sync</span></button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Pipeline Status</span>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <h4 className="text-base font-black text-slate-900 dark:text-white">NOAA / ECMWF Linked</h4>
          </div>
          <p className="text-xs text-slate-400 font-mono">Ping: 42ms • Integrity: 99.98%</p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">High-Search Coordinate Block</span>
          <h4 className="text-base font-black text-slate-900 dark:text-white font-mono">Potiskum Grid (11.7° N)</h4>
          <p className="text-xs text-slate-400 font-mono">4,810 daily telemetry logs</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Atmospheric Flags</span>
          <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400">
            <FaExclamationTriangle />
            <h4 className="text-base font-black">1 Active Severe Flag</h4>
          </div>
          <p className="text-xs text-slate-400 font-sans">Precipitation cell moving NE over Yobe</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-4">
        <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Broadcast Vector Terminal Alerts</h4>
        <div className="space-y-3">
          <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900 text-xs rounded-xl flex flex-col space-y-1">
            <span className="font-bold text-red-800 dark:text-red-400 uppercase font-mono tracking-wider">[ALERT-ID: 8042] FLASH PRECIPITATION MATRIX</span>
            <p className="text-slate-600 dark:text-slate-300 font-medium">Extreme dynamic rainfall anomaly expected on Thursday afternoon over local farming perimeters. Advise moisture extraction mitigation.</p>
          </div>
        </div>
      </div>
    </div>
  );
}