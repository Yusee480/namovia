import React, { useState } from 'react';

export default function Auth({ initialMode, setScreen }) {
  const [authMode, setAuthMode] = useState(initialMode || 'login'); // 'login' | 'register' | 'verify'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Track code parameters locally for seamless test authentication routines
  const [registeredEmailRef, setRegisteredEmailRef] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpInputs, setOtpInputs] = useState({ emailOtp: '' });

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    country: '',
    state: '',
    city: '',
    address: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    agreePrivacy: false
  });

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

  const handleOtpChange = (e) => {
    const { name, value } = e.target;
    setOtpInputs(prev => ({ ...prev, [name]: value }));
    setErrorMsg('');
  };

  const checkPasswordStrength = (password) => {
    return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password) && /\W/.test(password);
  };

  // Helper calculation validation for age threshold checking 
  const validateAgeLimit = (dobString) => {
    if (!dobString) return false;
    const today = new Date();
    const birthDate = new Date(dobString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const emailKey = formData.email.trim().toLowerCase();

    if (authMode === 'register') {
      if (!validateAgeLimit(formData.dateOfBirth)) {
        setErrorMsg('Access Denied. You must be 18 years or older to register.');
        return;
      }
      if (!checkPasswordStrength(formData.password)) {
        setErrorMsg('Password must be 8+ characters with uppercase, lowercase, numbers, and symbols.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setErrorMsg('Passwords do not match.');
        return;
      }
      if (!formData.agreeTerms || !formData.agreePrivacy) {
        setErrorMsg('You must check and accept all service policies to proceed.');
        return;
      }
      if (localStorage.getItem(`user_${emailKey}`)) {
        setErrorMsg('This email is already registered.');
        return;
      }

      // 1. Generate verification code completely behind the scenes (No Alert Box)
      const numericOtpValue = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(numericOtpValue);
      setRegisteredEmailRef(emailKey);

      // 2. Trigger Full-Screen Loading Screen state with customized meta tags
      setLoading(true);
      setLoadingMessage(`Creating account credentials database context...`);

      // Construct and preserve user configuration dataset
      const userData = {
        fullName: formData.fullName,
        username: formData.username,
        email: emailKey,
        phoneNumber: formData.phoneNumber,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        address: formData.address,
        password: formData.password,
        role: emailKey === 'admin@cropnexa.com' ? 'admin' : 'user'
      };
      
      localStorage.setItem(`user_${emailKey}`, JSON.stringify(userData));

      const existingFarmers = JSON.parse(localStorage.getItem('allFarmersData') || '[]');
      const newFarmerEntry = {
        id: `NX-${Math.floor(1000 + Math.random() * 9000)}`,
        name: formData.fullName,
        email: emailKey,
        location: `${formData.city}, ${formData.state}`,
        status: 'Pending Verification',
        joined: new Date().toISOString().split('T')[0]
      };
      localStorage.setItem('allFarmersData', JSON.stringify([...existingFarmers, newFarmerEntry]));
      localStorage.setItem('currentUser', JSON.stringify(userData));

      // Deliberate loader timeout display before transitioning straight into verification layout
      setTimeout(() => {
        setLoading(false);
        setAuthMode('verify');
        setSuccessMsg('Account pre-registered! Enter token code to verify.');
      }, 3000);

    } else if (authMode === 'verify') {
      if (otpInputs.emailOtp !== generatedOtp) {
        setErrorMsg('Invalid code string input parameter.');
        return;
      }

      setLoading(true);
      setLoadingMessage('Verifying terminal token and deploying security access authorization configurations...');

      setTimeout(() => {
        setLoading(false);
        setAuthMode('login');
        setOtpInputs({ emailOtp: '' });
        setSuccessMsg('Account parameters verified successfully! Please log in.');
        setFormData({
          fullName: '',
          username: '',
          email: '',
          phoneNumber: '',
          dateOfBirth: '',
          gender: '',
          country: '',
          state: '',
          city: '',
          address: '',
          password: '',
          confirmPassword: '',
          agreeTerms: false,
          agreePrivacy: false
        });
      }, 2500);

    } else {
      // Login validation cycle
      if (emailKey === 'admin@cropnexa.com' && formData.password === 'Admin@1234') {
        setLoading(true);
        setLoadingMessage('Admin identity matching found. Synchronizing dashboard terminals...');
        
        const adminProfile = { fullName: 'System Admin', email: 'admin@cropnexa.com', role: 'admin' };
        localStorage.setItem('currentUser', JSON.stringify(adminProfile));
        
        setTimeout(() => {
          setLoading(false);
          setScreen('admin');
        }, 2500);
        return;
      }

      const registeredUserString = localStorage.getItem(`user_${emailKey}`);
      if (!registeredUserString) {
        setErrorMsg('Access Denied. Email address not found.');
        return;
      }

      const user = JSON.parse(registeredUserString);
      if (user.password !== formData.password) {
        setErrorMsg('Invalid password.');
        return;
      }

      setLoading(true);
      setLoadingMessage(`Welcome back, ${user.fullName}. Securing account session environment variables...`);
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      // Deliberate full-screen dashboard transition screen loader timeout display
      setTimeout(() => {
        setLoading(false);
        setScreen('user'); 
      }, 2500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-stretch text-slate-800 antialiased relative">
      
      {/* FULL SCREEN COVER OVERLAY PAGE LOAD SCREEN */}
      {loading && (
        <div className="fixed inset-0 bg-slate-950/95 z-50 flex flex-col items-center justify-center p-6 text-center animate-fadeIn select-none">
          <div className="max-w-sm space-y-6">
            {/* Spinning Indicator Ring */}
            <div className="relative w-16 h-16 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20" />
              <div className="absolute inset-0 rounded-full border-4 border-t-emerald-400 border-r-emerald-400 animate-spin" />
            </div>
            
            <div className="space-y-2">
              <h4 className="text-white text-lg font-bold tracking-tight">Processing System Request</h4>
              <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-xs mx-auto">{loadingMessage}</p>
            </div>

            {/* In-Loader Test Mode Code display panel to completely bypass alert() functions */}
            {authMode === 'register' && generatedOtp && (
              <div className="p-4 bg-emerald-950/40 border border-emerald-500/20 rounded-2xl max-w-xs mx-auto animate-pulse">
                <span className="block text-[9px] font-black tracking-widest text-emerald-400 uppercase mb-1">Generated System Test OTP</span>
                <span className="text-2xl font-mono font-bold tracking-widest text-white">{generatedOtp}</span>
                <span className="block text-[10px] text-emerald-200/50 mt-1">This code will display on verification view after loading.</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Brand Column */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-950 p-16 flex-col justify-between text-white sticky top-0 h-screen">
        <div className="flex items-center space-x-2 cursor-pointer select-none" onClick={() => setScreen('home')}>
          <span className="text-3xl">🌾</span>
          <span className="font-bold text-2xl tracking-tight">Crop<span className="text-emerald-400">Nexa</span></span>
        </div>
        <div>
          <h2 className="text-4xl font-extrabold leading-tight">Unified Agronomic Hub</h2>
          <p className="text-sm text-emerald-100/70 mt-2">Log in using your dedicated structural link to synchronize regional coordinates.</p>
        </div>
        <div className="text-xs text-emerald-200/40">&copy; {new Date().getFullYear()} CropNexa Technologies</div>
      </div>

      {/* Form Interaction Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-white overflow-y-auto">
        <div className="w-full max-w-md space-y-6 my-auto py-6">
          <div>
            <h3 className="text-2xl font-extrabold text-slate-900">
              {authMode === 'login' && 'Secure Sign-In'}
              {authMode === 'register' && 'Create Credentials'}
              {authMode === 'verify' && 'Verification Gateway'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {authMode === 'verify' 
                ? `Please reference verification sequence code provided for account configuration verification.`
                : 'Users must be 18 or older to access regional administrative dashboards.'}
            </p>
          </div>

          {errorMsg && <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl animate-fadeIn">⚠️ {errorMsg}</div>}
          {successMsg && <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl animate-fadeIn">✅ {successMsg}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* 1. REGISTRATION FIELD BLOCKS */}
            {authMode === 'register' && (
              <>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Full Name</label>
                  <input type="text" name="fullName" required value={formData.fullName} onChange={handleInputChange} placeholder="Yusuf Adamou" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-emerald-700 bg-slate-50 text-slate-800" />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Username</label>
                  <input type="text" name="username" required value={formData.username} onChange={handleInputChange} placeholder="yusufadamou" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-emerald-700 bg-slate-50 text-slate-800" />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Email Address</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="name@domain.com" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-emerald-700 bg-slate-50 text-slate-800" />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Phone Number</label>
                  <input type="tel" name="phoneNumber" required value={formData.phoneNumber} onChange={handleInputChange} placeholder="08012345678" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-emerald-700 bg-slate-50 text-slate-800" />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Date of Birth (Must be 18+)</label>
                  <input type="date" name="dateOfBirth" required value={formData.dateOfBirth} onChange={handleInputChange} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-emerald-700 bg-slate-50 text-slate-800" />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Gender</label>
                  <div className="flex items-center space-x-4 py-1 text-xs">
                    {['Male', 'Female', 'Other'].map(g => (
                      <label key={g} className="flex items-center space-x-1 cursor-pointer select-none">
                        <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={handleInputChange} required className="accent-emerald-700" />
                        <span>{g}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Country</label>
                  <input type="text" name="country" required value={formData.country} onChange={handleInputChange} placeholder="Nigeria" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-emerald-700 bg-slate-50 text-slate-800" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">State</label>
                    <input type="text" name="state" required value={formData.state} onChange={handleInputChange} placeholder="Yobe" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-emerald-700 bg-slate-50 text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">City</label>
                    <input type="text" name="city" required value={formData.city} onChange={handleInputChange} placeholder="Potiskum" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-emerald-700 bg-slate-50 text-slate-800" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Address</label>
                  <input type="text" name="address" required value={formData.address} onChange={handleInputChange} placeholder="123 Gashua Road" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-emerald-700 bg-slate-50 text-slate-800" />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Secure Password</label>
                  <div className="relative">
                    <input type={showPassword ? 'text' : 'password'} name="password" required value={formData.password} onChange={handleInputChange} placeholder="••••••••" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 pr-12 text-xs focus:outline-none focus:border-emerald-700 bg-slate-50 text-slate-800 font-mono" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] font-bold hover:text-slate-600 select-none tracking-wider">
                      {showPassword ? 'HIDE' : 'SHOW'}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Confirm Password</label>
                  <input type={showPassword ? 'text' : 'password'} name="confirmPassword" required value={formData.confirmPassword} onChange={handleInputChange} placeholder="••••••••" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-emerald-700 bg-slate-50 text-slate-800 font-mono" />
                </div>
                
                <div className="pt-2 space-y-2 border-t border-slate-100 mt-4">
                  <label className="flex items-start space-x-2 text-xs font-medium text-slate-600 cursor-pointer select-none">
                    <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleInputChange} className="mt-0.5 rounded accent-slate-900 border-slate-300" />
                    <span>I agree to the <span className="text-emerald-700 font-bold hover:underline">Terms & Conditions</span></span>
                  </label>
                  <label className="flex items-start space-x-2 text-xs font-medium text-slate-600 cursor-pointer select-none">
                    <input type="checkbox" name="agreePrivacy" checked={formData.agreePrivacy} onChange={handleInputChange} className="mt-0.5 rounded accent-slate-900 border-slate-300" />
                    <span>I agree to the <span className="text-emerald-700 font-bold hover:underline">Privacy Policy</span></span>
                  </label>
                </div>
              </>
            )}

            {/* 2. VERIFICATION INPUT FIELDS */}
            {authMode === 'verify' && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Email Verification Token</label>
                  <input type="text" name="emailOtp" required value={otpInputs.emailOtp} onChange={handleOtpChange} placeholder="Enter 6-digit verification code" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-center font-mono focus:outline-none focus:border-emerald-700 bg-slate-50 text-slate-800" />
                </div>
                {/* Visual Reminder helper banner for verification view workflow */}
                {generatedOtp && (
                  <div className="p-3 bg-slate-50 border border-slate-200 text-slate-500 rounded-xl text-center font-medium text-[11px]">
                    Test Bypass Code Captured: <span className="font-mono font-bold text-slate-900 tracking-wider ml-1">{generatedOtp}</span>
                  </div>
                )}
              </div>
            )}

            {/* 3. DEFAULT LOGIN LAYOUT FIELD */}
            {authMode === 'login' && (
              <>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Email Address</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="name@domain.com" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-emerald-700 bg-slate-50 text-slate-800" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Secure Password</label>
                  <div className="relative">
                    <input type={showPassword ? 'text' : 'password'} name="password" required value={formData.password} onChange={handleInputChange} placeholder="••••••••" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 pr-12 text-xs focus:outline-none focus:border-emerald-700 bg-slate-50 text-slate-800 font-mono" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] font-bold hover:text-slate-600 select-none tracking-wider">
                      {showPassword ? 'HIDE' : 'SHOW'}
                    </button>
                  </div>
                </div>
              </>
            )}

            <button type="submit" className="w-full py-3 bg-slate-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center shadow-sm">
              <span>
                {authMode === 'login' && 'Authorize Session'}
                {authMode === 'register' && 'Register Account'}
                {authMode === 'verify' && 'Verify Credentials'}
              </span>
            </button>
          </form>

          <div className="text-center text-xs pt-2">
            <button 
              onClick={() => { 
                setAuthMode(authMode === 'login' ? 'register' : 'login'); 
                setErrorMsg(''); 
                setSuccessMsg(''); 
              }} 
              className="font-bold text-emerald-700 hover:underline transition-all"
            >
              {authMode === 'login' ? "Need a new account? Register Here" : "Return to Sign In Terminal"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}