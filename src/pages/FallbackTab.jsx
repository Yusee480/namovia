import React from 'react';

export default function FallbackTab({ tabName }) {
  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm text-center space-y-2 animate-fadeIn">
      <div className="text-4xl">⚙️</div>
      <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">{tabName} System Terminal</h3>
      <p className="text-xs text-slate-400 max-w-md mx-auto">This sub-system routing node is active. Simulated real-time sensor array outputs are currently executing telemetry synchronizations within the main cluster context.</p>
    </div>
  );
}