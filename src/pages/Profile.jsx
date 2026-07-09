import React, { useState } from 'react';
import { FaShieldAlt, FaClock, FaTerminal, FaCog, FaCircle } from 'react-icons/fa';

export default function Profile({ auditLogs }) {
  const [diagnosticMode, setDiagnosticMode] = useState(false);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* IDENTITY PROFILE MATRICES */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-6">
        <div>
          <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">Operator Identity Core</h3>
        </div>

        <div className="flex items-center space-x-4 border-b border-slate-100 dark:border-slate-700 pb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-green-700 to-emerald-950 text-white font-black text-xl flex items-center justify-center shadow-md">YA</div>
          <div>
            <h4 className="text-base font-black text-slate-900 dark:text-white">Yusuf Adamou</h4>
            <p className="text-xs text-slate-400">Enterprise System Operator • Assigned Security Level 4</p>
            <span className="inline-flex mt-1 text-[10px] font-bold bg-green-50 dark:bg-green-950/60 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-md tracking-wider uppercase">✓ Node Identity Verified</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
          <div>
            <span className="text-slate-400 font-sans block mb-1">Assigned Routing Endpoint</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900/40 px-3 py-2 rounded-xl block border border-slate-100">+234 803 000 0000</span>
          </div>
        </div>
      </div>

      {/* PIPELINE & CONFIGURATION BLOCKS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center space-x-2">
            <FaTerminal className="text-slate-700 dark:text-slate-400 text-sm" />
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">Recent Console Event Pipeline</h4>
          </div>
          
          <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
            {auditLogs && auditLogs.length > 0 ? (
              auditLogs.map((log) => (
                <div key={log.id} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 rounded-xl font-mono text-[11px]">
                  <div className="space-y-0.5 pr-2 truncate">
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-400 text-[10px]">{log.timestamp}</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200 truncate">{log.action}</span>
                    </div>
                    <span className="block text-[10px] text-slate-400 font-sans truncate">Target: {log.resource}</span>
                  </div>
                  <span className={`flex items-center space-x-1.5 font-bold px-2 py-0.5 rounded text-[9px] flex-shrink-0 ${
                    log.status === 'SUCCESS' 
                      ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40' 
                      : 'text-amber-700 bg-amber-50 dark:bg-amber-950/40'
                  }`}>
                    <FaCircle className={`text-[5px] ${log.status === 'SUCCESS' ? 'text-emerald-600 animate-pulse' : 'text-amber-500'}`} />
                    <span>{log.status}</span>
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-slate-400 italic text-xs">No entries located in system audit cache.</div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center space-x-2">
            <FaCog className="text-slate-700 dark:text-slate-400 text-sm" />
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">Local Node Config</h4>
          </div>
          <div className="space-y-4 text-xs font-sans">
            <div className="flex justify-between items-center">
              <div>
                <span className="block font-bold text-slate-800 dark:text-slate-200">System Diagnostic Mode</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Toggle local error detection overrides.</span>
              </div>
              <button onClick={() => setDiagnosticMode(!diagnosticMode)} className={`w-10 h-6 rounded-full p-1 transition-colors flex-shrink-0 focus:outline-none ${diagnosticMode ? 'bg-green-700' : 'bg-slate-200 dark:bg-slate-700'}`}>
                <div className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform transform ${diagnosticMode ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}