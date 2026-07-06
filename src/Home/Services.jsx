import React from 'react';

export default function Services() {
  const services = [
    { title: 'Weather Forecast', icon: '🌤', desc: 'Live atmospheric tracking, 7-day precise hyper-local forecasting, and high-resolution precipitation modeling.' },
    { title: 'Crop Recommendation', icon: '🌱', desc: 'Machine learning algorithms matching agronomic profiles against real-time conditions for peak seed selection.' },
    { title: 'Fertilizer Guide', icon: '🧪', desc: 'Targeted NPK nutrient balancing matrices tailored specifically to your localized historical soil health.' },
    { title: 'Market Prices', icon: '📊', desc: 'Real-time commodities market indexes tracking fluctuating produce valuation trends to maximize crop sale revenue.' },
    { title: 'GPS Farm Location', icon: '📍', desc: 'Instant satellite telemetry matching spatial mapping coordinate inputs directly to localized climate cells.' },
    { title: 'Predictive Alerts', icon: '🔔', desc: 'Sub-hour critical weather anomalies, incoming flash flood indicators, and hyper-thermal stress warnings.' },
  ];

  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-xs font-bold tracking-widest text-green-700 uppercase">Our Capabilities</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Comprehensive Data Engines Tailored For Modern Agronomy
          </p>
          <p className="text-lg text-gray-600">
            Eliminate traditional farming guesswork. Harness the full power of machine-learning frameworks deployed directly to your fields.
          </p>
        </div>

        {/* Responsive Grid Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-gray-50 group-hover:bg-green-50 flex items-center justify-center text-3xl mb-6 transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-200 mb-3">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}