import React from 'react';

export default function CTA() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-green-800 to-emerald-950 rounded-3xl p-8 sm:p-12 lg:p-16 text-center shadow-xl relative overflow-hidden">
          
          {/* Subtle design accent elements inside CTA frame */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-white rounded-full filter blur-2xl" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Ready to Farm Smarter?
            </h2>
            <p className="text-sm sm:text-base text-green-100 leading-relaxed max-w-lg mx-auto">
              Join thousands of producers, resource managers, and researchers currently expanding operational margins using next-gen analytics frameworks.
            </p>
            <div className="pt-4">
              <button className="px-8 py-4 bg-white text-green-900 font-bold text-sm rounded-full shadow-md hover:shadow-xl hover:bg-gray-50 transition-all transform hover:-translate-y-0.5 duration-200">
                Create Free Account
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}