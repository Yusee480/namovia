import React, { useState } from 'react';

export default function Auth({ initialMode, setScreen }) {
  const [authMode, setAuthMode] = useState(initialMode || 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    state: '',
    lga: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false // Fixed: Added back to clear validation locks
  });

  // Keep local mode state synced if parent props change
  React.useEffect(() => {
    if (initialMode) {
      setAuthMode(initialMode);
      setErrorMsg('');
      setSuccessMsg('');
    }
  }, [initialMode]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setErrorMsg('');
    setSuccessMsg('');
  };

  const checkPasswordStrength = (password) => {
    return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password) && /\W/.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const emailKey = formData.email.trim().toLowerCase();

    if (authMode === 'register') {
      if (!checkPasswordStrength(formData.password)) {
        setErrorMsg('Password must be 8+ characters with uppercase, lowercase, numbers, and symbols.');
        setLoading(false);
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setErrorMsg('Passwords do not match.');
        setLoading(false);
        return;
      }
      if (!formData.agreeTerms) {
        setErrorMsg('You must check and accept the Terms of Service to proceed.');
        setLoading(false);
        return;
      }

      if (localStorage.getItem(`user_${emailKey}`)) {
        setErrorMsg('This email is already registered.');
        setLoading(false);
        return;
      }

      const userData = {
        fullName: formData.fullName,
        email: emailKey,
        state: formData.state,
        lga: formData.lga,
        password: formData.password,
        role: emailKey === 'admin@cropnexa.com' ? 'admin' : 'user'
      };
      
      localStorage.setItem(`user_${emailKey}`, JSON.stringify(userData));

      setSuccessMsg('Account registered! Switching to login terminal...');
      
      // Fixed: Run side-effects simultaneously to avoid state collision bugs
      setTimeout(() => {
        setLoading(false);
        setAuthMode('login');
        setSuccessMsg('');
        setFormData({
          fullName: '',
          email: '',
          state: '',
          lga: '',
          password: '',
          confirmPassword: '',
          agreeTerms: false
        });
      }, 1500);

    } else {
      // Admin account trap verification
      if (emailKey === 'admin@cropnexa.com' && formData.password === 'Admin@1234') {
        const adminProfile = { fullName: 'System Admin', email: 'admin@cropnexa.com', role: 'admin' };
        localStorage.setItem('currentUser', JSON.stringify(adminProfile));
        setSuccessMsg('Admin authorized. Loading master terminal...');
        setTimeout(() => {
          setLoading(false);
          setScreen('dashboard');
        }, 1000);
        return;
      }

      const registeredUserString = localStorage.getItem(`user_${emailKey}`);
      if (!registeredUserString) {
        setErrorMsg('Access Denied. Email address not found.');
        setLoading(false);
        return;
      }

      const user = JSON.parse(registeredUserString);
      if (user.password !== formData.password) {
        setErrorMsg('Invalid password.');
        setLoading(false);
        return;
      }

      localStorage.setItem('currentUser', JSON.stringify(user));
      setSuccessMsg('Identity verified. Loading workspace...');
      setTimeout(() => {
        setLoading(false);
        setScreen('dashboard');
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-stretch text-gray-800 antialiased overflow-hidden">
      {/* Brand Column */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-green-950 to-emerald-950 p-16 flex-col justify-between text-white">
        <div className="flex items-center space-x-2 cursor-pointer select-none" onClick={() => setScreen('home')}>
          <span className="text-3xl">🌾</span>
          <span className="font-bold text-2xl tracking-tight">Crop<span className="text-green-400">Nexa</span></span>
        </div>
        <div>
          <h2 className="text-4xl font-extrabold leading-tight">Unified Agronomic Hub</h2>
          <p className="text-sm text-green-100/70 mt-2">Log in using your dedicated structural link to synchronize regional coordinates.</p>
        </div>
        <div className="text-xs text-green-200/40">&copy; {new Date().getFullYear()} CropNexa Technologies</div>
      </div>

      {/* Form Interaction Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-white overflow-y-auto">
        <div className="w-full_ max-w-md space-y-6">
          <div>
            <h3 className="text-2xl font-extrabold text-gray-900">{authMode === 'login' ? 'Secure Sign-In' : 'Create Credentials'}</h3>
            <p className="text-xs text-gray-400 mt-1">Admin accounts automatically route to the monitoring system layout.</p>
          </div>

          {errorMsg && <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl">⚠️ {errorMsg}</div>}
          {successMsg && <div className="p-3 bg-green-50 border border-green-200 text-green-800 text-xs font-semibold rounded-xl">✅ {successMsg}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === 'register' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
                  <input type="text" name="fullName" required value={formData.fullName} onChange={handleInputChange} placeholder="Yusuf Adamou" className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-green-700 bg-white" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">State</label>
                    <input type="text" name="state" required value={formData.state} onChange={handleInputChange} placeholder="Yobe" className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-green-700 bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">LGA</label>
                    <input type="text" name="lga" required value={formData.lga} onChange={handleInputChange} placeholder="Potiskum" className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-green-700 bg-white" />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Endpoint</label>
              <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="name@domain.com" className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-green-700 bg-white" />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Secure Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} name="password" required value={formData.password} onChange={handleInputChange} placeholder="••••••••" className="w-full border border-gray-200 rounded-xl px-4 py-2 pr-12 text-sm focus:outline-none focus:border-green-700 bg-white" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold hover:text-gray-600 select-none">
                  {showPassword ? 'HIDE' : 'SHOW'}
                </button>
              </div>
            </div>

            {authMode === 'register' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Confirm Password Matrix</label>
                  <input type={showPassword ? 'text' : 'password'} name="confirmPassword" required value={formData.confirmPassword} onChange={handleInputChange} placeholder="••••••••" className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-green-700 bg-white" />
                </div>
                
                {/* Fixed: Added Terms Checkbox rendering code path */}
                <div className="pt-1">
                  <label className="flex items-start space-x-2 text-xs font-medium text-gray-600 cursor-pointer select-none">
                    <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleInputChange} className="mt-0.5 rounded accent-slate-900 border-gray-300" />
                    <span>I accept the CropNexa <span className="text-green-700 font-bold hover:underline">Terms of Service</span> and <span className="text-green-700 font-bold hover:underline">Privacy Policy</span>.</span>
                  </label>
                </div>
              </>
            )}

            <button type="submit" disabled={loading} className="w-full py-3 bg-slate-900 text-white font-bold text-sm rounded-xl hover:bg-black transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <span>{authMode === 'login' ? 'Authorize Session' : 'Create Account'}</span>}
            </button>
          </form>

          <div className="text-center text-xs">
            <button onClick={() => { setAuthMode(authMode === 'login' ? 'register' : 'login'); setErrorMsg(''); setSuccessMsg(''); }} className="font-bold text-green-700 hover:underline">
              {authMode === 'login' ? "Need a new account? Register Here" : "Have credentials? Sign In Here"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}