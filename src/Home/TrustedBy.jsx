import React from 'react';

export default function TrustedBy() {
  // Mock SVG elements or crisp typographic fallbacks representing global enterprise entities
  const clientTypes = [
    { name: 'Commercial Farmers', icon: '🧑‍🌾' },
    { name: 'Agri-Researchers', icon: '🔬' },
    { name: 'Academic Institutions', icon: '🎓' },
    { name: 'Agribusiness Enterprise', icon: '🏢' },
  ];

  return (
    <section className="bg-white py-12 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold tracking-wider text-gray-400 uppercase mb-8">
          Trusted by innovators across global agriculture ecosystems
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center opacity-60">
          {clientTypes.map((client, index) => (
            <div 
              key={index} 
              className="flex items-center space-x-2 grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-105 cursor-default"
            >
              <span className="text-2xl">{client.icon}</span>
              <span className="text-sm font-bold tracking-tight text-gray-700">{client.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}