import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

export default function Fertilizers() {
  const [guides, setGuides] = useState([
    { id: 1, name: 'NPK 15-15-15 Basal Compound', crop: 'Hybrid White Maize', rate: '150kg / Hectare', soil: 'Low Nitrogen Soils', status: 'Approved' },
    { id: 2, name: 'Granular Urea Top Dressing', crop: 'Sorghum Grain / Maize Rotation', rate: '100kg / Hectare', soil: 'All Soil Profiles', status: 'Approved' },
  ]);

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">Nutrient Apportionment Rule Register</h3>
          <p className="text-xs text-slate-400">Maintain NPK, Urea, and micronutrient dosage allocation lookup records.</p>
        </div>
        <button onClick={() => alert('Loading creation terminal...')} className="px-4 py-2.5 bg-[#15803D] text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-green-800 transition-all shadow-sm flex items-center space-x-2"><FaPlus /> <span>New Dosage Guideline</span></button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
              <th className="py-3 px-4">Nutrient Compound Specification</th>
              <th className="py-3 px-4">Target Biological Host</th>
              <th className="py-3 px-4">Standard Allocation Dosage</th>
              <th className="py-3 px-4">Soil Sub-stratum Constraint</th>
              <th className="py-3 px-4">Status Flag</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-700 text-slate-700 dark:text-slate-300 font-medium font-mono">
            {guides.map((g) => (
              <tr key={g.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                <td className="py-4 px-4 font-bold text-slate-900 dark:text-white font-sans">🔬 {g.name}</td>
                <td className="py-4 px-4 font-sans text-slate-500 dark:text-slate-400">{g.crop}</td>
                <td className="py-4 px-4 font-bold text-slate-800 dark:text-slate-200">{g.rate}</td>
                <td className="py-4 px-4 font-sans text-slate-500 dark:text-slate-400">{g.soil}</td>
                <td className="py-4 px-4">
                  <span className="text-[10px] font-black bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 px-2 py-0.5 rounded tracking-wider uppercase">{g.status}</span>
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