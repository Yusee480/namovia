import React, { useState } from 'react';
import { FaFilePdf, FaFileExcel, FaCog } from 'react-icons/fa';

export default function Reports({ logSystemEvent }) {
  const [exportState, setExportState] = useState({ active: false, target: '', format: '', progress: 0 });

  const triggers = [
    { title: 'Global Meteorologic Log Datasets', sub: 'Extracted precipitation variations and climate telemetry indicators across active sectors.' },
    { title: 'Farmer Network Enrollment Logs', sub: 'Comprehensive regional metadata indexes tracking spatial zones and cluster populations.' }
  ];

  const handleExport = (format, title) => {
    if (exportState.active) return;
    setExportState({ active: true, target: title, format, progress: 10 });

    const interval = setInterval(() => {
      setExportState(prev => {
        if (prev.progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            logSystemEvent('DATASET_COMPILATION', `${title} (${format})`, 'SUCCESS');
            alert(`Compilation Complete!\nDataset downloaded safely.`);
            setExportState({ active: false, target: '', format: '', progress: 0 });
          }, 300);
          return { ...prev, progress: 100 };
        }
        return { ...prev, progress: prev.progress + 30 };
      });
    }, 250);
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-6 animate-fadeIn">
      <div>
        <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">Ecosystem Ledger & Data Exporters</h3>
        <p className="text-xs text-slate-400">Compile and serialize platform state matrices into structured documentation formats.</p>
      </div>

      {/* COMPILATION ENGINE PROGRESS BANNER */}
      {exportState.active && (
        <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 text-blue-800 dark:text-blue-400 space-y-3">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="flex items-center space-x-2 font-bold">
              <FaCog className="animate-spin text-sm" /> 
              <span>SERIALIZING: {exportState.target} ({exportState.format})</span>
            </span>
            <span className="font-bold">{exportState.progress}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-blue-600 h-full transition-all duration-200 ease-out" 
              style={{ width: `${exportState.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* TRIGGERS LIST */}
      <div className="space-y-4">
        {triggers.map((t, idx) => (
          <div key={idx} className="p-5 border border-slate-100 dark:border-slate-700/60 rounded-2xl flex flex-col md:flex-row justify-between md:items-center gap-4 hover:bg-slate-50/40 dark:hover:bg-slate-700/10 transition-colors">
            <div className="space-y-0.5">
              <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">{t.title}</h4>
              <p className="text-xs text-slate-400 font-sans">{t.sub}</p>
            </div>
            
            <div className="flex items-center space-x-2 self-end md:self-center">
              <button 
                onClick={() => handleExport('PDF', t.title)} 
                disabled={exportState.active} 
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 disabled:bg-slate-200 dark:disabled:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center space-x-1.5 shadow-sm"
              >
                <FaFilePdf /> <span>PDF</span>
              </button>
              <button 
                onClick={() => handleExport('EXCEL', t.title)} 
                disabled={exportState.active} 
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-200 dark:disabled:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center space-x-1.5 shadow-sm"
              >
                <FaFileExcel /> <span>Excel</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}