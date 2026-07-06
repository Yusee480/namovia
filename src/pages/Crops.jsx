import React, { useState } from 'react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

export default function Crops() {
  const [crops, setCrops] = useState([
    { id: 1, name: 'Hybrid White Maize', season: 'Kharif / Rainy Season', temp: '24°C - 32°C', rain: '600mm - 900mm', soil: 'Well-drained Loamy Soil', status: 'Optimal Match' },
    { id: 2, name: 'Sorghum Grain', season: 'Dry Rotation Window', temp: '26°C - 34°C', rain: '450mm - 650mm', soil: 'Sandy Clay / Light Loam', status: 'Stable Match' },
  ]);

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">Crop Recommendation Engine Matrices</h3>
          <p className="text-xs text-slate-400">Configure matching rule blocks processed by the ML prediction pipeline.</p>
        </div>
        <button onClick={() => alert('Loading new vector configuration modal...')} className="px-4 py-2.5 bg-[#15803D] text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-green-800 transition-all shadow-sm flex items-center space-x-2"><FaPlus /> <span>Provision New Crop Rule</span></button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
              <th className="py-3 px-4">Botanical / Common Label</th>
              <th className="py-3 px-4">Season Classification</th>
              <th className="py-3 px-4">Thermal Thresholds</th>
              <th className="py-3 px-4">Moisture Envelope</th>
              <th className="py-3 px-4">Target Soil Parameters</th>
              <th className="py-3 px-4">System Tag</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-700 text-slate-700 dark:text-slate-300 font-medium font-mono">
            {crops.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                <td className="py-4 px-4 font-bold text-slate-900 dark:text-white font-sans">{c.name}</td>
                <td className="py-4 px-4 font-sans text-slate-500 dark:text-slate-400">{c.season}</td>
                <td className="py-4 px-4">{c.temp}</td>
                <td className="py-4 px-4">{c.rain}</td>
                <td className="py-4 px-4 font-sans text-slate-500 dark:text-slate-400">{c.soil}</td>
                <td className="py-4 px-4">
                  <span className="text-[10px] font-black bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-400 px-2 py-0.5 rounded uppercase tracking-wider">{c.status}</span>
                </td>
                <td className="py-4 px-4 text-right space-x-1 font-sans">
                  <button className="p-2 bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-100 inline-flex"><FaEdit /></button>
                  <button className="p-2 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 inline-flex"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}