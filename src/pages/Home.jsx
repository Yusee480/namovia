import React, { useState, useEffect } from 'react';

function Navbar({ setScreen }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (target) => {
    setIsMobileMenuOpen(false);
    if (target === 'dashboard') {
      setScreen('dashboard');
    } else {
      setScreen('home'); 
      setTimeout(() => {
        const element = document.getElementById(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center space-x-2 cursor-pointer" onClick={() => handleNavigation('home')}>
            <span className="text-2xl">🌾</span>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              Crop<span className="text-green-700">Nexa</span>
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => handleNavigation('home')} className="text-sm font-medium text-slate-600 hover:text-green-700 transition-colors">Home</button>
            <button onClick={() => handleNavigation('features')} className="text-sm font-medium text-slate-600 hover:text-green-700 transition-colors">Features</button>
            <button onClick={() => handleNavigation('dashboard')} className="text-sm font-medium text-slate-600 hover:text-green-700 transition-colors">Dashboard</button>
            <button onClick={() => handleNavigation('about')} className="text-sm font-medium text-slate-600 hover:text-green-700 transition-colors">About</button>
            <button onClick={() => handleNavigation('contact')} className="text-sm font-medium text-slate-600 hover:text-green-700 transition-colors">Contact</button>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <button onClick={() => setScreen('login')} className="text-sm font-medium text-slate-600 hover:text-green-700 transition-colors">Login</button>
            <button onClick={() => setScreen('register')} className="text-sm font-medium bg-green-700 text-white px-5 py-2.5 rounded-full hover:bg-green-800 transition-all shadow-sm">Register</button>
          </div>
          
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600 hover:text-slate-900 p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-4 pt-2 pb-6 space-y-2 shadow-lg animate-fadeIn">
          <button onClick={() => handleNavigation('home')} className="block w-full text-left text-base font-medium text-slate-600 hover:text-green-700 py-2">Home</button>
          <button onClick={() => handleNavigation('features')} className="block w-full text-left text-base font-medium text-slate-600 hover:text-green-700 py-2">Features</button>
          <button onClick={() => handleNavigation('dashboard')} className="block w-full text-left text-base font-medium text-slate-600 hover:text-green-700 py-2">Dashboard</button>
          <button onClick={() => handleNavigation('about')} className="block w-full text-left text-base font-medium text-slate-600 hover:text-green-700 py-2">About</button>
          <button onClick={() => handleNavigation('contact')} className="block w-full text-left text-base font-medium text-slate-600 hover:text-green-700 py-2">Contact</button>
          <div className="pt-4 flex flex-col space-y-2">
            <button onClick={() => { setIsMobileMenuOpen(false); setScreen('login'); }} className="w-full py-2.5 text-center text-sm font-medium text-slate-600 border border-slate-200 rounded-xl">Login</button>
            <button onClick={() => { setIsMobileMenuOpen(false); setScreen('register'); }} className="w-full py-2.5 text-center text-sm font-medium bg-green-700 text-white rounded-xl">Register</button>
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero({ setScreen }) {
  return (
    <section id="home" className="relative min-h-screen bg-slate-50 pt-28 pb-16 flex items-center overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-green-200 rounded-full filter blur-[120px]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-green-50 border border-green-200/60 px-3 py-1.5 rounded-full text-xs font-semibold text-green-800 uppercase tracking-wider">
              <span>✨</span> <span>Next-Gen Agricultural Intelligence</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              Smart Farming Starts With Accurate Weather <span className="text-green-700">Intelligence</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Real-time weather forecasts, high-precision crop recommendations, localized fertilizer advice, market insights, and predictive farming alerts driven by machine learning.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button onClick={() => setScreen('register')} className="w-full sm:w-auto px-8 py-4 bg-green-700 text-white font-medium rounded-xl hover:bg-green-800 shadow-md transition-all">Get Started Free</button>
              <button onClick={() => setScreen('dashboard')} className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 font-medium rounded-xl border border-slate-200 hover:bg-slate-50 transition-all">Explore Dashboard</button>
            </div>
          </div>
          <div className="lg:col-span-6 flex flex-col justify-center items-center space-y-6">
            {/* Switched to premium, stable open source agriculture node image */}
            <div className="w-full max-w-md h-64 rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-slate-200">
              <img 
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80" 
                alt="Smart Agriculture Plantation Telemetry" 
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1625246333195-78d9c38ad451?auto=format&fit=crop&w=800&q=80" }}
              />
            </div>
            
            <div className="w-full max-w-md bg-gradient-to-tr from-green-100 to-emerald-50 rounded-3xl p-6 shadow-inner border border-white space-y-4">
              <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4 border border-slate-100">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">🌾</span>
                    <span className="font-bold text-sm text-slate-800">CropNexa Core OS</span>
                  </div>
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs font-medium">Live sync</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="text-xs text-slate-500 mb-1">Forecast ☀️</div>
                    <div className="text-lg font-bold text-slate-800">31°C</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="text-xs text-slate-500 mb-1">GPS Lock 📍</div>
                    <div className="text-xs font-bold text-slate-800 truncate">Zone 4B Active</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function TrustedBy() {
  return (
    <section className="bg-white py-12 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold tracking-wider text-slate-400 uppercase mb-8">Trusted by innovators across global agriculture ecosystems</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 opacity-60 justify-items-center">
          {['Commercial Farmers 🧑‍🌾', 'Agri-Researchers 🔬', 'Academic Groups 🎓', 'Agribusinesses 🏢'].map((text, idx) => (
            <span key={idx} className="text-sm font-bold text-slate-700">{text}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    { title: 'Weather Forecast', icon: '🌤', img: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=400&q=80', desc: 'Live atmospheric tracking, 7-day precise hyper-local forecasting, and high-resolution precipitation modeling.' },
    { title: 'Crop Recommendation', icon: '🌱', img: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=400&q=80', desc: 'Machine learning algorithms matching agronomic profiles against real-time conditions for peak seed selection.' },
    { title: 'Fertilizer Guide', icon: '🧪', img: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80', desc: 'Targeted NPK nutrient balancing matrices tailored specifically to your localized historical soil health.' },
    { title: 'Market Prices', icon: '📊', img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80', desc: 'Real-time commodities market indexes tracking fluctuating produce valuation trends to maximize crop sale revenue.' },
    { title: 'GPS Farm Location', icon: '📍', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80', desc: 'Instant satellite telemetry matching spatial mapping coordinate inputs directly to localized climate cells.' },
    { title: 'Predictive Alerts', icon: '🔔', img: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=400&q=80', desc: 'Sub-hour critical weather anomalies, incoming flash flood indicators, and hyper-thermal stress warnings.' },
  ];
  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold tracking-widest text-green-700 uppercase">Our Capabilities</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Comprehensive Data Engines Tailored For Modern Agronomy</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
              <div className="h-40 w-full overflow-hidden relative bg-slate-100">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-xs flex items-center justify-center text-xl shadow-sm">{s.icon}</div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function WhyChoose() {
  const values = [
    { label: 'Accurate Weather Intelligence', desc: 'Sub-kilometer grid precision updating continuously from deep climate modeling infrastructure.' },
    { label: 'AI Crop Recommendation', desc: 'Agronomic neural networks processing multi-layer variables for optimal seasonal crop selection.' },
    { label: 'Integrated GPS Tracking', desc: 'Zero configuration location mapping anchoring telemetry to unique geolocation spaces.' },
    { label: 'Secure Login Infrastructure', desc: 'Enterprise-grade identity tokens safeguarding telemetry histories and strategic operational data.' },
    { label: 'Farmer Centric Interfaces', desc: 'Stripped of complex jargon; workflows are mapped for seamless operation by anyone, anywhere.' },
    { label: 'Mobile Responsive Ecosystem', desc: 'Fluid layout structures engineered to serve clear telemetry seamlessly across low-bandwidth environments.' },
  ];
  return (
    <section id="about" className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="text-xs font-bold tracking-widest text-green-700 uppercase">Why CropNexa</h2>
              <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">Designed for Scale, Built for Absolute Precision</h3>
            </div>
            {/* Interactive Infographic Mock Frame */}
            <div className="rounded-2xl overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1560243563-062bfc001d68?auto=format&fit=crop&w=600&q=80" 
                alt="Data visualization overlay on field operations" 
                className="w-full h-48 object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <div key={i} className="flex space-x-3">
                <span className="text-green-700 font-bold">✓</span>
                <div>
                  <h4 className="text-base font-bold text-slate-900">{v.label}</h4>
                  <p className="text-xs text-slate-500 mt-1">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { step: '01', title: 'Create Account', desc: 'Deploy your dashboard in under two minutes.' },
    { step: '02', title: 'Detect Geolocation', desc: 'Drop GPS telemetry coordinates to tie operations.' },
    { step: '03', title: 'Analyze Weather', desc: 'Review high-resolution environmental vectors.' },
    { step: '04', title: 'Get Agronomic Advice', desc: 'Receive machine learning crop matches.' },
    { step: '05', title: 'Maximize Yields', desc: 'Execute precise adjustments with confidence.' },
  ];
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold tracking-widest text-green-700 uppercase">Operational Pipeline</h2>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">Five Steps to Data-Driven Yield Optimization</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center mx-auto font-bold text-green-700">{s.step}</div>
              <h4 className="text-base font-bold text-slate-900 pt-2">{s.title}</h4>
              <p className="text-xs text-slate-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <section id="dashboard" className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold tracking-widest text-green-700 uppercase">Control Center</h2>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">The AgriTech Command Center, Anywhere</p>
        </div>
        <div className="bg-slate-900 rounded-2xl shadow-2xl p-6 max-w-4xl mx-auto border border-slate-800">
          <div className="flex items-center space-x-2 border-b border-slate-880 pb-4 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[["Temperature", "31°C"], ["Soil Humidity", "64%"], ["Wind", "12 km/h"], ["Precipitation", "4%"]].map(([title, val], idx) => (
              <div key={idx} className="p-4 bg-slate-800/50 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">{title}</span>
                <span className="text-xl font-bold text-white font-mono">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { text: "CropNexa completely shifted our planting cycles. Knowing the exact precipitation risks saved us thousands this year.", role: "Commercial Farmer" },
    { text: "The localized hyper-specific weather models are incredibly reliable. It provides the fields absolute accuracy.", role: "Operations Researcher" },
    { text: "The clean layout simplifies complex agronomic metrics down to clear tasks.", role: "Agribusiness Lead" },
  ];
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <p className="text-sm text-slate-600 italic">"{r.text}"</p>
              <span className="text-xs font-bold text-slate-400 uppercase mt-6 block">{r.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-xs font-bold tracking-widest text-green-700 uppercase">Connect With Us</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Let's Build the Future of Precision Farming</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Have questions about integrating our analytics frameworks? Reach out to our team.
            </p>
          </div>
          <div className="lg:col-span-7 bg-slate-50 p-8 rounded-2xl border border-slate-100">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <input type="text" placeholder="Name" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-700" />
              <input type="email" placeholder="Email" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-700" />
              <textarea placeholder="Message" rows="4" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-700"></textarea>
              <button className="w-full py-3 bg-green-700 text-white font-bold text-sm rounded-xl hover:bg-green-800 transition-colors">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA({ setScreen }) {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-green-800 to-emerald-950 rounded-3xl p-12 text-center shadow-xl">
          <h2 className="text-3xl font-extrabold text-white mb-4">Ready to Farm Smarter?</h2>
          <p className="text-green-100 text-sm max-w-md mx-auto mb-6">Join thousands of producers currently expanding operational margins using next-gen analytics frameworks.</p>
          <button onClick={() => setScreen('register')} className="px-8 py-3 bg-white text-green-900 font-bold text-sm rounded-full hover:bg-slate-50 transition-all">Create Free Account</button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-center text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 mb-6">
        <div className="flex justify-center items-center space-x-6">
          <a href="https://twitter.com/cropnexa" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors" title="Follow CropNexa on X">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="https://linkedin.com/company/cropnexa" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors" title="Connect with us on LinkedIn">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/>
            </svg>
          </a>
          <a href="https://facebook.com/cropnexa" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors" title="Follow us on Facebook">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="https://github.com/cropnexa" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors" title="Explore our GitHub repositories">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
          </a>
        </div>
        <p className="text-slate-500">
          Stay connected for live agronomy updates, patch release notes, and precision platform insights.
        </p>
      </div>
      <p>&copy; 2026 CropNexa Technologies Inc. All rights reserved.</p>
    </footer>
  );
}

export default function Home({ setScreen }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased overflow-x-hidden">
      <Navbar setScreen={setScreen} />
      <main>
        <Hero setScreen={setScreen} />
        <TrustedBy />
        <Services />
        <WhyChoose />
        <HowItWorks />
        <DashboardPreview />
        <Testimonials />
        <Contact />
        <CTA setScreen={setScreen} />
      </main>
      <Footer />
    </div>
  );
}