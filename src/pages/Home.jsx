import React, { useState, useEffect } from 'react';

// ==========================================
// 1. NAVBAR COMPONENT
// ==========================================
function Navbar({ setScreen }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center space-x-2 cursor-pointer" onClick={() => setScreen('home')}>
            <span className="text-2xl">🌾</span>
            <span className="font-bold text-xl tracking-tight text-gray-900">
              Crop<span className="text-green-700">Nexa</span>
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'Features', 'Dashboard', 'About', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-gray-600 hover:text-green-700 transition-colors duration-200">
                {item}
              </a>
            ))}
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button onClick={() => setScreen('login')} className="text-sm font-medium text-gray-600 hover:text-green-700 transition-colors">Login</button>
            <button onClick={() => setScreen('register')} className="text-sm font-medium bg-green-700 text-white px-5 py-2.5 rounded-full hover:bg-green-800 transition-all">Register</button>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-gray-900">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          {['Home', 'Features', 'Dashboard', 'About', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="block text-base font-medium text-gray-600 hover:text-green-700 py-2" onClick={() => setIsMobileMenuOpen(false)}>
              {item}
            </a>
          ))}
          <div className="pt-4 flex flex-col space-y-2">
            <button onClick={() => setScreen('login')} className="w-full py-2.5 text-center text-sm font-medium text-gray-600 border border-gray-200 rounded-xl">Login</button>
            <button onClick={() => setScreen('register')} className="w-full py-2.5 text-center text-sm font-medium bg-green-700 text-white rounded-xl📐">Register</button>
          </div>
        </div>
      )}
    </nav>
  );
}

// ==========================================
// 2. HERO COMPONENT
// ==========================================
function Hero({ setScreen }) {
  return (
    <section id="home" className="relative min-h-screen bg-gray-50 pt-28 pb-16 flex items-center overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-green-200 rounded-full filter blur-[120px]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-green-50 border border-green-200/60 px-3 py-1.5 rounded-full text-xs font-semibold text-green-800 uppercase">
              <span>✨</span> <span>Next-Gen Agricultural Intelligence</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
              Smart Farming Starts With Accurate Weather <span className="text-green-700">Intelligence</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Real-time weather forecasts, high-precision crop recommendations, localized fertilizer advice, market insights, and predictive farming alerts driven by machine learning.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button onClick={() => setScreen('register')} className="w-full sm:w-auto px-8 py-4 bg-green-700 text-white font-medium rounded-xl hover:bg-green-800 shadow-md transition-all">Get Started Free</button>
              <button onClick={() => setScreen('login')} className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 font-medium rounded-xl border border-gray-200 hover:bg-gray-50 transition-all">Explore Dashboard</button>
            </div>
          </div>
          <div className="lg:col-span-6 flex justify-center items-center">
            <div className="w-full max-w-md bg-gradient-to-tr from-green-100 to-emerald-50 rounded-3xl p-8 shadow-inner border border-white space-y-4">
              <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4 border border-gray-100">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">🌾</span>
                    <span className="font-bold text-sm text-gray-800">CropNexa Core OS</span>
                  </div>
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs font-medium">Live sync</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="text-xs text-gray-500 mb-1">Forecast ☀️</div>
                    <div className="text-lg font-bold text-gray-800">31°C</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="text-xs text-gray-500 mb-1">GPS Lock 📍</div>
                    <div className="text-xs font-bold text-gray-800 truncate">Zone 4B Active</div>
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

// ==========================================
// 3. TRUSTED BY COMPONENT
// ==========================================
function TrustedBy() {
  return (
    <section className="bg-white py-12 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold tracking-wider text-gray-400 uppercase mb-8">Trusted by innovators across global agriculture ecosystems</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 opacity-60 justify-items-center">
          {['Commercial Farmers 🧑‍🌾', 'Agri-Researchers 🔬', 'Academic Groups 🎓', 'Agribusinesses 🏢'].map((text, idx) => (
            <span key={idx} className="text-sm font-bold text-gray-700">{text}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 4. SERVICES COMPONENT
// ==========================================
function Services() {
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
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold tracking-widest text-green-700 uppercase">Our Capabilities</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Comprehensive Data Engines Tailored For Modern Agronomy</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-2xl mb-4">{s.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 5. WHY CHOOSE COMPONENT
// ==========================================
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
    <section id="about" className="py-24 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-xs font-bold tracking-widest text-green-700 uppercase">Why CropNexa</h2>
            <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">Designed for Scale, Built for Absolute Precision</h3>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <div key={i} className="flex space-x-3">
                <span className="text-green-700 font-bold">✓</span>
                <div>
                  <h4 className="text-base font-bold text-gray-900">{v.label}</h4>
                  <p className="text-xs text-gray-500 mt-1">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 6. HOW IT WORKS COMPONENT
// ==========================================
function HowItWorks() {
  const steps = [
    { step: '01', title: 'Create Account', desc: 'Deploy your dashboard in under two minutes.' },
    { step: '02', title: 'Detect Geolocation', desc: 'Drop GPS telemetry coordinates to tie operations.' },
    { step: '03', title: 'Analyze Weather', desc: 'Review high-resolution environmental vectors.' },
    { step: '04', title: 'Get Agronomic Advice', desc: 'Receive machine learning crop matches.' },
    { step: '05', title: 'Maximize Yields', desc: 'Execute precise adjustments with confidence.' },
  ];
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold tracking-widest text-green-700 uppercase">Operational Pipeline</h2>
          <p className="text-3xl font-extrabold text-gray-900 mt-2">Five Steps to Data-Driven Yield Optimization</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center mx-auto font-bold text-green-700">{s.step}</div>
              <h4 className="text-base font-bold text-gray-900 pt-2">{s.title}</h4>
              <p className="text-xs text-gray-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 7. DASHBOARD PREVIEW COMPONENT
// ==========================================
function DashboardPreview() {
  return (
    <section id="dashboard" className="py-24 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold tracking-widest text-green-700 uppercase">Control Center</h2>
          <p className="text-3xl font-extrabold text-gray-900 mt-2">The AgriTech Command Center, Anywhere</p>
        </div>
        <div className="bg-gray-900 rounded-2xl shadow-2xl p-6 max-w-4xl mx-auto border border-gray-800">
          <div className="flex items-center space-x-2 border-b border-gray-800 pb-4 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[['Temperature', '31°C'], ['Soil Humidity', '64%'], ['Wind', '12 km/h'], ['Precipitation', '4%']].map(([title, val], idx) => (
              <div key={idx} className="p-4 bg-gray-800/50 rounded-xl border border-gray-800">
                <span className="text-xs text-gray-400 block mb-1">{title}</span>
                <span className="text-xl font-bold text-white font-mono">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 8. TESTIMONIALS COMPONENT
// ==========================================
function Testimonials() {
  const reviews = [
    { text: "CropNexa completely shifted our planting cycles. Knowing the exact precipitation risks saved us thousands this year.", role: "Commercial Farmer" },
    { text: "The localized hyper-specific weather models are incredibly reliable. It provides the fields absolute accuracy.", role: "Operations Researcher" },
    { text: "The clean layout simplifies complex agronomic metrics down to clear tasks.", role: "Agribusiness Lead" },
  ];
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
              <p className="text-sm text-gray-600 italic">"{r.text}"</p>
              <span className="text-xs font-bold text-gray-400 uppercase mt-6 block">{r.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 9. CONTACT COMPONENT
// ==========================================
function Contact() {
  return (
    <section id="contact" className="py-24 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-xs font-bold tracking-widest text-green-700 uppercase">Connect With Us</h2>
            <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">Let's Build the Future of Precision Farming</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Have questions about integrating our analytics frameworks? Reach out to our team.
            </p>
          </div>
          <div className="lg:col-span-7 bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <input type="text" placeholder="Name" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-700" />
              <input type="email" placeholder="Email" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-700" />
              <textarea placeholder="Message" rows="4" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-700"></textarea>
              <button className="w-full py-3 bg-green-700 text-white font-bold text-sm rounded-xl hover:bg-green-800 transition-colors">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 10. CTA COMPONENT
// ==========================================
function CTA({ setScreen }) {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-green-800 to-emerald-950 rounded-3xl p-12 text-center shadow-xl">
          <h2 className="text-3xl font-extrabold text-white mb-4">Ready to Farm Smarter?</h2>
          <p className="text-green-100 text-sm max-w-md mx-auto mb-6">Join thousands of producers currently expanding operational margins using next-gen analytics frameworks.</p>
          <button onClick={() => setScreen('register')} className="px-8 py-3 bg-white text-green-900 font-bold text-sm rounded-full hover:bg-gray-50 transition-all">Create Free Account</button>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 11. FOOTER COMPONENT
// ==========================================
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800 text-center text-xs">
      <p>&copy; {new Date().getFullYear()} CropNexa Technologies Inc. All rights reserved.</p>
    </footer>
  );
}

// ==========================================
// 🏆 MAIN HOME LAYOUT ASSEMBLY
// ==========================================
export default function Home({ setScreen }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 antialiased overflow-x-hidden">
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