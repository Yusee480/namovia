import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import AdminDashboard from './AdminDashboard';
import Farmers from './Farmers';
import Weather from './Weather';
import Crops from './Crops';
import Fertilizers from './Fertilizers';
import Markets from './Markets';
import Reports from './Reports';
import News from './News';
import Settings from './Settings';
import Users from './Users';
import Profile from './Profile';
import FallbackTab from './FallbackTab';

export default function MainContainerApp({ setScreen }) {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // --- COHESIVE SYSTEM STATE ENGINE ---
  const [listings, setListings] = useState([
    { crop: 'Hybrid White Maize (100kg)', price: '₦42,000', market: 'Potiskum Central Hub', date: '2026-07-06', trend: 'Bullish Demand', up: true },
    { crop: 'Sorghum Grain Bag', price: '₦39,500', market: 'Yobe North Terminal', date: '2026-07-06', trend: 'Steady Velocity', up: true },
    { crop: 'Cowpea Brown Beans', price: '₦68,000', market: 'Potiskum Central Hub', date: '2026-07-05', trend: 'High Volume Volatility', up: false },
  ]);

  const [bulletins, setBulletins] = useState([
    { id: 1, title: 'Flash Flood Alert: Gashua & Jakusko Axis', content: 'Heavy structural downpours are predicted within the next 48 hours. Ensure field runoff drainage paths remain unobstructed.', date: '2026-07-07', category: 'Weather' },
    { id: 2, title: 'Fall Armyworm Outbreak Mitigation Protocol', content: 'Early identification signs tracked across local cluster matrices. Apply approved crop bio-pesticides using calibrated vector ratios.', date: '2026-07-05', category: 'Agronomy' }
  ]);

  const [administrators, setAdministrators] = useState([
    { id: 1, name: 'Yusuf Adamou', email: 'yusuf@cropnexa.com', role: 'Super Master Administrator', node: 'Root System Console' },
    { id: 2, name: 'Bello Garba', email: 'bello@cropnexa.com', role: 'Meteorologist Operator', node: 'Radar Data Stream Node' }
  ]);

  const [auditLogs, setAuditLogs] = useState([
    { id: 101, action: 'SYSTEM_INITIALIZATION', resource: 'Gateway Operational Node', timestamp: '21:43:04', status: 'SUCCESS' }
  ]);

  // Utility to append custom events to our centralized audit pipeline
  const logSystemEvent = (action, resource, status = 'SUCCESS') => {
    const timeString = new Date().toTimeString().split(' ')[0];
    const newLog = { id: Date.now(), action, resource, timestamp: timeString, status };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // --- MACRO STATE COUPLING ---
  const platformMetrics = {
    totalFarmersCount: 1420,
    activeAlertsCount: bulletins.filter(b => b.category === 'Weather').length,
    marketTrends: { 
      commodity: listings[0]?.crop || 'None Available', 
      status: listings[0]?.up ? 'Upward' : 'Price Retraction', 
      priceChange: listings[0]?.trend || 'Stable' 
    }
  };

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 150);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const selectTabComponent = () => {
    switch (activeTab) {
      case 'Dashboard':   return <AdminDashboard setActiveTab={setActiveTab} metrics={platformMetrics} />;
      case 'Farmers':     return <Farmers count={platformMetrics.totalFarmersCount} />;

       case 'Admins':      
        return <Users administrators={administrators} setAdministrators={setAdministrators} logSystemEvent={logSystemEvent} />;

      case 'Weather':     
        return <Weather bulletins={bulletins} logSystemEvent={logSystemEvent} />;
        
      case 'Crops':       return <Crops />;
      case 'Fertilizers': return <Fertilizers />;
      
     case 'Markets':     
        return <Markets listings={listings} setListings={setListings} trends={platformMetrics.marketTrends} logSystemEvent={logSystemEvent} />;

      case 'Reports':     
        return <Reports logSystemEvent={logSystemEvent} />;
      
      case 'News':        
        return <News bulletins={bulletins} setBulletins={setBulletins} logSystemEvent={logSystemEvent} />;
      
      case 'Settings':    
        return <Settings logSystemEvent={logSystemEvent} />;
      
      case 'Profile':     
        return <Profile auditLogs={auditLogs} />;
      
      default:            
        return <FallbackTab tabName={activeTab} />;
    }
  };

  return (
    <AdminLayout 
  activeTab={activeTab}       // Tabbatar ka wuce wannan prop din
  setActiveTab={setActiveTab} // Tabbatar ka wuce wannan prop din
  setScreen={setScreen}
>
  <div className={`transition-opacity duration-150 ease-in-out ${isTransitioning ? 'opacity-40' : 'opacity-100'}`}>
    {selectTabComponent()}
  </div>
</AdminLayout>
  );
}