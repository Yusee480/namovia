import React from 'react';

export default function Testimonials() {
  const reviews = [
    { text: "CropNexa completely shifted our planting cycles. Knowing the exact precipitation risks saved us thousands in lost seeds this year.", role: "Commercial Enterprise Farmer" },
    { text: "The localized hyper-specific weather models are incredibly reliable. It provides the field accuracy that broad regional forecasts consistently miss.", role: "Agricultural Operations Researcher" },
    { text: "The developer-first interface simplifies complex agronomic metrics down to clear, actionable tasks. It has become our daily command engine.", role: "Agribusiness Portfolio Lead" },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold tracking-widest text-green-700 uppercase">Testimonials</h2>
          <p className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Validated by Innovators on the Ground
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="text-yellow-400 text-sm tracking-widest">★★★★★</div>
                <p className="text-sm text-gray-600 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>
              <div className="pt-6 border-t border-gray-50 mt-6">
                <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">{rev.role}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}