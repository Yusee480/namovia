import React from 'react';
import { FaShieldAlt } from 'react-icons/fa';

export default function Profile() {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-6 animate-fadeIn">
      <div>
        <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">Operator Identity Core</h3>
        <p className="text-xs text-slate-400">View privilege constraints and verify identity infrastructure keys.</p>
      </div>

      <div className="flex items-center space-x-4 border-b border-slate-50 dark:border-slate-700 pb-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-green-700 to-emerald-950 text-white font-black text-xl flex items-center justify-center shadow">YA</div>
        <div>
          <h4 className="text-base font-black text-slate-900 dark:text-white">Yusuf Adamou</h4>
          <p className="text-xs text-slate-400">Enterprise System Operator • Assigned Security Level 4</p>
          <span className="inline-flex mt-1 text-[10px] font-bold bg-green-50 dark:bg-green-950 text-green-700 px-2 py-0.5 rounded-full">✓ Node Identity Verified</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
        <div><span className="text-slate-400 font-sans block mb-0.5">Assigned Routing Endpoint</span><span className="font-bold text-slate-800 dark:text-slate-200">yusuf.adamou@cropnexa.internal</span></div>
        <div><span className="text-slate-400 font-sans block mb-0.5">Assigned Network Cellular Link</span><span className="font-bold text-slate-800 dark:text-slate-200">+234 803 000 0000</span></div>
      </div>
    </div>
  );
}