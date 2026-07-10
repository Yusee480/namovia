import React, { useState } from 'react';
import { FaRegPaperPlane, FaTrash } from 'react-icons/fa';

export default function News({ bulletins, setBulletins, logSystemEvent }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Weather');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const handlePublish = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newNotice = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      date: new Date().toISOString().split('T')[0],
      category
    };

    setBulletins([newNotice, ...bulletins]);
    logSystemEvent('NEWS_BULLETIN_DISPATCH', title.trim());
    setTitle('');
    setContent('');
    setSelectedFilter('All');
  };

  const handlePurge = (id) => {
    const targetNotice = bulletins.find(b => b.id === id);
    if (window.confirm('Revoke this published broadcast notice across the network?')) {
      setBulletins(bulletins.filter(b => b.id !== id));
      logSystemEvent('NEWS_BULLETIN_REVOKED', targetNotice?.title || 'Unknown Asset', 'PURGED');
    }
  };

  const filteredBulletins = selectedFilter === 'All' ? bulletins : bulletins.filter(b => b.category === selectedFilter);

  const getBadgeStyles = (cat) => {
    switch (cat) {
      case 'Weather': return 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border-rose-100 dark:border-rose-900';
      case 'Agronomy': return 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900';
      default: return 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-900';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
      <div className="lg:col-span-1 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-6 h-fit">
        <div>
          <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">News Dispatch Terminal</h3>
          <p className="text-xs text-slate-400">Broadcast weather notices or system parameters.</p>
        </div>
        <form onSubmit={handlePublish} className="space-y-4">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Broadcast Stream Type</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#15803D] text-slate-900 dark:text-white font-medium">
              <option value="Weather">Weather Alert 🌤</option>
              <option value="Agronomy">Agronomy Guide 🌱</option>
              <option value="System">System Update ⚙️</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Bulletin Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Planting Schedule" required className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#15803D] text-slate-900 dark:text-white" />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Content payload text</label>
            <textarea rows={4} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Technical text..." required className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#15803D] text-slate-900 dark:text-white" />
          </div>
          <button type="submit" className="w-full px-5 py-3 bg-[#15803D] hover:bg-green-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center space-x-2">
            <FaRegPaperPlane /> <span>Publish Broadcast Notice</span>
          </button>
        </form>
      </div>

      <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">Active Stream Broadcasts</h3>
          </div>
          <div className="flex items-center space-x-1 bg-slate-50 dark:bg-slate-900 p-1 rounded-xl border border-slate-100 dark:border-slate-700 w-fit">
            {['All', 'Weather', 'Agronomy', 'System'].map((t) => (
              <button key={t} onClick={() => setSelectedFilter(t)} className={`px-3 py-1.5 text-[10px] font-bold rounded-lg uppercase tracking-wider transition-all ${selectedFilter === t ? 'bg-white dark:bg-slate-800 text-green-700 dark:text-green-400 shadow-sm border border-slate-100' : 'text-slate-400'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredBulletins.length > 0 ? (
            filteredBulletins.map((b) => (
              <div key={b.id} className="p-4 border border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 rounded-xl flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                    <span className="text-[9px] font-mono font-black px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 tracking-wider uppercase">Live</span>
                    <span className={`text-[9px] font-mono font-black px-1.5 py-0.5 rounded border tracking-wider uppercase ${getBadgeStyles(b.category)}`}>
                      {b.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{b.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{b.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">{b.content}</p>
                </div>
                <button onClick={() => handlePurge(b.id)} className="p-2 text-slate-400 hover:text-rose-600 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 transition-all">
                  <FaTrash className="text-xs" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-slate-400 italic text-xs">No active notices match this criteria.</div>
          )}
        </div>
      </div>
    </div>
  );
}