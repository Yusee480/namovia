import React from 'react';

export default function FallbackTab({ tabName }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center space-y-3 animate-fadeIn max-w-xl mx-auto my-8">
      {/* Visual Indicator Pulse Node */}
      <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-xl mx-auto text-emerald-700 animate-pulse">
        ⚙️
      </div>
      
      {/* Context Details */}
      <div className="space-y-1">
        <h3 className="text-sm font-black uppercase tracking-wider text-slate-900">
          {tabName} Node Connected
        </h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
          This algorithmic sub-system pipeline is currently initializing. Simulated telemetry vectors are executing verification syncing sequences safely within the cluster framework context.
        </p>
      </div>
      
      {/* System Status Pill */}
      <div className="pt-2">
        <span className="inline-flex items-center text-[10px] font-mono font-bold bg-slate-50 text-slate-500 border border-slate-200 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
          STATUS: LISTENING_TO_STREAM
        </span>
      </div>
    </div>
  );
}