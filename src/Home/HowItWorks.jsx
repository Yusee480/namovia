import React from 'react';

export default function HowItWorks() {
  const steps = [
    { step: '01', title: 'Create Account', desc: 'Deploy your centralized enterprise farming dashboard instance in under two minutes.' },
    { step: '02', title: 'Detect Geolocation', desc: 'Drop GPS telemetry coordinates to tie operations to localized atmospheric cells.' },
    { step: '03', title: 'Analyze Weather Insights', desc: 'Review high-resolution environmental vectors tracking temperature, moisture, and rainfall risk.' },
    { step: '04', title: 'Get Agronomic Advice', desc: 'Receive machine learning crop matches and optimized fertilizer management guides.' },
    { step: '05', title: 'Maximize Farm Yields', desc: 'Execute precise adjustments with confidence, driving down input costs while boosting output.' },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <h2 className="text-xs font-bold tracking-widest text-green-700 uppercase">Operational Pipeline</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Five Steps to Data-Driven Yield Optimization
          </p>
        </div>

        {/* Process Map Array */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative">
          {steps.map((item, idx) => (
            <div key={idx} className="relative flex flex-col items-center text-center group">
              
              {/* Sequential Node Badge */}
              <div className="w-12 h-12 rounded-full bg-white border border-gray-200/80 shadow-sm flex items-center justify-center font-bold text-sm text-green-700 mb-6 group-hover:border-green-600 transition-colors duration-300 relative z-10">
                {item.step}
              </div>

              {/* Connecting Path Indicators (Hidden on single-column displays) */}
              {idx !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-[1px] bg-gradient-to-r from-gray-200 to-transparent z-0" />
              )}

              <h4 className="text-base font-bold text-gray-900 mb-2">{item.title}</h4>
              <p className="text-xs text-gray-500 px-2 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}