import React from 'react';
import { FaTrendingUp, FaTrendingDown } from 'react-icons/fa';

export default function Markets() {
  const listings = [
    { crop: 'Hybrid White Maize (100kg)', price: '₦42,000', market: 'Potiskum Central Hub', date: '2026-07-06', trend: 'Bullish Demand', up: true },
    { crop: 'Sorghum Grain Bag', price: '₦39,500', market: 'Yobe North Terminal', date: '2026-07-06', trend: 'Steady Velocity', up: true },
    { crop: 'Cowpea Brown Beans', price: '₦68,000', market: 'Potiskum Central Hub', date: '2026-07-05', trend: 'High Volume Volatility', up: false },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-6 animate-fadeIn">
      <div>
        <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">Live Commodity Price Index Board</h3>
        <p className="text-xs text-slate-400">Wholesale pricing feeds matched directly from open farm network exchanges.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
              <th className="py-3 px-4">Commodity Asset Block</th>
              <th className="py-3 px-4">Physical Trading Hub</th>
              <th className="py-3 px-4">Index Value</th>
              <th className="py-3 px-4">Telemetry Verified Date</th>
              <th className="py-3 px-4 text-right">Trend Index</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-700 text-slate-700 dark:text-slate-300 font-medium font-mono">
            {listings.map((l, i) => (
              <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                <td className="py-4 px-4 font-bold text-slate-900 dark:text-white font-sans">{l.crop}</td>
                <td className="py-4 px-4 text-slate-500 dark:text-slate-400 font-sans">{l.market}</td>
                <td className="py-4 px-4 text-slate-900 dark:text-white font-black text-sm">{l.price}</td>
                <td className="py-4 px-4">{l.date}</td>
                <td className="py-4 px-4 text-right flex items-center justify-end space-x-1.5 font-sans">
                  {l.up ? <FaTrendingUp className="text-green-600" /> : <FaTrendingDown className="text-rose-500" />}
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${l.up ? 'bg-green-50 dark:bg-green-950 text-green-700' : 'bg-rose-50 dark:bg-rose-950 text-rose-700'}`}>{l.trend}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}