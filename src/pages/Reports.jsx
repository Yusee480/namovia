import React from 'react';
import { FaFilePdf, FaFileExcel, FaFileCsv } from 'react-icons/fa';

export default function Reports() {
  const triggers = [
    { title: 'Global Meteorologic Log Datasets', sub: 'Extracted precipitation variations vs actual telemetry models' },
    { title: 'Farmer Network Enrollment Logs', sub: 'Comprehensive regional metadata profile breakdown lists' },
    { title: 'Crop Yield Adaptive Mapping Metrics', sub: 'Calculated algorithmic output efficiency indexes' },
    { title: 'Commodity Trading Price Vectors', sub: 'Historical pricing velocity tracking archives' }
  ];

  const handleExport = (format, title) => {
    alert(`Initializing extraction target compilation...\nDataset: ${title}\nTarget Format: [${format}] Pipeline active.`);
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-6 animate-fadeIn">
      <div>
        <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">Telemetry Export Hub</h3>
        <p className="text-xs text-slate-400">Compile target sub-system modules cleanly to standard data payloads.</p>
      </div>

      <div className="space-y-4">
        {triggers.map((t, idx) => (
          <div key={idx} className="p-5 border border-slate-50 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 rounded-2xl flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">{t.title}</h4>
              <p className="text-xs text-slate-400 font-sans mt-0.5">{t.sub}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={() => handleExport('PDF', t.title)} className="px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5"><FaFilePdf /> <span>PDF</span></button>
              <button onClick={() => handleExport('EXCEL', t.title)} className="px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5"><FaFileExcel /> <span>Excel</span></button>
              <button onClick={() => handleExport('CSV', t.title)} className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5"><FaFileCsv /> <span>CSV</span></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}