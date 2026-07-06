import React from 'react';

export default function Footer() {
  const navigation = {
    platform: ['Weather Sync', 'Dashboard', 'APIs', 'Security Metrics'],
    company: ['About Hub', 'Press Kit', 'Careers', 'Privacy Policy', 'Terms of Service'],
    social: ['LinkedIn', 'Twitter / X', 'GitHub Hub'],
  };

  return (
    <footer className="bg-gray-900 text-gray-400 py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 pb-12 border-b border-gray-800">
          
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center space-x-2 text-white">
              <span className="text-xl">🌾</span>
              <span className="font-bold text-lg tracking-tight">Crop<span className="text-green-500">Nexa</span></span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
              Next-generation agricultural precision engines routing advanced localized environmental intelligence models globally.
            </p>
          </div>

          {/* Links Loops */}
          <div className="col-span-1 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Platform</h4>
            <ul className="space-y-2 text-xs">
              {navigation.platform.map(item => <li key={item} className="hover:text-green-400 transition-colors cursor-pointer">{item}</li>)}
            </ul>
          </div>

          <div className="col-span-1 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Ecosystem</h4>
            <ul className="space-y-2 text-xs">
              {navigation.company.map(item => <li key={item} className="hover:text-green-400 transition-colors cursor-pointer">{item}</li>)}
            </ul>
          </div>

          <div className="col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Connect</h4>
            <ul className="space-y-2 text-xs">
              {navigation.social.map(item => <li key={item} className="hover:text-green-400 transition-colors cursor-pointer">{item}</li>)}
            </ul>
          </div>

        </div>

        {/* Closing Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-600 space-y-4 sm:space-y-0">
          <span>&copy; {new Date().getFullYear()} CropNexa Technologies Inc. All rights reserved.</span>
          <span className="hover:text-gray-400 transition-colors cursor-pointer">Enterprise SLA Stability Matrix Active</span>
        </div>
      </div>
    </footer>
  );
}