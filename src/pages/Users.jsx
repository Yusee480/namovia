import React from 'react';
import { FaUserShield, FaKey } from 'react-icons/fa';

export default function Users() {
  const administrators = [
    { name: 'Yusuf Adamou', email: 'yusuf@cropnexa.com', role: 'Super Master Administrator', node: 'Root System Console' },
    { name: 'Bello Garba', email: 'bello@cropnexa.com', role: 'Meteorologist Operator', node: 'Radar Data Stream Node' }
  ];

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-6 animate-fadeIn">
      <div>
        <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">Administrative Console Nodes</h3>
        <p className="text-xs text-slate-400">Manage security credentials, restrict admin entry permissions, or rotate node visibility options.</p>
      </div>

      <div className="space-y-4">
        {administrators.map((admin, idx) => (
          <div key={idx} className="p-4 border border-slate-50 dark:border-slate-700 rounded-xl flex items-center justify-between flex-wrap gap-4 text-xs font-mono">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[#15803D]"><FaUserShield className="text-base" /></div>
              <div>
                <h4 className="font-sans font-bold text-slate-900 dark:text-white text-sm">{admin.name}</h4>
                <p className="text-slate-400 text-[11px]">{admin.email} • {admin.node}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 font-sans">
              <span className="text-[10px] font-black bg-blue-50 dark:bg-blue-950 text-blue-700 px-2 py-0.5 rounded tracking-wider uppercase">{admin.role}</span>
              <button onClick={() => alert('Password modification endpoint dispatched to email key registry.')} className="p-2 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 text-slate-600 dark:text-slate-300 rounded-lg inline-flex" title="Dispatched Reset Key"><FaKey /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}