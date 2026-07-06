import React from 'react';

export default function DashboardPreview() {
  return (
    <section id="dashboard" className="py-24 bg-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold tracking-widest text-green-700 uppercase">Control Center</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            The AgriTech Command Center, Anywhere
          </p>
          <p className="text-base text-gray-600">
            Get an instant overview of your fields with zero configuration setup. Monitor environmental risk factors down to the minute.
          </p>
        </div>

        {/* Dashboard Frame Interface */}
        <div className="bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto relative">
          
          {/* Mock Browser Top Controls */}
          <div className="flex items-center space-x-2 pb-6 border-b border-gray-800 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="text-xs text-gray-500 pl-4 font-mono select-none">app.cropnexa.com/dashboard/analytics</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Sidebar Simulation */}
            <div className="lg:col-span-3 space-y-2 hidden lg:block border-r border-gray-800/60 pr-4">
              <div className="px-3 py-2 bg-green-900/40 border-l-2 border-green-500 text-green-400 font-medium text-xs rounded-r">Live Workspace</div>
              {['Field Analytics', 'Telemetry Sync', 'NPK Management', 'Market Index', 'Platform Settings'].map((menu) => (
                <div key={menu} className="px-3 py-2 text-gray-400 hover:text-gray-200 text-xs font-medium rounded transition-colors cursor-pointer">{menu}</div>
              ))}
            </div>

            {/* Main Mock Content View */}
            <div className="lg:col-span-9 space-y-6">
              
              {/* Stat Card Micro Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-800/40 rounded-xl border border-gray-800">
                  <span className="text-xs text-gray-400 block mb-1">Temperature</span>
                  <span className="text-xl sm:text-2xl font-bold text-white font-mono">31°C</span>
                  <span className="text-[10px] text-green-400 block mt-1">Stable Atmospheric</span>
                </div>
                <div className="p-4 bg-gray-800/40 rounded-xl border border-gray-800">
                  <span className="text-xs text-gray-400 block mb-1">Soil Humidity</span>
                  <span className="text-xl sm:text-2xl font-bold text-white font-mono">64%</span>
                  <span className="text-[10px] text-green-400 block mt-1">Optimal Range</span>
                </div>
                <div className="p-4 bg-gray-800/40 rounded-xl border border-gray-800">
                  <span className="text-xs text-gray-400 block mb-1">Wind Velocity</span>
                  <span className="text-xl sm:text-2xl font-bold text-white font-mono">12 km/h</span>
                  <span className="text-[10px] text-gray-400 block mt-1">Slowing NE</span>
                </div>
                <div className="p-4 bg-gray-800/40 rounded-xl border border-gray-800">
                  <span className="text-xs text-gray-400 block mb-1">Precipitation</span>
                  <span className="text-xl sm:text-2xl font-bold text-white font-mono">4%</span>
                  <span className="text-[10px] text-yellow-400 block mt-1">Rain Expected (72h)</span>
                </div>
              </div>

              {/* Core Advice Panels Split */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-gradient-to-br from-green-950/40 to-gray-900 rounded-xl border border-green-900/50">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-green-400 uppercase tracking-wider">AI Recommendation</span>
                    <span className="text-sm">🌱</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">Sorghum & Maize Optimal Window</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Current ground chemical telemetry shows excellent nitrogen density loops. Planting inside the next 48 hours maximizes early root growth patterns.
                  </p>
                </div>

                <div className="p-5 bg-gradient-to-br from-yellow-950/20 to-gray-900 rounded-xl border border-yellow-900/30">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider">Fertilizer Target Matrix</span>
                    <span className="text-sm">🧪</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">NPK Top-Dress Action Profile</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Soil analysis detects a localized drop in Potassium down to 4B cell blocks. Deploy a balanced 15-15-15 distribution profile to counter moisture stress.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}