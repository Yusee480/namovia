import React from 'react';
import { FaCloudUploadAlt, FaDatabase } from 'react-icons/fa';

export default function Settings() {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-8 animate-fadeIn">
      <div>
        <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">System Infrastructure Variables</h3>
        <p className="text-xs text-slate-400">Modify framework integration endpoints, system backup nodes, and automation rule thresholds.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-sans">
        <div className="space-y-4">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-50 dark:border-slate-700 pb-2">Communications Integration Endpoints</h4>
          <div className="space-y-3">
            <div>
              <span className="text-slate-500 block mb-1 font-bold">Meteorological Satellite API Secret Key</span>
              <input type="password" value="••••••••••••••••••••••••••••••••" readOnly className="w-full bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600 rounded-xl px-4 py-2.5 font-mono text-xs focus:outline-none" />
            </div>
            <div>
              <span className="text-slate-500 block mb-1 font-bold">SMS Network Gateway Node URI</span>
              <input type="text" value="https://api.sms-relay.cropnexa.internal/v1" readOnly className="w-full bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600 rounded-xl px-4 py-2.5 font-mono text-xs focus:outline-none" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-50 dark:border-slate-700 pb-2">Storage Snapshot & DB Restores</h4>
          <p className="text-xs text-slate-400 leading-relaxed">Snap system database status to independent cloud block endpoints daily. Ensure continuity configurations remain validated.</p>
          <div className="flex flex-wrap gap-2 pt-2">
            <button onClick={() => alert('Compiling target database state snapshot... Saved.')} className="px-4 py-2.5 bg-slate-900 dark:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-800 transition-all flex items-center space-x-1.5"><FaDatabase /> <span>Backup DB Now</span></button>
            <button onClick={() => alert('Accessing recovery matrix options...')} className="px-4 py-2.5 bg-amber-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-amber-600 transition-all flex items-center space-x-1.5"><FaCloudUploadAlt /> <span>Restore State</span></button>
          </div>
        </div>
      </div>
    </div>
  );
}