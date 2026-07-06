import React from 'react';
import { FaRegPaperPlane, FaTrash } from 'react-icons/fa';

export default function News() {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-6 animate-fadeIn">
      <div>
        <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">News Dispatch Terminal</h3>
        <p className="text-xs text-slate-400">Broadcast weather notices, system layout alerts, or local advice parameters.</p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); alert('Bulletin pushed across active network channels.'); }} className="space-y-4">
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Bulletin Title</label>
          <input type="text" placeholder="e.g. Planting Window Optimization Schedule - Yobe Core" required className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-[#15803D]" />
        </div>
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Content payload text</label>
          <textarea rows={4} placeholder="Input full technical recommendation text segment details here..." required className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-[#15803D]" />
        </div>
        <button type="submit" className="px-5 py-3 bg-[#15803D] hover:bg-green-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center space-x-2"><FaRegPaperPlane /> <span>Publish Broadcast Notice</span></button>
      </form>
    </div>
  );
}