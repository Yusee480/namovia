import React from 'react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen bg-gray-50 pt-28 pb-16 flex items-center overflow-hidden">
      {/* Decorative background grids mimicking Stripe/Tesla aesthetics */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-green-200 rounded-full filter blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-yellow-100 rounded-full filter blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-green-50 border border-green-200/60 px-3 py-1.5 rounded-full text-xs font-semibold text-green-800 tracking-wide uppercase">
              <span>✨</span> <span>Next-Gen Agricultural Intelligence</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
              Smart Farming Starts With Accurate Weather <span className="text-green-700">Intelligence</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Real-time weather forecasts, high-precision crop recommendations, localized fertilizer advice, market insights, and predictive farming alerts driven by machine learning.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button className="w-full sm:w-auto px-8 py-4 bg-green-700 text-white font-medium rounded-xl hover:bg-green-800 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 duration-200">
                Get Started Free
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 font-medium rounded-xl border border-gray-200 hover:bg-gray-50 transition-all shadow-sm duration-200">
                Explore Dashboard
              </button>
            </div>
          </div>

          {/* Right Hero Interactive Illustration Layout */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            <div className="relative w-full max-w-lg lg:max-w-none aspect-square lg:aspect-auto lg:h-[520px] bg-gradient-to-tr from-green-100 to-emerald-50 rounded-3xl p-8 shadow-inner border border-white flex items-center justify-center animate-float">
              
              {/* Central Main Entity Frame */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100/80 p-6 w-full max-w-md relative z-20 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">🌾</span>
                    <span className="font-bold text-sm text-gray-800">CropNexa Core OS</span>
                  </div>
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs font-medium">Live sync</span>
                </div>
                
                {/* Micro Widgets */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex justify-between items-center text-xs text-gray-500 mb-1"><span>Forecast</span> <span>☀️</span></div>
                    <div className="text-lg font-bold text-gray-800">31°C</div>
                    <div className="text-[10px] text-green-600 font-medium">Optimal Conditions</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex justify-between items-center text-xs text-gray-500 mb-1"><span>GPS Lock</span> <span>📍</span></div>
                    <div className="text-xs font-bold text-gray-800 truncate">Zone 4B - Active</div>
                    <div className="text-[10px] text-gray-400">Yobe, NG</div>
                  </div>
                </div>

                <div className="p-3 bg-green-50/50 rounded-xl border border-green-100/50 flex items-center space-x-3">
                  <span className="text-2xl">🌱</span>
                  <div>
                    <h4 className="text-xs font-bold text-gray-800">Recommended Action</h4>
                    <p className="text-[11px] text-gray-600">Perfect soil moisture window detected for cereal sowing.</p>
                  </div>
                </div>
              </div>

              {/* Floating Cards simulating background layers */}
              <div className="absolute top-8 left-4 bg-white/90 backdrop-blur-sm shadow-lg p-3 rounded-xl border border-white/40 flex items-center space-x-2 transform -rotate-6 z-10 hidden sm:flex animate-pulse">
                <span className="text-lg">🧪</span>
                <span className="text-xs font-semibold text-gray-700">NPK Advisor Enabled</span>
              </div>

              <div className="absolute bottom-12 right-4 bg-white/95 backdrop-blur-sm shadow-lg p-3 rounded-xl border border-white/40 flex items-center space-x-2 transform rotate-3 z-30 hidden sm:flex">
                <span className="text-sm font-medium text-red-500 animate-bounce">⚡ Rain Warning</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}