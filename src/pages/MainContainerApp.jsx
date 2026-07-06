import React, { useState } from 'react';
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

  const selectTabComponent = () => {
    switch (activeTab) {
      case 'Dashboard':     return <AdminDashboard setActiveTab={setActiveTab} />;
      case 'Farmers':       return <Farmers />;
      case 'Admins':        return <Users />;
      case 'Weather':       return <Weather />;
      case 'Crops':         return <Crops />;
      case 'Fertilizers':   return <Fertilizers />;
      case 'Markets':       return <Markets />;
      case 'Reports':       return <Reports />;
      case 'News':          return <News />;
      case 'Settings':      return <Settings />;
      case 'Profile':       return <Profile />;
      default:              return <FallbackTab tabName={activeTab} />;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab} setScreen={setScreen}>
      {selectTabComponent()}
    </AdminLayout>
  );
}