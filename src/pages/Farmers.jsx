import React, { useState } from 'react';
import { FaEye, FaTrash, FaUserLock, FaCheckCircle, FaSearch } from 'react-icons/fa';

export default function Farmers() {
  const [farmers, setFarmers] = useState([
    { id: 1, name: 'Adamu Haruna', email: 'haruna@potiskum.ng', phone: '+234 803 111 2222', state: 'Yobe', lga: 'Potiskum', type: 'Commercial Grain', date: '2026-07-02', status: 'Active' },
    { id: 2, name: 'Fatima Bukar', email: 'fatima@damaturu.ng', phone: '+234 806 333 4444', state: 'Yobe', lga: 'Damaturu', type: 'Legume Hybrid Rotation', date: '2026-06-28', status: 'Suspended' },
    { id: 3, name: 'Ibrahim Musa', email: 'musa@geidam.ng', phone: '+234 809 555 6666', state: 'Yobe', lga: 'Geidam', type: 'Irrigated Cash Crops', date: '2026-06-15', status: 'Active' },
  ]);

  const toggleStatus = (id) => {
    setFarmers(farmers.map(f => f.id === id ? { ...f, status: f.status === 'Active' ? 'Suspended' : 'Active' } : f));
  };

  const deleteFarmer = (id) => {
    if(window.confirm('Purge this record from system registers?')) {
      setFarmers(farmers.filter(f => f.id !== id));
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">Farmers Identity Management</h3>
          <p className="text-xs text-slate-400">Verify, structure roles, restrict system entry nodes, or audit farmer profiles.</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
              <th className="py-3 px-4">Operator Name</th>
              <th className="py-3 px-4">Contact Routing</th>
              <th className="py-3 px-4">Geographic Node</th>
              <th className="py-3 px-4">Cultivation Strategy</th>
              <th className="py-3 px-4">Enlistment Date</th>
              <th className="py-3 px-4">State</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-700 text-slate-700 dark:text-slate-300 font-medium font-mono">
            {farmers.map((f) => (
              <tr key={f.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                <td className="py-4 px-4 font-bold text-slate-900 dark:text-white font-sans">{f.name}</td>
                <td className="py-4 px-4 space-y-0.5">
                  <span className="block text-slate-800 dark:text-slate-200">{f.email}</span>
                  <span className="block text-[10px] text-slate-400">{f.phone}</span>
                </td>
                <td className="py-4 px-4">{f.state} ({f.lga})</td>
                <td className="py-4 px-4 font-sans text-xs text-slate-500 dark:text-slate-400">{f.type}</td>
                <td className="py-4 px-4">{f.date}</td>
                <td className="py-4 px-4">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${f.status === 'Active' ? 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400' : 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400'}`}>{f.status}</span>
                </td>
                <td className="py-4 px-4 text-right space-x-1.5 font-sans">
                  <button onClick={() => alert(`Reading dataset profile: ${f.name}`)} className="p-2 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 rounded-lg text-slate-600 dark:text-slate-300 transition-colors inline-flex" title="View Grid"><FaEye /></button>
                  <button onClick={() => toggleStatus(f.id)} className={`p-2 rounded-lg text-white transition-colors inline-flex ${f.status === 'Active' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-green-600 hover:bg-green-700'}`} title="Toggle Lock">{f.status === 'Active' ? <FaUserLock /> : <FaCheckCircle />}</button>
                  <button onClick={() => deleteFarmer(f.id)} className="p-2 bg-red-50 dark:bg-red-950 hover:bg-red-100 rounded-lg text-red-600 dark:text-red-400 transition-colors inline-flex" title="Purge Record"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}